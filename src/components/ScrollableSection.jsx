import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import { ScrollContext } from '../hooks/useScroll';

const ScrollableSection = ({
  title,
  buttonText,
  buttonColor = "blue",
  children,
  showArrows = true,
  onButtonClick,
  extraButton,
  gap = 4,
}) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      const currentScroll = scrollRef.current.scrollLeft;
      const targetScroll =
        direction === "left"
          ? currentScroll - scrollAmount
          : currentScroll + scrollAmount;

      scrollRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="px-6 mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
          {title}
        </h2>
        <div className="flex items-center gap-4">
          {/* Arrows - escondidas no mobile */}
          {showArrows && (
            <div className="hidden md:flex gap-2">
              <button
                onClick={() => scroll("left")}
                className="p-2 rounded-full bg-gray-800/50 border border-gray-700/30 hover:border-gray-600 transition-all duration-200 group"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="p-2 rounded-full bg-gray-800/50 border border-gray-700/30 hover:border-gray-600 transition-all duration-200 group"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </button>
            </div>
          )}
          
          {extraButton ? (
            extraButton
          ) : (
            buttonText && (
              <button
                onClick={onButtonClick}
                className={`text-${buttonColor}-400 hover:text-${buttonColor}-300 transition-colors duration-200 font-semibold`}
              >
                {buttonText}
              </button>
            )
          )}
        </div>
      </div>

      <div
        ref={scrollRef}
        className={`flex gap-${gap} overflow-x-auto pb-8 scrollbar-hide scroll-smooth`}
      >
        <ScrollContext.Provider value={scrollRef}>
          {children}
        </ScrollContext.Provider>
      </div>
    </div>
  );
};

export default ScrollableSection;
