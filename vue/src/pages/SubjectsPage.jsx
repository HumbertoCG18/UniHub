// unihub-novo/src/pages/SubjectsPage.jsx
import { useState } from 'react';

// Ajuste estes caminhos conforme a localização real dos seus arquivos:
import SubjectCardItem from '../components/layout/cards/SubjectCardItem'; // Ou ../components/subjects/SubjectCardItem
import SubjectDetailModal from '../components/modals/SubjectDetailModal'; // Ou ../components/subjects/SubjectDetailModal
import EditSubjectModal from '../components/modals/EditSubjectModal';     // Ou ../components/subjects/EditSubjectModal

const SubjectsPage = ({ materias, onUpdateMateria }) => {
  const [selectedMateria, setSelectedMateria] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // 1. CHAMADO QUANDO UM CARD DE MATÉRIA É CLICADO
  const handleSelectMateriaForDetail = (materia) => {
    setSelectedMateria(materia); // Define qual matéria foi selecionada
    setIsEditModalOpen(false);   // Garante que o modal de edição esteja fechado
    setIsDetailModalOpen(true);  // Abre o modal de detalhes
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    // Não limpamos selectedMateria aqui intencionalmente,
    // pois o SubjectDetailModal pode precisar dele para abrir o EditSubjectModal.
    // Se o usuário apenas fechar o modal de detalhes, selectedMateria pode ser limpo aqui se desejado,
    // mas se ele clicar em "Editar", precisamos manter selectedMateria.
    // Uma abordagem mais limpa seria limpar selectedMateria apenas se não for abrir a edição.
    // Por enquanto, vamos deixar assim e o EditSubjectModal limpa ao fechar.
  };

  const handleOpenEditModalFromDetail = () => {
    if (selectedMateria) {
      setIsDetailModalOpen(false); // Fecha o modal de detalhes
      setIsEditModalOpen(true);    // Abre o modal de edição (selectedMateria já está definido)
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedMateria(null); // Limpa a matéria após fechar a edição
  };

  const handleSaveMateria = (updatedMateria) => {
    if (onUpdateMateria) {
      onUpdateMateria(updatedMateria);
    }
    handleCloseEditModal(); // Fecha o modal de edição
    // setSelectedMateria(null); // Já é feito em handleCloseEditModal
  };

  if (!materias) {
    return <p className="p-6 text-center dark:text-slate-300">Carregando matérias...</p>;
  }

  return (
    <div className="p-2 sm:p-0">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-6">
        Minhas Matérias
      </h2>

      {materias.length > 0 ? (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {materias.map(materia => (
            // 2. CADA CARD CHAMA handleSelectMateriaForDetail AO SER CLICADO
            <SubjectCardItem
              key={materia.id}
              materia={materia}
              onSelectMateria={handleSelectMateriaForDetail}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow text-center">
          <p className="text-slate-500 dark:text-slate-400">
            Nenhuma matéria cadastrada para este semestre.
          </p>
        </div>
      )}

      {/* 3. MODAL DE DETALHES É RENDERIZADO CONDICIONALMENTE */}
      {selectedMateria && isDetailModalOpen && (
        <SubjectDetailModal
          materia={selectedMateria}
          onClose={handleCloseDetailModal}
          onOpenEditModal={handleOpenEditModalFromDetail}
        />
      )}

      {/* Modal de Edição (ainda aqui para quando for implementado a partir do detalhe) */}
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