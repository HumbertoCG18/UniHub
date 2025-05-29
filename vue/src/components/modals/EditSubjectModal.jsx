import { useState, useEffect } from 'react';
import Modal from './Modal'; // Importa o Modal genérico
import { Palette, Tag, Save } from 'lucide-react';

const EditSubjectModal = ({ materia, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState(materia || {});

  // Atualiza o formData se a prop 'materia' mudar (quando um novo item é selecionado para edição)
  useEffect(() => {
    if (materia) {
      setFormData({
        ...materia,
        // Garante que tags seja um array para o join funcionar, e depois uma string para o input
        tags: Array.isArray(materia.tags) ? materia.tags.join(', ') : '',
      });
    }
  }, [materia]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagChange = (e) => {
    setFormData(prev => ({ ...prev, tags: e.target.value }));
  };

  const handleColorSelect = (colorClass) => {
    setFormData(prev => ({ ...prev, cor: colorClass }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Converte a string de tags de volta para um array antes de salvar
    const finalData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
    };
    onSave(finalData); // Chama a função onSave passada pelo SubjectsPage
    // onClose(); // O onClose é chamado pelo SubjectsPage após o onSave ter sucesso
  };

  // Cores disponíveis para seleção (classes do Tailwind)
  const availableColors = [
    'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 
    'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500',
    'bg-orange-500', 'bg-cyan-500', 'bg-lime-500', 'bg-emerald-500'
  ];

  if (!isOpen || !materia) return null; // Não renderiza se não estiver aberto ou sem dados da matéria

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Editar: ${materia.nome}`}>
      <form onSubmit={handleSubmit} className="space-y-4 text-sm">
        {/* Nome da Matéria */}
        <div>
          <label htmlFor="editSubjectName" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            Nome da Matéria
          </label>
          <input
            type="text"
            name="nome"
            id="editSubjectName"
            value={formData.nome || ''}
            onChange={handleChange}
            className="mt-1 block w-full p-2.5 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-slate-200"
            required
          />
        </div>

        {/* Código da Matéria */}
        <div>
          <label htmlFor="editSubjectCodigo" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            Código da Matéria
          </label>
          <input
            type="text"
            name="codigo"
            id="editSubjectCodigo"
            value={formData.codigo || ''}
            onChange={handleChange}
            className="mt-1 block w-full p-2.5 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-slate-200"
          />
        </div>
        
        {/* Nome do Professor */}
        <div>
          <label htmlFor="editSubjectProfessor" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            Nome do Professor
          </label>
          <input
            type="text"
            name="professor"
            id="editSubjectProfessor"
            value={formData.professor || ''}
            onChange={handleChange}
            className="mt-1 block w-full p-2.5 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-slate-200"
          />
        </div>

        {/* Email do Professor */}
        <div>
          <label htmlFor="editSubjectEmailProfessor" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            Email do Professor
          </label>
          <input
            type="email"
            name="emailProfessor"
            id="editSubjectEmailProfessor"
            value={formData.emailProfessor || ''}
            onChange={handleChange}
            className="mt-1 block w-full p-2.5 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-slate-200"
          />
        </div>

        {/* Horário */}
         <div>
          <label htmlFor="editSubjectHorario" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            Horário (ex: 14:00 - 15:40)
          </label>
          <input
            type="text"
            name="horario"
            id="editSubjectHorario"
            value={formData.horario || ''}
            onChange={handleChange}
            className="mt-1 block w-full p-2.5 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-slate-200"
          />
        </div>

        {/* Dias da Semana (Exemplo simples com input de texto, idealmente checkboxes) */}
        <div>
          <label htmlFor="editSubjectDiasSemana" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            Dias da Semana (ex: Seg, Qua, Sex)
          </label>
          <input
            type="text"
            name="diasSemana"
            id="editSubjectDiasSemana"
            value={Array.isArray(formData.diasSemana) ? formData.diasSemana.join(', ') : ''}
            onChange={(e) => setFormData(prev => ({ ...prev, diasSemana: e.target.value.split(',').map(dia => dia.trim()).filter(dia => dia) }))}
            className="mt-1 block w-full p-2.5 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-slate-200"
            placeholder="Seg, Qua, Sex"
          />
        </div>


        {/* Cor da Matéria */}
        <div>
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">
            <Palette size={14} className="inline mr-1" /> Cor no Calendário
          </label>
          <div className="flex flex-wrap gap-2">
            {availableColors.map(colorClass => (
              <button
                type="button"
                key={colorClass}
                onClick={() => handleColorSelect(colorClass)}
                className={`w-7 h-7 rounded-full ${colorClass} border-2 transition-all
                  ${formData.cor === colorClass 
                    ? 'border-slate-700 dark:border-white ring-2 ring-offset-1 dark:ring-offset-slate-800 ring-blue-500 scale-110' 
                    : 'border-transparent hover:opacity-80'}`}
                title={colorClass.replace('bg-', '').replace('-500', '')}
                aria-label={`Selecionar cor ${colorClass.replace('bg-', '').replace('-500', '')}`}
              ></button>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <label htmlFor="editSubjectTags" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
            <Tag size={14} className="inline mr-1" /> Tags (separadas por vírgula)
          </label>
          <input
            type="text"
            name="tags" // O nome do campo já é 'tags'
            id="editSubjectTags"
            value={formData.tags} // Já é uma string aqui devido ao useEffect
            onChange={handleTagChange}
            className="mt-1 block w-full p-2.5 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-slate-200"
            placeholder="Ex: Obrigatória, Exatas, Projeto"
          />
        </div>
        
        {/* Botões de Ação */}
        <div className="flex justify-end pt-3 space-x-3">
          <button 
            type="button" 
            onClick={onClose} 
            className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-md transition-colors"
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors flex items-center"
          >
            <Save size={16} className="mr-2" /> Salvar Alterações
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditSubjectModal;