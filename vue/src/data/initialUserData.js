// unihub-novo/src/data/initialUserData.js
export const initialUserData = {
  nome: "Alex Silva",
  fotoUrl: "https://placehold.co/100x100/E0E0E0/B0B0B0?text=User",
  dataInicioEstudos: "2023-02-15",
  taxaPresencaGeral: 92,
  proximaAula: {
    materia: "Cálculo Vetorial Avançado",
    professor: "Prof. Dr. Elara Vance",
    horario: "14:00 - 15:40",
    sala: "B203 / Prédio Principal",
    dia: "Hoje"
  },
  aulasHoje: [
    { id:'ah1', materia: "Física Quântica I", horario: "08:00 - 09:40", sala: "A101", professor: "Prof. Max Planck", cor: "bg-red-500" },
    { id:'ah2', materia: "Cálculo Vetorial Avançado", horario: "14:00 - 15:40", sala: "B203", professor: "Prof. Dr. Elara Vance", cor: "bg-blue-500" },
    { id:'ah3', materia: "Literatura Brasileira", horario: "16:00 - 17:40", sala: "C305", professor: "Prof. Machado de Assis", cor: "bg-green-500" }
  ],
  avisos: [
    "Prazo final para entrega do Projeto de IA: 05/06.",
    "Palestra sobre Carreira Acadêmica no auditório B, 02/06 às 18h.",
    "Inscrições abertas para monitoria de Álgebra Linear.",
  ],
  eventosCalendario: [
    { id: 'ev1', title: 'Prova Cálculo I', date: '2025-06-10', type: 'prova', subject: 'Cálculo I', cor: 'bg-yellow-500' },
    { id: 'ev2', title: 'Entrega Projeto IA', date: '2025-06-05', type: 'trabalho', subject: 'Inteligência Artificial', cor: 'bg-purple-500' },
    { id: 'ev3', title: 'Palestra Carreira', date: '2025-06-02', type: 'evento', subject: 'Geral', cor: 'bg-indigo-500' },
    { id: 'ev4', title: 'Aula Física Quântica', date: '2025-05-28', type: 'aula', subject: 'Física Quântica I', time: '08:00', cor: 'bg-red-500' },
    { id: 'ev5', title: 'Aula Cálculo Vetorial', date: '2025-05-28', type: 'aula', subject: 'Cálculo Vetorial Avançado', time: '14:00', cor: 'bg-blue-500'},
  ],
  materiasSemestre: [
  {
    id: 'm1',
    nome: 'Cálculo Vetorial Avançado',
    codigo: 'MAT302', // Novo: Código da matéria
    professor: 'Prof. Dr. Elara Vance',
    emailProfessor: 'elara.vance@universidade.edu', // Novo: Email do professor
    diasSemana: ['Ter', 'Qui'], // Novo: Dias da semana (ex: ['Seg', 'Qua'])
    horario: '14:00 - 15:40', // Horário (já existente ou pode ser mais detalhado)
    progressoAtividades: 75, // Já existente
    progressoConteudo: 60, // Já existente
    faltas: 2, // Já existente
    limiteFaltas: 10, // Já existente
    cor: 'bg-blue-500', // Já existente, usado para o calendário
    notas: [ // Já existente, usado na ProfilePage
      { tipo: 'P1', valor: 7.5, peso: 0.3, data: '2025-04-10' },
      { tipo: 'P2', valor: 8.0, peso: 0.3, data: '2025-06-05' },
      { tipo: 'Trabalho 1', valor: 9.0, peso: 0.2, data: '2025-03-20' },
      { tipo: 'Trabalho 2', valor: 7.0, peso: 0.2, data: '2025-05-15' }
    ],
    presenca: 90, // Já existente (taxa de presença da matéria)
    trabalhosStatus: { enviados: 2, pendentes: 1, total: 3 }, // Novo: Status dos trabalhos
    arquivos: [ // Novo: Arquivos upados pelo professor
      { id: 'arq1', nome: 'Plano de Ensino.pdf', url: '/files/plano_ensino_mat302.pdf', dataUpload: '2025-02-15' },
      { id: 'arq2', nome: 'Lista Exercícios 1.docx', url: '/files/lista_exercicios1_mat302.docx', dataUpload: '2025-03-01' },
      { id: 'arq3', nome: 'Notas Aula - Vetores.pptx', url: '/files/aula_vetores.pptx', dataUpload: '2025-03-10' }
    ],
    tags: ['Exatas', 'Cálculo Avançado'] // Novo: Tags (para ideia futura)
  },
    { id: 'm2', nome: 'Física Quântica I', professor: 'Prof. Max Planck', progressoAtividades: 90, progressoConteudo: 80, faltas: 1, limiteFaltas: 12, presenca: 90, cor: 'bg-red-500' },
  ],
  trabalhosPendentes: [
    { id: 't1', nome: 'Projeto IA - Fase 2', materia: 'Inteligência Artificial', dataEntrega: '2025-06-05', diasRestantes: 8 },
    { id: 't2', nome: 'Lista Exercícios Termodinâmica', materia: 'Física II', dataEntrega: '2025-06-12', diasRestantes: 15 },
  ],
  servicosConectados: [
    { id: 'office365', nome: 'Office 365', conectado: true, logoUrl: '/path/to/office365-logo.png' },
    { id: 'notion', nome: 'Notion', conectado: false, logoUrl: '/path/to/notion-logo.png' },
    { id: 'moodle', nome: 'Moodle Institucional', conectado: true, logoUrl: '/path/to/moodle-logo.png' },
    { id: 'onenote', nome: 'One Note', conectado: true, logoUrl: '/path/to/onenote.png' },
    { id: 'github', nome: 'GitHub', conectado: false, logoUrl: '/path/to/github.png' },
    { id: 'google', nome: 'Google', conectado: true, logoUrl: '/path/to/google' },
  ],
  assinatura: {
  plano: 'Gratuito', // ou 'Premium', 'Pro'
  dataExpiracao: null, // ou uma data
  },
  assinatura: {
  plano: 'Gratuito', // ou 'Premium', 'Pro'
  dataExpiracao: null, // ou uma data
  },
  trabalhosPendentes: [
  {
    id: 't1',
    nome: 'Projeto IA - Fase 2',
    materia: 'Inteligência Artificial',
    dataPostagem: '2025-05-20', // Novo: Data que o trabalho foi postado
    tipo: 'online', // Novo: 'online' ou 'presencial'
    dataEntrega: '2025-06-05', // Data final de entrega
    // 'diasRestantes' pode ser calculado dinamicamente, mas manteremos por simplicidade no mock
    diasRestantes: (new Date('2025-06-05') - new Date()) / (1000 * 60 * 60 * 24) > 0 ? Math.ceil((new Date('2025-06-05') - new Date()) / (1000 * 60 * 60 * 24)) : 0,
    linkEntrega: 'https://moodle.universidade.edu/trabalho/ia_fase2', // Novo: Link para a sala de entrega (se online)
    alertaDefinido: false, // Novo: Para controlar se um alerta já foi definido
    corMateria: 'bg-purple-500' // Opcional: Cor da matéria para o card
  },
  {
    id: 't2',
    nome: 'Apresentação Seminário - Cap. 3',
    materia: 'Sociologia Aplicada',
    dataPostagem: '2025-05-15',
    tipo: 'presencial',
    dataEntrega: '2025-06-12',
    diasRestantes: (new Date('2025-06-12') - new Date()) / (1000 * 60 * 60 * 24) > 0 ? Math.ceil((new Date('2025-06-12') - new Date()) / (1000 * 60 * 60 * 24)) : 0,
    localApresentacao: 'Sala C105', // Novo: Para trabalhos presenciais
    alertaDefinido: true,
    corMateria: 'bg-teal-500'
  },
  {
    id: 't3',
    nome: 'Lista Exercícios Termodinâmica',
    materia: 'Física II',
    dataPostagem: '2025-05-25',
    tipo: 'online',
    dataEntrega: '2025-06-10',
    diasRestantes: (new Date('2025-06-10') - new Date()) / (1000 * 60 * 60 * 24) > 0 ? Math.ceil((new Date('2025-06-10') - new Date()) / (1000 * 60 * 60 * 24)) : 0,
    linkEntrega: 'https://moodle.universidade.edu/trabalho/fisica_lista3',
    alertaDefinido: false,
    corMateria: 'bg-orange-500'
    }
  ],
};