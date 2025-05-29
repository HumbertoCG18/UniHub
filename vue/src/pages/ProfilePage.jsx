// unihub-novo/src/pages/ProfilePage.jsx

// Placeholders para os componentes que ainda não criamos ou que podem ser movidos
// para src/components/profile/ no futuro.
const UserInfoCard = ({ nome, fotoUrl }) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg mb-6 text-center">
    <img 
      src={fotoUrl || "https://placehold.co/100x100/E0E0E0/B0B0B0?text=U"} 
      alt={nome || "Usuário"} 
      className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-blue-500 object-cover"
      onError={(e) => { 
        e.target.onerror = null; 
        e.target.src = "https://placehold.co/100x100/E0E0E0/B0B0B0?text=U"; 
      }}
    />
    <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-200">{nome}</h2>
    <button className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline">
      Editar Perfil (Em breve)
    </button>
  </div>
);

const SubjectGradesCard = ({ materia }) => {
  const notasValidas = materia.notas?.filter(n => typeof n.valor === 'number') || [];
  const media = notasValidas.length > 0
    ? (notasValidas.reduce((acc, n) => acc + n.valor, 0) / notasValidas.length).toFixed(1)
    : 'N/A';

  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className={`text-lg font-semibold ${materia.cor ? materia.cor.replace('bg-', 'text-').replace('500', '600 dark:').replace('500', '400') : 'text-slate-700 dark:text-slate-200'}`}>
          {materia.nome}
        </h3>
        <span className={`w-4 h-4 rounded-full ${materia.cor || 'bg-slate-300 dark:bg-slate-600'}`}></span>
      </div>
      <div className="text-sm space-y-1 mb-2">
        {materia.notas?.map(nota => (
          <p key={nota.tipo} className="text-slate-600 dark:text-slate-400">
            {nota.tipo}: <span className="font-medium text-slate-800 dark:text-slate-100">{nota.valor}</span>
          </p>
        ))}
      </div>
      <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1">Média Parcial: {media}</p>
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Presença: <span className="font-medium text-slate-800 dark:text-slate-100">{materia.presenca || 'N/A'}%</span>
      </p>
    </div>
  );
};

// O componente ConnectedServicesCard foi removido desta página.
// Ele agora reside e é usado apenas pela SettingsPage.jsx.

const ProfilePage = ({ userData, onUpdateUserData }) => {
  // A função onUpdateUserData pode ser usada aqui no futuro para outras edições de perfil,
  // mas não mais para os serviços conectados.

  if (!userData) {
    return <p className="p-6 text-center">Carregando perfil...</p>;
  }

  return (
    <div className="space-y-6">
      <UserInfoCard nome={userData.nome} fotoUrl={userData.fotoUrl} />

      <div>
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-3">
          Desempenho nas Matérias
        </h2>
        {userData.materiasSemestre && userData.materiasSemestre.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {userData.materiasSemestre.map(materia => (
              <SubjectGradesCard key={materia.id} materia={materia} />
            ))}
          </div>
        ) : (
          <p className="text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 p-4 rounded-xl shadow">
            Nenhuma matéria encontrada para exibir o desempenho.
          </p>
        )}
      </div>
      
      {/* A seção de Serviços Conectados foi removida daqui. */}
      {/* Ela agora está na SettingsPage.jsx */}

    </div>
  );
};

export default ProfilePage;