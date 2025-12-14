# 🔐 Auth-Service

O **Auth-Service** é um microsserviço responsável pela **autenticação, autorização e gestão básica de usuários**, oferecendo login, registro, emissão e validação de tokens JWT, além da consulta de usuários via **gRPC**.

---

## 🚀 Funcionalidades

### 🔐 Autenticação

* Login por **username ou e-mail**
* Validação de credenciais com **argon2**
* Emissão de **JWT**
* Validação de tokens JWT

### 👤 Usuários

* Registro de usuários
* Busca de usuário por ID
* Respostas padronizadas via gRPC

---

## 🧱 Arquitetura (Clean Architecture)

```
src
├── application
│   ├── dto
│   ├── mappers
│   ├── ports
│   └── use-cases
│
├── domain
│   ├── entities
│   └── repositories
│
├── infrastructure
│   ├── grpc
│   │   └── controllers
│   ├── nest-modules
│   ├── persistence
│   └── services
│
├── config
└── main.ts
```

---

## 📂 Application Layer

Responsável pelos **casos de uso**, **DTOs**, **ports (interfaces)** e **mapeamentos**.

### 📄 DTOs Principais

* `RegisterUserInputDTO`
* `LoginInputDTO`
* `IssueTokenInputDTO`
* `IssueTokenOutputDTO`
* `ValidateTokenInputDTO`
* `ValidateTokenOutputDTO`
* `UserOutputDTO`
* `GetUserInputDTO`
* `TokenPayloadDTO`

### 🔁 Mappers

* Conversão **Entity → DTO**
* Conversão **DTO → gRPC Response**

Exemplos:

* `toUserOutputDTO`
* `toUserGrpcResponse`
* `toAuthGrpcResponse`

---

## 🔌 Ports (Interfaces)

### `JwtServicePort`

Define o contrato para geração e validação de JWT:

```ts
export interface JwtServicePort {
  sign(payload: TokenPayloadDTO): string;
  verify(token: string): TokenPayloadDTO;
}
```

---

## 📦 Use Cases

### `RegisterUserUseCase`

* Verifica duplicidade de username ou e-mail
* Gera hash de senha com **argon2**
* Persiste o usuário
* Retorna `UserOutputDTO`

### `LoginUseCase`

* Busca usuário por username ou e-mail
* Valida senha
* Retorna dados do usuário autenticado

### `IssueTokenUseCase`

* Gera JWT contendo:

  * `sub`
  * `username`
  * `email`
  * `iss`

### `ValidateTokenUseCase`

* Valida token JWT
* Retorna payload ou motivo de falha

### `GetUserUseCase`

* Busca usuário por ID
* Retorna DTO de saída

---

## 🧠 Domain Layer

Camada com **regras de negócio puras**, independente de frameworks.

### 📌 Entity

```ts
export class User {
  constructor(
    public readonly id: number,
    public readonly username: string,
    public readonly email: string,
    public readonly password: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
```

### 📌 Repository Port

```ts
export interface UserRepositoryPort {
  findByUsernameOrEmail(username: string, email: string): Promise<User | null>;
  findByLogin(usernameOrEmail: string): Promise<User | null>;
  create(username: string, email: string, password: string): Promise<User>;
  getById(userId: number): Promise<User>;
}
```

---

## 🏗 Infrastructure Layer

Responsável pelas **implementações concretas**, frameworks e integrações externas.

### 🎯 gRPC Controllers

#### `AuthGrpcController`

* `Login`
* `ValidateToken`

Fluxo do login:

1. `LoginUseCase`
2. `IssueTokenUseCase`
3. Retorno do `AuthResponse`

#### `UserGrpcController`

* `GetUser`
* `RegisterUser`

---

## 🔌 gRPC – Proto

```proto
syntax = "proto3";
package auth;

service AuthService {
  rpc ValidateToken (ValidateTokenRequest) returns (ValidateTokenResponse);
  rpc Login (LoginRequest) returns (AuthResponse);
}

service UserService {
  rpc GetUser      (GetUserRequest)   returns (User);
  rpc RegisterUser (RegisterRequest)  returns (User);
}
```

### Principais Messages

* `LoginRequest`
* `RegisterRequest`
* `AuthResponse`
* `ValidateTokenRequest`
* `ValidateTokenResponse`
* `User`

O contrato gRPC define **claramente os limites do microserviço**, garantindo comunicação consistente com outros serviços.

---

## 🗄 Persistência – Prisma ORM

### 📄 Schema Prisma

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider      = "prisma-client-js"
  binaryTargets = ["native", "linux-musl-openssl-3.0.x"]
}

model User {
  id        Int      @id @default(autoincrement())
  username  String   @unique
  email     String   @unique
  password  String   @map("password_hash")
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  @@map("user")
}
```

### 🧩 Repository Concreto

* `PrismaUserRepositoryPort`
* Implementa `UserRepositoryPort`
* Isola o Prisma do domínio

---

## 🔐 JWT Service

### `NestJwtService`

* Implementa `JwtServicePort`
* Utiliza `@nestjs/jwt`
* Totalmente desacoplado dos casos de uso

---

## ⚙️ Configuração gRPC

```ts
export const grpcServerOptions = {
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:' + (process.env.GRPC_PORT || '50051'),
    package: 'auth',
    protoPath: 'auth.proto',
  },
};
```

---

## ▶️ Como Executar

```bash
npm install
npm run start:dev
```
