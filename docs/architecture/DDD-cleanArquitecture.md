# 🧠 Quiz Gamer Project — DDD & Clean Architecture

## 1. Objetivo deste Documento

Este documento descreve **em detalhes** como o **Quiz Gamer Project** aplica **Domain-Driven Design (DDD)** e **Clean Architecture** **em nível de sistema** e **em cada microsserviço**.

---

## 2. Visão Arquitetural Global

O projeto é composto por **múltiplos microsserviços independentes**

| Microsserviço      |Responsabilidade Principal                    |
| ------------------ |--------------------------------------------- |
| Auth Service       | Autenticação, autorização e emissão de tokens |
| Room Service       | Gerenciamento de salas e jogadores            |
| Match Service      | Controle de partidas, rounds e pontuação      |
| Question Service   | Fornecimento e seleção de perguntas           |
| Statistics         | Rankings, histórico e métricas                |

Cada microsserviço:

* Possui **domínio isolado**
* Possui **banco de dados próprio**
* Implementa **DDD + Clean Architecture internamente**

---

## 3. Princípios Fundamentais Utilizados

### 3.1 Domain-Driven Design (DDD)

Aplicado para:

* Modelar corretamente o **domínio do jogo**
* Evitar anemias de modelo
* Criar **linguagem ubíqua** clara entre código e negócio

DDD é aplicado **dentro de cada microsserviço**, não globalmente.

### 3.2 Clean Architecture

Aplicada para:

* Isolar regras de negócio de frameworks
* Facilitar testes unitários
* Permitir evolução tecnológica sem impacto no domínio

As dependências sempre apontam **para o centro (domínio)**.

---

## 4. Estrutura Base de um Microsserviço

Todos os microsserviços seguem a mesma estrutura padrão:

```
/src
 ├─ domain
 │   ├─ entities
 │   └─ repositories                            
 │
 ├─ application
 │   ├─ use-cases
 │   └─ dto
 │
 ├─ infrastructure
 │   ├─ controllers (gRPC)
 │   └─ modules
 │
 └─ main.ts
```

---

## 5. Camadas da Clean Architecture

### 5.1 Domain (Camada de Domínio)

📌 **Camada mais importante do sistema**

Responsabilidades:

* Regras de negócio puras
* Entidades ricas
* Value Objects
* Contratos de repositório

Exemplos:

* `User`
* `Match`
* `Room`
* `Score`

---

### 5.2 Application (Camada de Aplicação)

Responsável por **orquestrar casos de uso**.

Funções:

* Coordenar entidades
* Aplicar regras de negócio
* Definir fluxos de execução

Contém:

* Use Cases (`CreateMatchUseCase`, `JoinRoomUseCase`)
* DTOs
* Ports (interfaces para infraestrutura)


---

### 5.3 Infrastructure (Camada de Infraestrutura)

Camada externa responsável por **detalhes técnicos**.

Inclui:

* Controllers gRPC / HTTP
* Repositórios Prisma
* Integração RabbitMQ
* Configurações de banco

Implementa **interfaces definidas nas camadas internas**.

---

## 6. Ports & Adapters (Hexagonal)

O projeto combina **Clean Architecture + Arquitetura Hexagonal**.

### Exemplo:

* `UserRepositoryPort` → definido no domínio
* `PrismaUserRepository` → implementado na infraestrutura

Benefícios:

* Substituição de tecnologia sem impacto
* Testes unitários simples

---

## 7. Aplicação por Microsserviço

### 7.1 Auth Service

#### Domínio

* Entidade: `User`
* Value Objects: `Email`, `Password`

#### Application

* `RegisterUserUseCase`
* `LoginUseCase`
* `ValidateTokenUseCase`

#### Infrastructure

* `AuthGrpcController`
* `JwtServiceAdapter`
* `PrismaUserRepository`

Padrões:

* Repository
* Adapter
* Factory

---

### 7.2 Room Service

Domínio focado em **estado de sala**.

Entidades:

* `Room`
* `Player`

Use Cases:

* `CreateRoomUseCase`
* `JoinRoomUseCase`
* `LeaveRoomUseCase`

Eventos via RabbitMQ notificam alterações de estado.

Padrão dominante:

* Observer

---

### 7.3 Match Service

Domínio mais complexo do sistema.

Entidades:

* `Match`
* `Round`
* `Score`

Use Cases:

* `CreateMatchUseCase`
* `StartRoundUseCase`
* `FinishMatchUseCase`

Padrões:

* Strategy (pontuação)
* Builder (criação de partida)
* Observer (rounds)

---

### 7.4 Question Service

Domínio focado em **conteúdo e regras de seleção**.

Entidades:

* `Question`
* `Answer`

Use Cases:

* `GetRandomQuestionUseCase`
* `FilterQuestionByDifficultyUseCase`

Padrão dominante:

* Strategy (seleção)

---

### 7.5 Statistics Service

Responsável por métricas e ranking.

Entidades:

* `PlayerStats`
* `MatchHistory`

Use Cases:

* `UpdateStatsUseCase`
* `GetRankingUseCase`

Padrões:

* Strategy (cálculo)
* Repository

---

## 8. Comunicação entre Microsserviços

### Síncrona (gRPC)

Usada quando:

* Dados imediatos são necessários
* Baixa latência é crítica

Exemplo:

* Match → Question
* Match → Statistics

---

### Assíncrona (RabbitMQ)

Usada para:

* Eventos de domínio
* Coreografia
* Desacoplamento

Exemplo:

* MatchFinishedEvent
* RoomUpdatedEvent


