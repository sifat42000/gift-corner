import React, { useState, useEffect, useMemo } from 'react';
import { Tag, Sparkles } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { ProductSkeleton } from '../components/Skeleton';
import { Product } from '../types';
import { motion } from 'motion/react';

export const Deals = () => {
  const [loading, setLoading] = useState(true);

  // Mock products with discounts
  const dealProducts: Product[] = useMemo(() => [
    { id: 'd1', name: 'Premium Eid Gift Box', description: 'A curated selection of artisanal treats.', price: 89.99, image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800', category: 'Eid Special', discount: 25, rating: 4.9 },
    { id: 'd2', name: 'Personalized Photo Frame', description: 'Capture memories that last forever.', price: 35.00, image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800', category: 'Personalized', discount: 15, rating: 4.7 },
    { id: 'd3', name: 'Gourmet Chocolate Box', description: 'Assorted premium chocolates.', price: 32.99, image: 'https://images.unsplash.com/photo-1549007994-cb92cfd74474?auto=format&fit=crop&q=80&w=800', category: 'Birthday', discount: 20, rating: 4.8 },
    { id: 'd4', name: 'Luxury Scented Candle', description: 'Hand-poured with natural soy wax.', price: 28.00, image: 'https://images.unsplash.com/photo-1602872030219-3fd6380475c7?auto=format&fit=crop&q=80&w=800', category: 'Home Decor', discount: 10, rating: 4.9 },
    { id: 'd5', name: 'Anniversary Flower Bouquet', description: 'Freshly picked roses for your special day.', price: 45.00, image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=800', category: 'Anniversary', discount: 30, rating: 4.6 },
    { id: 'd6', name: 'Leather Wallet for Men', description: 'Genuine leather handcrafted wallet.', price: 55.00, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=800', category: 'Anniversary', discount: 15, rating: 4.7 },
  ], []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-emerald-600 px-8 py-12 text-white shadow-2xl shadow-emerald-200 dark:shadow-none"
      >
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1 text-sm font-bold backdrop-blur-md">
            <Sparkles className="h-4 w-4" />
            Limited Time Offers
          </div>
          <h1 className="mt-6 text-4xl font-black md:text-6xl">Unbeatable Deals</h1>
          <p className="mt-4 text-lg text-emerald-50 opacity-90">
            Save up to 50% on our most popular gift items. Grab them before they're gone!
          </p>
        </div>
        <Tag className="absolute -bottom-12 -right-12 h-64 w-64 rotate-12 text-white/10" />
      </motion.div>

      <div className="mt-16">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-stone-900 dark:text-white">Flash Sale Items</h2>
          <div className="flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-600 dark:bg-emerald-400" />
            Live Now
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)
          ) : (
            dealProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
