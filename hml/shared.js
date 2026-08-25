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

// ─── apiBaseUrl ───────────────────────────────────────────────────────────────
// URL da API de leads do CRM para o ambiente em que ESTA página está rodando.
// São duas Cloud Functions, uma por ambiente (`api` → coleção `leads`,
// `apiHml` → `leads_hml`): quem escolhe passa a ser quem chama, e não o
// `BGL_ENV` da Function — é o que impede a tela servida em /hml/ de escrever em
// produção depois que a Fase 1 fechar (docs/CRM_FASE3_PLANO.md, D6).
//
// Mesmo critério de ambiente do configDocId acima — `BGL_CONFIG.env`, que as
// páginas derivam do pathname /hml/ — em vez de uma segunda detecção aqui.
// Ambiente desconhecido cai em prod, a convenção do resto do projeto.
//
// As URLs vêm de `BGL_CRM_CONFIG` (crm-config.js), carregado só pelo crm.html —
// não de `BGL_CONFIG`, que as páginas públicas também carregam. O `env`, esse
// sim, continua vindo de `BGL_CONFIG`: é o mesmo de todo o resto do projeto.
//
// Barra final é removida antes de devolver. A URL da `apiHml` é colada à mão
// depois do deploy, e copiar da barra de endereços traz o `/` junto: com ele,
// `apiBaseUrl() + '/leads'` vira `//leads`, que o `new URL(req.url, base)` do
// functions/app.js lê como protocol-relative — o host passa a ser `leads`, o
// pathname vira `/` e a API responde 404 DEPOIS de autenticar. Mesma
// normalização que o parity-mensagens.js já faz na URL que vem do ambiente.
//
// Erra alto quando a URL do ambiente não está preenchida (`apiUrl.hml` fica
// vazia até o primeiro deploy da `apiHml`): string vazia viraria fetch contra a
// própria origem — o GitHub Pages responderia 404 em HTML e o erro apareceria
// como "resposta inválida da API", longe da causa.
function apiBaseUrl() {
  const urls = (typeof BGL_CRM_CONFIG !== 'undefined' && BGL_CRM_CONFIG.apiUrl) || {};
  const env = typeof BGL_CONFIG !== 'undefined' && BGL_CONFIG.env === 'hml' ? 'hml' : 'prod';
  const url = (urls[env] || '').replace(/\/+$/, '');
  if (!url)
    throw new Error(
      'BGL_CRM_CONFIG.apiUrl.' + env + ' não configurada — a página carregou o crm-config.js?',
    );
  return url;
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
