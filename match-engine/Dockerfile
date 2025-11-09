FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY proto ./proto

COPY . .

RUN npm run build

EXPOSE 3002 50052

CMD ["node", "dist/main"]