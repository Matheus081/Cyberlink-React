import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomSelect = ({ options, value, onChange, placeholder = 'Todas as Categorias' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  
  const displayText = value && value !== 'All' ? value : placeholder;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  const dropdownVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto', transition: { duration: 0.2 } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.2 } },
  };

  return (
    // 'group' para o scrollbar
    <div className="relative w-full sm:w-auto sm:min-w-[220px] font-sans group" ref={ref}>
      {/* --- Main Select Button --- */}
      <button
        type="button"
        className={`
          w-full p-3 
          rounded-lg border 
          bg-gray-800
          font-medium tracking-wide text-gray-100 // Texto claro
          shadow-lg // Sombra sutil
          focus:outline-none focus:ring-2 focus:ring-blue-600/70 // Anel de foco azul do seu site
          transition-all duration-200
          flex justify-between items-center text-left
          
          ${isOpen 
            ? 'border-blue-600'
            : 'border-gray-800 hover:border-gray-700'
          }
        `}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="truncate">{displayText}</span>
        <ChevronDown 
          className={`
            w-5 h-5 ml-2 transition-transform duration-200 
            ${isOpen ? 'rotate-180 text-blue-500' : 'text-gray-500'}
          `} 
        />
      </button>

      {/* --- Dropdown List --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="
              absolute z-20 mt-2 w-full 
              bg-gray-800 rounded-lg
              shadow-xl shadow-black/80 
              border border-gray-800
              overflow-hidden // Important for height animation
            "
          >
            <ul 
              className="
                max-h-76 overflow-y-auto rounded-lg 
                [&::-webkit-scrollbar]:w-1
                [&::-webkit-scrollbar-thumb]:rounded-full 
                [&::-webkit-scrollbar-thumb]:bg-gray-600 // Scrollbar azul do site
                [&::-webkit-scrollbar-track]:bg-transparent // Track mais escuro
                
           
              "
            >
              {options.map((option) => (
                <li
                  key={option}
                  className={`
                    p-3 
                    text-sm font-medium 
                    cursor-pointer 
                    transition-colors duration-100 
                    truncate uppercase
                    
                    ${value === option 
                      ? 'bg-blue-600 text-white shadow-inner shadow-black/50'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white' 
                    }
                  `}
                  onClick={() => handleSelect(option)}
                  role="option"
                  aria-selected={value === option}
                >
                  {option === 'All' ? placeholder : option}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomSelect;