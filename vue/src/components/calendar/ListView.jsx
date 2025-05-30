// unihub-novo/src/components/calendar/ListView.jsx
import React from 'react';
import EventItem from './EventItem';

const ListView = ({ events, onEventClick }) => { // Adiciona onEventClick como prop
  // VERIFICAÇÃO ADICIONADA:
  if (!Array.isArray(events)) {
    return <p className="text-center text-slate-500 dark:text-slate-400 py-4">Carregando eventos ou nenhum evento para exibir.</p>;
  }

  // Ordena os eventos por data e depois por hora (se houver)
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (dateA.getTime() !== dateB.getTime()) {
      return dateA - dateB;
    }
    // Se as datas forem iguais, ordena pela hora (considerando que a hora está no formato HH:MM)
    if (a.time && b.time) {
      return a.time.localeCompare(b.time);
    }
    return 0; // Mantém a ordem se não houver tempo ou apenas um tiver
  });

  return (
    <div className="space-y-3">
      {sortedEvents.length > 0 ? (
          sortedEvents.map(evento => (
            <EventItem
              key={evento.id}
              evento={evento}
              onClick={onEventClick} // Passa o manipulador de clique
            />
          ))
      ) : (
          <p className="text-center text-slate-500 dark:text-slate-400 py-4">Nenhum evento encontrado para os filtros selecionados.</p>
      )}
    </div>
  );
};

export default ListView;