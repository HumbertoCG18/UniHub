// unihub-novo/src/components/common/StatCard.jsx

const StatCard = ({ icon, title, value, subtitle, colorClass = "text-blue-600" }) => {
  const IconComponent = icon;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
      <div>
        <div className={`flex items-center justify-center w-12 h-12 rounded-full bg-opacity-20 ${colorClass.replace('text-', 'bg-')}`}>
          {IconComponent && <IconComponent size={24} className={colorClass} />}
        </div>
        <h3 className="text-lg font-semibold text-slate-700 mt-4">{title}</h3>
        <p className={`text-3xl font-bold ${colorClass} mt-1`}>{value}</p>
      </div>
      {subtitle && <p className="text-sm text-slate-500 mt-2">{subtitle}</p>}
    </div>
  );
};

export default StatCard;