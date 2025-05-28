// unihub-novo/src/pages/SubjectsPage.jsx
// import { Palette } from 'lucide-react'; // Para o futuro

const SubjectsPage = ({ materias }) => {
  if (!materias) {
    return <p>Carregando matérias...</p>;
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Minhas Matérias</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {materias.map(materia => (
          <div key={materia.id} className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-blue-700">{materia.nome}</h3>
              <span
                className={`w-5 h-5 rounded-full ${materia.cor || 'bg-slate-400'}`}
                title={`Cor da matéria: ${materia.cor || 'Padrão'}`}
              ></span>
            </div>
            <p className="text-sm text-slate-500 mb-2">Professor: {materia.professor}</p>
            <div className="mb-1">
              <label className="text-xs text-slate-600 block mb-0.5">Progresso Atividades: {materia.progressoAtividades}%</label>
              <div className="w-full bg-slate-200 rounded-full h-2.5">
                <div
                    className="bg-green-500 h-2.5 rounded-full transition-all duration-500"
                    style={{width: `${materia.progressoAtividades}%`}}
                ></div>
              </div>
            </div>
            <div>
              <label className="text-xs text-slate-600 block mb-0.5">Progresso Conteúdo: {materia.progressoConteudo}%</label>
              <div className="w-full bg-slate-200 rounded-full h-2.5">
                <div
                    className="bg-blue-500 h-2.5 rounded-full transition-all duration-500"
                    style={{width: `${materia.progressoConteudo}%`}}
                ></div>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-2">Faltas: {materia.faltas} de {materia.limiteFaltas}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectsPage;