// unihub-novo/src/App.jsx
import { useState } from 'react';
import { initialUserData } from './data/initialUserData';
import Header from './components/layout/Header';
import BottomNavigationBar from './components/layout/BottomNavigationBar';
import HomePage from './pages/HomePage';
import CalendarPage from './pages/CalendarPage';
import SubjectsPage from './pages/SubjectsPage';
import AssignmentsPage from './pages/AssignmentsPage';
import AddQuickEntryModal from './components/common/AddQuickEntryModal';

export default function App() {
  const [userData, setUserData] = useState(initialUserData);
  const [activePage, setActivePage] = useState('home');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 flex flex-col">
      <Header userData={userData} />
      <main className="max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 flex-grow pb-24">
        {renderActivePage()}
      </main>
      <BottomNavigationBar
        activePage={activePage}
        setActivePage={setActivePage}
        onAddClick={() => setIsAddModalOpen(true)}
      />
      <AddQuickEntryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}