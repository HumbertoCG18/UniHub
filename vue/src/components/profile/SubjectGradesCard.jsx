// unihub-novo/src/components/profile/SubjectGradesCard.jsx
import { FileText, Percent, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const SubjectGradesCard = ({ materia }) => {
  const [notasVisiveis, setNotasVisiveis] = useState(false);

  if (!materia) {
    return (
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md mb-4">
        <p className="text-slate-500 dark:text-slate-400">Dados da matéria indisponíveis.</p>
      </div>
    );
  }

  const notasValidas = materia.notas?.filter(n => typeof n.valor === 'number' && typeof n.peso === 'number') || [];
  let mediaPonderada = 'N/A';

  if (notasValidas.length > 0) {
    const somaNotasPesos = notasValidas.reduce((acc, n) => acc + n.valor * n.peso, 0);
    const somaPesos = notasValidas.reduce((acc, n) => acc + n.peso, 0);

    if (somaPesos > 0) {
      mediaPonderada = (somaNotasPesos / somaPesos).toFixed(1);
    } else if (notasValidas.length > 0 && notasValidas.every(n => !n.peso || n.peso === 1)) {
      // Fallback para média simples se não houver pesos ou todos os pesos forem 1
      mediaPonderada = (notasValidas.reduce((acc, n) => acc + n.valor, 0) / notasValidas.length).toFixed(1);
    }
  }

  return (
    <div className="bg-white dark:bg-slate-800 p-4 sm:p-5 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-2">
        <h3 className={`text-md sm:text-lg font-semibold ${materia.cor ? materia.cor.replace('bg-', 'text-').replace('500', '600 dark:').replace('500', '400') : 'text-slate-700 dark:text-slate-200'}`}>
          {materia.nome || 'Nome da Matéria Indisponível'}
        </h3>
        <span
          className={`w-4 h-4 rounded-full flex-shrink-0 ${materia.cor || 'bg-slate-300 dark:bg-slate-600'}`}
          title={`Cor da matéria: ${materia.cor || 'Padrão'}`}
        ></span>
      </div>

      <div className="text-xs sm:text-sm space-y-1 mb-3">
        <p className="text-slate-600 dark:text-slate-400 flex items-center">
          <Percent size={14} className="mr-2 text-slate-500 flex-shrink-0" />Presença:
          <span className="ml-1 font-medium text-slate-800 dark:text-slate-200">{materia.presenca || 'N/A'}%</span>
        </p>
      </div>

      {/* Seção de Notas com Collapse */}
      {materia.notas && materia.notas.length > 0 && (
        <div className="border-t border-slate-200 dark:border-slate-700 pt-3">
          <button
            className="w-full font-semibold text-slate-700 dark:text-slate-300 py-1.5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-md px-2 transition-colors text-xs sm:text-sm"
            onClick={() => setNotasVisiveis(!notasVisiveis)}
            aria-expanded={notasVisiveis}
            aria-controls={`notas-collapse-${materia.id}`}
          >
            <div className="flex items-center">
              <FileText size={14} sm:size={16} className="mr-2 text-slate-500" /> Notas Detalhadas
            </div>
            {notasVisiveis ? <ChevronUp size={18} sm:size={20} /> : <ChevronDown size={18} sm:size={20} />}
          </button>
          {notasVisiveis && (
            <div id={`notas-collapse-${materia.id}`} className="pl-4 mt-2 border-l-2 border-slate-200 dark:border-slate-600 ml-1 py-2 space-y-1 text-[11px] sm:text-xs">
              {notasValidas.map(nota => (
                <div key={nota.tipo} className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>{nota.tipo} {nota.data ? `(${new Date(nota.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' })})` : ''}:</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    {nota.valor} <span className="text-[10px] sm:text-xs text-slate-500">(Peso: {nota.peso || 1})</span>
                  </span>
                </div>
              ))}
              {notasValidas.length > 0 &&
                <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-200 pt-1.5 mt-1.5 border-t border-slate-200 dark:border-slate-700">
                  <span>Média Ponderada:</span>
                  <span>{mediaPonderada}</span>
                </div>
              }
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SubjectGradesCard;