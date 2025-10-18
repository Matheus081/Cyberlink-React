import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import infoGames from "../data/InfoGames";

// Helper functions
const normalizeText = (str) =>
  str?.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const searchContainerRef = useRef(null);
  const inputRef = useRef(null);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      const randomGames = shuffleArray(infoGames).slice(0, 5);
      setSuggestions(randomGames);
    } else {
      const filtered = infoGames.filter(game =>
        normalizeText(game.title).includes(normalizeText(searchQuery)) ||
        (game.tags && game.tags.some(tag => normalizeText(tag).includes(normalizeText(searchQuery))))
      ).slice(0, 5);
      setSuggestions(filtered);
    }
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/all-games?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsDropdownVisible(false);
      inputRef.current?.blur();
    }
  };

  const handleSuggestionClick = (gameId) => {
    navigate(`/game/${gameId}`);
    setSearchQuery("");
    setIsDropdownVisible(false);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    inputRef.current?.focus();
  };

  return (
    <div ref={searchContainerRef} className="relative w-full">
      <form onSubmit={handleSearchSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsDropdownVisible(true)}
          placeholder="Pesquisar jogos..."
          autoComplete="off"
          className="w-full bg-gray-800/70 border border-gray-700 text-white placeholder-gray-400 text-sm rounded-full py-2 pl-4 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        {searchQuery && (
          <button type="button" onClick={handleClearSearch} className="absolute inset-y-0 right-10 flex items-center pr-3 text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        )}
        <button type="submit" className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-white">
          <Search className="w-5 h-5" />
        </button>
      </form>
      <AnimatePresence>
        {isDropdownVisible && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute mt-2 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden z-50 left-0 right-0"
          >
            {suggestions.length > 0 ? (
              <ul>
                <li className="p-2 text-xs text-gray-400 border-b border-gray-700">
                  {searchQuery ? 'Sugestões' : 'Recomendações'}
                </li>
                {suggestions.map(game => (
                  <li key={game.id} onClick={() => handleSuggestionClick(game.id)} className="flex items-center p-2 hover:bg-gray-700 cursor-pointer">
                    <img src={game.image} alt={game.title} className="w-10 h-14 object-cover rounded-md flex-shrink-0" />
                    <span className="ml-3 font-semibold text-sm text-white truncate">{game.title}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-3 text-center text-sm text-gray-400">
                {searchQuery ? "Nenhum jogo encontrado." : ""}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
