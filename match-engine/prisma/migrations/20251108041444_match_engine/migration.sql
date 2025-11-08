-- CreateEnum
CREATE TYPE "MatchStatus" AS ENUM ('PENDING', 'RUNNING', 'PAUSED', 'FINISHED', 'CANCELLED');

-- CreateTable
CREATE TABLE "MatchEvent" (
    "id" SERIAL NOT NULL,
    "matchId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "emittedBy" INTEGER,
    "emittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MatchEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchSnapshot" (
    "id" SERIAL NOT NULL,
    "matchId" INTEGER NOT NULL,
    "state" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ttlAt" TIMESTAMP(3),

    CONSTRAINT "MatchSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" SERIAL NOT NULL,
    "externalId" TEXT,
    "roomId" INTEGER NOT NULL,
    "mode" TEXT NOT NULL,
    "status" "MatchStatus" NOT NULL DEFAULT 'PENDING',
    "currentRound" INTEGER NOT NULL DEFAULT 0,
    "totalRounds" INTEGER NOT NULL DEFAULT 10,
    "startedAt" TIMESTAMP(3),
    "endedAt" TIMESTAMP(3),
    "timeLimitSec" INTEGER NOT NULL DEFAULT 30,
    "createdBy" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchPlayer" (
    "id" SERIAL NOT NULL,
    "matchId" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,
    "username" TEXT,
    "avatar" TEXT,
    "score" INTEGER NOT NULL DEFAULT 0,
    "totalXp" BIGINT NOT NULL DEFAULT 0,
    "correctAnswers" INTEGER NOT NULL DEFAULT 0,
    "wrongAnswers" INTEGER NOT NULL DEFAULT 0,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leftAt" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "MatchPlayer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Round" (
    "id" SERIAL NOT NULL,
    "matchId" INTEGER NOT NULL,
    "index" INTEGER NOT NULL,
    "questionId" INTEGER,
    "startedAt" TIMESTAMP(3),
    "endedAt" TIMESTAMP(3),
    "timeLimitSec" INTEGER NOT NULL,
    "correctAnswerId" INTEGER,
    "roundResult" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Round_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerAnswer" (
    "id" SERIAL NOT NULL,
    "roundId" INTEGER NOT NULL,
    "matchPlayerId" INTEGER NOT NULL,
    "playerId" INTEGER NOT NULL,
    "answerId" INTEGER NOT NULL,
    "isCorrect" BOOLEAN,
    "timeMs" INTEGER,
    "pointsAwarded" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlayerAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchHistory" (
    "id" SERIAL NOT NULL,
    "matchId" INTEGER NOT NULL,
    "roomId" INTEGER NOT NULL,
    "winnerPlayerId" INTEGER,
    "totalRounds" INTEGER NOT NULL,
    "totalPlayers" INTEGER NOT NULL,
    "startedAt" TIMESTAMP(3),
    "endedAt" TIMESTAMP(3),
    "summary" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MatchHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MatchEvent_matchId_idx" ON "MatchEvent"("matchId");

-- CreateIndex
CREATE INDEX "MatchEvent_type_idx" ON "MatchEvent"("type");

-- CreateIndex
CREATE INDEX "MatchSnapshot_matchId_idx" ON "MatchSnapshot"("matchId");

-- CreateIndex
CREATE INDEX "MatchSnapshot_createdAt_idx" ON "MatchSnapshot"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Match_externalId_key" ON "Match"("externalId");

-- CreateIndex
CREATE INDEX "Match_roomId_idx" ON "Match"("roomId");

-- CreateIndex
CREATE INDEX "Match_status_idx" ON "Match"("status");

-- CreateIndex
CREATE INDEX "MatchPlayer_playerId_idx" ON "MatchPlayer"("playerId");

-- CreateIndex
CREATE UNIQUE INDEX "MatchPlayer_matchId_playerId_key" ON "MatchPlayer"("matchId", "playerId");

-- CreateIndex
CREATE INDEX "Round_questionId_idx" ON "Round"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "Round_matchId_index_key" ON "Round"("matchId", "index");

-- CreateIndex
CREATE INDEX "PlayerAnswer_playerId_idx" ON "PlayerAnswer"("playerId");

-- CreateIndex
CREATE INDEX "PlayerAnswer_roundId_idx" ON "PlayerAnswer"("roundId");

-- CreateIndex
CREATE UNIQUE INDEX "MatchHistory_matchId_key" ON "MatchHistory"("matchId");

-- AddForeignKey
ALTER TABLE "MatchEvent" ADD CONSTRAINT "MatchEvent_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchSnapshot" ADD CONSTRAINT "MatchSnapshot_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchPlayer" ADD CONSTRAINT "MatchPlayer_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Round" ADD CONSTRAINT "Round_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerAnswer" ADD CONSTRAINT "PlayerAnswer_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerAnswer" ADD CONSTRAINT "PlayerAnswer_matchPlayerId_fkey" FOREIGN KEY ("matchPlayerId") REFERENCES "MatchPlayer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
