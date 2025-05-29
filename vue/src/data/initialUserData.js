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
    { id: 'm1', nome: 'Cálculo Vetorial Avançado', professor: 'Prof. Dr. Elara Vance', progressoAtividades: 75, progressoConteudo: 60, faltas: 2, limiteFaltas: 10, presenca: 80, cor: 'bg-blue-500' },
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
}  
};