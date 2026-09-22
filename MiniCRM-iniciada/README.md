# MiniCRM

Sistema web interno para captura e acompanhamento de leads.

- **Stack:** Nuxt 3 (Vue 3) + TypeScript, Tailwind CSS 3, SQLite + Prisma 6, Zod 3, Vitest 3.
- **Ambiente:** Docker / Docker Compose (Node.js 22).
- **Variante:** backup (completa) — container `minicrm-backup`, porta de host `3012`.

## Pré-requisitos

- Docker e Docker Compose instalados no host.

## Como executar

```bash
docker compose up -d --build
```

A aplicação fica disponível em <http://localhost:3012>.

O container, ao iniciar, executa automaticamente:

1. `npm install`
2. `npx prisma generate`
3. `npx prisma db push`
4. `npm run db:seed`
5. `npm run dev`

## Usuário de demonstração

- **E-mail:** `admin@minicrm.com`
- **Senha:** `admin123`

## Funcionalidades

- **Login/logout** com sessão em cookie HTTP-only assinado (HMAC-SHA256, 8 horas).
- **Cadastro de leads** com validação e bloqueio de e-mail duplicado.
- **Listagem de leads** com busca por nome/e-mail e filtro por status.
- **Dashboard** com total, últimos 7 dias e distribuição por status.
- **Exportação CSV** (separador `;`) de todos os leads.

## Rotas de API

| Método | Rota | Descrição |
| --- | --- | --- |
| POST | `/api/auth/login` | Autentica e cria a sessão. |
| POST | `/api/auth/logout` | Encerra a sessão. |
| GET | `/api/auth/me` | Retorna o usuário autenticado. |
| GET | `/api/leads` | Lista leads (`?busca=` e `?status=`). |
| POST | `/api/leads` | Cadastra um lead. |
| GET | `/api/leads/stats` | Estatísticas do dashboard. |
| GET | `/api/leads/export` | Baixa o CSV dos leads. |

Todas as rotas `/api/`, exceto `/api/auth/`, exigem sessão válida.

## Comandos úteis (dentro do container)

```bash
docker compose exec minicrm npm test          # testes
docker compose exec minicrm npm run db:seed   # popular o banco novamente
docker compose exec minicrm npm run db:studio # Prisma Studio
docker compose logs -f minicrm                # logs da aplicação
```

## Banco de dados

O SQLite fica em `data/minicrm.db`, mapeado como volume no host, então os dados
sobrevivem a reinícios e podem ser abertos com qualquer cliente SQLite.

## Estrutura de pastas

```
pages/             Páginas (roteamento automático do Nuxt)
layouts/           Layouts (default e auth)
middleware/        Middleware de rota
composables/       Composables do frontend
server/api/        Rotas de API
server/middleware/ Middleware de servidor
server/utils/      Utilitários do servidor (auto-importados)
utils/             Utilitários do frontend (auto-importados)
prisma/            Schema e seed
data/              Banco SQLite (volume mapeado)
tests/             Testes automatizados
```

## Documentação

- `REQUISITOS.md` — necessidade do negócio e requisitos.
- `PLANO.md` — plano de implementação por etapas.
- `AGENTS.md` — guia de desenvolvimento.
- `CHANGELOG.md` — histórico de mudanças.
