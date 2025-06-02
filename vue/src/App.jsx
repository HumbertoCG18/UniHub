import React, { useState, useEffect } from 'react';

// App Context
import { AppContext } from './components/context/AppContext'; //

// Dados
import { initialUserData } from './data/initialUserData'; //

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

// Componentes Comuns
import ExpandingAddForm from './components/common/ExpandingAddForm';

export default function App() {
  const [userData, setUserData] = useState(() => {
    if (import.meta.env.DEV) {
      console.log("MODO DESENVOLVIMENTO: Carregando userData diretamente de initialUserData.js");
      return initialUserData;
    } else {
      // Em produção, tente carregar do localStorage primeiro para persistir os dados do usuário.
      const savedData = localStorage.getItem('uniHubUserData');
      if (savedData) {
        try {
          console.log("MODO PRODUÇÃO: Carregando userData do localStorage.");
          return JSON.parse(savedData);
        } catch (error) {
          console.error("MODO PRODUÇÃO: Erro ao parsear userData do localStorage. Usando initialUserData.", error);
          return initialUserData; // Fallback se o localStorage estiver corrompido
        }
      } else {
        console.log("MODO PRODUÇÃO: Nenhum dado no localStorage. Usando initialUserData.");
        return initialUserData; // Fallback se não houver nada no localStorage
      }
    }
  });

  const [activePage, setActivePage] = useState('home');
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);

  // Este useEffect garante que o localStorage seja atualizado sempre que o estado userData mudar.
  // Em desenvolvimento, isso significa que o initialUserData (usado para definir o estado)
  // será salvo no localStorage na primeira renderização e em qualquer mudança subsequente.
  useEffect(() => {
    localStorage.setItem('uniHubUserData', JSON.stringify(userData));
    console.log("userData foi atualizado e salvo no localStorage:", userData); // Descomente para debug
  }, [userData]);

  const handleUpdateUserData = (newUserDataPartial) => {
    setUserData(prevUserData => {
      const updatedData = typeof newUserDataPartial === 'function'
        ? newUserDataPartial(prevUserData)
        : {
            ...prevUserData,
            ...newUserDataPartial,
            aparencia: {
              ...(prevUserData?.aparencia || {}), // Adicionado optional chaining
              ...(newUserDataPartial?.aparencia || {}), // Adicionado optional chaining
            },
          };
      return updatedData;
    });
  };

  const handleUpdateMateria = (updatedMateria) => {
    setUserData(prevUserData => ({
      ...prevUserData,
      materiasSemestre: (prevUserData?.materiasSemestre || []).map(m => // Adicionado optional chaining e fallback para array vazio
        m.id === updatedMateria.id ? updatedMateria : m
      )
    }));
  };

   const handleUpdateTrabalho = (updatedTrabalho) => {
    setUserData(prevUserData => ({
      ...prevUserData,
      trabalhosPendentes: (prevUserData?.trabalhosPendentes || []).map(t => // Adicionado optional chaining e fallback para array vazio
        t.id === updatedTrabalho.id ? updatedTrabalho : t
      )
    }));
  };

  useEffect(() => {
    const root = window.document.documentElement;
    const currentMode = userData?.aparencia?.modo || 'claro';

    if (currentMode === 'escuro') {
      root.classList.add('dark');
      localStorage.setItem('themeMode', 'escuro');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('themeMode', 'claro');
    }
  }, [userData?.aparencia?.modo]);

  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode');
    const initialUserMode = userData?.aparencia?.modo;

    if (savedMode && savedMode !== initialUserMode) {
        handleUpdateUserData(prev => ({
            ...prev,
            aparencia: { ...(prev?.aparencia || {}), modo: savedMode }
        }));
    } else if (!savedMode && !initialUserMode) {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
             handleUpdateUserData(prev => ({
                ...prev,
                aparencia: { ...(prev?.aparencia || {}), modo: 'escuro' }
            }));
        }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // A dependência vazia está correta aqui para rodar apenas na montagem e configurar o tema inicial.

  const renderActivePage = () => {
    // Adicionado optional chaining para userData para evitar erros se userData for null/undefined temporariamente
    const materias = userData?.materiasSemestre || [];
    const trabalhos = userData?.trabalhosPendentes || [];

    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'calendar':
        return <CalendarPage />;
      case 'subjects':
        return <SubjectsPage materias={materias} onUpdateMateria={handleUpdateMateria} />;
      case 'assignments':
        return <AssignmentsPage trabalhos={trabalhos} onUpdateTrabalho={handleUpdateTrabalho} />;
      case 'profile':
        return <ProfilePage />;
      case 'settings':
        return <SettingsPage userData={userData} onUpdateUserData={handleUpdateUserData} />;
      case 'statistics':
        return <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg"><h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Estatísticas (Em Breve)</h1></div>;
      case 'plans':
         return <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg"><h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Planos e Assinatura (Em Breve)</h1></div>;
      default:
        console.warn(`Página desconhecida: ${activePage}. Redirecionando para Home.`);
        setActivePage('home');
        return <HomePage />;
    }
  };

  const toggleAddForm = () => {
    setIsAddFormVisible(!isAddFormVisible);
  };
  
  // Adiciona um console.log para verificar o valor sendo passado ao Provider
  const contextValue = { userData, setUserData: handleUpdateUserData, activePage, setActivePage };
  // console.log("APP.JSX - Valor passado para AppContext.Provider:", JSON.stringify(contextValue.userData, null, 2)); // Descomente para debug

  return (
    <AppContext.Provider value={contextValue}>
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