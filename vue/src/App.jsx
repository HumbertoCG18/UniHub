// unihub-novo/src/App.jsx
import { useState, useEffect } from 'react';

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
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';

// Componentes Comuns (Formulário Expansível)
import ExpandingAddForm from './components/common/ExpandingAddForm';

export default function App() {
  const [userData, setUserData] = useState(initialUserData);
  const [activePage, setActivePage] = useState('home');
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);

  const handleUpdateUserData = (newUserDataPartial) => {
    setUserData(prevUserData => {
      const updatedData = {
        ...prevUserData,
        ...newUserDataPartial,
        aparencia: {
          ...prevUserData.aparencia,
          ...(newUserDataPartial.aparencia || {}),
        },
      };
      console.log("Dados do usuário atualizados no App:", updatedData);
      return updatedData;
    });
  };

  useEffect(() => {
    const root = window.document.documentElement;
    const currentMode = userData.aparencia?.modo || 'claro';

    if (currentMode === 'escuro') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [userData.aparencia?.modo]);

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
      case 'profile':
        return <ProfilePage userData={userData} onUpdateUserData={handleUpdateUserData} />;
      case 'settings':
        return <SettingsPage userData={userData} onUpdateUserData={handleUpdateUserData} />;
      case 'statistics':
        // Placeholder - Crie StatisticsPage.jsx em src/pages/ quando for desenvolvê-la
        return <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg"><h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Estatísticas (Em Breve)</h1></div>;
      case 'plans':
         // Placeholder - Crie PlansPage.jsx em src/pages/ quando for desenvolvê-la
         return <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg"><h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Planos e Assinatura (Em Breve)</h1></div>;
      default:
        // Fallback para a HomePage se activePage não corresponder a nenhum caso conhecido
        console.warn(`Página desconhecida: ${activePage}. Redirecionando para Home.`);
        return <HomePage userData={userData} />;
    }
  };

  const toggleAddForm = () => {
    setIsAddFormVisible(!isAddFormVisible);
  };

  return (
    <div className={`min-h-screen bg-slate-100 dark:bg-slate-900 font-sans text-slate-800 dark:text-slate-200 flex flex-col relative`}>
      <Header 
        userData={userData} 
        setActivePage={setActivePage} // Permite que o Header mude a página ativa
      />
      
      <main className={`max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 flex-grow pb-24 transition-opacity duration-300 ${isAddFormVisible ? 'opacity-50 blur-sm pointer-events-none dark:opacity-30' : 'opacity-100'}`}>
        {renderActivePage()}
      </main>

      <BottomNavigationBar
        activePage={activePage}
        setActivePage={setActivePage}
        onAddClick={toggleAddForm}
        isAddFormOpen={isAddFormVisible} 
      />
      
      <ExpandingAddForm
        isVisible={isAddFormVisible}
        onClose={toggleAddForm}
      />
    </div>
  );
}