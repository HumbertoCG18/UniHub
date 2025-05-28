// unihub-novo/src/components/layout/Header.jsx
import { BookOpen, Bell, Settings } from 'lucide-react';

const Header = ({ userData }) => {
  const safeUserData = userData || { fotoUrl: "https://placehold.co/100x100/E0E0E0/B0B0B0?text=User" };

  return (
    <header className="p-4 sm:p-6 lg:p-8 sticky top-0 bg-slate-100/80 backdrop-blur-md z-40 border-b border-slate-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg shadow-md">
            <BookOpen size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800">Hub Universitário</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-slate-200 transition-colors" title="Notificações">
            <Bell size={22} className="text-slate-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-slate-200 transition-colors" title="Configurações">
            <Settings size={22} className="text-slate-600" />
          </button>
          <img
            src={safeUserData.fotoUrl}
            alt="Foto do Usuário"
            className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x100/E0E0E0/B0B0B0?text=User"; }}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;