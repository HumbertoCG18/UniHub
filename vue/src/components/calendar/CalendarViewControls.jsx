// unihub-novo/src/components/calendar/CalendarViewControls.jsx
import { List, View, CalendarRange, CalendarDays, Eye, EyeOff, ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarViewControls = ({
  currentView,
  setCurrentView,
  showClasses,
  setShowClasses,
  currentDate,
  changeMonth
}) => {

  const viewOptions = [
    { id: 'list', name: 'Lista', icon: List },
    { id: 'week', name: 'Semana', icon: View },
    { id: '2weeks', name: '2 Semanas', icon: CalendarRange },
    { id: 'month', name: 'Mês', icon: CalendarDays },
  ];

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-slate-800">Calendário Acadêmico</h2>
        <div className="flex items-center space-x-2">
          <button onClick={() => changeMonth(-1)} className="p-2 rounded-md hover:bg-slate-100 transition-colors" aria-label="Mês anterior"><ChevronLeft size={20}/></button>
          <span className="text-lg font-semibold text-slate-700 w-32 text-center">
            {currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
          </span>
          <button onClick={() => changeMonth(1)} className="p-2 rounded-md hover:bg-slate-100 transition-colors" aria-label="Próximo mês"><ChevronRight size={20}/></button>
        </div>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex flex-wrap gap-2">
          {viewOptions.map(opt => (
            <button
              key={opt.id}
              onClick={() => setCurrentView(opt.id)}
              className={`px-3 py-1.5 text-sm rounded-md flex items-center transition-colors ${currentView === opt.id ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
            >
              <opt.icon size={16} className="mr-1.5"/>{opt.name}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-3">
          <label htmlFor="showClassesToggle" className="text-sm text-slate-600 flex items-center cursor-pointer">
            {showClasses ? <Eye size={18} className="mr-1.5 text-blue-500"/> : <EyeOff size={18} className="mr-1.5 text-slate-400"/>}
            Mostrar Aulas
          </label>
          <button
            id="showClassesToggle"
            onClick={() => setShowClasses(!showClasses)}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${showClasses ? 'bg-blue-600' : 'bg-slate-300'}`}
            aria-pressed={showClasses}
          >
            <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out ${showClasses ? 'translate-x-6' : 'translate-x-1'}`}/>
          </button>
        </div>
      </div>
    </>
  );
};

export default CalendarViewControls;  