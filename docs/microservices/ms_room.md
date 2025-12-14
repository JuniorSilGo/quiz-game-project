# 🏠 Room Service

O **Room Service** é um microsserviço responsável por **gerenciar salas de jogo (rooms)**, controlando a criação de salas, entrada de jogadores e a preparação do ambiente para o início de partidas.

Ele atua como **orquestrador inicial** do fluxo do jogo, integrando-se com outros microsserviços via **gRPC**, principalmente:

* **Question Service** → geração de perguntas
* **Match Service** (planejado) → execução da partida
* **Auth/User Service** (planejado) → validação de usuários

---

## 🚀 Responsabilidades

* Criar salas de jogo
* Persistir estado da sala no banco de dados
* Gerenciar jogadores dentro da sala
* Controlar status da sala (WAITING, READY, STARTED, FINISHED)
* Solicitar perguntas ao **Question Service**
* Preparar dados para criação de partidas no **Match Service**

---

## 🧱 Arquitetura

```
src
├── application
│   ├── dto
│   ├── interfaces
│   └── use-case
│
├── domain
│   ├── entities
│   ├── repositories
│   └── services
│
├── infrastructure
│   ├── db
│   ├── grpc
│   └── presenters
│
├── interfaces
│   ├── grpc
│   └── http
│
└── main.ts
```

---

## 🧠 Camada de Domínio

### 📌 Entidade `RoomEntity`

```ts
export class RoomEntity {
  constructor(
    public readonly id: number | null,
    public name: string,
    public topic: string,
    public difficulty: string,
    public rounds: number,
    public createdById: number,
    public players: number[],
    public status: RoomStatus,
    public matchId: string | null,
  ) {}
}
```

### 📌 Enum `RoomStatus`

```ts
WAITING   // aguardando jogadores
READY     // pronta para iniciar
STARTED   // partida iniciada
FINISHED  // partida encerrada
```

---

### 📌 RoomFactory

Responsável por **validar regras de criação da sala**:

* nome obrigatório
* tópico obrigatório
* dificuldade obrigatória
* número mínimo de rounds ≥ 1

```ts
RoomFactory.create(input: CreateRoomInput)
```

---

## 📦 Persistência (Prisma + PostgreSQL)

### 📄 Schema Prisma

```prisma
model Room {
  id           Int        @id @default(autoincrement())
  name         String     @unique
  topic        String
  difficulty   String
  rounds       Int
  createdById  Int
  status       RoomStatus @default(WAITING)
  matchId      String?
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt
  players      RoomPlayer[]
}

model RoomPlayer {
  id       Int      @id @default(autoincrement())
  roomId   Int
  userId   Int
  joinedAt DateTime @default(now())

  @@unique([roomId, userId])
  @@index([userId])
}
```

---

### 📌 RoomRepository

```ts
export interface RoomRepository {
  create(room: RoomEntity): Promise<RoomEntity>;
  findByName(name: string): Promise<RoomEntity | null>;
  addPlayers(roomId: number, userId: number): Promise<void>;
  attachMatch(roomId: number, matchId: string): Promise<void>;
}
```

Implementação concreta:

* `RoomPrismaRepository`

---

## 🎯 Casos de Uso

### ✔️ CreateRoomUseCase

Fluxo atual:

1. Criação da sala via `RoomFactory`
2. Persistência no banco de dados
3. Chamada ao **Question Service** para gerar perguntas
4. Retorno da sala criada

```ts
CreateRoomUseCase.execute(CreateRoomInput)
```

---

### ✔️ JoinRoomUseCase

* Busca a sala pelo nome
* Verifica se o usuário já está na sala
* Adiciona o jogador
* Retorna o estado atualizado da sala

```ts
JoinRoomUseCase.execute({ roomName, userId })
```

---

## 🔌 Integração com Question Service (gRPC)

### 📌 Port

```ts
export interface QuestionsPort {
  generateQuestions(input: GenerateQuestionsInput): Promise<GenerateQuestionsOutput>;
}
```

### 📌 Adapter gRPC

* Implementado em `QuestionsGrpcAdapter`
* Converte Observable → Promise
* Padroniza retorno para o domínio

```ts
QuestionService.GenerateQuestions({ topic, difficulty, quantity })
```

---

## 🛰 Interface gRPC – Room Service

### 📄 room.proto

```proto
service RoomService {
  rpc CreateRoom (CreateRoomRequest) returns (RoomStatusResponse);
  rpc JoinRoom   (UserRoomRequest)   returns (RoomStatusResponse);
  rpc StartMatch (StartMatchRequest) returns (MatchStatusResponse);
}
```

### 📥 CreateRoomRequest

```proto
string roomName
int32 userId
string topic
string difficulty
int32 rounds
repeated int32 userPlayersIds
```

### 📤 RoomStatusResponse

```proto
int32 id
string name
string status
int32 userOwnerId
repeated int32 userPlayersId
int32 matchQtd
string topic
string difficulty
int32 rounds
string matchId
```

---

## 🧪 Interface HTTP (Debug)

> ⚠️ Endpoint temporário apenas para testes locais

```
GET /debug/room/find?name={roomName}
```

Retorna a sala ou mensagem de erro.

---

## ⚙️ Configuração e Execução

### Variáveis de Ambiente

| Variável            | Descrição                    |
| ------------------- | ---------------------------- |
| `DATABASE_URL`      | URL do PostgreSQL            |
| `QUESTION_GRPC_URL` | Endereço do Question Service |

---

### ▶️ Executar o serviço

```bash
npm install
npm run start:dev
```

