// unihub-novo/src/components/common/Modal.jsx (ou modals/Modal.jsx)
import { X, Sparkles } from 'lucide-react';

const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    isLoading,
    loadingText = "Carregando...",
    showSparklesIcon = false,
    headerAction = null // Nova prop para o botão de ação no header
}) => {
  if (!isOpen) return null;

  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 dark:bg-opacity-50 backdrop-blur-sm flex justify-center items-center p-4 z-50 transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        onClick={handleModalContentClick}
        className={`
          bg-white dark:bg-slate-800 rounded-xl shadow-2xl p-6 md:p-8
          w-full max-w-lg
          transition-all duration-300 ease-in-out
          transform ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-10'}
        `}
        role="document"
      >
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          {/* Título do Modal */}
          <h2 id="modal-title" className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-slate-100 flex items-center flex-grow truncate pr-2">
            {showSparklesIcon && <Sparkles size={20} className="text-blue-500 dark:text-blue-400 mr-2 flex-shrink-0" />}
            {title}
          </h2>

          {/* Espaço para o Botão de Ação (ex: Editar) e Botão Fechar */}
          <div className="flex items-center flex-shrink-0">
            {headerAction && <div className="mr-2">{headerAction}</div>} {/* Renderiza o botão de ação aqui */}
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
              aria-label="Fechar modal"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Conteúdo do Modal */}
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-blue-600 dark:border-blue-400 mx-auto mb-4"></div>
            <p className="text-slate-600 dark:text-slate-400">{loadingText}</p>
          </div>
        ) : (
          <div className="text-sm text-slate-700 dark:text-slate-300 max-h-[60vh] sm:max-h-[70vh] overflow-y-auto pr-2 space-y-3 sm:space-y-4 custom-scrollbar">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;