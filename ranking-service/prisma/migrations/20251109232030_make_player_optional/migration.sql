/*
  Warnings:

  - The primary key for the `Ranking` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `level` on the `Ranking` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `Ranking` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Ranking` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Ranking` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Ranking` table. All the data in the column will be lost.
  - Added the required column `playerId` to the `Ranking` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Ranking_userId_key";

-- AlterTable
ALTER TABLE "Ranking" DROP CONSTRAINT "Ranking_pkey",
DROP COLUMN "level",
DROP COLUMN "position",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
DROP COLUMN "username",
ADD COLUMN     "playerId" TEXT NOT NULL,
ADD COLUMN     "season" TEXT,
ALTER COLUMN "score" DROP DEFAULT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Ranking_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Ranking_id_seq";

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ranking" ADD CONSTRAINT "Ranking_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
