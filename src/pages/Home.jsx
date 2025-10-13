import { Calendar, Gamepad2, Joystick, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import data from '../data/genersData';
import info from '../data/InfoGames';
import Banner from '../components/Banner';
import GameCard from '../components/GameCard';
import TopGameCard from '../components/TopGameCard';
import RecentGameCard from '../components/RecentGameCard';
import ScrollableSection from '../components/ScrollableSection';
import PlatformGameCard from '../components/PlatformGameCard';
import BackToTopButton from "../components/BackToTopButton";

const StatCard = ({ icon: CardIcon, label, value, color, gradient }) => (
  <div className="group relative overflow-hidden bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-xl p-4 border border-gray-700/30 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10">
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
    <div className="relative flex items-center gap-3">
      <div className={`p-2 rounded-lg ${color} shadow-lg`}>
        <CardIcon className="w-5 h-5 text-white" />
      </div>
      <div>
        <p className="text-gray-400 text-xs font-medium">{label}</p>
        <p className="text-white text-xl font-bold">{value}</p>
      </div>
    </div>
  </div>
);

const Home = () => {
  const navigate = useNavigate();

  const navigateToGameDetails = (gameId) => {
    navigate(`/game/${gameId}`);
  };

  const getStats = () => {
    const uniquePlatforms = [...new Set(info.map(game => game.platform))];
    const totalGames = info.length;
    const newGamesThisWeek = info.filter(game => game.isNew).length;

    return { platforms: uniquePlatforms.length, totalGames, newGames: newGamesThisWeek };
  };

  const getGameCountByGenre = (genreName) => {
    return info.filter(game => {
      if (Array.isArray(game.genre)) return game.genre.some(g => g.toLowerCase() === genreName.toLowerCase());
      if (typeof game.genre === "string") return game.genre.toLowerCase() === genreName.toLowerCase();
      return false;
    }).length;
  };

  const getGenresWithGameCount = () => {
    return data.map(genre => ({
      ...genre,
      gameCount: getGameCountByGenre(genre.name || genre.title || genre.filter)
    }));
  };

  const getTopGames = () => {
    if (!info || !Array.isArray(info)) return [];
    return info
      .filter(game => game?.rank)
      .sort((a, b) => a.rank - b.rank)
      .slice(0, 10);
  };

  const getRecentGames = () => {
    if (!info || !Array.isArray(info)) return [];
    return info.filter(game => game?.isNew);
  };

  const stats = getStats();
  const genresWithCount = getGenresWithGameCount();
  const uniquePlatforms = [...new Set(info.map(game => game.platform))];

  return (
    <div className="bg-gray-900 flex flex-col min-h-screen">
      <div className="pt-16 flex-grow">
        <div className="mb-12">
          <Banner />
        </div>

        {/* Estatísticas principais */}
        <div className="px-6 mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            <StatCard
              icon={Joystick}
              label="Plataformas Disponíveis"
              value={stats.platforms}
              color="bg-gradient-to-r from-blue-600 to-blue-700"
              gradient="from-blue-600 to-blue-700"
            />
            <StatCard
              icon={Gamepad2}
              label="Jogos Disponíveis"
              value={stats.totalGames.toLocaleString()}
              color="bg-gradient-to-r from-purple-600 to-purple-700"
              gradient="from-purple-600 to-purple-700"
            />
            <StatCard
              icon={Calendar}
              label="Novos Esta Semana"
              value={stats.newGames}
              color="bg-gradient-to-r from-green-600 to-green-700"
              gradient="from-green-600 to-green-700"
            />
          </div>
        </div>

        {/* Seção de gêneros */}
        <ScrollableSection title="Explorar por Gênero"
          extraButton={
            <button
              onClick={() => navigate('/all-games')}
              className="group flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-blue-600 text-blue-400 hover:text-white border border-gray-700/30 hover:border-blue-500 rounded-lg transition-all duration-300 font-medium"
            >
              Ver todos
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          }
        >
          <>
            {genresWithCount.map((genre) => (
              <div key={genre.filter}
                className="flex-shrink-0"
                style={{ minWidth: '170px', maxWidth: '300px' }}>
                <GameCard
                  genre={genre}
                  onClick={() => navigate(`/all-games?genre=${encodeURIComponent(genre.name)}`)}
                />
              </div>
            ))}
          </>
        </ScrollableSection>

        {/* Seções por Plataforma */}
        {uniquePlatforms.map(platform => {
          const platformGames = info.filter(game => game.platform === platform);
          return (
            <ScrollableSection
              key={platform}
              title={`Jogos de ${platform}`}
              extraButton={
                <button
                  onClick={() => navigate(`/all-games?platform=${encodeURIComponent(platform)}`)}
                  className="group flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-blue-600 text-blue-400 hover:text-white border border-gray-700/30 hover:border-blue-500 rounded-lg transition-all duration-300 font-medium"
                >
                  Ver todos
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              }
            >
               <>
                <div className="flex gap-4 md:gap-6 pb-4">
                  {platformGames.slice(0, 8).map((game, index) => (
                    <div
                      key={game?.id || index}
                      className="flex-shrink-0 w-48 sm:w-52 md:w-56"
                    >
                      <PlatformGameCard
                        game={game}
                        onClick={navigateToGameDetails}
                      />
                    </div>
                  ))}
                </div>
              </>
            </ScrollableSection>
          );
        })}

        {/* Top Jogos */}
        <ScrollableSection
          title={`🏆 Top 10 Jogos`}
          gap={0}
        >
          <>
            {getTopGames().length > 0 ? (
              getTopGames().map((game) => (
                <div key={game.id} className="flex-shrink-0 w-52 sm:w-60 md:w-64">
                  <TopGameCard
                    game={game}
                    rank={game.rank}
                    onClick={() => navigate(`/game/${game.id}`)}
                  />
                </div>
              ))
            ) : (
              <div className="text-gray-400 text-center py-8 min-w-full">
                Nenhum jogo encontrado no ranking.
              </div>
            )}
          </>
        </ScrollableSection>


        {/* Jogos recém adicionados */}
        <ScrollableSection
          title="Recém Adicionados"
          extraButton={
            <button
              onClick={() => navigate('/novidades')}
              className="group flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-blue-600 text-blue-400 hover:text-white border border-gray-700/30 hover:border-blue-500 rounded-lg transition-all duration-300 font-medium"
            >
              Ver todos
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          }
        >
          <>
            {getRecentGames().slice(0, 6).map((game, index) => (
              <div
                key={game?.id || index}
                className="flex-shrink-0 w-64 sm:w-72 md:w-80 lg:w-96"
              >
                <RecentGameCard
                  game={game}
                  onClick={() => navigate(`/game/${game?.id}`)}
                />
              </div>
            ))}
          </>
        </ScrollableSection>
      </div>
      <BackToTopButton />
    </div>
  );
};

export default Home;