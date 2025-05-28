// unihub-novo/src/App.jsx
import { useState } from 'react';

// Dados
import { initialUserData } from './data/initialUserData';

// Componentes de Layout
import Header from './components/layout/Header';
import BottomNavigationBar from './components/layout/BottomNavigationBar';

// Páginas
import HomePage from './pages/HomePage';
import CalendarPage from './pages/CalendarPage';
import SubjectsPage from './pages/SubjectsPage';
import AssignmentsPage from './pages/AssignmentsPage';

// Componentes Comuns (Modais Globais)
import AddQuickEntryModal from './components/common/AddQuickEntryModal';

export default function App() {
  // Estado para os dados do usuário (inicializado com dados mockados)
  const [userData, setUserData] = useState(initialUserData);

  // Estado para controlar qual página está ativa
  const [activePage, setActivePage] = useState('home');

  // Estado para controlar a visibilidade do modal de adicionar entrada rápida
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Função para renderizar a página correta com base no estado 'activePage'
  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        // Passa os dados do usuário para a HomePage
        return <HomePage userData={userData} />;
      case 'calendar':
        // Passa os eventos do calendário para a CalendarPage
        return <CalendarPage eventos={userData.eventosCalendario} />;
      case 'subjects':
        // Passa as matérias para a SubjectsPage
        return <SubjectsPage materias={userData.materiasSemestre} />;
      case 'assignments':
        // Passa os trabalhos pendentes para a AssignmentsPage
        return <AssignmentsPage trabalhos={userData.trabalhosPendentes} />;
      default:
        // Como fallback, renderiza a HomePage. Você pode criar uma NotFoundPage se preferir.
        return <HomePage userData={userData} />;
    }
  };

  return (
    // Contêiner principal do aplicativo com classes Tailwind para estilização base
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 flex flex-col">
      {/* Renderiza o Header, passando userData para exibir informações do usuário (ex: foto) */}
      <Header userData={userData} />

      {/* Área principal onde o conteúdo da página ativa será renderizado */}
      <main className="max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 flex-grow pb-24"> {/* pb-24 para dar espaço para a BottomNavigationBar */}
        {renderActivePage()}
      </main>

      {/* Renderiza a Barra de Navegação Inferior */}
      <BottomNavigationBar
        activePage={activePage}
        setActivePage={setActivePage} // Passa a função para atualizar a página ativa
        onAddClick={() => setIsAddModalOpen(true)} // Passa a função para abrir o modal
      />

      {/* Renderiza o Modal para Adicionar Entradas Rápidas */}
      <AddQuickEntryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)} // Passa a função para fechar o modal
      />
    </div>
  );
}
