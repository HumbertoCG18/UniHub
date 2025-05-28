// unihub-novo/src/pages/HomePage.jsx
import { CalendarDays, TrendingUp, Target } from 'lucide-react'; // Ícones para StatCard
// Não importe User, Clock, MapPin, CheckCircle aqui, pois NextClassCard deve lidar com seus próprios ícones.

// Importe os componentes que a HomePage realmente usa:
import NextClassCard from '../components/home/NextClassCard';
import AulaItem from '../components/home/AulaItem';
import StatCard from '../components/common/StatCard';
import { formatDataInicio } from '../utils/dateUtils'; // Sua função de formatação de data

const HomePage = ({ userData }) => {
    // Garante que userData exista antes de tentar acessá-lo
    if (!userData) {
        return (
            <div className="flex justify-center items-center h-full">
                <p>Carregando dados do usuário...</p>
                {/* Ou um spinner/loading */}
            </div>
        );
    }

    return (
        <>
            {/* Saudação ao Usuário */}
            <div className="mb-6">
                <h2 className="text-2xl font-semibold text-slate-700">Olá, {userData.nome}!</h2>
                <p className="text-slate-500">Bem-vindo(a) de volta ao seu hub central de estudos.</p>
            </div>

            {/* Grid Principal da HomePage */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Coluna Esquerda: Próxima Aula e Aulas de Hoje */}
                <div className="lg:col-span-2 space-y-6">
                    <NextClassCard aula={userData.proximaAula} />

                    {userData.aulasHoje && userData.aulasHoje.length > 0 && (
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            <h3 className="text-xl font-semibold text-slate-700 mb-4">Aulas de Hoje</h3>
                            <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                                {userData.aulasHoje.map((aula, index) => (
                                    <AulaItem
                                        key={aula.id || index}
                                        aula={aula}
                                        isProxima={
                                            userData.proximaAula && // Verifica se proximaAula existe
                                            aula.materia === userData.proximaAula.materia &&
                                            aula.horario === userData.proximaAula.horario
                                        }
                                        // onRequestStudyTips foi removido para simplificar
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Coluna Direita: Estatísticas */}
                <div className="space-y-6">
                    <StatCard
                        icon={TrendingUp}
                        title="Taxa de Presença"
                        value={`${userData.taxaPresencaGeral}%`}
                        subtitle="Geral do semestre"
                        colorClass="text-green-600"
                    />
                    <StatCard
                        icon={CalendarDays}
                        title="Início da Jornada"
                        value={formatDataInicio(userData.dataInicioEstudos)}
                        subtitle={`Desde ${new Date(userData.dataInicioEstudos).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}`}
                        colorClass="text-purple-600"
                    />
                    <StatCard
                        icon={Target}
                        title="Progresso do Curso"
                        value="45%" // Dado mockado
                        subtitle="3º Semestre de 8" // Dado mockado
                        colorClass="text-orange-500"
                    />
                </div>
            </div>

            {/* Seção de Avisos Importantes */}
            {userData.avisos && userData.avisos.length > 0 && (
                <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-slate-700">Avisos Importantes</h3>
                        {/* O botão de resumir avisos com IA foi removido para simplificar */}
                    </div>
                    <ul className="space-y-2 list-disc list-inside text-slate-600 pl-2">
                        {userData.avisos.map((aviso, index) => (
                            <li key={index}>{aviso}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Os modais relacionados à IA foram removidos para simplificar */}
        </>
    );
};

export default HomePage;