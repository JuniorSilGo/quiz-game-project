/*
  Warnings:

  - You are about to drop the `ranking` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."ranking";

-- CreateTable
CREATE TABLE "Ranking" (
    "id" SERIAL NOT NULL,
    "playerId" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "level" INTEGER NOT NULL DEFAULT 1,
    "position" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ranking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "match_history" (
    "id" SERIAL NOT NULL,
    "playerId" INTEGER NOT NULL,
    "result" TEXT NOT NULL,
    "pointsDelta" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "match_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ranking_playerId_key" ON "Ranking"("playerId");

-- AddForeignKey
ALTER TABLE "match_history" ADD CONSTRAINT "match_history_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Ranking"("playerId") ON DELETE RESTRICT ON UPDATE CASCADE;
