import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleTheme();
      }}
      className="relative flex h-9 w-14 cursor-pointer items-center rounded-full bg-stone-100 p-1 transition-colors duration-200 hover:bg-stone-200 focus:outline-none dark:bg-slate-800 dark:hover:bg-slate-700 sm:h-10 sm:w-18"
      style={{ WebkitTapHighlightColor: 'transparent' }}
      aria-label="Toggle theme"
    >
      <div
        className={`flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-200 dark:bg-slate-900 sm:h-8 sm:w-8 ${
          theme === 'dark' ? (isMobile ? 'translate-x-[20px]' : 'translate-x-[32px]') : 'translate-x-0'
        }`}
      >
        {theme === 'light' ? (
          <Sun className="h-4 w-4 text-amber-500 sm:h-5 sm:w-5" />
        ) : (
          <Moon className="h-4 w-4 text-emerald-400 sm:h-5 sm:w-5" />
        )}
      </div>
    </button>
  );
};
