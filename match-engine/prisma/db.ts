import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function getMatch() {
  const match = await prisma.match.findMany();
  console.log(match);
}

getMatch()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
