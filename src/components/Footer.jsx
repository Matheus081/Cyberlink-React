import { Instagram, Youtube, Mail, ExternalLink, Gamepad2, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const TikTokIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" strokeWidth="0">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7.83a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.26z"/>
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative bg-gradient-to-b from-gray-950 to-black text-gray-300 mt-auto overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-20 right-20 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-10 left-1/3 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>
      
      {/* Top border with gradient */}
      <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="group">
              <Link 
                to="/" 
                className="inline-flex items-center gap-3 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:from-purple-600 hover:via-blue-500 hover:to-cyan-400 transition-all duration-500"
              >
                <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 rounded-xl border border-cyan-500/30 group-hover:border-purple-500/50 transition-colors duration-300">
                  <Gamepad2 className="w-6 h-6 text-cyan-400 group-hover:text-purple-400 transition-colors duration-300" />
                </div>
                CYBERLINK
              </Link>
            </div>
            
            <p className="text-gray-400 max-w-md leading-relaxed">
              O CyberLink nasceu para unir gerações de gamers: dos clássicos que marcaram nossa infância até os jogos modernos que continuam a nos emocionar. Um só espaço para relembrar, descobrir e jogar sempre com paixão.
            </p>
            
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-xs text-cyan-400 font-medium">
                Jogos
              </span>
              <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs text-purple-400 font-medium">
                Emuladores
              </span>
              <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs text-blue-400 font-medium">
                Nostalgia
              </span>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              Navegação
            </h3>
            <nav className="space-y-3">
              <Link 
                to="/" 
                className="block text-gray-400 hover:text-cyan-400 transition-colors duration-200 hover:translate-x-1 transform"
              >
                Início
              </Link>
              <Link 
                to="/all-games" 
                className="block text-gray-400 hover:text-cyan-400 transition-colors duration-200 hover:translate-x-1 transform"
              >
                Explorar Jogos
              </Link>
              <Link 
                to="/novidades" 
                className="block text-gray-400 hover:text-cyan-400 transition-colors duration-200 hover:translate-x-1 transform"
              >
                Novidades
              </Link>
            </nav>
          </div>
          
          {/* Social Media & Contact */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-purple-400" />
              Conecte-se
            </h3>
            
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/mikemt47?igsh=aHNjMGNueHVpNTgz" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group p-3 bg-gradient-to-br from-pink-500/10 to-orange-500/10 border border-pink-500/20 hover:border-pink-500/50 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/25"
              >
                <Instagram className="w-5 h-5 text-pink-400 group-hover:text-pink-300" />
              </a>
              
              <a 
                href="https://www.youtube.com/@CyberLink47" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group p-3 bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/20 hover:border-red-500/50 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-500/25"
              >
                <Youtube className="w-5 h-5 text-red-400 group-hover:text-red-300" />
              </a>
              
              <a 
                href="https://www.tiktok.com/@cyberlinkmemes?_t=ZM-90E8IiDVwU8&_r=1" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group p-3 bg-gradient-to-br from-gray-700/20 to-gray-900/20 border border-gray-600/20 hover:border-gray-500/50 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-gray-500/25"
              >
                <TikTokIcon />
              </a>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Fique por dentro das novidades</p>
              <a 
                href="mailto:contato@cyberlink.com" 
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors group"
              >
                contato@cyberlink.com
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800/50">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 text-center sm:text-left">
              &copy; {currentYear} CYBERLINK. Todos os direitos reservados.
            </p>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="text-xs bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent font-medium">
                {import.meta.env.VITE_APP_VERSION}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;