# Changelog

Todas as mudanças relevantes deste projeto são documentadas aqui.
O formato segue o padrão [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/).

## [Não publicado]

## [0.2.0] - 2026-09-19

### Adicionado

- Autenticação (RF-01): token de sessão assinado, rotas `login`/`logout`/`me`,
  middleware de proteção de páginas e APIs, página `/login` e ação de sair no layout.
- Cadastro de leads (RF-02): página `/cadastro` e `POST /api/leads` com validação Zod
  e tratamento de e-mail duplicado (HTTP 409).
- Listagem de leads (RF-03): página `/leads` e `GET /api/leads` com busca e filtro por status.
- Dashboard (RF-04): página `/dashboard` e `GET /api/leads/stats`.
- Exportação (RF-05): página `/exportar` e `GET /api/leads/export` com gerador de CSV.
- Utilitários de validação (Zod), sessão, CSV e formatação.
- Testes de schemas, CSV e sessão (total de 29 testes).

## [0.1.0] - 2026-09-19

### Adicionado

- Estrutura base do projeto Nuxt 3 com TypeScript.
- Configuração do Tailwind CSS e CSS global.
- Layout base (`default`) e layout de autenticação (`auth`).
- Página inicial com atalhos para as áreas do sistema.
- Configuração do Prisma com os modelos `User` e `Lead`.
- Seed idempotente com usuário administrador e 12 leads de exemplo.
- Utilitário de hash de senha com `scrypt`.
- Infraestrutura Docker: `Dockerfile`, `docker-compose.yml`, `.dockerignore`, `.env` e `.env.example`.
- Testes automatizados do utilitário de senha (Vitest).
- `README.md` e `CHANGELOG.md`.
