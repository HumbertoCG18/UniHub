// unihub-novo/src/pages/ProfilePage.jsx
import React, { useState } from 'react';
import { useAppContext } from '../components/context/AppContext';// Ajuste o caminho se o AppContext estiver em outro lugar
import UserInfoCard from '../components/profile/UserInfoCard'; //
import SubjectGradesCard from '../components/profile/SubjectGradesCard'; //
import SectionWrapper from '../components/layout/cards/SectionWrapper'; //
import Modal from '../components/modals/Modal'; //

import {
    Award, BookOpen, Briefcase, Link as LinkIcon,
    FileText, UploadCloud, CalendarCheck, Target, BarChart2, ExternalLink, Clock, Star, Layers, FilePlus, Edit3, Mail, UserCircle, BriefcaseBusiness // Adicionado BriefcaseBusiness
} from 'lucide-react';

const ProfilePage = () => {
  const { userData } = useAppContext();
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [cvLanguage, setCvLanguage] = useState('pt-BR');
  const fallbackText = "Não Informado";

  const handleEditProfileClick = () => {
    console.log("Edit Profile Clicked");
    alert("Funcionalidade de Editar Perfil (integrar com SettingsPage ou modal específico).");
  };

  const formatDate = (dateString, options = { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' }) => {
    if (!dateString) return fallbackText; // Usa o fallbackText global
    try {
      // Tenta criar a data. Se a string for inválida, Date.parse retornará NaN.
      const date = new Date(dateString);
      if (isNaN(date.getTime())) { // Verifica se a data é válida
          return fallbackText;
      }
      return date.toLocaleDateString('pt-BR', options);
    } catch (e) {
      console.error("Erro ao formatar data:", dateString, e);
      return fallbackText; // Retorna fallback em caso de erro
    }
  };


  const extractCvData = () => {
    // Esta função prepararia os dados para um eventual gerador de CV
    return {
      informacoesPessoais: {
        nome: userData?.nome,
        email: userData?.email,
        fotoUrl: userData?.fotoUrl,
        // Adicionar mais conforme necessário e disponível em userData
      },
      formacaoAcademica: {
        universidade: userData?.universidade,
        curso: userData?.curso,
        semestreAtual: userData?.semestreAtual,
        previsaoFormatura: userData?.dataPrevistaFormatura,
      },
      habilidades: userData?.habilidades || [],
      experienciaProfissionalOuAcademica: userData?.atividadesExtracurriculares?.map(ativ => ({
        titulo: ativ.titulo,
        tipo: ativ.tipo,
        instituicao: ativ.instituicaoOrganizacao,
        periodo: `${formatDate(ativ.dataInicio)} - ${ativ.dataFim ? formatDate(ativ.dataFim) : 'Atual'}`,
        descricao: ativ.descricao,
        tecnologias: ativ.tecnologias?.join(', ')
      })) || [],
      certificacoes: userData?.certificacoes?.map(cert => ({
        nome: cert.nome,
        instituicao: cert.instituicao,
        status: cert.status,
        data: cert.status === 'Concluída' ? formatDate(cert.dataConclusao) : `Prev. ${formatDate(cert.dataPrevistaConclusao)}`
      })) || [],
      linksProfissionais: userData?.linksProfissionais || [],
      // Adicionar outras seções
    };
  };

  const handleGenerateCv = () => {
    setIsCvModalOpen(false);
    const cvData = extractCvData();
    alert(`Simulação: Gerar currículo em ${cvLanguage}. (Funcionalidade de geração de PDF em desenvolvimento).`);
    console.log("Dados para CV:", JSON.stringify(cvData, null, 2));
  };

  const handleFileUpload = (relatedItemId, fileType) => {
    alert(`Simulação de upload de arquivo para ${fileType} (ID do item: ${relatedItemId}) - Funcionalidade em desenvolvimento.`);
  };

  if (!userData) { // Checa apenas userData; campos internos são tratados com '??'
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-slate-600 dark:text-slate-300 text-lg">Carregando dados do perfil...</p>
      </div>
    );
  }

  // Desestruturação direta. O fallback será aplicado no JSX.
const {
  nome, email, fotoUrl, materiasSemestre,
  curso, universidade, semestreAtual, dataPrevistaFormatura, // CONFIRA ESTES NOMES
  habilidades, atividadesExtracurriculares, certificacoes, // CONFIRA ESTES NOMES
  horasComplementares, linksProfissionais, // CONFIRA ESTES NOMES
} = userData || {};
    
  const totalHorasComplementares = (horasComplementares || []).reduce((sum, item) => sum + (Number(item.horasValidadas) || 0), 0);

  return (
    <div className="space-y-6 sm:space-y-8 pb-16"> {/* Adicionado pb-16 para espaço do BottomNav */}
      <UserInfoCard
        nome={nome ?? fallbackText}
        fotoUrl={fotoUrl} // UserInfoCard já tem fallback interno para fotoUrl
        onEditProfileClick={handleEditProfileClick}
      />

       <SectionWrapper title="Informações de Contato" icon={UserCircle}>
         <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center">
            <Mail size={14} className="mr-2 text-slate-500" />Email:
            <span className="ml-1 font-medium text-slate-800 dark:text-slate-200">{email ?? fallbackText}</span>
        </p>
         {/* Adicionar telefone se existir em userData:
         <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center mt-2">
            <Phone size={14} className="mr-2 text-slate-500" />Telefone:
            <span className="ml-1 font-medium text-slate-800 dark:text-slate-200">{userData.telefone ?? fallbackText}</span>
        </p>
        */}
       </SectionWrapper>


      <SectionWrapper title="Minha Jornada Acadêmica" icon={Target}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-sm">
          <p><strong className="font-medium text-slate-700 dark:text-slate-300">Universidade:</strong> {universidade ?? fallbackText}</p>
          <p><strong className="font-medium text-slate-700 dark:text-slate-300">Curso:</strong> {curso ?? fallbackText}</p>
          <p><strong className="font-medium text-slate-700 dark:text-slate-300">Semestre Atual:</strong> {semestreAtual ?? fallbackText}</p>
          <p><strong className="font-medium text-slate-700 dark:text-slate-300">Previsão de Formatura:</strong> {formatDate(dataPrevistaFormatura)}</p>
        </div>
      </SectionWrapper>

      <SectionWrapper title="Vitrine de Habilidades" icon={Star}>
        {(habilidades && habilidades.length > 0) ? (
          <ul className="space-y-3">
            {habilidades.map(skill => (
              <li key={skill.id} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-100">{skill.nome ?? fallbackText}</h4>
                    <span className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-700/30 dark:text-blue-300 px-2 py-0.5 rounded-full ml-1">{skill.nivel ?? 'N/D'}</span>
                    {skill.dataAquisicao && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Adquirida em: {formatDate(skill.dataAquisicao)}</p>}
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    {skill.certificadoUrl && (
                      <a href={skill.certificadoUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 rounded-full hover:bg-blue-100 dark:hover:bg-blue-700/30" title="Ver certificado">
                        <FileText size={18} />
                      </a>
                    )}
                    <button onClick={() => handleFileUpload(skill.id, 'certificado_habilidade')} className="p-1.5 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700" title="Anexar certificado">
                      <UploadCloud size={18} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : <p className="text-slate-500 dark:text-slate-400 text-center py-3">{fallbackText} em habilidades.</p>}
        <div className="mt-5 text-right">
          <button
            onClick={() => setIsCvModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-sm inline-flex items-center shadow hover:shadow-lg transition-all"
          >
            <BriefcaseBusiness size={16} className="mr-2" /> Gerar Currículo
          </button>
        </div>
      </SectionWrapper>

      <SectionWrapper title="Conquistas e Atividades Extracurriculares" icon={Award}>
        {(atividadesExtracurriculares && atividadesExtracurriculares.length > 0) ? (
          <div className="space-y-4">
            {atividadesExtracurriculares.map(ativ => (
              <div key={ativ.id} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h4 className="text-md font-semibold text-slate-800 dark:text-slate-100">{ativ.titulo ?? fallbackText}
                  <span className="ml-2 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-700/30 dark:text-green-300 px-2 py-0.5 rounded-full">{ativ.tipo ?? fallbackText}</span>
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{ativ.instituicaoOrganizacao ?? fallbackText}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {formatDate(ativ.dataInicio)} - {ativ.dataFim ? formatDate(ativ.dataFim) : 'Atual'}
                  {ativ.cargaHorariaSemanal && ` (${ativ.cargaHorariaSemanal}h/semana)`}
                  {ativ.cargaHorariaTotal && ` (Total: ${ativ.cargaHorariaTotal}h)`}
                  {ativ.remunerado && <span className="ml-2 text-sm text-green-600 dark:text-green-400 font-semibold">(R$)</span>}
                </p>
                {ativ.orientador && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Orientador(a): {ativ.orientador}</p>}
                <p className="text-sm text-slate-700 dark:text-slate-300 mt-1.5 whitespace-pre-line">{ativ.descricao ?? fallbackText}</p>
                {ativ.tecnologias && ativ.tecnologias.length > 0 && (
                  <p className="text-xs mt-1 text-slate-600 dark:text-slate-300"><strong>Tecnologias:</strong> {ativ.tecnologias.join(', ')}</p>
                )}
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 items-center">
                    {ativ.linkProjeto && <a href={ativ.linkProjeto} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline flex items-center"><ExternalLink size={12} className="mr-1"/>Ver Projeto</a>}
                    {ativ.documentosAssociados && ativ.documentosAssociados.map((doc, idx) => (
                         <a key={idx} href={doc.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline flex items-center"><FileText size={12} className="mr-1"/>{doc.nome}</a>
                    ))}
                     <button onClick={() => handleFileUpload(ativ.id, 'documento_atividade')} className="text-xs text-slate-500 hover:text-blue-500 flex items-center"><FilePlus size={12} className="mr-1"/>Anexar Documento</button>
                </div>
              </div>
            ))}
          </div>
        ) : <p className="text-slate-500 dark:text-slate-400 text-center py-3">{fallbackText} em atividades extracurriculares.</p>}
      </SectionWrapper>

      <SectionWrapper title="Certificações" icon={Layers}>
         {(certificacoes && certificacoes.length > 0) ? (
          <ul className="space-y-3">
            {certificacoes.map(cert => (
              <li key={cert.id} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-slate-800 dark:text-slate-100">{cert.nome ?? fallbackText}
                  <span className={`ml-2 text-xs px-2 py-0.5 rounded-full font-medium ${cert.status === 'Concluída' ? 'bg-green-100 text-green-700 dark:bg-green-700/30 dark:text-green-300' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-700/30 dark:text-yellow-400'}`}>
                    {cert.status ?? fallbackText}
                  </span>
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">{cert.instituicao ?? fallbackText}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {cert.status === 'Concluída' ? `Concluída em: ${formatDate(cert.dataConclusao)}` : `Prev. Conclusão: ${formatDate(cert.dataPrevistaConclusao)}`}
                   {` (Inscrição: ${formatDate(cert.dataInscricao)})`}
                </p>
                <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1">
                    {cert.linkCertificado && <a href={cert.linkCertificado} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline flex items-center"><FileText size={12} className="mr-1"/>Ver Certificado</a>}
                    {cert.linkCertificacao && <a href={cert.linkCertificacao} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline flex items-center"><ExternalLink size={12} className="mr-1"/>Página da Certificação</a>}
                </div>
              </li>
            ))}
          </ul>
        ) : <p className="text-slate-500 dark:text-slate-400 text-center py-3">{fallbackText} em certificações.</p>}
      </SectionWrapper>

      <SectionWrapper title="Horas Complementares" icon={Clock}>
        <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/40 rounded-lg text-center shadow">
            <p className="text-md font-medium text-blue-700 dark:text-blue-300">Total de Horas Validadas:</p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-1">{totalHorasComplementares} horas</p>
        </div>
        {(horasComplementares && horasComplementares.length > 0) ? (
          <ul className="space-y-3">
            {horasComplementares.map(hora => (
              <li key={hora.id} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center">
                    <div>
                        <h4 className="font-semibold text-slate-800 dark:text-slate-100">{hora.nomeAtividade ?? fallbackText}</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400">{(hora.tipo ?? fallbackText)} - {(hora.instituicao ?? fallbackText)}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Realizada em: {formatDate(hora.dataRealizacao)} | <strong className="text-slate-600 dark:text-slate-300">Horas: {hora.horasValidadas ?? '0'}</strong>
                        </p>
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                        {hora.comprovanteUrl && <a href={hora.comprovanteUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 rounded-full hover:bg-blue-100 dark:hover:bg-blue-700/30" title="Ver comprovante"><FileText size={18}/></a>}
                        <button onClick={() => handleFileUpload(hora.id, 'comprovante_horas')} className="p-1.5 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700" title="Anexar comprovante"><UploadCloud size={18}/></button>
                    </div>
                </div>
              </li>
            ))}
          </ul>
        ) : <p className="text-slate-500 dark:text-slate-400 text-center py-3">{fallbackText} em horas complementares.</p>}
      </SectionWrapper>

      <SectionWrapper title="Presença Online e Portfólio" icon={LinkIcon}>
        {(linksProfissionais && linksProfissionais.length > 0) ? (
          <div className="flex flex-wrap gap-3">
            {linksProfissionais.map(link => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg text-sm font-medium flex items-center transition-colors shadow-sm hover:shadow"
              >
                <ExternalLink size={14} className="mr-1.5" /> {link.plataforma ?? fallbackText}
              </a>
            ))}
          </div>
        ) : <p className="text-slate-500 dark:text-slate-400 text-center py-3">{fallbackText} em links profissionais.</p>}
      </SectionWrapper>

      {isCvModalOpen && (
        <Modal isOpen={isCvModalOpen} onClose={() => setIsCvModalOpen(false)} title="Gerar Currículo">
          <div className="space-y-4 text-sm">
            <div>
              <label htmlFor="cvLanguage" className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Idioma do Currículo:
              </label>
              <select
                id="cvLanguage"
                value={cvLanguage}
                onChange={(e) => setCvLanguage(e.target.value)}
                className="mt-1 block w-full p-2.5 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-700 dark:text-slate-200 text-sm"
              >
                <option value="pt-BR">Português (Brasil)</option>
                <option value="en-US">Inglês (US)</option>
                <option value="es-ES">Espanhol (España)</option>
              </select>
            </div>
            <div className="flex justify-end space-x-3 pt-3">
              <button type="button" onClick={() => setIsCvModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-600 dark:hover:bg-slate-500 rounded-lg transition-colors">Cancelar</button>
              <button type="button" onClick={handleGenerateCv} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">Gerar</button>
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
          <p className="text-slate-500 dark:text-slate-400 text-center py-4">
            Nenhuma matéria encontrada para este semestre.
          </p>
        )}
      </SectionWrapper>
    </div>
  );
};

export default ProfilePage;