// unihub-novo/src/components/profile/UserInfoCard.jsx
import { Edit3 } from 'lucide-react'; // Ícone para o botão de editar

const UserInfoCard = ({ nome, fotoUrl, onEditProfileClick }) => {
  // Fallback para caso as props não sejam fornecidas
  const displayName = nome || "Nome do Usuário";
  const displayFotoUrl = fotoUrl || "https://placehold.co/100x100/E0E0E0/B0B0B0?text=U";

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg mb-6 flex flex-col items-center sm:flex-row sm:items-center sm:text-left">
      <img
        src={displayFotoUrl}
        alt={`Foto de ${displayName}`}
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mb-4 sm:mb-0 sm:mr-6 border-2 border-blue-500 dark:border-blue-400 object-cover flex-shrink-0"
        onError={(e) => {
          e.target.onerror = null; // Previne loop de erro se o fallback também falhar
          e.target.src = "https://placehold.co/100x100/E0E0E0/B0B0B0?text=U"; // Fallback mais genérico
        }}
      />
      <div className="flex-grow">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">
          {displayName}
        </h2>
        {/* Informações adicionais podem ir aqui, como curso, universidade, etc. */}
        {/* <p className="text-sm text-slate-500 dark:text-slate-400">Engenharia de Software - UniHub University</p> */}
      </div>
      {/* Botão para editar perfil (a funcionalidade de edição seria implementada depois) */}
      {onEditProfileClick && ( // Renderiza o botão apenas se a função for passada
        <button
          onClick={onEditProfileClick}
          className="mt-4 sm:mt-0 sm:ml-4 text-xs sm:text-sm bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold py-2 px-3 sm:px-4 rounded-lg transition-colors duration-200 flex items-center flex-shrink-0"
          aria-label="Editar perfil"
        >
          <Edit3 size={14} sm:size={16} className="mr-1.5" />
          Editar Perfil
        </button>
      )}
    </div>
  );
};

export default UserInfoCard;