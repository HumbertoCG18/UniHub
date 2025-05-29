// unihub-novo/src/components/common/ExpandingAddForm.jsx
import { useState } from 'react';
import { X } from 'lucide-react';

const ExpandingAddForm = ({ isVisible, onClose }) => {
  const [entryType, setEntryType] = useState('aviso');
  const [entryText, setEntryText] = useState('');
  const [entryDate, setEntryDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Nova Entrada (Formulário Expansível):", { type: entryType, text: entryText, date: entryDate });
    setEntryText('');
    setEntryDate('');
    onClose();
  };

  const handleFormClick = (e) => e.stopPropagation();

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-300 p-4" // Adicionado p-4 para dar margem ao form em telas pequenas
      onClick={onClose}
    >
      <div
        onClick={handleFormClick}
        className={`
          bg-white dark:bg-slate-800 rounded-xl shadow-2xl p-4 sm:p-6 md:p-8 // Padding responsivo
          w-full max-w-md sm:w-11/12 // Largura responsiva
          transition-all duration-500 ease-in-out
          transform ${isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-10'}
        `}
      >
        <div className="flex justify-between items-center mb-4 sm:mb-6"> {/* Margem responsiva */}
          <h2 className="text-lg sm:text-xl font-semibold text-slate-700 dark:text-slate-200">Adicionar Entrada Rápida</h2> {/* Fonte responsiva */}
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
            aria-label="Fechar formulário"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4"> {/* Espaçamento responsivo */}
          <div>
            <label htmlFor="formEntryType" className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tipo:</label>
            <select
              id="formEntryType"
              value={entryType}
              onChange={(e) => setEntryType(e.target.value)}
              className="w-full p-2 sm:p-2.5 text-sm sm:text-base border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-slate-700 dark:text-slate-200" // Padding e fonte responsivos
            >
              <option value="aviso">Aviso Rápido</option>
              <option value="evento">Evento Personalizado</option>
              <option value="lembrete">Lembrete/Alarme</option>
              <option value="tarefa">Tarefa</option>
            </select>
          </div>
          <div>
            <label htmlFor="formEntryText" className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Descrição:</label>
            <textarea
              id="formEntryText"
              rows="3"
              value={entryText}
              onChange={(e) => setEntryText(e.target.value)}
              className="w-full p-2 sm:p-2.5 text-sm sm:text-base border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" // Padding e fonte responsivos
              placeholder="Ex: Estudar para prova de Cálculo..."
              required
            ></textarea>
          </div>
          {(entryType === 'evento' || entryType === 'lembrete') && (
            <div>
              <label htmlFor="formEntryDate" className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Data e Hora (Opcional):</label>
              <input
                type="datetime-local"
                id="formEntryDate"
                value={entryDate}
                onChange={(e) => setEntryDate(e.target.value)}
                className="w-full p-2 sm:p-2.5 text-sm sm:text-base border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:text-slate-200 dark:[color-scheme:dark]" // Padding, fonte e esquema de cores para datepicker no modo escuro
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 sm:py-2.5 px-4 rounded-lg transition-colors duration-200 text-sm sm:text-base" // Padding e fonte responsivos
          >
            Adicionar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExpandingAddForm;