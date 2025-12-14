FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY tsconfig*.json nest-cli.json ./
COPY src ./src

RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
# Copiar os arquivos proto necessários para gRPC
COPY --from=builder /app/src/infrastructure/grpc/proto ./src/infrastructure/grpc/proto

ENV NODE_ENV=production

# question-service roda na porta 50054
EXPOSE 50054

CMD ["node", "dist/main"]