/*
  Warnings:

  - You are about to drop the `MatchHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ranking` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MatchHistory" DROP CONSTRAINT "MatchHistory_playerId_fkey";

-- DropTable
DROP TABLE "MatchHistory";

-- DropTable
DROP TABLE "Ranking";

-- CreateTable
CREATE TABLE "ranking" (
    "id" SERIAL NOT NULL,
    "playerId" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "score" INTEGER NOT NULL DEFAULT 0,
    "position" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ranking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "matchHistory" (
    "id" SERIAL NOT NULL,
    "playerId" INTEGER NOT NULL,
    "result" TEXT NOT NULL,
    "pointsDelta" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "matchHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ranking_playerId_key" ON "ranking"("playerId");

-- AddForeignKey
ALTER TABLE "matchHistory" ADD CONSTRAINT "matchHistory_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "ranking"("playerId") ON DELETE CASCADE ON UPDATE CASCADE;
