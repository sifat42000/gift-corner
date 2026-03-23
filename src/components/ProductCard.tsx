import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = memo(({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : product.price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      icon: '🛍️',
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group space-y-3 md:space-y-4"
    >
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-stone-100 dark:bg-slate-900">
        <Link to={`/product/${product.id}`} className="block h-full w-full">
          {/* Discount Badge */}
          {product.discount && (
            <div className="absolute left-3 top-3 z-10 rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white md:left-4 md:top-4">
              {product.discount}% OFF
            </div>
          )}

          <img 
            src={product.image || 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800'} 
            alt={product.name} 
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800';
            }}
          />
        </Link>

        {/* Wishlist Button */}
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={handleToggleWishlist}
          className={`absolute right-3 top-3 z-10 rounded-full p-3 transition-all shadow-sm md:right-4 md:top-4 ${
            isWishlisted 
              ? 'bg-rose-500 text-white' 
              : 'bg-white/80 text-stone-900 backdrop-blur-sm hover:bg-white dark:bg-slate-950/80 dark:text-white dark:hover:bg-slate-900'
          }`}
        >
          <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
        </motion.button>

        {/* Add to Cart Overlay */}
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={handleAddToCart}
          className="absolute bottom-3 right-3 rounded-full bg-white p-4 text-stone-900 shadow-xl transition-all md:bottom-4 md:right-4 md:translate-y-10 md:p-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 hover:bg-emerald-600 hover:text-white dark:bg-slate-950 dark:text-white dark:hover:bg-emerald-600"
        >
          <ShoppingBag className="h-5 w-5" />
        </motion.button>
      </div>

      <div className="space-y-1 px-1">
        <Link to={`/product/${product.id}`} className="block">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-bold text-stone-900 md:text-base truncate hover:text-emerald-600 transition-colors dark:text-white dark:hover:text-emerald-400">{product.name}</h3>
            <div className="flex shrink-0 items-center gap-1 text-xs text-amber-500 md:text-sm">
              <Star className="h-3 w-3 fill-current md:h-4 md:w-4" />
              <span>{product.rating || '4.9'}</span>
            </div>
          </div>
          <p className="text-xs text-stone-500 md:text-sm dark:text-slate-400">{product.category}</p>
        </Link>
        <div className="flex items-center gap-2 mt-1 md:mt-2">
          <p className="text-sm font-bold text-emerald-600 md:text-lg dark:text-emerald-400">
            ${discountedPrice.toFixed(2)}
          </p>
          {product.discount && (
            <p className="text-xs text-stone-400 line-through md:text-sm dark:text-slate-500">
              ${product.price.toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
});

ProductCard.displayName = 'ProductCard';
