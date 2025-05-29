// unihub-novo/src/pages/HomePage.jsx
import { CalendarDays, TrendingUp, Target } from 'lucide-react';
import NextClassCard from '../components/home/NextClassCard'; // Ajuste o caminho se necessário
import AulaItem from '../components/home/AulaItem';         // Ajuste o caminho se necessário
import StatCard from '../components/common/StatCard';       // Ajuste o caminho se necessário
import { formatDataInicio } from '../utils/dateUtils';

const HomePage = ({ userData }) => {
    if (!userData) {
        return (
            <div className="flex justify-center items-center h-full">
                <p className="text-slate-600 dark:text-slate-300">Carregando dados do usuário...</p>
            </div>
        );
    }

    return (
        <>
        {/* Saudação ao Usuário */}
        
            <div className="mb-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-slate-700 dark:text-slate-200">
                    Olá, {userData.nome}!
                </h2>
                <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
                    Bem-vindo(a) de volta ao seu hub central de estudos.
                </p>
            </div>

            {/* Grid Principal da HomePage - Responsivo */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                {/* Coluna Esquerda (ocupa mais espaço em telas grandes) */}
                <div className="lg:col-span-2 space-y-4 md:space-y-6">
                    <NextClassCard aula={userData.proximaAula} />

                    {userData.aulasHoje && userData.aulasHoje.length > 0 && (
                        <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-xl shadow-lg">
                            <h3 className="text-lg sm:text-xl font-semibold text-slate-700 dark:text-slate-200 mb-3 sm:mb-4">
                                Aulas de Hoje
                            </h3>
                            <div className="space-y-3 max-h-80 sm:max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                                {userData.aulasHoje.map((aula, index) => (
                                    <AulaItem
                                        key={aula.id || index}
                                        aula={aula}
                                        isProxima={
                                            userData.proximaAula &&
                                            aula.materia === userData.proximaAula.materia &&
                                            aula.horario === userData.proximaAula.horario
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Coluna Direita (StatCards) */}
                <div className="space-y-4 md:space-y-6">
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
                        value="45%" // Dado mockado
                        subtitle="3º Semestre de 8" // Dado mockado
                        colorClass="text-orange-500 dark:text-orange-400"
                    />
                </div>
            </div>

            {/* Seção de Avisos Importantes */}
            {userData.avisos && userData.avisos.length > 0 && (
                <div className="mt-6 md:mt-8 bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-xl shadow-lg">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-3 sm:mb-4">
                        <h3 className="text-lg sm:text-xl font-semibold text-slate-700 dark:text-slate-200 mb-2 sm:mb-0">
                            Avisos Importantes
                        </h3>
                        {/* Botão de resumir avisos (IA) foi removido para simplificar */}
                    </div>
                    <ul className="space-y-2 list-disc list-inside text-sm sm:text-base text-slate-600 dark:text-slate-400 pl-2">
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