// unihub-novo/src/pages/SettingsPage.jsx
import { useState, useEffect } from 'react';
import { 
    Globe, Sun, Moon, Palette, Link2, CreditCard, Save, Bug, RefreshCw, Mail, UserCircle, 
    SlidersHorizontal // ÍCONE ADICIONADO AQUI
} from 'lucide-react';

// --- Início dos Subcomponentes (Placeholders - idealmente em arquivos separados) ---

const SectionWrapper = ({ title, icon, children }) => {
  const IconComponent = icon;
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg mb-6">
      <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center">
        {IconComponent && <IconComponent size={22} className="mr-3 text-blue-600 dark:text-blue-400" />}
        {title}
      </h3>
      {children}
    </div>
  );
};

const LanguageSettings = ({ currentLanguage, onLanguageChange }) => {
    const idiomas = [
        { code: 'pt-BR', name: 'Português (Brasil)' },
        { code: 'en-US', name: 'English (US)' },
        { code: 'es-ES', name: 'Español (España)' },
    ];
    return (
        <div>
            <label htmlFor="languageSelect" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Idioma de Exibição</label>
            <select
                id="languageSelect"
                value={currentLanguage}
                onChange={(e) => onLanguageChange(e.target.value)}
                className="w-full max-w-xs p-2.5 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-slate-700 dark:text-slate-200"
            >
                {idiomas.map(lang => <option key={lang.code} value={lang.code}>{lang.name}</option>)}
            </select>
        </div>
    );
};

const AppearanceSettings = ({ currentMode, onToggleMode, currentDateFormat, onDateFormatChange }) => {
  const dateFormats = ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD'];
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Modo de Exibição:</span>
        <div className="flex items-center space-x-2">
          <button onClick={() => onToggleMode('claro')} className={`p-2 rounded-full transition-colors ${currentMode === 'claro' ? 'bg-blue-500 text-white' : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'}`} aria-label="Modo Claro">
            <Sun size={18} />
          </button>
          <button onClick={() => onToggleMode('escuro')} className={`p-2 rounded-full transition-colors ${currentMode === 'escuro' ? 'bg-slate-700 text-white' : 'bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500'}`} aria-label="Modo Escuro">
            <Moon size={18} />
          </button>
        </div>
      </div>
      <div>
        <label htmlFor="dateFormatSelect" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Formato de Data Preferido:</label>
        <select
          id="dateFormatSelect"
          value={currentDateFormat}
          onChange={(e) => onDateFormatChange(e.target.value)}
          className="w-full max-w-xs p-2.5 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-slate-700 dark:text-slate-200"
        >
          {dateFormats.map(format => <option key={format} value={format}>{format}</option>)}
        </select>
      </div>
    </>
  );
};

const ConnectionSettings = ({ servicos, onToggleConnect }) => (
  <div className="space-y-3">
    {servicos?.map(servico => (
      <div key={servico.id} className="flex justify-between items-center p-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
        <div className="flex items-center">
          {/* <img src={servico.logoUrl} alt={`${servico.nome} logo`} className="w-6 h-6 mr-3"/> */}
          <span className="font-medium text-slate-700 dark:text-slate-300">{servico.nome}</span>
        </div>
        <button
          onClick={() => onToggleConnect(servico.id)}
          className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
            servico.conectado
              ? 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-700/30 dark:text-red-300 dark:hover:bg-red-700/50'
              : 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-700/30 dark:text-green-300 dark:hover:bg-green-700/50'
          }`}
        >
          {servico.conectado ? 'Desconectar' : 'Conectar'}
        </button>
      </div>
    ))}
  </div>
);

const AccountSettings = ({ currentEmail, onEmailChange }) => {
    const [email, setEmail] = useState(currentEmail);
    const [isEditingEmail, setIsEditingEmail] = useState(false);

    // Sincroniza o email local se a prop currentEmail mudar
    useEffect(() => {
        setEmail(currentEmail);
    }, [currentEmail]);

    const handleSaveEmail = () => {
        onEmailChange(email); // Chama a função para atualizar o estado no SettingsPage
        setIsEditingEmail(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Email:</p>
                    {isEditingEmail ? (
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 p-2 border border-slate-300 dark:border-slate-600 rounded-md dark:bg-slate-700 dark:text-slate-200 focus:ring-blue-500 focus:border-blue-500"
                        />
                    ) : (
                        <p className="font-medium text-slate-800 dark:text-slate-100">{currentEmail}</p>
                    )}
                </div>
                {isEditingEmail ? (
                    <button onClick={handleSaveEmail} className="text-sm text-green-600 hover:underline">Salvar</button>
                ) : (
                    <button onClick={() => { setEmail(currentEmail); setIsEditingEmail(true); }} className="text-sm text-blue-600 hover:underline">Editar</button>
                )}
            </div>
        </div>
    );
};

const BackupSettings = ({ backupAtivado, onToggleBackup }) => (
    <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Backup Automático na Nuvem:</span>
        <button
            onClick={onToggleBackup}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800 focus:ring-blue-500 ${backupAtivado ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-600'}`}
            aria-pressed={backupAtivado}
          >
            <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out ${backupAtivado ? 'translate-x-6' : 'translate-x-1'}`}/>
        </button>
    </div>
);

const SubscriptionManagement = ({ plano }) => (
    <div>
        <p className="text-sm text-slate-600 dark:text-slate-400">Seu plano atual: <span className="font-semibold text-slate-800 dark:text-slate-100">{plano}</span></p>
        <button className="mt-3 text-sm bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200">
            Ver Opções de Plano
        </button>
    </div>
);

// --- Fim dos Subcomponentes ---


const SettingsPage = ({ userData, onUpdateUserData }) => {
  const [localSettings, setLocalSettings] = useState(userData);

  useEffect(() => {
    setLocalSettings(userData);
  }, [userData]);

  const handleLanguageChange = (newLanguage) => {
    setLocalSettings(prev => ({ ...prev, idiomaPreferido: newLanguage }));
  };

  const handleDateFormatChange = (newFormat) => {
    setLocalSettings(prev => ({
        ...prev,
        aparencia: { ...prev.aparencia, formatoData: newFormat }
    }));
  };

  const handleToggleMode = (newMode) => {
    setLocalSettings(prev => ({
        ...prev,
        aparencia: { ...prev.aparencia, modo: newMode }
    }));
    if (newMode === 'escuro') {
        document.documentElement.classList.add('dark');
        localStorage.setItem('themeMode', 'escuro');
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('themeMode', 'claro');
    }
  };

   useEffect(() => {
    const savedMode = localStorage.getItem('themeMode');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialMode = localSettings.aparencia?.modo || 'claro'; // Modo vindo de userData

    let modeToApply = initialMode;

    if (savedMode) {
        modeToApply = savedMode;
    } else if (prefersDark) {
        modeToApply = 'escuro';
    }
    
    if (modeToApply === 'escuro') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    // Atualiza o estado local apenas se for diferente do que já está ou do que veio de userData
    if (localSettings.aparencia?.modo !== modeToApply) {
        setLocalSettings(prev => ({ ...prev, aparencia: { ...(prev.aparencia || {}), modo: modeToApply } }));
    }
  }, []); // Dependência vazia para rodar apenas na montagem inicial


  const handleToggleServiceConnect = (serviceId) => {
    const updatedServices = localSettings.servicosConectados.map(s =>
      s.id === serviceId ? { ...s, conectado: !s.conectado } : s
    );
    setLocalSettings(prev => ({ ...prev, servicosConectados: updatedServices }));
  };

  const handleToggleBackup = () => {
    setLocalSettings(prev => ({ ...prev, backupAtivado: !prev.backupAtivado }));
  };

  const handleEmailChange = (newEmail) => {
    setLocalSettings(prev => ({ ...prev, email: newEmail }));
  };

  const handleSaveChanges = () => {
    onUpdateUserData(localSettings);
    alert("Configurações salvas!");
  };

  if (!localSettings || !localSettings.aparencia || !localSettings.servicosConectados || !localSettings.assinatura) {
      return <p className="p-6 text-center">Carregando configurações...</p>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Configurações</h1>
        <button
          onClick={handleSaveChanges}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 px-5 rounded-lg shadow-md transition-colors flex items-center"
        >
          <Save size={18} className="mr-2" /> Salvar Todas as Configurações
        </button>
      </div>

      <SectionWrapper title="Preferências Gerais" icon={SlidersHorizontal}> {/* Ícone usado aqui */}
        <LanguageSettings
            currentLanguage={localSettings.idiomaPreferido}
            onLanguageChange={handleLanguageChange}
        />
        <div className="mt-4">
          <AppearanceSettings
            currentMode={localSettings.aparencia.modo}
            onToggleMode={handleToggleMode}
            currentDateFormat={localSettings.aparencia.formatoData}
            onDateFormatChange={handleDateFormatChange}
          />
        </div>
      </SectionWrapper>

      <SectionWrapper title="Conta" icon={UserCircle}>
        <AccountSettings
            currentEmail={localSettings.email}
            onEmailChange={handleEmailChange}
        />
      </SectionWrapper>

      <SectionWrapper title="Conexões de Serviços" icon={Link2}>
        <ConnectionSettings
          servicos={localSettings.servicosConectados}
          onToggleConnect={handleToggleServiceConnect}
        />
      </SectionWrapper>

      <SectionWrapper title="Dados e Sincronização" icon={RefreshCw}>
        <BackupSettings
            backupAtivado={localSettings.backupAtivado}
            onToggleBackup={handleToggleBackup}
        />
        <button className="mt-4 text-sm text-blue-600 hover:underline flex items-center dark:text-blue-400">
          <RefreshCw size={16} className="mr-1.5" /> Sincronizar Manualmente Agora
        </button>
      </SectionWrapper>

      <SectionWrapper title="Assinatura" icon={CreditCard}>
        <SubscriptionManagement plano={localSettings.assinatura.plano} />
      </SectionWrapper>

      <SectionWrapper title="Suporte" icon={Bug}>
        <button className="text-sm text-blue-600 hover:underline dark:text-blue-400">
          Reportar um Bug ou Problema
        </button>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Encontrou algo errado? Nos ajude a melhorar!</p>
      </SectionWrapper>
    </div>
  );
};

export default SettingsPage;