# 📌 Quiz Gamer Project

Projeto de um **jogo multiplayer em tempo real** onde jogadores respondem perguntas com tempo limitado para acumular pontos. O sistema atualiza pontuação, ranking global e gerencia salas e estado geral da partida.

## 🧩 Microserviços

### **Auth Service**

* Login, registro e autenticação com JWT

### **Room Service**

* Criar/entrar/sair de salas
* Notificar MatchEngine quando sala for iniciada

### **Question Service**

* Gerar e armazenar perguntas
* Pode consumir IA externa

### **Match Engine**

* Gerencia partida: iniciar, enviar perguntas, validar respostas
* Calcular pontos e emitir **scoreUpdate** e **roundResult**

### **Ranking Service**

* Calcular e expor ranking global

### **Game Service**

* Supervisão da partida e histórico
* Failover do MatchEngine

### **Gateway (GraphQL)**

* Único ponto de acesso ao front-end

---

## 📂 Estrutura (resumo)

```
quiz-gamer-project/
├── auth-service/
├── room-service/
├── question-service/
├── match-engine/
├── ranking-service/
├── game-service/
├── gateway/
├── cli/
└── kong/
```
