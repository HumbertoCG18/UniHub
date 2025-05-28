// unihub-novo/src/components/home/NextClassCard.jsx
import { CheckCircle, User, Clock, MapPin } from 'lucide-react';

const NextClassCard = ({ aula }) => {
  if (!aula) {
    return (
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 min-h-[200px] flex flex-col justify-center items-center">
        <CheckCircle size={48} className="mb-4 opacity-80" />
        <h2 className="text-2xl font-bold mb-2">Tudo em dia!</h2>
        <p className="text-center text-blue-100">Nenhuma aula programada por agora.</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl font-bold">Próxima Aula</h2>
        {aula.dia && <span className="bg-blue-500 text-xs font-semibold px-3 py-1 rounded-full">{aula.dia}</span>}
      </div>
      <h3 className="text-xl font-semibold mb-2">{aula.materia}</h3>
      <div className="space-y-2 text-blue-100">
        {aula.professor && <p className="flex items-center"><User size={18} className="mr-2 opacity-80" /> {aula.professor}</p>}
        {aula.horario && <p className="flex items-center"><Clock size={18} className="mr-2 opacity-80" /> {aula.horario}</p>}
        {aula.sala && <p className="flex items-center"><MapPin size={18} className="mr-2 opacity-80" /> {aula.sala}</p>}
      </div>
    </div>
  );
};

export default NextClassCard;