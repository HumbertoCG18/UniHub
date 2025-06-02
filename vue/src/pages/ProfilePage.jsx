// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../components/context/AppContext'; // Ajuste o caminho se necessário
import UserInfoCard from '../components/profile/UserInfoCard'; //
import SubjectGradesCard from '../components/profile/SubjectGradesCard'; //
import SectionWrapper from '../components/layout/cards/SectionWrapper'; //
import AccountSettingsComponent from '../components/settings/AccountSettings'; // Presume que este existe
import ListItemEditModal from '../components/modals/ListItemEditModal';   // Presume que este existe

import {
    Award, BookOpen, Briefcase, Link as LinkIcon, Trash2,
    FileText, UploadCloud, CalendarCheck, Target, BarChart2, ExternalLink, Clock, Star, Layers, FilePlus,
    Edit3, Mail, UserCircle, BriefcaseBusiness, Save, XCircle, Info, Settings, PlusCircle, Edit // Adicionado Edit e Users
} from 'lucide-react';

// Subcomponente para campos editáveis simples
const EditableFieldView = ({ value, onEditClick, isEditing, tempValue, onTempChange, onSave, onCancel, fieldType = "text", rows = 3, placeholder = "" }) => {
  if (isEditing) {
    return (
      <div className="mt-1">
        {fieldType === "textarea" ? (
          <textarea
            value={tempValue}
            onChange={(e) => onTempChange(e.target.value)}
            className="w-full p-2 border border-blue-400 dark:border-blue-500 rounded-md bg-white dark:bg-slate-700 text-sm focus:ring-2 focus:ring-blue-500 dark:text-slate-200"
            rows={rows}
            placeholder={placeholder}
          />
        ) : (
          <input
            type={fieldType}
            value={tempValue}
            onChange={(e) => onTempChange(e.target.value)}
            className="w-full p-2 border border-blue-400 dark:border-blue-500 rounded-md bg-white dark:bg-slate-700 text-sm focus:ring-2 focus:ring-blue-500 dark:text-slate-200"
            placeholder={placeholder}
          />
        )}
        <div className="flex items-center gap-2 mt-2">
          <button onClick={onSave} className="p-1.5 text-green-600 hover:bg-green-100 dark:hover:bg-green-700/30 rounded-full" title="Salvar"><Save size={18} /></button>
          <button onClick={onCancel} className="p-1.5 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-full" title="Cancelar"><XCircle size={18} /></button>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2 group min-h-[36px]"> {/* min-h para alinhar botão editar */}
      <span className="text-sm text-slate-700 dark:text-slate-200 py-1 whitespace-pre-wrap">{value || "Não Informado"}</span>
      <button onClick={onEditClick} className="p-1 text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity" title="Editar"><Edit3 size={14} /></button>
    </div>
  );
};


const ProfilePage = () => {
  const { userData, setUserData } = useAppContext();
  const fallbackText = "Não Informado";

  const [editingFieldKey, setEditingFieldKey] = useState(null);
  const [tempEditValue, setTempEditValue] = useState('');
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [isListItemModalOpen, setIsListItemModalOpen] = useState(false);
  const [modalItemType, setModalItemType] = useState(null);
  const [currentItemForModal, setCurrentItemForModal] = useState(null);
  const [isCvModalOpen, setIsCvModalOpen] = useState(false); // Para o modal de CV
  const [cvLanguage, setCvLanguage] = useState('pt-BR'); // Para o modal de CV


  useEffect(() => {
    if (!editingFieldKey) setTempEditValue('');
  }, [userData, editingFieldKey]);

  const formatDate = (dateString, options = { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' }) => {
    if (!dateString) return fallbackText;
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return fallbackText;
      return date.toLocaleDateString('pt-BR', options);
    } catch (e) { console.error("Erro ao formatar data:", dateString, e); return fallbackText; }
  };
  
  const startFieldEdit = (fieldKey, currentValue) => { setEditingFieldKey(fieldKey); setTempEditValue(currentValue ?? ''); };
  const handleFieldTempEditChange = (value) => { setTempEditValue(value); };
  const saveFieldEdit = (fieldKey) => {
    if (fieldKey) setUserData(prev => ({ ...prev, [fieldKey]: tempEditValue }));
    setEditingFieldKey(null); setTempEditValue('');
  };
  const cancelFieldEdit = () => { setEditingFieldKey(null); setTempEditValue(''); };

  const openListItemModal = (type, item = null) => {
    setModalItemType(type);
    setCurrentItemForModal(item);
    setIsListItemModalOpen(true);
  };

  const handleSaveListItem = (type, itemDataToSave) => {
    setUserData(prevUserData => {
      const listKeyMap = {
        habilidade: 'habilidades',
        atividade: 'atividadesExtracurriculares',
        certificacao: 'certificacoes',
        horaComplementar: 'horasComplementares',
        linkProfissional: 'linksProfissionais',
      };
      const listKey = listKeyMap[type];
      if (!listKey || !prevUserData) return prevUserData;

      const currentList = prevUserData[listKey] || [];
      let newList;

      if (itemDataToSave.id && currentList.some(item => item.id === itemDataToSave.id)) {
        newList = currentList.map(item => item.id === itemDataToSave.id ? itemDataToSave : item);
      } else {
        const newItem = { ...itemDataToSave, id: itemDataToSave.id || `${type}-${Date.now()}-${Math.random().toString(36).slice(2,7)}` };
        newList = [...currentList, newItem];
      }
      return { ...prevUserData, [listKey]: newList };
    });
    setIsListItemModalOpen(false);
  };

  const handleDeleteListItem = (type, itemId) => {
    if (!itemId || !window.confirm(`Tem certeza que deseja excluir este item de ${type}? Esta ação não pode ser desfeita.`)) return;
    setUserData(prevUserData => {
      const listKeyMap = { habilidade: 'habilidades', atividade: 'atividadesExtracurriculares', certificacao: 'certificacoes', horaComplementar: 'horasComplementares', linkProfissional: 'linksProfissionais'};
      const listKey = listKeyMap[type];
      if (!listKey || !prevUserData) return prevUserData;
      const currentList = prevUserData[listKey] || [];
      const newList = currentList.filter(item => item.id !== itemId);
      return { ...prevUserData, [listKey]: newList };
    });
  };
  
  const extractCvData = () => { /* ... sua função extractCvData ... */ return {}; };
  const handleGenerateCv = () => { setIsCvModalOpen(false); alert(`Gerar currículo em ${cvLanguage}. (Funcionalidade em desenvolvimento)`); };
  const handleFileUpload = (relatedItemId, fileType) => { alert(`Simulação de upload para ${fileType} do item ${relatedItemId}`); };


  if (!userData) {
    return <div className="flex justify-center items-center h-screen"><p className="text-slate-600 dark:text-slate-300 text-lg">Carregando perfil...</p></div>;
  }

  const {
    nome, fotoUrl, bio, materiasSemestre,
    curso, universidade, semestreAtual, dataPrevistaFormatura, email, // Adicionado email aqui
    habilidades = [], atividadesExtracurriculares = [], certificacoes = [],
    horasComplementares = [], linksProfissionais = [],
  } = userData;

  return (
    <div className="space-y-6 sm:space-y-8 pb-20"> {/* Aumentado pb para mais espaço */}
      <UserInfoCard
        nome={nome ?? fallbackText}
        fotoUrl={fotoUrl}
        onEditProfileClick={() => setIsEditingAccount(true)} // Este botão agora ativa o AccountSettingsComponent
      />

      {isEditingAccount && (
        <SectionWrapper title="Editar Informações da Conta" icon={Settings} description="Altere seu email ou foto de perfil abaixo. Clique em 'Salvar Alterações' dentro desta seção para aplicar.">
            <AccountSettingsComponent onDoneEditing={() => setIsEditingAccount(false)} />
        </SectionWrapper>
      )}

      <SectionWrapper title="Detalhes Pessoais" icon={Info}>
        <div className="space-y-4">
          <div>
            <strong className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-0.5">Nome Completo:</strong>
            <EditableFieldView value={nome} isEditing={editingFieldKey === 'nome'} tempValue={tempEditValue} onEditClick={() => startFieldEdit('nome', nome)} onTempChange={handleFieldTempEditChange} onSave={() => saveFieldEdit('nome')} onCancel={cancelFieldEdit}/>
          </div>
          <div>
            <strong className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-0.5">Bio / Sobre Mim:</strong>
            <EditableFieldView value={bio} isEditing={editingFieldKey === 'bio'} tempValue={tempEditValue} onEditClick={() => startFieldEdit('bio', bio)} onTempChange={handleFieldTempEditChange} onSave={() => saveFieldEdit('bio')} onCancel={cancelFieldEdit} fieldType="textarea" rows={4} placeholder="Fale um pouco sobre você..."/>
          </div>
          {/* Email é editado via AccountSettingsComponent
          <div>
            <strong className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-0.5">Email:</strong>
            <EditableFieldView value={email} isEditing={editingFieldKey === 'email'} tempValue={tempEditValue} onEditClick={() => startFieldEdit('email', email)} onTempChange={handleFieldTempEditChange} onSave={() => saveFieldEdit('email')} onCancel={cancelFieldEdit} fieldType="email"/>
          </div>
          */}
        </div>
      </SectionWrapper>

      <SectionWrapper title="Minha Jornada Acadêmica" icon={Target}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm">
            <div><strong className="block font-medium text-slate-600 dark:text-slate-400 mb-0.5">Universidade:</strong><EditableFieldView value={universidade} isEditing={editingFieldKey === 'universidade'} tempValue={tempEditValue} onEditClick={() => startFieldEdit('universidade', universidade)} onTempChange={handleFieldTempEditChange} onSave={() => saveFieldEdit('universidade')} onCancel={cancelFieldEdit}/></div>
            <div><strong className="block font-medium text-slate-600 dark:text-slate-400 mb-0.5">Curso:</strong><EditableFieldView value={curso} isEditing={editingFieldKey === 'curso'} tempValue={tempEditValue} onEditClick={() => startFieldEdit('curso', curso)} onTempChange={handleFieldTempEditChange} onSave={() => saveFieldEdit('curso')} onCancel={cancelFieldEdit}/></div>
            <div><strong className="block font-medium text-slate-600 dark:text-slate-400 mb-0.5">Semestre Atual:</strong><EditableFieldView value={semestreAtual} isEditing={editingFieldKey === 'semestreAtual'} tempValue={tempEditValue} onEditClick={() => startFieldEdit('semestreAtual', semestreAtual)} onTempChange={handleFieldTempEditChange} onSave={() => saveFieldEdit('semestreAtual')} onCancel={cancelFieldEdit}/></div>
            <div><strong className="block font-medium text-slate-600 dark:text-slate-400 mb-0.5">Previsão de Formatura:</strong><EditableFieldView value={formatDate(dataPrevistaFormatura)} isEditing={editingFieldKey === 'dataPrevistaFormatura'} tempValue={tempEditValue} onEditClick={() => startFieldEdit('dataPrevistaFormatura', dataPrevistaFormatura)} onTempChange={handleFieldTempEditChange} onSave={() => saveFieldEdit('dataPrevistaFormatura')} onCancel={cancelFieldEdit} fieldType="date"/></div>
        </div>
      </SectionWrapper>

      {/* SEÇÕES DE LISTA COM MODAL */}
      {[
        { title: "Vitrine de Habilidades", icon: Star, type: 'habilidade', list: habilidades, noItemsText: "Nenhuma habilidade cadastrada." },
        { title: "Conquistas e Atividades", icon: Award, type: 'atividade', list: atividadesExtracurriculares, noItemsText: "Nenhuma atividade registrada." },
        { title: "Certificações", icon: Layers, type: 'certificacao', list: certificacoes, noItemsText: "Nenhuma certificação registrada." },
        { title: "Horas Complementares", icon: Clock, type: 'horaComplementar', list: horasComplementares, noItemsText: "Nenhuma hora complementar." },
        { title: "Presença Online e Portfólio", icon: LinkIcon, type: 'linkProfissional', list: linksProfissionais, noItemsText: "Nenhum link profissional." },
      ].map(section => (
        <SectionWrapper key={section.type} title={section.title} icon={section.icon}>
          {(section.list && section.list.length > 0) ? (
            <ul className="space-y-3">
              {section.list.map(item => (
                <li key={item.id} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg shadow-sm group">
                  <div className="flex justify-between items-center">
                    <div className="flex-grow min-w-0"> {/* Para truncar texto se necessário */}
                      <h4 className="font-semibold text-slate-800 dark:text-slate-100 truncate" title={item.nome || item.titulo || item.plataforma}>
                        {item.nome || item.titulo || item.plataforma || fallbackText}
                      </h4>
                      {/* Detalhes específicos do tipo de item */}
                      {section.type === 'habilidade' && <span className="text-xs text-blue-600 dark:text-blue-400">{item.nivel} {item.dataAquisicao && `(${formatDate(item.dataAquisicao)})`}</span>}
                      {section.type === 'atividade' && <span className="text-xs text-slate-500 dark:text-slate-400">{item.tipo} - {formatDate(item.dataInicio)}</span>}
                      {section.type === 'certificacao' && <span className="text-xs text-slate-500 dark:text-slate-400">{item.instituicao} - {item.status}</span>}
                       {section.type === 'horaComplementar' && <span className="text-xs text-slate-500 dark:text-slate-400">{item.tipo} - {item.horasValidadas}h</span>}
                       {section.type === 'linkProfissional' && <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 dark:text-blue-400 hover:underline truncate block" title={item.url}>{item.url}</a>}
                    </div>
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 flex-shrink-0">
                      <button onClick={() => openListItemModal(section.type, item)} className="p-1.5 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-700/30 rounded-full" title={`Editar ${section.type}`}><Edit3 size={16} /></button>
                      <button onClick={() => handleDeleteListItem(section.type, item.id)} className="p-1.5 text-red-500 hover:bg-red-100 dark:hover:bg-red-700/30 rounded-full" title={`Excluir ${section.type}`}><Trash2 size={16} /></button>
                       {/* Botão de upload/ver certificado (exemplo para habilidades) */}
                       {section.type === 'habilidade' && item.certificadoUrl && (
                          <a href={item.certificadoUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 text-green-500 hover:bg-green-100 dark:hover:bg-green-700/30 rounded-full" title="Ver Certificado"><FileText size={16} /></a>
                       )}
                       {section.type === 'habilidade' && (
                           <button onClick={() => handleFileUpload(item.id, `certificado_${section.type}`)} className="p-1.5 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-600/70 rounded-full" title="Anexar Certificado"><UploadCloud size={16} /></button>
                       )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : <p className="text-slate-500 dark:text-slate-400 text-center py-3">{section.noItemsText}</p>}
          <div className="mt-4">
              <button onClick={() => openListItemModal(section.type, null)} className="text-sm text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-300 font-medium flex items-center">
                  <PlusCircle size={16} className="mr-1.5"/> Adicionar {section.title.replace("Vitrine de ", "").replace("Registro de ", "").replace("Presença Online e ","")}
              </button>
          </div>
           {/* Botão Gerar CV apenas na seção de habilidades por enquanto */}
           {section.type === 'habilidade' && (
            <div className="mt-5 text-right">
                <button onClick={() => setIsCvModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-sm inline-flex items-center shadow hover:shadow-lg transition-all">
                    <BriefcaseBusiness size={16} className="mr-2" /> Gerar Currículo
                </button>
            </div>
           )}
        </SectionWrapper>
      ))}

      {isListItemModalOpen && (
        <ListItemEditModal
          isOpen={isListItemModalOpen}
          onClose={() => setIsListItemModalOpen(false)}
          itemData={currentItemForModal}
          itemType={modalItemType}
          onSave={handleSaveListItem}
        />
      )}
      
      {/* Modal de CV (estrutura simples) */}
      {isCvModalOpen && (
        <Modal isOpen={isCvModalOpen} onClose={() => setIsCvModalOpen(false)} title="Gerar Currículo">
          <div className="space-y-4 text-sm">
            <div>
              <label htmlFor="cvLanguage" className="block font-medium text-slate-700 dark:text-slate-300 mb-1">Idioma:</label>
              <select id="cvLanguage" value={cvLanguage} onChange={(e) => setCvLanguage(e.target.value)}
                className="mt-1 block w-full p-2.5 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 dark:text-slate-200 text-sm"
              >
                <option value="pt-BR">Português (Brasil)</option>
                <option value="en-US">Inglês (US)</option>
              </select>
            </div>
            <div className="flex justify-end gap-3 pt-3">
              <button type="button" onClick={() => setIsCvModalOpen(false)} className="px-4 py-2 text-sm rounded-lg">Cancelar</button>
              <button type="button" onClick={handleGenerateCv} className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg">Gerar</button>
            </div>
          </div>
        </Modal>
      )}

       <SectionWrapper title="Desempenho no Semestre Atual" icon={BarChart2}>
        {(materiasSemestre && materiasSemestre.length > 0) ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {materiasSemestre.map(materia => (
              <SubjectGradesCard key={materia.id} materia={materia} />
            ))}
          </div>
        ) : (
          <p className="text-slate-500 dark:text-slate-400 text-center py-4">Nenhuma matéria cadastrada.</p>
        )}
      </SectionWrapper>
    </div>
  );
};

export default ProfilePage;