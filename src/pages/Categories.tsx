import React, { useState, useMemo, useEffect } from 'react';
import { Filter, X, ChevronDown, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';
import { ProductSkeleton } from '../components/Skeleton';

export const Categories = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(200);
  const [loading, setLoading] = useState(true);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

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
  }, [selectedCategory, priceRange, selectedOccasions, selectedGenders, selectedRating, currentPage]);

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(p => {
      const categoryMatch = selectedCategory === 'All' || p.category === selectedCategory;
      const priceMatch = p.price <= priceRange;
      const occasionMatch = selectedOccasions.length === 0 || (p.occasion && selectedOccasions.includes(p.occasion));
      const genderMatch = selectedGenders.length === 0 || (p.gender && selectedGenders.includes(p.gender));
      const ratingMatch = selectedRating === null || (p.rating || 0) >= selectedRating;
      
      return categoryMatch && priceMatch && occasionMatch && genderMatch && ratingMatch;
    });
  }, [selectedCategory, priceRange, selectedOccasions, selectedGenders, selectedRating, MOCK_PRODUCTS]);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const toggleOccasion = (occ: string) => {
    setSelectedOccasions(prev => 
      prev.includes(occ) ? prev.filter(o => o !== occ) : [...prev, occ]
    );
    setCurrentPage(1);
  };

  const toggleGender = (gender: string) => {
    setSelectedGenders(prev => 
      prev.includes(gender) ? prev.filter(g => g !== gender) : [...prev, gender]
    );
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedCategory('All');
    setPriceRange(200);
    setSelectedOccasions([]);
    setSelectedGenders([]);
    setSelectedRating(null);
    setCurrentPage(1);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 transition-colors duration-300">
      {/* Category Horizontal List */}
      <div className="mb-8 flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentPage(1);
            }}
            className={`whitespace-nowrap rounded-full px-6 py-2 text-sm font-medium transition-all ${
              selectedCategory === cat
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 dark:shadow-emerald-900/20'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Mobile Filter Toggle */}
        <div className="sticky top-16 z-30 -mx-4 flex items-center justify-between bg-white/80 px-4 py-3 backdrop-blur-md dark:bg-slate-950/80 lg:hidden">
          <h2 className="text-lg font-bold text-stone-900 dark:text-white">Products</h2>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-bold text-stone-600 shadow-sm transition-all active:scale-95 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
          >
            <Filter className="h-4 w-4" /> Filters
          </button>
        </div>

        {/* Sidebar Filter */}
        <aside className={`fixed inset-0 z-50 transform bg-white transition-transform duration-300 dark:bg-slate-950 lg:relative lg:inset-auto lg:z-0 lg:w-64 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex h-full flex-col p-6 lg:p-0 overflow-y-auto no-scrollbar">
            <div className="mb-6 flex items-center justify-between lg:hidden">
              <h2 className="text-xl font-bold text-stone-900 dark:text-white">Filters</h2>
              <button onClick={() => setIsSidebarOpen(false)}>
                <X className="h-6 w-6 text-stone-500 dark:text-slate-400" />
              </button>
            </div>

            <div className="space-y-8">
              {/* Price Range */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 dark:text-white">Price Range</h3>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={priceRange}
                    onChange={(e) => {
                      setPriceRange(parseInt(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-stone-200 accent-emerald-600 dark:bg-slate-800"
                  />
                  <div className="flex justify-between text-sm text-stone-500 dark:text-slate-400">
                    <span>$0</span>
                    <span>Up to ${priceRange}</span>
                  </div>
                </div>
              </div>

              {/* Occasion */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 dark:text-white">Occasion</h3>
                <div className="space-y-2">
                  {OCCASIONS.map((occ) => (
                    <label key={occ} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={selectedOccasions.includes(occ)}
                        onChange={() => toggleOccasion(occ)}
                        className="h-4 w-4 rounded border-stone-300 text-emerald-600 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800" 
                      />
                      <span className="text-sm text-stone-600 group-hover:text-stone-900 dark:text-slate-400 dark:group-hover:text-white">{occ}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Gender */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 dark:text-white">Gender</h3>
                <div className="space-y-2">
                  {GENDERS.map((gender) => (
                    <label key={gender} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={selectedGenders.includes(gender)}
                        onChange={() => toggleGender(gender)}
                        className="h-4 w-4 rounded border-stone-300 text-emerald-600 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800" 
                      />
                      <span className="text-sm text-stone-600 group-hover:text-stone-900 dark:text-slate-400 dark:group-hover:text-white">{gender}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 dark:text-white">Rating</h3>
                <div className="space-y-2">
                  {RATINGS.map((rating) => (
                    <label key={rating} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="rating"
                        checked={selectedRating === rating}
                        onChange={() => {
                          setSelectedRating(rating);
                          setCurrentPage(1);
                        }}
                        className="h-4 w-4 rounded-full border-stone-300 text-emerald-600 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800" 
                      />
                      <div className="flex items-center gap-1 text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`h-3 w-3 ${i < rating ? 'fill-current' : 'text-stone-200 dark:text-slate-800'}`} />
                        ))}
                        <span className="ml-1 text-xs text-stone-500 dark:text-slate-400">& Up</span>
                      </div>
                    </label>
                  ))}
                  <button 
                    onClick={() => {
                      setSelectedRating(null);
                      setCurrentPage(1);
                    }}
                    className="text-xs text-emerald-600 hover:underline dark:text-emerald-400"
                  >
                    Clear rating
                  </button>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="mt-8 w-full rounded-xl bg-stone-900 py-4 text-sm font-bold text-white transition-all hover:bg-stone-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 lg:hidden"
            >
              Apply Filters
            </button>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="mb-6 hidden items-center justify-between lg:flex">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white">
              {selectedCategory === 'All' ? 'All Products' : selectedCategory}
            </h2>
            <div className="flex items-center gap-2 text-sm text-stone-500 dark:text-slate-400">
              <span>Showing {paginatedProducts.length} of {filteredProducts.length} products</span>
              <div className="h-4 w-px bg-stone-200 mx-2 dark:bg-slate-800" />
              <button className="flex items-center gap-1 font-medium text-stone-900 dark:text-white">
                Sort by: Newest <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)
            ) : paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <p className="text-stone-500 dark:text-slate-400">No products found matching your filters.</p>
                <button 
                  onClick={clearFilters}
                  className="mt-4 text-sm font-bold text-emerald-600 hover:underline dark:text-emerald-400"
                >
                  Clear all filters
                </button>
              </div>
            )}
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

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>
    </div>
  );
};
