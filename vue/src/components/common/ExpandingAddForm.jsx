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
    // TODO: Adicionar lógica para salvar ou processar a entrada
    setEntryText('');
    setEntryDate('');
    onClose(); // Fecha o formulário após submeter
  };

  // Previne o fechamento se clicar dentro do formulário
  const handleFormClick = (e) => {
    e.stopPropagation();
  };

  if (!isVisible) {
    return null; // Não renderiza nada se não estiver visível
  }

  return (
    // Overlay para fechar ao clicar fora
    <div 
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-300"
      onClick={onClose} // Fecha ao clicar no overlay
    >
      {/* Contêiner do Formulário */}
      <div
        onClick={handleFormClick} // Previne que o clique no formulário feche o overlay
        className={`
          bg-white rounded-xl shadow-2xl p-6 md:p-8
          w-11/12 max-w-md
          transition-all duration-500 ease-in-out
          transform ${isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-10'}
        `}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-slate-700">Adicionar Entrada Rápida</h2>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100"
            aria-label="Fechar formulário"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="formEntryType" className="block text-sm font-medium text-slate-700 mb-1">Tipo:</label>
            <select
              id="formEntryType"
              value={entryType}
              onChange={(e) => setEntryType(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              <option value="aviso">Aviso Rápido</option>
              <option value="evento">Evento Personalizado</option>
              <option value="lembrete">Lembrete/Alarme</option>
              <option value="tarefa">Tarefa</option>
            </select>
          </div>
          <div>
            <label htmlFor="formEntryText" className="block text-sm font-medium text-slate-700 mb-1">Descrição:</label>
            <textarea
              id="formEntryText"
              rows="3"
              value={entryText}
              onChange={(e) => setEntryText(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Ex: Estudar para prova de Cálculo..."
              required
            ></textarea>
          </div>
          {(entryType === 'evento' || entryType === 'lembrete') && (
            <div>
              <label htmlFor="formEntryDate" className="block text-sm font-medium text-slate-700 mb-1">Data e Hora (Opcional):</label>
              <input
                type="datetime-local"
                id="formEntryDate"
                value={entryDate}
                onChange={(e) => setEntryDate(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200"
          >
            Adicionar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExpandingAddForm;