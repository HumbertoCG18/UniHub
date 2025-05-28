// unihub-novo/src/components/home/AulaItem.jsx
// Sparkles e onRequestStudyTips serão adicionados depois se/quando a IA for reintegrada

const AulaItem = ({ aula, isProxima /*, onRequestStudyTips */ }) => (
  <div className={`p-4 rounded-lg ${isProxima ? 'bg-blue-50 border-l-4 border-blue-500' : 'bg-slate-50 hover:bg-slate-100'} transition-colors duration-200`}>
    <div className="flex justify-between items-start">
      <div>
        <h4 className={`font-semibold ${isProxima ? 'text-blue-700' : 'text-slate-800'}`}>{aula.materia}</h4>
        <p className="text-sm text-slate-600">{aula.horario} - {aula.sala}</p>
        <p className="text-xs text-slate-500">{aula.professor}</p>
      </div>
      {/* {onRequestStudyTips && (
        <button
          onClick={() => onRequestStudyTips(aula.materia)}
          className="mt-1 flex items-center text-xs bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded-md transition-colors duration-200"
          title="Obter dicas de estudo com IA"
          aria-label={`Obter dicas de estudo para ${aula.materia}`}
        >
          <Sparkles size={14} className="mr-1" /> Dicas
        </button>
      )} */}
    </div>
  </div>
);

export default AulaItem;