import { PrismaClient, MatchStatus, Round } from "@prisma/client";

const prisma = new PrismaClient();

const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const randomItem = <T>(arr: T[]) =>
  arr[Math.floor(Math.random() * arr.length)];

const randomName = () => randomItem(["Alice", "Bob", "Carol", "David", "Eve"]);
const randomAvatar = () =>
  randomItem([
    "https://cdn-icons-png.flaticon.com/512/194/194938.png",
    "https://cdn-icons-png.flaticon.com/512/194/194935.png",
    "https://cdn-icons-png.flaticon.com/512/194/194934.png",
    "https://cdn-icons-png.flaticon.com/512/194/194933.png",
  ]);

async function main() {
  console.log("Iniciando seed aleatório do MatchEngine...");

  const match = await prisma.match.create({
    data: {
      externalId: `match-${Date.now()}`,
      roomId: randomInt(1, 50),
      mode: "CLASSIC",
      status: MatchStatus.RUNNING,
      currentRound: 1,
      totalRounds: randomInt(2, 5),
      startedAt: new Date(),
      timeLimitSec: 30,
      createdBy: 1,
    },
  });

  console.log("Match criado:", match);

  const totalPlayers = randomInt(2, 5);
  const players: any[] = [];

  for (let i = 1; i <= totalPlayers; i++) {
    const player = await prisma.matchPlayer.create({
      data: {
        matchId: match.id,
        playerId: i,
        username: randomName() + "_" + randomInt(1, 100),
        avatar: randomAvatar(),
      },
    });

    players.push(player);
  }

  console.log(`Jogadores criados (${players.length}):`, players);

  const rounds: Round[] = [];

  for (let r = 1; r <= match.totalRounds; r++) {
    const correctAnswerId = randomInt(1, 4);

    const round = await prisma.round.create({
      data: {
        matchId: match.id,
        index: r,
        questionId: randomInt(1000, 2000),
        startedAt: new Date(),
        timeLimitSec: 30,
        correctAnswerId,
      },
    });

    rounds.push(round);

    for (const p of players) {
      const answerId = randomInt(1, 4);
      const isCorrect = answerId === correctAnswerId;

      await prisma.playerAnswer.create({
        data: {
          roundId: round.id,
          matchPlayerId: p.id,
          playerId: p.playerId,
          answerId,
          isCorrect,
          timeMs: randomInt(1000, 9000),
          pointsAwarded: isCorrect ? 100 : 0,
        },
      });

      await prisma.matchPlayer.update({
        where: { id: p.id },
        data: {
          score: { increment: isCorrect ? 100 : 0 },
          correctAnswers: { increment: isCorrect ? 1 : 0 },
          wrongAnswers: { increment: isCorrect ? 0 : 1 },
          totalXp: { increment: isCorrect ? 50 : 10 },
        },
      });
    }

    await prisma.matchEvent.create({
      data: {
        matchId: match.id,
        type: "ROUND_RESULT",
        payload: {
          round: r,
          correctAnswerId,
        },
        emittedBy: 1,
      },
    });
  }

  console.log("Rounds criados:", rounds);

  const snapshot = await prisma.matchSnapshot.create({
    data: {
      matchId: match.id,
      state: {
        status: "FINISHED",
        round: match.totalRounds,
        players: players.map((p) => ({
          id: p.playerId,
          username: p.username,
          score: p.score,
        })),
      },
      ttlAt: new Date(Date.now() + 60000),
    },
  });

  console.log("Snapshot criado:", snapshot);

  const playersFinal = await prisma.matchPlayer.findMany({
    where: { matchId: match.id },
  });

  const winner = playersFinal.sort((a, b) => b.score - a.score)[0];

  const history = await prisma.matchHistory.create({
    data: {
      matchId: match.id,
      roomId: match.roomId,
      winnerPlayerId: winner.playerId,
      totalRounds: match.totalRounds,
      totalPlayers,
      startedAt: match.startedAt,
      endedAt: new Date(),
      summary: {
        winner: winner.username,
        scores: playersFinal.map((p) => ({
          username: p.username,
          score: p.score,
        })),
      },
    },
  });

  console.log("Histórico criado:", history);

  console.log("Seed concluído com sucesso!");
}

main()
  .catch((e) => {
    console.error("ERRO NO SEED:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
