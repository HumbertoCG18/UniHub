// unihub-novo/src/components/layout/BottomNavigationBar.jsx
import { Home, CalendarDays, BookCopy, ClipboardList, PlusCircle } from 'lucide-react';

const BottomNavigationBar = ({ activePage, setActivePage, onAddClick }) => {
    const navItems = [
        { id: 'home', icon: Home, label: 'Início' },
        { id: 'calendar', icon: CalendarDays, label: 'Calendário' },
        { id: 'add', icon: PlusCircle, label: 'Add', isCentral: true },
        { id: 'subjects', icon: BookCopy, label: 'Matérias' },
        { id: 'assignments', icon: ClipboardList, label: 'Trabalhos' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-top-nav z-40">
            <div className="max-w-md mx-auto flex justify-around items-center h-16">
                {navItems.map(item => {
                    if (item.isCentral) {
                        return (
                             <button
                                key={item.id}
                                onClick={onAddClick}
                                className="flex flex-col items-center justify-center p-2 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all transform hover:scale-110 -mt-4 w-14 h-14 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                                aria-label="Adicionar nova entrada"
                            >
                                <item.icon size={28} />
                            </button>
                        );
                    }
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActivePage(item.id)}
                            className={`flex flex-col items-center justify-center p-2 rounded-lg w-1/5 ${activePage === item.id ? 'text-blue-600' : 'text-slate-500 hover:text-blue-500'} transition-colors`}
                            aria-current={activePage === item.id ? "page" : undefined}
                        >
                            <item.icon size={24} />
                            <span className="text-xs mt-0.5">{item.label}</span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};

export default BottomNavigationBar;