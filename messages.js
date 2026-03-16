/**
 * messages.js — Baby Gym Londrina: Planos App
 *
 * Textos exibidos na página do cliente e mensagens enviadas pelo WhatsApp.
 * Parâmetros dinâmicos ficam entre [colchetes] e são substituídos em tempo
 * de execução pela função msg(template, params) definida em planos.html.
 *
 * Parâmetros disponíveis por contexto:
 *   [mae]     — nome da mãe/responsável
 *   [filho]   — nome da criança
 *   [artigo]  — "o" (menino) ou "a" (menina)
 *   [apelido] — apelido da turma no gênero correto (ex: "pitoca", "explorador")
 *   [turma]   — label da turma (ex: "Pitocos")
 *   [pct]     — percentual do desconto (ex: "10")
 *   [motivo]  — motivo do desconto especial
 *   [plano]   — nome do plano (ex: "Anual")
 *   [freq]    — label de frequência (ex: "2× por semana")
 *   [pag]     — forma de pagamento (ex: "PIX à vista")
 *   [valor]   — valor formatado (ex: "R$4.183,80")
 *   [planos]  — lista de planos com desconto (ex: "Anual e Semestral")
 *   [data]    — data de validade formatada (ex: "31/12/2026")
 *   [url]     — link encurtado para compartilhamento
 */
const BGL_MESSAGES = {
  // ── Hero ────────────────────────────────────────────────────────────────────
  heroSaudacao: 'Olá, [mae]! 🎉',

  heroSubPrimeira:
    'Foi uma alegria conhecer [artigo] [filho] hoje!\n\nGuardamos esse momento com muito carinho. 💜',

  heroSubPrimeiraComTurma:
    'Foi uma alegria conhecer [artigo] [apelido] [filho] hoje!\n\nGuardamos esse momento com muito carinho. 💜',

  heroSubRenovacao:
    'É uma alegria ter [artigo] [filho] com a gente! 🎉\n\nChegou a hora de garantir mais um ciclo na Baby Gym! 💜',

  heroSubRenovacaoComTurma:
    'É uma alegria ter [artigo] [apelido] [filho] com a gente! 🎉\n\nChegou a hora de garantir mais um ciclo na Baby Gym! 💜',

  // ── Banner de desconto ───────────────────────────────────────────────────────
  /** Banner isHoje e desconto especial — "[pct]% de desconto — só hoje!" ou "[pct]% de desconto — [motivo]!" */
  bannerTituloIsHoje: '[pct]% de desconto — só hoje!',
  bannerTituloEspecial: '[pct]% de desconto — [motivo]!',

  /** Subtítulo do banner — lista os planos contemplados */
  bannerSubIsHoje: 'Válido para planos [planos] fechados neste momento',
  bannerSubEspecial: '[planos] · Válido até [data]',

  // ── Nota de desconto nos cards (freq-day1-note) ──────────────────────────────
  freqNoteIsHoje: '✦ 5% de desconto — válido apenas hoje',
  freqNoteEspecialComPix: '✦ [pct]% de desconto ([motivo])',
  freqNoteEspecialSoPix: '✦ [pct]% de desconto ([motivo]) — no cartão',

  // ── Nota de PIX (pix-note-text) ──────────────────────────────────────────────
  pixNoteSemDesc: '5% de desconto pagando à vista via PIX.',
  pixNoteComDesc: '5% de desconto pagando à vista via PIX — não cumulativo com o desconto de hoje.',
  pixNoteEspecial:
    '[pct]% de desconto pagando à vista via PIX (enquanto desconto especial ativo) — não cumulativo com desconto no cartão.',

  // ── Botão PIX ────────────────────────────────────────────────────────────────
  pagPixComOff: '⚡ PIX — 5% off',
  pagPixSemOff: '⚡ PIX',

  // ── Nota abaixo dos botões de pagamento (pag-note) ───────────────────────────
  pagNote: '⚡ Desconto de 5% no valor total à vista via PIX',

  // ── CTA — antes de selecionar um plano ──────────────────────────────────────
  ctaHint: '👆 Toque em uma frequência para escolher seu plano',

  ctaTituloInicialPrimeira: 'Vamos garantir a vaga d[artigo] [filho]? 🎉',
  ctaSubInicialPrimeira: 'Responda esse WhatsApp e feche hoje aproveitando o desconto exclusivo!',

  ctaTituloInicialRenovacao: 'Renovar o plano d[artigo] [filho]? 🎉',
  ctaSubInicialRenovacao: 'Confirme no WhatsApp e a gente cuida do resto!',

  // ── CTA — após selecionar um plano ──────────────────────────────────────────
  ctaTituloPrimeira: 'Ótima escolha d[artigo] [mae]! 🎉',
  ctaSubPrimeira: 'Clique abaixo para confirmar no WhatsApp!',

  ctaTituloRenovacao: 'Renovar o plano d[artigo] [filho]? 🎉',
  ctaSubRenovacao: 'Confirme no WhatsApp e a gente cuida do resto!',

  // ── Mensagem WhatsApp — fechamento ───────────────────────────────────────────
  wppAberturaPrimeira: 'Olá! Quero garantir a matrícula d[artigo] [filho] na Baby Gym! 😍',
  wppAberturaRenovacao: 'Olá! Quero renovar o plano d[artigo] [filho] na Baby Gym! 😍',
  wppAberturaAvulsa: 'Olá! Quero agendar uma aula avulsa para [artigo] [filho]! 😍',

  wppLinhaTurma: '🎒 Turma: [turma]',
  wppLinhaPlano: '📋 Plano: [plano]',
  wppLinhaFreq: '📅 Frequência: [freq]',
  wppLinhaPag: '💳 Pagamento: [pag]',
  wppLinhaValor: '💰 Valor: [valor]',

  wppDiaPix: '⚡ PIX à vista ([pct]% off no total)',
  wppDiaIsHoje: '🟢 Primeiro dia (5% de desconto — só hoje)',
  wppDiaEspecial: '🎁 Desconto [pct]% — [motivo]',
  wppDiaNormal: '📅 Após o primeiro dia',

  /** Rótulos de frequência usados na mensagem WA */
  wppFreqLabel: { '1x': '1× por semana', '2x': '2× por semana', '3x': '3× por semana' },

  /** Rótulos de forma de pagamento usados na mensagem WA */
  wppPagCartao: 'Cartão parcelado',
  wppPagPix: 'PIX à vista',

  /** Sub-texto do CTA para aula avulsa: "Aula Avulsa · R$127" */
  wppSubTextAvulsa: 'Aula Avulsa · [valor]',

  // ── Mensagem WhatsApp — compartilhamento do link (form mode) ────────────────
  shareSaudacaoComNome: 'Olá, [mae]!',
  shareSaudacaoSemNome: 'Olá!',
  shareCorpoPrimeira:
    'Que alegria ter vocês na Baby Gym hoje! Preparamos este link especial com nossos planos — qualquer dúvida, é só chamar.',
  shareCorpoRenovacao:
    'Preparamos este link com as opções de renovação — qualquer dúvida, é só chamar. 💜',

  // ── Tela de link expirado ────────────────────────────────────────────────────
  expiredMsgDefault:
    'Mas a Baby Gym Londrina ainda tem a vaga do seu bebê!\nEntre em contato para receber um link atualizado com nossos planos.',

  expiredMsgPersonalizado:
    'Olá, [mae]! O link dos planos expirou,\nmas a vaga do seu bebê ainda está aqui.\nEntre em contato e enviamos um link atualizado!',

  expiredWppMsg:
    'Olá! Sou [mae] e vi que o link dos planos expirou — pode me enviar um novo? 😊',

  expiredWppMsgSemNome: 'Olá! Vi que o link dos planos expirou — pode me enviar um novo? 😊',

  // ── Tela de link desatualizado ────────────────────────────────────────────────
  outdatedWppMsg: 'Olá! Preciso de um novo link dos planos 😊',
};
