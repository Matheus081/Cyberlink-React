import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import GameDetails from "./pages/GameDetails";
import Header from "./components/Header";
import AllGames from "./pages/AllGames";
import NewGames from "./pages/NewGames";
import SearchPage from "./pages/Search";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
import BottomNavBar from "./components/BottomNavBar";
import { AnimatePresence } from "framer-motion";
import KeepAlive from "./components/KeepAlive";

function App() {
  const location = useLocation();
  const isSearchPage = location.pathname === '/search';

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <ScrollToTop />
      {!isSearchPage && <Header />}
      <main className="flex-grow relative">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/game/:id" element={<GameDetails />} />
            <Route path="/novidades" element={<NewGames />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </AnimatePresence>
        <KeepAlive path="/all-games">
          <AllGames />
        </KeepAlive>
      </main>
      {!isSearchPage && <Footer />}
      {!isSearchPage && <BottomNavBar />}
    </div>
  );
}

const Root = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default Root;