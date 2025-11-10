/*
  Warnings:

  - The primary key for the `Ranking` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `playerId` on the `Ranking` table. All the data in the column will be lost.
  - You are about to drop the `MatchHistory` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Ranking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Ranking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MatchHistory" DROP CONSTRAINT "MatchHistory_playerId_fkey";

-- AlterTable
ALTER TABLE "Ranking" DROP CONSTRAINT "Ranking_pkey",
DROP COLUMN "playerId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "Ranking_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "MatchHistory";

-- CreateIndex
CREATE UNIQUE INDEX "Ranking_userId_key" ON "Ranking"("userId");
