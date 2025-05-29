// unihub-novo/src/components/common/Modal.jsx
import { X } from 'lucide-react';
// Sparkles será adicionado se/quando a funcionalidade de IA for reintegrada

const Modal = ({ isOpen, onClose, title, children, isLoading, loadingText = "Carregando..." }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center p-4 z-50 transition-opacity duration-300">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-lg transform transition-all scale-95 opacity-0 animate-modalShow">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-xl font-semibold text-slate-800 flex items-center">
            {/* Ícone Sparkles pode ser adicionado aqui condicionalmente se necessário depois */}
            {title}
          </h4>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-full hover:bg-slate-100" aria-label="Fechar modal">
            <X size={24} />
          </button>
        </div>
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-600">{loadingText}</p>
          </div>
        ) : (
          <div className="text-sm text-slate-700 max-h-[60vh] overflow-y-auto pr-2 space-y-2 whitespace-pre-line custom-scrollbar">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;