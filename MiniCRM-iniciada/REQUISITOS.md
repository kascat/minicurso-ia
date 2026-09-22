# REQUISITOS.md — MiniCRM

Documento de necessidade escrito sob a ótica do dono do negócio. Descreve o que o sistema deve fazer e como deve se comportar. Deve ser lido em conjunto com o `AGENTS.md` e o `PLANO.md`.

## 1. Contexto e objetivo

A empresa precisa de um sistema simples para **capturar e acompanhar contatos de potenciais clientes (leads)**. Hoje esses contatos ficam espalhados em planilhas e anotações, o que dificulta o acompanhamento e a análise.

O objetivo é centralizar o cadastro de leads, permitir consultá-los, acompanhar o status de cada oportunidade e visualizar métricas de captação. O sistema será usado internamente pela equipe comercial.

## 2. Público-alvo

- Equipe comercial, que cadastra e consulta leads.
- Gestão, que acompanha os números de captação.

## 3. Visão geral

O sistema é uma aplicação web, de uso interno, com as seguintes áreas:

1. **Login** — acesso restrito às funcionalidades.
2. **Cadastro de leads** — inclusão de novos contatos.
3. **Listagem de leads** — consulta com busca e filtro.
4. **Dashboard** — visão consolidada da captação.
5. **Exportação** — geração de arquivo para análise externa.

## 4. Requisitos funcionais

### RF-01 — Autenticação

- O sistema deve exigir login para acessar qualquer funcionalidade.
- O login é feito com e-mail e senha.
- A senha deve ser armazenada com hash, nunca em texto puro.
- Ao autenticar, o sistema mantém uma sessão válida por algumas horas.
- O usuário deve poder sair (logout).
- Usuário inicial de demonstração: e-mail `admin@minicrm.com`, senha `admin123`.

### RF-02 — Cadastro de leads

- O sistema deve permitir cadastrar um lead com os campos:
  - **Nome completo** (obrigatório).
  - **E-mail** (obrigatório e único no sistema).
  - **Telefone** (obrigatório).
- O lead recebe o status inicial **novo**.
- A data de criação é registrada automaticamente.
- Após o cadastro, o sistema deve informar sucesso ou erro de forma clara.
- Se o e-mail já existir, o sistema deve informar o conflito em vez de falhar internamente.

### RF-03 — Listagem de leads

- O sistema deve listar todos os leads cadastrados.
- A listagem deve permitir **busca por nome ou e-mail**.
- A listagem deve permitir **filtro por status**.
- Cada linha deve exibir nome, e-mail, telefone, status e data de criação.
- O status deve ter destaque visual.
- Deve haver tratamento para estado de carregamento e lista vazia.

### RF-04 — Dashboard

- O sistema deve exibir:
  - Total de leads cadastrados.
  - Total de leads dos últimos 7 dias.
  - Distribuição de leads por status, com percentual.
- Deve haver tratamento para o caso de não haver dados.

### RF-05 — Exportação

- O sistema deve permitir baixar todos os leads em um arquivo **CSV**.
- O arquivo deve conter as colunas: `id`, `nome`, `email`, `telefone`, `status`, `criadoEm`.
- O separador deve ser ponto e vírgula (`;`), adequado a planilhas em português.
- Valores que contenham ponto e vírgula, aspas ou quebras de linha devem ser tratados corretamente.

## 5. Regras de negócio

- Um e-mail não pode se repetir entre leads.
- Os status possíveis de um lead são: **novo**, **contatado**, **qualificado** e **perdido**.
- Nenhuma operação pode ocorrer sem usuário autenticado.
- Dados inválidos devem ser recusados com mensagem clara, sem gravar no banco.

## 6. Requisitos não funcionais

- **Segurança:** validação de todas as entradas; senhas com hash; sessão em cookie; proteção das rotas de API e das páginas.
- **Persistência:** os dados devem sobreviver a reinícios do sistema.
- **Usabilidade:** interface simples, em português, com feedback visual de sucesso e erro.
- **Manutenibilidade:** código organizado, testado e documentado.
- **Reprodutibilidade:** o ambiente deve ser executável de forma padronizada (container).

## 7. Dados de demonstração

- O sistema deve iniciar com um usuário administrador (ver RF-01).
- O sistema deve iniciar com alguns leads de exemplo, com status e datas variados, para que a listagem e o dashboard tenham conteúdo.

## 8. Fora de escopo

- Cadastro de múltiplos usuários e perfis de permissão.
- Edição e exclusão de leads.
- Envio de e-mails ou notificações.
- Integrações externas.

## 9. Critérios de aceite

- É possível entrar com o usuário de demonstração e sair.
- Sem login, o acesso às funcionalidades é bloqueado.
- É possível cadastrar um lead válido e receber confirmação.
- Tentar cadastrar e-mail repetido informa o conflito.
- A listagem mostra os leads, permite buscar e filtrar.
- O dashboard mostra total, últimos 7 dias e distribuição por status.
- O download do CSV contém todos os leads com as colunas definidas.
- Os testes automatizados passam.
