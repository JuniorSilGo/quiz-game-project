// ═══════════════════════════════════════════════════════════════════
// Quiz Game - Cliente de Teste gRPC
// ═══════════════════════════════════════════════════════════════════
// Execute com: npx ts-node test-grpc-client.ts

import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import * as path from 'path';

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

const roomProto = grpc.loadPackageDefinition(roomPackageDefinition) as any;

// Criar cliente Room
const roomClient = new roomProto.room.RoomService(
  'localhost:50052',
  grpc.credentials.createInsecure()
);

// ═══════════════════════════════════════════════════════════════════
// FUNÇÕES DE TESTE
// ═══════════════════════════════════════════════════════════════════

async function createRoom(
  roomName: string,
  userId: number,
  topic: string,
  difficulty: string,
  rounds: number
): Promise<any> {
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
      (error: any, response: any) => {
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

async function joinRoom(roomName: string, userId: number): Promise<any> {
  return new Promise((resolve, reject) => {
    console.log(`\n🚪 Jogador ${userId} entrando na sala "${roomName}"...`);
    
    roomClient.JoinRoom(
      { roomName, userId },
      (error: any, response: any) => {
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

// ═══════════════════════════════════════════════════════════════════
// FLUXO DE TESTE PRINCIPAL
// ═══════════════════════════════════════════════════════════════════

async function runTests() {
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('           🎮 QUIZ GAME - TESTE DE INTEGRAÇÃO gRPC');
  console.log('═══════════════════════════════════════════════════════════════════');

  const ROOM_NAME = 'sala-programacao-' + Date.now();
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
    
  } catch (error: any) {
    console.error('\n❌ TESTE FALHOU:', error.message);
  }

  process.exit(0);
}

runTests();
