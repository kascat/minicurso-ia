# Entrega — T-09: Máscara de telefone no cadastro

## Descrição

Aplica máscara de telefone no campo do formulário de cadastro de leads, formatando a entrada
para o padrão brasileiro `(11) 99999-9999` (celular) ou `(11) 9999-9999` (fixo).

## O que foi feito

- Adicionado o utilitário `formatarTelefone` em `utils/formato.ts`, que remove caracteres não
  numéricos, limita a 11 dígitos e formata conforme o comprimento.
- Atualizado `pages/cadastro.vue` para aplicar a máscara via `computed` com getter/setter,
  mantendo o valor limpo internamente enquanto o input exibe o formato mascarado.
- Ajustado o input para `type="tel"`, `inputmode="tel"`, `placeholder="(11) 99999-9999"` e
  `maxlength="15"`.
- Adicionados testes unitários em `tests/formato.test.ts` cobrindo: entrada vazia, fixo de 10
  dígitos, celular de 11 dígitos, limpeza de caracteres não numéricos e limite de 11 dígitos.

## Como testar

1. `npm test` (34 testes passando, 5 novos).
2. Acessar `/cadastro` e digitar um número para ver a máscara aplicada automaticamente.

## Pontos de atenção / decisões

- O valor mascarado é o que persiste no banco e aparece na listagem/exportação (ex.:
  `(11) 98765-4321`). Caso se prefira armazenar apenas os dígitos, basta enviar o telefone
  limpo no `onSubmit`.
- A validação Zod existente (8–20 caracteres) continua compatível com o formato mascarado.
- `package-lock.json` foi deixado de fora do commit por conter alterações não relacionadas
  (resolução de dependências do `npm install` no container).
