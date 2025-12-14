// ═══════════════════════════════════════════════════════════════════
// Quiz Game - Cliente de Teste gRPC (JavaScript)
// ═══════════════════════════════════════════════════════════════════
// Execute com: node test-grpc-client.js

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const ROOM_PROTO_PATH = path.join(__dirname, 'room-service/proto/room.proto');
const QUESTION_PROTO_PATH = path.join(__dirname, 'question-service/src/infrastructure/grpc/proto/question.proto');

// Carregar proto do Room Service
const roomPackageDefinition = protoLoader.loadSync(ROOM_PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

// Carregar proto do Question Service
const questionPackageDefinition = protoLoader.loadSync(QUESTION_PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const roomProto = grpc.loadPackageDefinition(roomPackageDefinition);
const questionProto = grpc.loadPackageDefinition(questionPackageDefinition);

// Criar clientes
const roomClient = new roomProto.room.RoomService(
  'localhost:50052',
  grpc.credentials.createInsecure()
);

const questionClient = new questionProto.question.QuestionService(
  'localhost:50054',
  grpc.credentials.createInsecure()
);

// ═══════════════════════════════════════════════════════════════════
// FUNÇÕES DE TESTE
// ═══════════════════════════════════════════════════════════════════

function createRoom(roomName, userId, topic, difficulty, rounds) {
  return new Promise((resolve, reject) => {
    console.log(`\n🏠 Criando sala "${roomName}"...`);
    
    roomClient.CreateRoom(
      {
        roomName,
        userId,
        topic,
        difficulty,
        rounds,
        userPlayersIds: [],
      },
      (error, response) => {
        if (error) {
          console.error('❌ Erro ao criar sala:', error.message);
          reject(error);
        } else {
          console.log('✅ Sala criada com sucesso!');
          console.log('   Resposta:', JSON.stringify(response, null, 2));
          resolve(response);
        }
      }
    );
  });
}

function joinRoom(roomName, userId) {
  return new Promise((resolve, reject) => {
    console.log(`\n🚪 Jogador ${userId} entrando na sala "${roomName}"...`);
    
    roomClient.JoinRoom(
      { roomName, userId },
      (error, response) => {
        if (error) {
          console.error('❌ Erro ao entrar na sala:', error.message);
          reject(error);
        } else {
          console.log('✅ Entrou na sala com sucesso!');
          console.log('   Resposta:', JSON.stringify(response, null, 2));
          resolve(response);
        }
      }
    );
  });
}

function generateQuestions(topic, difficulty, quantity) {
  return new Promise((resolve, reject) => {
    console.log(`\n❓ Gerando ${quantity} perguntas sobre "${topic}" (${difficulty})...`);
    console.log('   ⏳ Isso pode demorar alguns segundos (chamada à API de LLM)...');
    
    questionClient.GenerateQuestions(
      { topic, difficulty, quantity },
      { deadline: Date.now() + 60000 }, // 60 segundos de timeout
      (error, response) => {
        if (error) {
          console.error('❌ Erro ao gerar perguntas:', error.message);
          reject(error);
        } else {
          console.log('✅ Perguntas geradas com sucesso!');
          resolve(response);
        }
      }
    );
  });
}

// ═══════════════════════════════════════════════════════════════════
// FLUXO DE TESTE PRINCIPAL
// ═══════════════════════════════════════════════════════════════════

async function runTests() {
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('           🎮 QUIZ GAME - TESTE DE INTEGRAÇÃO gRPC');
  console.log('═══════════════════════════════════════════════════════════════════');

  const ROOM_NAME = 'sala-prog-' + Date.now();
  const USER1_ID = 2; // jogador1
  const USER2_ID = 3; // jogador2

  try {
    // 1. Criar sala
    console.log('\n📝 PASSO 1: Criando sala de quiz...');
    const room = await createRoom(
      ROOM_NAME,
      USER1_ID,
      'programacao',
      'facil',
      3
    );

    // 2. Segundo jogador entra
    console.log('\n📝 PASSO 2: Segundo jogador entrando na sala...');
    const roomAfterJoin = await joinRoom(ROOM_NAME, USER2_ID);

    // 3. Gerar perguntas
    console.log('\n📝 PASSO 3: Gerando perguntas para o quiz...');
    let questions = null;
    try {
      questions = await generateQuestions(room.topic, room.difficulty, room.rounds);
      
      if (questions && questions.questions) {
        console.log(`\n📋 Perguntas geradas (${questions.questions.length}):`);
        questions.questions.forEach((q, i) => {
          console.log(`\n   Pergunta ${i + 1}: ${q.statement}`);
          if (q.alternatives) {
            Object.entries(q.alternatives).forEach(([key, value]) => {
              const marker = key === q.correctAnswer ? '✓' : ' ';
              console.log(`      ${marker} ${key}) ${value}`);
            });
          }
          console.log(`      Resposta correta: ${q.correctAnswer}`);
        });
      }
    } catch (err) {
      console.log('   ⚠️ Geração de perguntas falhou (verifique OPENROUTER_API_KEY no .env)');
    }

    console.log('\n═══════════════════════════════════════════════════════════════════');
    console.log('✅ TESTE CONCLUÍDO COM SUCESSO!');
    console.log('═══════════════════════════════════════════════════════════════════');
    console.log(`\n📊 Resumo:`);
    console.log(`   - Sala: ${room.name}`);
    console.log(`   - Tópico: ${room.topic}`);
    console.log(`   - Dificuldade: ${room.difficulty}`);
    console.log(`   - Rounds: ${room.rounds}`);
    console.log(`   - Jogadores: ${roomAfterJoin.userPlayersId?.join(', ') || 'nenhum'}`);
    console.log(`   - Status: ${roomAfterJoin.status}`);
    console.log(`   - Perguntas geradas: ${questions?.questions?.length || 0}`);
    
  } catch (error) {
    console.error('\n❌ TESTE FALHOU:', error.message);
  }

  process.exit(0);
}

runTests();
