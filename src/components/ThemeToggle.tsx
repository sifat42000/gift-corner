import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'motion/react';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="relative flex h-9 w-16 cursor-pointer items-center rounded-full bg-stone-100 p-1 transition-colors duration-300 dark:bg-slate-800"
      aria-label="Toggle theme"
    >
      <div
        className={`flex h-7 w-7 transform items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 dark:bg-slate-900 ${
          theme === 'dark' ? 'translate-x-7' : 'translate-x-0'
        }`}
      >
        {theme === 'light' ? (
          <Sun className="h-4 w-4 text-amber-500" />
        ) : (
          <Moon className="h-4 w-4 text-emerald-400" />
        )}
      </div>
    </motion.button>
  );
};
