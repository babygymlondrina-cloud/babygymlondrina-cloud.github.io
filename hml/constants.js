// ─── Baby Gym Londrina — Constantes globais ───────────────────────────────────
// Centraliza strings usadas como discriminadores de tipo em todo o app.
// Importe via <script src="constants.js"> em planos.html e proposta.html.
//
// Nunca commite sem rodar: npm run lint && npm test

const BGL_CONST = {
  APP_VERSION: '3.1',
  APP_DATE: '2026-03-25',
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
};
