// unihub-novo/src/pages/SubjectsPage.jsx
import { useState } from 'react';
import { Palette, Edit, ChevronDown, ChevronUp, Paperclip, FileText, Briefcase, Percent, Tag, Mail, Calendar, User, Hash } from 'lucide-react';
import Modal from '../components/modals/Modal'; // Usaremos o Modal genérico
import EditSubjectModal from '../components/modals/EditSubjectModal'; // Usaremos o Modal de edição


// Componente para o card de cada matéria na lista
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

// Componente para o modal de detalhes da matéria
const SubjectDetailModal = ({ materia, onClose, onOpenEditModal }) => {
  const [notasVisiveis, setNotasVisiveis] = useState(false);

  if (!materia) return null;

  const notasValidas = materia.notas?.filter(n => typeof n.valor === 'number') || [];
  const media = notasValidas.length > 0
    ? (notasValidas.reduce((acc, n) => acc + n.valor * (n.peso || 1), 0) / notasValidas.reduce((acc, n) => acc + (n.peso || 1), 0)).toFixed(1)
    : 'N/A';


  return (
    <Modal isOpen={!!materia} onClose={onClose} title={materia.nome}>
      <div className="space-y-4 text-sm">
        <div className="flex justify-between items-center">
            <p className="text-slate-600 dark:text-slate-400"><Hash size={14} className="inline mr-2" />Código: <span className="font-medium text-slate-800 dark:text-slate-200">{materia.codigo || 'N/A'}</span></p>
            <button 
                onClick={() => onOpenEditModal(materia)}
                className="text-xs bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2.5 rounded-md transition-colors duration-200 flex items-center"
            >
                <Edit size={14} className="mr-1.5" /> Editar Matéria
            </button>
        </div>
        <p className="text-slate-600 dark:text-slate-400"><User size={14} className="inline mr-2" />Professor: <span className="font-medium text-slate-800 dark:text-slate-200">{materia.professor || 'N/A'}</span></p>
        <p className="text-slate-600 dark:text-slate-400"><Mail size={14} className="inline mr-2" />Email: <a href={`mailto:${materia.emailProfessor}`} className="font-medium text-blue-600 hover:underline dark:text-blue-400">{materia.emailProfessor || 'N/A'}</a></p>
        <p className="text-slate-600 dark:text-slate-400"><Calendar size={14} className="inline mr-2" />Dias: <span className="font-medium text-slate-800 dark:text-slate-200">{materia.diasSemana?.join(', ') || 'N/A'} ({materia.horario || 'N/A'})</span></p>
        <p className="text-slate-600 dark:text-slate-400"><Briefcase size={14} className="inline mr-2" />Trabalhos: <span className="font-medium text-slate-800 dark:text-slate-200">{materia.trabalhosStatus?.enviados || 0}/{materia.trabalhosStatus?.total || 0} (Pendentes: {materia.trabalhosStatus?.pendentes || 0})</span></p>
        <p className="text-slate-600 dark:text-slate-400"><Percent size={14} className="inline mr-2" />Presença: <span className="font-medium text-slate-800 dark:text-slate-200">{materia.presenca || 'N/A'}%</span></p>
        
        <div>
            <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-1 mt-3 flex items-center cursor-pointer" onClick={() => setNotasVisiveis(!notasVisiveis)}>
                <FileText size={14} className="inline mr-2" /> Notas das Provas e Trabalhos
                {notasVisiveis ? <ChevronUp size={16} className="ml-auto" /> : <ChevronDown size={16} className="ml-auto" />}
            </h4>
            {notasVisiveis && (
                <div className="pl-4 border-l-2 border-slate-200 dark:border-slate-700 ml-1 py-2 space-y-1">
                    {materia.notas?.map(nota => (
                        <p key={nota.tipo} className="text-slate-600 dark:text-slate-400">
                            {nota.tipo} ({nota.data ? new Date(nota.data).toLocaleDateString('pt-BR', {timeZone: 'UTC'}) : 'N/D'}): 
                            <span className="font-medium text-slate-800 dark:text-slate-200"> {nota.valor}</span> (Peso: {nota.peso || 1})
                        </p>
                    ))}
                    <p className="font-semibold text-slate-700 dark:text-slate-300 pt-1">Média Parcial (com pesos): {media}</p>
                </div>
            )}
        </div>

        <div>
            <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-1 mt-3"><Paperclip size={14} className="inline mr-2" /> Arquivos da Matéria</h4>
            {materia.arquivos?.length > 0 ? (
                <ul className="list-disc list-inside pl-4 space-y-1">
                    {materia.arquivos.map(arq => (
                        <li key={arq.id} className="text-slate-600 dark:text-slate-400">
                            <a href={arq.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">
                                {arq.nome}
                            </a> 
                            <span className="text-xs text-slate-400 dark:text-slate-500"> (Upload: {new Date(arq.dataUpload).toLocaleDateString('pt-BR', {timeZone: 'UTC'})})</span>
                        </li>
                    ))}
                </ul>
            ) : <p className="text-slate-500 dark:text-slate-400 pl-4">Nenhum arquivo disponível.</p>}
        </div>
         <div className="mt-3">
            <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-1"><Tag size={14} className="inline mr-2" /> Tags</h4>
            {materia.tags?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                    {materia.tags.map(tag => (
                        <span key={tag} className="text-xs bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-full">{tag}</span>
                    ))}
                </div>
            ) : <p className="text-slate-500 dark:text-slate-400">Nenhuma tag definida.</p>}
        </div>
      </div>
    </Modal>
  );
};

// Componente para o modal de Edição da Matéria
const EditSubjectModal = ({ materia, isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState(materia);

    useEffect(() => {
        setFormData(materia); // Atualiza o form se a matéria mudar
    }, [materia]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    // Placeholder para cores
    const availableColors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'];

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    if (!isOpen || !formData) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Editar: ${formData.nome}`}>
            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                <div>
                    <label htmlFor="editSubjectName" className="block text-xs font-medium text-slate-700 dark:text-slate-300">Nome da Matéria</label>
                    <input type="text" name="nome" id="editSubjectName" value={formData.nome || ''} onChange={handleChange} className="mt-1 block w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-slate-200" />
                </div>
                {/* Adicionar outros campos: código, professor, email, dias, horário, tags... */}
                <div>
                    <label htmlFor="editSubjectColor" className="block text-xs font-medium text-slate-700 dark:text-slate-300">Cor no Calendário</label>
                    <div className="mt-1 flex flex-wrap gap-2">
                        {availableColors.map(colorClass => (
                            <button
                                type="button"
                                key={colorClass}
                                onClick={() => setFormData(prev => ({ ...prev, cor: colorClass }))}
                                className={`w-7 h-7 rounded-full ${colorClass} border-2 ${formData.cor === colorClass ? 'border-slate-700 dark:border-white ring-2 ring-offset-1 dark:ring-offset-slate-800 ring-blue-500' : 'border-transparent'}`}
                                title={colorClass}
                                aria-label={`Selecionar cor ${colorClass}`}
                            ></button>
                        ))}
                    </div>
                </div>
                 {/* Campos para Tags - Exemplo simples */}
                <div>
                    <label htmlFor="editSubjectTags" className="block text-xs font-medium text-slate-700 dark:text-slate-300">Tags (separadas por vírgula)</label>
                    <input 
                        type="text" 
                        name="tags" 
                        id="editSubjectTags" 
                        value={Array.isArray(formData.tags) ? formData.tags.join(', ') : ''} 
                        onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag) }))} 
                        className="mt-1 block w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-slate-200" 
                    />
                </div>
                <div className="flex justify-end pt-2">
                    <button type="button" onClick={onClose} className="mr-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-md">Cancelar</button>
                    <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md">Salvar Alterações</button>
                </div>
            </form>
        </Modal>
    );
};


const SubjectsPage = ({ materias, onUpdateMateria }) => { // Adicionada prop onUpdateMateria
  const [selectedMateria, setSelectedMateria] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleSelectMateria = (materia) => {
    setSelectedMateria(materia);
  };

  const handleCloseDetailModal = () => {
    setSelectedMateria(null);
  };

  const handleOpenEditModal = (materia) => {
    setSelectedMateria(materia); // Garante que a matéria correta está selecionada para edição
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    // setSelectedMateria(null); // Opcional: limpar matéria selecionada ao fechar edição
  };

  const handleSaveMateria = (updatedMateria) => {
    // Aqui você chamaria uma função passada por props para atualizar o estado global
    // Ex: onUpdateMateria(updatedMateria);
    // Por enquanto, vamos simular:
    console.log("Matéria atualizada (simulação):", updatedMateria);
    // Para atualizar na lista visualmente (se os dados são gerenciados no App.jsx):
    if (onUpdateMateria) {
        onUpdateMateria(updatedMateria);
    }
    handleCloseEditModal();
    // Se o selectedMateria for o mesmo objeto que foi atualizado,
    // pode ser necessário atualizá-lo também para refletir no modal de detalhes se ele permanecer aberto.
    // Ou, mais simples, feche também o modal de detalhes:
    // setSelectedMateria(updatedMateria); // Para manter o modal de detalhes atualizado se ele não fechar
    setSelectedMateria(null); // Fecha o modal de detalhes após salvar
  };

  if (!materias) {
    return <p className="p-6 text-center">Carregando matérias...</p>;
  }

  return (
    <div className="p-2 sm:p-0">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-6">Minhas Matérias</h2>
      {materias.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {materias.map(materia => (
            <SubjectCardItem 
              key={materia.id} 
              materia={materia} 
              onSelectMateria={handleSelectMateria} 
            />
          ))}
        </div>
      ) : (
        <p className="text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 p-4 rounded-xl shadow text-center">
            Nenhuma matéria cadastrada para este semestre.
        </p>
      )}

      {selectedMateria && !isEditModalOpen && ( // Só mostra detalhes se o modal de edição não estiver aberto para a mesma matéria
        <SubjectDetailModal 
          materia={selectedMateria} 
          onClose={handleCloseDetailModal}
          onOpenEditModal={handleOpenEditModal} // Passa a função para abrir o modal de edição
        />
      )}
      
      {selectedMateria && isEditModalOpen && (
        <EditSubjectModal
            materia={selectedMateria}
            isOpen={isEditModalOpen}
            onClose={handleCloseEditModal}
            onSave={handleSaveMateria}
        />
      )}
    </div>
  );
};

export default SubjectsPage;