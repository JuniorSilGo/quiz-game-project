/*
  Warnings:

  - You are about to drop the column `season` on the `Ranking` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[playerId]` on the table `Ranking` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Ranking" DROP COLUMN "season";

-- CreateIndex
CREATE UNIQUE INDEX "Ranking_playerId_key" ON "Ranking"("playerId");
