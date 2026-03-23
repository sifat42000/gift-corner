import React from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { useWishlist } from '../context/WishlistContext';
import { motion } from 'motion/react';

export const Wishlist = () => {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-stone-100 text-stone-400">
            <Heart className="h-12 w-12" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-stone-900">Your wishlist is empty</h2>
          <p className="mt-2 text-stone-500">Save items you love to find them easily later.</p>
          <Link
            to="/products"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-200 transition-all hover:bg-emerald-700 hover:shadow-xl active:scale-95"
          >
            <ShoppingBag className="h-5 w-5" />
            Start Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-stone-900">My Wishlist</h1>
        <p className="mt-2 text-stone-500">You have {wishlist.length} items in your wishlist.</p>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
