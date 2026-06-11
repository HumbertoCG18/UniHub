# 🎓 UniHub - O Seu Ecossistema Académico Centralizado

![React](https://img.shields.io/badge/React-19.1-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-6.3-purple?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC?style=for-the-badge&logo=tailwind-css)

O **UniHub** é o "Super App" definitivo concebido para simplificar e gamificar a vida universitária. A nossa visão é centralizar todas as ferramentas, métricas e informações académicas (Moodle, OpenSARC, calendários, gestão de trabalhos e notas) num único *dashboard* altamente intuitivo, rápido e personalizável.

## 🚀 Visão Geral e Funcionalidades Atuais

Atualmente, o UniHub funciona como uma robusta *Single Page Application* (SPA), operando com dados "mockados" para demonstrar todo o potencial da interface de utilizador. 

As funcionalidades principais incluem:
- **Dashboard (Home):** Visão geral do progresso do curso, próxima aula, avisos urgentes e resumo de tarefas.
- **Gestão de Matérias:** Controlo de frequência, planeamento de notas, e gestão de ficheiros da disciplina.
- **Gestão de Trabalhos:** Acompanhamento de prazos, tipos de entrega e contagem decrescente para avaliações.
- **Calendário Inteligente:** Visualização unificada de aulas, provas, trabalhos e eventos extracurriculares.
- **Perfil & Gamificação:** Vitrine de habilidades, registo de atividades extracurriculares, certificações e horas complementares, ajudando na preparação para o mercado de trabalho.
- **Configurações e Personalização:** Suporte total a *Dark/Light Mode* sincronizado com o sistema e gestão de simulações de serviços conectados (Office 365, Notion, Moodle).

## 🛠️ Pilha Tecnológica (Tech Stack)

A arquitetura do UniHub foi desenhada para garantir a máxima performance, manutenibilidade e uma excelente experiência de desenvolvimento:

- **Core:** [React 19.1](https://react.dev/)
- **Build Tool:** [Vite 6.3](https://vitejs.dev/) (Tempos de compilação ultra-rápidos e HMR)
- **Estilização:** [Tailwind CSS 4.1](https://tailwindcss.com/) (Abordagem *Utility-first* via PostCSS)
- **Gestão de Estado:** React Context API (`AppContext.jsx`) + Sincronização inteligente com `localStorage`.
- **Qualidade de Código:** ESLint 9 configurado para garantir padrões de codificação rígidos.

## 🏗️ Estratégia de Desenvolvimento: Mock-First & UI-Ready

O UniHub adota uma abordagem de desenvolvimento orientada à interface. 
Neste momento, a aplicação consome uma base de dados simulada (`src/data/initialUserData.js`). Esta estrutura foi cuidadosamente desenhada para espelhar as futuras respostas das APIs reais. 

**Próximos passos na Arquitetura (Camada de Serviços):**
No futuro, implementaremos a abstração de dados em `src/services/`. As chamadas aos *mocks* serão substituídas por chamadas assíncronas a plataformas externas (Moodle, integrações universitárias, etc.), garantindo que os componentes visuais não precisem de ser reescritos.

## 💻 Como Começar (Ambiente de Desenvolvimento)

Siga os passos abaixo para correr o projeto localmente na sua máquina:

### 1. Pré-requisitos
Certifique-se de que tem o [Node.js](https://nodejs.org/) (versão 18+ recomendada) e o `npm` instalados.

### 2. Instalação

Clone o repositório e navegue até à pasta do projeto:
```bash
git clone [https://github.com/humbertocg18/unihub.git](https://github.com/humbertocg18/unihub.git)
cd unihub/vue
