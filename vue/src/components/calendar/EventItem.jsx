// unihub-novo/src/components/calendar/EventItem.jsx
import React from 'react';
import { Tag, Clock, Bookmark } from 'lucide-react';

const EventItem = ({ evento, onClick }) => { // onClick é esperado como uma função
  if (!evento) return null;

  const { cor, title, type, date, time, subject } = evento;

  let borderClasses = 'border-l-4';
  let itemStyle = {};
  let titleColorClass = 'text-slate-800 dark:text-slate-100';
  let typeBgColorClass = 'bg-slate-200 dark:bg-slate-600';
  let typeTextColorClass = 'text-slate-600 dark:text-slate-300';

  if (cor) {
    if (cor.startsWith('bg-')) {
      const colorName = cor.split('-')[1];
      const colorShade = cor.split('-')[2] || '500'; // Pega a tonalidade, padrão 500
      borderClasses += ` ${cor.replace('bg-', 'border-')}`;
      typeBgColorClass = `bg-${colorName}-100 dark:bg-${colorName}-800/30`;
      typeTextColorClass = `text-${colorName}-${Math.max(parseInt(colorShade), 500)} dark:text-${colorName}-200`;
    } else if (cor.startsWith('#')) {
      itemStyle.borderLeftColor = cor;
    } else {
       borderClasses += ` ${cor}`; // Assume que é uma classe de borda direta
    }
  } else {
    borderClasses += ' border-slate-400 dark:border-slate-500';
  }

  // Formata a data do evento, assumindo que 'date' é 'YYYY-MM-DD'
  const dateParts = evento.date.split('-');
  const formattedEventDate = new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]));


  const handleItemClick = () => {
    if (onClick && typeof onClick === 'function') { // Verifica se onClick é uma função
      onClick(evento);
    } else {
      console.warn("EventItem: onClick prop is not a function or not provided.", onClick);
    }
  };

  return (
    <button
      onClick={handleItemClick} // Usa o wrapper para segurança
      className={`
        w-full text-left p-3 rounded-md shadow-sm hover:shadow-lg transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
        bg-white dark:bg-slate-800
        ${borderClasses}
      `}
      style={itemStyle}
      aria-label={`Detalhes para ${title}`}
    >
      <div className="flex justify-between items-start mb-1">
        <h3 className={`font-semibold ${titleColorClass} text-base leading-tight`}>
          {title}
        </h3>
        {type && (
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeBgColorClass} ${typeTextColorClass}`}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        )}
      </div>
      <div className="text-xs text-slate-500 dark:text-slate-400 space-y-0.5">
        <p className="flex items-center">
          <Clock size={12} className="mr-1.5 text-slate-400 dark:text-slate-500" />
          {formattedEventDate.toLocaleDateString('pt-BR', { timeZone: 'UTC' })} {/* Adicionado timeZone: 'UTC' para consistência */}
          {time ? ` - ${time}` : ''}
        </p>
        {subject && (
          <p className="flex items-center">
            <Bookmark size={12} className="mr-1.5 text-slate-400 dark:text-slate-500" />
            {subject}
          </p>
        )}
      </div>
    </button>
  );
};

export default EventItem;