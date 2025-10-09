import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import infoGames from "../data/InfoGames";
import AllGamesCard from "../components/AllGamesCard";
import MobileGameCard from "../components/MobileGameCard";
import CustomSelect from "../components/CustomSelect";

import useIsMobile from "../hooks/useIsMobile";
import BackToTopButton from "../components/BackToTopButton";

const normalizeText = (str) =>
  str?.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const AllGames = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const isMobile = useIsMobile();
  const [visibleGames, setVisibleGames] = useState(10);


  const [platformFilter, setPlatformFilter] = useState(searchParams.get("platform") || "All");
  const [genreFilter, setGenreFilter] = useState(searchParams.get("genre") || "All");
  const searchQuery = searchParams.get("q") || "";


  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (platformFilter === "All") {
      params.delete("platform");
    } else {
      params.set("platform", platformFilter);
    }
    if (genreFilter === "All") {
      params.delete("genre");
    } else {
      params.set("genre", genreFilter);
    }
    setSearchParams(params, { replace: true });
    setVisibleGames(10);
  }, [platformFilter, genreFilter, setSearchParams]);

  const handleGameClick = (gameId) => {
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

  const currentGames = filteredGames.slice(0, visibleGames);

  const handleLoadMore = () => {
    setVisibleGames((prev) => prev + 10);
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
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
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
            onChange={(value) => setPlatformFilter(value)}
            placeholder="Todas as Plataformas"
          />
          <CustomSelect
            options={genres}
            value={genreFilter}
            onChange={(value) => setGenreFilter(value)}
            placeholder="Todos os Gêneros"
          />
        </div>
      )}

      {/* Grid de jogos */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-6"
      >
        {currentGames.length > 0 ? (
          currentGames.map((game) => (
            <motion.div
              key={game.id}
              variants={itemVariants}
              layout
              className="h-full"
            >
              {isMobile ? (
                <MobileGameCard
                  game={game}
                  onClick={handleGameClick}
                />
              ) : (
                <AllGamesCard
                  game={game}
                  onClick={handleGameClick}
                />
              )}
            </motion.div>
          ))
        ) : (
          <p className="text-white mt-6 col-span-full text-center">
            Nenhum jogo encontrado para esses filtros.
          </p>
        )}
      </motion.div>

      {/* Botão Ver Mais */}
      {visibleGames < filteredGames.length && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-8"
        >
          <button
            onClick={handleLoadMore}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Ver mais
          </button>
        </motion.div>
      )}

      <BackToTopButton />
    </motion.div>
  );
};

export default AllGames;