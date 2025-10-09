import { motion } from 'framer-motion';
import { ChevronRight, Gamepad2 } from 'lucide-react';
import { useScroll } from './ScrollableSection';

const GameCard = ({ genre, onClick }) => {
  const genreName = genre.name || genre.title || genre.filter;
  const genreImage = genre.image;
  const gameCount = genre.gameCount || Math.floor(Math.random() * 200) + 50;
  const scrollRef = useScroll();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ root: scrollRef, once: true }}
      onClick={onClick}
      className="group relative rounded-lg h-[170px] overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl
              sm:aspect-[16/9]"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
      <img
        src={genreImage}
        alt={genreName}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
        <div className="transform transition-transform duration-300 group-hover:translate-y-0 translate-y-2">
          <h3 className="text-xl font-bold text-white mb-2">{genreName}</h3>
          <div className="flex items-center gap-4 text-gray-300">
            <div className="flex items-center gap-1">
              <Gamepad2 className="w-4 h-4" />
              <span className="text-sm">{genre.gameCount} jogos</span>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-4 right-4 z-20">
        <div className="bg-black/50 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ChevronRight className="w-5 h-5 text-white" />
        </div>
      </div>
    </motion.div>
  );
};

export default GameCard;