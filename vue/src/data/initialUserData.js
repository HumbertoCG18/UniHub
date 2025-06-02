// unihub-novo/src/data/initialUserData.js
export const initialUserData = {
  nome: "Alex Silva",
  email: "alex.silva.unihub@example.com", // Adicionado para consistência e uso no CV
  fotoUrl: "https://placehold.co/100x100/E0E0E0/B0B0B0?text=User",
  dataInicioEstudos: "2023-02-15", //
  taxaPresencaGeral: 92, //
  progressoCurso: "45%", // Adicionado, usado na HomePage
  semestreCurso: "3º Semestre de 8", // Adicionado, usado na HomePage
  curso: "Engenharia de Software",
  uni: "Universidade Federal de Hubs (UFHubs)",
  semestreAtual: "3º Semestre", // Mais específico para o perfil
  anoLetivo: "2025/1",
  dataPrevistaFormatura: "2027-07-15",

  proximaAula: { //
    materia: "Cálculo Vetorial Avançado",
    professor: "Prof. Dr. Elara Vance",
    horario: "14:00 - 15:40",
    sala: "B203 / Prédio Principal",
    dia: "Hoje" // Calculado dinamicamente ou definido se for o caso
  },
  aulasHoje: [ //
    { id:'ah1', materia: "Física Quântica I", horario: "08:00 - 09:40", sala: "A101", professor: "Prof. Max Planck", cor: "bg-red-500" },
    { id:'ah2', materia: "Cálculo Vetorial Avançado", horario: "14:00 - 15:40", sala: "B203", professor: "Prof. Dr. Elara Vance", cor: "bg-blue-500" },
    { id:'ah3', materia: "Literatura Brasileira", horario: "16:00 - 17:40", sala: "C305", professor: "Prof. Machado de Assis", cor: "bg-green-500" }
  ],
  avisos: [ //
    "Prazo final para entrega do Projeto de IA: 05/06.",
    "Palestra sobre Carreira Acadêmica no auditório B, hoje (02/06) às 18h.",
    "Inscrições abertas para monitoria de Álgebra Linear até 10/06."
  ],
  eventosCalendario: [ //
    // Datas ajustadas para serem futuras em relação a 02/06/2025
    { id: 'ev1', title: 'Prova Cálculo I', date: '2025-06-10', type: 'prova', subject: 'Cálculo I', cor: 'bg-yellow-500' },
    { id: 'ev2', title: 'Entrega Projeto IA', date: '2025-06-05', type: 'trabalho', subject: 'Inteligência Artificial', cor: 'bg-purple-500' },
    { id: 'ev3', title: 'Palestra Carreira', date: '2025-06-02', type: 'evento', subject: 'Geral', cor: 'bg-indigo-500' }, // Hoje
    { id: 'ev4', title: 'Aula Física Quântica', date: '2025-06-04', type: 'aula', subject: 'Física Quântica I', time: '08:00', cor: 'bg-red-500' },
    { id: 'ev5', title: 'Aula Cálculo Vetorial', date: '2025-06-04', type: 'aula', subject: 'Cálculo Vetorial Avançado', time: '14:00', cor: 'bg-blue-500'},
    { id: 'ev6', title: 'Reunião Orientação TCC', date: '2025-06-12', type: 'reuniao', subject: 'TCC', time: '10:00', cor: '#3498db', description: 'Discutir próximos passos do capítulo 2.'},
  ],
  materiasSemestre: [ //
  {
    id: 'm1',
    nome: 'Cálculo Vetorial Avançado',
    codigo: 'MAT302',
    professor: 'Prof. Dr. Elara Vance',
    emailProfessor: 'elara.vance@universidade.edu',
    diasSemana: ['Ter', 'Qui'],
    horario: '14:00 - 15:40',
    progressoAtividades: 75,
    progressoConteudo: 60,
    faltas: 2,
    limiteFaltas: 10,
    cor: 'bg-blue-500', //
    notas: [
      { tipo: 'P1', valor: 7.5, peso: 0.3, data: '2025-04-10' },
      { tipo: 'P2', valor: 8.0, peso: 0.3, data: '2025-06-05' }, // Próxima
      { tipo: 'Trabalho 1', valor: 9.0, peso: 0.2, data: '2025-03-20' },
      { tipo: 'Trabalho 2', valor: 7.0, peso: 0.2, data: '2025-05-15' }
    ],
    presenca: 90,
    trabalhosStatus: { enviados: 2, pendentes: 1, total: 3 },
    arquivos: [
      { id: 'arq1', nome: 'Plano de Ensino.pdf', url: '/files/plano_ensino_mat302.pdf', dataUpload: '2025-02-15' },
      { id: 'arq2', nome: 'Lista Exercícios 1.docx', url: '/files/lista_exercicios1_mat302.docx', dataUpload: '2025-03-01' },
      { id: 'arq3', nome: 'Notas Aula - Vetores.pptx', url: '/files/aula_vetores.pptx', dataUpload: '2025-03-10' }
    ],
    tags: ['Exatas', 'Cálculo Avançado']
  },
    { id: 'm2', nome: 'Física Quântica I', professor: 'Prof. Max Planck', progressoAtividades: 90, progressoConteudo: 80, faltas: 1, limiteFaltas: 12, presenca: 90, cor: 'bg-red-500', codigo: 'FIS401', emailProfessor: 'max.planck@universidade.edu', diasSemana: ['Seg', 'Qua'], horario: '08:00 - 09:40', notas: [{ tipo: 'P1', valor: 8.5, peso: 0.4, data: '2025-04-12' }], trabalhosStatus: { enviados: 1, pendentes: 0, total: 1}, arquivos: [], tags: ['Física', 'Quântica'] },
    { id: 'm3', nome: 'Literatura Brasileira', professor: 'Prof. Machado de Assis', progressoAtividades: 60, progressoConteudo: 50, faltas: 3, limiteFaltas: 10, presenca: 85, cor: 'bg-green-500', codigo: 'LET202', emailProfessor: 'machado.assis@universidade.edu', diasSemana: ['Sex'], horario: '16:00 - 17:40', notas: [], trabalhosStatus: { enviados: 0, pendentes: 1, total: 1}, arquivos: [], tags: ['Humanas', 'Literatura'] },
  ],
  // Usando a estrutura mais detalhada de trabalhosPendentes e removendo a duplicata
  trabalhosPendentes: [ //
  {
    id: 't1',
    nome: 'Projeto IA - Fase 2',
    materia: 'Inteligência Artificial',
    dataPostagem: '2025-05-20',
    tipo: 'online',
    dataEntrega: '2025-06-05', // Próximo
    diasRestantes: Math.max(0, Math.ceil((new Date('2025-06-05') - new Date()) / (1000 * 60 * 60 * 24))),
    linkEntrega: 'https://moodle.universidade.edu/trabalho/ia_fase2',
    alertaDefinido: false,
    corMateria: 'bg-purple-500'
  },
  {
    id: 't2',
    nome: 'Apresentação Seminário - Cap. 3',
    materia: 'Sociologia Aplicada',
    dataPostagem: '2025-05-15',
    tipo: 'presencial',
    dataEntrega: '2025-06-12',
    diasRestantes: Math.max(0, Math.ceil((new Date('2025-06-12') - new Date()) / (1000 * 60 * 60 * 24))),
    localApresentacao: 'Sala C105',
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
    diasRestantes: Math.max(0, Math.ceil((new Date('2025-06-10') - new Date()) / (1000 * 60 * 60 * 24))),
    linkEntrega: 'https://moodle.universidade.edu/trabalho/fisica_lista3',
    alertaDefinido: false,
    corMateria: 'bg-orange-500'
    }
  ],
  servicosConectados: [ //
    { id: 'office365', nome: 'Office 365', conectado: true, logoUrl: '/path/to/office365-logo.png' },
    { id: 'notion', nome: 'Notion', conectado: false, logoUrl: '/path/to/notion-logo.png' },
    { id: 'moodle', nome: 'Moodle Institucional', conectado: true, logoUrl: '/path/to/moodle-logo.png' },
    { id: 'onenote', nome: 'One Note', conectado: true, logoUrl: '/path/to/onenote.png' },
    { id: 'github', nome: 'GitHub', conectado: false, logoUrl: '/path/to/github.png' },
    { id: 'google', nome: 'Google', conectado: true, logoUrl: '/path/to/google' },
  ],
  assinatura: { //
    plano: 'Gratuito', // ou 'Premium', 'Pro'
    dataExpiracao: null, // ou uma data
  },
  backupAtivado: true, // Adicionado, usado em SettingsPage
  aparencia: { // Adicionado, usado em SettingsPage
      modo: 'claro', // 'claro' ou 'escuro'
      formatoData: 'DD/MM/YYYY' // 'DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD'
  },
  idiomaPreferido: 'pt-BR', // Adicionado, usado em SettingsPage

  // --- Novos campos para "Vitrine de Habilidades" ---
  habilidades: [
    { id: 'sk1', nome: 'Python', nivel: 'Avançado', certificadoUrl: null, dataAquisicao: '2024-05-01' },
    { id: 'sk2', nome: 'React.js', nivel: 'Intermediário', certificadoUrl: '/docs/certificado_react_example.pdf', dataAquisicao: '2025-01-10' },
    { id: 'sk3', nome: 'Inglês', nivel: 'Fluente (C1)', certificadoUrl: '/docs/certificado_toefl_example.pdf', dataAquisicao: '2023-11-20' },
    { id: 'sk4', nome: 'Gestão de Projetos Ágeis (Scrum)', nivel: 'Intermediário', certificadoUrl: null, dataAquisicao: '2024-09-01' },
  ],

  // --- Novos campos para "Registro de Conquistas e Atividades Extracurriculares" ---
  atividadesExtracurriculares: [
    {
      id: 'ac1',
      titulo: 'Monitoria em Algoritmos e Estruturas de Dados I',
      tipo: 'Monitoria',
      descricao: 'Auxílio a estudantes do primeiro e segundo semestre com listas de exercícios, conceitos teóricos e preparação para provas. Realização de plantões de dúvidas semanais.',
      instituicaoOrganizacao: 'Departamento de Ciência da Computação - UFHubs',
      dataInicio: '2024-08-01',
      dataFim: '2024-12-15',
      remunerado: true,
      cargaHorariaSemanal: 10,
      documentosAssociados: [{ nome: 'Declaração de Monitoria Algo I', url: '/docs/declaracao_monitoria_algo1.pdf' }]
    },
    {
      id: 'ac2',
      titulo: 'Projeto de Iniciação Científica: Análise de Sentimentos em Redes Sociais',
      tipo: 'Iniciação Científica',
      descricao: 'Desenvolvimento de modelos de Machine Learning para classificar o sentimento de postagens em português sobre eventos atuais. Coleta, pré-processamento de dados e treinamento de classificadores.',
      instituicaoOrganizacao: 'Laboratório de IA - UFHubs',
      orientador: 'Prof. Dr. Ada Lovelace',
      dataInicio: '2025-03-01',
      dataFim: null, // Em andamento
      tecnologias: ['Python', 'NLTK', 'Scikit-learn', 'Pandas'],
      linkProjeto: 'https://github.com/alex.silva/ic-analise-sentimentos',
      documentosAssociados: [{ nome: 'Plano de Trabalho IC', url: '/docs/plano_trabalho_ic.pdf' }]
    },
    {
      id: 'ac3',
      titulo: 'Voluntariado - UniHub Social Coding Days',
      tipo: 'Voluntariado',
      descricao: 'Participação como mentor no evento de codificação para ONGs, ajudando equipes a desenvolver soluções web simples.',
      instituicaoOrganizacao: 'UniHub Social / Atlética de Computação',
      dataInicio: '2024-10-20',
      dataFim: '2024-10-21',
      cargaHorariaTotal: 16
    }
  ],

  // --- Novos campos para "Certificações" ---
  certificacoes: [
    {
      id: 'ce1',
      nome: 'Scrum Foundation Professional Certificate (SFPC)',
      instituicao: 'CertiProf',
      status: 'Concluída',
      dataConclusao: '2024-07-18',
      linkCertificado: '/docs/scrum_foundation_cert.pdf',
      linkCertificacao: 'https://certiprof.com/pages/scrum-foundation-professional-certificate-sfpc-spanish'
    },
    {
      id: 'ce2',
      nome: 'Google Cloud Certified - Associate Cloud Engineer',
      instituicao: 'Google Cloud',
      status: 'Em Andamento',
      dataInscricao: '2025-05-10',
      dataPrevistaConclusao: '2025-08-30',
      linkCertificacao: 'https://cloud.google.com/certification/cloud-engineer'
    }
  ],

  // --- Novos campos para "Horas Complementares" ---
  horasComplementares: [
    {
      id: 'hc1',
      nomeAtividade: 'Palestra: O Impacto da IA Generativa no Mercado de Trabalho',
      tipo: 'Palestra',
      instituicao: 'Semana Acadêmica da Computação UFHubs',
      dataRealizacao: '2025-05-22',
      horasValidadas: 2,
      comprovanteUrl: '/docs/comprovante_palestra_ia_sacomp.pdf'
    },
    {
      id: 'hc2',
      nomeAtividade: 'Workshop: Introdução ao Docker e Kubernetes',
      tipo: 'Workshop',
      instituicao: 'DevOps Community Meetup',
      dataRealizacao: '2024-11-05',
      horasValidadas: 4,
      comprovanteUrl: null // Exemplo sem comprovante direto no sistema
    },
    {
      id: 'hc3',
      nomeAtividade: 'Curso Online: Python para Data Science',
      tipo: 'Curso Online',
      instituicao: 'DataCamp',
      dataRealizacao: '2024-03-30', // Data de conclusão do curso
      horasValidadas: 30,
      comprovanteUrl: '/docs/datacamp_python_ds.pdf'
    }
  ],

  // --- Novos campos para "Presença Online e Portfólio" ---
  linksProfissionais: [
    { id: 'lp1', plataforma: 'LinkedIn', url: 'https://linkedin.com/in/alexsilvaunihub' },
    { id: 'lp2', plataforma: 'GitHub', url: 'https://github.com/alexsilva-unihub' },
    { id: 'lp3', plataforma: 'Portfólio Pessoal', url: 'https://alexsilva.dev' }
  ]
};