// unihub-novo/src/components/calendar/ListView.jsx
import EventItem from './EventItem';

const ListView = ({ events }) => {
  const sortedEvents = [...events].sort((a,b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="space-y-3">
      {sortedEvents.length > 0 ? (
          sortedEvents.map(evento => <EventItem key={evento.id} evento={evento} />)
      ) : (
          <p className="text-center text-slate-500 py-4">Nenhum evento encontrado para os filtros selecionados.</p>
      )}
    </div>
  );
};

export default ListView;