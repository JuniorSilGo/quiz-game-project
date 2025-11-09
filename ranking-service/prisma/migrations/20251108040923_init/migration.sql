/*
  Warnings:

  - You are about to drop the `leaderboard_snapshots` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `matches_history` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `player_stats` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `players` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."leaderboard_snapshots" DROP CONSTRAINT "leaderboard_snapshots_playerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."matches_history" DROP CONSTRAINT "matches_history_playerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."player_stats" DROP CONSTRAINT "player_stats_playerId_fkey";

-- DropTable
DROP TABLE "public"."leaderboard_snapshots";

-- DropTable
DROP TABLE "public"."matches_history";

-- DropTable
DROP TABLE "public"."player_stats";

-- DropTable
DROP TABLE "public"."players";

-- CreateTable
CREATE TABLE "ranking" (
    "id" SERIAL NOT NULL,
    "playerId" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "wins" INTEGER NOT NULL DEFAULT 0,
    "matches" INTEGER NOT NULL DEFAULT 0,
    "level" INTEGER NOT NULL DEFAULT 1,
    "lastUpdate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ranking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ranking_playerId_key" ON "ranking"("playerId");
