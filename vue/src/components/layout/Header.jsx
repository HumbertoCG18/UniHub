// unihub-novo/src/components/layout/Header.jsx
import { useState, useEffect, useRef } from 'react';
import { BookOpen, Bell, UserCircle, Settings, BarChart3, CreditCard, LogOut, ChevronDown } from 'lucide-react';

const Header = ({ userData, setActivePage }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Para detectar cliques fora do dropdown

  // Se userData não estiver disponível, usa um objeto padrão para evitar erros
  const safeUserData = userData || {
    nome: "Usuário", // Nome padrão
    fotoUrl: "https://placehold.co/100x100/E0E0E0/B0B0B0?text=U", // Imagem placeholder
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Efeito para fechar o dropdown se clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    // Adiciona o listener quando o dropdown está aberto
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    // Remove o listener ao desmontar ou quando o dropdown fecha
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]); // Re-executa o efeito quando isDropdownOpen muda


  const handleNavigation = (page) => {
    if (setActivePage) {
      setActivePage(page);
    }
    setIsDropdownOpen(false); // Fecha o dropdown após a navegação
  };

  const handleLogout = () => {
    // Aqui você implementaria sua lógica de logout:
    // - Limpar tokens de autenticação
    // - Redirecionar para a página de login
    // - Resetar o estado do usuário no App.jsx
    console.log("Usuário clicou em Log Out");
    setIsDropdownOpen(false);
    // Exemplo: Se você tivesse uma página de login e uma forma de resetar o usuário no App.jsx:
    // if (setActivePage) setActivePage('login'); 
    // if (onLogout) onLogout(); // Uma função passada do App.jsx para limpar o estado do usuário
  };

  // Define os itens do dropdown
  const dropdownItems = [
    { label: 'Perfil', icon: UserCircle, action: () => handleNavigation('profile'), pageKey: 'profile' },
    { label: 'Configurações', icon: Settings, action: () => handleNavigation('settings'), pageKey: 'settings' },
    { label: 'Estatísticas', icon: BarChart3, action: () => handleNavigation('statistics'), pageKey: 'statistics' },
    { label: 'Planos', icon: CreditCard, action: () => handleNavigation('plans'), pageKey: 'plans' },
  ];

  return (
    <header className="p-4 sm:p-6 lg:p-8 sticky top-0 bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-md z-40 border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo e Nome do App */}
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg shadow-md">
            <BookOpen size={28} className="text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">Hub Universitário</h1>
        </div>

        {/* Ícones da Direita e Menu de Usuário */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button 
            className="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" 
            title="Notificações"
            aria-label="Notificações"
          >
            <Bell size={22} />
          </button>
          
          {/* Botão de Usuário e Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
              title="Menu do Usuário"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
              id="user-menu-button" // Adicionado ID para aria-labelledby no dropdown
            >
              <img
                src={safeUserData.fotoUrl}
                alt={`Usuário ${safeUserData.nome}`}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-blue-500 object-cover"
                onError={(e) => { 
                  e.target.onerror = null; 
                  e.target.src = "https://placehold.co/100x100/E0E0E0/B0B0B0?text=U"; // Fallback
                }}
              />
              <ChevronDown 
                size={18} 
                className={`ml-1 text-slate-600 dark:text-slate-400 transition-transform duration-200 ease-in-out ${
                  isDropdownOpen ? 'rotate-180' : 'rotate-0'
                }`} 
              />
            </button>

            {/* Conteúdo do Dropdown com Animação */}
            <div
              className={`
                absolute right-0 mt-2 w-60 origin-top-right rounded-md shadow-xl bg-white dark:bg-slate-800 ring-1 ring-black ring-opacity-5 dark:ring-slate-700 focus:outline-none
                transition-all duration-200 ease-out
                ${isDropdownOpen ? 'opacity-100 scale-100 transform' : 'opacity-0 scale-95 transform pointer-events-none'}
              `}
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
            >
              <div className="py-1" role="none">
                {/* Nome do usuário no dropdown */}
                <div className="px-4 py-3">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">{safeUserData.nome}</p>
                  {/* Poderia adicionar o email ou curso aqui se disponível em safeUserData */}
                </div>
                <div className="border-t border-slate-200 dark:border-slate-700"></div>

                {dropdownItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={item.action}
                    className="w-full text-left px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-100 flex items-center transition-colors"
                    role="menuitem"
                  >
                    <item.icon size={18} className="mr-3 text-slate-500 dark:text-slate-400" />
                    {item.label}
                  </button>
                ))}
                <div className="border-t border-slate-200 dark:border-slate-700"></div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-700/30 hover:text-red-700 flex items-center transition-colors"
                  role="menuitem"
                >
                  <LogOut size={18} className="mr-3" />
                  Log Out
                </button>
              </div>
            </div>
          </div> {/* Fim do div relative do dropdown */}
        </div> {/* Fim dos ícones da direita */}
      </div> {/* Fim do container max-w-7xl */}
    </header>
  );
};

export default Header;