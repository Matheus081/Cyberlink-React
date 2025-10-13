import { Link, NavLink } from "react-router-dom";
import { Gamepad2 } from "lucide-react";
import SearchBar from "./SearchBar";

// Custom NavItem component with corrected scope for isActive
const NavItem = ({ to, children }) => {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <span
          className={`relative group py-2 font-medium transition-colors duration-300 ${
            isActive ? 'text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          {children}
          <span
            className={`absolute bottom-1 left-0 w-full h-0.5 bg-blue-500 transition-transform duration-300 ease-out transform origin-left ${
              isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
            }`}
          />
        </span>
      )}
    </NavLink>
  );
};

const Header = () => {
  return (
    <header className="bg-gray-950/80 backdrop-blur-sm text-white shadow-md fixed w-full z-50">
      <nav className="flex items-center justify-between px-4 sm:px-8 py-3 h-16">
        <div className="flex items-center justify-between w-full">
          <Link // Using Link for the logo as it doesn't need active styling
            to="/"
            className="inline-flex items-center group gap-3 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:from-purple-600 hover:via-blue-500 hover:to-cyan-400 transition-all duration-500"
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
          <div className="hidden lg:flex items-center gap-8 text-sm">
            <NavItem to="/">INÍCIO</NavItem>
            <NavItem to="/all-games">EXPLORAR JOGOS</NavItem>
            <NavItem to="/novidades">NOVIDADES</NavItem>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;