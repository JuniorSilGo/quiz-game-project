# 📘 Question Service – Geração de Perguntas com IA (gRPC + RabbitMQ)

O **Question Service** é um microsserviço responsável por **gerar perguntas de múltipla escolha** para um sistema de quiz, utilizando **modelos de IA via OpenRouter**.
O serviço suporta **execução síncrona (gRPC)** e **execução assíncrona com filas (RabbitMQ)**, incluindo **retry com backoff exponencial** e **Dead Letter Queue (DLQ)**.

---

## 🧠 Visão Geral da Arquitetura

### 🔹 Fluxo SÍNCRONO (gRPC direto)

1. Cliente chama `GenerateQuestions` via **gRPC**
2. `QuestionController` delega para o **GenerateQuestionsUseCase**
3. O *Use Case*:

   * valida variáveis de ambiente
   * seleciona a **estratégia de dificuldade**
   * constrói o prompt com `QuestionPromptBuilder`
   * chama o **Gateway de geração**
4. O gateway envia o prompt ao **OpenRouter**
5. A resposta passa por um **pipeline de sanitização**
6. O JSON é convertido para o **domínio** e retornado

---

### 🔹 Fluxo ASSÍNCRONO (RabbitMQ)

1. Cliente chama `EnqueueQuestionGeneration`
2. Um **job** é criado e publicado no RabbitMQ
3. `QuestionConsumerService` consome a mensagem
4. O `GenerateQuestionsUseCase` executa a geração
5. Em caso de falha:

   * o job é reenfileirado com **backoff exponencial**
   * após exceder tentativas → **Dead Letter Queue**
6. O status pode ser consultado via:

   * `GetJobStatus`
   * `GetAllJobs`
   * `RetryFailedJob`

---

## 🧩 Principais Componentes

### 1️⃣ GenerateQuestionsUseCase

Camada de **aplicação** responsável por orquestrar o processo:

* valida `OPENROUTER_API_KEY`
* define o modelo (`OPENROUTER_MODEL` ou default)
* escolhe a estratégia de dificuldade
* monta o prompt
* chama o gateway
* trata erros e logs

---

### 2️⃣ QuestionPromptBuilder (Builder Pattern)

Responsável por montar prompts **determinísticos e consistentes**.

Exemplo de prompt gerado:

```
Gere 3 perguntas de múltipla escolha sobre "matemática".
Nível de dificuldade: "medium".
Cada pergunta deve ter 4 alternativas (A, B, C, D) e uma resposta correta.
Responda SOMENTE com JSON válido, sem explicações ou texto fora do JSON.
Formato esperado:
[
  {
    "question": "texto da pergunta",
    "options": {"A": "A", "B": "B", "C": "C", "D": "D"},
    "correctAnswer": "A",
    "difficulty": "medium"
  }
]
```

---

### 3️⃣ Estratégias de Dificuldade (Strategy Pattern)

Cada dificuldade injeta instruções específicas no prompt:

| Dificuldade | Comportamento                     |
| ----------- | --------------------------------- |
| `easy`      | Linguagem simples, resposta óbvia |
| `medium`    | Raciocínio moderado               |
| `hard`      | Conceitos avançados e pegadinhas  |
| `default`   | Coerência básica                  |

Implementadas via `DifficultyStrategyFactory`.

---

### 4️⃣ Gateways de Geração

#### 🔹 OpenRouterClient

* envia requisição HTTP ao OpenRouter
* recebe resposta do modelo
* executa **pipeline de sanitização**
* converte JSON → domínio

#### 🔹 RetryingQuestionGenerationGateway

* adiciona **retry síncrono**
* tenta até **3 vezes** antes de falhar
* útil quando RabbitMQ não está disponível

---

### 5️⃣ Pipeline de Sanitização (Chain of Responsibility)

Remove ruídos comuns de LLMs:

✔ blocos `json` / ```
✔ tokens `[INST]`, `[ASSISTANT]`, `<s>`
✔ texto fora de JSON
✔ objetos isolados (normaliza para array)

Handlers:

* `TrimSanitizerHandler`
* `ArtifactSanitizerHandler`
* `JsonArraySanitizerHandler`

---

## 🐇 RabbitMQ – Processamento Assíncrono

### 🔁 Retry com Backoff Exponencial

Configuração:

* tentativas máximas: **5**
* delay inicial: **1s**
* delay máximo: **30s**
* multiplicador: **2x**

### 💀 Dead Letter Queue (DLQ)

Jobs que excedem o número máximo de tentativas são enviados para a DLQ.

O serviço:

* registra logs detalhados
* mantém jobs falhos em memória
* permite **retry manual** via gRPC

---

## 🛰 Interface gRPC (.proto)

```proto
syntax = "proto3";

package question;

service QuestionService {
  rpc GenerateQuestions (GenerateQuestionRequest) returns (GenerateQuestionResponse);
}

message GenerateQuestionRequest {
  string topic = 1;
  string difficulty = 2;
  int32 quantity = 3;
}

message Question {
  string statement = 1;
  map<string, string> alternatives = 2;
  string correctAnswer = 3;
}

message GenerateQuestionResponse {
  repeated Question questions = 1;
}
```

---

## 📦 Domínio

```ts
export interface Question {
  statement: string;
  alternatives: { [key: string]: string };
  correctAnswer: string;
}
```

---

## 🔧 Variáveis de Ambiente

| Variável             | Descrição                          |
| -------------------- | ---------------------------------- |
| `OPENROUTER_API_KEY` | **Obrigatória** – chave da API     |
| `OPENROUTER_MODEL`   | Modelo de IA (default: mistral-7b) |
| `RABBITMQ_URL`       | URL de conexão RabbitMQ            |

---
### ▶️ Executar o serviço

```bash
npm install
npm run start:dev
```