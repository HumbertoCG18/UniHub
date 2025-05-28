// unihub-novo/src/App.jsx
import { useState } from 'react';
import { initialUserData } from './data/initialUserData';
import Header from './components/layout/Header';
import BottomNavigationBar from './components/layout/BottomNavigationBar';
import HomePage from './pages/HomePage';
import CalendarPage from './pages/CalendarPage';
import SubjectsPage from './pages/SubjectsPage';
import AssignmentsPage from './pages/AssignmentsPage';
// Remova a importação do AddQuickEntryModal, pois será substituído
// import AddQuickEntryModal from './components/common/AddQuickEntryModal';
import ExpandingAddForm from './components/common/ExpandingAddForm'; // Novo componente

export default function App() {
  const [userData, setUserData] = useState(initialUserData);
  const [activePage, setActivePage] = useState('home');
  const [isAddFormVisible, setIsAddFormVisible] = useState(false); // Renomeado e controla o novo formulário

  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage userData={userData} />;
      case 'calendar':
        return <CalendarPage eventos={userData.eventosCalendario} />;
      case 'subjects':
        return <SubjectsPage materias={userData.materiasSemestre} />;
      case 'assignments':
        return <AssignmentsPage trabalhos={userData.trabalhosPendentes} />;
      default:
        return <HomePage userData={userData} />;
    }
  };

  const toggleAddForm = () => {
    setIsAddFormVisible(!isAddFormVisible);
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 flex flex-col relative"> {/* Adicionado relative para posicionamento do formulário */}
      <Header userData={userData} />
      <main className={`max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 flex-grow pb-24 transition-opacity duration-300 ${isAddFormVisible ? 'opacity-50 blur-sm pointer-events-none' : 'opacity-100'}`}>
        {renderActivePage()}
      </main>
      <BottomNavigationBar
        activePage={activePage}
        setActivePage={setActivePage}
        onAddClick={toggleAddForm} // Passa a nova função de toggle
        isAddFormOpen={isAddFormVisible} // Passa o estado para o botão saber sua aparência
      />
      <ExpandingAddForm
        isVisible={isAddFormVisible}
        onClose={toggleAddForm} // Passa a função para fechar o formulário
      />
    </div>
  );
}