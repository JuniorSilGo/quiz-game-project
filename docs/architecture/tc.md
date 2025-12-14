# Decisões Arquiteturais e Técnicas

Este documento descreve e justifica as **principais decisões arquiteturais e tecnológicas** adotadas no **Quiz Gamer Project**, relacionando cada escolha aos requisitos funcionais, não funcionais e aos princípios de engenharia de software estudados ao longo do projeto.

O foco é demonstrar **consistência técnica**, **coerência arquitetural** e **aderência a boas práticas** utilizadas em sistemas distribuídos modernos.

---

## 1. Arquitetura de Microsserviços

O sistema foi projetado seguindo uma **arquitetura de microsserviços**, com o objetivo de garantir:

* **Escalabilidade independente** por domínio
* **Isolamento de falhas**
* **Evolução e deploy desacoplados**
* Melhor **organização por contexto de negócio (DDD)**

Cada microsserviço representa um **Bounded Context** bem definido:

* **auth-service**: autenticação, autorização e gestão de usuários
* **room-service**: gerenciamento de salas e presença de jogadores
* **question-service**: catálogo, filtragem e distribuição de perguntas
* **match-service**: controle de partidas, rodadas, tempo e respostas
* **statistics**: cálculo de ranking, estatísticas e histórico

### Database per Service

Cada microsserviço possui seu **próprio banco de dados PostgreSQL**, seguindo o princípio **Database per Service**, garantindo:

* Total **independência entre serviços**
* Redução de acoplamento entre domínios
* Possibilidade de escalar bancos individualmente
* Maior resiliência em caso de falhas

---

## 2. Linguagem — TypeScript (Obrigatório)

O projeto utiliza **TypeScript** como linguagem principal em todos os microsserviços.

### Justificativa técnica

* Tipagem estática reduz erros em tempo de execução
* Melhor suporte a refatorações seguras
* Autocomplete e análise estática avançada pela IDE
* Integração nativa e madura com **NestJS**
* Contratos fortemente tipados entre camadas (DTOs, Use Cases, Ports)

TypeScript se mostrou essencial para manter **consistência e confiabilidade** em um sistema distribuído.

---

## 3. API para Clientes — GraphQL (Obrigatório)

O acesso de clientes externos (web/mobile) é realizado via **GraphQL**, exposto por um **BFF (Backend for Frontend)**.

### Por que GraphQL?

* Evita **over-fetching e under-fetching** de dados
* Permite que o cliente defina exatamente o que precisa
* Schema fortemente tipado e auto-documentado
* Facilita agregação de dados vindos de múltiplos microsserviços
* Excelente experiência de desenvolvimento com Apollo Playground

O GraphQL atua como uma **camada de orquestração**, sem violar o isolamento dos microsserviços.

---

## 4. Comunicação Interna — gRPC (Obrigatório)

Para comunicação **síncrona entre microsserviços**, foi adotado **gRPC**.

### Benefícios do gRPC no projeto

* Alto desempenho (Protocol Buffers binário)
* Contratos explícitos via arquivos `.proto`
* Geração automática de clientes e stubs
* Tipagem forte entre serviços
* Ideal para chamadas servidor-servidor

O gRPC é utilizado principalmente em operações críticas e de baixa latência, como validação de token e obtenção de dados essenciais.

---

## 5. API Gateway — Kong (Obrigatório)

O **Kong Gateway** foi adotado como **ponto único de entrada** do sistema.

### Responsabilidades do Gateway

* Centralização da autenticação JWT
* Rate limiting e proteção contra abuso
* Configuração única de CORS
* Roteamento para BFF e serviços adequados

### Trade-off

* Introduz uma pequena latência adicional
* Em contrapartida, reduz complexidade nos microsserviços e aumenta a segurança global

---

## 6. Persistência — Prisma ORM

O acesso ao banco PostgreSQL é realizado majoritariamente via **Prisma ORM**.

### Motivos da escolha

* Excelente integração com TypeScript
* Tipagem automática baseada no schema
* Migrations simples e confiáveis
* Prisma Studio facilita inspeção de dados
* Schema declarativo mais legível que decorators tradicionais

O Prisma atua apenas na **camada de infraestrutura**, respeitando a Clean Architecture.

---

## 7. Um Banco por Microsserviço

A decisão de **não compartilhar bancos** foi fundamental para garantir a arquitetura proposta.

### Benefícios diretos

* Serviços verdadeiramente independentes
* Falhas isoladas
* Evolução de schema sem impacto global
* Aderência real ao modelo de microsserviços

Integrações entre dados ocorrem via **eventos (RabbitMQ)** ou chamadas gRPC bem definidas.

---

## 8. Framework — NestJS

O **NestJS** foi escolhido como framework padrão para todos os microsserviços.

### Justificativa

* Estrutura modular clara
* Injeção de dependência nativa
* Excelente suporte a GraphQL e gRPC
* Facilita aplicação de DDD e Clean Architecture
* Documentação madura e comunidade ativa

O NestJS atua como **framework de infraestrutura**, sem invadir regras de domínio.

---

## 9. Comunicação Assíncrona — Coreografia com RabbitMQ

Para cenários onde múltiplos serviços precisam reagir a um evento, adotou-se **coreografia de microsserviços** usando **RabbitMQ**.

### Motivações

* Evitar acoplamento síncrono excessivo
* Reduzir dependência direta entre serviços
* Aumentar resiliência do sistema

### Vantagens

* Desacoplamento total entre produtores e consumidores
* Serviços reagem de forma autônoma aos eventos
* Mensagens persistidas em fila em caso de falhas
* Escalabilidade horizontal por múltiplos consumidores
* Base para auditoria e observabilidade

---

## 10. Containerização — Docker

Todos os microsserviços são **containerizados com Docker**.

### Benefícios

* Consistência entre ambientes (dev, test, prod)
* Portabilidade
* Facilidade de orquestração com Docker Compose
* Setup simplificado para novos desenvolvedores

---

## 11. Arquitetura — DDD + Clean Architecture

Cada microsserviço segue rigorosamente **DDD (Domain-Driven Design)** aliado à **Clean Architecture**.

### Camadas

* **Domain**: entidades, agregados, regras de negócio puras
* **Application**: casos de uso, DTOs e portas
* **Infrastructure**: banco de dados, controllers gRPC/GraphQL, mensageria, mappers

### Benefícios

* Independência de frameworks e banco de dados
* Facilidade de testes unitários
* Alto nível de manutenibilidade
* Regras de negócio protegidas

---

## 12. Estrutura Geral do Projeto

```
quiz-gamer-project/
├─ auth-service/
│  └─ src/
│     ├─ application/
│     ├─ domain/
│     └─ infrastructure/
├─ match-service/
├─ question-service/
├─ room-service/
├─ statistics-service/
├─ cli/
├─ kong/
├─ docs/
└─ docker-compose.yml
```

---

Este conjunto de decisões garante que o **Quiz Gamer Project** seja um sistema **robusto, escalável, manutenível e alinhado às melhores práticas modernas de arquitetura de software distribuído**.
