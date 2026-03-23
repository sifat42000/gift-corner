import React, { useState, useEffect } from 'react';
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

  // Prevent background scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

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
    <>
      <nav className={`sticky top-0 w-full border-b border-stone-200 bg-white/80 backdrop-blur-md transition-all duration-300 dark:border-slate-800 dark:bg-slate-950/80 ${isMenuOpen ? 'z-30' : 'z-50'}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Left: Mobile Menu Button (Balanced with right side) */}
            <div className="flex w-32 items-center md:hidden">
              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="rounded-xl p-3 text-stone-600 transition-colors hover:bg-stone-100 focus:outline-none dark:text-slate-400 dark:hover:bg-slate-900"
                style={{ WebkitTapHighlightColor: 'transparent' }}
                aria-label="Open menu"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.button>
            </div>

            {/* Center: Logo (Perfectly centered on mobile) */}
            <div className="flex flex-1 items-center justify-center md:justify-start">
              <Link to="/" className="flex items-center gap-2 text-xl font-bold text-stone-900 dark:text-white">
                <Gift className="h-6 w-6 text-emerald-600" />
                <span className="hidden sm:inline">Gift Corner</span>
                <span className="sm:hidden">GC</span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:block">
              <div className="flex items-center gap-8 px-8">
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

            {/* Right: Actions (Balanced with left side) */}
            <div className="flex w-32 items-center justify-end gap-2 sm:w-auto sm:gap-4">
              {/* Desktop Search */}
              <div className="hidden max-w-xs md:block">
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

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Wishlist - Desktop Only */}
              <motion.div whileTap={{ scale: 0.9 }}>
                <Link 
                  to="/wishlist" 
                  className="hidden relative rounded-full p-3 text-stone-600 transition-colors hover:bg-stone-100 focus:outline-none dark:text-slate-400 dark:hover:bg-slate-900 sm:block"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  <Heart className="h-5 w-5" />
                  {wishlist.length > 0 && (
                    <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                      {wishlist.length}
                    </span>
                  )}
                </Link>
              </motion.div>
              
              {/* Cart */}
              <motion.div whileTap={{ scale: 0.9 }}>
                <Link 
                  to="/cart" 
                  className="relative rounded-full p-3 text-stone-600 transition-colors hover:bg-stone-100 focus:outline-none dark:text-slate-400 dark:hover:bg-slate-900"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </motion.div>

              {/* User - Desktop Only */}
              {user ? (
                <div className="hidden items-center gap-4 sm:flex">
                  <Link 
                    to="/dashboard" 
                    className="flex items-center gap-2 group focus:outline-none"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    <div className="h-9 w-9 overflow-hidden rounded-full bg-stone-100 group-hover:ring-2 group-hover:ring-emerald-600 transition-all dark:bg-slate-800">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt={user.displayName || 'User'} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-emerald-100 text-emerald-600 font-bold text-xs dark:bg-emerald-900/30 dark:text-emerald-400">
                          {user.email?.[0].toUpperCase()}
                        </div>
                      )}
                    </div>
                  </Link>
                </div>
              ) : (
                <Link 
                  to="/login"
                  className="hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100 dark:text-slate-400 dark:hover:bg-slate-900 sm:flex"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Link>
              )}
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
      </nav>

      {/* Mobile Menu Drawer - Moved outside nav for proper stacking context */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              key="mobile-menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md md:hidden"
            />
            <motion.div 
              key="mobile-menu-drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ 
                type: 'spring', 
                damping: 25, 
                stiffness: 200
              }}
              className="fixed inset-y-0 left-0 z-[110] flex w-[85%] max-w-sm flex-col bg-white shadow-2xl dark:bg-slate-950 md:hidden border-r border-stone-100 dark:border-slate-800"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-stone-100 p-6 dark:border-slate-800">
                <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-xl font-bold text-stone-900 dark:text-white">
                  <Gift className="h-6 w-6 text-emerald-600" />
                  <span>Gift Corner</span>
                </Link>
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-full p-2 text-stone-400 hover:bg-stone-100 dark:text-slate-500 dark:hover:bg-slate-900"
                >
                  <X className="h-6 w-6" />
                </motion.button>
              </div>

              {/* Drawer Body - Scrollable */}
              <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
                <div className="space-y-8">
                  {/* Theme & Quick Actions */}
                  <div className="flex items-center justify-between rounded-2xl bg-stone-50 p-4 dark:bg-slate-900">
                    <span className="text-sm font-bold text-stone-900 dark:text-white">Appearance</span>
                    <ThemeToggle />
                  </div>

                  {/* Navigation Links */}
                  <div className="space-y-2">
                    <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-slate-500">Navigation</h3>
                    {navLinks.map((link) => (
                      <Link 
                        key={link.name}
                        to={link.href} 
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center justify-between rounded-xl p-4 text-lg font-medium text-stone-900 transition-all hover:bg-stone-50 dark:text-white dark:hover:bg-slate-900 active:scale-[0.98]"
                      >
                        {link.name}
                        <ChevronRight className="h-5 w-5 text-stone-300 dark:text-slate-700" />
                      </Link>
                    ))}
                  </div>

                  {/* Account Section */}
                  <div className="space-y-4">
                    <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-slate-500">Account</h3>
                    {user ? (
                      <div className="space-y-4">
                        <Link 
                          to="/dashboard" 
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center gap-4 rounded-2xl border border-stone-100 p-4 transition-all hover:bg-stone-50 dark:border-slate-800 dark:hover:bg-slate-900"
                        >
                          <div className="h-12 w-12 overflow-hidden rounded-full bg-stone-100 dark:bg-slate-800">
                            {user.photoURL ? (
                              <img src={user.photoURL} alt={user.displayName || 'User'} className="h-full w-full object-cover" />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center bg-emerald-100 text-emerald-600 font-bold text-lg dark:bg-emerald-900/30 dark:text-emerald-400">
                                {user.email?.[0].toUpperCase()}
                              </div>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-bold text-stone-900 dark:text-white">{user.displayName || user.email?.split('@')[0]}</p>
                            <p className="truncate text-xs text-stone-500 dark:text-slate-400">{user.email}</p>
                          </div>
                        </Link>
                        <button 
                          onClick={handleLogout}
                          className="flex w-full items-center gap-3 rounded-xl p-4 text-lg font-medium text-rose-600 transition-colors hover:bg-rose-50 dark:hover:bg-rose-900/20"
                        >
                          <LogOut className="h-5 w-5" />
                          Logout
                        </button>
                      </div>
                    ) : (
                      <Link 
                        to="/login"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-3 rounded-xl bg-emerald-600 p-4 text-lg font-bold text-white shadow-lg shadow-emerald-200 transition-all hover:bg-emerald-700 dark:shadow-none active:scale-[0.98]"
                      >
                        <LogIn className="h-5 w-5" />
                        Login / Register
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="border-t border-stone-100 p-6 dark:border-slate-800">
                <p className="text-center text-[10px] font-medium text-stone-400 dark:text-slate-600">
                  © 2026 Gift Corner. All rights reserved.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

