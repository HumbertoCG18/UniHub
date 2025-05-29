// unihub-novo/src/components/common/StatCard.jsx
const StatCard = ({ icon, title, value, subtitle, colorClass = "text-blue-600" }) => {
  const IconComponent = icon;

  return (
    // O card em si pode não precisar de muitas classes responsivas se o grid pai já cuida do seu tamanho
    <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
      <div>
        <div className={`
            flex items-center justify-center 
            w-10 h-10 sm:w-12 sm:h-12 // Tamanho do círculo do ícone responsivo
            rounded-full bg-opacity-20 
            ${colorClass.replace('text-', 'bg-')}
        `}>
          {IconComponent && <IconComponent size={20} sm:size={24} className={colorClass} />} {/* Tamanho do ícone responsivo */}
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-slate-700 dark:text-slate-200 mt-3 sm:mt-4"> {/* Fonte e margem responsivas */}
          {title}
        </h3>
        <p className={`
            text-2xl sm:text-3xl font-bold 
            ${colorClass} mt-1 sm:mt-1
        `}> {/* Fonte responsiva */}
          {value}
        </p>
      </div>
      {subtitle && (
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2"> {/* Fonte e margem responsivas */}
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default StatCard;