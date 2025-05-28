// unihub-novo/src/components/calendar/WeekView.jsx
import EventItem from '../components/calendar/EventItem';

const WeekView = ({ currentDate, events, numWeeks = 1 }) => {
  const startDate = new Date(currentDate);
  startDate.setDate(startDate.getDate() - startDate.getDay());

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + (numWeeks * 7) - 1);

  const weekEvents = events
    .filter(event => {
        const eventDate = new Date(event.date);
        eventDate.setHours(0,0,0,0);
        return eventDate >= startDate && eventDate <= endDate;
    })
    .sort((a,b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-600 mb-2 font-medium">
          Eventos de {startDate.toLocaleDateString('pt-BR')} até {endDate.toLocaleDateString('pt-BR')}
      </p>
      {weekEvents.length > 0 ? (
          weekEvents.map(evento => <EventItem key={evento.id} evento={evento} />)
      ) : (
          <p className="text-center text-slate-500 py-4">Nenhum evento encontrado para este período.</p>
      )}
    </div>
  );
};

export default WeekView;