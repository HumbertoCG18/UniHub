// unihub-novo/src/pages/SettingsPage.jsx
import { useState, useEffect } from 'react';
import {
    Globe, Link2, CreditCard, Save, Bug, RefreshCw, Mail, UserCircle,
    SlidersHorizontal, Palette
} from 'lucide-react';

import ApparenceSettingsComponent from '../components/settings/ApparenceSettings';
// Importe o AccountSettingsComponent do seu novo local
import AccountSettingsComponent from '../components/settings/AccountSettings';

// --- Subcomponentes (LanguageSettings, ConnectionSettings, etc. como você já os tem) ---

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

const SettingsPage = ({ userData: initialUserDataProp, onUpdateUserData }) => {
  const [localSettings, setLocalSettings] = useState(initialUserDataProp || {});
  const [newProfilePhotoFile, setNewProfilePhotoFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (initialUserDataProp) {
        // Atualiza localSettings se a prop mudar, mas preserva edições locais não salvas
        // Se fotoUrl externa mudou E não temos um newProfilePhotoFile (ou seja, não estamos editando foto)
        // então atualiza localSettings.fotoUrl.
        // Para outros campos, podemos usar uma abordagem de merge mais simples ou confiar
        // que initialUserDataProp é a fonte da verdade para campos não editados.
        setLocalSettings(prevLocalSettings => {
            const newSettings = {...initialUserDataProp}; // Começa com os dados mais recentes do prop
            // Mantém edições locais que não foram sobrescritas pelo prop
            if (prevLocalSettings.email !== initialUserDataProp.email) newSettings.email = prevLocalSettings.email;
            // Similar para outros campos se você tiver edição mais granular
            // Para aparencia, é um objeto, então merge com cuidado
            newSettings.aparencia = {
                ...(initialUserDataProp.aparencia || {}),
                ...(prevLocalSettings.aparencia || {}),
            };
            if (newProfilePhotoFile) {
                // Se estivermos no meio de uma edição de foto, não sobrescreva fotoUrl com a do prop
                newSettings.fotoUrl = prevLocalSettings.fotoUrl;
            }
             return newSettings;
        });
    }
  }, [initialUserDataProp]);


  const handleLanguageChange = (newLanguage) => setLocalSettings(prev => ({ ...prev, idiomaPreferido: newLanguage }));
  const handleVisualModeChange = (newMode) => setLocalSettings(prev => ({ ...prev, aparencia: { ...(prev?.aparencia || {}), modo: newMode } }));
  const handleDateFormatChange = (newFormat) => setLocalSettings(prev => ({ ...prev, aparencia: { ...(prev?.aparencia || {}), formatoData: newFormat } }));
  const handleTagColorChange = (tagKey, newColor) => setLocalSettings(prev => ({ ...prev, aparencia: { ...(prev?.aparencia || {}), tagColors: { ...(prev?.aparencia?.tagColors || {}), [tagKey]: newColor }}}));
  const handleEmailChange = (newEmail) => setLocalSettings(prev => ({ ...prev, email: newEmail }));
  const handleToggleServiceConnect = (serviceId) => setLocalSettings(prev => ({ ...prev, servicosConectados: (prev?.servicosConectados || []).map(s => s.id === serviceId ? { ...s, conectado: !s.conectado } : s)}));
  const handleToggleBackup = () => setLocalSettings(prev => ({ ...prev, backupAtivado: !prev.backupAtivado }));

  const handleNewPhotoSelected = (photoFile) => {
    setNewProfilePhotoFile(photoFile);
    // O preview é gerenciado internamente pelo AccountSettingsComponent.
    // Se SettingsPage precisasse mostrar o preview também, você poderia
    // atualizar localSettings.fotoUrl com URL.createObjectURL(photoFile) aqui,
    // mas lembre-se de revogar o object URL antigo no useEffect cleanup ou antes de criar um novo.
  };

  const handleSaveChanges = async () => {
    if (onUpdateUserData && !isSaving) {
        setIsSaving(true);
        let settingsToUpdate = { ...localSettings };

        if (newProfilePhotoFile) {
            console.log("PROCESSANDO 'UPLOAD' DE FOTO:", newProfilePhotoFile.name);
            try {
                await new Promise(resolve => setTimeout(resolve, 1500)); // Simula delay

                const simulatedFileName = `user-profile-photo.${newProfilePhotoFile.name.split('.').pop()}`; // Ex: user-profile-photo.png
                const newStaticPhotoUrl = `./data/img/pfp/${simulatedFileName}`; // Caminho relativo à pasta public

                console.log(`Simulação: Nova fotoUrl definida como: '${newStaticPhotoUrl}'`);
                console.warn(`Lembrete Desenvolvedor: Para esta simulação de foto funcionar visualmente, coloque uma imagem como '${simulatedFileName}' dentro da pasta 'public/img/pfp/' do seu projeto Vite.`);

                settingsToUpdate.fotoUrl = newStaticPhotoUrl;
                setNewProfilePhotoFile(null);
            } catch (error) {
                console.error("Simulação: Erro no 'upload' da foto:", error);
                alert("Houve um erro ao tentar 'salvar' a nova foto. A foto anterior será mantida.");
            }
        }
        
        onUpdateUserData(settingsToUpdate);
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
            ${isSaving 
              ? 'bg-gray-400 text-gray-800 cursor-not-allowed' 
              : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
        >
          <Save size={18} className="mr-2" />
          {isSaving ? "Salvando..." : "Salvar Todas as Configurações"}
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

      <SectionWrapper title="Conta" icon={UserCircle} description="Gerencie as informações da sua conta e foto de perfil.">
        {/* Removida a definição local de AccountSettings, usamos o componente importado */}
        <AccountSettingsComponent
            currentEmail={localSettings.email ?? ''}
            currentPhotoUrl={localSettings.fotoUrl ?? ''} // Passa a fotoUrl de localSettings
            onEmailChange={handleEmailChange}
            onNewPhotoSelected={handleNewPhotoSelected}   // Passa o handler da foto
        />
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