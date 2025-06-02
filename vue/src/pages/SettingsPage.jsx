// unihub-novo/src/pages/SettingsPage.jsx
import { useState, useEffect } from 'react';
import {
    Globe, Link2, CreditCard, Save, Bug, RefreshCw, UserCircle,
    SlidersHorizontal, Palette // Mail foi removido dos imports principais se não for mais usado diretamente aqui
} from 'lucide-react';

// Componentes de configuração importados
import ApparenceSettingsComponent from '../components/settings/ApparenceSettings';
// AccountSettingsComponent NÃO é mais importado aqui para edição,
// pois essa funcionalidade foi movida para ProfilePage.

// --- Subcomponentes Internos da SettingsPage (mantidos como você os tinha) ---

const SectionWrapper = ({ title, icon, children, description }) => {
  const IconComponent = icon;
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg mb-6">
      <div className="flex items-start sm:items-center mb-1">
        {IconComponent && <IconComponent size={22} className="mr-3 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1 sm:mt-0" />}
        <div className="flex-grow">
            <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200">
            {title}
            </h3>
            {description && <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{description}</p>}
        </div>
      </div>
      <div className={IconComponent ? "sm:ml-[37px]" : ""}>
        {children}
      </div>
    </div>
  );
};

const LanguageSettings = ({ currentLanguage, onLanguageChange }) => { //
    const idiomas = [
        { code: 'pt-BR', name: 'Português (Brasil)' },
        { code: 'en-US', name: 'English (US)' },
        { code: 'es-ES', name: 'Español (España)' },
    ];
    return (
        <div className="mt-4">
            <label htmlFor="languageSelect" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Idioma de Exibição</label>
            <select
                id="languageSelect"
                value={currentLanguage}
                onChange={(e) => onLanguageChange(e.target.value)}
                className="w-full max-w-xs p-2.5 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-slate-700 dark:text-slate-200 text-sm"
            >
                {idiomas.map(lang => <option key={lang.code} value={lang.code}>{lang.name}</option>)}
            </select>
        </div>
    );
};

const ConnectionSettings = ({ servicos, onToggleConnect }) => { //
  return (
    <div className="space-y-3 mt-4">
      {(servicos || []).map(servico => (
        <div key={servico.id} className="flex justify-between items-center p-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
          <div className="flex items-center">
            <span className="font-medium text-slate-700 dark:text-slate-300 text-sm">{servico.nome}</span>
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
      {(servicos || []).length === 0 && <p className="text-sm text-slate-500 dark:text-slate-400">Nenhum serviço para conectar.</p>}
    </div>
  );
};

const BackupSettings = ({ backupAtivado, onToggleBackup }) => ( //
    <div className="flex items-center justify-between mt-4">
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

const SubscriptionManagement = ({ plano }) => ( //
    <div className="mt-4">
        <p className="text-sm text-slate-600 dark:text-slate-400">Seu plano atual: <span className="font-semibold text-slate-800 dark:text-slate-100">{plano}</span></p>
        <button className="mt-3 text-sm bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200">
            Ver Opções de Plano
        </button>
    </div>
);
// --- Fim dos Subcomponentes ---

const SettingsPage = ({ userData: initialUserDataProp, onUpdateUserData, setActivePage }) => {
  const [localSettings, setLocalSettings] = useState(initialUserDataProp || {});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Sincroniza localSettings se initialUserDataProp mudar
    // (ex: App.jsx recarregou userData do localStorage ou initialUserData.js)
    if (initialUserDataProp) {
        setLocalSettings(prevLocalSettings => {
            // Faz um merge inteligente para preservar edições locais não salvas se a estrutura base mudar
            const updatedSettings = { ...initialUserDataProp, ...prevLocalSettings };
            if (initialUserDataProp.aparencia && prevLocalSettings.aparencia) {
                updatedSettings.aparencia = { ...initialUserDataProp.aparencia, ...prevLocalSettings.aparencia };
                if (initialUserDataProp.aparencia.tagColors && prevLocalSettings.aparencia.tagColors) {
                    updatedSettings.aparencia.tagColors = { ...initialUserDataProp.aparencia.tagColors, ...prevLocalSettings.aparencia.tagColors };
                }
            }
            // Adicione lógicas de merge similares para outros objetos aninhados se necessário
            return updatedSettings;
        });
    }
  }, [initialUserDataProp]);

  // Handlers para Preferências Gerais (Idioma, Aparência)
  const handleLanguageChange = (newLanguage) => setLocalSettings(prev => ({ ...prev, idiomaPreferido: newLanguage }));
  const handleVisualModeChange = (newMode) => setLocalSettings(prev => ({ ...prev, aparencia: { ...(prev?.aparencia || {}), modo: newMode } }));
  const handleDateFormatChange = (newFormat) => setLocalSettings(prev => ({ ...prev, aparencia: { ...(prev?.aparencia || {}), formatoData: newFormat } }));
  const handleTagColorChange = (tagKey, newColor) => setLocalSettings(prev => ({ ...prev, aparencia: { ...(prev?.aparencia || {}), tagColors: { ...(prev?.aparencia?.tagColors || {}), [tagKey]: newColor }}}));
  
  // Handlers para outras seções
  const handleToggleServiceConnect = (serviceId) => setLocalSettings(prev => ({ ...prev, servicosConectados: (prev?.servicosConectados || []).map(s => s.id === serviceId ? { ...s, conectado: !s.conectado } : s)}));
  const handleToggleBackup = () => setLocalSettings(prev => ({ ...prev, backupAtivado: !prev.backupAtivado }));

  // handleEmailChange e handleNewPhotoSelected foram removidos daqui

  const handleSaveChanges = async () => {
    if (onUpdateUserData && !isSaving) {
        setIsSaving(true);
        // A lógica de processamento de newProfilePhotoFile foi removida daqui
        onUpdateUserData(localSettings); // Passa apenas as configurações que esta página gerencia
        setIsSaving(false);
        alert("Configurações salvas!");
    }
  };

  if (!localSettings || !localSettings.aparencia || !localSettings.servicosConectados || !localSettings.assinatura) {
      return <p className="p-6 text-center dark:text-slate-300">Carregando configurações...</p>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">Configurações</h1>
        <button
          onClick={handleSaveChanges}
          disabled={isSaving}
          className={`w-full sm:w-auto font-bold py-2.5 px-5 rounded-lg shadow-md transition-colors flex items-center justify-center
            ${isSaving ? 'bg-gray-400 text-gray-800 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 text-white'}`}
        >
          <Save size={18} className="mr-2" />
          {isSaving ? "Salvando..." : "Salvar Configurações"}
        </button>
      </div>

      <SectionWrapper title="Preferências Gerais" icon={SlidersHorizontal} description="Personalize o idioma e a aparência do aplicativo.">
        <div className="space-y-6">
            <LanguageSettings
                currentLanguage={localSettings.idiomaPreferido ?? 'pt-BR'}
                onLanguageChange={handleLanguageChange}
            />
            <ApparenceSettingsComponent
                currentMode={localSettings.aparencia?.modo ?? 'claro'}
                currentDateFormat={localSettings.aparencia?.formatoData ?? 'DD/MM/YYYY'}
                currentTagColors={localSettings.aparencia?.tagColors || {}}
                onModeChange={handleVisualModeChange}
                onDateFormatChange={handleDateFormatChange}
                onTagColorChange={handleTagColorChange}
            />
        </div>
      </SectionWrapper>

      <SectionWrapper title="Conta" icon={UserCircle} description="Informações básicas da sua conta.">
         <p className="text-sm text-slate-600 dark:text-slate-400 mt-4">
            Seu email registrado: <span className="font-medium">{localSettings.email ?? 'Não informado'}</span>
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Para editar seu email ou foto de perfil, acesse a <button
                onClick={() => {
                    if (setActivePage) { // Verifica se setActivePage foi passado como prop
                        setActivePage('profile');
                    } else {
                        console.warn("SettingsPage: setActivePage não está disponível para navegar para o perfil. Considere passar como prop ou usar contexto.");
                        alert("Navegação para Perfil não configurada nesta página. Vá manualmente.");
                    }
                }}
                className="text-blue-600 hover:underline dark:text-blue-400 font-medium"
            >
                Página de Perfil
            </button>.
        </p>
      </SectionWrapper>

      <SectionWrapper title="Conexões de Serviços" icon={Link2} description="Conecte o UniHub com outros serviços que você usa.">
        <ConnectionSettings
          servicos={localSettings.servicosConectados || []}
          onToggleConnect={handleToggleServiceConnect}
        />
      </SectionWrapper>

      <SectionWrapper title="Dados e Sincronização" icon={RefreshCw} description="Faça backup dos seus dados e sincronize entre dispositivos.">
        <BackupSettings
            backupAtivado={localSettings.backupAtivado ?? false}
            onToggleBackup={handleToggleBackup}
        />
        <button className="mt-4 text-sm text-blue-600 hover:underline flex items-center dark:text-blue-400">
          <RefreshCw size={16} className="mr-1.5" /> Sincronizar Manualmente Agora
        </button>
      </SectionWrapper>

      <SectionWrapper title="Assinatura" icon={CreditCard} description="Gerencie seu plano de assinatura e veja opções.">
        <SubscriptionManagement plano={localSettings.assinatura?.plano ?? 'N/A'} />
      </SectionWrapper>

      <SectionWrapper title="Suporte" icon={Bug} description="Precisa de ajuda ou quer reportar um problema?">
        <button className="text-sm text-blue-600 hover:underline dark:text-blue-400">
          Reportar um Bug ou Problema
        </button>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Encontrou algo errado? Nos ajude a melhorar!</p>
      </SectionWrapper>
    </div>
  );
};

export default SettingsPage;