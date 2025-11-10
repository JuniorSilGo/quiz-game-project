/*
  Warnings:

  - You are about to drop the `matchHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ranking` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "matchHistory" DROP CONSTRAINT "matchHistory_playerId_fkey";

-- DropTable
DROP TABLE "matchHistory";

-- DropTable
DROP TABLE "ranking";

-- CreateTable
CREATE TABLE "Ranking" (
    "playerId" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "level" INTEGER NOT NULL DEFAULT 1,
    "position" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ranking_pkey" PRIMARY KEY ("playerId")
);

-- CreateTable
CREATE TABLE "MatchHistory" (
    "id" SERIAL NOT NULL,
    "playerId" INTEGER NOT NULL,
    "result" TEXT NOT NULL,
    "pointsDelta" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MatchHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MatchHistory" ADD CONSTRAINT "MatchHistory_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Ranking"("playerId") ON DELETE RESTRICT ON UPDATE CASCADE;
