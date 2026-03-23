import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

interface CategoryCardProps {
  name: string;
  image: string;
  href: string;
  delay?: number;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ name, image, href, delay = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group relative h-48 overflow-hidden rounded-2xl bg-stone-100 dark:bg-slate-900 sm:h-64 md:h-80"
    >
      <img 
        src={image} 
        alt={name} 
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
        <h3 className="text-lg font-bold text-white md:text-2xl">{name}</h3>
        <Link 
          to={href} 
          className="mt-1 inline-block text-[10px] font-medium text-stone-300 hover:text-emerald-400 md:mt-2 md:text-sm"
        >
          Shop Collection →
        </Link>
      </div>
    </motion.div>
  );
};
