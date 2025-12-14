# 📋 Design Patterns Implementados — Quiz Gamer Project

Este documento descreve **de forma detalhada e alinhada ao código atualizado** os **Design Patterns** utilizados em todos os microsserviços do **Quiz Gamer Project**.

* **Por que o padrão foi usado**
* **Qual problema ele resolve**
* **Em quais microsserviços aparece**
* **Onde está aplicado no código**

---

## 🧩 Visão Geral dos Padrões Utilizados

| Padrão                     | Objetivo Principal                 |
| -------------------------- | ---------------------------------- |
| Repository                 | Isolar persistência do domínio     |
| Dependency Injection / IoC | Desacoplamento e testabilidade     |
| DTO                        | Contratos de comunicação           |
| Mapper                     | Conversão entre camadas            |
| Use Case                   | Orquestração da aplicação          |
| Adapter                    | Integração com protocolos externos |
| Strategy                   | Variação de algoritmos             |
| Builder                    | Construção de objetos complexos    |
| Chain of Responsibility    | Processamento sequencial           |
| Factory                    | Centralização de criação           |

---

## ✅ 1. Repository Pattern

### 📌 Problema Resolvido

Separar **regras de negócio** de **detalhes de persistência**, respeitando DDD e Clean Architecture.

### 🎯 Benefícios

* Domínio independente de banco
* Facilidade de testes
* Evolução tecnológica segura

### 📂 Onde Está Aplicado

| Microsserviço      | Interface (Domínio)    | Implementação (Infra)        |
| ------------------ | ---------------------- | ---------------------------- |
| Auth Service       | `UserRepositoryPort`   | `PrismaUserRepository`       |
| Match Service      | `MatchRepositoryPort`  | `InMemoryMatchRepository`    |
| Statistics         | `StatisticsRepository` | `PrismaStatisticsRepository` |
| Room Service       | Contrato implícito     | `PrismaService`              |

### 🧠 Observação Arquitetural

O **domínio nunca conhece Prisma**, apenas contratos.

---

## ✅ 2. Dependency Injection (DI) + IoC Container

### 📌 Problema Resolvido

Evitar dependências rígidas e permitir substituição de implementações.

### 🎯 Benefícios

* Cumpre o princípio da Inversão de Dependência (SOLID)
* Facilita mocks em testes
* Modularidade

### 📂 Onde Está Aplicado

* Todos os `*.module.ts`
* Providers com tokens simbólicos

### 🧠 Observação Arquitetural

Casos de uso dependem **de interfaces**, não de classes concretas.

---

## ✅ 3. DTO (Data Transfer Object)

### 📌 Problema Resolvido

Padronizar dados trafegados entre:

* gRPC
* GraphQL (BFF)
* API Gateway (Kong)

### 🎯 Benefícios

* Segurança
* Contratos claros
* Validação de entrada e saída

### 📂 Onde Está Aplicado

* `*/src/application/dto/`

DTOs **não são entidades de domínio**.

---

## ✅ 4. Mapper Pattern

### 📌 Problema Resolvido

Evitar vazamento de entidades entre camadas.

### 🎯 Benefícios

* Conversão centralizada
* Evolução independente das APIs

### 📂 Onde Está Aplicado

* `auth-service/src/application/mappers`
* `match-service/src/application/mappers`

### 🧠 Observação

Mapper é um **anti-corruption layer** interno.

---

## ✅ 5. Use Case Pattern

### 📌 Problema Resolvido

Separar **ações do sistema** da infraestrutura.

### 🎯 Benefícios

* Controllers finos
* Testes isolados
* Clareza de fluxo

### 📂 Onde Está Aplicado

* `*/src/application/use-cases/`

Cada classe representa **uma intenção do usuário ou sistema**.

---

## ✅ 6. Adapter Pattern

### 📌 Problema Resolvido

Isolar protocolos externos da lógica interna.

### 🎯 Benefícios

* gRPC, GraphQL e HTTP não poluem o domínio
* Fácil troca de transporte

### 📂 Onde Está Aplicado

* Controllers gRPC
* Resolvers GraphQL (BFF)

Adapters traduzem **requisição externa → DTO → Use Case**.

---

## ✅ 7. Strategy Pattern

### 📌 Problema Resolvido

Permitir múltiplos algoritmos sem condicionais complexos.

### 🎯 Benefícios

* Extensibilidade
* Polimorfismo
* Código limpo

### 📂 Onde Está Aplicado

* Question Service (dificuldade)
* Match Service (pontuação)

Strategies são selecionadas **em tempo de execução**.

---

## ✅ 8. Builder Pattern

### 📌 Problema Resolvido

Construção de objetos complexos (prompts, partidas).

### 🎯 Benefícios

* Legibilidade
* Segurança de construção

### 📂 Onde Está Aplicado

* `question-prompt.builder.ts`
* `CreateMatchDto` (Match Service)

---

## ✅ 9. Chain of Responsibility

### 📌 Problema Resolvido

Processar respostas externas com múltiplas etapas.

### 🎯 Benefícios

* Pipeline desacoplado
* Reutilização

### 📂 Onde Está Aplicado

* Sanitização de respostas da OpenRouter

Cada handler faz **uma única responsabilidade**.

---

## ✅ 10. Factory Pattern

### 📌 Problema Resolvido

Centralizar criação de objetos complexos ou polimórficos.

### 🎯 Benefícios

* Reduz acoplamento
* Facilita testes

### 📂 Onde Está Aplicado

* Strategy Factory
* Sanitizer Factory
* Configurações gRPC

