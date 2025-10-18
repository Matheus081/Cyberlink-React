import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search, X, ArrowLeft } from "lucide-react";
import infoGames from "../data/InfoGames";

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

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      const randomGames = shuffleArray(infoGames).slice(0, 8);
      setSuggestions(randomGames);
    } else {
      const filtered = infoGames.filter(game =>
        normalizeText(game.title).includes(normalizeText(searchQuery)) ||
        (game.tags && game.tags.some(tag => normalizeText(tag).includes(normalizeText(searchQuery))))
      );
      setSuggestions(filtered);
    }
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/all-games?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSuggestionClick = (gameId) => {
    navigate(`/game/${gameId}`);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    inputRef.current?.focus();
  };

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
      <header className="flex items-center w-full p-3 bg-gray-950 shadow-md">
        <button onClick={() => navigate(-1)} className="p-2 text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <form onSubmit={handleSearchSubmit} className="relative flex-grow ml-2">
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquisar jogos..."
            autoComplete="off"
            className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 text-sm rounded-full py-2 pl-4 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      </header>
     <main className="flex-grow overflow-y-auto p-4">
        {suggestions.length > 0 ? (
          <div>
            <h2 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">
              {searchQuery ? 'Resultados da Pesquisa' : 'Sugestões para Você'}
            </h2>
            <div className="space-y-2">
              {suggestions.map(game => (
                <Link 
                  to={`/game/${game.id}`} 
                  key={game.id} 
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 group"
                  onClick={() => handleSuggestionClick(game.id)}
                >
                  <div className="flex-shrink-0 w-16 h-20 overflow-hidden rounded-md bg-gray-800">
                    <img 
                      src={game.image} 
                      alt={game.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h3 className="text-white text-sm font-medium truncate group-hover:text-cyan-400 transition-colors">
                      {game.title}
                    </h3>
                    {game.category && (
                      <p className="text-gray-500 text-xs mt-1">{game.category}</p>
                    )}
                  </div>
                  <Search className="w-4 h-4 text-gray-600 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-10">
            <Search className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">Nenhum jogo encontrado para "{searchQuery}"</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchPage;
