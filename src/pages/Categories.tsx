import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X, ChevronDown, Star, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';
import { ProductSkeleton } from '../components/Skeleton';

export const Categories = () => {
  const [searchParams] = useSearchParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(200);
  const [loading, setLoading] = useState(true);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);

  // Temporary states for mobile filter drawer
  const [tempPriceRange, setTempPriceRange] = useState(priceRange);
  const [tempOccasions, setTempOccasions] = useState<string[]>(selectedOccasions);
  const [tempGenders, setTempGenders] = useState<string[]>(selectedGenders);
  const [tempRating, setTempRating] = useState<number | null>(selectedRating);

  // Sync temp states when drawer opens
  useEffect(() => {
    if (isSidebarOpen) {
      setTempPriceRange(priceRange);
      setTempOccasions(selectedOccasions);
      setTempGenders(selectedGenders);
      setTempRating(selectedRating);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSidebarOpen, priceRange, selectedOccasions, selectedGenders, selectedRating]);

  const handleApplyFilters = () => {
    setPriceRange(tempPriceRange);
    setSelectedOccasions(tempOccasions);
    setSelectedGenders(tempGenders);
    setSelectedRating(tempRating);
    setIsSidebarOpen(false);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setTempPriceRange(200);
    setTempOccasions([]);
    setTempGenders([]);
    setTempRating(null);
  };

  // Handle query parameters on mount
  useEffect(() => {
    const cat = searchParams.get('category');
    const occ = searchParams.get('occasion');

    if (cat) {
      setSelectedCategory(cat);
    }
    if (occ) {
      setSelectedOccasions([occ]);
    }
  }, [searchParams]);

  const MOCK_PRODUCTS = useMemo<Product[]>(() => [
    { id: '1', name: 'Premium Eid Gift Box', description: 'A curated selection of artisanal treats.', price: 89.99, image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800', category: 'Eid Special', occasion: 'Eid', gender: 'Unisex', discount: 15, rating: 4.9 },
    { id: '2', name: 'Birthday Surprise Hamper', description: 'Everything needed for a perfect celebration.', price: 64.50, image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=800', category: 'Birthday', occasion: 'Birthday', gender: 'Unisex', rating: 4.8 },
    { id: '3', name: 'Personalized Photo Frame', description: 'Capture memories that last forever.', price: 35.00, image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800', category: 'Personalized', occasion: 'Anniversary', gender: 'Unisex', discount: 10, rating: 4.7 },
    { id: '4', name: 'Luxury Scented Candle', description: 'Hand-poured with natural soy wax.', price: 28.00, image: 'https://images.unsplash.com/photo-1602872030219-3fd6380475c7?auto=format&fit=crop&q=80&w=800', category: 'Home Decor', occasion: 'Wedding', gender: 'For Her', rating: 4.9 },
    { id: '5', name: 'Anniversary Flower Bouquet', description: 'Freshly picked roses for your special day.', price: 45.00, image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=800', category: 'Anniversary', occasion: 'Anniversary', gender: 'For Her', rating: 4.6 },
    { id: '6', name: 'Gourmet Chocolate Box', description: 'Assorted premium chocolates.', price: 32.99, image: 'https://images.unsplash.com/photo-1549007994-cb92cfd74474?auto=format&fit=crop&q=80&w=800', category: 'Birthday', occasion: 'Birthday', gender: 'Unisex', discount: 5, rating: 4.8 },
    { id: '7', name: 'Leather Wallet for Men', description: 'Genuine leather handcrafted wallet.', price: 55.00, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=800', category: 'Anniversary', occasion: 'Birthday', gender: 'For Him', rating: 4.7 },
    { id: '8', name: 'Elegant Silk Scarf', description: 'Beautifully printed silk scarf for her.', price: 38.00, image: 'https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?auto=format&fit=crop&q=80&w=800', category: 'Birthday', occasion: 'Anniversary', gender: 'For Her', rating: 4.5 },
    { id: '9', name: 'Corporate Executive Set', description: 'Premium pen and notebook set for professionals.', price: 120.00, image: 'https://images.unsplash.com/photo-1586075010633-2442dc3d6307?auto=format&fit=crop&q=80&w=800', category: 'Corporate', occasion: 'Graduation', gender: 'Unisex', rating: 4.9 },
    { id: '10', name: 'Customized Desk Organizer', description: 'Keep your workspace tidy and stylish.', price: 45.00, image: 'https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?auto=format&fit=crop&q=80&w=800', category: 'Corporate', occasion: 'Graduation', gender: 'Unisex', rating: 4.7 },
    { id: '11', name: 'Premium Coffee Mug Set', description: 'Set of 4 artisanal ceramic mugs.', price: 55.00, image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=800', category: 'Home Decor', occasion: 'Wedding', gender: 'Unisex', rating: 4.6 },
    { id: '12', name: 'Wireless Charging Pad', description: 'Sleek wood-finish charging station.', price: 39.99, image: 'https://images.unsplash.com/photo-1586816832767-da2466088094?auto=format&fit=crop&q=80&w=800', category: 'Corporate', occasion: 'Graduation', gender: 'Unisex', rating: 4.8 },
    { id: '13', name: 'Leather Laptop Sleeve', description: 'Handcrafted protection for your device.', price: 65.00, image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800', category: 'Corporate', occasion: 'Graduation', gender: 'Unisex', rating: 4.7 },
    { id: '14', name: 'Artisanal Tea Collection', description: 'Selection of rare loose-leaf teas.', price: 42.00, image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&q=80&w=800', category: 'Personalized', occasion: 'Birthday', gender: 'For Her', rating: 4.9 },
    { id: '15', name: 'Modern Wall Clock', description: 'Minimalist design for contemporary homes.', price: 75.00, image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&q=80&w=800', category: 'Home Decor', occasion: 'Wedding', gender: 'Unisex', rating: 4.5 },
  ], []);

  const CATEGORIES = useMemo(() => [
    'All', 'Birthday', 'Anniversary', 'Eid Special', 'Personalized', 'Home Decor', 'Corporate'
  ], []);

  const OCCASIONS = useMemo(() => ['Birthday', 'Anniversary', 'Wedding', 'Eid', 'Graduation'], []);
  const GENDERS = useMemo(() => ['For Him', 'For Her', 'Unisex', 'For Kids'], []);
  const RATINGS = useMemo(() => [5, 4, 3, 2], []);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [selectedCategory, priceRange, selectedOccasions, selectedGenders, selectedRating, sortBy, currentPage]);

  const filteredProducts = useMemo(() => {
    let result = MOCK_PRODUCTS.filter(p => {
      const categoryMatch = selectedCategory === 'All' || p.category === selectedCategory;
      const priceMatch = p.price <= priceRange;
      const occasionMatch = selectedOccasions.length === 0 || (p.occasion && selectedOccasions.includes(p.occasion));
      const genderMatch = selectedGenders.length === 0 || (p.gender && selectedGenders.includes(p.gender));
      const ratingMatch = selectedRating === null || (p.rating || 0) >= selectedRating;
      
      return categoryMatch && priceMatch && occasionMatch && genderMatch && ratingMatch;
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
        // Original order
        break;
    }

    return result;
  }, [selectedCategory, priceRange, selectedOccasions, selectedGenders, selectedRating, sortBy, MOCK_PRODUCTS]);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const toggleOccasion = (occ: string) => {
    setTempOccasions(prev => 
      prev.includes(occ) ? prev.filter(o => o !== occ) : [...prev, occ]
    );
  };

  const toggleGender = (gender: string) => {
    setTempGenders(prev => 
      prev.includes(gender) ? prev.filter(g => g !== gender) : [...prev, gender]
    );
  };

  const clearFilters = () => {
    setSelectedCategory('All');
    setPriceRange(200);
    setSelectedOccasions([]);
    setSelectedGenders([]);
    setSelectedRating(null);
    setSortBy('newest');
    setCurrentPage(1);
  };

  // Live count for filters in drawer
  const tempFilteredCount = useMemo(() => {
    return MOCK_PRODUCTS.filter(p => {
      const categoryMatch = selectedCategory === 'All' || p.category === selectedCategory;
      const priceMatch = p.price <= tempPriceRange;
      const occasionMatch = tempOccasions.length === 0 || (p.occasion && tempOccasions.includes(p.occasion));
      const genderMatch = tempGenders.length === 0 || (p.gender && tempGenders.includes(p.gender));
      const ratingMatch = tempRating === null || (p.rating || 0) >= (tempRating || 0);
      
      return categoryMatch && priceMatch && occasionMatch && genderMatch && ratingMatch;
    }).length;
  }, [selectedCategory, tempPriceRange, tempOccasions, tempGenders, tempRating, MOCK_PRODUCTS]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 transition-colors duration-300">
      {/* Category Horizontal List */}
      <div className="relative mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex items-center justify-between mb-4 lg:hidden">
          <h3 className="text-sm font-bold uppercase tracking-widest text-stone-400 dark:text-slate-500">Categories</h3>
          <motion.span 
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-tighter text-emerald-600 dark:text-emerald-400"
          >
            Swipe to explore <ChevronRight className="h-3 w-3" />
          </motion.span>
        </div>
        <div className="relative">
          {/* Left Gradient Mask */}
          <div className="absolute left-0 top-0 bottom-0 z-10 w-12 bg-gradient-to-r from-white via-white/40 to-transparent pointer-events-none dark:from-slate-950 dark:via-slate-950/40 lg:hidden" />
          
          <div className="flex flex-nowrap items-center gap-3 overflow-x-auto pb-4 no-scrollbar scroll-smooth touch-pan-x">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className={`whitespace-nowrap rounded-full px-6 py-3 text-sm font-bold transition-all active:scale-95 ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 dark:shadow-emerald-900/20'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Right Gradient Mask */}
          <div className="absolute right-0 top-0 bottom-0 z-10 w-12 bg-gradient-to-l from-white via-white/40 to-transparent pointer-events-none dark:from-slate-950 dark:via-slate-950/40 lg:hidden" />
        </div>
      </div>

      <div className="flex flex-col gap-8">
        {/* Mobile/Desktop Filter Toggle */}
        <div className="sticky top-16 z-30 -mx-4 flex flex-col gap-4 bg-white/80 px-4 py-4 backdrop-blur-md dark:bg-slate-950/80 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center justify-between md:justify-start md:gap-4">
            <h2 className="text-lg font-bold text-stone-900 dark:text-white">Products</h2>
            <span className="text-xs text-stone-500 dark:text-slate-400 md:hidden">
              {filteredProducts.length} items
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-bold transition-all active:scale-95 ${
                isSidebarOpen 
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' 
                  : 'border-stone-200 bg-white text-stone-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'
              }`}
            >
              <Filter className="h-4 w-4" /> Filters
            </button>

            <div className="relative flex-1 md:flex-none">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full appearance-none rounded-xl border border-stone-200 bg-white px-4 py-2.5 pr-10 text-sm font-bold text-stone-600 shadow-sm focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
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

        {/* Filter UI (Drawer) */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              {/* Dimmed Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSidebarOpen(false)}
                className="fixed inset-0 z-[60] bg-stone-900/40 backdrop-blur-sm dark:bg-black/60"
              />

              {/* Bottom Sheet (Mobile) / Right Drawer (Desktop) */}
              <motion.div
                initial={{ y: '100%', x: '100%' }}
                animate={{ 
                  y: window.innerWidth < 768 ? 0 : 0, 
                  x: window.innerWidth < 768 ? 0 : 0,
                  transition: { type: 'spring', damping: 30, stiffness: 300, mass: 0.8 }
                }}
                exit={{ 
                  y: window.innerWidth < 768 ? '100%' : 0,
                  x: window.innerWidth < 768 ? 0 : '100%'
                }}
                className="fixed inset-x-0 bottom-0 z-[70] flex max-h-[90vh] flex-col rounded-t-[2.5rem] bg-white shadow-2xl dark:bg-slate-950 md:inset-x-auto md:inset-y-0 md:right-0 md:h-full md:w-96 md:rounded-none md:rounded-l-[2.5rem]"
              >
                {/* Drawer Header */}
                <div className="flex items-center justify-between border-b border-stone-100 p-6 dark:border-slate-800 md:p-8">
                  <div>
                    <h2 className="text-xl font-bold text-stone-900 dark:text-white md:text-2xl">Filters</h2>
                    <p className="text-xs text-stone-500 dark:text-slate-500">Refine your category search</p>
                  </div>
                  <button 
                    onClick={() => setIsSidebarOpen(false)}
                    className="rounded-full bg-stone-50 p-2 text-stone-400 hover:bg-stone-100 dark:bg-slate-900 dark:text-slate-500 dark:hover:bg-slate-800"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Drawer Body - Scrollable */}
                <div className="flex-1 overflow-y-auto p-6 no-scrollbar md:p-8">
                  <div className="space-y-10">
                    {/* Price Range */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-slate-500">Price Range</h3>
                        <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">${tempPriceRange}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="200"
                        value={tempPriceRange}
                        onChange={(e) => setTempPriceRange(parseInt(e.target.value))}
                        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-stone-100 accent-emerald-600 dark:bg-slate-800"
                      />
                      <div className="flex justify-between text-[10px] font-bold text-stone-400 dark:text-slate-600">
                        <span>$0</span>
                        <span>$200+</span>
                      </div>
                    </div>

                    {/* Occasion */}
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-slate-500">Occasion</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {OCCASIONS.map((occ) => (
                          <button
                            key={occ}
                            onClick={() => toggleOccasion(occ)}
                            className={`flex items-center justify-between rounded-xl border p-3 text-sm font-medium transition-all active:scale-95 ${
                              tempOccasions.includes(occ)
                                ? 'border-emerald-600 bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400'
                                : 'border-stone-100 bg-stone-50 text-stone-600 hover:border-stone-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-slate-700'
                            }`}
                          >
                            {occ}
                            {tempOccasions.includes(occ) && <div className="h-1.5 w-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Gender */}
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-slate-500">Gender</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {GENDERS.map((gender) => (
                          <button
                            key={gender}
                            onClick={() => toggleGender(gender)}
                            className={`flex items-center justify-between rounded-xl border p-3 text-sm font-medium transition-all active:scale-95 ${
                              tempGenders.includes(gender)
                                ? 'border-emerald-600 bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400'
                                : 'border-stone-100 bg-stone-50 text-stone-600 hover:border-stone-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-slate-700'
                            }`}
                          >
                            {gender}
                            {tempGenders.includes(gender) && <div className="h-1.5 w-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-slate-500">Rating</h3>
                      <div className="grid grid-cols-4 gap-2">
                        {[0, 3, 4, 4.5].map((rating) => (
                          <button
                            key={rating}
                            onClick={() => setTempRating(rating === 0 ? null : rating)}
                            className={`flex flex-col items-center gap-1 rounded-2xl p-3 text-xs font-bold transition-all active:scale-95 ${
                              (rating === 0 && tempRating === null) || (tempRating === rating)
                                ? 'bg-amber-50 text-amber-600 border border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800' 
                                : 'bg-stone-50 text-stone-400 border border-transparent dark:bg-slate-900 dark:text-slate-500'
                            }`}
                          >
                            {rating === 0 ? (
                              <>
                                <Filter className="h-4 w-4" />
                                <span>Any</span>
                              </>
                            ) : (
                              <>
                                <Star className={`h-4 w-4 ${(tempRating === rating) ? 'fill-amber-500' : ''}`} />
                                <span>{rating}+</span>
                              </>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Drawer Footer - Actions */}
                <div className="grid grid-cols-2 gap-4 border-t border-stone-100 p-6 dark:border-slate-800 md:p-8">
                  <button
                    onClick={handleResetFilters}
                    className="rounded-2xl border border-stone-200 py-4 text-sm font-bold text-stone-600 transition-all hover:bg-stone-50 active:scale-95 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-900"
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleApplyFilters}
                    className="rounded-2xl bg-emerald-600 py-4 text-sm font-bold text-white shadow-xl shadow-emerald-200 transition-all hover:bg-emerald-700 active:scale-95 dark:shadow-none"
                  >
                    Show {tempFilteredCount} Results
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Product Grid Area */}
        <div className="flex-1">
          <div className="mb-6 hidden items-center justify-between md:flex">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white">
              {selectedCategory === 'All' ? 'All Products' : selectedCategory}
            </h2>
            <div className="flex items-center gap-2 text-sm text-stone-500 dark:text-slate-400">
              <span>Showing {paginatedProducts.length} of {filteredProducts.length} products</span>
              <div className="h-4 w-px bg-stone-200 mx-2 dark:bg-slate-800" />
              <div className="relative">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-transparent pr-6 font-medium text-stone-900 focus:outline-none dark:text-white cursor-pointer"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
                <ChevronDown className="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 pointer-events-none text-stone-400" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <motion.div
                    key={`skeleton-${i}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ProductSkeleton />
                  </motion.div>
                ))
              ) : paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full py-20 text-center"
                >
                  <p className="text-stone-500 dark:text-slate-400">No products found matching your filters.</p>
                  <button 
                    onClick={clearFilters}
                    className="mt-4 text-sm font-bold text-emerald-600 hover:underline dark:text-emerald-400"
                  >
                    Clear all filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-16 flex justify-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => {
                      setCurrentPage(page);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`h-10 w-10 rounded-lg border text-sm font-medium transition-all ${
                      page === currentPage
                        ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-200 dark:shadow-none'
                        : 'border-stone-200 text-stone-600 hover:bg-stone-50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-900'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
