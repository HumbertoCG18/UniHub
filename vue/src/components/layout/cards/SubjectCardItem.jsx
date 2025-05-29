// unihub-novo/src/components/subjects/SubjectCardItem.jsx
const SubjectCardItem = ({ materia, onSelectMateria }) => (
  <button
    onClick={() => onSelectMateria(materia)}
    className="w-full text-left p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:shadow-md dark:hover:bg-slate-700/50 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <div className="flex justify-between items-start mb-2">
      <h3 className={`text-lg font-semibold ${materia.cor ? materia.cor.replace('bg-', 'text-').replace('500', '600 dark:').replace('500', '400') : 'text-slate-700 dark:text-slate-200'}`}>
        {materia.nome}
      </h3>
      <span
        className={`w-5 h-5 rounded-full ${materia.cor || 'bg-slate-400 dark:bg-slate-600'}`}
        title={`Cor da matéria: ${materia.cor || 'Padrão'}`}
      ></span>
    </div>
    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Professor: {materia.professor}</p>
    <div className="mb-1">
      <label className="text-xs text-slate-600 dark:text-slate-400 block mb-0.5">Progresso Atividades: {materia.progressoAtividades}%</label>
      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
        <div
          className="bg-green-500 h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${materia.progressoAtividades}%` }}
        ></div>
      </div>
    </div>
    <div>
      <label className="text-xs text-slate-600 dark:text-slate-400 block mb-0.5">Progresso Conteúdo: {materia.progressoConteudo}%</label>
      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
        <div
          className="bg-blue-500 h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${materia.progressoConteudo}%` }}
        ></div>
      </div>
    </div>
    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Faltas: {materia.faltas} de {materia.limiteFaltas}</p>
  </button>
);
export default SubjectCardItem;