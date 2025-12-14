#!/bin/sh
set -e

echo "🔄 Executando migrations do statistics-service..."
npx prisma migrate deploy

echo "✅ Migrations concluídas!"
echo "🚀 Iniciando statistics-service..."
node dist/main
