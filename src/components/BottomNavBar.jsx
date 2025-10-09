import { NavLink } from "react-router-dom";
import { Home, Gamepad2, Sparkles, Search } from "lucide-react";

const BottomNavBar = () => { // onSearchClick prop removed
  const activeLinkClass = "text-cyan-400";
  const inactiveLinkClass = "text-gray-400 hover:text-white";

  return (
    <div className="block lg:hidden fixed bottom-0 w-full bg-gray-950/90 backdrop-blur-sm border-t border-gray-800 z-40">
      <div className="flex justify-around items-center h-16">
        <NavLink
          to="/"
          end // Garante que só fica ativo na home exata
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 transition-colors ${
              isActive ? activeLinkClass : inactiveLinkClass
            }`
          }
        >
          <Home className="w-6 h-6" />
          <span className="text-xs font-medium">Início</span>
        </NavLink>
        <NavLink
          to="/all-games"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 transition-colors ${
              isActive ? activeLinkClass : inactiveLinkClass
            }`
          }
        >
          <Gamepad2 className="w-6 h-6" />
          <span className="text-xs font-medium">Explorar</span>
        </NavLink>
        <NavLink
          to="/novidades"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 transition-colors ${
              isActive ? activeLinkClass : inactiveLinkClass
            }`
          }
        >
          <Sparkles className="w-6 h-6" />
          <span className="text-xs font-medium">Novidades</span>
        </NavLink>
        {/* Search button is now a NavLink */}
        <NavLink
          to="/search"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 transition-colors ${
              isActive ? activeLinkClass : inactiveLinkClass
            }`
          }
        >
          <Search className="w-6 h-6" />
          <span className="text-xs font-medium">Busca</span>
        </NavLink>
      </div>
    </div>
  );
};

export default BottomNavBar;
