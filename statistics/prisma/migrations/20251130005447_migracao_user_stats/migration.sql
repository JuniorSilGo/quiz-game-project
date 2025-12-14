-- CreateTable
CREATE TABLE "statistics"."UserStats" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "score" BIGINT NOT NULL DEFAULT 0,
    "wins" BIGINT NOT NULL DEFAULT 0,
    "matches" BIGINT NOT NULL DEFAULT 0,

    CONSTRAINT "UserStats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserStats_userId_key" ON "statistics"."UserStats"("userId");
