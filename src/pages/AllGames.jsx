import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import infoGames from "../data/InfoGames";
import AllGamesCard from "../components/AllGamesCard";
import MobileGameCard from "../components/MobileGameCard";
import CustomSelect from "../components/CustomSelect";

import useIsMobile from "../hooks/useIsMobile";
import BackToTopButton from "../components/BackToTopButton";

const AllGames = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const isMobile = useIsMobile();
  const platformFilter = searchParams.get("platform") || "All";
  const genreFilter = searchParams.get("genre") || "All";
  const searchQuery = searchParams.get("q") || "";
  const location = useLocation();
  const controls = useAnimation();

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
      if (t < 1) return c / 2 * t * t * t + b;
      t -= 2;
      return c / 2 * (t * t * t + 2) + b;
    };

    requestAnimationFrame(animation);
  };

  useEffect(() => {
    if (location.pathname === '/all-games') {
      controls.start("visible");
      const scrollPosition = sessionStorage.getItem("scrollPosition_allGames");
      if (scrollPosition) {
        smoothScroll(parseInt(scrollPosition, 10), 1200);
        sessionStorage.removeItem("scrollPosition_allGames");
      }
    } else {
      controls.start("hidden");
    }
  }, [location, controls]);

  const handleGameClick = (gameId) => {
    sessionStorage.setItem("scrollPosition_allGames", window.scrollY);
    navigate(`/game/${gameId}`);
  };

  const filteredGames = infoGames.filter((game) => {
    const matchesPlatform =
      platformFilter === "All" || game.platform.includes(platformFilter);
    const matchesGenre =
      genreFilter === "All" ||
      (Array.isArray(game.genre) && game.genre.includes(genreFilter));
    const matchesSearchTerm = game.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesPlatform && matchesGenre && matchesSearchTerm;
  });

  const pageVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const platforms = ["All", ...new Set(infoGames.map((game) => game.platform))];

  const genres = [
    "All",
    ...new Set(
      infoGames
        .flatMap((game) => (Array.isArray(game.genre) ? game.genre : []))
    ),
  ];

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate={controls}
      className="bg-gray-900 min-h-screen px-4 sm:px-6 pt-24 pb-10"
    >
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
        {searchQuery ? `Resultados para "${searchQuery}"` : "Todos os Games"}
      </h1>

      {/* Filtros */}
      {!searchQuery && (
        <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
          <CustomSelect
            options={platforms}
            value={platformFilter}
            onChange={(value) => {
              const newParams = new URLSearchParams(searchParams);
              if (value === 'All') {
                newParams.delete('platform');
              } else {
                newParams.set('platform', value);
              }
              setSearchParams(newParams);
            }}
            placeholder="Todas as Plataformas"
          />
          <CustomSelect
            options={genres}
            value={genreFilter}
            onChange={(value) => {
              const newParams = new URLSearchParams(searchParams);
              if (value === 'All') {
                newParams.delete('genre');
              } else {
                newParams.set('genre', value);
              }
              setSearchParams(newParams);
            }}
            placeholder="Todos os Gêneros"
          />
        </div>
      )}

      {/* Grid de jogos */}
      <motion.div
        layout
        className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-6"
      >
        <AnimatePresence>
          {filteredGames.length > 0 ? (
            filteredGames.map((game) => (
              <motion.div
                key={game.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                {isMobile ? (
                  <MobileGameCard
                    game={game}
                    onClick={() => handleGameClick(game.id)}
                  />
                ) : (
                  <AllGamesCard
                    game={game}
                    onClick={() => handleGameClick(game.id)}
                  />
                )}
              </motion.div>
            ))
          ) : (
            <motion.p
              className="text-white mt-6 col-span-full text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Nenhum jogo encontrado para esses filtros.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      <BackToTopButton />
    </motion.div>
  );
};

export default AllGames;