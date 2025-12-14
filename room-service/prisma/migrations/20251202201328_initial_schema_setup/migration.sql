-- CreateEnum
CREATE TYPE "room"."RoomStatus" AS ENUM ('WAITING', 'READY', 'STARTED', 'FINISHED');

-- CreateTable
CREATE TABLE "room"."Room" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "rounds" INTEGER NOT NULL,
    "createdById" INTEGER NOT NULL,
    "status" "room"."RoomStatus" NOT NULL DEFAULT 'WAITING',
    "matchId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room"."RoomPlayer" (
    "id" SERIAL NOT NULL,
    "roomId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RoomPlayer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Room_name_key" ON "room"."Room"("name");

-- CreateIndex
CREATE INDEX "RoomPlayer_userId_idx" ON "room"."RoomPlayer"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "RoomPlayer_roomId_userId_key" ON "room"."RoomPlayer"("roomId", "userId");

-- AddForeignKey
ALTER TABLE "room"."RoomPlayer" ADD CONSTRAINT "RoomPlayer_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "room"."Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
