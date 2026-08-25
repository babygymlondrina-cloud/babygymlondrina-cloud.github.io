// ─── Baby Gym Londrina — Configuração da tela do CRM ──────────────────────────
// Carregado SÓ pelo crm.html (tela da equipe). Deliberadamente separado do
// config.js, que planos.html, index.html e ads.html também carregam: são as
// páginas públicas que o cliente abre, e a URL da API de leads não tem por que
// ser servida nelas.
//
// Nunca commite sem rodar: npm run lint && npm test

const BGL_CRM_CONFIG = {
  // API de leads do CRM — uma URL por ambiente. São duas Cloud Functions,
  // `api` (coleção `leads`) e `apiHml` (`leads_hml`), e quem escolhe é a
  // página, via shared.js:apiBaseUrl() — docs/CRM_FASE3_PLANO.md, D6.
  // `hml` nasce vazia: a URL só existe depois do primeiro deploy da `apiHml`
  // (ver README, "Deploy e ambientes", e docs/COMANDOS.md).
  apiUrl: {
    prod: 'https://api-mhw2usejhq-rj.a.run.app',
    hml: '',
  },
};
