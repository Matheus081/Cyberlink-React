import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useScroll } from '../hooks/useScroll';

const PlatformGameCard = ({ game, onClick }) => {
  const scrollRef = useScroll();
  const [imageLoaded, setImageLoaded] = useState(false);

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
      <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">

        {/* Skeleton loader */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse" />
        )}

        {/* Imagem com tratamento avançado */}
        <img
          src={game.image}
          alt={game.title}
          onLoad={() => setImageLoaded(true)}
          className="w-full h-full object-center transition-transform duration-500 ease-out group-hover:scale-110"
          style={{
            imageRendering: '-webkit-optimize-contrast',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
            willChange: 'transform'
          }}
        />

        {/* Gradiente sutil na parte inferior */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Brilho sutil no hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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

export default PlatformGameCard;