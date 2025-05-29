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
      // console.log("Dados do usuário atualizados no App:", updatedData);
      return updatedData;
    });
  };

  const handleUpdateMateria = (updatedMateria) => {
    setUserData(prevUserData => ({
      ...prevUserData,
      materiasSemestre: prevUserData.materiasSemestre.map(m =>
        m.id === updatedMateria.id ? updatedMateria : m
      )
    }));
    // console.log("Matéria atualizada no App:", updatedMateria);
  };

   const handleUpdateTrabalho = (updatedTrabalho) => { // Adicionada da sua solicitação anterior
    setUserData(prevUserData => ({
      ...prevUserData,
      trabalhosPendentes: prevUserData.trabalhosPendentes.map(t =>
        t.id === updatedTrabalho.id ? updatedTrabalho : t
      )
    }));
    // console.log("Trabalho atualizado no App:", updatedTrabalho);
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
        if (!Array.isArray(userData.eventosCalendario)) {
          console.error("App.jsx: userData.eventosCalendario não é um array!", userData.eventosCalendario);
          return <div className="p-6 text-center text-red-500">Erro ao carregar dados do calendário.</div>;
        }
        return <CalendarPage eventos={userData.eventosCalendario} />;
      case 'subjects':
        return <SubjectsPage materias={userData.materiasSemestre} onUpdateMateria={handleUpdateMateria} />;
      case 'assignments':
        return <AssignmentsPage trabalhos={userData.trabalhosPendentes} onUpdateTrabalho={handleUpdateTrabalho} />;
      case 'profile':
        return <ProfilePage userData={userData} onUpdateUserData={handleUpdateUserData} setActivePage={setActivePage} />;
      case 'settings':
        return <SettingsPage userData={userData} onUpdateUserData={handleUpdateUserData} />;
      case 'statistics':
        return <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg"><h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Estatísticas (Em Breve)</h1></div>;
      case 'plans':
         return <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg"><h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Planos e Assinatura (Em Breve)</h1></div>;
      default:
        console.warn(`Página desconhecida: ${activePage}. Redirecionando para Home.`);
        setActivePage('home');
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
        setActivePage={setActivePage}
      />
      <main 
        className={`
          max-w-7xl mx-auto w-full 
          p-3 sm:p-4 md:p-6 lg:p-8
          flex-grow 
          pb-32 /* ALTERADO AQUI: Aumentado o padding-bottom para dar mais espaço */
          transition-opacity duration-300 
          ${isAddFormVisible ? 'opacity-50 blur-sm pointer-events-none dark:opacity-30' : 'opacity-100'}
        `}
      >
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