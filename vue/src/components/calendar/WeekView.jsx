// unihub-novo/src/components/calendar/WeekView.jsx
import React from 'react';
import EventItem from './EventItem';

const WeekView = ({ currentDate, events, numWeeks = 1, onEventClick }) => { // Adiciona onEventClick como prop
  if (!Array.isArray(events)) {
    return <p className="text-center text-slate-500 dark:text-slate-400 py-4">Carregando eventos ou nenhum evento para este período.</p>;
  }

  const localCurrentDate = new Date(currentDate); // Cria uma cópia para evitar mutações
  const startDate = new Date(localCurrentDate);
  startDate.setDate(localCurrentDate.getDate() - localCurrentDate.getDay()); // Vai para o domingo da semana atual
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + (numWeeks * 7) - 1);
  endDate.setHours(23, 59, 59, 999);

  const weekEvents = events
    .filter(event => {
        // Garante que a data do evento seja tratada corretamente (assumindo que 'event.date' é YYYY-MM-DD)
        const eventDateParts = event.date.split('-');
        const eventDateObj = new Date(parseInt(eventDateParts[0]), parseInt(eventDateParts[1]) - 1, parseInt(eventDateParts[2]));
        eventDateObj.setHours(0,0,0,0);
        return eventDateObj >= startDate && eventDateObj <= endDate;
    })
    .sort((a,b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        if (dateA.getTime() !== dateB.getTime()) {
          return dateA - dateB;
        }
        if (a.time && b.time) {
          return a.time.localeCompare(b.time);
        }
        return 0;
    });

  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2 font-medium">
          Eventos de {startDate.toLocaleDateString('pt-BR', {day: '2-digit', month: '2-digit'})}
           até {endDate.toLocaleDateString('pt-BR', {day: '2-digit', month: '2-digit', year: 'numeric'})}
      </p>
      {weekEvents.length > 0 ? (
          weekEvents.map(evento => (
            <EventItem
                key={evento.id}
                evento={evento}
                onClick={onEventClick} // Passa a função onEventClick para o EventItem
            />
          ))
      ) : (
          <p className="text-center text-slate-500 dark:text-slate-400 py-4">Nenhum evento encontrado para este período.</p>
      )}
    </div>
  );
};

export default WeekView;