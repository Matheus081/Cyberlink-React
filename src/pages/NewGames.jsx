import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import infoGames from "../data/InfoGames";
import RecentGameCard from "../components/RecentGameCard";
import BackToTopButton from "../components/BackToTopButton";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
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
      stiffness: 200,
    },
  },
};

const NewGames = () => {
  const navigate = useNavigate();

  const smoothScroll = (targetPosition, duration) => {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    const ease = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t * t + b;
      t -= 2;
      return (c / 2) * (t * t * t + 2) + b;
    };

    requestAnimationFrame(animation);
  };

  useEffect(() => {
    const scrollPosition = sessionStorage.getItem("scrollPosition_newGames");
    if (scrollPosition) {
      smoothScroll(parseInt(scrollPosition, 10), 1200);
      sessionStorage.removeItem("scrollPosition_newGames");
    }
  }, []);

  const handleGameClick = (gameId) => {
    sessionStorage.setItem("scrollPosition_newGames", window.scrollY);
    navigate(`/game/${gameId}`);
  };

  const recentGames = infoGames.filter((game) => game.isNew);

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
        className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-6"
      >
        {recentGames.length > 0 ? (
          recentGames.map((game) => (
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

      <BackToTopButton />
    </div>
  );
};

export default NewGames;