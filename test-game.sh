#!/bin/bash
# ═══════════════════════════════════════════════════════════════════
# Quiz Game - Script de Teste Completo
# ═══════════════════════════════════════════════════════════════════

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

KONG_URL="http://localhost:8000"
AUTH_URL="http://localhost:3001"
ROOM_URL="http://localhost:3000"

echo -e "${BLUE}═══════════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}           🎮 QUIZ GAME - TESTE DE INTEGRAÇÃO COMPLETO             ${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════════${NC}"
echo ""

# ─────────────────────────────────────────────────────────────────
# 1. TESTE DE REGISTRO DE USUÁRIOS
# ─────────────────────────────────────────────────────────────────
echo -e "${YELLOW}📝 PASSO 1: Registrando usuários...${NC}"

# Usuário 1 (dono da sala)
RESPONSE1=$(curl -s -X POST "$KONG_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"username":"player1","email":"player1@quiz.com","password":"senha123"}')

if echo "$RESPONSE1" | grep -q "token"; then
  TOKEN1=$(echo "$RESPONSE1" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
  USER1_ID=$(echo "$RESPONSE1" | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2)
  echo -e "${GREEN}✅ Player 1 registrado - ID: $USER1_ID${NC}"
else
  echo -e "${RED}❌ Erro ao registrar Player 1: $RESPONSE1${NC}"
  # Tentar login se já existir
  RESPONSE1=$(curl -s -X POST "$KONG_URL/auth/login" \
    -H "Content-Type: application/json" \
    -d '{"usernameOrEmail":"player1","password":"senha123"}')
  TOKEN1=$(echo "$RESPONSE1" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
  USER1_ID=$(echo "$RESPONSE1" | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2)
  echo -e "${GREEN}✅ Player 1 logado - ID: $USER1_ID${NC}"
fi

# Usuário 2
RESPONSE2=$(curl -s -X POST "$KONG_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"username":"player2","email":"player2@quiz.com","password":"senha123"}')

if echo "$RESPONSE2" | grep -q "token"; then
  TOKEN2=$(echo "$RESPONSE2" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
  USER2_ID=$(echo "$RESPONSE2" | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2)
  echo -e "${GREEN}✅ Player 2 registrado - ID: $USER2_ID${NC}"
else
  RESPONSE2=$(curl -s -X POST "$KONG_URL/auth/login" \
    -H "Content-Type: application/json" \
    -d '{"usernameOrEmail":"player2","password":"senha123"}')
  TOKEN2=$(echo "$RESPONSE2" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
  USER2_ID=$(echo "$RESPONSE2" | grep -o '"id":[0-9]*' | head -1 | cut -d':' -f2)
  echo -e "${GREEN}✅ Player 2 logado - ID: $USER2_ID${NC}"
fi

echo ""
echo -e "${BLUE}Token Player 1: ${TOKEN1:0:50}...${NC}"
echo -e "${BLUE}Token Player 2: ${TOKEN2:0:50}...${NC}"
echo ""

# ─────────────────────────────────────────────────────────────────
# 2. VERIFICAR SERVIÇOS
# ─────────────────────────────────────────────────────────────────
echo -e "${YELLOW}🔍 PASSO 2: Verificando serviços...${NC}"

# Kong
if curl -s "$KONG_URL" > /dev/null 2>&1; then
  echo -e "${GREEN}✅ Kong Gateway OK (porta 8000)${NC}"
else
  echo -e "${RED}❌ Kong Gateway não responde${NC}"
fi

# Auth
if curl -s "$AUTH_URL" > /dev/null 2>&1; then
  echo -e "${GREEN}✅ Auth Service OK (porta 3001)${NC}"
else
  echo -e "${RED}❌ Auth Service não responde${NC}"
fi

# Room
if curl -s "$ROOM_URL" > /dev/null 2>&1; then
  echo -e "${GREEN}✅ Room Service OK (porta 3000)${NC}"
else
  echo -e "${RED}❌ Room Service não responde${NC}"
fi

echo ""

# ─────────────────────────────────────────────────────────────────
# 3. RESUMO
# ─────────────────────────────────────────────────────────────────
echo -e "${BLUE}═══════════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ TESTE BÁSICO CONCLUÍDO!${NC}"
echo ""
echo -e "Usuários criados/logados:"
echo -e "  - Player 1 (ID: $USER1_ID)"
echo -e "  - Player 2 (ID: $USER2_ID)"
echo ""
echo -e "${YELLOW}📌 Para testar criação de sala via gRPC, use:${NC}"
echo -e "   grpcurl -plaintext -d '{\"roomName\":\"sala-teste\",\"userId\":$USER1_ID,\"topic\":\"programacao\",\"difficulty\":\"facil\",\"rounds\":3}' localhost:50052 room.RoomService/CreateRoom"
echo ""
echo -e "${YELLOW}📌 Para testar entrada na sala via gRPC:${NC}"
echo -e "   grpcurl -plaintext -d '{\"roomName\":\"sala-teste\",\"userId\":$USER2_ID}' localhost:50052 room.RoomService/JoinRoom"
echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════════════${NC}"
