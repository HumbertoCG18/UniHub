// unihub-novo/src/pages/CalendarPage.jsx
import React, { useState, useMemo, useEffect } from 'react';
import CalendarViewControls from '../components/calendar/CalendarViewControls';
import ListView from '../components/calendar/ListView';
import MonthView from '../components/calendar/MonthView';
import WeekView from '../components/calendar/WeekView';
import { useAppContext } from '../App'; // Ajuste o caminho se o AppContext estiver em outro lugar
import AddQuickEntryModal from '../components/modals/AddQuickEntryModal';
import EventDetailModal from '../components/modals/EventDetailModal';

const CalendarPage = () => {
  const { userData, setUserData } = useAppContext();

  const [currentView, setCurrentView] = useState('month');
  const [showClasses, setShowClasses] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date(2025, 4, 1)); // Maio é 4

  // Estado para o modal de adicionar evento rápido
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [selectedEventDate, setSelectedEventDate] = useState(null); // Store as YYYY-MM-DD string

  // Estado para o modal de detalhes do evento
  const [isEventDetailModalOpen, setIsEventDetailModalOpen] = useState(false);
  const [selectedEventForDetail, setSelectedEventForDetail] = useState(null);

  // ---- Definições de Funções Manipuladoras ----
  // (Colocadas antes de qualquer lógica que possa causar um retorno antecipado e antes do return principal)

  const changeMonth = (offset) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + offset, 1);
      return newDate;
    });
  };

  const handleDayClickInMonthView = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    setSelectedEventDate(`${year}-${month}-${day}`);
    setIsAddEventModalOpen(true);
  };

  const closeAddEventModal = () => {
    setIsAddEventModalOpen(false);
    setSelectedEventDate(null);
  };

  const handleAddEventSubmit = (type, data) => {
    const newEventDate = data.date || selectedEventDate;
    if (!newEventDate) {
      console.error("Date is missing for the new event");
      alert("A data do evento é obrigatória.");
      return;
    }
    let eventColor = '#FEC868'; // Default for 'evento'
    if (type === 'prova') eventColor = '#FF6B6B';
    else if (type === 'tarefa') eventColor = '#4ECDC4';
    else if (type === 'aula') eventColor = '#45B7D1';

    const newEvent = {
      id: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: type,
      title: data.title,
      subject: data.subject || '',
      date: newEventDate,
      time: data.time || '',
      cor: eventColor,
      description: data.description || '',
      completed: false,
    };
    setUserData(prev => ({ ...prev, eventosCalendario: [...(prev.eventosCalendario || []), newEvent] }));
    closeAddEventModal();
  };

  const handleOpenEventDetailModal = (event) => {
    setSelectedEventForDetail(event);
    setIsEventDetailModalOpen(true);
  };

  const handleCloseEventDetailModal = () => {
    setIsEventDetailModalOpen(false);
    setSelectedEventForDetail(null);
  };

  const handleEditEvent = (eventToEdit) => {
    handleCloseEventDetailModal();
    console.log("Editar evento:", eventToEdit);
    alert("Funcionalidade de editar evento a ser implementada. Veja o console.");
    // Lógica futura:
    // 1. Preencher o AddQuickEntryModal com os dados de eventToEdit
    // 2. Modificar handleAddEventSubmit para lidar com atualização em vez de criação se um evento está sendo editado
    // setSelectedEventDate(eventToEdit.date);
    // setInitialDataForAddModal(eventToEdit); // Você precisaria de um novo estado para isso
    // setIsAddEventModalOpen(true);
  };

  const handleDeleteEvent = (eventId) => {
    setUserData(prev => ({
        ...prev,
        eventosCalendario: prev.eventosCalendario.filter(event => event.id !== eventId)
    }));
    handleCloseEventDetailModal();
  };

  // ---- Lógica de Carregamento e Dados ----

  if (!userData || !userData.nome) {
      return (
          <div className="flex justify-center items-center h-screen">
              <p className="text-slate-600 dark:text-slate-300 text-lg">Carregando dados do usuário...</p>
          </div>
      );
  }

  const allEvents = useMemo(() => userData.eventosCalendario || [], [userData.eventosCalendario]);

  // Esta verificação pode ser opcional se allEvents sempre for um array devido ao useMemo acima.
  if (!Array.isArray(allEvents)) {
      return (
          <div className="p-4 sm:p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
              <p className="text-center text-slate-500 dark:text-slate-400 py-4">Carregando eventos do calendário...</p>
          </div>
      );
  }

  const filteredEvents = useMemo(() => {
    return allEvents
      .filter(evento => showClasses || evento.type !== 'aula')
      .filter(evento =>
        evento.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (evento.subject && evento.subject.toLowerCase().includes(searchTerm.toLowerCase()))
      );
  }, [allEvents, showClasses, searchTerm]);

  // ---- Renderização ----
  return (
    <div className="p-4 sm:p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
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
            className="w-full p-2.5 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white dark:bg-slate-700 dark:text-slate-200"
          />
      </div>

      {currentView === 'list' && (
        <ListView
            events={filteredEvents}
            onEventClick={handleOpenEventDetailModal}
        />
      )}
      {currentView === 'month' && (
        <MonthView
          currentDate={currentDate}
          events={filteredEvents}
          onDayClick={handleDayClickInMonthView}
          // Se quiser que os eventos dentro das células do MonthView sejam clicáveis:
          // onEventClick={handleOpenEventDetailModal} // e modificar MonthView para usar isso
        />
      )}
      {currentView === 'week' && (
        <WeekView
            currentDate={currentDate}
            events={filteredEvents}
            numWeeks={1}
            onEventClick={handleOpenEventDetailModal}
        />
      )}
      {currentView === '2weeks' && (
        <WeekView
            currentDate={currentDate}
            events={filteredEvents}
            numWeeks={2}
            onEventClick={handleOpenEventDetailModal}
        />
      )}

      <AddQuickEntryModal
        isOpen={isAddEventModalOpen}
        onClose={closeAddEventModal}
        onAddEntry={handleAddEventSubmit}
        initialDate={selectedEventDate}
      />

      <EventDetailModal
        isOpen={isEventDetailModalOpen}
        onClose={handleCloseEventDetailModal}
        event={selectedEventForDetail}
        onEdit={handleEditEvent}
        onDelete={handleDeleteEvent}
      />
    </div>
  );
};
export default CalendarPage;