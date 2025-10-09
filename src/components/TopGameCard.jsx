import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useScroll } from './ScrollableSection';

const TopGameCard = ({ game, rank }) => {
  const navigate = useNavigate();
  const scrollRef = useScroll();

  const handleClick = () => {
    if (game?.id) {
      navigate(`/game/${game.id}`);
    }
  };

  if (!game) {
    return null;
  }

  // Função para definir a cor do rank baseado na posição
  const getRankStyle = (rank) => {
    if (rank === 1) return "from-yellow-400 via-yellow-500 to-yellow-600 shadow-yellow-500/50";
    if (rank === 2) return "from-gray-300 via-gray-400 to-gray-500 shadow-gray-500/50";
    if (rank === 3) return "from-amber-600 via-amber-700 to-amber-800 shadow-amber-600/50";
    if (rank <= 10) return "from-blue-500 via-blue-600 to-blue-700 shadow-blue-500/50";
    return "from-slate-600 via-slate-700 to-slate-800 shadow-slate-600/50";
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return "👑";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return "#";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ root: scrollRef, once: true }}
      onClick={handleClick}
      className="flex-shrink-0 w-48 sm:w-56 md:w-60 cursor-pointer group"
    >
      {/* container do card */}
      <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-lg group-hover:shadow-gray-500/20 transition-all duration-300">
        
        {/* Rank Badge */}
        <div className={`absolute top-3 right-3 bg-gradient-to-br ${getRankStyle(rank)} text-white font-bold px-3 py-1.5 rounded-lg shadow-lg border border-white/20 backdrop-blur-sm transform transition-all duration-300 group-hover:scale-110 z-10`}>
          <div className="flex items-center gap-1">
            <span className="text-xs">{getRankIcon(rank)}</span>
            <span className="text-sm">{rank}</span>
          </div>
        </div>

        {/* Efeito de brilho no rank para top 3 */}
        {rank <= 3 && (
          <div className={`absolute top-3 right-3 bg-gradient-to-br ${getRankStyle(rank)} text-white font-bold px-3 py-1.5 rounded-lg animate-pulse opacity-30 z-0`}>
            <div className="flex items-center gap-1">
              <span className="text-xs">{getRankIcon(rank)}</span>
              <span className="text-sm">{rank}</span>
            </div>
          </div>
        )}

        <img
          src={game.image}
          alt={game.title}
          className="w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
        
        {/* Hover */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Info do card */}
      <div className="mt-3">
        <h4 className="text-white font-semibold text-base truncate transition-colors duration-200">
          {game.title}
        </h4>
        <p className="text-gray-400 text-sm">{game.platform}</p>
      </div>
    </motion.div>
  );
};

export default TopGameCard;