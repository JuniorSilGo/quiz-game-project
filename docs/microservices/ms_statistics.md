# 📊 Statistics Service 

O **Statistics Service** é um microsserviço responsável por **persistir, consultar e atualizar estatísticas de usuários** após partidas, como pontuação, vitórias, partidas jogadas e ranking geral.

---

## 🎯 Responsabilidades

* Armazenar estatísticas individuais de usuários
* Atualizar estatísticas após o término de partidas
* Calcular score através de estratégia configurável
* Expor ranking geral ordenado por pontuação
* Disponibilizar dados via **gRPC**
* Integrar opcionalmente com o **Auth-Service** para validações

---

## 🧱 Arquitetura

Fluxo arquitetural adotado:

```
[gRPC Controller]
        ↓
[Use Cases / Application]
        ↓
[Repository Interface]
        ↓
[Prisma Repository]
        ↓
[PostgreSQL]
```

Camadas adicionais:

* **Domain** → entidades e regras de negócio
* **Strategy** → cálculo de score desacoplado

---

## 🔄 Fluxo de Execução

### 🔹 Consulta de Estatísticas (GetUserStats)

1. Cliente chama o método gRPC
2. Controller delega para o Use Case
3. Repositório consulta o banco
4. DTO é retornado ao cliente
5. Se não existir registro, estatísticas zeradas são retornadas

### 🔹 Atualização Pós-Partida

1. Serviço recebe `userId`, `deltaScore` e `win`
2. Estatísticas atuais são carregadas
3. Strategy calcula novo score
4. Vitórias e partidas são incrementadas
5. Registro é persistido via **upsert**

---

## 📁 Estrutura de Pastas

```
src
├── application
│   ├── dto
│   └── use-cases
│
├── domain
│   ├── entities
│   ├── repositories
│   └── strategies
│
├── infrastructure
│   ├── grpc
│   │   ├── controllers
│   │   └── proto
│   ├── modules
│   └── repositories
│
├── app.module.ts
└── main.ts
```

---

## 🧠 Camada de Domínio

### 📌 Entidade `UserStats`

Representa o estado das estatísticas no domínio:

* `userId`
* `score`
* `wins`
* `matches`

---

### 📌 Strategy Pattern – Cálculo de Score

Interface:

```ts
interface StatsStrategy {
  calculateScore(base: number, delta: number): number;
}
```

Implementação padrão:

```ts
novoScore = scoreAtual + deltaScore
```

Essa abordagem permite evolução futura (ex: multiplicadores, bônus, penalidades).

---

## 📦 Persistência (Prisma + PostgreSQL)

### 📄 Schema Prisma

```prisma
model UserStats {
  id      Int    @id @default(autoincrement())
  userId  Int    @unique
  score   BigInt @default(0)
  wins    BigInt @default(0)
  matches BigInt @default(0)
}
```

Características:

* `userId` único por usuário
* Uso de **BigInt** para suportar crescimento de score
* Operações realizadas via **upsert**

---

## 🗄️ Repositórios

### Interface: `IStatisticsRepository`

Define os contratos:

* `findByUserId`
* `findAllOrderedByScore`
* `upsertUserStats`

### Implementação Principal

* **PrismaStatisticsRepository**
* Utiliza `PrismaClient`
* Converte dados do banco para entidades de domínio
* Gerencia ciclo de vida da conexão

---

## 🎯 Use Cases

### ✔️ GetUserStatsUseCase

* Busca estatísticas por `userId`
* Retorna dados zerados caso não exista registro

### ✔️ GetRankingUseCase

* Retorna ranking geral
* Ordenação decrescente por `score`

---

## 🔧 Serviço de Aplicação

### `StatisticsService`

Responsabilidades:

* Consultar estatísticas individuais
* Gerar ranking geral
* Atualizar estatísticas após partidas
* Aplicar estratégia de cálculo de score
* Integrar opcionalmente com **Auth-Service** via gRPC

Integração com Auth-Service é **opcional** e utilizada apenas para validações e logs.

---

## 🛰️ Interface gRPC

### 📄 statistics.proto

```proto
service StatisticsService {
  rpc GetUserStats (GetUserStatusRequest) returns (UserStatsResponse);
  rpc GetRanking   (GetUserStatusRequest) returns (RankingResponse);
}

message GetUserStatusRequest {
  int32 userId = 1;
}

message UserStatsResponse {
  int32 userId = 1;
  int64 score = 2;
  int64 wins = 3;
  int64 matches = 4;
}

message RankingResponse {
  repeated UserStatsResponse users = 1;
}
```

---

## 🎛️ Controller gRPC

### `StatisticsGrpcController`

Métodos expostos:

* **GetUserStats** → retorna estatísticas de um usuário
* **GetRanking** → retorna ranking completo

Controllers delegam toda a lógica para os **Use Cases**.

---

## 🧩 Módulo NestJS

O **StatisticsModule**:

* Registra o client gRPC do Auth-Service
* Declara controllers e use cases
* Injeta o repositório Prisma via interface

---

## ▶️ Execução do Serviço

### Variáveis de Ambiente

| Variável       | Descrição              |
| -------------- | ---------------------- |
| `DATABASE_URL` | Conexão com PostgreSQL |

---

### Inicialização

O serviço é iniciado como **microserviço gRPC**:

```bash
npm install
npm run start:dev
```
