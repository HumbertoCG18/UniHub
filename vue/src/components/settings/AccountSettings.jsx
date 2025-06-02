// src/components/settings/AccountSettings.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '/src/components/context/AppContext'; // Ajuste o caminho se necessário
import { Mail, Camera, Save, XCircle, UserCircle, Edit3, Check } from 'lucide-react';

const AccountSettings = ({ onDoneEditing }) => {
  const { userData, setUserData } = useAppContext();

  const [editedEmail, setEditedEmail] = useState(userData?.email ?? '');
  const [isEditingEmailField, setIsEditingEmailField] = useState(false);

  const [selectedPhotoFile, setSelectedPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(userData?.fotoUrl ?? null);
  const fileInputRef = useRef(null);

  // Sincroniza com o userData global se ele mudar externamente,
  // mas apenas se não estivermos no meio de uma edição local.
  useEffect(() => {
    if (!isEditingEmailField) {
      setEditedEmail(userData?.email ?? '');
    }
    // O preview da foto é atualizado com base no userData?.fotoUrl
    // apenas se um novo arquivo não foi selecionado para preview local.
    if (!selectedPhotoFile) {
        setPhotoPreview(userData?.fotoUrl ?? null);
    }
  }, [userData?.email, userData?.fotoUrl, isEditingEmailField, selectedPhotoFile]);


  const handleEditEmailToggle = () => {
    if (isEditingEmailField) { // Se estava editando e clicou para cancelar/fechar
        setEditedEmail(userData?.email ?? ''); // Reverte para o valor original
    }
    setIsEditingEmailField(!isEditingEmailField);
  };

  const handleSaveEmailOnly = () => {
    // Esta função é específica para salvar apenas o email se o botão de salvar for por campo
    // Se houver um botão de salvar geral no AccountSettings, ele tratará tudo
    setUserData(prev => ({
      ...prev,
      email: editedEmail,
    }));
    setIsEditingEmailField(false);
    // alert("Email atualizado!"); // Feedback opcional
  };


  const handlePhotoFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedPhotoFile(file); // Armazena o arquivo selecionado
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result); // Mostra preview local imediato
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerPhotoUpload = () => {
    fileInputRef.current?.click();
  };

  const handleSaveChanges = async () => {
    let fotoUrlAtualizada = userData?.fotoUrl; // Começa com a URL existente

    if (selectedPhotoFile) {
      console.log("PROCESSANDO UPLOAD DE FOTO (simulado):", selectedPhotoFile.name);
      // ***** SIMULAÇÃO DE UPLOAD DE FOTO *****
      try {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simula delay
        const simulatedFileName = `user-avatar-${Date.now()}.${selectedPhotoFile.name.split('.').pop()}`;
        fotoUrlAtualizada = `/img/pfp/${simulatedFileName}`; // Caminho estático simulado

        console.log(`Simulação: Upload da foto '${selectedPhotoFile.name}' concluído.`);
        console.log(`Simulação: Nova fotoUrl seria: '${fotoUrlAtualizada}'`);
        console.warn(`Lembrete Dev: Para esta simulação funcionar, coloque '${simulatedFileName}' em 'public/img/pfp/'.`);
      } catch (error) {
        console.error("Simulação: Erro no 'upload' da foto:", error);
        alert("Houve um erro ao tentar 'salvar' a nova foto. A alteração da foto não foi aplicada.");
        // Mantém fotoUrlAtualizada com o valor de userData?.fotoUrl
      }
      // ***** FIM DA SIMULAÇÃO DE UPLOAD *****
    }

    setUserData(prevUserData => ({
      ...prevUserData,
      email: editedEmail,
      fotoUrl: fotoUrlAtualizada, // Usa a URL da foto (existente ou "nova")
    }));

    setSelectedPhotoFile(null); // Limpa o arquivo selecionado após salvar
    setIsEditingEmailField(false); // Fecha campo de email se estiver aberto
    alert("Alterações da conta salvas!");
    if (onDoneEditing) {
      onDoneEditing(); // Informa o ProfilePage para fechar este componente de edição
    }
  };

  const handleCancelChanges = () => {
    // Reverte para os valores originais do userData
    setEditedEmail(userData?.email ?? '');
    setSelectedPhotoFile(null);
    setPhotoPreview(userData?.fotoUrl ?? null);
    setIsEditingEmailField(false);
    if (onDoneEditing) {
      onDoneEditing(); // Informa o ProfilePage para fechar
    }
  };

  return (
    <div className="p-4 md:p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 space-y-6">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 border-b pb-3 border-slate-300 dark:border-slate-600">
        Editar Informações da Conta
      </h3>

      {/* Edição de Email */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Endereço de Email
        </label>
        <div className="flex items-center gap-3">
          {isEditingEmailField ? (
            <input
              type="email"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
              className="flex-grow p-2.5 border border-blue-400 dark:border-blue-500 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-slate-700 dark:text-slate-200 text-sm"
            />
          ) : (
            <p className="flex-grow p-2.5 text-sm text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700/70 rounded-lg truncate">
              {userData?.email || 'Nenhum email definido'}
            </p>
          )}
          {isEditingEmailField ? (
            <button
                onClick={handleSaveEmailOnly} // Ou remova se só houver um "Salvar Tudo" abaixo
                className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-700/30 rounded-full"
                title="Confirmar Email"
            >
                <Check size={20} />
            </button>
          ) : (
            <button
              onClick={handleEditEmailToggle}
              className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-700/30 rounded-full"
              title="Editar Email"
            >
              <Edit3 size={18} />
            </button>
          )}
        </div>
         {isEditingEmailField && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Clique em <Check size={12} className="inline"/> para confirmar ou no botão "Salvar Alterações" abaixo.</p>}
      </div>

      {/* Alteração de Foto de Perfil */}
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Foto de Perfil
        </label>
        <div className="flex items-center gap-4">
          {photoPreview ? (
            <img
              src={photoPreview}
              alt="Prévia da foto de perfil"
              className="w-24 h-24 rounded-full object-cover border-2 border-slate-300 dark:border-slate-600"
            />
          ) : (
            <UserCircle size={96} className="text-slate-300 dark:text-slate-600 flex-shrink-0" />
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handlePhotoFileChange}
            className="hidden"
          />
          <button
            onClick={triggerPhotoUpload}
            className="flex items-center gap-2 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <Camera size={16} />
            {selectedPhotoFile ? "Trocar Foto" : "Escolher Foto"}
          </button>
        </div>
        {selectedPhotoFile && (
          <p className="text-xs text-green-600 dark:text-green-400 mt-2">
            Nova foto selecionada: {selectedPhotoFile.name}. Clique em "Salvar Alterações" abaixo.
          </p>
        )}
      </div>

      {/* Botões de Ação Gerais para AccountSettings */}
      <div className="flex justify-end items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-600 mt-6">
        <button
          onClick={handleCancelChanges}
          className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-200 hover:bg-slate-300 dark:bg-slate-600 dark:hover:bg-slate-500 rounded-lg transition-colors"
        >
          Cancelar
        </button>
        <button
          onClick={handleSaveChanges}
          className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center"
        >
          <Save size={16} className="mr-2" />
          Salvar Alterações
        </button>
      </div>
    </div>
  );
};

export default AccountSettings;