# 🎮 Match Service

O **Match Service** é um microsserviço responsável por **gerenciar partidas de perguntas e respostas em tempo real**, controlando rodadas, tempo, pontuação e ranking dos jogadores.

---

## 🚀 Funcionalidades

* Criação de partidas (salas) com jogadores, tema e dificuldade
* Gerenciamento de rodadas com **timer automático**
* Recebimento e validação de respostas
* Cálculo dinâmico de pontuação baseado no tempo restante
* Avanço automático de rodada quando:

  * Todos os jogadores respondem **ou**
  * O tempo do round expira
* Consulta de status da partida
* Geração de ranking em tempo real
* Comunicação via **gRPC**

---

## 🧱 Arquitetura (Clean Architecture)

```
src
├── application
│   ├── dto
│   ├── mappers
│   └── use-cases
│
├── domain
│   ├── entities
│   └── repositories
│
├── infrastructure
│   ├── grpc
│   │   ├── controllers
│   │   └── proto
│   ├── persistence
│   │   └── in-memory
│   ├── services
│   └── nest-modules
│
├── config
└── main.ts
```

---

## 🧠 Domain Layer

### 📌 Entidade Principal — `Match`

Representa uma partida ativa em memória.

**Principais atributos:**

* `roomName`
* `ownerUserId`
* `userPlayersIds`
* `questions`
* `difficulty`
* `topic`
* `currentRound`
* `scores: Map<userId, score>`
* `answeredByRound: Map<round, Set<userId>>`
* `roundEndsAt`

---

### 📌 Value Object — `GeneratedQuestion`

```ts
interface GeneratedQuestion {
  statement: string;
  alternatives: Record<string, string>;
  correctAnswer: string;
}
```

---

### 📌 Repository Port

```ts
export interface MatchRepositoryPort {
  save(match: Match): void | Promise<void>;
  findByRoomName(roomName: string): Match | null | Promise<Match | null>;
  delete(roomName: string): void | Promise<void>;
  exists(roomName: string): boolean | Promise<boolean>;
  getAll(): Match[];
}
```

---

## 📂 Application Layer

Responsável pelos **casos de uso**, **DTOs** e **mapeamento de saída**.

### 🎯 Casos de Uso

#### ✔️ `CreateMatchUseCase`

* Cria uma nova partida
* Inicializa placar
* Define tempo do primeiro round
* Impede duplicidade de sala

#### ✔️ `AnswerQuestionUseCase`

* Valida se a pergunta existe
* Impede resposta duplicada por jogador
* Calcula pontuação baseada no tempo restante
* Avança rodada automaticamente quando todos respondem

#### ✔️ `GetMatchStatusUseCase`

Retorna:

* rodada atual
* tempo restante formatado (`mm:ss`)
* dificuldade e tema
* pergunta atual
* jogadores que já responderam

#### ✔️ `GetMatchRankingUseCase`

* Retorna ranking ordenado por pontuação

#### ✔️ `AdvanceExpiredRoundsUseCase`

* Avança rodada automaticamente quando o tempo expira
* Executado por um **timer agendado**

---

## ⏱️ Sistema de Tempo e Pontuação

* Duração de cada rodada: **30 segundos**
* Pontuação mínima: **100**
* Pontuação máxima: **250**

### Fórmula

```
pontos = MIN_POINTS + (MAX_POINTS - MIN_POINTS) * (tempo_restante / duração_do_round)
```

Quanto mais rápido o jogador responder corretamente, mais pontos ele recebe.

---

## 🔁 Timer Automático

O serviço possui um **scheduler interno**:

* Executa a cada **300ms**
* Verifica partidas com tempo expirado
* Avança o round automaticamente

Implementado em:

* `MatchTimerService`
* `AdvanceExpiredRoundsUseCase`

---

## 🔌 gRPC API

### 📄 Arquivo Proto

```
src/infrastructure/grpc/proto/match.proto
```

### Serviços Expostos

```proto
service MatchService {
  rpc CreateMatch       (CreateMatchRequest) returns (CreatedMatchResponse);
  rpc GetMatchStatus    (GetStatusRequest)   returns (MatchStatusResponse);
  rpc Answer            (AnswerRequest)      returns (AnswerResponse);
  rpc GetMatchRanking   (MatchRankingRequest) returns (MatchRankingResponse);
}
```

---

## 📦 Principais DTOs

### Criar partida

```ts
interface CreateMatchDto {
  roomName: string;
  userId: number;
  userPlayersIds: number[];
  questions: GeneratedQuestion[];
  difficulty: string;
  topic: string;
}
```

### Responder pergunta

```ts
interface AnswerDto {
  roomName: string;
  userId: number;
  answer: string;
}
```

### Status da partida

```ts
interface MatchStatusOutputDto {
  currentRound: number;
  timer: string;
  difficulty: string;
  topic: string;
  question: {
    statement: string;
    alternatives: Record<string, string>;
    userAnswerersIds: number[];
  } | null;
}
```

### Ranking

```ts
interface MatchRankingOutputDto {
  userRankings: {
    userId: number;
    score: number;
  }[];
}
```

---

## 🗄 Persistência

Atualmente o serviço utiliza um **repositório em memória**:

* `InMemoryMatchRepository`
* Ideal para testes, prototipação e ambientes de desenvolvimento
* Pode ser facilmente substituído por Redis, banco relacional ou NoSQL sem alterar os casos de uso

---

## ⚙️ Configuração gRPC

```ts
export const grpcServerOptions = {
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:50051',
    package: 'match',
    protoPath: 'match.proto',
  },
};
```

---

## ▶️ Como Executar

```bash
npm install
npm run start:dev
```


