# Operação — Baby Gym Londrina Planos App

Este documento é para a **equipe da Baby Gym Londrina**: como gerar links de fechamento, o que o cliente vê, planos disponíveis e regras de negócio.

---

## Os dois modos

| Modo | Quem usa | Onde |
|---|---|---|
| **Form mode** | Equipe Baby Gym | `proposta.html` (URL não divulgada) |
| **Client mode** | Pai/mãe | `planos.html#data=<hash>` — o link gerado |

---

## Como gerar um link (proposta.html)

1. Selecione o tipo: **🎀 Primeira Experiência** ou **🔄 Renovação**
2. Preencha nome da mãe, nome do bebê, sexo, turma e validade do link
3. Escolha opcionalmente qual plano destacar com um badge
4. Marque **Avulsa** se quiser exibir a opção de aula avulsa
5. Configure um desconto especial (%, motivo, validade, quais planos) — opcional
6. Clique em **Gerar link** → o link encurtado aparece com botão **Abrir no WhatsApp**
   - Ao clicar em **Abrir no WhatsApp**, o formulário é limpo automaticamente
   - O botão **Limpar formulário** também reseta tudo manualmente
8. As propostas geradas ficam listadas em **Minhas propostas** com filtro por data

> **Importante:** o link gerado aponta sempre para `planos.html` — nunca compartilhe a URL do `proposta.html`.

---

## O que o cliente vê (planos.html)

1. Abre o link recebido no WhatsApp
2. A página exibe:
   - Saudação personalizada com nome da mãe e da criança
   - Carinha ilustrativa (links antigos com foto ainda a exibem até expirar)
   - Banner de desconto (se ativo)
   - Cards dos planos Anual, Semestral, Trimestral (e Avulsa, se habilitada)
   - Abas de **Horários** (se turma definida) e **FAQ**

   > A lista de benefícios de cada card mostra só o que o plano **inclui** (Avental, Trancamento, Cancela no 1º mês, Valor fixo). Descontos não entram nessa lista — aparecem no banner do topo, na nota laranja abaixo das frequências do plano que tem o desconto, e no botão de PIX. Assim o cliente não vê o mesmo benefício presente num card e ausente noutro.
3. O cliente escolhe plano, frequência e forma de pagamento (cartão ou PIX)
4. Clica em **Fechar no WhatsApp** → escolhe horários (se turma definida) → abre conversa com mensagem pré-preenchida

---

## Planos e preços

> Para alterar qualquer valor, veja [INFRA.md](INFRA.md#como-alterar-preços).

| Plano | Freq | Parcelas | Valor/parcela | PIX total |
|---|---|---|---|---|
| Anual | 2× | 12 | R$ 367 | R$ 4.183,80 |
| Anual | 3× | 12 | R$ 417 | R$ 4.753,80 |
| Semestral | 1× | 6 | R$ 347 | R$ 1.977,90 |
| Semestral | 2× | 6 | R$ 397 | R$ 2.262,90 |
| Semestral | 3× | 6 | R$ 447 | R$ 2.547,90 |
| Trimestral | 1× | 3 | R$ 377 | R$ 1.074,45 |
| Trimestral | 2× | 3 | R$ 427 | R$ 1.216,95 |
| Trimestral | 3× | 3 | R$ 477 | R$ 1.359,45 |
| Avulsa | — | — | R$ 127 | — |

PIX = total à vista com 5% de desconto.

---

## Regras de negócio

- Nunca chamar a visita inicial de "aula experimental" ou "primeira aula" — é sempre **Primeira Experiência Baby Gym**
- **isHoje (5%):** aplica automaticamente em links de Primeira Experiência criados há menos de 24h, apenas nos planos Anual e Semestral. Nunca ativa em links de Renovação
- **Desconto especial:** aplica apenas nos planos configurados no campo "Planos com desconto"; tem validade própria (nunca maior que a validade do link)
- **Prioridade de desconto:** especial > isHoje > nenhum
- **PIX:** 5% de desconto no total à vista — não cumulativo com o desconto no cartão; o cliente escolhe o mais vantajoso
- Links sem campo `tipo` são tratados como Primeira Experiência (retrocompatibilidade com links antigos)
- Ao fechar com turma definida, o cliente escolhe N horários (N = 1, 2 ou 3 conforme a frequência); não é permitido dois horários no mesmo dia; para avulsa ou links sem turma, o WhatsApp abre diretamente

---

## Planilha "Dados de atendimento IA" — não apague linhas

Quando uma Primeira Experiência cai, é reagendada ou entrou errado, **marque o
status na coluna T (`statusConfirmacao`) em vez de apagar a linha.** O valor é
`cancelado`.

Isso não é preferência de organização — apagar quebra coisas de verdade:

- **A linha some, o registro no sistema não.** O agendamento continua lá,
  agora sem nenhuma linha correspondente. Ele só é removido quando alguém roda
  o backfill à mão, e até lá ele aparece em relatório como divergência.
- **Some também da planilha.** Você perde o registro de que aquela PE existiu e
  por que caiu — que é justamente o que os funis contam.
- **Apagar e cadastrar de novo cria duplicata.** Cada linha tem um
  identificador próprio; a linha nova ganha um identificador novo, e a antiga
  fica no sistema como um agendamento fantasma.

`cancelado` faz o certo sozinho: o agendamento é encerrado, para de contar como
ativo, e o histórico fica.

**Se realmente precisar apagar** — linha de teste, cadastro duplicado do bot —
avise o Michel, porque precisa rodar o backfill depois. E tem uma janela pior:
**nos primeiros 30 minutos** depois que a linha entra, ela ainda não foi
sincronizada, e apagar nesse intervalo deixa um registro órfão que nem o
relatório consegue associar a nada. É exatamente quando a gente mais percebe
que uma linha entrou errada — então, nessa meia hora, `cancelado` em vez de
apagar.

---

## Como editar textos e mensagens

Em produção, use o **⚙️ Config** no `proposta.html`. Os textos ficam no Firestore e são carregados em tempo real — sem precisar fazer deploy.

> **PROD × HML:** o cabeçalho do modal mostra um selo **PROD** ou **HML** conforme o ambiente em que você está (raiz do site = PROD, `/hml/` = HML). Cada seção tem um registro independente por ambiente — editar em HML nunca afeta os preços/textos que os clientes reais veem, e serve para testar uma mudança antes de aplicá-la em produção.

As seções editáveis são:

| Seção | O que controla |
|---|---|
| **messages** | Saudações, CTA, mensagens WhatsApp, banners de desconto, textos de UI |
| **planos** | Preços por plano e frequência. Remover a seção de um plano (ex.: `anual`) o desativa: o card some da tela do cliente sem quebrar os demais planos — use isso para parar de vender um plano temporariamente |
| **horarios** | Grade de horários por turma |
| **faq** | Perguntas frequentes exibidas na aba FAQ |
| **dadosUnidade** | Número WhatsApp, endereço e Instagram do rodapé |
| **turmas** | Lista de turmas com nome, faixa etária e apelidos |

Os textos aceitam parâmetros dinâmicos entre `[colchetes]`:

| Parâmetro | Valor |
|---|---|
| `[mae]` | Nome da mãe/responsável |
| `[filho]` | Nome da criança |
| `[artigo]` | `o` (menino) ou `a` (menina) |
| `[pct]` | Percentual do desconto (ex: `10`) |
| `[motivo]` | Motivo do desconto especial |
| `[plano]` | Nome do plano (ex: `Anual`) |
| `[freq]` | Label de frequência (ex: `2× por semana`) |
| `[pag]` | Forma de pagamento (ex: `PIX à vista`) |
| `[valor]` | Valor formatado (ex: `R$4.183,80`) |
| `[planos]` | Lista de planos com desconto (ex: `Anual e Semestral`) |
| `[data]` | Data de validade formatada (ex: `31/12/2026`) |
| `[url]` | Link encurtado para compartilhamento |
| `[apelido]` | Apelido da turma no gênero correto (ex: `pitoca`, `explorador`) |
| `[turma]` | Label da turma (ex: `Pitocos`) |

### Histórico de edições

Cada **Salvar** grava no histórico o conteúdo que estava salvo **até aquele momento** (com e-mail e horário de quem fez a alteração seguinte) — ou seja, cada entrada é um ponto de rollback real para a versão que acabou de ser substituída. Para restaurar uma versão anterior, clique nela — o conteúdo carrega no editor — e salve novamente (isso cria mais uma entrada de histórico com o estado anterior a essa restauração). Nenhuma versão é apagada.

---

## Como editar turmas

As turmas são configuradas na seção **turmas** do Config Editor. Cada entrada define:

| Campo | Descrição |
|---|---|
| `id` | Identificador salvo no hash do link |
| `label` | Nome exibido na mensagem WhatsApp (`Turma: Pitocos`) |
| `idade` | Faixa etária exibida no select do formulário |
| `apelidoM` | Apelido no masculino usado no hero (ex: `pitoco`) |
| `apelidoF` | Apelido no feminino usado no hero (ex: `pitoca`) |
| `freqs` | _(opcional)_ Array de frequências permitidas (ex: `["1x", "2x"]`). Se ausente, todas ficam visíveis |

Quando uma turma está definida no link, o hero exibe _"Foi uma alegria receber [artigo] [apelido] [filho] hoje!"_ e a mensagem WhatsApp inclui a linha `🎒 Turma: [label]`.

**Turma é campo obrigatório** no formulário. Links gerados sem turma (legados) continuam funcionando, mas a aba Horários fica oculta.

Os horários de cada turma são editados na seção **horarios** do Config Editor.
