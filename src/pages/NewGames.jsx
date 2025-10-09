import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import infoGames from "../data/InfoGames";
import RecentGameCard from "../components/RecentGameCard";
import BackToTopButton from "../components/BackToTopButton";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

const NewGames = () => {
  const navigate = useNavigate();
  const [visibleGames, setVisibleGames] = useState(10);

  const handleGameClick = (gameId) => {
    navigate(`/game/${gameId}`);
  };

  const recentGames = infoGames.filter((game) => game.isNew);
  const gamesToShow = recentGames.slice(0, visibleGames);

  const handleLoadMore = () => {
    setVisibleGames((prev) => prev + 10);
  };

  return (
    <div className="bg-gray-900 min-h-screen px-4 sm:px-6 pt-24 pb-10">
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center"
      >
        Jogos Recém-Adicionados
      </motion.h1>

      {/* Grid de jogos */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6"
      >
        {gamesToShow.length > 0 ? (
          gamesToShow.map((game) => (
            <motion.div variants={itemVariants} key={game.id}>
              <RecentGameCard
                game={game}
                onClick={() => handleGameClick(game.id)}
              />
            </motion.div>
          ))
        ) : (
          <p className="text-white mt-6 col-span-full text-center">
            Nenhum jogo recente encontrado.
          </p>
        )}
      </motion.div>

      {/* Botão Ver Mais */}
      {visibleGames < recentGames.length && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-8"
        >
          <button
            onClick={handleLoadMore}
            className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors duration-300"
          >
            Ver Mais
          </button>
        </motion.div>
      )}

      <BackToTopButton />
    </div>
  );
};

export default NewGames;