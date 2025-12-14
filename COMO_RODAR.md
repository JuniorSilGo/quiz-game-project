# 🎮 Quiz Game - Como Rodar o Projeto

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado:

### 1. Docker Desktop
- **Windows**: Baixe em https://www.docker.com/products/docker-desktop/
- Após instalar, abra o Docker Desktop e aguarde ele iniciar (ícone fica verde)

### 2. Node.js (versão 18 ou superior)
- Baixe em https://nodejs.org/
- Escolha a versão LTS (recomendada)

### 3. Git
- Baixe em https://git-scm.com/downloads

---

## 🚀 Passo a Passo para Rodar

### 1. Clone o repositório

```bash
git clone https://github.com/JuniorSilGo/quiz-game-project.git
cd quiz-game-project
```

### 2. Inicie os containers Docker

```bash
docker-compose up -d --build
```

⏳ **Aguarde alguns minutos** na primeira vez (ele baixa as imagens e compila tudo).

### 3. Verifique se todos os serviços estão rodando

```bash
docker ps
```

Você deve ver **8 containers** rodando:
- `quiz_postgres` - Banco de dados
- `quiz_rabbitmq` - Mensageria
- `quiz_kong` - API Gateway
- `auth_service` - Autenticação
- `room_service` - Salas
- `match_service` - Partidas
- `question_service` - Perguntas (IA)
- `statistics_service` - Estatísticas

### 4. Instale as dependências do cliente de teste

```bash
npm install
```

### 5. Rode o cliente interativo

```bash
node test-game-interactive.js
```

---

## 🎯 Como Jogar

### Menu Principal:
```
1. Registrar novo usuário  → Crie sua conta
2. Login                   → Entre com sua conta
3. Criar sala              → Crie uma sala de quiz
4. Entrar em uma sala      → Entre em sala existente
5. Ver status do match     → Veja info da partida
6. Jogar quiz              → Responda as perguntas!
7. Ver ranking global      → Veja quem está ganhando
8. Ver minhas estatísticas → Veja seu desempenho
0. Sair
```

### Fluxo do Jogo:
1. **Registre-se** (opção 1) ou faça **Login** (opção 2)
2. **Crie uma sala** (opção 3):
   - Escolha um nome para a sala
   - Escolha o tópico (ex: "JavaScript", "História do Brasil", "Futebol")
   - Escolha a dificuldade: `easy`, `medium` ou `hard`
   - Escolha quantas perguntas (1-10)
3. **Jogue o quiz** (opção 6) - As perguntas são geradas por IA!
4. Veja o **ranking** (opção 7) para comparar com seus amigos

---

## 🔧 Comandos Úteis

### Parar todos os containers:
```bash
docker-compose down
```

### Ver logs de um serviço específico:
```bash
docker logs room_service --tail 50
docker logs question_service --tail 50
docker logs match_service --tail 50
```

### Reiniciar um serviço:
```bash
docker restart room_service
```

### Reiniciar tudo do zero:
```bash
docker-compose down -v
docker-compose up -d --build
```

### Ver se há erros:
```bash
docker-compose logs --tail 100
```

---

## ❓ Problemas Comuns

### "Connection refused" ou "Service unavailable"
- Aguarde mais um pouco, os serviços podem demorar para iniciar
- Verifique se o Docker está rodando: `docker ps`

### "Port already in use"
- Feche outros programas que usam as portas 5432, 5672, 8000
- Ou pare containers antigos: `docker-compose down`

### Perguntas não são geradas
- O question-service usa IA (Gemini). Verifique os logs:
  ```bash
  docker logs question_service --tail 30
  ```

### "ECONNREFUSED" no cliente
- Certifique-se que está na pasta do projeto
- Verifique se os containers estão rodando: `docker ps`

---

## 📁 Estrutura do Projeto

```
quiz-game-project/
├── auth-service/      → Cadastro e login de usuários
├── room-service/      → Criação e gerenciamento de salas
├── question-service/  → Geração de perguntas com IA
├── match-service/     → Controle das partidas
├── statistics/        → Ranking e estatísticas
├── docker-compose.yml → Configuração dos containers
└── test-game-interactive.js → Cliente de teste
```

---

## 🎮 Usuário de Teste

Se quiser usar um usuário já cadastrado:
- **Email**: bianca@teste.com
- **Senha**: 123456

---

## 💡 Dicas

1. **Tópicos divertidos para testar:**
   - "Memes da internet"
   - "Capitais do mundo"
   - "Filmes da Marvel"
   - "Curiosidades sobre gatos"

2. **Jogue com amigos:**
   - Um cria a sala
   - Os outros entram na mesma sala (opção 4)
   - Todos jogam e comparam no ranking!

---

## 🆘 Precisa de Ajuda?

Se algo não funcionar, mande os logs:
```bash
docker-compose logs > logs.txt
```

E compartilhe o arquivo `logs.txt` com o time.

---

Divirta-se! 🎉
