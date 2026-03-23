import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Trash2, 
  Minus, 
  Plus, 
  ShoppingBag, 
  ArrowRight, 
  Gift, 
  Tag, 
  ChevronLeft 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [isCouponApplied, setIsCouponApplied] = useState(false);

  const { shipping, tax, discount, finalTotal } = useMemo(() => {
    const shipping = totalPrice > 100 ? 0 : 15;
    const tax = totalPrice * 0.08;
    const discount = isCouponApplied ? totalPrice * 0.1 : 0;
    const finalTotal = totalPrice + shipping + tax - discount;
    return { shipping, tax, discount, finalTotal };
  }, [totalPrice, isCouponApplied]);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'GIFT10') {
      setIsCouponApplied(true);
      toast.success('Coupon applied! 10% discount added.', {
        icon: '🏷️',
      });
    } else {
      toast.error('Invalid coupon code. Try GIFT10');
    }
  };

  const handleRemove = (id: string, name: string) => {
    removeFromCart(id);
    toast.success(`${name} removed from cart`);
  };

  if (cart.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <div className="mb-6 rounded-full bg-stone-50 p-8">
          <ShoppingBag className="h-12 w-12 text-stone-300" />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-stone-900">Your cart is empty</h2>
        <p className="mb-8 text-stone-500">Looks like you haven't added any gifts yet.</p>
        <Link 
          to="/categories" 
          className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-emerald-700 active:scale-95"
        >
          Start Shopping <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-900 md:text-3xl">Shopping Cart</h1>
        <span className="text-sm font-medium text-stone-500">{cart.length} Items</span>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="hidden border-b border-stone-100 pb-4 md:grid md:grid-cols-12 md:gap-4">
            <div className="md:col-span-6 text-xs font-bold uppercase tracking-widest text-stone-400">Product</div>
            <div className="md:col-span-2 text-center text-xs font-bold uppercase tracking-widest text-stone-400">Quantity</div>
            <div className="md:col-span-2 text-center text-xs font-bold uppercase tracking-widest text-stone-400">Price</div>
            <div className="md:col-span-2 text-right text-xs font-bold uppercase tracking-widest text-stone-400">Total</div>
          </div>

          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {cart.map((item) => {
                const itemPrice = item.discount 
                  ? item.price * (1 - item.discount / 100) 
                  : item.price;
                
                return (
                  <motion.div 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="grid grid-cols-1 gap-4 rounded-2xl border border-stone-100 bg-white p-4 transition-shadow hover:shadow-md md:grid-cols-12 md:items-center md:gap-4 md:border-none md:p-0 md:bg-transparent md:hover:shadow-none"
                  >
                    {/* Product Info */}
                    <div className="flex items-center gap-4 md:col-span-6">
                      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-stone-100 md:h-24 md:w-24">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="h-full w-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <Link to={`/product/${item.id}`} className="block">
                          <h3 className="truncate font-bold text-stone-900 hover:text-emerald-600 transition-colors">{item.name}</h3>
                        </Link>
                        <p className="text-xs text-stone-500">{item.category}</p>
                        <button 
                          onClick={() => handleRemove(item.id, item.name)}
                          className="mt-2 flex items-center gap-1 text-xs font-bold text-rose-500 hover:text-rose-600 md:hidden"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Remove
                        </button>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center justify-between md:col-span-2 md:justify-center">
                      <span className="text-xs font-bold uppercase tracking-widest text-stone-400 md:hidden">Quantity</span>
                      <div className="flex items-center rounded-lg border border-stone-100 bg-white p-1">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 text-stone-400 hover:text-stone-900 disabled:opacity-30"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-stone-900">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 text-stone-400 hover:text-stone-900"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between md:col-span-2 md:justify-center">
                      <span className="text-xs font-bold uppercase tracking-widest text-stone-400 md:hidden">Price</span>
                      <span className="font-medium text-stone-600">${itemPrice.toFixed(2)}</span>
                    </div>

                    {/* Total & Remove Desktop */}
                    <div className="flex items-center justify-between md:col-span-2 md:justify-end">
                      <span className="text-xs font-bold uppercase tracking-widest text-stone-400 md:hidden">Total</span>
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-stone-900">${(itemPrice * item.quantity).toFixed(2)}</span>
                        <button 
                          onClick={() => handleRemove(item.id, item.name)}
                          className="hidden rounded-full p-2 text-stone-300 transition-colors hover:bg-rose-50 hover:text-rose-500 md:block"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Continue Shopping */}
          <Link 
            to="/categories" 
            className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 hover:underline"
          >
            <ChevronLeft className="h-4 w-4" /> Continue Shopping
          </Link>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <div className="rounded-3xl bg-stone-50 p-6 md:p-8">
            <h2 className="mb-6 text-xl font-bold text-stone-900">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Subtotal</span>
                <span className="font-bold text-stone-900">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Shipping</span>
                <span className="font-bold text-stone-900">
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Estimated Tax</span>
                <span className="font-bold text-stone-900">${tax.toFixed(2)}</span>
              </div>
              {isCouponApplied && (
                <div className="flex justify-between text-sm text-emerald-600">
                  <span className="flex items-center gap-1">
                    <Tag className="h-3.5 w-3.5" /> Discount (10%)
                  </span>
                  <span className="font-bold">-${discount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="my-6 h-px bg-stone-200" />
              
              <div className="flex justify-between text-lg font-bold">
                <span className="text-stone-900">Total</span>
                <span className="text-emerald-600">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Coupon Input */}
            <form onSubmit={handleApplyCoupon} className="mt-8">
              <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-stone-400">
                Promo Code
              </label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="GIFT10"
                  className="w-full rounded-xl border border-stone-200 bg-white px-4 py-2 text-sm focus:border-emerald-600 focus:outline-none"
                  disabled={isCouponApplied}
                />
                <button 
                  type="submit"
                  disabled={isCouponApplied || !couponCode}
                  className="rounded-xl bg-stone-900 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-stone-800 disabled:opacity-50"
                >
                  {isCouponApplied ? 'Applied' : 'Apply'}
                </button>
              </div>
            </form>

            <Link 
              to="/checkout"
              className="mt-8 block w-full rounded-2xl bg-emerald-600 py-4 text-center text-sm font-bold text-white shadow-lg shadow-emerald-200 transition-all hover:bg-emerald-700 hover:shadow-none active:scale-95"
            >
              Checkout Now
            </Link>

            <div className="mt-6 flex items-center justify-center gap-4 text-stone-400">
              <Gift className="h-5 w-5" />
              <span className="text-xs font-medium">Add a gift message at checkout</span>
            </div>
          </div>

          {/* Trust Info */}
          <div className="rounded-2xl border border-stone-100 p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-emerald-50 p-2 text-emerald-600">
                <ArrowRight className="h-4 w-4" />
              </div>
              <p className="text-xs font-medium text-stone-600">Free shipping on orders over $100</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-emerald-50 p-2 text-emerald-600">
                <ArrowRight className="h-4 w-4" />
              </div>
              <p className="text-xs font-medium text-stone-600">30-day easy return policy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
