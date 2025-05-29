// unihub-novo/src/pages/AssignmentsPage.jsx
import { useState, useEffect } from 'react'; // Importe useState e useEffect
import AssignmentCard from '../components/layout/cards/AssignmentCard'; // Ajuste o caminho se necessário

const AssignmentsPage = ({ trabalhos: initialTrabalhos, onUpdateTrabalho }) => {
  // Estado local para gerenciar os trabalhos, permitindo atualizações de 'alertaDefinido'
  const [trabalhos, setTrabalhos] = useState(initialTrabalhos || []);

  useEffect(() => {
    setTrabalhos(initialTrabalhos || []);
  }, [initialTrabalhos]);

  const handleSetAlert = (trabalhoId, novoEstadoAlerta) => {
    // Atualiza o estado local do 'alertaDefinido' para o trabalho específico
    const trabalhosAtualizados = trabalhos.map(t =>
      t.id === trabalhoId ? { ...t, alertaDefinido: novoEstadoAlerta } : t
    );
    setTrabalhos(trabalhosAtualizados);

    // Chama a função do App.jsx para persistir essa mudança (se necessário)
    if (onUpdateTrabalho) {
      const trabalhoModificado = trabalhosAtualizados.find(t => t.id === trabalhoId);
      onUpdateTrabalho(trabalhoModificado);
    }
  };

  if (!trabalhos) {
    return <p className="p-6 text-center dark:text-slate-300">Carregando trabalhos...</p>;
  }

  // Ordena os trabalhos por dias restantes (os mais próximos primeiro)
  const sortedTrabalhos = [...trabalhos].sort((a, b) => {
    const hoje = new Date();
    const dataA = new Date(a.dataEntrega);
    const dataB = new Date(b.dataEntrega);
    const diffA = Math.ceil((dataA - hoje) / (1000 * 60 * 60 * 24));
    const diffB = Math.ceil((dataB - hoje) / (1000 * 60 * 60 * 24));
    return (diffA < 0 ? Infinity : diffA) - (diffB < 0 ? Infinity : diffB); // Trabalhos passados vão para o final
  });

  return (
   <div className="p-2 sm:p-0">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-6">
        Trabalhos Pendentes
      </h2>
      {sortedTrabalhos.length > 0 ? (
        <div className="space-y-4 sm:space-y-5">
          {sortedTrabalhos.map(trabalho => (
            <AssignmentCard 
              key={trabalho.id} 
              trabalho={trabalho} 
              onSetAlert={handleSetAlert}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow text-center">
          <p className="text-slate-500 dark:text-slate-400">
            Nenhum trabalho pendente no momento. Bom descanso!
          </p>
        </div>
      )}
    </div>
  );
};

export default AssignmentsPage;