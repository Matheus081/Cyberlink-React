import { Link} from "react-router-dom";
import { Gamepad2 } from "lucide-react";
import SearchBar from "./SearchBar";


const Header = () => {

  return (
    <header className="bg-gray-950/80 backdrop-blur-sm text-white shadow-md fixed w-full z-50">
      <nav className="flex items-center justify-between px-4 sm:px-8 py-3 h-16">

        <div className="flex items-center justify-between group w-full">
          <Link
            to="/"
            className="inline-flex items-center gap-3 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:from-purple-600 hover:via-blue-500 hover:to-cyan-400 transition-all duration-500"
          >
            <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 rounded-xl border border-cyan-500/30 group-hover:border-purple-500/50 transition-colors duration-300">
              <Gamepad2 className="w-6 h-6 text-cyan-400 group-hover:text-purple-400 transition-colors duration-300" />
            </div>
            CYBERLINK
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex justify-center flex-1 mx-8">
            <div className="w-full max-w-md">
              <SearchBar />
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-6">
            <Link to="/" className="hover:text-blue-500 transition">Inicio</Link>
            <Link to="/all-games" className="hover:text-blue-500 transition">Explorar Jogos</Link>
            <Link to="/novidades" className="hover:text-blue-500 transition">Novidades</Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;