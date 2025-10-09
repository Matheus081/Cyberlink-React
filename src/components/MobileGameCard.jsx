const MobileGameCard = ({ game, onClick }) => {
  if (!game) {
    return null;
  }

  const handleCardClick = () => {
    if (onClick) {
      onClick(game.id);
    }
  };

  return (
    <div onClick={handleCardClick} className="group cursor-pointer">
      {/* Image container */}
      <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-gray-800">
        <img
          src={game.image}
          alt={game.title}
          className="w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Info */}
      <div className="mt-2">
        <h4 className="text-white font-semibold text-sm truncate transition-colors duration-200">
          {game.title}
        </h4>
        <p className="text-gray-400 text-xs">{game.platform}</p>
      </div>
    </div>
  );
};

export default MobileGameCard;