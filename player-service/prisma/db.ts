import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getPlayer() {
  const players = await prisma.players.findMany();
  console.log(players);
}

getPlayer()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
