/*
  Warnings:

  - The primary key for the `Ranking` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `playerId` on the `Ranking` table. All the data in the column will be lost.
  - You are about to drop the `Player` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Ranking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Ranking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Ranking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Ranking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ranking" DROP CONSTRAINT "Ranking_playerId_fkey";

-- DropIndex
DROP INDEX "Ranking_playerId_key";

-- AlterTable
ALTER TABLE "Ranking" DROP CONSTRAINT "Ranking_pkey",
DROP COLUMN "playerId",
ADD COLUMN     "level" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL,
ALTER COLUMN "score" SET DEFAULT 0;

-- DropTable
DROP TABLE "Player";

-- CreateIndex
CREATE UNIQUE INDEX "Ranking_userId_key" ON "Ranking"("userId");
