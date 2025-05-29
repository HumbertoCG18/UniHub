// unihub-novo/src/components/common/AddQuickEntryModal.jsx
import { useState } from 'react';
import Modal from './Modal';

const AddQuickEntryModal = ({ isOpen, onClose }) => {
  const [entryType, setEntryType] = useState('aviso');
  const [entryText, setEntryText] = useState('');
  const [entryDate, setEntryDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Nova Entrada Rápida:", { type: entryType, text: entryText, date: entryDate });
    onClose();
    setEntryText('');
    setEntryDate('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Adicionar Entrada Rápida">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="entryType" className="block text-sm font-medium text-slate-700 mb-1">Tipo de Entrada:</label>
          <select
            id="entryType"
            value={entryType}
            onChange={(e) => setEntryType(e.target.value)}
            className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="aviso">Aviso Rápido</option>
            <option value="evento">Evento Personalizado</option>
            <option value="lembrete">Lembrete/Alarme</option>
            <option value="tarefa">Tarefa</option>
          </select>
        </div>
        <div>
          <label htmlFor="entryText" className="block text-sm font-medium text-slate-700 mb-1">Descrição:</label>
          <textarea
            id="entryText"
            rows="3"
            value={entryText}
            onChange={(e) => setEntryText(e.target.value)}
            className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Ex: Estudar para prova de Cálculo..."
            required
          ></textarea>
        </div>
        {(entryType === 'evento' || entryType === 'lembrete') && (
           <div>
            <label htmlFor="entryDate" className="block text-sm font-medium text-slate-700 mb-1">Data e Hora (Opcional):</label>
            <input
              type="datetime-local"
              id="entryDate"
              value={entryDate}
              onChange={(e) => setEntryDate(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Adicionar Entrada
        </button>
      </form>
    </Modal>
  );
};

export default AddQuickEntryModal;