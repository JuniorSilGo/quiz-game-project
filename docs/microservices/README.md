# 🎮 Quiz Gamer Project

## 📌 Visão Geral

O **Quiz Gamer Project** é uma plataforma de **jogo multiplayer em tempo real**, baseada em **arquitetura de microsserviços**, onde jogadores participam de partidas de quiz com tempo limitado, acumulam pontos e competem em rankings globais.

O projeto foi desenvolvido com foco em **arquitetura limpa, escalabilidade, desacoplamento e comunicação eficiente entre serviços**, aplicando **DDD, Clean Architecture, SOLID e Design Patterns**, além de práticas modernas como **mensageria, API Gateway, gRPC e BFF**.

---

## 🧩 Ecossistema de Microsserviços

Cada microsserviço possui **banco de dados próprio**, regras de negócio isoladas e comunicação bem definida.

| Serviço            | Responsabilidade Principal              
| ------------------ | ---------------------------------------- |
| Auth Service       | Autenticação e emissão de JWT            |
| Room Service       | Gerenciamento de salas e jogadores       |
| Match Service      | Controle de partidas, rounds e pontuação |
| Question Service   | Fornecimento de perguntas e respostas    |
| Statistics Service | Ranking, score e histórico de partidas   |

Documentação detalhada:

1. [Auth Service](ms_auth.md)
2. [Room Service](ms_room.md)
3. [Match Service](ms_match.md)
4. [Question Service](ms_question.md)
5. [Statistics Service](ms_statistics.md)

---

## 🏗️ Arquitetura Geral

* **Database per Service** (isolamento total de dados)
* **gRPC** para comunicação síncrona de baixa latência
* **RabbitMQ** para comunicação assíncrona baseada em eventos (coreografia)
* **Kong API Gateway** para roteamento, segurança e JWT
* **BFF GraphQL** como camada de integração com o frontend
* **Docker & Docker Compose** para orquestração local

📐 Diagramas C4 disponíveis em: `/docs/C4`

---

## 🧠 Padrões e Princípios Aplicados

### Princípios SOLID

* **SRP:** Cada serviço possui uma única responsabilidade
* **OCP:** Estratégias de score e seleção de perguntas extensíveis
* **LSP:** Portas e interfaces substituíveis
* **ISP:** Interfaces específicas por contexto
* **DIP:** Dependência de abstrações (Ports & Adapters)

### Design Patterns Utilizados

* **Repository** – acesso desacoplado ao banco (Prisma)
* **Strategy** – cálculo de score e seleção de perguntas
* **Observer** – eventos de partida, sala e ranking
* **Factory / Builder** – criação de entidades complexas
* **Adapter / Port** – integração com JWT, gRPC e mensageria

---

## 🔐 Segurança

* Autenticação baseada em **JWT** emitido pelo **Auth Service**
* Validação centralizada via **Kong Gateway**
* Tokens verificados por `iss`, `exp` e segredo compartilhado
* Serviços internos não expostos diretamente ao cliente

---

## 📡 Comunicação entre Serviços

### Síncrona (gRPC)

Utilizada para:

* Autenticação e validação de usuário
* Consulta de dados imediatos (perguntas, ranking)

### Assíncrona (RabbitMQ)

Utilizada para:

* Atualização de estatísticas pós-partida
* Eventos de início/fim de match
* Notificação de mudanças de estado

Essa abordagem garante **baixo acoplamento e alta escalabilidade**.

---

## 🚀 Tecnologias Utilizadas

* **Linguagem:** TypeScript
* **Framework:** NestJS
* **Banco de Dados:** PostgreSQL
* **ORM:** Prisma
* **Mensageria:** RabbitMQ
* **API Gateway:** Kong
* **Comunicação:** gRPC
* **Frontend API:** GraphQL (BFF)
* **Containerização:** Docker 
* **Versionamento:** Git

---

### Execute os serviços individualmente

```bash
npm run start:dev
```
---

## 📂 Estrutura do Repositório

```
/quiz-gamer-project
├── auth-service/
├── room-service/
├── match-service/
├── question-service/
├── statistics/
│   ├── application
│   ├── domain
│   └── infrastructure
├── kong/
├── .idea/
├── docs/
├── cli/
├── docker-compose.yml
└── README.md
```