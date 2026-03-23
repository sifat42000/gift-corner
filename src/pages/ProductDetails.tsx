import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, 
  ShoppingBag, 
  Heart, 
  Share2, 
  Truck, 
  ShieldCheck, 
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Minus,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';
import { ReviewCard } from '../components/ReviewCard';
import toast from 'react-hot-toast';

// Mock data lookup function
const getProductById = (id: string): Product | undefined => {
  const allProducts: Product[] = [
    { 
      id: '1', 
      name: 'Premium Eid Gift Box', 
      description: 'A curated selection of artisanal treats, including premium dates, handcrafted chocolates, and exotic nuts. Perfect for sharing with loved ones during the festive season. Each box is elegantly wrapped in sustainable packaging with a personalized greeting card.', 
      price: 89.99, 
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800', 
      category: 'Eid Special', 
      discount: 15, 
      rating: 4.9,
      images: [
        'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1549007994-cb92cfd74474?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800'
      ],
      variants: ['Small', 'Medium', 'Large', 'Family Pack']
    },
    // ... other products could be here
  ];
  return allProducts.find(p => p.id === id) || allProducts[0]; // Fallback to first for demo
};

export const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [activeImage, setActiveImage] = useState<string>('');
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(true);

  const RELATED_PRODUCTS = useMemo(() => [
    { id: '2', name: 'Birthday Surprise Hamper', description: 'Everything needed for a perfect celebration.', price: 64.50, image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=800', category: 'Birthday', rating: 4.8 },
    { id: '3', name: 'Personalized Photo Frame', description: 'Capture memories that last forever.', price: 35.00, image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800', category: 'Personalized', discount: 10, rating: 4.7 },
    { id: '4', name: 'Luxury Scented Candle', description: 'Hand-poured with natural soy wax.', price: 28.00, image: 'https://images.unsplash.com/photo-1602872030219-3fd6380475c7?auto=format&fit=crop&q=80&w=800', category: 'Home Decor', rating: 4.9 },
    { id: '5', name: 'Anniversary Flower Bouquet', description: 'Freshly picked roses for your special day.', price: 45.00, image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=800', category: 'Anniversary', rating: 4.6 },
  ], []);

  const REVIEWS = useMemo(() => [
    { name: 'Sarah Johnson', review: 'The packaging was absolutely beautiful and the contents were so fresh. My family loved it!', rating: 5, image: 'https://i.pravatar.cc/150?u=sarah' },
    { name: 'Michael Chen', review: 'Great gift idea. The personalized card was a nice touch. Delivery was right on time.', rating: 4, image: 'https://i.pravatar.cc/150?u=michael' },
  ], []);

  useEffect(() => {
    if (id) {
      setLoading(true);
      // Simulate loading
      setTimeout(() => {
        const p = getProductById(id);
        setProduct(p);
        if (p) {
          setActiveImage(p.image);
          if (p.variants && p.variants.length > 0) {
            setSelectedVariant(p.variants[0]);
          }
        }
        setLoading(false);
      }, 800);
    }
    window.scrollTo(0, 0);
  }, [id]);

  const discountedPrice = useMemo(() => {
    if (!product) return 0;
    return product.discount 
      ? product.price * (1 - product.discount / 100) 
      : product.price;
  }, [product]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast.success(`${product.name} added to cart`, {
        icon: '🛒',
      });
    }
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist', {
      icon: isWishlisted ? '💔' : '❤️',
    });
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 animate-pulse">
        <div className="mb-8 h-6 w-48 rounded bg-stone-100 dark:bg-slate-800" />
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="aspect-square rounded-3xl bg-stone-100 dark:bg-slate-800" />
          <div className="space-y-6">
            <div className="h-10 w-3/4 rounded bg-stone-100 dark:bg-slate-800" />
            <div className="h-6 w-1/4 rounded bg-stone-100 dark:bg-slate-800" />
            <div className="h-24 w-full rounded bg-stone-100 dark:bg-slate-800" />
            <div className="h-12 w-1/2 rounded bg-stone-100 dark:bg-slate-800" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) return <div className="p-20 text-center dark:text-slate-400">Product not found.</div>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumbs & Back Button */}
      <div className="mb-8 flex items-center justify-between">
        <nav className="hidden items-center gap-2 text-sm text-stone-500 dark:text-slate-400 sm:flex">
          <Link to="/" className="hover:text-emerald-600 dark:hover:text-emerald-400">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/categories" className="hover:text-emerald-600 dark:hover:text-emerald-400">Categories</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-stone-900 dark:text-white truncate">{product.name}</span>
        </nav>
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-bold text-stone-600 dark:text-slate-300 hover:text-stone-900 dark:hover:text-white sm:hidden"
        >
          <ChevronLeft className="h-5 w-5" />
          Back
        </button>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-stone-100 dark:bg-slate-800">
            <motion.img 
              key={activeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={activeImage} 
              alt={product.name} 
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-110 cursor-zoom-in"
              referrerPolicy="no-referrer"
            />
            {product.discount && (
              <div className="absolute left-6 top-6 rounded-full bg-emerald-600 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                {product.discount}% OFF
              </div>
            )}
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x">
            {(product.images || [product.image]).map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-2 transition-all snap-start ${
                  activeImage === img ? 'border-emerald-600' : 'border-transparent opacity-60 hover:opacity-100 dark:border-slate-800'
                }`}
              >
                <img src={img} alt="" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-6 flex items-center justify-between">
            <span className="rounded-full bg-stone-100 dark:bg-slate-800 px-4 py-1 text-xs font-bold uppercase tracking-widest text-stone-500 dark:text-slate-400">
              {product.category}
            </span>
            <div className="flex gap-2">
              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={toggleWishlist}
                className={`rounded-full p-2.5 shadow-sm transition-all ${
                  isWishlisted ? 'bg-rose-500 text-white' : 'bg-white dark:bg-slate-800 text-stone-400 dark:text-slate-500 hover:text-rose-500 dark:hover:text-rose-400'
                }`}
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </motion.button>
              <motion.button 
                whileTap={{ scale: 0.9 }}
                className="rounded-full bg-white dark:bg-slate-800 p-2.5 text-stone-400 dark:text-slate-500 shadow-sm transition-all hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                <Share2 className="h-5 w-5" />
              </motion.button>
            </div>
          </div>

          <h1 className="mb-4 text-3xl font-bold text-stone-900 dark:text-white md:text-4xl">{product.name}</h1>
          
          <div className="mb-8 flex items-center gap-4">
            <div className="flex items-center gap-1 text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating || 4.9) ? 'fill-current' : 'text-stone-200 dark:text-slate-700'}`} />
              ))}
              <span className="ml-2 text-base font-bold text-stone-900 dark:text-white">{product.rating || '4.9'}</span>
            </div>
            <span className="h-4 w-px bg-stone-200 dark:bg-slate-800" />
            <span className="text-sm text-stone-500 dark:text-slate-400">128 Reviews</span>
          </div>

          <div className="mb-8">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">${discountedPrice.toFixed(2)}</span>
              {product.discount && (
                <span className="text-xl text-stone-400 dark:text-slate-600 line-through">${product.price.toFixed(2)}</span>
              )}
            </div>
            <p className="mt-2 text-xs text-stone-500 dark:text-slate-400">Inclusive of all taxes</p>
          </div>

          <p className="mb-8 text-base text-stone-600 dark:text-slate-300 leading-relaxed">
            {product.description}
          </p>

          {/* Variants */}
          {product.variants && (
            <div className="mb-8 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-white">Select Variant</h3>
              <div className="flex flex-wrap gap-3">
                {product.variants.map((v) => (
                  <button
                    key={v}
                    onClick={() => setSelectedVariant(v)}
                    className={`rounded-xl border-2 px-6 py-3.5 text-sm font-bold transition-all active:scale-95 ${
                      selectedVariant === v
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800'
                        : 'border-stone-100 bg-white text-stone-600 hover:border-stone-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-slate-700'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mb-10 flex flex-col gap-4 sm:flex-row">
            <div className="flex items-center rounded-xl border-2 border-stone-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-2">
              <motion.button 
                whileTap={{ scale: 0.8 }}
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 text-stone-400 dark:text-slate-500 hover:text-stone-900 dark:hover:text-white"
              >
                <Minus className="h-4 w-4" />
              </motion.button>
              <span className="w-12 text-center font-bold text-stone-900 dark:text-white">{quantity}</span>
              <motion.button 
                whileTap={{ scale: 0.8 }}
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 text-stone-400 dark:text-slate-500 hover:text-stone-900 dark:hover:text-white"
              >
                <Plus className="h-4 w-4" />
              </motion.button>
            </div>
            <motion.button 
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className="flex flex-1 items-center justify-center gap-3 rounded-xl bg-emerald-600 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-200 dark:shadow-none transition-all hover:bg-emerald-700 hover:shadow-none"
            >
              <ShoppingBag className="h-5 w-5" />
              Add to Cart
            </motion.button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 gap-4 rounded-2xl bg-stone-50 dark:bg-slate-900/50 p-6 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-white dark:bg-slate-800 p-2 text-emerald-600 dark:text-emerald-400 shadow-sm">
                <Truck className="h-4 w-4" />
              </div>
              <span className="text-xs font-bold text-stone-700 dark:text-slate-300">Free Shipping</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-white dark:bg-slate-800 p-2 text-emerald-600 dark:text-emerald-400 shadow-sm">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <span className="text-xs font-bold text-stone-700 dark:text-slate-300">Secure Payment</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-white dark:bg-slate-800 p-2 text-emerald-600 dark:text-emerald-400 shadow-sm">
                <RotateCcw className="h-4 w-4" />
              </div>
              <span className="text-xs font-bold text-stone-700 dark:text-slate-300">Easy Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile Footer */}
      <div className="fixed bottom-0 left-0 z-40 w-full border-t border-stone-100 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 p-4 pb-safe backdrop-blur-xl lg:hidden">
        <div className="mx-auto max-w-md flex items-center gap-4">
          <div className="flex-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-slate-500">Total Price</p>
            <p className="text-xl font-bold text-stone-900 dark:text-white">${(discountedPrice * quantity).toFixed(2)}</p>
          </div>
          <button 
            onClick={handleAddToCart}
            className="flex flex-[2] items-center justify-center gap-3 rounded-xl bg-emerald-600 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-200 dark:shadow-none active:scale-95"
          >
            <ShoppingBag className="h-5 w-5" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <section className="mt-24">
        <div className="mb-12 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-stone-900 dark:text-white md:text-3xl">Customer Reviews</h2>
          <button className="text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline">Write a Review</button>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {REVIEWS.map((review, idx) => (
            <ReviewCard key={idx} {...review} />
          ))}
        </div>
      </section>

      {/* Related Products */}
      <section className="mt-24">
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-stone-900 dark:text-white md:text-3xl">You May Also Like</h2>
          <p className="mt-2 text-stone-500 dark:text-slate-400">Handpicked items that complement your choice.</p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {RELATED_PRODUCTS.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
};
