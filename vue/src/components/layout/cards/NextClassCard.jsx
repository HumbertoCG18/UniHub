// unihub-novo/src/components/layout/cards/NextClassCard.jsx
import { CheckCircle, User, Clock, MapPin } from 'lucide-react';

const NextClassCard = ({ aula }) => {
  // Se não houver dados da próxima aula, exibe uma mensagem padrão
  if (!aula || Object.keys(aula).length === 0) {
    return (
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 min-h-[200px] flex flex-col justify-center items-center">
        <CheckCircle size={48} className="mb-4 opacity-80" />
        <h2 className="text-xl sm:text-2xl font-bold mb-2">Tudo em dia!</h2>
        <p className="text-center text-blue-100 text-sm sm:text-base">Nenhuma próxima aula programada.</p>
      </div>
    );
  }

  // Se houver dados da aula, exibe os detalhes
  return (
    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-5 sm:p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl sm:text-2xl font-bold">Próxima Aula</h2>
        {/* Exibe o dia da aula se disponível */}
        {aula.dia && (
          <span className="bg-blue-500 text-xs sm:text-sm font-semibold px-2.5 sm:px-3 py-1 rounded-full">
            {aula.dia}
          </span>
        )}
      </div>
      <h3 className="text-lg sm:text-xl font-semibold mb-2 truncate" title={aula.materia}>
        {aula.materia || 'Matéria não definida'}
      </h3>
      <div className="space-y-1.5 sm:space-y-2 text-blue-100 text-sm sm:text-base">
        {/* Exibe o professor se disponível */}
        {aula.professor && (
          <p className="flex items-center">
            <User size={16} sm:size={18} className="mr-2 opacity-80 flex-shrink-0" /> 
            <span className="truncate" title={aula.professor}>{aula.professor}</span>
          </p>
        )}
        {/* Exibe o horário se disponível */}
        {aula.horario && (
          <p className="flex items-center">
            <Clock size={16} sm:size={18} className="mr-2 opacity-80 flex-shrink-0" /> 
            {aula.horario}
          </p>
        )}
        {/* Exibe a sala se disponível */}
        {aula.sala && (
          <p className="flex items-center">
            <MapPin size={16} sm:size={18} className="mr-2 opacity-80 flex-shrink-0" /> 
            <span className="truncate" title={aula.sala}>{aula.sala}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default NextClassCard;