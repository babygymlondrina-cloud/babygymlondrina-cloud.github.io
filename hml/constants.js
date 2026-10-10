// ─── Baby Gym Londrina — Constantes globais ───────────────────────────────────
// Centraliza strings usadas como discriminadores de tipo em todo o app.
// Importe via <script src="constants.js"> em planos.html, proposta.html e
// crm.html.
//
// Nunca commite sem rodar: npm run lint && npm test

const BGL_CONST = {
  APP_VERSION: '3.24',
  APP_DATE: '2026-10-09',
  PLANO: {
    ANUAL: 'anual',
    SEMESTRAL: 'semestral',
    TRIMESTRAL: 'trimestral',
    AVULSA: 'avulsa',
  },
  PAGAMENTO: {
    CARTAO: 'cartao',
    PIX: 'pix',
  },
  DESCONTO: {
    HOJE: 'hoje',
    ESPECIAL: 'especial',
  },
  TIPO: {
    RENOVACAO: 'renovacao',
    PRIMEIRA_VEZ: 'primeira_vez',
  },
  EXTRA: {
    AVENTAL: 'avental',
    CAMISETA: 'camiseta',
    MEIA: 'meia',
  },
  PRIMEIRA_EXP: 'pePaga',

  /**
   * Timezone de TODA data/hora derivada de "agora". Espelha `TZ` do
   * `functions/crm-const.js` — o Painel do Dia do `crm.html` decide as faixas
   * do relógio por ela, e a API decide "hoje" pela mesma.
   */
  TZ: 'America/Sao_Paulo',

  /**
   * Turmas reconhecidas no `&turma=` do link de proposta. Mesma lista de
   * `functions/crm-const.js:TURMAS` e do `IFS` da fórmula
   * `sheets/proposta-autofill.gs`, que o botão "Gerar proposta" aposenta:
   * turma fora daqui sai do link sem o parâmetro, e o `proposta.html` fica com
   * "Sem turma" — mesmo efeito do `REGEXMATCH` que também não casava.
   */
  TURMAS: ['pitocos', 'sapecas', 'exploradores', 'artistas', 'atletas'],

  /** Tela da equipe (`crm.html`, Fase 3 — `docs/CRM_FASE3_PLANO.md` §3.4). */
  CRM: {
    /** Abas da tela. `PAINEL` é a default — o Painel do Dia (decisão D8). */
    ABA: {
      PAINEL: 'painel',
      SEMANA: 'semana',
      MES: 'mes',
      FRIOS: 'frios',
      BUSCA: 'busca',
      AJUDA: 'ajuda',
    },
    /** Visões da aba Ajuda (`crm-ajuda.js`): o manual e o histórico de versões. */
    AJUDA_VISAO: {
      MANUAL: 'manual',
      NOVIDADES: 'novidades',
    },
    /**
     * Faixas do Painel do Dia, decididas pelo relógio LOCAL a cada minuto —
     * sem chamar a API (D8, item b).
     */
    FAIXA: {
      PASSOU: 'passou',
      AGORA: 'agora',
      VEM: 'vem',
    },
    /** Valores de `?view=` que a tela consome (`docs/CRM_FASE3_API.md`). */
    VIEW: {
      AGENDA: 'agenda',
      FRIOS: 'frios',
      BUSCA: 'busca',
    },
    /**
     * Mínimo de caracteres de `?q=` antes de disparar a busca (issue #227) —
     * espelha `MIN_CARACTERES_BUSCA` de `functions/crm-const.js`. Evita chamada
     * à API a cada tecla e a mensagem de erro de digitação insuficiente vem do
     * cliente, não de um 400 da API.
     */
    MIN_CARACTERES_BUSCA: 2,
    /** `agendamento.confirmacao.status` cru que a tela sabe rotular. */
    CONFIRMACAO: {
      CONFIRMADO: 'confirmado',
      PENDENTE: 'pendente',
      A_CONFIRMAR: 'a confirmar',
      AGUARDANDO_PAGAMENTO: 'aguardando_pagamento',
    },
    /** `agendamento.pagamentoPE.status` cru que a tela sabe rotular. */
    PAGAMENTO_PE: {
      PAGO: 'pago',
      PIX_GERADO: 'pix_gerado',
      // Os três que a tela escreve ao CRIAR um agendamento (#271) — espelham
      // `STATUS_PE_*` de `functions/crm-const.js`.
      AGUARDANDO_GERAR_PIX: 'aguardando_gerar_pix',
      PIX_ENVIADO_MANUAL: 'pix_enviado_manual',
      NAO_PAGO: 'nao_pago',
    },
    /** Status de agendamento que não conta como "ativo" (a linha foi encerrada). */
    AGENDAMENTO_ENCERRADO: ['cancelado', 'reagendado'],
    /**
     * As três cobranças da PE ao agendar (#271) — espelha `COBRANCA_PE` de
     * `functions/crm-const.js` (um teste compara). SEM padrão na tela: só
     * `GERAR_PIX` faz o Make cobrar e mandar mensagens à mãe.
     */
    COBRANCA_PE: {
      GERAR_PIX: 'gerar_pix',
      PIX_ENVIADO: 'pix_enviado',
      NAO_PAGA: 'nao_paga',
    },
    /**
     * Faixas de idade (em MESES, `de` inclusive e `ate` exclusivo) que SUGEREM a turma
     * ao agendar (#271): Pitocos 2–6m, Sapecas 6–12m, Exploradores 12–18m, Artistas
     * 18m–2a, Atletas 2–4a. Sugestão, nunca imposição: a turma real depende de horário
     * disponível, e quem sabe isso é a equipe. Fora de qualquer faixa não sugere nada.
     */
    FAIXAS_TURMA: [
      { turma: 'pitocos', de: 2, ate: 6 },
      { turma: 'sapecas', de: 6, ate: 12 },
      { turma: 'exploradores', de: 12, ate: 18 },
      { turma: 'artistas', de: 18, ate: 24 },
      { turma: 'atletas', de: 24, ate: 48 },
    ],
    /**
     * `motivo` de `?view=frios` — espelha `MOTIVOS_FRIOS` do
     * `functions/crm-const.js` (`docs/CRM_FASE2_API.md`).
     */
    MOTIVO_FRIO: {
      FALTA_AGENDAMENTO: 'falta_agendamento',
      FALTOU: 'faltou',
      NAO_FECHOU: 'nao_fechou',
    },
    /**
     * Eventos que os botões de escrita da tela disparam via `PATCH
     * /leads/{id}` — os mesmos nomes de `functions/leads-logic.js:EVENT_HANDLERS`
     * e de `functions/sheets-write.js:EVENTOS` (Fase 3, T6). "Reagendar" fica
     * fora de propósito (D5 do `docs/CRM_FASE3_PLANO.md`): é o único botão que
     * CRIARIA agendamento, e não faz parte desta lista.
     */
    EVENTO: {
      COMPARECEU: 'compareceu',
      FECHOU: 'fechou',
      CANCELADO: 'cancelado',
      TRAVAR_RECUPERACAO: 'travar_recuperacao',
      DESTRAVAR_RECUPERACAO: 'destravar_recuperacao',
      /** Anotação pós-PE (issue #308) — `dados: { campo, texto }` + `agendamentoId`. */
      OBSERVACAO_POS_PE: 'observacao_pos_pe',
      /** PE marcada como paga à mão (issue #397) — `dados: { valor, observacao }`. */
      PE_PAGA: 'pe_paga',
    },
    /**
     * Observação obrigatória ao marcar a PE como paga (issue #397): o motivo de
     * estar registrando à mão. O servidor é quem recusa texto vazio/curto — a
     * tela só repete a regra para não deixar clicar. Mesmos números de
     * `OBSERVACAO_PE` em `functions/crm-const.js`; um teste compara as duas.
     */
    OBSERVACAO_PE: { MIN: 10, MAX: 500 },
    /**
     * Anotações pós-PE (issue #308), na ordem da planilha — `campo` espelha
     * `CAMPOS_POS_PE` de `functions/crm-const.js` (colunas Y, Z e AA de
     * `DadosAgendamento`); um teste compara as duas listas.
     */
    POS_PE: [
      { campo: 'analise', rotulo: 'Análise pós-PE' },
      { campo: 'contato1', rotulo: '1º contato pós-PE' },
      { campo: 'contato2', rotulo: '2º contato pós-PE' },
    ],
    /**
     * Rollback de 1 minuto da Fase 3B (T6): desligar aqui tira todos os botões
     * de escrita na hora, sem precisar de deploy da API — a tela volta a ser
     * byte a byte a somente-leitura da T4. Nasceu DESLIGADA (T6, PR #229) até
     * o write-back na planilha (T5) ser validado ao vivo pela `apiHml`
     * (`docs/COMANDOS.md`, passos 1–4 da "Primeira ativação"); **ligada desde
     * 2026-09-16** para a semana paralela em HML (`docs/CRM_FASE3_ADOCAO.md`).
     * A API tem a própria flag (`BGL_SHEETS_WRITEBACK`, no servidor) — as duas
     * precisam estar ligadas para o clique chegar até a planilha; só esta aqui
     * controla se o botão aparece.
     */
    FLAG_ACOES_ESCRITA: true,
    /**
     * Botão "➕ Agendar" (criar agendamento pela tela, issue #271). O botão só
     * aparece com ela E com `FLAG_ACOES_ESCRITA` ligadas, e a API tem a sua
     * (`BGL_REAGENDAR_LINHA`, servidor) — sem as duas a criação não chega à planilha.
     * Valores: `false` (nasceu assim) = ninguém vê · **`'hml'` = só a tela servida em
     * `/hml/`** (validação ao vivo da linha nova, o mesmo valor `hml` da flag do
     * servidor) · `true` = todos, inclusive produção — só depois da validação
     * (`docs/COMANDOS.md`, "Criar agendamento pela tela"). Promover com `'hml'` para
     * a `master` não mostra o botão em produção.
     */
    FLAG_REAGENDAR: 'hml',
  },
};
