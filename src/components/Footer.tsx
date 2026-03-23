import React from 'react';
import { Link } from 'react-router-dom';
import { Gift, Instagram, Twitter, Facebook, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-stone-200 dark:border-slate-800 bg-stone-50 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand & Socials */}
          <div className="space-y-4 md:space-y-6">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-stone-900 dark:text-white">
              <Gift className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              <span>Gift Corner</span>
            </Link>
            <p className="text-sm leading-relaxed text-stone-500 dark:text-slate-400 max-w-xs">
              Curating the world's most unique and thoughtful gifts for every occasion. Making memories one gift at a time.
            </p>
            <div className="flex gap-4">
              <a href="#" className="rounded-full bg-white dark:bg-slate-900 p-3 text-stone-400 dark:text-slate-500 shadow-sm transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="rounded-full bg-white dark:bg-slate-900 p-3 text-stone-400 dark:text-slate-500 shadow-sm transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="rounded-full bg-white dark:bg-slate-900 p-3 text-stone-400 dark:text-slate-500 shadow-sm transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-stone-900 dark:text-white md:text-sm">Shop</h3>
            <ul className="mt-4 space-y-2 md:mt-6 md:space-y-3">
              <li><Link to="/categories" className="text-sm text-stone-600 dark:text-slate-400 transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">All Products</Link></li>
              <li><Link to="/categories" className="text-sm text-stone-600 dark:text-slate-400 transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">Personalized Gifts</Link></li>
              <li><Link to="/categories" className="text-sm text-stone-600 dark:text-slate-400 transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">Home & Living</Link></li>
              <li><Link to="/categories" className="text-sm text-stone-600 dark:text-slate-400 transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">Special Offers</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-stone-900 dark:text-white md:text-sm">Contact Us</h3>
            <ul className="mt-4 space-y-3 md:mt-6 md:space-y-4">
              <li className="flex items-start gap-3 text-sm text-stone-600 dark:text-slate-400">
                <MapPin className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span className="leading-tight">123 Gifting Lane, Suite 101<br />San Francisco, CA 94103</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-stone-600 dark:text-slate-400">
                <Phone className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span>+1 (555) 000-0000</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-stone-600 dark:text-slate-400">
                <Mail className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span className="truncate">hello@giftcorner.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="sm:col-span-2 md:col-span-1">
            <h3 className="text-xs font-bold uppercase tracking-widest text-stone-900 dark:text-white md:text-sm">Newsletter</h3>
            <p className="mt-4 text-sm text-stone-600 dark:text-slate-400 md:mt-6">Get 10% off your first order when you sign up.</p>
            <form className="mt-4 flex flex-col gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full rounded-xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm text-stone-900 dark:text-white focus:border-emerald-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-600"
              />
              <button className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-700">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 border-t border-stone-200 dark:border-slate-800 pt-8 flex flex-col items-center justify-between gap-4 md:mt-16 md:flex-row">
          <p className="text-[10px] text-stone-400 dark:text-slate-500 md:text-xs">
            © {new Date().getFullYear()} Gift Corner Inc. All rights reserved.
          </p>
          <div className="flex gap-4 text-[10px] text-stone-400 dark:text-slate-500 md:gap-6 md:text-xs">
            <a href="#" className="hover:text-stone-600 dark:hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-stone-600 dark:hover:text-slate-300">Terms of Service</a>
            <a href="#" className="hover:text-stone-600 dark:hover:text-slate-300">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

