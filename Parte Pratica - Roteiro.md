# Parte Prática — Roteiro

Roteiro enxuto, em tópicos, para conduzir a demonstração. A ordem abaixo é a sequência a seguir; cada item traz uma frase ou um prompt de apoio.

## 1. Preparação do ambiente
- [ ] Instalar o OpenCode (ver o Apêndice da teoria).
- [ ] Autenticar: usar o modelo gratuito do OpenCode ou conectar o DeepSeek (opcional).
- [ ] Conferir provedores e modelos: `opencode auth list` e `/models`.
- [ ] Abrir o terminal na pasta `MiniCRM/`.

## 2. Apresentar os três arquivos
- [ ] Dizer que os três já estão criados para acelerar a demo, mas que o correto é criá-los.
- [ ] Mostrar o `AGENTS.md`: papel, contexto/stack, tools, restrições e formato de saída (teoria 3.2).
- [ ] Mostrar o `REQUISITOS.md`: a necessidade do negócio.
- [ ] Mostrar o `PLANO.md`: stack, infraestrutura e etapas.

## 3. Primeiro comando: estrutura e ambiente
- [ ] Prompt: "Leia os três arquivos e execute a Etapa 1 do `PLANO.md`."
- [ ] Comentar a criação da estrutura, do Docker e do banco.
- [ ] Subir o container e abrir no navegador.
- [ ] Rodar os testes: `docker compose exec minicrm npm test`.

## 4. Implementar as funcionalidades
- [ ] Autenticação (RF-01).
- [ ] Cadastro de leads (RF-02).
- [ ] Listagem de leads (RF-03).
- [ ] Dashboard (RF-04).
- [ ] Exportação CSV (RF-05).
- [ ] Validar cada uma no navegador e comentar como as regras do `AGENTS.md` aparecem no código.

## 5. Criar a skill de finalização
- [ ] Enviar o texto de `prompt-skill-finalizar-tarefa.md`.
- [ ] Mostrar o arquivo criado em `.opencode/skills/finalizar-tarefa/SKILL.md`.
- [ ] Explicar: skill é conhecimento, carregada sob demanda (teoria 3.3).

## 6. Criar a ferramenta personalizada
- [ ] Enviar o texto de `prompt-tool-consultar-tarefa.md`.
- [ ] Mostrar o arquivo criado em `.opencode/tools/consultar-tarefa.ts`.
- [ ] Explicar: tool é capacidade, uma ação nova que a IA pode acionar (teoria 3.4).
- [ ] Testar a tool consultando uma tarefa (por exemplo, `T-03`).

## 7. Usar a skill de finalização
- [ ] Pedir para finalizar uma tarefa.
- [ ] Responder às perguntas: criar branch (ex.: `T-03-feat/...`), fazer commit, fazer push e gerar a descrição da entrega.
- [ ] Mostrar o arquivo gerado em `entregas/`.

## 8. Criar um AGENTS.md do zero (opcional, se houver tempo)
- [ ] Abrir a IA em uma pasta vazia e enviar o texto de `prompt-agents-do-zero.md`.
- [ ] Mostrar a entrevista: a IA pergunta e depois gera o `AGENTS.md`.
- [ ] Comentar que o arquivo evolui conforme o projeto cresce (documento vivo).

## 9. Fechamento
- [ ] Mostrar `README` e `CHANGELOG` atualizados.
- [ ] Reforçar: atuamos como engenheiros de software, não como digitadores de código.
- [ ] Perguntas.
- [ ] Mostrar sistema/site "Canto Sacro" feito inteiramente com IA (Para demonstrar funcionalidades).
