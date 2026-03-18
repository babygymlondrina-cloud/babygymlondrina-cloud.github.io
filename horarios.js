// ─── Baby Gym Londrina — Horários de aula por turma ───────────────────────────
// Grade real de aulas conforme divulgação oficial.
// Nunca commite sem rodar: npm run lint && npm test

const BGL_HORARIOS = {
  pitocos: {
    turmas: [
      { dias: 'Terça', horarios: ['11h'] },
      { dias: 'Quinta', horarios: ['14h'] },
    ],
  },
  sapecas: {
    turmas: [
      { dias: 'Quarta', horarios: ['08h', '14h'] },
      { dias: 'Quinta', horarios: ['09h', '15h'] },
      { dias: 'Sexta', horarios: ['08h', '15h', '17h'] },
      { dias: 'Sábado', horarios: ['11h'] },
    ],
  },
  exploradores: {
    turmas: [
      { dias: 'Terça', horarios: ['09h'] },
      { dias: 'Quarta', horarios: ['16h'] },
      { dias: 'Quinta', horarios: ['08h', '17h'] },
      { dias: 'Sexta', horarios: ['09h', '15h'] },
      { dias: 'Sábado', horarios: ['10h'] },
    ],
  },
  artistas: {
    turmas: [
      { dias: 'Terça', horarios: ['10h', '14h'] },
      { dias: 'Quarta', horarios: ['09h', '15h'] },
      { dias: 'Quinta', horarios: ['10h'] },
      { dias: 'Sexta', horarios: ['14h', '16h'] },
      { dias: 'Sábado', horarios: ['09h'] },
    ],
  },
  atletas: {
    turmas: [
      { dias: 'Terça', horarios: ['16h'] },
      { dias: 'Quarta', horarios: ['10h'] },
      { dias: 'Quinta', horarios: ['16h'] },
      { dias: 'Sexta', horarios: ['10h'] },
      { dias: 'Sábado', horarios: ['08h'] },
    ],
  },
};
