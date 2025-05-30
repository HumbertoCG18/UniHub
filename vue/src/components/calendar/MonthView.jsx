// unihub-novo/src/components/calendar/MonthView.jsx
import React from 'react';
import { getDaysInMonth, getFirstDayOfMonth, getDayNames } from '../../utils/dateUtils';

// Modificado para aceitar currentDate como prop principal para data
const MonthView = ({ currentDate, events, onDayClick }) => {
  // Adiciona uma verificação para currentDate
  if (!currentDate || typeof currentDate.getFullYear !== 'function') {
    // Se currentDate não for um objeto Date válido, mostra uma mensagem ou retorna null
    // Isso deve corresponder à linha 9 se for a primeira operação após a checagem de 'events'
    return <p className="text-center text-slate-500 dark:text-slate-400 py-4">Data atual inválida ou não fornecida.</p>;
  }

  if (!Array.isArray(events)) {
    return <p className="text-center text-slate-500 dark:text-slate-400 py-4">Carregando eventos...</p>;
  }

  // Extrai year e month de currentDate
  const year = currentDate.getFullYear(); // Esta linha (ou similar) era provavelmente a linha 9 no seu erro
  const month = currentDate.getMonth();   // Os meses são 0-indexados em JavaScript

  const numDays = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dayNames = getDayNames('pt-BR', 'short');
  const maxEventsPerCell = window.innerWidth < 640 ? 2 : 3;

  const weeks = [];
  let days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="border border-slate-200 dark:border-slate-700 h-24 sm:h-28 md:h-32 bg-slate-50 dark:bg-slate-800/30"></div>);
  }

  for (let day = 1; day <= numDays; day++) {
    const date = new Date(year, month, day);
    const isToday = date.toDateString() === today.toDateString();
    const dayEvents = events.filter(e => {
      const eventDate = new Date(e.date);
      const eventDateLocal = new Date(eventDate.getUTCFullYear(), eventDate.getUTCMonth(), eventDate.getUTCDate());
      return eventDateLocal.toDateString() === date.toDateString();
    });

    days.push(
      <div
        key={day}
        className={`
          border border-slate-200 dark:border-slate-700 
          h-24 sm:h-28 md:h-32 p-1.5 overflow-y-auto custom-scrollbar 
          ${isToday ? 'bg-blue-50 dark:bg-blue-900/30' : 'bg-white dark:bg-slate-800'} 
          cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 
          transition-colors duration-150
        `}
        onClick={() => onDayClick && onDayClick(date)}
      >
        <div className={`font-semibold text-sm mb-1 ${isToday ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-200'}`}>
          {day}
        </div>
        <div className="mt-1 space-y-1">
          {dayEvents.slice(0, maxEventsPerCell).map(e => (
            <div
              key={e.id}
              className={`
                text-[10px] sm:text-xs p-1 rounded 
                ${e.cor ? (e.cor.startsWith('#') ? '' : e.cor) : 'bg-slate-200 dark:bg-slate-600'} 
                ${e.cor && (e.cor.startsWith('#') || e.cor.includes('bg-')) ? 'text-white' : 'text-slate-700 dark:text-slate-200'} 
                truncate
              `}
              style={e.cor && e.cor.startsWith('#') ? { backgroundColor: e.cor } : {}}
              title={`${e.title}${e.subject ? ` (${e.subject})` : ''}`}
            >
              {e.title}
            </div>
          ))}
          {dayEvents.length > maxEventsPerCell && (
             <div className="text-[10px] sm:text-xs text-blue-500 dark:text-blue-400 font-medium">+ {dayEvents.length - maxEventsPerCell} mais</div>
          )}
        </div>
      </div>
    );

    if ((firstDay + day) % 7 === 0 || day === numDays) {
      while (days.length < 7 && day === numDays) {
        days.push(<div key={`empty-end-${days.length}`} className="border border-slate-200 dark:border-slate-700 h-24 sm:h-28 md:h-32 bg-slate-50 dark:bg-slate-800/30"></div>);
      }
      weeks.push(<div key={`week-${weeks.length}`} className="grid grid-cols-7">{days}</div>);
      days = [];
    }
  }

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden shadow-md">
      <div className="grid grid-cols-7 text-center font-medium text-xs sm:text-sm text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700/50 p-2">
        {dayNames.map(name => <div key={name}>{name}</div>)}
      </div>
      <div className="bg-white dark:bg-transparent">
        {weeks}
      </div>
    </div>
  );
};

export default MonthView;