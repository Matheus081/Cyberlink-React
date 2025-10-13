import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import { motion } from 'framer-motion';
import featuredGames from '../data/BannerInfo';

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredGames.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlers = useSwipeable({
    onSwipedLeft: () => setCurrentSlide((prev) => (prev + 1) % featuredGames.length),
    onSwipedRight: () => setCurrentSlide((prev) => (prev - 1 + featuredGames.length) % featuredGames.length),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  const goToDetail = (id) => {
    navigate(`/game/${id}`);
  };

  return (
    <div className="relative w-full mb-8">
      {/* Desktop / Tablet */}
      <div className="hidden md:block relative w-full">
        <div className="relative w-full h-[80vh]  min-h-[500px] max-h-[700px] overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out h-full"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
              transition: 'transform 0.7s ease, opacity 0.7s ease',
            }}
          >
            {featuredGames.map((game, index) => (
              <div
                key={game.id}
                className="w-full h-full flex-shrink-0 relative cursor-pointer"
                onClick={() => goToDetail(game.id)}
              >
                {/* Imagem de fundo */}
                <div className="absolute inset-0">
                  <img
                    src={game.imageDesktop}
                    alt={game.title}
                    loading='lazy'
                    className={`w-full h-full object-cover ${game.position || 'object-center'}`}
                  />
                </div>

                {/* Gradiente de integração - mais escuro no topo e bottom */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-transparent to-gray-900/90" />
                
                {/* Gradiente lateral */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 via-transparent to-gray-900/50" />

                {/* Overlay escuro adicional */}
                <div className="absolute inset-0 bg-black/30" />

                {/* Conteúdo */}
                <motion.div
                  key={`desktop-${currentSlide}-${index}`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: currentSlide === index ? 1 : 0, x: currentSlide === index ? 0 : -50 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="absolute inset-0 flex items-end pb-32"
                >
                  <div className="container px-8 lg:px-16 max-w-7xl">
                    <div className="max-w-2xl">
                      <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: currentSlide === index ? 1 : 0, y: currentSlide === index ? 0 : 20 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight drop-shadow-2xl"
                      >
                        {game.title}
                      </motion.h1>

                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: currentSlide === index ? 1 : 0, y: currentSlide === index ? 0 : 20 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="text-lg text-gray-200 mb-6 line-clamp-3 drop-shadow-lg"
                      >
                        {game.subtitle}
                      </motion.p>

                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: currentSlide === index ? 1 : 0, y: currentSlide === index ? 0 : 20 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          goToDetail(game.id);
                        }}
                        className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105"
                      >
                        Ver Detalhes
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Indicadores - posição fixa no bottom */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-30">
            {featuredGames.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-300 rounded-full ${index === currentSlide
                  ? 'bg-white w-10 h-2'
                  : 'bg-white/50 w-2 h-2 hover:bg-white/80'
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Gradiente de fade-out no bottom para integração total */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none" />
      </div>

      {/* Mobile */}
      <div {...handlers} className="md:hidden relative w-full">
        <div className="relative w-full h-[45vh] min-h-[300px] overflow-hidden">
          <div
            className="flex transition-transform duration-500 h-full"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
              transition: 'transform 0.7s ease, opacity 0.7s ease',
            }}
          >
            {featuredGames.map((game, index) => (
              <div
                key={game.id}
                className="w-full h-full flex-shrink-0 relative"
                onClick={() => goToDetail(game.id)}
              >
                {/* Imagem de fundo */}
                <div className="absolute inset-0">
                  <img
                    src={game.imageMobile}
                    alt={game.title}
                    loading='lazy'
                    className={`w-full h-full object-cover ${game.position || 'object-center'}`}
                  />
                </div>

                {/* Gradientes de integração mobile */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-transparent to-gray-900/95" />
                <div className="absolute inset-0 bg-black/30" />

                {/* Conteúdo Mobile */}
                <motion.div
                  key={`mobile-${currentSlide}-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: currentSlide === index ? 1 : 0, y: currentSlide === index ? 0 : 30 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="absolute inset-0 flex flex-col justify-end p-6 pb-12"
                >
                  <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight drop-shadow-2xl">
                    {game.title}
                  </h1>
                  <p className="text-base text-gray-200 mb-4 line-clamp-2 drop-shadow-lg">
                    {game.subtitle}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Indicadores Mobile */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
            {featuredGames.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-300 rounded-full ${index === currentSlide
                  ? 'bg-white w-8 h-2'
                  : 'bg-white/50 w-2 h-2'
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Gradiente de fade-out mobile */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none" />
      </div>
    </div>
  );
};

export default Banner;