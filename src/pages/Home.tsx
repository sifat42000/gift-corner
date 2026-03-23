import React, { useMemo } from 'react';
import { ArrowRight, Gift, Sparkles, Heart, Clock, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ProductCard } from '../components/ProductCard';
import { CategoryCard } from '../components/CategoryCard';
import { ReviewCard } from '../components/ReviewCard';

export const Home = () => {
  const featuredProducts = useMemo(() => [
    { id: '1', name: 'Premium Eid Gift Box', description: 'A curated selection of artisanal treats.', price: 89.99, image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800', category: 'Eid Special', discount: 15, rating: 4.9 },
    { id: '2', name: 'Birthday Surprise Hamper', description: 'Everything needed for a perfect celebration.', price: 64.50, image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=800', category: 'Birthday', rating: 4.8 },
    { id: '3', name: 'Personalized Photo Frame', description: 'Capture memories that last forever.', price: 35.00, image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800', category: 'Personalized', discount: 10, rating: 4.7 },
    { id: '4', name: 'Luxury Scented Candle', description: 'Hand-poured with natural soy wax.', price: 28.00, image: 'https://images.unsplash.com/photo-1602872030219-3fd6380475c7?auto=format&fit=crop&q=80&w=800', category: 'Home Decor', rating: 4.9 },
  ], []);

  const categories = useMemo(() => [
    { name: 'Eid Collection', image: 'https://images.unsplash.com/photo-1564182842-76429398d68e?auto=format&fit=crop&q=80&w=800', href: '/categories/eid' },
    { name: 'Birthday Gifts', image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=800', href: '/categories/birthday' },
    { name: 'Anniversary', image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=800', href: '/categories/anniversary' },
  ], []);

  const reviews = useMemo(() => [
    { name: 'Sarah J.', review: 'The Eid gift box was absolutely stunning. My family loved every bit of it!', rating: 5, image: 'https://i.pravatar.cc/150?u=sarah' },
    { name: 'Michael R.', review: 'Fast delivery and the packaging was so elegant. Highly recommend for birthday surprises.', rating: 5, image: 'https://i.pravatar.cc/150?u=michael' },
    { name: 'Elena W.', review: 'The personalized frame exceeded my expectations. Such a thoughtful gift idea.', rating: 4, image: 'https://i.pravatar.cc/150?u=elena' },
  ], []);

  return (
    <div className="space-y-16 py-12 md:space-y-32 md:py-0 overflow-hidden transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] md:h-[85vh] md:min-h-[700px] overflow-hidden bg-stone-900">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{ duration: 1.5 }}
          src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=1600" 
          alt="Luxury Gifts" 
          className="absolute inset-0 h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/90 via-stone-900/50 to-transparent md:from-stone-900/80" />
        
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl space-y-4 md:space-y-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1 text-[10px] font-semibold text-emerald-400 backdrop-blur-md md:px-4 md:py-2 md:text-sm">
              <Sparkles className="h-3 w-3 md:h-4 w-4" />
              <span>New Eid Collection is Here</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-6xl md:text-8xl">
              Celebrate with <span className="text-emerald-400">Thoughtful</span> Gifts
            </h1>
            <p className="text-sm text-stone-300 leading-relaxed md:text-xl">
              Discover our curated collections for Eid, Birthdays, and every special moment in between. We deliver joy right to their doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2 md:gap-4 md:pt-4">
              <Link to="/categories" className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-emerald-700 hover:scale-105 active:scale-95 md:px-10 md:py-5 md:text-lg">
                Shop Collection <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
              </Link>
              <Link to="/categories" className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-md transition-all hover:bg-white/20 md:px-10 md:py-5 md:text-lg">
                View Offers
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
          {[
            { icon: Clock, title: 'Fast Delivery', desc: 'Same day delivery available in select cities.' },
            { icon: Heart, title: 'Hand-Picked', desc: 'Every item is selected with care and love.' },
            { icon: ShieldCheck, title: 'Secure Payment', desc: '100% secure checkout with multiple options.' },
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 rounded-2xl bg-stone-50 p-6 border border-stone-100 dark:bg-slate-900 dark:border-slate-800 md:gap-6 md:p-8"
            >
              <div className="rounded-xl bg-white p-3 shadow-sm dark:bg-slate-800 md:p-4">
                <item.icon className="h-6 w-6 text-emerald-600 md:h-8 md:w-8" />
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-900 dark:text-white md:text-lg">{item.title}</h3>
                <p className="text-xs text-stone-500 dark:text-slate-400 md:text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white md:text-4xl">Featured Gifts</h2>
            <p className="mt-1 text-base text-stone-500 dark:text-slate-400 md:mt-2 md:text-lg">Our most loved items this season.</p>
          </div>
          <Link to="/products" className="group flex items-center gap-2 text-sm font-bold text-emerald-600 md:text-base dark:text-emerald-400">
            View All Products <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:mt-12 md:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Categories Preview */}
      <section className="bg-stone-50 py-16 dark:bg-slate-900/50 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-10 md:space-y-4 md:mb-16">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-white md:text-4xl">Shop by Occasion</h2>
            <p className="text-base text-stone-500 max-w-2xl mx-auto dark:text-slate-400 md:text-lg">
              Find the perfect gift tailored for the moments that matter most.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 md:gap-8">
            {categories.map((cat, i) => (
              <CategoryCard key={cat.name} {...cat} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Special Discount Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-emerald-600 px-6 py-12 text-center text-white md:rounded-[2.5rem] md:px-8 md:py-20"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-white blur-3xl" />
            <div className="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-white blur-3xl" />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto space-y-6 md:space-y-8">
            <h2 className="text-3xl font-bold sm:text-5xl md:text-6xl">Save 20% on your first order!</h2>
            <p className="text-base text-emerald-50 md:text-xl">
              Join our community today and get exclusive access to new collections and special offers.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 md:gap-4 md:pt-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full sm:w-80 rounded-full border-none bg-white px-6 py-4 text-stone-900 focus:ring-4 focus:ring-emerald-400/50 outline-none dark:bg-slate-900 dark:text-white md:px-8 md:py-5"
              />
              <button className="w-full sm:w-auto rounded-full bg-stone-900 px-8 py-4 font-bold text-white transition-all hover:bg-stone-800 active:scale-95 dark:bg-black dark:hover:bg-slate-950 md:px-10 md:py-5">
                Get Discount
              </button>
            </div>
            <p className="text-[10px] text-emerald-200 uppercase tracking-widest md:text-sm md:normal-case md:tracking-normal">
              * Offer valid for new customers only. Terms and conditions apply.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Customer Reviews */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10 md:space-y-4 md:mb-16">
          <h2 className="text-2xl font-bold text-stone-900 dark:text-white md:text-4xl">What Our Customers Say</h2>
          <p className="text-base text-stone-500 dark:text-slate-400 md:text-lg">Real stories from people who shared the joy.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {reviews.map((review, i) => (
            <ReviewCard key={review.name} {...review} delay={i * 0.1} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-stone-100 py-16 dark:border-slate-800 md:py-24 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6 md:space-y-8">
          <Gift className="mx-auto h-12 w-12 text-emerald-600 md:h-16 md:w-16" />
          <h2 className="text-3xl font-bold text-stone-900 dark:text-white md:text-4xl">Ready to make someone's day?</h2>
          <p className="text-base text-stone-500 max-w-2xl mx-auto dark:text-slate-400 md:text-xl">
            Browse our full catalog and find that special something that says it all.
          </p>
          <Link to="/products" className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-8 py-4 text-lg font-bold text-white transition-all hover:bg-stone-800 hover:scale-105 dark:bg-slate-900 dark:hover:bg-slate-800 md:px-12 md:py-6 md:text-xl">
            Start Shopping <ArrowRight className="h-6 w-6" />
          </Link>
        </div>
      </section>
    </div>
  );
};

