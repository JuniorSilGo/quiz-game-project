# 🚀 Quiz Game - Guia de Inicialização

## Arquitetura

```
┌─────────────────────────────────────────────────────────────────┐
│                      KONG API GATEWAY                           │
│                    (Porta 8000 - Pública)                       │
│    ┌─────────────────────────────────────────────────────────┐  │
│    │  /auth/*      → auth-service:3001    (sem JWT)          │  │
│    │          │  │
│    │  /graphql     → room-service:3000    (com JWT)          │  │
│    └─────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     MICROSERVIÇOS (gRPC)                        │
├─────────────┬───────────────┬───────────────┬───────────────────┤
│ auth-service│ room-service  │ match-service │ question-service  │
│ :50051      │ :50052        │ :50053        │ :50054            │
└─────────────┴───────────────┴───────────────┴───────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     INFRAESTRUTURA                              │
├─────────────────────────────┬───────────────────────────────────┤
│      PostgreSQL (:5432)     │       RabbitMQ (:5672)            │
└─────────────────────────────┴───────────────────────────────────┘
```

## Pré-requisitos

- Docker e Docker Compose instalados
- Chave de API do OpenRouter (para question-service)

## Configuração

1. **Configure as variáveis de ambiente**:

Edite o arquivo `.env` na raiz do projeto:

```env
# OpenRouter API (para geração de perguntas)
OPENROUTER_API_KEY=sua-chave-aqui
OPENROUTER_MODEL=mistralai/mistral-7b-instruct

# JWT Secret (deve ser o mesmo do kong.yml)
JWT_SECRET=MEU_SUPER_SECRET
```

## Inicialização

### Subir todos os serviços:

```bash
docker-compose up --build
```

### Subir em background:

```bash
docker-compose up --build -d
```

### Ver logs de um serviço específico:

```bash
docker-compose logs -f auth-service
docker-compose logs -f kong
```

## Endpoints via Kong (Porta 8000)

### Autenticação (sem JWT)

```bash
# Registrar usuário
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"jogador1","email":"jogador1@test.com","password":"senha123"}'

# Login
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"usernameOrEmail":"jogador1","password":"senha123"}'
```

### Salas (com JWT)

```bash
# Substitua <TOKEN> pelo token recebido no login
curl http://localhost:8000/rooms \
  -H "Authorization: Bearer <TOKEN>"

# GraphQL
curl -X POST http://localhost:8000/graphql \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{"query":"{ rooms { id name } }"}'
```

## Portas dos Serviços

| Serviço            | HTTP    | gRPC  | Descrição                    |
|--------------------|---------|-------|------------------------------|
| Kong Proxy         | 8000    | -     | API Gateway (entrada pública)|
| Kong Admin         | 8001    | -     | Admin do Kong                |
| auth-service       | 3001    | 50051 | Autenticação                 |
| room-service       | 3000    | 50052 | Gerenciamento de salas       |
| match-service      | -       | 50053 | Gerenciamento de partidas    |
| question-service   | -       | 50054 | Geração de perguntas (LLM)   |
| statistics-service | -       | 50050 | Estatísticas                 |
| PostgreSQL         | 5432    | -     | Banco de dados               |
| RabbitMQ           | 5672    | -     | Message Broker               |
| RabbitMQ UI        | 15672   | -     | Interface de administração   |

## Acessos de Administração

- **RabbitMQ Management**: http://localhost:15672
  - Usuário: `quiz_user`
  - Senha: `quiz_password`

- **Kong Admin API**: http://localhost:8001

## Troubleshooting

### Erro de conexão com banco de dados
```bash
# Verifique se o PostgreSQL está rodando
docker-compose logs postgres
```

### Erro de JWT no Kong
- Verifique se o `JWT_SECRET` no `.env` é o mesmo do `kong.yml`
- O secret no kong.yml está em: `consumers[0].jwt_secrets[0].secret`

### Question-service não gera perguntas
- Verifique se `OPENROUTER_API_KEY` está configurado no `.env`
- Teste a chave diretamente: `curl https://openrouter.ai/api/v1/models -H "Authorization: Bearer $OPENROUTER_API_KEY"`

### Parar todos os serviços
```bash
docker-compose down
```

### Limpar tudo (incluindo volumes)
```bash
docker-compose down -v
```

## Fluxo de Autenticação

1. Cliente faz `POST /auth/register` ou `POST /auth/login`
2. Auth-service retorna JWT com payload: `{ sub, username, email, iss: "auth-service" }`
3. Cliente inclui token em requisições: `Authorization: Bearer <token>`
4. Kong valida o JWT usando o secret compartilhado
5. Se válido, requisição é encaminhada ao serviço destino
