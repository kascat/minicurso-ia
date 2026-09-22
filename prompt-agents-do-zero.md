# Prompt — Criar um AGENTS.md do zero

Use este texto como a **primeira mensagem** ao abrir a IA em uma pasta vazia. A IA pergunta o essencial e gera um `AGENTS.md` inicial; o restante é completado depois, conforme o projeto cresce.

---

Quero iniciar um projeto do zero nesta pasta vazia. Não tenho tudo definido ainda.

Primeiro, me faça apenas as perguntas essenciais. Pode ser de forma simples, e eu posso responder "não sei":

1. O que o sistema faz e qual problema resolve?
2. Quem vai usar?
3. Quais são as principais funcionalidades?
4. Tem preferência de stack (linguagem, framework, banco) ou quer que você sugira uma?
5. Vai rodar na minha máquina, em container ou na nuvem?

Depois, crie um `AGENTS.md` na raiz, em português, curto e objetivo, com:

- **Contexto do projeto** — objetivo, usuários e funcionalidades principais.
- **Stack e ambiente** — tecnologias e como instalar, executar e testar.
- **Perfil da IA (role)** — use como padrão: "aja como engenheiro de software sênior, com foco em clareza, qualidade e segurança".
- **Ferramentas permitidas (tools)** — use como padrão: pode ler, criar e editar arquivos e rodar comandos; pede confirmação antes de ações destrutivas, de instalar dependências ou de alterar arquivos críticos.
- **Restrições rígidas (constraints)** — use como padrão: nunca exponha segredos; valide as entradas; não altere arquivos fora do escopo da tarefa.
- **Formato de saída (output)** — use como padrão: ao concluir cada tarefa, informar o que foi feito, como testar e as decisões tomadas.
- **Pendências de definição** — liste o que ainda não está definido e deve ser completado depois (por exemplo, segurança, desempenho, testes e regras de negócio detalhadas).

Regras:

- Não invente requisitos nem regras de negócio: se algo não foi dito, coloque em "Pendências de definição".
- Se eu não souber a stack, sugira uma opção simples e explique em uma linha.
- Mantenha o arquivo curto agora; ele vai evoluir conforme o projeto cresce.
- Ao final, sugira se faz sentido criar também um `REQUISITOS.md` (necessidade do negócio) e um `PLANO.md` (plano por etapas).
