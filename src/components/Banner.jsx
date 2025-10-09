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
    <div className="relative w-full max-w-[1200px] mx-auto rounded-lg overflow-hidden">
      {/* Desktop / Tablet */}
      <div className="hidden md:flex flex-row aspect-[16/8]">
        <div className="relative flex-1 overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {featuredGames.map((game) => (
              <div
                key={game.id}
                className="w-full flex-shrink-0 relative cursor-pointer"
                onClick={() => goToDetail(game.id)}
              >
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/50 z-10" />

                {/* Conteúdo */}
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="absolute inset-0 z-20 flex items-end pb-16"
                >
                  <div className="px-8 max-w-xl">
                    <h1 className="text-4xl font-bold text-white mb-2 leading-tight">
                      {game.title}
                    </h1>
                    <p className="text-lg text-gray-200 mb-4 line-clamp-2">
                      {game.subtitle}
                    </p>

                    {/* Botão opcional no desktop */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        goToDetail(game.id);
                      }}
                      className="bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700 cursor-pointer transition-colors duration-200"
                    >
                      Ver Detalhes
                    </button>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Miniaturas à direita */}
        <div className="flex flex-col gap-3 w-28 p-2 overflow-y-auto">
          {featuredGames.map((game, index) => (
            <div
              key={game.id}
              onClick={() => setCurrentSlide(index)}
              className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                index === currentSlide ? 'border-blue-500' : 'border-transparent'
              }`}
            >
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-20 object-cover object-center"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs text-center py-1 line-clamp-1">
                {game.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile */}
      <div {...handlers} className="md:hidden relative w-full overflow-hidden cursor-pointer">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {featuredGames.map((game) => (
            <div
              key={game.id}
              className="w-full flex-shrink-0 relative aspect-[1300/648]"
              onClick={() => goToDetail(game.id)}
            >
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/50 z-10" />

              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute inset-0 z-20 flex flex-col justify-end p-4"
              >
                <h1 className="text-2xl font-bold text-white mb-1 leading-tight">
                  {game.title}
                </h1>
                <p className="text-sm text-gray-200 mb-2 line-clamp-2">
                  {game.subtitle}
                </p>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Indicadores */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
          {featuredGames.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
