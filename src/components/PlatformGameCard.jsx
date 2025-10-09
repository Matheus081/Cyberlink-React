import React from 'react';
import { motion } from 'framer-motion';
import { useScroll } from '../hooks/useScroll';

const PlatformGameCard = ({ game, onClick }) => {
  const scrollRef = useScroll();
  const handleClick = () => {
    if (game?.id && onClick) {
      onClick(game.id);
    }
  };

  if (!game) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ root: scrollRef, once: true }}
      onClick={handleClick}
      className="flex-shrink-0 w-48 sm:w-56 md:w-60 cursor-pointer group"
    >
      {/* Container do card */}
      <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-lg group-hover:shadow-gray-500/20 transition-all duration-300">
        
        <img
          src={game.image}
          alt={game.title}
          className="w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
        
        {/* Hover overlay */}
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

export default PlatformGameCard;