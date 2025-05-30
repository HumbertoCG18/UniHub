import { useState, useEffect } from 'react';
import Modal from './Modal'; //
// Ícones de Lucide-react podem ser adicionados se desejado para os botões ou título

const AddQuickEntryModal = ({ isOpen, onClose, onAddEntry, initialDate, entryType: initialEntryType = 'evento' }) => {
  const [entryType, setEntryType] = useState(initialEntryType);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState(''); // Será definido pelo initialDate
  const [time, setTime] = useState('');

  useEffect(() => {
    if (isOpen) {
      setDate(initialDate || ''); // Pré-preenche a data quando o modal abre
      // Reseta outros campos se desejar, ou mantém os valores anteriores
      setTitle('');
      setSubject('');
      setTime('');
      setEntryType(initialEntryType); // Reseta para o tipo inicial ou um padrão
    }
  }, [isOpen, initialDate, initialEntryType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Por favor, insira um título.'); // Validação básica
      return;
    }
    if (!date) { // Garante que a data esteja selecionada se não for pré-preenchida ou se o usuário a limpar
      alert('Por favor, selecione uma data.');
      return;
    }
    // O estado 'date' já contém initialDate ou a modificação do usuário
    onAddEntry(entryType, { title: title.trim(), subject: subject.trim(), date, time });
    // onClose(); // O fechamento é tratado pela página CalendarPage após o onAddEntry
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Adicionar Novo ${entryType.charAt(0).toUpperCase() + entryType.slice(1)}`}>
      <form onSubmit={handleSubmit} className="space-y-4 text-sm">
        <div>
          <label htmlFor="addQuickEntryType" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Tipo de Entrada:</label>
          <select
            id="addQuickEntryType"
            value={entryType}
            onChange={(e) => setEntryType(e.target.value)}
            className="mt-1 block w-full p-2.5 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 dark:text-slate-200"
          >
            <option value="evento">Evento</option>
            <option value="tarefa">Tarefa</option>
            <option value="prova">Prova</option>
            <option value="aula">Aula</option>
            <option value="lembrete">Lembrete</option> {/* Adicionada opção Lembrete */}
            {/* Adicione mais tipos de evento conforme necessário */}
          </select>
        </div>
        <div>
          <label htmlFor="addQuickEntryTitle" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Título:</label>
          <input
            type="text"
            id="addQuickEntryTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full p-2.5 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 dark:text-slate-200"
            placeholder="Ex: Reunião de Projeto"
            required
          />
        </div>

        {/* Campo de Matéria (Opcional, pode depender do entryType) */}
        {(entryType === 'prova' || entryType === 'aula' || entryType === 'tarefa') && (
            <div>
            <label htmlFor="addQuickEntrySubject" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Matéria (Opcional):</label>
            <input
                type="text"
                id="addQuickEntrySubject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="mt-1 block w-full p-2.5 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 dark:text-slate-200"
                placeholder="Ex: Cálculo I"
            />
            </div>
        )}

        <div>
          <label htmlFor="addQuickEntryDate" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Data:</label>
          <input
            type="date"
            id="addQuickEntryDate"
            value={date} // Pré-preenchido pelo useEffect
            onChange={(e) => setDate(e.target.value)} // Permite ao usuário alterar se necessário
            className="mt-1 block w-full p-2.5 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 dark:text-slate-200 dark:[color-scheme:dark]"
            required
          />
        </div>
        <div>
          <label htmlFor="addQuickEntryTime" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Hora (Opcional):</label>
          <input
            type="time"
            id="addQuickEntryTime"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="mt-1 block w-full p-2.5 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 dark:text-slate-200 dark:[color-scheme:dark]"
          />
        </div>
        <div className="flex justify-end pt-3 space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-600 hover:bg-slate-200 dark:hover:bg-slate-500 rounded-md transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors flex items-center"
          >
            Adicionar Entrada
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddQuickEntryModal;