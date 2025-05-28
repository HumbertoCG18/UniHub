// unihub-novo/src/components/calendar/MonthView.jsx
import { getDaysInMonth, getFirstDayOfMonth, getDayNames } from '../../utils/dateUtils';

const MonthView = ({ currentDate, events }) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const numDays = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month); // 0 = Domingo
  const today = new Date();
  const dayNames = getDayNames('pt-BR', 'short');

  const weeks = [];
  let days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="border border-slate-100 h-28 bg-slate-50"></div>);
  }

  for (let day = 1; day <= numDays; day++) {
    const date = new Date(year, month, day);
    const isToday = date.toDateString() === today.toDateString();
    const dayEvents = events.filter(e => new Date(e.date).toDateString() === date.toDateString());

    days.push(
      <div key={day} className={`border border-slate-100 h-32 p-1.5 overflow-y-auto custom-scrollbar ${isToday ? 'bg-blue-50' : 'bg-white'}`}>
        <div className={`font-semibold text-sm mb-1 ${isToday ? 'text-blue-600' : 'text-slate-700'}`}>
          {day}
        </div>
        <div className="mt-1 space-y-1">
          {dayEvents.slice(0, 3).map(e => (
            <div key={e.id} className={`text-xs p-1 rounded ${e.cor || 'bg-slate-200'} text-white truncate`} title={`${e.title} (${e.subject})`}>
              {e.title}
            </div>
          ))}
          {dayEvents.length > 3 && (
             <div className="text-xs text-blue-500 font-medium">+ {dayEvents.length - 3} mais</div>
          )}
        </div>
      </div>
    );

    if ((firstDay + day) % 7 === 0 || day === numDays) {
      while (days.length < 7 && day === numDays) {
        days.push(<div key={`empty-end-${days.length}`} className="border border-slate-100 h-28 bg-slate-50"></div>);
      }
      weeks.push(<div key={`week-${weeks.length}`} className="grid grid-cols-7">{days}</div>);
      days = [];
    }
  }

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      <div className="grid grid-cols-7 text-center font-medium text-sm text-slate-600 bg-slate-100 p-2">
        {dayNames.map(name => <div key={name}>{name}</div>)}
      </div>
      <div className="bg-white">
        {weeks}
      </div>
    </div>
  );
};

export default MonthView;