# PLANO.md — Plano de Implementação

Plano para construir o MiniCRM a partir de uma pasta vazia. Deve ser lido em conjunto com o `AGENTS.md` e o `REQUISITOS.md`.

> **Variante desta pasta:** projeto **backup (completo)** — porta de host **3012**, container `minicrm-backup`. As demais variantes usam o mesmo conteúdo e diferem apenas na porta e no nome do container: do zero (3010 / `minicrm-do-zero`) e semi-iniciado (3011 / `minicrm-semi`).

## 1. Objetivo

Construir o sistema descrito em `REQUISITOS.md` em etapas pequenas e verificáveis, começando pela estrutura e pelo ambiente, e evoluindo até todas as funcionalidades.

## 2. Stack e versões

- **Runtime:** Node.js 22, executado dentro de container.
- **Framework:** Nuxt 3 (Vue 3) + TypeScript.
- **Estilo:** Tailwind CSS 3.
- **Banco:** SQLite com Prisma ORM 6.
- **Validação:** Zod 3.
- **Testes:** Vitest 3.
- **Infraestrutura:** Docker e Docker Compose.
- **Gerenciador de pacotes:** npm.

## 3. Estrutura de pastas

```
pages/            Páginas (roteamento automático do Nuxt)
layouts/          Layouts (default e auth)
middleware/       Middleware de rota
composables/      Composables do frontend
server/api/       Rotas de API
server/middleware/ Middleware de servidor
server/utils/     Utilitários do servidor (auto-importados)
utils/            Utilitários do frontend (auto-importados)
prisma/           Schema e seed
data/             Banco SQLite (volume mapeado)
tests/            Testes automatizados
```

## 4. Infraestrutura (Docker)

O ambiente roda inteiramente em container. O host precisa apenas do Docker.

### Dockerfile

```dockerfile
FROM node:22-bookworm-slim

RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

EXPOSE 3010

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3010"]
```

### docker-compose.yml

```yaml
services:
  minicrm:
    build: .
    container_name: minicrm-backup
    restart: unless-stopped
    user: "${APP_UID:-1000}:${APP_GID:-1000}"
    ports:
      - "3012:3010"
    environment:
      NUXT_HOST: "0.0.0.0"
      NUXT_PORT: "3010"
      DATABASE_URL: "file:../data/minicrm.db"
      AUTH_SECRET: "troque-por-uma-chave-aleatoria-de-32-bytes"
    volumes:
      - .:/app
      - ./data:/app/data
    command: >
      sh -c "npm install &&
             npx prisma generate &&
             npx prisma db push &&
             npm run db:seed &&
             npm run dev -- --host 0.0.0.0 --port 3010"
```

**Pontos importantes:**

- O container roda com o mesmo usuário do host (`APP_UID`/`APP_GID`), evitando arquivos com dono `root`.
- O banco fica em `data/minicrm.db`, em um volume mapeado (`./data:/app/data`), acessível e editável pelo host com qualquer aplicativo de SQLite.
- O código é montado no container (`.:/app`), permitindo recarregamento automático.
- Todo comando de npm, Prisma ou teste é executado dentro do container.

### .dockerignore

```
node_modules
.nuxt
.output
.git
.gitignore
data
*.log
```

## 5. Variáveis de ambiente

`.env` (e `.env.example` sem valores reais):

```
DATABASE_URL="file:../data/minicrm.db"
AUTH_SECRET="troque-por-uma-chave-aleatoria-de-32-bytes"
APP_UID=1000
APP_GID=1000
```

## 6. Scripts (package.json)

```json
{
  "scripts": {
    "dev": "nuxt dev",
    "build": "nuxt build",
    "postinstall": "nuxt prepare",
    "db:push": "prisma db push",
    "db:seed": "prisma db seed",
    "db:studio": "prisma studio",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}
```

Dependências: `nuxt`, `vue`, `vue-router`, `@prisma/client`, `zod`.
Dependências de desenvolvimento: `prisma`, `@nuxtjs/tailwindcss`, `tsx`, `vitest`.

## 7. Banco de dados (Prisma)

### Schema

```prisma
model User {
  id        Int      @id @default(autoincrement())
  nome      String
  email     String   @unique
  senhaHash String
  criadoEm  DateTime @default(now())

  @@map("users")
}

model Lead {
  id       Int      @id @default(autoincrement())
  nome     String
  email    String   @unique
  telefone String
  status   String   @default("novo")
  criadoEm DateTime @default(now())

  @@map("leads")
}
```

### Seed

- Cria o usuário administrador `admin@minicrm.com` com senha `admin123` (com hash).
- Cria cerca de 12 leads de exemplo, com status e datas variados.
- Deve ser idempotente (usar `upsert`), para poder rodar várias vezes sem duplicar.

## 8. Segurança e autenticação

- **Hash de senha:** usar `scrypt` do módulo `crypto` do Node, com salt aleatório. Formato armazenado: `salt:hash`.
- **Sessão:** cookie HTTP-only com token assinado por HMAC-SHA256, contendo o id do usuário e validade (por exemplo, 8 horas).
- **Proteção de páginas:** middleware de rota global redireciona para `/login` quando não há sessão.
- **Proteção de APIs:** middleware de servidor exige sessão em todas as rotas `/api/`, exceto `/api/auth/`.
- **Rotas de autenticação:** `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`.
- **Página:** `/login` com formulário de e-mail e senha.
- O segredo da assinatura vem da variável `AUTH_SECRET`.

## 9. Validação (Zod)

- `leadSchema`: nome (3 a 120), e-mail válido (até 160), telefone (8 a 20), status entre `novo`, `contatado`, `qualificado`, `perdido`.
- `loginSchema`: e-mail válido e senha com no mínimo 6 caracteres.
- Toda entrada de API é validada antes de chegar ao banco.
- Erros de validação retornam HTTP 400 com os campos inválidos.

## 10. Testes (Vitest)

- Testar o schema de validação de lead.
- Testar o gerador de CSV (cabeçalho, escape de caracteres, valores nulos).
- Testar o hash de senha e o token de sessão.
- Executar com `docker compose exec minicrm npm test`.

## 11. Etapas

### Etapa 1 — Estrutura base e ambiente
- Criar o projeto Nuxt 3 com TypeScript.
- Configurar Tailwind CSS.
- Criar `Dockerfile`, `docker-compose.yml`, `.dockerignore`, `.env` e `.env.example`.
- Configurar Prisma, schema e seed.
- Criar o layout base, a página inicial e o CSS global.
- Subir o container e confirmar que a aplicação responde.

### Etapa 2 — Autenticação (RF-01)
- Criar o modelo `User` e o usuário administrador no seed.
- Implementar hash de senha e token de sessão.
- Criar as rotas de login, logout e sessão atual.
- Criar a página `/login` e o layout de autenticação.
- Proteger páginas e APIs.
- Exibir o usuário e a ação de sair no layout.

### Etapa 3 — Cadastro de leads (RF-02)
- Página `/cadastro` com formulário.
- Rota `POST /api/leads` com validação.
- Tratamento de conflito de e-mail (HTTP 409).

### Etapa 4 — Listagem de leads (RF-03)
- Página `/leads` com tabela.
- Rota `GET /api/leads` com busca e filtro por status.

### Etapa 5 — Dashboard (RF-04)
- Página `/dashboard`.
- Rota `GET /api/leads/stats` com total, últimos 7 dias e distribuição por status.

### Etapa 6 — Exportação (RF-05)
- Página `/exportar`.
- Rota `GET /api/leads/export` que devolve CSV.
- Utilitário de geração de CSV com escape correto.

### Etapa 7 — Revisão e entrega
- Revisar segurança e validações.
- Garantir que todos os testes passam.
- Atualizar `README` e `CHANGELOG`.
- Registrar as tarefas concluídas.

### Etapa 8 — Automação com skill (opcional)
- Criar uma skill para padronizar o encerramento de tarefas: rodar os testes, atualizar o `TASKS.md`/`CHANGELOG.md` e registrar no Git.
- Salvar em `.opencode/skills/<nome>/SKILL.md`, com `name` e `description` no cabeçalho e o passo a passo no corpo.
- Usar comandos executados dentro do container.

## 12. Como validar o projeto

```bash
docker compose up -d --build
# acesse http://localhost:3012 (container minicrm-backup)
```

- Fazer login com `admin@minicrm.com` / `admin123`.
- Cadastrar um lead e conferir a listagem.
- Conferir o dashboard e o download do CSV.
- Rodar os testes: `docker compose exec minicrm npm test`.
