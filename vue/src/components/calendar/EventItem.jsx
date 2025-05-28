// unihub-novo/src/components/calendar/EventItem.jsx

const EventItem = ({ evento }) => (
  <div
    key={evento.id}
    className={`
      p-3 border-l-4
      ${evento.cor ? evento.cor.replace('bg-', 'border-') : 'border-slate-300'}
      rounded-r-md shadow-sm hover:shadow-md transition-shadow
      ${evento.cor ? evento.cor.replace('text-', 'bg-').replace('500', '50') : 'bg-slate-50'}
    `}
  >
    <div className="flex justify-between items-center">
      <h3 className={`font-semibold ${evento.cor ? evento.cor.replace('bg-', 'text-') : 'text-slate-700'}`}>
        {evento.title}
      </h3>
      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 text-slate-600">
        {evento.type}
      </span>
    </div>
    <p className="text-sm text-slate-600">
      Data: {new Date(evento.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
      {evento.time ? ` - ${evento.time}` : ''}
    </p>
    <p className="text-xs text-slate-500">
      Matéria: {evento.subject}
    </p>
  </div>
);

export default EventItem;