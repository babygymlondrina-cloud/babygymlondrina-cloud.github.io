// ─── Baby Gym Londrina — Constantes globais ───────────────────────────────────
// Centraliza strings usadas como discriminadores de tipo em todo o app.
// Importe via <script src="constants.js"> em planos.html, proposta.html e
// crm.html.
//
// Nunca commite sem rodar: npm run lint && npm test

const BGL_CONST = {
  APP_VERSION: '3.9',
  APP_DATE: '2026-09-16',
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
      FRIOS: 'frios',
      BUSCA: 'busca',
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
    },
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
    },
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
    },
    /**
     * Rollback de 1 minuto da Fase 3B (T6): com a flag desligada, nenhum botão
     * de escrita é desenhado e a tela volta a ser byte a byte a somente-leitura
     * da T4 — sem precisar de deploy da API. Nasce DESLIGADA de propósito: o
     * estado seguro é o que não escreve, e o write-back da planilha (T5) tem a
     * própria flag (`BGL_SHEETS_WRITEBACK`, no servidor) que também precisa
     * estar ligada para o clique não virar divergência planilha × Firestore.
     */
    FLAG_ACOES_ESCRITA: false,
  },
};
