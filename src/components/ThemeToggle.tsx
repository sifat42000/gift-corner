import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'motion/react';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleTheme();
      }}
      className="relative flex h-9 w-16 cursor-pointer items-center rounded-full bg-stone-100 p-1 transition-colors duration-300 hover:bg-stone-200 dark:bg-slate-800 dark:hover:bg-slate-700"
      aria-label="Toggle theme"
    >
      <motion.div
        animate={{ x: theme === 'dark' ? 28 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-md dark:bg-slate-900"
      >
        {theme === 'light' ? (
          <Sun className="h-4 w-4 text-amber-500" />
        ) : (
          <Moon className="h-4 w-4 text-emerald-400" />
        )}
      </motion.div>
    </button>
  );
};
