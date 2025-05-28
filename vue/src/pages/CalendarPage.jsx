// unihub-novo/src/pages/CalendarPage.jsx
import { useState, useMemo } from 'react';
import CalendarViewControls from '../components/calendar/CalendarViewControls';
import ListView from '../components/calendar/ListView';
import MonthView from '../components/calendar/MonthView';
import WeekView from '../components/calendar/WeekView';

const CalendarPage = ({ eventos }) => {
  const [currentView, setCurrentView] = useState('month');
  const [showClasses, setShowClasses] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date(2025, 4, 1)); // Maio é 4

  const filteredEvents = useMemo(() => {
    if (!eventos) return [];
    return eventos
      .filter(evento => showClasses || evento.type !== 'aula')
      .filter(evento =>
        evento.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (evento.subject && evento.subject.toLowerCase().includes(searchTerm.toLowerCase()))
      );
  }, [eventos, showClasses, searchTerm]);

  const changeMonth = (offset) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + offset, 1);
      return newDate;
    });
  };

  if (!eventos) {
    return (
        <div className="p-4 sm:p-6 bg-white rounded-xl shadow-lg">
            <p>Carregando eventos...</p>
        </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-white rounded-xl shadow-lg">
      <CalendarViewControls
        currentView={currentView}
        setCurrentView={setCurrentView}
        showClasses={showClasses}
        setShowClasses={setShowClasses}
        currentDate={currentDate}
        changeMonth={changeMonth}
      />
      <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar eventos por título ou matéria..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
          />
      </div>

      {currentView === 'list' && <ListView events={filteredEvents} />}
      {currentView === 'month' && <MonthView currentDate={currentDate} events={filteredEvents} />}
      {currentView === 'week' && <WeekView currentDate={currentDate} events={filteredEvents} numWeeks={1} />}
      {currentView === '2weeks' && <WeekView currentDate={currentDate} events={filteredEvents} numWeeks={2} />}
    </div>
  );
};

export default CalendarPage;