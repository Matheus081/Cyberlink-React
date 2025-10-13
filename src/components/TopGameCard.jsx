import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useScroll } from '../hooks/useScroll';

const TopGameCard = ({ game, rank }) => {
  const navigate = useNavigate();
  const scrollRef = useScroll();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleClick = () => {
    if (game?.id) {
      navigate(`/game/${game.id}`);
    }
  };

  if (!game) {
    return null;
  }

  const getRankStyle = (rank) => {
    if (rank === 1) return "from-yellow-400 via-yellow-500 to-yellow-600";
    if (rank === 2) return "from-gray-300 via-gray-400 to-gray-500";
    if (rank === 3) return "from-amber-600 via-amber-700 to-amber-800";
    if (rank <= 10) return "from-blue-500 via-blue-600 to-blue-700";
    return "from-slate-600 via-slate-700 to-slate-800";
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
      {/* Container externo */}
      <div className="relative w-full rounded-lg overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
        
        {/* Padding box para manter aspect ratio */}
        <div className="relative w-full" style={{ paddingBottom: '150%' }}>
          
          {/* Container da imagem com posicionamento absoluto */}
          <div className="absolute inset-0 overflow-hidden">
            
            {/* Skeleton loader */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse" />
            )}
            
            {/* Wrapper da imagem */}
            <div className="absolute inset-0">
              <img
                src={game.image}
                alt={game.title}
                onLoad={() => setImageLoaded(true)}
                className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-110"
                style={{
                  objectPosition: 'center center',
                  imageRendering: '-webkit-optimize-contrast',
                  backfaceVisibility: 'hidden',
                  willChange: 'transform'
                }}
              />
            </div>
            
            {/* Rank Badge */}
            <div className="absolute top-2 right-2 z-20">
              <div className={`bg-gradient-to-br ${getRankStyle(rank)} text-white font-bold px-2.5 py-1 rounded-md shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-110`}>
                <div className="flex items-center gap-1">
                  <span className="text-xs">{getRankIcon(rank)}</span>
                  <span className="text-sm font-bold">{rank}</span>
                </div>
              </div>
              
              {/* Efeito de brilho para top 3 */}
              {rank <= 3 && (
                <div className={`absolute inset-0 bg-gradient-to-br ${getRankStyle(rank)} rounded-md animate-pulse opacity-40 blur-sm`} />
              )}
            </div>
            
            {/* Gradiente sutil na parte inferior */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Brilho sutil no hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>
      </div>

      {/* Título do card */}
      <div className="mt-2">
        <h4 className="text-white text-sm font-medium truncate">
          {game.title}
        </h4>
      </div>
    </motion.div>
  );
};

export default TopGameCard;