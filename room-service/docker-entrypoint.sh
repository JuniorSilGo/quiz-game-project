#!/bin/sh
set -e

echo "🔄 Executando migrations do room-service..."
npx prisma migrate deploy

echo "✅ Migrations concluídas!"
echo "🚀 Iniciando room-service..."
node dist/main
