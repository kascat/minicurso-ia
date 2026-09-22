# Desenvolvimento de Sistemas com Inteligência Artificial

## Material Teórico — Minicurso

---

## Apresentação

**Fabio Dukievicz** — engenheiro de software e desenvolvedor full stack.

- **Atuação:** desenvolvimento de sistemas web
- **Formação:** Análise de Sistemas na Guairacá
- **LinkedIn:** [linkedin.com/in/fabio-dukievicz](https://www.linkedin.com/in/fabio-dukievicz)
- **GitHub:** [github.com/kascat](https://github.com/kascat)

### Visão geral

A proposta é simples: vamos sair de uma conversa sobre o que a inteligência artificial mudou no desenvolvimento de software e chegar a uma demonstração prática — enxuta, mas de verdade — de um sistema sendo construído com o auxílio de um agente de IA.

Nosso percurso tem três blocos de teoria e um de prática, e cada um prepara o seguinte.

**1. O panorama.** Vamos ver de onde vieram as ferramentas de IA, o que existia antes delas e o que de fato mudou. A ideia é situar o momento atual sem exagero, mostrando que a assistência ao programador é o resultado de uma evolução, e não algo que surgiu de repente.

**2. Os riscos.** Vamos olhar o que pode dar errado quando o código gerado é aceito sem crítica: alucinações, lógicas que ninguém entende, dependência, falhas de segurança, código desatualizado e questões de licença. É a parte que separa o uso amador do uso responsável.

**3. A preparação do ambiente.** Vamos ver como transformar uma ferramenta genérica em um assistente alinhado ao projeto: arquivos de contexto, definição de papel e limites, skills, ferramentas personalizadas e os demais recursos do ecossistema.

**4. A prática.** Com a base pronta, a teoria vira ação. A partir de três arquivos — um guia de boas práticas, a descrição do negócio e o plano de implementação —, um agente de IA constrói o MiniCRM em etapas, com testes, documentação e supervisão humana. É uma demonstração curta, mas do começo ao fim: o suficiente para mostrar o fluxo real de trabalho.

Ao final, queremos que fique claro não só o que a IA faz, mas onde entra o julgamento de quem programa — e por que esse julgamento continua sendo o que define a qualidade do resultado.

---

## Módulo 1 — O Panorama do Mercado e a Evolução da TI

### 1.1 O desenvolvimento de software antes da IA

Desenvolver software sempre foi, antes de qualquer outra coisa, uma atividade de aprendizado contínuo. Ao contrário de profissões em que um conjunto de conhecimentos, uma vez dominado, permanece válido por muito tempo, aqui nada fica parado: linguagens evoluem, frameworks são substituídos, boas práticas mudam e novas vulnerabilidades aparecem. Manter-se atualizado não é uma escolha, é uma condição para continuar trabalhando na área.

Antes das ferramentas de IA generativa, essa rotina de aprender e resolver problemas se apoiava em algumas fontes bem conhecidas:

- **Documentação oficial** — o material produzido por quem criou a linguagem, o framework ou a biblioteca. É a fonte primária e mais confiável, porque descreve exatamente como a ferramenta deve ser usada na versão em questão.
- **Fóruns e comunidades** — espaços como o Stack Overflow, onde desenvolvedores publicam dúvidas e respostas. É comum encontrar um problema que outra pessoa já resolveu.
- **Repositórios de pacotes** — catálogos públicos de bibliotecas prontas, como o Packagist (PHP), o npm (JavaScript) e o PyPI (Python), que permitem reaproveitar código já testado pela comunidade.
- **Livros, artigos e blogs técnicos** — fontes que aprofundam conceitos e arquitetura.

Vale explicar três termos que aparecem o tempo todo. A *documentação* é o manual de instruções de uma tecnologia, escrito por quem a criou. Um *framework* é um conjunto de ferramentas e convenções que serve de base para montar uma aplicação. Uma *biblioteca* é um pacote de código pronto que se encaixa no projeto para resolver uma tarefa específica.

Pesquisar em fóruns e ler documentação nunca foi sinal de fraqueza. É o método pelo qual o conhecimento técnico se constrói. Investigar um erro, entender a causa e validar a solução fortalece justamente a capacidade de resolver problemas novos — e é isso que separa quem consegue encarar situações inéditas de quem apenas repete receitas.

O mercado de tecnologia já era competitivo antes da IA. A demanda crescia, mas o número de pessoas entrando na área crescia junto, e a diferença entre candidatos raramente se media pelo diploma. O que as empresas avaliam é a capacidade de entregar soluções que funcionem, sejam seguras e possam ser mantidas ao longo do tempo. A IA mudou a velocidade com que o trabalho sai; não eliminou a necessidade de entender o que se está fazendo, nem tornou o mercado menos seletivo.

Há um ponto que costuma ser mal interpretado e vale destacar: estudar documentação oficial não é coisa do passado. É, na verdade, a habilidade central de quem trabalha com IA. Um modelo pode gerar código desatualizado, incompleto ou simplesmente errado, e a única forma confiável de saber se aquilo corresponde ao comportamento esperado da tecnologia é conhecer as fontes oficiais e saber consultá-las.

Isso vale mesmo quando a IA acerta. Modelos são treinados com dados de momentos diferentes do tempo e podem sugerir APIs que já foram depreciadas, parâmetros que mudaram de nome ou padrões que não são mais recomendados. Conferir a versão e o changelog da biblioteca continua fazendo parte do trabalho.

**Referências desta seção**

- MDN Web Docs — documentação de referência para tecnologias web. https://developer.mozilla.org/
- Stack Overflow Developer Survey — pesquisa anual sobre o mercado e as práticas de desenvolvimento. https://survey.stackoverflow.co/
- Packagist — repositório oficial de pacotes do ecossistema PHP. https://packagist.org/
- GitHub Octoverse — relatório anual sobre a atividade e as tendências da comunidade de desenvolvimento. https://octoverse.github.com/
- DORA — State of DevOps Report — pesquisa sobre práticas de entrega de software e desempenho de equipes. https://dora.dev/

---

### 1.2 A evolução das ferramentas de desenvolvimento

A assistência automática ao programador não nasceu com a IA generativa. Ela chegou em etapas, e conhecer essa trajetória ajuda a enxergar o que há de realmente novo no que existe hoje.

**Primeira etapa: análise estática e realce de sintaxe.** No começo, as ferramentas apenas coloriam o código de acordo com os elementos da linguagem e apontavam erros simples de escrita. É o que se chama de *análise estática*: examinar o código sem executá-lo, procurando variáveis não usadas, erros de digitação e trechos suspeitos. Ferramentas chamadas *linters* popularizaram essa prática.

**Segunda etapa: autocompletar inteligente.** Depois, os editores passaram a sugerir nomes de funções, fechar parênteses e chaves e inserir trechos prontos. Exemplos conhecidos são o IntelliSense, em editores como o VS Code, o Emmet, voltado a escrever HTML e CSS mais rápido, e o Tabnine, que nas primeiras versões usava modelos estatísticos para sugerir continuações. Essas ferramentas trabalham por regras e pelo conhecimento da estrutura do projeto: conhecem as bibliotecas instaladas e os símbolos que o programador criou, mas não inventam lógica nova. O papel delas é poupar memória e digitação.

*Sintaxe* é o conjunto de regras que define como um código precisa ser escrito para ser válido — um erro de sintaxe acontece, por exemplo, quando falta fechar um parêntese.

**Terceira etapa: modelos generativos de código.** A partir de 2020, surgiram ferramentas baseadas em *Large Language Models* (LLMs), ou Grandes Modelos de Linguagem: modelos treinados com enormes volumes de texto e código, capazes de prever sequências prováveis e, com isso, produzir conteúdo novo. Entre os exemplos mais usados estão o GitHub Copilot, lançado em 2021, o ChatGPT, de 2022, e modelos especializados em código como o DeepSeek-Coder e o Claude.

A diferença em relação às etapas anteriores está na escala do contexto considerado. Um autocompletar tradicional enxerga a estrutura do projeto e sugere nomes. Um modelo generativo lê o arquivo inteiro, o comentário escrito em linguagem natural, o histórico da conversa e, em ferramentas integradas, arquivos vizinhos. A partir disso, deduz a intenção e produz blocos completos de lógica que antes não existiam.

Vale uma ressalva: modelos de linguagem não compreendem o código como uma pessoa. Eles calculam a probabilidade da próxima unidade de texto, o *token*, com base no contexto. Isso explica tanto a fluência das respostas quanto a possibilidade de erros ditos com confiança — assunto do próximo módulo.

**Um caso real: a modernização de sistemas legados.** Um dos usos mais relevantes da IA na indústria não está em criar sistemas novos, e sim em manter e converter sistemas antigos. Muitas organizações, sobretudo nos setores financeiro, de seguros e governamental, mantêm aplicações críticas escritas em linguagens como COBOL, criadas décadas atrás e ainda em funcionamento. São os sistemas *legados*: continuam essenciais para a operação, mas são difíceis de modificar e dependem de profissionais cada vez mais raros.

A IA tem sido usada para acelerar a compreensão, a documentação e a conversão desses sistemas para tecnologias modernas. A IBM, por exemplo, oferece o watsonx Code Assistant for Z, voltado à modernização de aplicações em COBOL. O interesse por esse tipo de solução vem de dois fatores: o custo e o risco de manter sistemas antigos e a escassez de mão de obra especializada nessas linguagens.

Isso mostra que o impacto da IA vai além de escrever código novo: ela também ajuda a traduzir conhecimento acumulado, o que reforça a importância de entender a lógica dos sistemas, e não apenas a sintaxe de uma linguagem.

Fica uma ressalva importante: a IA acelera o trabalho, mas não o substitui. Em sistemas críticos, a validação humana continua obrigatória, porque um erro de conversão pode ter consequências graves. A ferramenta aumenta a capacidade de produção; a responsabilidade pela correção permanece com a equipe.

**Referências desta seção**

- Visual Studio Code — IntelliSense. https://code.visualstudio.com/docs/editor/intellisense
- Emmet — kit de ferramentas para escrita rápida de HTML e CSS. https://emmet.io/
- Tabnine — assistente de código com autocompletar por IA. https://www.tabnine.com/
- GitHub Blog — Introducing GitHub Copilot (2021). https://github.blog/2021-06-29-introducing-github-copilot-ai-pair-programmer/
- GitHub Copilot — documentação oficial. https://docs.github.com/en/copilot
- IBM watsonx Code Assistant for Z — modernização de aplicações COBOL. https://www.ibm.com/products/watsonx-code-assistant-z
- Attention Is All You Need — artigo que introduziu a arquitetura Transformer, base dos LLMs modernos. https://arxiv.org/abs/1706.03762
- Language Models are Few-Shot Learners — artigo do GPT-3. https://arxiv.org/abs/2005.14165
- Evaluating Large Language Models Trained on Code — artigo do modelo Codex, base do GitHub Copilot. https://arxiv.org/abs/2107.03374

---

## Módulo 2 — Desafios, Riscos e o Papel do Programador

### 2.1 Os perigos ocultos do código gerado por IA

A mesma característica que torna os modelos generativos úteis — a capacidade de produzir texto plausível a partir de padrões aprendidos — é também a origem dos seus principais riscos. Um modelo não verifica se o que produz está certo; ele produz o que parece mais provável diante do contexto. Essa diferença é essencial para entender os três problemas a seguir.

#### Alucinações de código

Uma *alucinação* acontece quando o modelo apresenta, com aparente segurança, uma informação que não é verdadeira. No desenvolvimento, isso aparece de várias formas: uma função que não existe na biblioteca citada, um parâmetro com nome errado, uma biblioteca fictícia ou uma solução que parece correta mas não compila.

O perigo está justamente na confiança com que a resposta é apresentada. Um texto em tom seguro tende a ser aceito sem verificação, especialmente por quem ainda não domina a tecnologia. Quando o código roda, o erro aparece — e, se o desenvolvedor não souber diagnosticá-lo, o tempo perdido pode ser maior do que o ganho inicial.

Pesquisas acadêmicas que medem a correção do código gerado por modelos, como o conjunto de avaliação EvalPlus, mostram que boa parte das soluções falha em testes que vão além dos casos mais simples. O recado é direto: código gerado deve ser tratado como rascunho a ser verificado, não como solução final.

#### Lógicas ocultas e bugs de sombra

O segundo risco é mais sutil. É o código que funciona à primeira vista, mas cujo comportamento interno ninguém entende. Ao aceitar a sugestão sem ler com atenção, o programador coloca no sistema uma lógica que não projetou nem revisou. Situações assim costumam esconder problemas como:

- **Ineficiência** — a IA resolve o problema com um algoritmo correto, porém lento, como estruturas de repetição aninhadas que ficam caras quando a quantidade de dados cresce.
- **Casos de borda não tratados** — o código funciona com valores comuns, mas quebra diante de entradas inesperadas: campos vazios, números negativos, valores nulos. Ex.: um formulário que funciona com o campo de nome preenchido, mas falha ao ser enviado vazio.
- **Comportamentos implícitos** — efeitos colaterais que não aparecem na leitura superficial e só se manifestam em condições específicas.

O problema central não é a IA errar, e sim o programador não saber que ela errou. Quando a lógica não é compreendida, não há como localizar o defeito nem corrigi-lo com segurança. Aceitar uma sugestão com uma tecla, sem leitura crítica, transforma a ferramenta em caixa-preta: sabe-se o que entra e o que sai, mas não o que acontece no meio.

#### Código inflado e dívida técnica

Há ainda um efeito que se acumula. Como gerar código ficou rápido e barato, surge a tentação de aceitar blocos grandes para resolver problemas pequenos. O resultado é um sistema inflado, cheio de funções extensas, duplicações e dependências desnecessárias. Esse excesso dificulta a manutenção futura e piora a arquitetura do projeto.

Esse acúmulo tem nome: *dívida técnica*, o custo futuro gerado por decisões tomadas no presente em favor da velocidade. A IA pode aumentar a velocidade de entrega, mas também pode acelerar a criação de dívida técnica quando usada sem critério.

**Referências desta seção**

- Survey of Hallucination in Natural Language Generation — revisão acadêmica sobre alucinações em modelos de linguagem. https://arxiv.org/abs/2202.03629
- Is Your Code Generated by ChatGPT Really Correct? — avaliação de correção de código gerado (EvalPlus). https://arxiv.org/abs/2305.01210
- OWASP Top 10 — as dez categorias de riscos de segurança mais críticos em aplicações web. https://owasp.org/www-project-top-ten/
- OWASP Top 10 for LLM Applications — riscos específicos de aplicações baseadas em modelos de linguagem. https://owasp.org/www-project-top-10-for-large-language-model-applications/

---

### 2.2 Dependência intelectual, segurança e a importância da documentação

#### Dependência intelectual e atrofia de habilidade

Aprender a programar envolve enfrentar dificuldades produtivas: interpretar mensagens de erro, ler registros de execução, formular hipóteses e testá-las. É nesse processo que a capacidade de resolver problemas se desenvolve. Quando a IA é usada para superar cada obstáculo antes que o esforço aconteça, essa capacidade deixa de ser exercitada.

O risco é criar uma dependência em que o profissional perde autonomia. Enquanto a ferramenta funciona, os resultados parecem bons; mas diante de um problema que a IA não resolve — um sistema complexo, um erro específico do ambiente, uma falha que exige investigação —, quem nunca construiu base técnica fica sem recursos. Conhecimento de lógica, estruturas de dados e arquitetura continua sendo o alicerce sobre o qual a IA atua como aceleradora.

Esse fenômeno é reconhecido em frameworks de risco de IA. O OWASP, projeto de referência em segurança de aplicações, classifica a *dependência excessiva* (overreliance) como risco relevante no uso de modelos de linguagem: confiar na saída sem verificação adequada pode levar a decisões incorretas e a falhas difíceis de detectar.

Uma recomendação prática é manter o hábito de depurar manualmente de vez em quando. Ler o log, formular a hipótese e localizar a causa preserva o raciocínio de engenharia que a automação tende a substituir.

#### Segurança do código gerado

Modelos aprendem a partir de grandes volumes de código, incluindo exemplos inseguros. Como consequência, podem reproduzir padrões vulneráveis mesmo quando existem alternativas mais seguras. Um estudo de pesquisadores da Universidade de Stanford verificou que participantes com acesso a assistentes de IA tendiam a produzir código menos seguro do que os sem assistência, em parte por confiarem na sugestão sem revisão.

Entre os riscos mais recorrentes estão falhas catalogadas pelo OWASP Top 10, como injeção de comandos, autenticação frágil e exposição de dados sensíveis. No contexto de aplicações que usam IA, o OWASP mantém uma lista própria, a OWASP Top 10 for LLM Applications, que inclui:

- **Injeção de prompt** — manipulação das instruções dadas ao modelo para que ele ignore regras ou revele informações.
- **Divulgação de informações sensíveis** — exposição de dados confidenciais presentes no contexto.
- **Manipulação insegura de saídas** — uso do conteúdo gerado sem validação, permitindo que ele introduza falhas no sistema.

#### Governança e vazamento de dados corporativos

Um ponto muitas vezes negligenciado é o envio de informações confidenciais para modelos públicos. Ao colar um trecho de código proprietário, credenciais, dados de clientes ou detalhes de infraestrutura em uma ferramenta sem garantias contratuais, a empresa pode violar obrigações legais e de confidencialidade. Por isso, organizações criam políticas de uso, restringem ferramentas autorizadas e, em muitos casos, adotam soluções executadas em ambiente próprio.

Usar IA, portanto, não é só uma decisão técnica: é também uma decisão de governança. Cabe à equipe definir o que pode ser compartilhado, com quais ferramentas e sob quais condições.

#### Código obsoleto e desatualização

Modelos são treinados com dados de um período específico. Um modelo treinado há algum tempo pode sugerir versões antigas de frameworks, funções depreciadas ou padrões que já não são recomendados — e que, em alguns casos, carregam vulnerabilidades conhecidas. Esse descompasso entre o conhecimento do modelo e o estado atual da tecnologia exige que o desenvolvedor saiba julgar se o que recebeu corresponde à versão realmente usada no projeto.

Uma função *depreciada* ainda funciona, mas foi substituída por outra mais moderna e não deve ser usada em código novo.

#### Licenciamento e propriedade intelectual

Como os modelos são treinados com repositórios públicos, existe a possibilidade de reproduzirem trechos de código sujeitos a licenças restritivas. Licenças como a GPL impõem condições ao uso e à distribuição do software. Se um trecho protegido for incorporado a um sistema proprietário sem observar essas condições, podem surgir implicações jurídicas.

#### A documentação como resposta

Todos esses riscos convergem para uma mesma habilidade: saber verificar. E a verificação confiável se apoia nas fontes oficiais. A documentação informa qual é a versão correta de uma função, quais parâmetros ela aceita, se está depreciada e quais práticas de segurança são recomendadas. Quem domina a leitura de documentação consegue avaliar o que a IA produziu e decidir se aceita, corrige ou descarta.

Em outras palavras, a IA não substitui o estudo: ela o torna mais importante. Quem assina o código é o profissional, não a ferramenta. A responsabilidade por falhas, brechas de segurança ou prejuízos continua sendo humana.

**Referências desta seção**

- Do Users Write More Insecure Code with AI Assistants? — estudo da Universidade de Stanford sobre segurança e assistentes de IA. https://arxiv.org/abs/2211.03622
- OWASP Top 10 for LLM Applications — riscos de segurança em aplicações com modelos de linguagem. https://owasp.org/www-project-top-10-for-large-language-model-applications/
- OWASP Top 10 — riscos de segurança em aplicações web. https://owasp.org/www-project-top-ten/
- The Impact of AI on Developer Productivity: Evidence from GitHub Copilot — estudo sobre produtividade e uso de IA. https://arxiv.org/abs/2302.06590
- GitHub Blog — Research: Quantifying GitHub Copilot's impact on developer productivity and happiness. https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/
- NIST AI Risk Management Framework — diretrizes para gestão de riscos em sistemas de IA. https://www.nist.gov/itl/ai-risk-management-framework

---

## Módulo 3 — Engenharia de Contexto e Governança

### 3.1 Preparação do ambiente corporativo com IA

Até aqui, a IA apareceu como uma ferramenta que responde a perguntas isoladas. Na prática profissional, porém, ela é integrada ao projeto e passa a operar com base em regras definidas pela equipe. Para entender como isso funciona, o primeiro passo é compreender como a IA enxerga um projeto.

#### A janela de contexto

Um modelo de linguagem não tem memória permanente da conversa nem do projeto. Ele trabalha dentro de uma *janela de contexto*: a quantidade máxima de informação que consegue considerar de uma só vez, medida em *tokens* — unidades de texto que podem corresponder a palavras, partes de palavras ou símbolos.

Uma boa imagem é pensar em uma mesa de trabalho de tamanho limitado. Tudo o que a IA consegue ler e lembrar ao mesmo tempo precisa caber nessa mesa. Quando ela enche, o conteúdo mais antigo é deixado de lado.

Essa limitação tem duas consequências práticas. A primeira é que enviar o projeto inteiro a cada pergunta não é viável: além de consumir muitos tokens, isso dispersa a atenção do modelo e piora as respostas. A segunda é que, sem uma forma de informar as regras do projeto, o desenvolvedor teria de repetir as mesmas orientações em todas as interações.

A solução que o mercado adotou são arquivos de configuração locais, mantidos dentro do repositório, que funcionam como âncoras de conhecimento. A ferramenta os lê automaticamente e passa a usá-los para orientar as respostas.

#### Arquivos de contexto

Diferentes ferramentas adotam nomes distintos, mas o princípio é o mesmo: um arquivo na raiz do projeto que descreve como a IA deve se comportar ali.

- **AGENTS.md** — formato aberto e independente de fornecedor, proposto como padrão para descrever agentes de codificação. Por ser aberto, tende a ser reconhecido por diversas ferramentas.
- **.cursorrules / regras do Cursor** — arquivos de regras do editor Cursor.
- **.clinerules** — regras usadas por ferramentas como o Cline.
- **Memória do Claude Code** — arquivos como o CLAUDE.md, que registram instruções persistentes para o assistente.

Esses arquivos funcionam como um manual de identidade do projeto. Neles a equipe define linguagem, framework, arquitetura, estilo de código, práticas de segurança e os limites de atuação da IA. A partir disso, as respostas seguem um padrão consistente, sem que o desenvolvedor precise repetir as mesmas instruções a cada pergunta.

Há um ganho prático nisso: em vez de descrever o stack no prompt, descreve-se uma vez no repositório, e a configuração passa a ser versionada junto com o código. Isso reduz o custo em tokens e melhora a previsibilidade das respostas.

**Referências desta seção**

- AGENTS.md — padrão aberto para definição de agentes de codificação. https://agents.md/
- Cursor — documentação de regras de contexto. https://docs.cursor.com/context/rules
- Claude Code — documentação de memória e instruções persistentes. https://docs.anthropic.com/en/docs/claude-code/memory
- Anthropic — Effective Context Engineering for AI Agents. https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents

---

### 3.2 Anatomia de instruções avançadas

Um arquivo de contexto é feito de blocos bem definidos. Entender cada um deles é o que permite escrever instruções precisas e previsíveis.

#### Perfil ou papel (role)

Define quem a IA deve ser naquele contexto. Em vez de uma ferramenta genérica, ela assume um papel específico, como engenheiro de software sênior, auditor de segurança ou analista de testes. O papel orienta o tom e o nível de rigor das respostas.

#### Contexto do projeto e stack

Descreve as tecnologias usadas, o objetivo do sistema e a arquitetura adotada. É a informação que impede a IA de sugerir soluções incompatíveis com o projeto, como uma biblioteca que não faz parte do stack ou um padrão arquitetural diferente do usado pela equipe.

#### Habilidades e ferramentas permitidas (tools)

Ferramentas de IA integradas ao editor não apenas respondem texto: elas executam ações. Entre as capacidades mais comuns estão ler arquivos, criar ou escrever arquivos, editar arquivos existentes, buscar termos no projeto e executar comandos no terminal. Cada uma dessas ações é chamada de *tool* (ferramenta).

Controlar essas permissões é parte essencial da governança. Uma equipe pode, por exemplo, permitir que a IA leia e sugira alterações, mas exigir confirmação antes de modificar arquivos sensíveis ou instalar dependências. Esse princípio é conhecido como *privilégio mínimo*: conceder à ferramenta apenas as capacidades estritamente necessárias para a tarefa.

Em resumo, uma *tool* é uma ação que a IA pode realizar sozinha dentro do projeto, como abrir um arquivo ou rodar um teste. O programador decide quais ações ela pode tomar.

#### Restrições rígidas (constraints)

São as regras que a IA não pode violar. Exemplos comuns: exigir validação de dados em todas as entradas, proibir tipos genéricos que enfraquecem a verificação, limitar o tamanho das funções ou impedir a alteração de arquivos críticos sem autorização. As restrições funcionam como um escudo contra más práticas: ao proibir explicitamente um padrão inadequado, a equipe reduz a chance de que ele seja reproduzido.

#### Formato de saída (output)

Define como a resposta deve ser entregue. Pode-se exigir, por exemplo, que toda funcionalidade venha acompanhada de testes automatizados e de uma observação sobre eventuais riscos de segurança. Estabelecer o formato de saída padroniza as entregas e reduz o esforço de revisão.

Vale dizer que a engenharia de contexto, mais do que a engenharia de prompt, é o que distingue o uso amador do uso profissional. Não se trata apenas de formular bem uma pergunta, mas de estruturar todo o ambiente para que a IA produza resultados consistentes, verificáveis e alinhados às regras da equipe.

#### Governança e supervisão humana

O conjunto dessas definições estabelece a governança do uso da IA no projeto. Ainda assim, nenhuma configuração elimina a necessidade de supervisão. A IA propõe; o profissional decide. Revisar o código gerado, validar as regras de segurança e conferir contra a documentação oficial continuam sendo responsabilidades do desenvolvedor.

**Referências desta seção**

- Anthropic — Effective Context Engineering for AI Agents. https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- Anthropic — Agent Skills. https://www.anthropic.com/news/skills
- OpenAI — Prompt Engineering Guide. https://platform.openai.com/docs/guides/prompt-engineering
- Anthropic — Prompt Engineering Overview. https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview
- AGENTS.md — padrão aberto para definição de agentes. https://agents.md/

---

### 3.3 Skills: capacidades sob medida

As ferramentas de IA atuais distinguem dois conceitos que costumam ser confundidos: as *tools* e as *skills*.

- **Tool (ferramenta)** é uma ação que a IA pode executar, como ler um arquivo, editar código ou rodar um comando. As tools vêm da própria plataforma e são controladas por permissões.
- **Skill (habilidade)** é um conjunto de instruções reutilizável que ensina a IA a executar um procedimento específico do projeto. A skill não cria uma ação nova: organiza o conhecimento sobre como usar as ações que já existem.

Enquanto o `AGENTS.md` é lido sempre, como um manual geral do projeto, as skills são carregadas **sob demanda**: a IA consulta a skill quando a tarefa corresponde à descrição dela. Isso mantém o contexto enxuto e permite especializar o comportamento sem sobrecarregar as instruções principais.

Uma boa forma de visualizar: o `AGENTS.md` é o manual da empresa, entregue a todo funcionário no primeiro dia; a skill é um procedimento específico, como um checklist de fechamento de caixa, consultado apenas quando aquela tarefa precisa ser executada.

#### Como uma skill é estruturada

Uma skill é uma pasta com um arquivo `SKILL.md`, contendo:

1. **Cabeçalho (frontmatter)** com `name` e `description`. A descrição deve dizer o que a skill faz e quando deve ser usada, incluindo as palavras-chave que o usuário provavelmente vai dizer.
2. **Corpo** com o passo a passo, os comandos exatos e, quando útil, exemplos.

#### Como criar uma skill

1. **Identifique uma tarefa repetitiva** e padronizável no projeto, como finalizar uma tarefa do backlog.
2. **Escreva a descrição** pensando em quando a IA deve acioná-la.
3. **Descreva o procedimento em passos objetivos**, incluindo os comandos exatos.
4. **Salve** em uma pasta de skills do projeto, como `.opencode/skills/<nome>/SKILL.md`.
5. **Teste** pedindo à IA para executar a tarefa e ajuste o texto conforme o resultado.

#### Exemplo: skill de finalizar tarefa

O exemplo a seguir encerra uma tarefa do backlog executando os testes, atualizando a documentação e registrando a entrega no Git.

```markdown
---
name: finalizar-tarefa
description: Finaliza uma tarefa do backlog. Use quando o usuário pedir para concluir ou entregar uma tarefa do TASKS.md.
---

# Finalizar tarefa

1. Identifique a tarefa no `TASKS.md`.
2. Rode os testes: `docker compose exec minicrm npm test`.
3. Marque os critérios de aceite e mude o status para "concluída".
4. Adicione uma entrada no `CHANGELOG.md`.
5. Crie um branch, faça o commit e envie para o remote `origin`.
6. Reporte o resultado dos testes e o hash do commit.
```

Uma boa skill é curta e específica. Se ela cresce demais, provavelmente cobre mais de um procedimento e deve ser dividida. A descrição é a parte mais importante: é por ela que a IA decide quando carregar a skill.

**Referências desta seção**

- Anthropic — Agent Skills. https://www.anthropic.com/news/skills
- OpenCode — Skills. https://opencode.ai/docs/skills/
- AGENTS.md — padrão aberto para definição de agentes. https://agents.md/

---

### 3.4 Ferramentas personalizadas (custom tools)

Além das ferramentas embutidas e das skills, é possível criar **ferramentas personalizadas**: funções próprias que a IA passa a poder chamar durante o trabalho.

- **Ferramenta embutida (built-in tool)** — já vem na plataforma, como ler, escrever ou executar um comando.
- **Ferramenta personalizada (custom tool)** — criada pela equipe para uma necessidade do projeto, como consultar um banco ou chamar uma API interna.
- **Skill** — ensina a IA *como* executar um procedimento.

A skill é conhecimento (instruções); a ferramenta personalizada é capacidade (uma ação nova que a IA pode acionar). No OpenCode, elas ficam em `.opencode/tools/`, em arquivos TypeScript ou JavaScript cujo nome vira o nome da ferramenta.

#### Exemplo: ferramenta de consulta de tarefa

```ts
import { tool } from "@opencode-ai/plugin"

export default tool({
  description: "Consulta o status de uma tarefa no backlog",
  args: {
    id: tool.schema.string().describe("Identificador da tarefa"),
  },
  async execute({ id }) {
    return `Tarefa ${id} consultada.`
  },
})
```

**Referências desta seção**

- OpenCode — Custom Tools. https://opencode.ai/docs/custom-tools/
- Anthropic — Agent Skills. https://www.anthropic.com/news/skills
- AGENTS.md — padrão aberto para definição de agentes. https://agents.md/

---

### 3.5 Outras features de IA no desenvolvimento

Além dos arquivos de contexto e das skills, o ecossistema atual oferece outros recursos que ampliam o que a IA consegue fazer dentro de um projeto.

- **MCP (Model Context Protocol)** — padrão aberto que conecta a IA a fontes externas de dados e ferramentas, como bancos de dados, APIs e navegadores. Em vez de copiar e colar informações, a IA consulta a fonte diretamente, com permissões controladas.
- **Subagentes** — agentes especializados acionados para tarefas específicas, como revisar segurança ou analisar desempenho. Costumam rodar em contexto separado, evitando sobrecarregar a conversa principal.
- **Comandos (slash commands)** — prompts reutilizáveis invocados por um atalho, padronizando operações recorrentes, como gerar um relatório ou executar uma revisão.
- **Hooks** — ações automáticas disparadas por eventos, como rodar o lint após uma edição ou formatar o código antes de um commit. Garantem que certas regras sejam cumpridas sem depender da memória da IA.
- **Referências externas** — diretórios e repositórios adicionais disponibilizados à IA como contexto, úteis para consultar documentação ou um SDK sem misturá-los ao projeto.
- **Memória persistente** — arquivos de instruções mantidos entre sessões, preservando decisões e convenções do projeto.
- **Recuperação de contexto (RAG)** — busca semântica sobre o código e a documentação, permitindo localizar trechos relevantes sem enviar o projeto inteiro à IA.

Esses recursos não substituem os fundamentos. Eles ampliam a capacidade da ferramenta, mas continuam exigindo configuração consciente, permissões adequadas e revisão humana. A escolha depende do problema: quanto mais automática a ação, maior a importância da governança.

E nem todo projeto precisa de tudo isso. O ponto de partida é o arquivo de contexto (`AGENTS.md`) e, quando surgir uma tarefa repetitiva, uma skill. Os demais recursos entram conforme a necessidade.

**Referências desta seção**

- Model Context Protocol — site oficial. https://modelcontextprotocol.io/
- Claude Code — Subagentes. https://docs.anthropic.com/en/docs/claude-code/sub-agents
- Claude Code — Hooks. https://docs.anthropic.com/en/docs/claude-code/hooks
- Claude Code — Comandos. https://docs.anthropic.com/en/docs/claude-code/slash-commands
- Claude Code — MCP. https://docs.anthropic.com/en/docs/claude-code/mcp
- OpenCode — Documentação. https://opencode.ai/docs/
- GitHub Copilot — Instruções personalizadas. https://code.visualstudio.com/docs/copilot/customization/custom-instructions

---

### 3.6 Ferramentas de IA para desenvolvimento

Antes de falar de ferramentas, vale separar dois conceitos que costumam ser misturados:

- **Ferramenta (agente/interface)** — o programa pelo qual o desenvolvedor conversa e que executa ações no projeto. Exemplos: OpenCode, Cursor, GitHub Copilot.
- **Modelo (IA)** — o motor que gera as respostas. Exemplos: DeepSeek, Claude, GPT, Gemini.

A mesma ferramenta pode usar modelos diferentes, e o mesmo modelo pode ser usado por ferramentas diferentes. O OpenCode, por exemplo, suporta mais de 75 provedores de modelos.

#### IA integrada à IDE

São assistentes embutidos no próprio editor, com autocomplete, chat e sugestões de código.

- **GitHub Copilot** — funciona em VS Code, JetBrains e outros editores.
- **JetBrains AI Assistant** — integrado ao PHPStorm e demais IDEs da JetBrains, com recursos gratuitos e plano pago.
- **Cursor e Windsurf** — editores próprios, derivados do VS Code, construídos em torno da IA.
- **Continue.dev** — extensão de código aberto e configurável.
- **Tabnine** — assistente focado em autocomplete e privacidade.

#### Agentes de código no terminal

Executam tarefas no projeto a partir de comandos em linguagem natural, como criar arquivos, rodar testes e commitar.

- **OpenCode** — agente de código aberto, disponível como interface de terminal (TUI), aplicação desktop e extensão de IDE. É a ferramenta usada neste minicurso.
- **Claude Code** — agente de terminal da Anthropic.
- **Gemini CLI** — agente de terminal do Google.
- **OpenAI Codex CLI** — agente de terminal da OpenAI.
- **Aider** — agente de terminal de código aberto.
- **Cline e Roo Code** — extensões de agente para o VS Code.

#### Modelos de IA para desenvolvimento

- **DeepSeek** — modelo usado neste minicurso, com bom desempenho em código e custo acessível.
- **Claude (Anthropic)**, **GPT (OpenAI)** e **Gemini (Google)** — modelos generalistas de alto desempenho.
- **Qwen (Alibaba)** e **Llama (Meta)** — alternativas de pesos abertos.
- **Modelos locais** — executados na própria máquina por ferramentas como Ollama e LM Studio, úteis quando há restrição de envio de dados.

Uma forma simples de guardar a diferença: a ferramenta é o carro, o modelo é o motor. Dá para trocar o motor sem trocar o carro — e é justamente isso que o OpenCode permite ao configurar diferentes provedores.

**Referências desta seção**

- OpenCode — Providers (lista de provedores suportados). https://opencode.ai/docs/providers/
- OpenCode — Documentação. https://opencode.ai/docs/
- JetBrains AI Assistant. https://www.jetbrains.com/ai/
- GitHub Copilot. https://github.com/features/copilot
- Cursor. https://cursor.com/
- Windsurf. https://windsurf.com/
- Continue.dev. https://continue.dev/
- Cline. https://cline.bot/
- Roo Code. https://roocode.com/
- Aider. https://aider.chat/
- Claude Code. https://www.anthropic.com/claude-code
- Gemini CLI. https://github.com/google-gemini/gemini-cli
- OpenAI Codex CLI. https://github.com/openai/codex
- DeepSeek — console oficial. https://platform.deepseek.com/
- Ollama — modelos locais. https://ollama.com/
- LM Studio — modelos locais. https://lmstudio.ai/

---

## Fechamento da Parte Teórica

A teoria percorreu três ideias centrais.

A primeira: desenvolver software sempre exigiu aprendizado contínuo e domínio das fontes oficiais de conhecimento. A IA mudou a velocidade da produção, mas não eliminou essa exigência; ao contrário, tornou-a mais importante, porque agora é preciso verificar o que a máquina propõe.

A segunda: o código gerado por IA traz riscos concretos — alucinações, lógicas não compreendidas, dependência intelectual, vulnerabilidades, código obsoleto e questões de licenciamento. Esses riscos não invalidam a ferramenta, mas impõem revisão crítica e responsabilidade profissional.

A terceira: usar IA de forma profissional não se resume a fazer perguntas. Envolve preparar o ambiente com arquivos de contexto, definir papel, ferramentas permitidas, restrições e formatos de saída; criar skills para procedimentos repetitivos e ferramentas personalizadas para novas ações; e conhecer os demais recursos disponíveis, sempre com governança clara e supervisão humana.

A próxima etapa aplica tudo isso na prática. Partindo de três arquivos — um guia de boas práticas (`AGENTS.md`), a descrição da necessidade do negócio (`REQUISITOS.md`) e o plano de implementação (`PLANO.md`) —, a IA prepara o ambiente, constrói o sistema em etapas, implementa as funcionalidades, gera testes, atualiza a documentação e entrega o resultado sob supervisão do desenvolvedor. No caminho, uma skill automatiza o encerramento das tarefas, unindo teoria e prática.

**Referências gerais**

- DORA — State of DevOps Report. https://dora.dev/
- Stack Overflow Developer Survey. https://survey.stackoverflow.co/
- GitHub Octoverse. https://octoverse.github.com/
- OWASP Top 10. https://owasp.org/www-project-top-ten/
- OWASP Top 10 for LLM Applications. https://owasp.org/www-project-top-10-for-large-language-model-applications/
- NIST AI Risk Management Framework. https://www.nist.gov/itl/ai-risk-management-framework

---

## Apêndice: Preparando o ambiente para a prática

Esta seção reúne os passos executados no início da parte prática e serve como guia geral para configurar qualquer projeto com o OpenCode. O DeepSeek aparece no final, como opcional: a demonstração mostra como integrá-lo, mas é possível acompanhar tudo com o modelo gratuito do próprio OpenCode.

### 1. Instalar o OpenCode

Escolha uma das formas:

- Script de instalação: `curl -fsSL https://opencode.ai/install | bash`
- Via npm: `npm install -g opencode-ai`
- Arch Linux: `sudo pacman -S opencode` (ou `paru -S opencode-bin`)

### 2. Iniciar no projeto

1. Entre na pasta do projeto, que contém `AGENTS.md`, `REQUISITOS.md` e `PLANO.md`.
2. Execute `opencode`.
3. A IA lê os arquivos do projeto e as skills disponíveis.
4. Peça a construção em etapas, por exemplo: "Leia os três arquivos e execute a Etapa 1 do `PLANO.md`."

### 3. Escolher o modelo

1. Na interface, rode `/models` e selecione um modelo. O OpenCode já oferece opções gratuitas para começar.
2. Opcionalmente, fixe o modelo no `opencode.json`: `"model": "<provedor>/<modelo>"`.

### 4. Conferir provedores e modelos disponíveis

- `opencode auth list` — lista os provedores autenticados.
- `opencode models` — lista todos os modelos disponíveis.
- `/models` — seletor de modelos na interface.

### 5. (Opcional) Integrar o DeepSeek

A demonstração usa o DeepSeek, mas ele não é obrigatório. Para usá-lo:

1. Acesse https://platform.deepseek.com/ e crie uma conta.
2. Adicione créditos à conta (o uso da API é cobrado por consumo).
3. No console, abra a seção de chaves de API, clique em **Create new API key** e copie a chave (ela é exibida uma única vez).
4. Dentro da pasta do projeto, execute `opencode` e rode `/connect`; busque **DeepSeek** e cole a chave. Alternativa pelo terminal: `opencode auth login`.
5. As credenciais ficam salvas em `~/.local/share/opencode/auth.json`.
6. Depois, rode `/models` e selecione um modelo DeepSeek.

### Interfaces do OpenCode

- **Terminal (TUI):** interface principal, usada na demonstração.
- **Web:** `opencode web` abre a interface no navegador.
- **Desktop e IDE:** aplicação desktop e extensão de IDE.

**Referências desta seção**

- OpenCode — Introdução e instalação. https://opencode.ai/docs/
- OpenCode — Providers. https://opencode.ai/docs/providers/
- OpenCode — CLI. https://opencode.ai/docs/cli/
- DeepSeek — console oficial. https://platform.deepseek.com/
