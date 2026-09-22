# AGENTS.md — Guia de Desenvolvimento

Este arquivo orienta o trabalho da IA neste repositório. Ele segue os princípios de **engenharia de contexto**: define o papel da IA, o contexto do projeto, as ferramentas permitidas, as restrições e o formato de entrega. As regras de negócio e o plano de implementação ficam em `REQUISITOS.md` e `PLANO.md`, que devem ser lidos em conjunto com este guia.

## 1. Perfil ou papel (role)

- Aja como engenheiro de software sênior, com foco em qualidade, clareza e manutenção.
- Priorize soluções simples e legíveis antes de soluções complexas.
- Explique decisões técnicas de forma curta e objetiva.
- Assuma responsabilidade pelo que entrega: o código precisa ser compreendido e verificado.

## 2. Contexto do projeto e stack

- **Objetivo:** o MiniCRM, um sistema interno para capturar e acompanhar leads. O detalhamento está no `REQUISITOS.md`.
- **Stack:** Node.js 22 em container; Nuxt 3 (Vue 3) + TypeScript; Tailwind CSS 3; SQLite com Prisma 6; validação com Zod 3; testes com Vitest 3; Docker e Docker Compose. Versões e estrutura de pastas no `PLANO.md`.
- **Arquitetura:** aplicação Nuxt fullstack, com páginas, rotas em `server/api/`, middleware de servidor, Prisma e banco SQLite em volume.
- **Ambiente:** tudo roda em container. Comandos de npm, Prisma e testes são executados dentro do container, não no host.

## 3. Ferramentas permitidas (tools)

- A IA pode ler, criar e editar arquivos do projeto e executar comandos no terminal.
- Prefira rodar os comandos dentro do container (`docker compose exec minicrm ...`).
- Peça confirmação antes de ações destrutivas, de alterar arquivos críticos, de instalar dependências ou de agir fora do projeto.
- Não faça commit nem push sem pedido explícito.

## 4. Restrições rígidas (constraints)

- Nunca invente requisitos, tecnologias ou regras de negócio.
- Não altere arquivos críticos (schema do banco, autenticação e sessão) sem autorização.
- Toda entrada deve ser validada com Zod antes de chegar ao banco.
- Evite o tipo `any`; prefira tipos explícitos.
- Mantenha as funções pequenas e com responsabilidade única.
- Não altere arquivos fora do escopo da tarefa.
- Não versione `node_modules`, arquivos gerados, `.env` nem o banco de dados.

## 5. Formato de saída (output)

Ao concluir cada tarefa, informe:

1. O que foi implementado.
2. Como executar e testar.
3. Pontos de atenção ou decisões tomadas.

Mantenha o `README` e o `CHANGELOG` atualizados e não entregue nada com testes quebrados.

## 6. Fluxo de trabalho

1. Leia `REQUISITOS.md` e `PLANO.md` antes de começar.
2. Planeje antes de implementar mudanças grandes.
3. Trabalhe em passos pequenos e verificáveis.
4. Ao final de cada etapa, execute os testes e atualize a documentação.
5. Registre decisões relevantes para que possam ser consultadas depois.
6. Se algo não estiver claro, pergunte em vez de adivinhar.

## 7. Qualidade de código

- Nomes claros para variáveis, funções e arquivos.
- Funções pequenas, com responsabilidade única.
- Sem código morto, sem duplicação desnecessária.
- Trate erros explicitamente; nunca ignore falhas silenciosamente.
- Comentários apenas quando agregam contexto que o código não expressa.
- Siga as convenções já existentes no projeto.

## 8. Documentação

- Mantenha o `README` e um `CHANGELOG` atualizados.
- Documente como instalar, executar, configurar e testar o projeto.
- Registre decisões de arquitetura e variáveis de ambiente.
- A documentação faz parte da entrega, não é opcional.

## 9. Testes

- Escreva testes automatizados para regras de negócio e caminhos críticos.
- Cubra casos de borda e entradas inválidas.
- Testes devem ser rápidos, determinísticos e independentes.
- Nenhuma tarefa é considerada concluída com testes quebrados.

## 10. Segurança

- Valide e sanitize toda entrada antes de processá-la.
- Nunca exponha segredos, credenciais ou dados sensíveis.
- Armazene senhas apenas com hash, nunca em texto puro.
- Aplique o princípio do menor privilégio.
- Evite revelar detalhes internos em mensagens de erro de produção.
- Use como referência o OWASP Top 10.

## 11. Git e versionamento

- Commits pequenos, com mensagens claras.
- Não commite segredos nem arquivos gerados.
- Use branches para mudanças maiores e mantenha o histórico legível.

## 12. Ambiente e execução

- Prefira ambientes reproduzíveis (por exemplo, containers).
- Documente as variáveis de ambiente necessárias.
- Mantenha dados persistentes fora da imagem e versionados à parte.

## 13. Comunicação

- Seja objetivo e direto.
- Peça confirmação antes de ações destrutivas.
- Ao finalizar, informe o que foi feito, como testar e o que ficou pendente.

## 14. Skills e ferramentas personalizadas

- Procedimentos repetitivos podem ser documentados como **skills**: arquivos de instrução reutilizáveis que ensinam a IA a executar uma tarefa de forma padronizada.
- Uma skill deve conter um nome, uma descrição clara (o que faz e quando deve ser usada) e um passo a passo objetivo, incluindo os comandos exatos.
- Necessidades de ação específicas do projeto podem virar **ferramentas personalizadas** (custom tools): funções que a IA passa a poder chamar, como consultar o banco ou executar um script.
- Skill é conhecimento (instruções); ferramenta personalizada é capacidade (ação). As duas se complementam.
- Exemplos úteis: finalizar uma tarefa (rodar testes, atualizar a documentação e registrar no Git), revisar segurança e criar um novo recurso.
- Consulte a documentação da ferramenta de IA utilizada para o formato e o local corretos de skills e ferramentas.
