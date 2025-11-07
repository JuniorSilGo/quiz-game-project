import { PrismaClient } from '../../generated/prisma';
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding player_history...');

  const players = await prisma.players.findMany({
    where: {
      username: { in: ['player_one', 'fast_answer', 'strategist', 'newbie123', 'ghost_player'] },
    },
  });

  if (players.length === 0) {
    throw new Error('Nenhum player encontrado. Rode seed_player.ts primeiro.');
  }

  const byUsername = Object.fromEntries(players.map((p) => [p.username, p.id]));

  const historyData = [
    {
      username: 'player_one',
      eventType: 'XP_GAIN',
      delta: '+200',
      oldValues: JSON.stringify({ xp: '1300' }),
      newValues: JSON.stringify({ xp: '1500' }),
    },
    {
      username: 'player_one',
      eventType: 'MATCH_WIN',
      delta: '+1',
      oldValues: JSON.stringify({ wins: 9 }),
      newValues: JSON.stringify({ wins: 10 }),
    },
    {
      username: 'fast_answer',
      eventType: 'XP_GAIN',
      delta: '+300',
      oldValues: JSON.stringify({ xp: '400' }),
      newValues: JSON.stringify({ xp: '700' }),
    },
    {
      username: 'strategist',
      eventType: 'LEVEL_UP',
      delta: '+1',
      oldValues: JSON.stringify({ level: 7, xp: 3400 }),
      newValues: JSON.stringify({ level: 8, xp: 3800 }),
    },
    {
      username: 'newbie123',
      eventType: 'MATCH_PLAYED',
      delta: '+1',
      oldValues: JSON.stringify({ matchesPlayed: 0 }),
      newValues: JSON.stringify({ matchesPlayed: 1 }),
    },
    {
      username: 'ghost_player',
      eventType: 'XP_GAIN',
      delta: '+230',
      oldValues: JSON.stringify({ xp: 0 }),
      newValues: JSON.stringify({ xp: 230 }),
    },
  ];

  for (const h of historyData) {
    const playerId = byUsername[h.username];
    if (!playerId) {
      console.warn(`Player not found for username ${h.username}, pulando entry de history.`);
      continue;
    }

    await prisma.player_history.create({
      data: {
        playerId,
        eventType: h.eventType,
        delta: h.delta,
        oldValues: h.oldValues,
        newValues: h.newValues,
      },
    });

    console.log(`Created history for ${h.username} -> ${h.eventType}`);
  }

  console.log('Player_history seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
