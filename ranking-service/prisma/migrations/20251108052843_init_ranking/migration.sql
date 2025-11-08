/*
  Warnings:

  - You are about to drop the `match_history` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."match_history" DROP CONSTRAINT "match_history_playerId_fkey";

-- DropTable
DROP TABLE "public"."match_history";

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
