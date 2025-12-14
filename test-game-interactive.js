const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const readline = require('readline');

// Configuração das portas
const PORTS = {
  AUTH: 'localhost:50051',
  ROOM: 'localhost:50052',
  MATCH: 'localhost:50053',
  QUESTION: 'localhost:50054',
  STATISTICS: 'localhost:50050',
};

// Carregar protos
function loadProto(protoPath) {
  const packageDefinition = protoLoader.loadSync(protoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });
  return grpc.loadPackageDefinition(packageDefinition);
}

// Clientes gRPC
let authClient, userClient, roomClient, matchClient, questionClient, statisticsClient;

function initClients() {
  const authProto = loadProto(path.join(__dirname, 'auth-service/proto/auth.proto'));
  authClient = new authProto.auth.AuthService(PORTS.AUTH, grpc.credentials.createInsecure());
  userClient = new authProto.auth.UserService(PORTS.AUTH, grpc.credentials.createInsecure());

  const roomProto = loadProto(path.join(__dirname, 'room-service/proto/room.proto'));
  roomClient = new roomProto.room.RoomService(PORTS.ROOM, grpc.credentials.createInsecure());

  const matchProto = loadProto(path.join(__dirname, 'match-service/src/infrastructure/grpc/proto/match.proto'));
  matchClient = new matchProto.match.MatchService(PORTS.MATCH, grpc.credentials.createInsecure());

  const questionProto = loadProto(path.join(__dirname, 'question-service/src/infrastructure/grpc/proto/question.proto'));
  questionClient = new questionProto.question.QuestionService(PORTS.QUESTION, grpc.credentials.createInsecure());

  const statisticsProto = loadProto(path.join(__dirname, 'statistics/src/infrastructure/grpc/proto/statistics.proto'));
  statisticsClient = new statisticsProto.statistics.StatisticsService(PORTS.STATISTICS, grpc.credentials.createInsecure());
}

// Interface de linha de comando
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

// Estado do jogo
let currentUser = null;
let currentRoom = null;
let currentQuestions = [];
let score = 0;

// Funções auxiliares
function printHeader(title) {
  console.log('\n' + '═'.repeat(60));
  console.log(`  ${title}`);
  console.log('═'.repeat(60));
}

function printSuccess(msg) {
  console.log(`✅ ${msg}`);
}

function printError(msg) {
  console.log(`❌ ${msg}`);
}

function printInfo(msg) {
  console.log(`ℹ️  ${msg}`);
}

// ========== FUNÇÕES DE AUTENTICAÇÃO ==========
async function registerUser() {
  printHeader('📝 REGISTRAR NOVO USUÁRIO');
  
  const username = await prompt('Nome de usuário: ');
  const email = await prompt('Email: ');
  const password = await prompt('Senha: ');

  return new Promise((resolve) => {
    userClient.RegisterUser({ username, email, password }, (err, response) => {
      if (err) {
        printError(`Erro ao registrar: ${err.details || err.message}`);
        resolve(false);
        return;
      }
      printSuccess(`Usuário registrado! ID: ${response.id}`);
      currentUser = { id: response.id, username, email };
      resolve(true);
    });
  });
}

async function loginUser() {
  printHeader('🔑 LOGIN');
  
  const usernameOrEmail = await prompt('Email ou usuário: ');
  const password = await prompt('Senha: ');

  return new Promise((resolve) => {
    authClient.Login({ usernameOrEmail, password }, (err, response) => {
      if (err) {
        printError(`Erro no login: ${err.details || err.message}`);
        resolve(false);
        return;
      }
      printSuccess(`Login realizado! Bem-vindo, ${response.user?.username || 'usuário'}!`);
      currentUser = { 
        id: response.user?.id, 
        username: response.user?.username,
        email: response.user?.email,
        token: response.accessToken 
      };
      resolve(true);
    });
  });
}

// ========== FUNÇÕES DE SALA ==========
async function createRoom() {
  if (!currentUser) {
    printError('Faça login primeiro!');
    return;
  }

  printHeader('🏠 CRIAR NOVA SALA');
  
  const roomName = await prompt('Nome da sala: ');
  const topic = await prompt('Tópico (ex: História do Brasil, JavaScript, etc): ');
  const difficulty = await prompt('Dificuldade (easy/medium/hard): ');
  const rounds = await prompt('Número de perguntas (1-10): ');
  const maxPlayers = await prompt('Máximo de jogadores (2-10, padrão 4): ');

  return new Promise((resolve) => {
    const request = {
      roomName,
      userId: currentUser.id,
      topic,
      difficulty: difficulty || 'medium',
      rounds: parseInt(rounds) || 5,
      userPlayersIds: [currentUser.id],
      maxPlayers: parseInt(maxPlayers) || 4,
    };

    console.log('\n⏳ Criando sala e gerando perguntas...');
    
    roomClient.CreateRoom(request, (err, response) => {
      if (err) {
        printError(`Erro ao criar sala: ${err.details || err.message}`);
        resolve(false);
        return;
      }
      
      printSuccess('Sala criada com sucesso!');
      console.log(`  📌 ID: ${response.id}`);
      console.log(`  📌 Nome: ${response.name}`);
      console.log(`  📌 Tópico: ${response.topic}`);
      console.log(`  📌 Dificuldade: ${response.difficulty}`);
      console.log(`  📌 Rodadas: ${response.rounds}`);
      console.log(`  📌 Max Jogadores: ${response.maxPlayers || 4}`);
      console.log(`  📌 Jogadores atuais: ${response.currentPlayers || 1}/${response.maxPlayers || 4}`);
      console.log(`  📌 Status: ${response.status}`);
      
      currentRoom = response;
      console.log(`  [DEBUG] currentRoom setado: ${JSON.stringify(currentRoom)}`);
      resolve(true);
    });
  });
}

async function joinRoom() {
  if (!currentUser) {
    printError('Faça login primeiro!');
    return;
  }

  printHeader('🚪 ENTRAR EM UMA SALA');
  
  // Primeiro listar as salas disponíveis
  console.log('\n⏳ Buscando salas disponíveis...\n');
  
  const rooms = await new Promise((resolve) => {
    roomClient.ListRooms({}, (err, response) => {
      if (err) {
        printError(`Erro ao listar salas: ${err.details || err.message}`);
        resolve([]);
        return;
      }
      resolve(response.rooms || []);
    });
  });

  if (rooms.length === 0) {
    printInfo('Nenhuma sala disponível no momento.');
    printInfo('Crie uma nova sala (opção 3) ou aguarde alguém criar.');
    return;
  }

  console.log('  ┌─────┬────────────────────────┬────────────────┬────────────┬─────────────┐');
  console.log('  │  #  │ Nome da Sala           │ Tópico         │ Dificuldade│ Jogadores   │');
  console.log('  ├─────┼────────────────────────┼────────────────┼────────────┼─────────────┤');
  
  rooms.forEach((room, idx) => {
    const num = (idx + 1).toString().padStart(3);
    const name = room.name.substring(0, 20).padEnd(20);
    const topic = (room.topic || '').substring(0, 14).padEnd(14);
    const diff = (room.difficulty || '').padEnd(10);
    const players = `${room.currentPlayers || room.userPlayersId?.length || 0}/${room.maxPlayers || 4}`.padEnd(11);
    console.log(`  │ ${num} │ ${name}   │ ${topic} │ ${diff} │ ${players} │`);
  });
  
  console.log('  └─────┴────────────────────────┴────────────────┴────────────┴─────────────┘');
  console.log('\n  Digite 0 para voltar ao menu');

  const choice = await prompt('\n  Escolha o número da sala: ');
  
  if (choice === '0') return;
  
  const roomIndex = parseInt(choice) - 1;
  if (roomIndex < 0 || roomIndex >= rooms.length) {
    printError('Opção inválida!');
    return;
  }

  const selectedRoom = rooms[roomIndex];

  console.log(`  [DEBUG] Tentando entrar na sala: ${selectedRoom.name}, userId: ${currentUser.id}`);

  return new Promise((resolve) => {
    roomClient.JoinRoom({ roomName: selectedRoom.name, userId: currentUser.id }, (err, response) => {
      if (err) {
        printError(`Erro ao entrar na sala: ${err.details || err.message}`);
        console.log(`  [DEBUG] Erro completo:`, err);
        resolve(false);
        return;
      }
      
      console.log(`  [DEBUG] Response recebido:`, JSON.stringify(response));
      
      printSuccess('Entrou na sala com sucesso!');
      console.log(`  📌 Nome: ${response.name}`);
      console.log(`  📌 Tópico: ${response.topic}`);
      console.log(`  📌 Jogadores: ${response.currentPlayers || response.userPlayersId?.length || 0}/${response.maxPlayers || 4}`);
      console.log(`  📌 Status: ${response.status}`);
      
      currentRoom = response;
      console.log(`  [DEBUG] currentRoom setado para: ${currentRoom.name}`);
      resolve(true);
    });
  });
}

// ========== FUNÇÕES DE PERGUNTAS ==========
async function generateQuestions() {
  if (!currentRoom) {
    printError('Entre em uma sala primeiro!');
    return;
  }

  printHeader('📊 STATUS DO MATCH');
  console.log(`\n  📍 Sala: ${currentRoom.name}`);
  
  return new Promise((resolve) => {
    const request = {
      userId: currentUser.id,
      roomName: currentRoom.name,
    };

    console.log(`\n⏳ Buscando status do match...`);

    matchClient.GetMatchStatus(request, (err, response) => {
      if (err) {
        printError(`Erro ao buscar status: ${err.details || err.message}`);
        printInfo('As perguntas são geradas automaticamente ao criar a sala.');
        printInfo('Se você está em uma sala, use a opção 6 para jogar!');
        resolve(false);
        return;
      }
      
      printSuccess('Match encontrado!');
      console.log(`\n  📊 Round atual: ${response.currentRound}`);
      console.log(`  📝 Tópico: ${response.topic}`);
      console.log(`  ⚡ Dificuldade: ${response.difficulty}`);
      
      if (response.question) {
        console.log(`\n  📋 Próxima pergunta disponível!`);
        console.log(`     "${response.question.statement?.substring(0, 50)}..."`);
      }
      
      printInfo('\nUse a opção 6 para jogar o quiz!');
      resolve(true);
    });
  });
}

async function playQuiz() {
  if (!currentRoom) {
    printError('Entre em uma sala primeiro!');
    return;
  }

  printHeader('🎮 JOGAR QUIZ');
  console.log(`\n  📍 Sala: ${currentRoom.name}`);
  console.log(`  📝 Tópico: ${currentRoom.topic}`);
  console.log(`  ⚡ Dificuldade: ${currentRoom.difficulty}`);
  console.log(`  🔄 Rodadas: ${currentRoom.rounds}`);
  
  score = 0;
  let totalRounds = currentRoom.rounds || 5;
  let currentRound = 1;
  let gameFinished = false;

  while (!gameFinished && currentRound <= totalRounds) {
    // Buscar status do match (pergunta atual)
    const matchStatus = await new Promise((resolve) => {
      matchClient.GetMatchStatus({
        userId: currentUser.id,
        roomName: currentRoom.name,
      }, (err, response) => {
        if (err) {
          printError(`Erro ao buscar pergunta: ${err.details || err.message}`);
          resolve(null);
          return;
        }
        resolve(response);
      });
    });

    if (!matchStatus || !matchStatus.question) {
      printError('Não foi possível carregar a pergunta.');
      break;
    }

    const q = matchStatus.question;
    const questionText = q.statement;
    const alternatives = q.alternatives || {};
    const optionKeys = Object.keys(alternatives).sort();
    const optionsList = optionKeys.map(key => ({ key, text: alternatives[key] }));
    
    console.log(`\n┌─────────────────────────────────────────────────────────┐`);
    console.log(`│  Pergunta ${matchStatus.currentRound}/${totalRounds}                                      │`);
    console.log(`└─────────────────────────────────────────────────────────┘`);
    console.log(`\n  ${questionText}\n`);
    
    optionsList.forEach((opt) => {
      console.log(`    ${opt.key}. ${opt.text}`);
    });

    const answer = await prompt('\n  Sua resposta (A/B/C/D): ');
    const userAnswer = answer.trim().toUpperCase();

    if (!optionKeys.includes(userAnswer)) {
      printError('Opção inválida! Use A, B, C ou D.');
      continue;
    }

    // Enviar resposta ao match-service
    const answerResult = await new Promise((resolve) => {
      matchClient.Answer({
        roomName: currentRoom.name,
        userId: currentUser.id,
        answer: userAnswer,
      }, (err, response) => {
        if (err) {
          printError(`Erro ao enviar resposta: ${err.details || err.message}`);
          resolve(null);
          return;
        }
        resolve(response);
      });
    });

    if (answerResult) {
      if (answerResult.isRight) {
        printSuccess('Correto! 🎉');
        score++;
      } else {
        printError(`Incorreto!`);
      }
      
      console.log(`  📊 Pontuação atual: ${score}/${matchStatus.currentRound}`);
      
      // Verificar se é a última rodada
      if (matchStatus.currentRound >= totalRounds) {
        gameFinished = true;
      }
    }
    
    currentRound++;
  }

  printHeader('🏆 RESULTADO FINAL');
  console.log(`\n  Você acertou ${score} de ${totalRounds} perguntas!`);
  console.log(`  Porcentagem: ${((score / totalRounds) * 100).toFixed(1)}%`);
  
  // Determina se venceu (mais de 70% de acertos)
  const won = score >= totalRounds * 0.7;
  
  if (score === totalRounds) {
    console.log('\n  🌟 PERFEITO! Você acertou todas! 🌟');
  } else if (won) {
    console.log('\n  👏 Muito bem! Ótimo desempenho!');
  } else if (score >= totalRounds * 0.5) {
    console.log('\n  👍 Bom trabalho! Continue praticando!');
  } else {
    console.log('\n  📚 Que tal estudar mais sobre esse assunto?');
  }

  // Salvar estatísticas
  console.log('\n  ⏳ Salvando estatísticas...');
  
  await new Promise((resolve) => {
    statisticsClient.UpdateStats({
      userId: currentUser.id,
      scoreToAdd: score,
      won: won,
    }, (err, response) => {
      if (err) {
        printError(`Erro ao salvar estatísticas: ${err.details || err.message}`);
        resolve(false);
        return;
      }
      
      printSuccess('Estatísticas atualizadas!');
      console.log(`  📊 Score total: ${response.score}`);
      console.log(`  🏆 Vitórias: ${response.wins}`);
      console.log(`  🎮 Partidas: ${response.matches}`);
      resolve(true);
    });
  });

  // Mostrar ranking do match
  console.log('\n  ⏳ Buscando ranking da partida...');
  
  await new Promise((resolve) => {
    matchClient.GetMatchRanking({
      roomName: currentRoom.name,
      userId: currentUser.id,
    }, (err, response) => {
      if (err) {
        console.log(`  (Ranking não disponível)`);
        resolve(false);
        return;
      }
      
      if (response.userRankings && response.userRankings.length > 0) {
        console.log('\n  🏆 Ranking da Partida:');
        response.userRankings.forEach((player, index) => {
          const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '  ';
          console.log(`    ${medal} ${index + 1}. Jogador ${player.userId} - ${player.score} pontos`);
        });
      }
      resolve(true);
    });
  });
}

// ========== FUNÇÕES DE RANKING ==========
async function showRanking() {
  printHeader('🏆 RANKING GLOBAL');

  return new Promise((resolve) => {
    statisticsClient.GetRanking({}, (err, response) => {
      if (err) {
        printError(`Erro ao buscar ranking: ${err.details || err.message}`);
        resolve(false);
        return;
      }

      if (!response.users || response.users.length === 0) {
        printInfo('Nenhum jogador no ranking ainda.');
        resolve(true);
        return;
      }

      console.log('\n  ┌──────┬────────────┬───────────┬──────────┬──────────┐');
      console.log('  │ Pos  │  User ID   │   Score   │   Wins   │  Matches │');
      console.log('  ├──────┼────────────┼───────────┼──────────┼──────────┤');
      
      response.users.forEach((user, index) => {
        const pos = (index + 1).toString().padStart(4);
        const odUserId = user.userId.toString().padStart(8);
        const scoreVal = user.score.toString().padStart(7);
        const wins = user.wins.toString().padStart(6);
        const matches = user.matches.toString().padStart(6);
        
        let medal = '  ';
        if (index === 0) medal = '🥇';
        else if (index === 1) medal = '🥈';
        else if (index === 2) medal = '🥉';
        
        console.log(`  │${medal}${pos}│ ${odUserId}   │ ${scoreVal}   │ ${wins}   │ ${matches}   │`);
      });
      
      console.log('  └──────┴────────────┴───────────┴──────────┴──────────┘');
      resolve(true);
    });
  });
}

async function showMyStats() {
  if (!currentUser) {
    printError('Faça login primeiro!');
    return;
  }

  printHeader('📊 MINHAS ESTATÍSTICAS');

  return new Promise((resolve) => {
    statisticsClient.GetUserStats({ userId: currentUser.id }, (err, response) => {
      if (err) {
        printError(`Erro ao buscar estatísticas: ${err.details || err.message}`);
        resolve(false);
        return;
      }

      console.log(`\n  ┌────────────────────────────────────────────┐`);
      console.log(`  │         User ID: ${response.userId.toString().padEnd(25)}│`);
      console.log(`  ├────────────────────────────────────────────┤`);
      console.log(`  │  🎯 Score Total:  ${response.score.toString().padEnd(23)}│`);
      console.log(`  │  🏆 Vitórias:     ${response.wins.toString().padEnd(23)}│`);
      console.log(`  │  🎮 Partidas:     ${response.matches.toString().padEnd(23)}│`);
      console.log(`  └────────────────────────────────────────────┘`);
      resolve(true);
    });
  });
}

// ========== MENU PRINCIPAL ==========
async function showMenu() {
  printHeader('🎯 QUIZ GAME - MENU PRINCIPAL');
  
  console.log(`  [DEBUG] currentRoom = ${currentRoom ? 'definido' : 'null'}`);
  
  if (currentUser) {
    console.log(`  👤 Usuário logado: ${currentUser.username || currentUser.email} (ID: ${currentUser.id})`);
  }
  if (currentRoom) {
    console.log(`  🏠 Sala atual: ${currentRoom.name}`);
  }
  
  console.log('\n  ─── Conta ───');
  console.log('  1. Registrar novo usuário');
  console.log('  2. Login');
  
  console.log('\n  ─── Salas ───');
  console.log('  3. Criar sala (já gera perguntas automaticamente!)');
  console.log('  4. Entrar em uma sala');
  
  console.log('\n  ─── Jogo ───');
  console.log('  5. Ver status do match');
  console.log('  6. Jogar quiz');
  
  console.log('\n  ─── Ranking ───');
  console.log('  7. Ver ranking global');
  console.log('  8. Ver minhas estatísticas');
  
  console.log('\n  ─── Sistema ───');
  console.log('  0. Sair');
  
  console.log('');
}

async function main() {
  console.log('\n🚀 Iniciando Quiz Game Client...\n');
  
  try {
    initClients();
    printSuccess('Clientes gRPC inicializados!');
  } catch (error) {
    printError(`Erro ao inicializar clientes: ${error.message}`);
    process.exit(1);
  }

  while (true) {
    await showMenu();
    const choice = await prompt('  Escolha uma opção: ');

    switch (choice.trim()) {
      case '1':
        await registerUser();
        break;
      case '2':
        await loginUser();
        break;
      case '3':
        await createRoom();
        break;
      case '4':
        await joinRoom();
        break;
      case '5':
        await generateQuestions();
        break;
      case '6':
        await playQuiz();
        break;
      case '7':
        await showRanking();
        break;
      case '8':
        await showMyStats();
        break;
      case '0':
        console.log('\n👋 Até logo!\n');
        rl.close();
        process.exit(0);
      default:
        printError('Opção inválida!');
    }

    await prompt('\n  Pressione ENTER para continuar...');
  }
}

main().catch((err) => {
  console.error('Erro fatal:', err);
  process.exit(1);
});
