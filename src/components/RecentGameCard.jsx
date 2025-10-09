import { motion } from 'framer-motion';
import { Star, Monitor, Download, Play, Tag, Gamepad2, MoreHorizontal } from 'lucide-react';
import { useScroll } from './ScrollableSection';

const RecentGameCard = ({ game, onClick }) => {
  const scrollRef = useScroll();
  if (!game) return null;

  const handleCardClick = () => {
    if (onClick) {
      onClick(game.id);
    }
  };

  const renderGenreTags = () => {
    if (!game.genre || !Array.isArray(game.genre)) return null;
    
    const maxTags = 2;
    const visibleGenres = game.genre.slice(0, maxTags);
    const remainingCount = game.genre.length - maxTags;
    
    return (
      <>
        {visibleGenres.map((genre) => (
          <span
            key={genre}
            className="flex items-center gap-1.5 text-xs font-medium bg-gray-700/80 text-gray-300 px-2.5 py-1 rounded-md"
          >
            <Tag className="w-3.5 h-3.5" />
            {genre}
          </span>
        ))}
        
        {remainingCount > 0 && (
          <span className="text-xs font-medium text-gray-400 bg-gray-600/60 px-2.5 py-1 rounded-md">
            +{remainingCount}
          </span>
        )}
      </>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ root: scrollRef, once: true }}
      onClick={handleCardClick}
      className="group relative w-full h-full bg-gray-800/60 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ease-in-out hover:scale-[1.02] hover:bg-gray-800/80 border border-gray-700/50 hover:border-cyan-400/30"
    >
      {/* tag novo */}
      <div className="absolute top-3 right-3 z-20 flex gap-2">
        {game.isNew && (
          <span className="bg-red-500 text-white text-xs px-2.5 py-1 rounded-full font-bold shadow-lg animate-pulse">
            NOVO
          </span>
        )}
      </div>

      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={game.gallery && game.gallery.length > 0 ? game.gallery[0] : game.image}
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110 loading:lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-white font-bold text-lg mb-2 line-clamp-1 transition-colors duration-200">
          {game.title}
        </h3>

        {/* Descrição */}
        {game.sobre && (
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-3">
            {game.sobre}
          </p>
        )}
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {game.platform && (
            <span className="flex items-center gap-1.5 text-xs font-medium text-white bg-blue-600/90 px-2.5 py-1 rounded-md">
              <Gamepad2 className="w-3.5 h-3.5" />
              {Array.isArray(game.platform) ? game.platform[0] : game.platform}
            </span>
          )}
          {renderGenreTags()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-700/50">
          {game.size && (
            <div className="flex items-center gap-1.5 text-gray-400 text-xs">
              <Download className="w-3.5 h-3.5" />
              <span className="font-medium">{game.size}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default RecentGameCard;