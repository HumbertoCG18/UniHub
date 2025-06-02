// src/components/modals/ListItemEditModal.jsx
import React, { useState, useEffect } from 'react';
import Modal from './Modal'; // Seu componente Modal genérico
import { Save, XCircle } from 'lucide-react';

const InputField = ({ label, name, value, onChange, type = "text", required = false, placeholder = "", rows }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
      {label}{required && <span className="text-red-500">*</span>}
    </label>
    {type === "textarea" ? (
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows || 3}
        placeholder={placeholder}
        className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-sm focus:ring-2 focus:ring-blue-500 dark:text-slate-200"
        required={required}
      />
    ) : (
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-sm focus:ring-2 focus:ring-blue-500 dark:text-slate-200"
        required={required}
      />
    )}
  </div>
);

const ListItemEditModal = ({ isOpen, onClose, itemData, itemType, onSave }) => {
  const [formData, setFormData] = useState({});
  const isNewItem = !itemData || !itemData.id;

  useEffect(() => {
    // Se itemData é null (novo item) ou se itemData muda, inicializa/reseta formData
    if (isOpen) {
        if (isNewItem) {
            // Define uma estrutura inicial baseada no itemType para novos itens
            let initialStructure = {};
            if (itemType === 'habilidade') initialStructure = { nome: '', nivel: '', dataAquisicao: '', certificadoUrl: '' };
            else if (itemType === 'atividade') initialStructure = { titulo: '', tipo: '', descricao: '', instituicaoOrganizacao: '', dataInicio: '', dataFim: '', tecnologias: '', linkProjeto: '', remunerado: false, cargaHorariaSemanal: '', cargaHorariaTotal:'' };
            else if (itemType === 'certificacao') initialStructure = { nome: '', instituicao: '', status: 'Em Andamento', dataInscricao: '', dataPrevistaConclusao: '', dataConclusao: '', linkCertificado: '' };
            else if (itemType === 'horaComplementar') initialStructure = { nomeAtividade: '', tipo: '', instituicao: '', dataRealizacao: '', horasValidadas: '', comprovanteUrl: '' };
            else if (itemType === 'linkProfissional') initialStructure = { plataforma: '', url: '' };
            setFormData(initialStructure);
        } else {
            setFormData(itemData);
        }
    }
  }, [itemData, itemType, isOpen, isNewItem]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let valToSet = type === 'checkbox' ? checked : value;
    if (type === 'number' && value !== '') valToSet = parseFloat(value);

    setFormData(prev => ({ ...prev, [name]: valToSet }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let dataToSave = { ...formData };
    if (isNewItem) {
      // Gera um ID para novos itens (pode ser mais robusto, ex: uuid)
      dataToSave.id = `${itemType}-${Date.now()}`;
    }
    if (itemType === 'atividade' && typeof dataToSave.tecnologias === 'string') {
        dataToSave.tecnologias = dataToSave.tecnologias.split(',').map(t => t.trim()).filter(t => t);
    }
    onSave(itemType, dataToSave);
    onClose();
  };

  const renderFormFields = () => {
    // Tailwind classes para inputs e labels podem ser padronizadas aqui
    switch (itemType) {
      case 'habilidade':
        return (
          <>
            <InputField label="Nome da Habilidade" name="nome" value={formData.nome || ''} onChange={handleChange} required />
            <InputField label="Nível" name="nivel" value={formData.nivel || ''} onChange={handleChange} placeholder="Ex: Básico, Intermediário, Avançado"/>
            <InputField label="Data de Aquisição" name="dataAquisicao" type="date" value={formData.dataAquisicao || ''} onChange={handleChange} />
            <InputField label="URL do Certificado (Opcional)" name="certificadoUrl" type="url" value={formData.certificadoUrl || ''} onChange={handleChange} placeholder="https://..."/>
          </>
        );
      case 'atividade':
        return (
          <>
            <InputField label="Título da Atividade/Conquista" name="titulo" value={formData.titulo || ''} onChange={handleChange} required />
            <InputField label="Tipo" name="tipo" value={formData.tipo || ''} onChange={handleChange} placeholder="Ex: Monitoria, Iniciação Científica, Projeto"/>
            <InputField label="Instituição/Organização" name="instituicaoOrganizacao" value={formData.instituicaoOrganizacao || ''} onChange={handleChange}/>
            <InputField label="Descrição" name="descricao" type="textarea" value={formData.descricao || ''} onChange={handleChange} />
            <InputField label="Data de Início" name="dataInicio" type="date" value={formData.dataInicio || ''} onChange={handleChange} />
            <InputField label="Data de Fim (deixe em branco se em andamento)" name="dataFim" type="date" value={formData.dataFim || ''} onChange={handleChange} />
            <InputField label="Tecnologias (separadas por vírgula)" name="tecnologias" value={Array.isArray(formData.tecnologias) ? formData.tecnologias.join(', ') : formData.tecnologias || ''} onChange={handleChange} placeholder="Ex: React, Node.js, Python"/>
            <InputField label="Link do Projeto/Referência" name="linkProjeto" type="url" value={formData.linkProjeto || ''} onChange={handleChange} placeholder="https://github.com/..."/>
            <div>
                <label className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300">
                    <input type="checkbox" name="remunerado" checked={formData.remunerado || false} onChange={handleChange} className="mr-2 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"/>
                    Remunerado?
                </label>
            </div>
            <InputField label="Carga Horária Semanal (opcional)" name="cargaHorariaSemanal" type="number" value={formData.cargaHorariaSemanal || ''} onChange={handleChange} placeholder="Horas"/>
            <InputField label="Carga Horária Total (opcional)" name="cargaHorariaTotal" type="number" value={formData.cargaHorariaTotal || ''} onChange={handleChange} placeholder="Horas"/>
             {/* Adicionar campo para upload de documentos associados seria mais complexo */}
          </>
        );
      case 'certificacao':
        return (
          <>
            <InputField label="Nome da Certificação" name="nome" value={formData.nome || ''} onChange={handleChange} required />
            <InputField label="Instituição Emissora" name="instituicao" value={formData.instituicao || ''} onChange={handleChange} required />
            <div>
                <label htmlFor="statusCert" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Status</label>
                <select id="statusCert" name="status" value={formData.status || 'Em Andamento'} onChange={handleChange} className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-sm focus:ring-2 focus:ring-blue-500 dark:text-slate-200">
                    <option value="Em Andamento">Em Andamento</option>
                    <option value="Concluída">Concluída</option>
                </select>
            </div>
            <InputField label="Data de Inscrição" name="dataInscricao" type="date" value={formData.dataInscricao || ''} onChange={handleChange} />
            {formData.status === 'Concluída' ? (
                <InputField label="Data de Conclusão" name="dataConclusao" type="date" value={formData.dataConclusao || ''} onChange={handleChange} required/>
            ) : (
                <InputField label="Previsão de Conclusão" name="dataPrevistaConclusao" type="date" value={formData.dataPrevistaConclusao || ''} onChange={handleChange} />
            )}
            <InputField label="Link do Certificado (Opcional)" name="linkCertificado" type="url" value={formData.linkCertificado || ''} onChange={handleChange} placeholder="https://..."/>
          </>
        );
      // Adicionar cases para 'horaComplementar' e 'linkProfissional' de forma similar
      default:
        return <p>Configuração de formulário para "{itemType}" não implementada.</p>;
    }
  };

  const modalTitle = isNewItem ? `Adicionar Novo(a) ${itemType}` : `Editar ${itemType.charAt(0).toUpperCase() + itemType.slice(1)}`;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={modalTitle}>
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[60vh] overflow-y-auto p-1 custom-scrollbar">
        {renderFormFields()}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-600 dark:hover:bg-slate-500 rounded-lg transition-colors"
          >
            <XCircle size={16} className="mr-2 inline-block" /> Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center"
          >
            <Save size={16} className="mr-2" /> Salvar
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ListItemEditModal;