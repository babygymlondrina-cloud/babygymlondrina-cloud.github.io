// ─── Baby Gym Londrina — Configuração do app ──────────────────────────────────
// Edite aqui para alterar números de contato, APIs e parâmetros técnicos.
// Nunca commite sem rodar: npm run lint && npm test

const BGL_CONFIG = {
  // Contato
  whatsapp: '554396517182', // sem +, sem espaços

  // Google Analytics 4
  gaId: 'G-QPB21Y8RKP',

  // Kill switch de versão
  linkVersion: 3, // versão embutida em cada link novo
  linkMinVersion: 3, // incrementar aqui invalida links mais antigos

  // Google Sign-In (proposta.html)
  googleClientId: '349452027389-0n5v6sr986h5rjm36pu4v8kmhqdak2fj.apps.googleusercontent.com',
  allowedEmails: ['michelmenega@gmail.com', 'babygymlondrina@gmail.com', 'recepcaobglondrina@gmail.com'],

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

  // Rodapé da página do cliente
  address: 'Rua Shangai, 42 – Jardim Cláudia',
  instagram: '@meubabygymlondrina',

  // Turmas — define id, label, faixa etária e apelido (m/f) exibido no hero e na mensagem WhatsApp
  turmas: [
    { id: 'pitocos', label: 'Pitocos', idade: '2 a 6 meses', apelidoM: 'pitoco', apelidoF: 'pitoca' },
    { id: 'sapecas', label: 'Sapecas', idade: '6 a 12 meses', apelidoM: 'sapeca', apelidoF: 'sapeca' },
    {
      id: 'exploradores',
      label: 'Exploradores',
      idade: '12 meses a 1 ano e 6 meses',
      apelidoM: 'explorador',
      apelidoF: 'exploradora',
    },
    {
      id: 'artistas',
      label: 'Artistas',
      idade: '1 ano e 6 meses a 2 anos',
      apelidoM: 'artista',
      apelidoF: 'artista',
    },
    { id: 'atletas', label: 'Atletas', idade: '2 a 4 anos', apelidoM: 'atleta', apelidoF: 'atleta' },
  ],
};
