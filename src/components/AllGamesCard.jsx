import React from 'react';
import { Star, Monitor } from 'lucide-react';

const AllGamesCard = ({ game, onClick }) => {
  if (!game) return null;

  const handleCardClick = () => {
    // Redireciona para GameDetails com o ID do jogo
    if (onClick) {
      onClick(game.id); // Passa o ID do jogo
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group h-full relative bg-gray-800 rounded-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 border border-gray-700 hover:border-gray-600"
    >
      {/* Container da imagem */}
      <div className="relative overflow-hidden">
        {game.gallery && game.gallery.length > 0 ? (
          <img
            src={game.gallery[0]}
            alt={game.title}
            className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-56 bg-gray-700 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <div className="w-16 h-16 mx-auto mb-2 bg-gray-600 rounded-lg flex items-center justify-center">
                <Monitor className="w-8 h-8" />
              </div>
              <span className="text-sm font-medium">Sem imagem</span>
            </div>
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div className="p-4 space-y-3">
        {/* Título */}
        <h3 className="text-white font-semibold text-lg leading-tight line-clamp-2 group-hover:text-gray-200 transition-colors duration-200">
          {game.title}
        </h3>

        {/* Plataforma */}
        {game.platform && (
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Monitor className="w-4 h-4" />
            <span>{Array.isArray(game.platform) ? game.platform.join(', ') : game.platform}</span>
          </div>
        )}

        {/* Descrição */}
        {game.sobre && (
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
            {game.sobre}
          </p>
        )}

        {/* Gêneros com destaque no primeiro */}
        <div className="flex flex-wrap gap-2">
          {game.genre?.slice(0, 4).map((g, index) => (
            <span
              key={g}
              className={`px-2 py-1 rounded text-xs font-medium transition-colors duration-200 ${
                index === 0
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/30'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {g}
            </span>
          ))}
          {game.genre?.length > 4 && (
            <span className="bg-gray-600 text-gray-400 px-2 py-1 rounded text-xs font-medium">
              +{game.genre.length - 4}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllGamesCard;