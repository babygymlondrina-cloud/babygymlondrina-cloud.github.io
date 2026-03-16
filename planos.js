// ─── Baby Gym Londrina — Planos e preços ──────────────────────────────────────
// Edite aqui para alterar preços, parcelas ou frequências.
// Regras:
//   preco   → valor de UMA parcela (inteiro, sem centavos)
//   pix     → total à vista (= parcelas × preco × 0.95)
//   porAula → preço por aula (= pix / (semanas × meses))
// Nunca commite sem rodar: npm run lint && npm test

const BGL_PLANOS = {
  anual: {
    parcelas: 12,
    frequencias: [
      { freq: '2x', preco: 367, pix: 4183.8, porAula: 45.88 },
      { freq: '3x', preco: 417, pix: 4753.8, porAula: 34.75 },
    ],
  },

  semestral: {
    parcelas: 6,
    frequencias: [
      { freq: '1x', preco: 347, pix: 1977.9, porAula: 86.75 },
      { freq: '2x', preco: 397, pix: 2262.9, porAula: 49.63 },
      { freq: '3x', preco: 447, pix: 2547.9, porAula: 37.25 },
    ],
  },

  trimestral: {
    parcelas: 3,
    frequencias: [
      { freq: '1x', preco: 377, pix: 1074.45, porAula: 94.25 },
      { freq: '2x', preco: 427, pix: 1216.95, porAula: 53.38 },
      { freq: '3x', preco: 477, pix: 1359.45, porAula: 39.75 },
    ],
  },

  avulsa: {
    preco: 127,
  },
};
