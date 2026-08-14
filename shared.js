// ─── Baby Gym Londrina — Utilitários compartilhados ──────────────────────────
// Módulos usados por planos.html e proposta.html.
// Carregado via <script src="shared.js"> após constants.js em ambos os arquivos.
//
// Nunca commite sem rodar: npm run lint && npm test

// ─── msg ─────────────────────────────────────────────────────────────────────
// Template engine mínimo: substitui [chave] pelos valores de params.
// Parâmetros ausentes permanecem como [chave] sem lançar erro.
function msg(template, params) {
  if (!params) return template;
  return template.replace(/\[(\w+)\]/g, function (_, k) {
    return k in params ? params[k] : '[' + k + ']';
  });
}

// ─── configDocId ─────────────────────────────────────────────────────────────
// Sufixa o id do doc da coleção `config` com "_hml" em homologação, mantendo
// config/planos (prod) e config/planos_hml (hml) como registros independentes
// — mesmo critério já usado para as coleções propostas / propostas_hml.
function configDocId(id) {
  return typeof BGL_CONFIG !== 'undefined' && BGL_CONFIG.env === 'hml' ? id + '_hml' : id;
}

// ─── DiscountStrategy ────────────────────────────────────────────────────────
// Strategy pattern — resolve qual desconto está ativo e se aplica ao plano.
// Depende de BGL_CONST (constants.js deve ser carregado antes).
const DiscountStrategy = (function () {
  function resolve(data) {
    const isHoje =
      data.tipo !== BGL_CONST.TIPO.RENOVACAO &&
      data.created &&
      Date.now() - data.created < 86400000;
    const desc = data.desconto;
    const especial = desc && desc.exp && Date.now() < desc.exp && desc.pct > 0;
    return especial
      ? {
          pct: desc.pct,
          motivo: desc.motivo,
          exp: desc.exp,
          tipo: BGL_CONST.DESCONTO.ESPECIAL,
          planos: desc.planos,
        }
      : isHoje
        ? {
            pct: 5,
            motivo: 'Primeiro dia',
            exp: data.created + 86400000,
            tipo: BGL_CONST.DESCONTO.HOJE,
          }
        : null;
  }
  function appliesTo(ad, plano) {
    if (!ad) return false;
    if (ad.tipo === BGL_CONST.DESCONTO.HOJE)
      return plano === BGL_CONST.PLANO.ANUAL || plano === BGL_CONST.PLANO.SEMESTRAL;
    if (ad.tipo === BGL_CONST.DESCONTO.ESPECIAL) return !ad.planos || ad.planos.includes(plano);
    return false;
  }
  return { resolve, appliesTo };
})();
