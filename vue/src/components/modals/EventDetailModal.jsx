// unihub-novo/src/components/modals/EventDetailModal.jsx
import React from 'react';
import Modal from './Modal'; // Seu componente Modal genérico
import { CalendarDays, Clock, Tag, Bookmark, Info, Edit3, Trash2 } from 'lucide-react';

const EventDetailModal = ({ isOpen, onClose, event, onEdit, onDelete }) => {
  if (!isOpen || !event) return null;

  const { title, date, time, type, subject, description, cor } = event;

  const formattedDate = new Date(date);
  // Adiciona o deslocamento do fuso horário para exibir corretamente as datas UTC como locais
  formattedDate.setMinutes(formattedDate.getMinutes() + formattedDate.getTimezoneOffset());

  let headerStyle = {};
  if (cor && cor.startsWith('#')) {
    headerStyle.backgroundColor = cor;
    // Poderia tentar calcular uma cor de texto contrastante aqui, mas para simplificar:
    // Se a cor for muito escura, o texto branco padrão do modal pode não ser ideal.
    // Para um modal dark mode, o texto já é claro. Para light mode, pode precisar de ajuste.
  }


  // Ação para editar (se onEdit for fornecido)
  const editAction = onEdit ? (
    <button
        onClick={() => onEdit(event)}
        className="text-xs bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2.5 sm:py-1.5 sm:px-3 rounded-md transition-colors duration-200 flex items-center mr-2"
        aria-label="Editar evento"
    >
        <Edit3 size={14} className="mr-1 sm:mr-1.5" />
        <span className="hidden sm:inline">Editar</span>
    </button>
  ) : null;


  return (
    <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={title || "Detalhes do Evento"}
        headerAction={editAction} // Botão de editar no cabeçalho do Modal
    >
        <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            {cor && cor.startsWith('bg-') && (
                <div className={`w-full h-2 rounded-t-md ${cor}`}></div>
            )}
            {cor && cor.startsWith('#') && (
                 <div style={{ backgroundColor: cor }} className="w-full h-2 rounded-t-md"></div>
            )}

            <div className="p-1">
                <div className="flex items-center mb-2">
                    <CalendarDays size={16} className="mr-2 text-slate-500 dark:text-slate-400" />
                    <span className="font-medium">Data:</span>
                    <span className="ml-1">{formattedDate.toLocaleDateString('pt-BR')}</span>
                </div>

                {time && (
                    <div className="flex items-center mb-2">
                        <Clock size={16} className="mr-2 text-slate-500 dark:text-slate-400" />
                        <span className="font-medium">Hora:</span>
                        <span className="ml-1">{time}</span>
                    </div>
                )}

                {type && (
                    <div className="flex items-center mb-2">
                        <Tag size={16} className="mr-2 text-slate-500 dark:text-slate-400" />
                        <span className="font-medium">Tipo:</span>
                        <span className={`ml-1 px-2 py-0.5 text-xs rounded-full ${ cor && cor.startsWith('bg-') ? `${cor.replace('500','100')} dark:${cor.replace('bg-','bg-').replace('500','800/30')} ${cor.replace('bg-','text-').replace('500','700')} dark:${cor.replace('bg-','text-').replace('500','200')}` : 'bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300'}`}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </span>
                    </div>
                )}

                {subject && (
                    <div className="flex items-center mb-2">
                        <Bookmark size={16} className="mr-2 text-slate-500 dark:text-slate-400" />
                        <span className="font-medium">Matéria:</span>
                        <span className="ml-1">{subject}</span>
                    </div>
                )}

                {description && (
                    <div className="pt-2 mt-2 border-t border-slate-200 dark:border-slate-700">
                        <h4 className="font-semibold mb-1 flex items-center">
                            <Info size={16} className="mr-2 text-slate-500 dark:text-slate-400" />
                            Descrição:
                        </h4>
                        <p className="text-slate-600 dark:text-slate-400 whitespace-pre-wrap">{description}</p>
                    </div>
                )}
            </div>
             {/* Botão de Excluir (se onDelete for fornecido) */}
            {onDelete && (
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-end">
                    <button
                        onClick={() => {
                            if (window.confirm(`Tem certeza que deseja excluir o evento "${title}"?`)) {
                                onDelete(event.id);
                            }
                        }}
                        className="text-xs bg-red-500 hover:bg-red-600 text-white font-semibold py-1.5 px-3 rounded-md transition-colors duration-200 flex items-center"
                        aria-label="Excluir evento"
                    >
                        <Trash2 size={14} className="mr-1.5" />
                        Excluir
                    </button>
                </div>
            )}
        </div>
    </Modal>
  );
};

export default EventDetailModal;