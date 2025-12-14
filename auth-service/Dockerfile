# ═══════════════════════════════════════════════════════════════════
# Auth Service - Dockerfile Multi-stage
# ═══════════════════════════════════════════════════════════════════

# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma
RUN npx prisma generate

COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS runner
WORKDIR /app

# Instala dependências para conversão de linha e execução
RUN apk add --no-cache dos2unix

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/proto ./proto

COPY docker-entrypoint.sh ./docker-entrypoint.sh
RUN dos2unix ./docker-entrypoint.sh && chmod +x ./docker-entrypoint.sh

ENV NODE_ENV=production
# HTTP port para Kong API Gateway
EXPOSE 3001
# gRPC port para comunicação entre serviços
EXPOSE 50051

ENTRYPOINT ["./docker-entrypoint.sh"]
