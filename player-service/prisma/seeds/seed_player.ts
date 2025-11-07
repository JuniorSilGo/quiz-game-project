import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding players...');

  const playersData = [
    {
      username: 'player_one',
      email: 'player1@example.com',
      avatar: 'https://example.com/avatars/1.png',
      level: 5,
      xp: BigInt(1500),
      wins: 10,
      matchesPlayed: 25,
    },
    {
      username: 'fast_answer',
      email: 'fast@example.com',
      avatar: null,
      level: 3,
      xp: BigInt(700),
      wins: 4,
      matchesPlayed: 12,
    },
    {
      username: 'strategist',
      email: 'strat@example.com',
      avatar: 'https://example.com/avatars/3.png',
      level: 8,
      xp: BigInt(3800),
      wins: 34,
      matchesPlayed: 50,
    },
    {
      username: 'newbie123',
      email: null,
      avatar: null,
      level: 1,
      xp: BigInt(0),
      wins: 0,
      matchesPlayed: 0,
    },
    {
      username: 'ghost_player',
      email: 'ghost@example.com',
      avatar: 'https://example.com/avatars/5.png',
      level: 2,
      xp: BigInt(230),
      wins: 1,
      matchesPlayed: 3,
    },
  ];

  for (const p of playersData) {
    await prisma.players.upsert({
      where: { username: p.username },
      update: {}, // não precisa atualizar nada, apenas garantir que exista
      create: p,
    });
    console.log(`Upserted player ${p.username}`);
  }

  console.log('✅ Players seeding finished.');
}

main()
  .catch((e) => {
    console.error('❌ Error while seeding players:', e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
