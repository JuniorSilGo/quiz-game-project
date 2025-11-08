-- CreateTable
CREATE TABLE "player_history" (
    "id" SERIAL NOT NULL,
    "player_id" INTEGER NOT NULL,
    "event_type" TEXT NOT NULL,
    "delta" TEXT,
    "old_values" TEXT,
    "new_values" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "player_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "player_history_player_id_idx" ON "player_history"("player_id");

-- AddForeignKey
ALTER TABLE "player_history" ADD CONSTRAINT "player_history_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
