import React, { memo } from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'motion/react';

interface ReviewCardProps {
  name: string;
  review: string;
  rating: number;
  image: string;
  delay?: number;
}

export const ReviewCard: React.FC<ReviewCardProps> = memo(({ name, review, rating, image, delay = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="relative rounded-2xl bg-white p-6 shadow-sm border border-stone-100 dark:bg-slate-900 dark:border-slate-800 md:p-8"
    >
      <Quote className="absolute top-4 right-4 h-6 w-6 text-stone-100 dark:text-slate-800 md:top-6 md:right-6 md:h-8 md:w-8" />
      <div className="flex items-center gap-3 md:gap-4">
        <img 
          src={image} 
          alt={name} 
          className="h-10 w-10 rounded-full object-cover md:h-12 md:w-12"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <div>
          <h4 className="text-sm font-bold text-stone-900 dark:text-white md:text-base">{name}</h4>
          <div className="flex items-center gap-0.5 text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                className={`h-3 w-3 ${i < rating ? 'fill-current' : 'text-stone-200 dark:text-slate-800'} md:h-3.5 md:w-3.5`} 
              />
            ))}
          </div>
        </div>
      </div>
      <p className="mt-4 text-sm text-stone-600 leading-relaxed italic dark:text-slate-400 md:mt-6 md:text-base">
        "{review}"
      </p>
    </motion.div>
  );
});

ReviewCard.displayName = 'ReviewCard';
