// unihub-novo/src/App.jsx
import React, { useState, useEffect } from 'react'; // Removido createContext e useContext daqui

// Importe AppContext do novo arquivo
import { AppContext } from './components/context/AppContext';// Ajuste o caminho se o AppContext estiver em outro lugar

// Dados
import { initialUserData } from './data/initialUserData'; //

// Componentes de Layout
import Header from './components/layout/Header'; //
import BottomNavigationBar from './components/layout/BottomNavigationBar'; //

// Páginas
import HomePage from './pages/HomePage'; //
import CalendarPage from './pages/CalendarPage'; //
import SubjectsPage from './pages/SubjectsPage'; //
import AssignmentsPage from './pages/AssignmentsPage'; //
import ProfilePage from './pages/ProfilePage'; //
import SettingsPage from './pages/SettingsPage'; //

// Componentes Comuns
import ExpandingAddForm from './components/common/ExpandingAddForm'; //

// O hook useAppContext agora será importado pelos componentes que o utilizam, do novo arquivo.
// EXPORTAÇÃO DE useAppContext REMOVIDA DAQUI

export default function App() {
  const [userData, setUserData] = useState(() => {
    const savedData = localStorage.getItem('uniHubUserData');
    try {
      return savedData ? JSON.parse(savedData) : initialUserData; //
    } catch (error) {
      console.error("Erro ao parsear userData do localStorage:", error);
      return initialUserData; //
    }
  });
  const [activePage, setActivePage] = useState('home'); //
  const [isAddFormVisible, setIsAddFormVisible] = useState(false); //

  useEffect(() => {
    localStorage.setItem('uniHubUserData', JSON.stringify(userData));
  }, [userData]); //

  const handleUpdateUserData = (newUserDataPartial) => { //
    setUserData(prevUserData => {
      const updatedData = typeof newUserDataPartial === 'function'
        ? newUserDataPartial(prevUserData)
        : {
            ...prevUserData,
            ...newUserDataPartial,
            aparencia: {
              ...(prevUserData.aparencia || {}),
              ...(newUserDataPartial.aparencia || {}),
            },
          };
      return updatedData;
    });
  };

  const handleUpdateMateria = (updatedMateria) => { //
    setUserData(prevUserData => ({
      ...prevUserData,
      materiasSemestre: prevUserData.materiasSemestre.map(m =>
        m.id === updatedMateria.id ? updatedMateria : m
      )
    }));
  };

   const handleUpdateTrabalho = (updatedTrabalho) => { //
    setUserData(prevUserData => ({
      ...prevUserData,
      trabalhosPendentes: prevUserData.trabalhosPendentes.map(t =>
        t.id === updatedTrabalho.id ? updatedTrabalho : t
      )
    }));
  };

  useEffect(() => {
    const root = window.document.documentElement;
    const currentMode = userData?.aparencia?.modo || 'claro'; // Adicionado optional chaining

    if (currentMode === 'escuro') {
      root.classList.add('dark');
      localStorage.setItem('themeMode', 'escuro'); //
    } else {
      root.classList.remove('dark');
      localStorage.setItem('themeMode', 'claro'); //
    }
  }, [userData?.aparencia?.modo]); // Adicionado optional chaining

  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode');
    const initialUserMode = userData?.aparencia?.modo; // Adicionado optional chaining

    if (savedMode && savedMode !== initialUserMode) { //
        handleUpdateUserData(prev => ({
            ...prev,
            aparencia: { ...(prev.aparencia || {}), modo: savedMode }
        }));
    } else if (!savedMode && !initialUserMode) { // Se nenhum modo salvo e nenhum modo no userData //
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) { //
             handleUpdateUserData(prev => ({
                ...prev,
                aparencia: { ...(prev.aparencia || {}), modo: 'escuro' }
            }));
        }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderActivePage = () => { //
    switch (activePage) {
      case 'home':
        return <HomePage />; //
      case 'calendar':
        return <CalendarPage />; //
      case 'subjects':
        return <SubjectsPage materias={userData?.materiasSemestre} onUpdateMateria={handleUpdateMateria} />; // Adicionado optional chaining
      case 'assignments':
        return <AssignmentsPage trabalhos={userData?.trabalhosPendentes} onUpdateTrabalho={handleUpdateTrabalho} />; // Adicionado optional chaining
      case 'profile':
        return <ProfilePage />; // ProfilePage usa useAppContext internamente
      case 'settings':
        return <SettingsPage userData={userData} onUpdateUserData={handleUpdateUserData} />; // Mantém props por enquanto
      case 'statistics':
        return <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg"><h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Estatísticas (Em Breve)</h1></div>; //
      case 'plans':
         return <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg"><h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Planos e Assinatura (Em Breve)</h1></div>; //
      default:
        console.warn(`Página desconhecida: ${activePage}. Redirecionando para Home.`);
        setActivePage('home');
        return <HomePage />; //
    }
  };

  const toggleAddForm = () => { //
    setIsAddFormVisible(!isAddFormVisible);
  };

  return (
    <AppContext.Provider value={{ userData, setUserData: handleUpdateUserData, activePage, setActivePage }}>
      <div className={`min-h-screen bg-slate-100 dark:bg-slate-900 font-sans text-slate-800 dark:text-slate-200 flex flex-col relative`}>
        <Header />
        <main
          className={`
            max-w-7xl mx-auto w-full
            p-3 sm:p-4 md:p-6 lg:p-8
            flex-grow
            pb-32 
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
    </AppContext.Provider>
  );
}