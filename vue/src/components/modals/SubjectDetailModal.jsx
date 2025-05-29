// unihub-novo/src/components/modals/SubjectDetailModal.jsx
import { useState } from 'react';
import Modal from './Modal'; // Ou o caminho correto para o seu Modal genérico
import {
    Edit, ChevronDown, ChevronUp, Paperclip, FileText, Briefcase,
    Percent, Tag, Mail, Calendar, User, Hash
} from 'lucide-react';

const SubjectDetailModal = ({ materia, onClose, onOpenEditModal }) => {
  const [notasVisiveis, setNotasVisiveis] = useState(false);
  const [arquivosVisiveis, setArquivosVisiveis] = useState(false);

  if (!materia) return null;

  const notasValidas = materia.notas?.filter(n => typeof n.valor === 'number' && typeof n.peso === 'number') || [];
  let mediaPonderada = 'N/A';
  if (notasValidas.length > 0) {
    const somaNotasPesos = notasValidas.reduce((acc, n) => acc + n.valor * n.peso, 0);
    const somaPesos = notasValidas.reduce((acc, n) => acc + n.peso, 0);
    if (somaPesos > 0) {
      mediaPonderada = (somaNotasPesos / somaPesos).toFixed(1);
    } else if (notasValidas.length > 0 && notasValidas.every(n => !n.peso || n.peso === 1)) {
        mediaPonderada = (notasValidas.reduce((acc, n) => acc + n.valor, 0) / notasValidas.length).toFixed(1);
    }
  }

  // Cria o botão de Editar para ser passado como prop
  const editButtonAction = (
    <button
        onClick={() => onOpenEditModal(materia)}
        className="text-xs bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2.5 sm:py-1.5 sm:px-3 rounded-md transition-colors duration-200 flex items-center"
        aria-label="Editar matéria"
    >
        <Edit size={14} className="mr-2 sm:mr-1.5" />
        <span className="hidden sm:inline">Editar</span> {/* Texto opcional para telas maiores */}
    </button>
  );

  return (
    <Modal
        isOpen={!!materia}
        onClose={onClose}
        title={`${materia.nome}`}
        headerAction={editButtonAction} // Passa o botão de editar aqui
    >
      {/* Conteúdo do Modal (permanece o mesmo da resposta anterior) */}
      <div className="space-y-3 text-sm">
        {/* A div que antes continha o botão editar no topo do conteúdo foi removida daqui */}

        {/* Detalhes da Matéria */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 pt-2 border-t border-slate-200 dark:border-slate-700">
            <p className="text-slate-600 dark:text-slate-400 flex items-center">
                <Hash size={14} className="mr-2 text-slate-500" />Código:
                <span className="ml-1 font-medium text-slate-800 dark:text-slate-200">{materia.codigo || 'N/A'}</span>
            </p>
            <p className="text-slate-600 dark:text-slate-400 flex items-center">
                <User size={14} className="mr-2 text-slate-500" />Professor:
                <span className="ml-1 font-medium text-slate-800 dark:text-slate-200">{materia.professor || 'N/A'}</span>
            </p>
            <p className="text-slate-600 dark:text-slate-400 flex items-center">
                <Mail size={14} className="mr-2 text-slate-500" />Email:
                <a href={`mailto:${materia.emailProfessor}`} className="ml-1 font-medium text-blue-600 hover:underline dark:text-blue-400 truncate">
                    {materia.emailProfessor || 'N/A'}
                </a>
            </p>
            <p className="text-slate-600 dark:text-slate-400 flex items-center">
                <Calendar size={14} className="mr-2 text-slate-500" />Dias:
                <span className="ml-1 font-medium text-slate-800 dark:text-slate-200">{materia.diasSemana?.join(', ') || 'N/A'} ({materia.horario || 'N/A'})</span>
            </p>
            <p className="text-slate-600 dark:text-slate-400 flex items-center">
                <Briefcase size={14} className="mr-2 text-slate-500" />Trabalhos:
                <span className="ml-1 font-medium text-slate-800 dark:text-slate-200">{materia.trabalhosStatus?.enviados || 0}/{materia.trabalhosStatus?.total || 0} (Pendentes: {materia.trabalhosStatus?.pendentes || 0})</span>
            </p>
            <p className="text-slate-600 dark:text-slate-400 flex items-center">
                <Percent size={14} className="mr-2 text-slate-500" />Presença:
                <span className="ml-1 font-medium text-slate-800 dark:text-slate-200">{materia.presenca || 'N/A'}%</span>
            </p>
        </div>

        {/* Seção de Notas com Collapse */}
        <div className="pt-2">
            <button
                className="w-full font-semibold text-slate-700 dark:text-slate-300 py-2 mt-2 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-md px-2 transition-colors"
                onClick={() => setNotasVisiveis(!notasVisiveis)}
                aria-expanded={notasVisiveis}
                aria-controls="notas-collapse-section"
            >
                <div className="flex items-center">
                    <FileText size={16} className="mr-2 text-slate-500" /> Notas Detalhadas
                </div>
                {notasVisiveis ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {notasVisiveis && (
                <div id="notas-collapse-section" className="pl-4 mt-2 border-l-2 border-slate-200 dark:border-slate-600 ml-1 py-2 space-y-1.5 text-xs sm:text-sm">
                    {materia.notas && materia.notas.length > 0 ? materia.notas.map(nota => (
                        <div key={nota.tipo} className="flex justify-between text-slate-600 dark:text-slate-400">
                            <span>{nota.tipo} {nota.data ? `(${new Date(nota.data).toLocaleDateString('pt-BR', {timeZone: 'UTC'})})` : ''}:</span>
                            <span className="font-medium text-slate-800 dark:text-slate-200">{nota.valor} <span className="text-xs text-slate-500">(Peso: {nota.peso || 1})</span></span>
                        </div>
                    )) : <p className="text-slate-500 dark:text-slate-400">Nenhuma nota registrada.</p>}
                    {notasValidas.length > 0 &&
                        <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-200 pt-1.5 mt-1 border-t border-slate-200 dark:border-slate-700">
                            <span>Média Ponderada Parcial:</span>
                            <span>{mediaPonderada}</span>
                        </div>
                    }
                </div>
            )}
        </div>

        {/* Seção de Arquivos com Collapse */}
        <div className="pt-2">
            <button
                className="w-full font-semibold text-slate-700 dark:text-slate-300 py-2 mt-2 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-md px-2 transition-colors"
                onClick={() => setArquivosVisiveis(!arquivosVisiveis)}
                aria-expanded={arquivosVisiveis}
                aria-controls="arquivos-collapse-section"
            >
                <div className="flex items-center">
                    <Paperclip size={16} className="mr-2 text-slate-500" /> Arquivos da Matéria
                </div>
                {arquivosVisiveis ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {arquivosVisiveis && (
                <div id="arquivos-collapse-section" className="pl-4 mt-2 border-l-2 border-slate-200 dark:border-slate-600 ml-1 py-2 space-y-1.5">
                    {materia.arquivos && materia.arquivos.length > 0 ? (
                        <ul className="list-none pl-0 space-y-1.5">
                            {materia.arquivos.map(arq => (
                                <li key={arq.id} className="text-slate-600 dark:text-slate-400 p-2 bg-slate-50 dark:bg-slate-700/30 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                                    <a href={arq.url || '#'} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400 font-medium flex items-center justify-between">
                                        <span>{arq.nome}</span>
                                        <span className="text-xs text-slate-400 dark:text-slate-500 ml-2">
                                            (Upload: {arq.dataUpload ? new Date(arq.dataUpload).toLocaleDateString('pt-BR', {timeZone: 'UTC'}) : 'N/D'})
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    ) : <p className="text-slate-500 dark:text-slate-400 pl-1">Nenhum arquivo disponível.</p>}
                </div>
            )}
        </div>

         {/* Seção de Tags */}
        <div className="pt-2">
            <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-2 mt-2 flex items-center">
                <Tag size={16} className="mr-2 text-slate-500" /> Tags
            </h4>
            {materia.tags && materia.tags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                    {materia.tags.map(tag => (
                        <span key={tag} className="text-xs bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-full">{tag}</span>
                    ))}
                </div>
            ) : <p className="text-slate-500 dark:text-slate-400 pl-1">Nenhuma tag definida.</p>}
        </div>
      </div>
    </Modal>
  );
};

export default SubjectDetailModal;