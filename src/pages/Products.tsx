import React, { useState, useEffect, useMemo } from 'react';
import { Filter, ChevronDown, Search, X, Star } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { ProductSkeleton } from '../components/Skeleton';
import { Product } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState(200);
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    const search = searchParams.get('search');
    if (search !== null) {
      setSearchQuery(search);
    }
  }, [searchParams]);

  useEffect(() => {
    if (searchQuery) {
      setSearchParams({ search: searchQuery }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  }, [searchQuery, setSearchParams]);

  // Mock products with more details
  const allProducts: Product[] = useMemo(() => [
    { id: '1', name: 'Premium Eid Gift Box', description: 'A curated selection of artisanal treats.', price: 89.99, image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800', category: 'Eid Special', discount: 15, rating: 4.9 },
    { id: '2', name: 'Birthday Surprise Hamper', description: 'Everything needed for a perfect celebration.', price: 64.50, image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=800', category: 'Birthday', rating: 4.8 },
    { id: '3', name: 'Personalized Photo Frame', description: 'Capture memories that last forever.', price: 35.00, image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800', category: 'Personalized', discount: 10, rating: 4.7 },
    { id: '4', name: 'Luxury Scented Candle', description: 'Hand-poured with natural soy wax.', price: 28.00, image: 'https://images.unsplash.com/photo-1602872030219-3fd6380475c7?auto=format&fit=crop&q=80&w=800', category: 'Home Decor', rating: 4.9 },
    { id: '5', name: 'Anniversary Flower Bouquet', description: 'Freshly picked roses for your special day.', price: 45.00, image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=800', category: 'Anniversary', rating: 4.6 },
    { id: '6', name: 'Gourmet Chocolate Box', description: 'Assorted premium chocolates.', price: 32.99, image: 'https://images.unsplash.com/photo-1549007994-cb92cfd74474?auto=format&fit=crop&q=80&w=800', category: 'Birthday', discount: 5, rating: 4.8 },
    { id: '7', name: 'Leather Wallet for Men', description: 'Genuine leather handcrafted wallet.', price: 55.00, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=800', category: 'Anniversary', rating: 4.7 },
    { id: '8', name: 'Elegant Silk Scarf', description: 'Beautifully printed silk scarf for her.', price: 38.00, image: 'https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?auto=format&fit=crop&q=80&w=800', category: 'Birthday', rating: 4.5 },
    { id: '9', name: 'Handcrafted Ceramic Mug', description: 'Unique ceramic mug for your morning coffee.', price: 22.00, image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=800', category: 'Home Decor', rating: 4.4 },
    { id: '10', name: 'Corporate Gift Set', description: 'Professional gift set for business partners.', price: 120.00, image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800', category: 'Corporate', rating: 4.9 },
  ], []);

  const CATEGORIES = ['All', 'Birthday', 'Anniversary', 'Eid Special', 'Personalized', 'Home Decor', 'Corporate'];

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, sortBy, priceRange, minRating]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = allProducts.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesPrice = p.price <= priceRange;
      const matchesRating = (p.rating || 0) >= minRating;
      return matchesSearch && matchesCategory && matchesPrice && matchesRating;
    });

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
      default:
        // For mock data, we'll just keep the original order or reverse it
        result.reverse();
        break;
    }

    return result;
  }, [allProducts, searchQuery, selectedCategory, sortBy, priceRange, minRating]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-stone-900 dark:text-white">All Products</h1>
          <p className="mt-2 text-stone-500 dark:text-slate-400">Browse our entire collection of unique gifts.</p>
        </div>
        
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-stone-200 bg-white py-2 pl-10 pr-4 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:border-emerald-500 sm:w-64"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:text-slate-500 dark:hover:text-slate-300"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-all ${
                isFilterOpen 
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' 
                  : 'border-stone-200 text-stone-600 hover:bg-stone-50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-900'
              }`}
            >
              <Filter className="h-4 w-4" /> Filter
            </button>
            
            <div className="relative group">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none rounded-xl border border-stone-200 bg-white px-4 py-2 pr-10 text-sm font-medium text-stone-600 hover:bg-stone-50 focus:outline-none cursor-pointer dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 pointer-events-none text-stone-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-8 grid grid-cols-1 gap-8 rounded-2xl border border-stone-100 bg-stone-50/50 p-6 dark:border-slate-800 dark:bg-slate-900/50 md:grid-cols-3">
              {/* Category Filter */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 dark:text-white">Category</h3>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                        selectedCategory === cat 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-white text-stone-600 border border-stone-200 hover:border-emerald-600 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700 dark:hover:border-emerald-500'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 dark:text-white">Max Price: ${priceRange}</h3>
                <input
                  type="range"
                  min="0"
                  max="200"
                  step="10"
                  value={priceRange}
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-stone-200 accent-emerald-600 dark:bg-slate-800"
                />
                <div className="flex justify-between text-xs text-stone-500 dark:text-slate-500">
                  <span>$0</span>
                  <span>$200+</span>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 dark:text-white">Minimum Rating</h3>
                <div className="flex items-center gap-4">
                  {[0, 3, 4, 4.5].map(rating => (
                    <button
                      key={rating}
                      onClick={() => setMinRating(rating)}
                      className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                        minRating === rating 
                          ? 'bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800' 
                          : 'bg-white text-stone-600 border border-stone-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
                      }`}
                    >
                      {rating === 0 ? 'Any' : <><Star className="h-3 w-3 fill-current" /> {rating}+</>}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
        ) : filteredAndSortedProducts.length > 0 ? (
          filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-stone-100 text-stone-400 dark:bg-slate-900 dark:text-slate-700">
              <Search className="h-10 w-10" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-stone-900 dark:text-white">No products found</h3>
            <p className="mt-2 text-stone-500 dark:text-slate-400">Try adjusting your search or filters to find what you're looking for.</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setPriceRange(200);
                setMinRating(0);
                setSortBy('newest');
              }}
              className="mt-6 font-bold text-emerald-600 hover:underline dark:text-emerald-400"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
