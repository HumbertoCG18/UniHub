// unihub-novo/src/components/assignments/AssignmentCard.jsx
import { useState, useEffect } from 'react';
import { Briefcase, CalendarDays, Clock, AlertTriangle, Bell, BellOff, ExternalLink, MapPin } from 'lucide-react';

const AssignmentCard = ({ trabalho, onSetAlert }) => {
  const [diasRestantes, setDiasRestantes] = useState(0);
  const [isAlertaLocalDefinido, setIsAlertaLocalDefinido] = useState(trabalho.alertaDefinido || false);

  useEffect(() => {
    if (trabalho.dataEntrega) {
      const hoje = new Date();
      const dataEntrega = new Date(trabalho.dataEntrega);
      hoje.setHours(0, 0, 0, 0); // Normaliza para o início do dia
      dataEntrega.setHours(0, 0, 0, 0); // Normaliza para o início do dia

      const diffTime = dataEntrega - hoje;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDiasRestantes(diffDays >= 0 ? diffDays : 0);
    }
  }, [trabalho.dataEntrega]);

  const handleToggleAlert = () => {
    // Em um app real, onSetAlert poderia abrir um modal para configurar horas, etc.
    // E depois atualizaria o estado global e persistiria.
    // Por agora, apenas alternamos o estado local e chamamos a prop.
    const novoEstadoAlerta = !isAlertaLocalDefinido;
    setIsAlertaLocalDefinido(novoEstadoAlerta);
    onSetAlert(trabalho.id, novoEstadoAlerta); // Informa o componente pai
    console.log(`Alerta para "${trabalho.nome}" ${novoEstadoAlerta ? 'ATIVADO' : 'DESATIVADO'}`);
    // Aqui você poderia usar a API de Notificações do Navegador se permitido.
    if (novoEstadoAlerta) {
        alert(`Alerta definido para "${trabalho.nome}"! Você será notificado X horas antes.`);
    } else {
        alert(`Alerta removido para "${trabalho.nome}".`);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/D';
    return new Date(dateString).toLocaleDateString('pt-BR', { timeZone: 'UTC', day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const getPrazoColor = () => {
    if (diasRestantes <= 1) return 'border-red-500 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300';
    if (diasRestantes <= 3) return 'border-orange-500 bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400';
    if (diasRestantes <= 7) return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
    return 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
  };
  
  const getDiasRestantesText = () => {
    if (diasRestantes === 0) return "Entrega Hoje!";
    if (diasRestantes === 1) return "Entrega Amanhã!";
    return `Faltam ${diasRestantes} dias`;
  }

  return (
    <div className={`p-4 sm:p-5 rounded-lg border-l-4 shadow-md hover:shadow-lg transition-shadow duration-200 ${getPrazoColor()} dark:border-opacity-70`}>
      <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-2 sm:gap-4">
        <div className="flex-grow">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full mb-1 inline-block ${trabalho.corMateria || 'bg-slate-200 dark:bg-slate-700'} ${trabalho.corMateria ? 'text-white' : 'text-slate-700 dark:text-slate-300'}`}>
            {trabalho.materia}
          </span>
          <h3 className="text-md sm:text-lg font-bold text-slate-800 dark:text-slate-100 mb-1">{trabalho.nome}</h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-1 flex items-center">
            <Briefcase size={14} className="mr-1.5 flex-shrink-0" /> Tipo: <span className="capitalize ml-1">{trabalho.tipo}</span>
          </p>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 flex items-center">
            <CalendarDays size={14} className="mr-1.5 flex-shrink-0" /> Postado em: {formatDate(trabalho.dataPostagem)}
          </p>
        </div>

        <div className="flex-shrink-0 sm:text-right space-y-1.5 mt-2 sm:mt-0">
            <p className={`text-sm sm:text-md font-semibold ${getPrazoColor().split(' ')[2]}`}>
                <Clock size={14} className="inline mr-1 mb-0.5" /> {getDiasRestantesText()}
            </p>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Entrega até: {formatDate(trabalho.dataEntrega)}
            </p>
        </div>
      </div>

      {(trabalho.tipo === 'online' && trabalho.linkEntrega) && (
        <a 
            href={trabalho.linkEntrega} 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
        >
            Acessar Sala de Entrega <ExternalLink size={14} className="ml-1" />
        </a>
      )}
      {trabalho.tipo === 'presencial' && trabalho.localApresentacao && (
        <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 flex items-center">
            <MapPin size={14} className="mr-1.5 flex-shrink-0 text-slate-500" /> Local: {trabalho.localApresentacao}
        </p>
      )}

      <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-end">
        <button
          onClick={handleToggleAlert}
          className={`flex items-center text-xs sm:text-sm font-medium py-1.5 px-3 rounded-md transition-colors
            ${isAlertaLocalDefinido 
              ? 'bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-700/30 dark:text-red-300 dark:hover:bg-red-700/50' 
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'}`}
          title={isAlertaLocalDefinido ? "Remover alerta" : "Definir alerta de entrega"}
        >
          {isAlertaLocalDefinido ? <BellOff size={14} className="mr-1.5" /> : <Bell size={14} className="mr-1.5" />}
          {isAlertaLocalDefinido ? 'Alerta Definido' : 'Criar Alerta'}
        </button>
      </div>
    </div>
  );
};

export default AssignmentCard;