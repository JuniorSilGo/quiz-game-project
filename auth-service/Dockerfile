FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY prisma ./prisma

RUN npx prisma generate

COPY proto ./proto

COPY . .

RUN npm run build

EXPOSE 3001 50051

CMD ["node", "dist/main"]
