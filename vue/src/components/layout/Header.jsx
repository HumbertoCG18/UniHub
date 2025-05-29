// unihub-novo/src/components/layout/Header.jsx
import { useState, useEffect, useRef } from 'react';
import { BookOpen, Bell, UserCircle, Settings, BarChart3, CreditCard, LogOut, ChevronDown } from 'lucide-react';

const Header = ({ userData, setActivePage }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const safeUserData = userData || {
    nome: "Usuário",
    fotoUrl: "https://placehold.co/100x100/E0E0E0/B0B0B0?text=U",
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleNavigation = (page) => {
    if (setActivePage) setActivePage(page);
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    console.log("Usuário clicou em Log Out");
    setIsDropdownOpen(false);
  };

  const dropdownItems = [
    { label: 'Perfil', icon: UserCircle, action: () => handleNavigation('profile'), pageKey: 'profile' },
    { label: 'Configurações', icon: Settings, action: () => handleNavigation('settings'), pageKey: 'settings' },
    { label: 'Estatísticas', icon: BarChart3, action: () => handleNavigation('statistics'), pageKey: 'statistics' },
    { label: 'Planos', icon: CreditCard, action: () => handleNavigation('plans'), pageKey: 'plans' },
  ];

  return (
    <header className="p-3 sm:p-4 md:p-6 lg:p-8 sticky top-0 bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-md z-40 border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="bg-blue-600 p-1.5 sm:p-2 rounded-md sm:rounded-lg shadow-md"> {/* Padding e rounded responsivos */}
            <BookOpen size={24} sm:size={28} className="text-white" /> {/* Tamanho do ícone responsivo */}
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100">Hub Universitário</h1> {/* Tamanho da fonte responsivo */}
        </div>

        <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4">
          <button 
            className="p-1.5 sm:p-2 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" 
            title="Notificações"
            aria-label="Notificações"
          >
            <Bell size={20} sm:size={22} /> {/* Tamanho do ícone responsivo */}
          </button>
          
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center p-0.5 sm:p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
              title="Menu do Usuário"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
              id="user-menu-button"
            >
              <img
                src={safeUserData.fotoUrl}
                alt={`Usuário ${safeUserData.nome}`}
                className="w-7 h-7 sm:w-8 md:w-9 md:h-9 rounded-full border-2 border-blue-500 object-cover" // Tamanho da imagem responsivo
                onError={(e) => { 
                  e.target.onerror = null; 
                  e.target.src = "https://placehold.co/100x100/E0E0E0/B0B0B0?text=U";
                }}
              />
              <ChevronDown 
                size={16} sm:size={18} // Tamanho do ícone responsivo
                className={`ml-0.5 sm:ml-1 text-slate-600 dark:text-slate-400 transition-transform duration-200 ease-in-out ${
                  isDropdownOpen ? 'rotate-180' : 'rotate-0'
                }`} 
              />
            </button>

            <div
              className={`
                absolute right-0 mt-2 w-52 sm:w-60 origin-top-right rounded-md shadow-xl bg-white dark:bg-slate-800 ring-1 ring-black ring-opacity-5 dark:ring-slate-700 focus:outline-none
                transition-all duration-200 ease-out
                ${isDropdownOpen ? 'opacity-100 scale-100 transform' : 'opacity-0 scale-95 transform pointer-events-none'}
              `}
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
            >
              <div className="py-1" role="none">
                <div className="px-3 sm:px-4 py-2 sm:py-3"> {/* Padding responsivo */}
                  <p className="text-xs sm:text-sm font-medium text-slate-900 dark:text-slate-100 truncate">{safeUserData.nome}</p>
                </div>
                <div className="border-t border-slate-200 dark:border-slate-700"></div>
                {dropdownItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={item.action}
                    className="w-full text-left px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-100 flex items-center transition-colors"
                    role="menuitem"
                  >
                    <item.icon size={16} sm:size={18} className="mr-2 sm:mr-3 text-slate-500 dark:text-slate-400" /> {/* Ícone e margem responsivos */}
                    {item.label}
                  </button>
                ))}
                <div className="border-t border-slate-200 dark:border-slate-700"></div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-700/30 hover:text-red-700 flex items-center transition-colors"
                  role="menuitem"
                >
                  <LogOut size={16} sm:size={18} className="mr-2 sm:mr-3" /> {/* Ícone e margem responsivos */}
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;