// unihub-novo/src/pages/HomePage.jsx
import React from 'react';
import { CalendarDays, TrendingUp, Target } from 'lucide-react';
import NextClassCard from '../components/home/NextClassCard';
import AulaItem from '../components/home/AulaItem';
import StatCard from '../components/common/StatCard';
import { formatDataInicio } from '../utils/dateUtils';
import { useAppContext } from '../App'; // Importe o hook do contexto

const HomePage = () => {
    const { userData } = useAppContext(); // Use o hook para obter userData

    // Verificação mais robusta: userData deve existir e ter propriedades esperadas (ex: nome)
    if (!userData || !userData.nome) {
        return (
            <div className="flex justify-center items-center h-screen"> {/* Use h-screen para ocupar a altura da tela */}
                <p className="text-slate-600 dark:text-slate-300 text-lg">Carregando dados do usuário...</p>
            </div>
        );
    }

    return (
        <>
            <div className="mb-6">
                <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-200">Olá, {userData.nome}!</h2>
                <p className="text-slate-500 dark:text-slate-400">Bem-vindo(a) de volta ao seu hub central de estudos.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <NextClassCard aula={userData.proximaAula} />
                    {userData.aulasHoje && userData.aulasHoje.length > 0 && (
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                            <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-4">Aulas de Hoje</h3>
                            <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                                {userData.aulasHoje.map((aula, index) => (
                                    <AulaItem
                                        key={aula.id || index}
                                        aula={aula}
                                        isProxima={
                                            userData.proximaAula &&
                                            userData.proximaAula.materia === aula.materia && // Corrigido para comparar a matéria
                                            userData.proximaAula.horario === aula.horario
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className="space-y-6">
                    <StatCard
                        icon={TrendingUp}
                        title="Taxa de Presença"
                        value={`${userData.taxaPresencaGeral}%`}
                        subtitle="Geral do semestre"
                        colorClass="text-green-600 dark:text-green-400"
                    />
                    <StatCard
                        icon={CalendarDays}
                        title="Início da Jornada"
                        value={formatDataInicio(userData.dataInicioEstudos)}
                        subtitle={`Desde ${new Date(userData.dataInicioEstudos).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}`}
                        colorClass="text-purple-600 dark:text-purple-400"
                    />
                    <StatCard
                        icon={Target}
                        title="Progresso do Curso"
                        value={userData.progressoCurso || "45%"} // Usar dado do userData se existir, senão mock
                        subtitle={userData.semestreCurso || "3º Semestre de 8"} // Usar dado do userData se existir, senão mock
                        colorClass="text-orange-500 dark:text-orange-400"
                    />
                </div>
            </div>
            {userData.avisos && userData.avisos.length > 0 && (
                <div className="mt-8 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200">Avisos Importantes</h3>
                    </div>
                    <ul className="space-y-2 list-disc list-inside text-slate-600 dark:text-slate-400 pl-2">
                        {userData.avisos.map((aviso, index) => (
                            <li key={index}>{aviso}</li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};
export default HomePage;