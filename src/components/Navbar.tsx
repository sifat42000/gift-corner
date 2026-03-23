import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Gift, Search, User, Menu, X, LogIn, ChevronRight, LogOut, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { ThemeToggle } from './ThemeToggle';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Products', href: '/products' },
    { name: 'Categories', href: '/categories' },
    { name: 'Deals', href: '/deals' },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-stone-200 bg-white/80 backdrop-blur-md transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-lg p-2 text-stone-600 hover:bg-stone-100 dark:text-slate-400 dark:hover:bg-slate-900 md:hidden"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-stone-900 dark:text-white">
              <Gift className="h-6 w-6 text-emerald-600" />
              <span className="hidden sm:inline">Gift Corner</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  to={link.href} 
                  className="text-sm font-medium text-stone-600 transition-colors hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden max-w-xs flex-1 md:block">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              <input 
                type="text" 
                placeholder="Search gifts..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-stone-200 bg-stone-50 py-2 pl-10 pr-4 text-sm focus:border-emerald-600 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:border-emerald-500"
              />
            </form>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="rounded-full p-2 text-stone-600 hover:bg-stone-100 dark:text-slate-400 dark:hover:bg-slate-900 md:hidden"
            >
              <Search className="h-5 w-5" />
            </button>

            <Link to="/wishlist" className="relative rounded-full p-2 text-stone-600 hover:bg-stone-100 dark:text-slate-400 dark:hover:bg-slate-900">
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                  {wishlist.length}
                </span>
              )}
            </Link>
            
            <Link to="/cart" className="relative rounded-full p-2 text-stone-600 hover:bg-stone-100 dark:text-slate-400 dark:hover:bg-slate-900">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Link>

            {user ? (
              <div className="hidden items-center gap-4 sm:flex">
                <Link to="/dashboard" className="flex items-center gap-2 group">
                  <div className="h-8 w-8 overflow-hidden rounded-full bg-stone-100 group-hover:ring-2 group-hover:ring-emerald-600 transition-all dark:bg-slate-800">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.displayName || 'User'} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-emerald-100 text-emerald-600 font-bold text-xs dark:bg-emerald-900/30 dark:text-emerald-400">
                        {user.email?.[0].toUpperCase()}
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-medium text-stone-700 truncate max-w-[100px] group-hover:text-emerald-600 transition-colors dark:text-slate-300 dark:group-hover:text-emerald-400">
                    {user.displayName || user.email?.split('@')[0]}
                  </span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="rounded-full p-2 text-stone-400 hover:bg-rose-50 hover:text-rose-500 transition-colors dark:text-slate-500 dark:hover:bg-rose-900/20 dark:hover:text-rose-400"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link 
                to="/login"
                className="hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-stone-600 hover:bg-stone-100 dark:text-slate-400 dark:hover:bg-slate-900 sm:flex"
              >
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </Link>
            )}
            
            <button className="rounded-full p-2 text-stone-600 hover:bg-stone-100 dark:text-slate-400 dark:hover:bg-slate-900 sm:hidden">
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-stone-100 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-950 md:hidden"
          >
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              <input 
                type="text" 
                placeholder="Search gifts..." 
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-stone-200 bg-stone-50 py-2 pl-10 pr-4 text-sm focus:border-emerald-600 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:border-emerald-500"
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 top-16 z-40 bg-stone-900/20 backdrop-blur-sm dark:bg-black/40 md:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 top-16 z-50 w-64 bg-white p-6 shadow-xl dark:bg-slate-950 md:hidden"
            >
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold uppercase tracking-widest text-stone-400 dark:text-slate-500">Menu</h2>
                  <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <button onClick={() => setIsMenuOpen(false)}>
                      <X className="h-6 w-6 text-stone-500 dark:text-slate-400" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <Link 
                    to="/cart" 
                    onClick={() => setIsMenuOpen(false)}
                    className="flex flex-col items-center gap-2 rounded-2xl bg-stone-50 p-3 text-center transition-colors hover:bg-emerald-50 dark:bg-slate-900 dark:hover:bg-emerald-900/20"
                  >
                    <div className="relative">
                      <ShoppingCart className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      {totalItems > 0 && (
                        <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[8px] font-bold text-white">
                          {totalItems}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-bold text-stone-900 dark:text-slate-300">Cart</span>
                  </Link>
                  <Link 
                    to="/wishlist" 
                    onClick={() => setIsMenuOpen(false)}
                    className="flex flex-col items-center gap-2 rounded-2xl bg-stone-50 p-3 text-center transition-colors hover:bg-emerald-50 dark:bg-slate-900 dark:hover:bg-emerald-900/20"
                  >
                    <div className="relative">
                      <Heart className="h-5 w-5 text-rose-500 dark:text-rose-400" />
                      {wishlist.length > 0 && (
                        <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[8px] font-bold text-white">
                          {wishlist.length}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-bold text-stone-900 dark:text-slate-300">Wishlist</span>
                  </Link>
                  <button 
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsSearchOpen(true);
                    }}
                    className="flex flex-col items-center gap-2 rounded-2xl bg-stone-50 p-3 text-center transition-colors hover:bg-emerald-50 dark:bg-slate-900 dark:hover:bg-emerald-900/20"
                  >
                    <Search className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-[10px] font-bold text-stone-900 dark:text-slate-300">Search</span>
                  </button>
                </div>
                <div className="space-y-4">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.name}
                      to={link.href} 
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-between rounded-xl p-3 text-lg font-medium text-stone-900 transition-colors hover:bg-stone-50 dark:text-white dark:hover:bg-slate-900"
                    >
                      {link.name}
                      <ChevronRight className="h-5 w-5 text-stone-300 dark:text-slate-700" />
                    </Link>
                  ))}
                </div>
                <hr className="border-stone-100 dark:border-slate-800" />
                {user ? (
                  <div className="space-y-4">
                    <Link 
                      to="/dashboard" 
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-stone-50 transition-colors dark:hover:bg-slate-900"
                    >
                      <div className="h-10 w-10 overflow-hidden rounded-full bg-stone-100 dark:bg-slate-800">
                        {user.photoURL ? (
                          <img src={user.photoURL} alt={user.displayName || 'User'} className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-emerald-100 text-emerald-600 font-bold text-sm dark:bg-emerald-900/30 dark:text-emerald-400">
                            {user.email?.[0].toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-stone-900 dark:text-white">{user.displayName || user.email?.split('@')[0]}</p>
                        <p className="truncate text-xs text-stone-500 dark:text-slate-400">{user.email}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-stone-300 dark:text-slate-700" />
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl p-3 text-lg font-medium text-rose-600 transition-colors hover:bg-rose-50 dark:hover:bg-rose-900/20"
                    >
                      <LogOut className="h-5 w-5" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link 
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl p-3 text-lg font-medium text-stone-900 transition-colors hover:bg-stone-50 dark:text-white dark:hover:bg-slate-900"
                  >
                    <LogIn className="h-5 w-5 text-stone-400 dark:text-slate-500" />
                    Login / Register
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

