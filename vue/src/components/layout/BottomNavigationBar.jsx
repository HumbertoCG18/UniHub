// unihub-novo/src/components/layout/BottomNavigationBar.jsx
import { Home, CalendarDays, BookCopy, ClipboardList, PlusCircle, X } from 'lucide-react';

const BottomNavigationBar = ({ activePage, setActivePage, onAddClick, isAddFormOpen }) => {
    const navItems = [
        { id: 'home', icon: Home, label: 'Início' },
        { id: 'calendar', icon: CalendarDays, label: 'Calendário' },
        { id: 'add', icon: isAddFormOpen ? X : PlusCircle, label: 'Add', isCentral: true },
        { id: 'subjects', icon: BookCopy, label: 'Matérias' },
        { id: 'assignments', icon: ClipboardList, label: 'Trabalhos' },
    ];

    return (
        // Em telas maiores (lg), esta barra de navegação poderia ser ocultada se você tiver outra navegação.
        // Ex: <nav className="lg:hidden fixed bottom-0 ...">
        <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 shadow-top-nav z-40">
            <div className="max-w-md mx-auto flex justify-around items-center h-16 px-1"> {/* Adicionado px-1 para pequeno espaçamento nas bordas */}
                {navItems.map(item => {
                    if (item.isCentral) {
                        return (
                             <button
                                key={item.id}
                                onClick={onAddClick}
                                className={`
                                    flex flex-col items-center justify-center rounded-full 
                                    text-white shadow-lg 
                                    transition-all duration-300 ease-in-out
                                    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
                                    w-12 h-12 sm:w-14 sm:h-14 -mt-3 sm:-mt-4 // Tamanho responsivo para o botão central
                                    ${isAddFormOpen ? 'bg-red-500 hover:bg-red-600 rotate-90' : 'bg-blue-600 hover:bg-blue-700'}
                                `}
                                aria-label={isAddFormOpen ? "Fechar formulário" : "Adicionar nova entrada"}
                            >
                                <item.icon size={isAddFormOpen ? 22 : 26} sm:size={isAddFormOpen ? 24 : 28} className="transition-transform duration-300" /> {/* Tamanho responsivo do ícone central */}
                            </button>
                        );
                    }
                    return (
                        <button
                            key={item.id}
                            onClick={() => {
                                if (!isAddFormOpen) setActivePage(item.id); // Só navega se o formulário não estiver aberto
                            }}
                            className={`
                                flex flex-col items-center justify-center p-1 sm:p-2 rounded-lg w-1/5 
                                ${activePage === item.id && !isAddFormOpen ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400'} 
                                transition-colors
                                ${isAddFormOpen ? 'opacity-50 cursor-not-allowed' : 'opacity-100'} // Opacidade se formulário aberto
                            `}
                            aria-current={activePage === item.id ? "page" : undefined}
                            disabled={isAddFormOpen && item.id !== 'add'}
                        >
                            <item.icon size={22} sm:size={24} /> {/* Ícone responsivo */}
                            <span className="text-[10px] sm:text-xs mt-0.5">{item.label}</span> {/* Fonte responsiva para label */}
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};

export default BottomNavigationBar;