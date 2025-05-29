// unihub-novo/src/components/layout/cards/SectionWrapper.jsx

const SectionWrapper = ({ title, icon, children, titleClassName = "" }) => {
  const IconComponent = icon; // Permite passar o componente do ícone como prop

  return (
    <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-xl shadow-lg mb-6">
      {title && ( // Renderiza o título apenas se ele for fornecido
        <h3 
          className={`
            text-lg sm:text-xl font-semibold 
            text-slate-700 dark:text-slate-200 
            mb-4 flex items-center 
            ${titleClassName}
          `}
        >
          {IconComponent && <IconComponent size={20} sm:size={22} className="mr-2.5 sm:mr-3 text-blue-600 dark:text-blue-400" />}
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};

export default SectionWrapper;