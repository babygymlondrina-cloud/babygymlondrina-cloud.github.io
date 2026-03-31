// ─── Baby Gym Londrina — Configuração do app ──────────────────────────────────
// Edite aqui para alterar números de contato, APIs e parâmetros técnicos.
// Nunca commite sem rodar: npm run lint && npm test

// ── Bootstrap — obrigatório antes de conectar ao Firebase ─────────────────────
// whatsapp, address, instagram e turmas ficam em config/meta no Firestore
// e são aplicados em BGL_CONFIG pelo loader (applyRemoteConfig / proposta init).
const BGL_CONFIG = {
  // Ambiente: 'prod' em produção, 'hml' injetado pelo CI no deploy de homologação
  env: 'hml',
  deployVersion: '16731a7', // substituído pelo CI: hash curto do commit
  deployAt: '2026-03-31T19:59:55Z', // substituído pelo CI: ISO timestamp do deploy

  // Google Analytics 4
  gaId: 'G-QPB21Y8RKP',

  // Kill switch de versão
  linkVersion: 3, // versão embutida em cada link novo
  linkMinVersion: 3, // incrementar aqui invalida links mais antigos

  // Google Sign-In (proposta.html)
  googleClientId: '349452027389-0n5v6sr986h5rjm36pu4v8kmhqdak2fj.apps.googleusercontent.com',
  allowedEmails: ['michelmenega@gmail.com', 'babygymlondrina@gmail.com', 'recepcaobglondrina@gmail.com'],

  // RemoteConfig — comportamento quando Firestore não responde
  // 'required': trava na tela de erro (produção — evita exibir preços/horários desatualizados)
  // 'optional': fallback silencioso para os .js locais (desenvolvimento/testes)
  remoteConfigMode: 'required',

  // Firebase
  firebaseConfig: {
    apiKey: 'AIzaSyALIChAmNFTu_xRmLjIDSh07ojJE18NlhM',
    authDomain: 'baby-gym-londrina-b1ad9.firebaseapp.com',
    projectId: 'baby-gym-londrina-b1ad9',
    storageBucket: 'baby-gym-londrina-b1ad9.firebasestorage.app',
    messagingSenderId: '975011039458',
    appId: '1:975011039458:web:561996934bd610bef0f6bb',
  },

  // APIs externas
  isgdApi: 'https://is.gd/create.php?format=json&url=',
  imgbbApi: 'https://api.imgbb.com/1/upload',

  // Foto do bebê
  photoMaxPx: 320, // dimensão máxima (largura ou altura) em px

  // Badge Baby GYM sobreposto na foto
  badgeColor: 'rgba(67,61,153,0.88)',
};
