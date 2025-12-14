# 📘 Diagramas

Este documento descreve os **diagramas de arquitetura** do **Quiz Game Project**, utilizando **PlantUML** para representar a aplicação segundo os princípios de **DDD (Domain-Driven Design)**, **Clean Architecture** e o **C4 Model**.

Os diagramas ajudam a visualizar tanto a **estrutura interna de cada microserviço** quanto a **visão geral do sistema**.

---

## 🧱 Visão Geral da Arquitetura

O projeto é composto por **cinco microserviços independentes**, que se comunicam principalmente via **gRPC** e seguem responsabilidades bem definidas:

| Microserviço           | Responsabilidade                        |
| ---------------------- | --------------------------------------- |
| **Auth Service**       | Autenticação, registro e emissão de JWT |
| **Room Service**       | Criação e gerenciamento de salas        |
| **Match Service**      | Execução da partida, regras e pontuação |
| **Question Service**   | Geração dinâmica de perguntas por IA    |
| **Statistics Service** | Estatísticas, ranking e histórico       |

Essa separação reforça **baixo acoplamento**, **alta coesão** e facilita evolução e manutenção do sistema.

---
## 📂 Diagramas do Projeto

Os diagramas PlantUML estão organizados por microserviço:

* [auth.puml](c4-component-auth.puml)
* [room.puml](c4-component-auth.puml)
* [match.puml](c4-component-auth.puml)
* [question.puml](c4-component-auth.puml)
* [statistics.puml](c4-component-auth.puml)
* [context.puml](c4-component-auth.puml)

---

## 🧩 Diagramas de Componentes (Clean Architecture)

Cada microserviço possui um **diagrama de componentes** que segue o mesmo padrão arquitetural:

*帮助 Visualização clara das camadas

* Aplicação do **Clean Architecture**
* Isolamento do domínio
* Dependências sempre apontando para dentro

### Estrutura comum dos diagramas

Todos os diagramas apresentam:

* **Controllers** (HTTP ou gRPC)
* **Use Cases (Application Layer)**
* **Domain Services / Entities**
* **Ports (Interfaces)**
* **Adapters** (repositórios, clients externos)
* **Infraestrutura**

---

## 📐 Descrição dos Diagramas

### 🔐 Auth Service – Component Diagram

Demonstra o fluxo de autenticação:

* Controllers HTTP
* Use Cases: **Login**, **Register**, **RefreshToken**
* Serviço de domínio de autenticação
* Provider de JWT
* Repositório (Prisma)
* Entidade **User**

Focado em segurança, validação e geração de tokens.

---

### 🏠 Room Service – Component Diagram

Responsável pelo fluxo pré-jogo:

* Controller gRPC
* Use Cases: **CreateRoom**, **JoinRoom**, **StartMatch**, **GetRoomStatus**
* Serviço de domínio de salas
* Repositório (in-memory ou persistente)
* Ports gRPC para **Auth** e **Match**
* Entidade **Room**

---

### 🎮 Match Service – Component Diagram

Coração do jogo:

* Controller gRPC
* Use Cases: **CreateMatch**, **AnswerQuestion**, **GetStatus**, **GetRanking**
* Regras de pontuação, rounds e tempo
* Repositórios
* Ports gRPC para **Question** e **Auth**
* Entidade **Match**

Concentra as regras críticas do domínio.

---

### ❓ Question Service – Component Diagram

Focado na geração inteligente de perguntas:

* Controller gRPC
* Use Case de geração de perguntas
* **PromptBuilder**
* **DifficultyStrategyFactory**
* Gateway com retry
* Cliente de IA (OpenRouter)
* Pipeline de sanitização

Mantém a lógica de IA isolada do restante do sistema.

---

### 📊 Statistics Service – Component Diagram

Responsável por dados históricos:

* Controller gRPC
* Use Cases: **GetUserStats**, **GetRanking**
* Serviço de estatísticas
* Estratégias de cálculo de score
* Repositório (Prisma)
* Entidade **UserStats**

---

## 🌐 C4 Model – Container Diagram

O diagrama de **Containers** apresenta uma visão macro do sistema:

* Usuário (Player)
* Todos os microserviços
* Comunicação entre eles
* Bancos de dados
* Protocolos utilizados (HTTP / gRPC)

Esse diagrama mostra como o sistema funciona **end-to-end**.

---

### Dependência comum em todos os diagramas

```plantuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Component.puml
```

