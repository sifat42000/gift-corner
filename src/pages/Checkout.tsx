import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  MapPin, 
  Phone, 
  User, 
  Truck, 
  CreditCard, 
  CheckCircle2, 
  ArrowRight,
  Info,
  Smartphone
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

export const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isOrdered, setIsOrdered] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: 'Dhaka',
    area: '',
    paymentMethod: 'cod',
    transactionId: ''
  });

  const [deliveryLocation, setDeliveryLocation] = useState<'inside' | 'outside'>('inside');

  const { shippingCharge, tax, finalTotal } = useMemo(() => {
    const shippingCharge = deliveryLocation === 'inside' ? 60 : 120;
    const tax = totalPrice * 0.08;
    const finalTotal = totalPrice + shippingCharge + tax;
    return { shippingCharge, tax, finalTotal };
  }, [totalPrice, deliveryLocation]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setIsOrdered(true);
      clearCart();
      toast.success('Order placed successfully!', {
        duration: 5000,
        icon: '🎉',
      });
    }, 2000);
  };

  if (cart.length === 0 && !isOrdered) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <h2 className="mb-2 text-2xl font-bold text-stone-900 dark:text-white">Your cart is empty</h2>
        <p className="mb-8 text-stone-500 dark:text-slate-400">Add some items to your cart to proceed to checkout.</p>
        <Link to="/products" className="rounded-full bg-emerald-600 px-8 py-4 font-bold text-white shadow-lg shadow-emerald-200 dark:shadow-none transition-all hover:bg-emerald-700">
          Browse Products
        </Link>
      </div>
    );
  }

  if (isOrdered) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-8 flex justify-center"
        >
          <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/20 p-6 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-20 w-20" />
          </div>
        </motion.div>
        <h1 className="mb-4 text-3xl font-bold text-stone-900 dark:text-white md:text-4xl">Order Placed Successfully!</h1>
        <p className="mb-8 text-stone-500 dark:text-slate-400">
          Thank you for your purchase. We've sent a confirmation email to your inbox. 
          Your order ID is <span className="font-bold text-stone-900 dark:text-white">#GC-{Math.floor(Math.random() * 100000)}</span>
        </p>
        <div className="flex flex-col gap-4 sm:flex-row justify-center">
          <Link to="/" className="rounded-full bg-stone-900 dark:bg-emerald-600 px-8 py-4 font-bold text-white transition-all hover:bg-stone-800 dark:hover:bg-emerald-700">
            Back to Home
          </Link>
          <Link to="/products" className="rounded-full border border-stone-200 dark:border-slate-800 px-8 py-4 font-bold text-stone-900 dark:text-white transition-all hover:bg-stone-50 dark:hover:bg-slate-900">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center gap-2 text-sm font-bold text-stone-500 dark:text-slate-400 hover:text-stone-900 dark:hover:text-white"
        >
          <ChevronLeft className="h-4 w-4" /> Back to Cart
        </button>
        <h1 className="text-2xl font-bold text-stone-900 dark:text-white md:text-3xl">Checkout</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* Left Column: Shipping & Payment */}
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Address */}
          <section className="rounded-3xl border border-stone-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-full bg-emerald-50 dark:bg-emerald-900/20 p-2 text-emerald-600 dark:text-emerald-400">
                <MapPin className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-stone-900 dark:text-white">Shipping Address</h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-slate-500">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400 dark:text-slate-500" />
                  <input 
                    required
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 py-3 pl-11 pr-4 text-sm text-stone-900 dark:text-white focus:border-emerald-600 dark:focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-slate-500">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400 dark:text-slate-500" />
                  <input 
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="01XXXXXXXXX"
                    className="w-full rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 py-3 pl-11 pr-4 text-sm text-stone-900 dark:text-white focus:border-emerald-600 dark:focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-slate-500">Full Address</label>
                <textarea 
                  required
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="House no, Road no, Apartment..."
                  rows={3}
                  className="w-full rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 px-4 py-3 text-sm text-stone-900 dark:text-white focus:border-emerald-600 dark:focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-slate-500">City</label>
                <select 
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 px-4 py-3 text-sm text-stone-900 dark:text-white focus:border-emerald-600 dark:focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none"
                >
                  <option value="Dhaka">Dhaka</option>
                  <option value="Chittagong">Chittagong</option>
                  <option value="Sylhet">Sylhet</option>
                  <option value="Rajshahi">Rajshahi</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-slate-500">Area / Zip Code</label>
                <input 
                  required
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  placeholder="e.g. Dhanmondi"
                  className="w-full rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 px-4 py-3 text-sm text-stone-900 dark:text-white focus:border-emerald-600 dark:focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none"
                />
              </div>
            </div>
          </section>

          {/* Delivery Method */}
          <section className="rounded-3xl border border-stone-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-full bg-emerald-50 dark:bg-emerald-900/20 p-2 text-emerald-600 dark:text-emerald-400">
                <Truck className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-stone-900 dark:text-white">Delivery Method</h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setDeliveryLocation('inside')}
                className={`flex flex-col gap-2 rounded-2xl border-2 p-4 text-left transition-all ${
                  deliveryLocation === 'inside' 
                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' 
                    : 'border-stone-100 dark:border-slate-800 hover:border-stone-200 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900 dark:text-white">Inside Dhaka</span>
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">৳60</span>
                </div>
                <p className="text-xs text-stone-500 dark:text-slate-400">Delivery within 24-48 hours</p>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryLocation('outside')}
                className={`flex flex-col gap-2 rounded-2xl border-2 p-4 text-left transition-all ${
                  deliveryLocation === 'outside' 
                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' 
                    : 'border-stone-100 dark:border-slate-800 hover:border-stone-200 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900 dark:text-white">Outside Dhaka</span>
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">৳120</span>
                </div>
                <p className="text-xs text-stone-500 dark:text-slate-400">Delivery within 3-5 days</p>
              </button>
            </div>
          </section>

          {/* Payment Method */}
          <section className="rounded-3xl border border-stone-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-full bg-emerald-50 dark:bg-emerald-900/20 p-2 text-emerald-600 dark:text-emerald-400">
                <CreditCard className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-stone-900 dark:text-white">Payment Method</h2>
            </div>

            <div className="space-y-4">
              {/* COD */}
              <label className={`flex cursor-pointer items-center gap-4 rounded-2xl border-2 p-4 transition-all ${
                formData.paymentMethod === 'cod' ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' : 'border-stone-100 dark:border-slate-800 hover:border-stone-200 dark:hover:border-slate-700'
              }`}>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={handleInputChange}
                  className="h-4 w-4 accent-emerald-600"
                />
                <div className="flex-1">
                  <p className="font-bold text-stone-900 dark:text-white">Cash on Delivery</p>
                  <p className="text-xs text-stone-500 dark:text-slate-400">Pay when you receive the gift</p>
                </div>
              </label>

              {/* bKash */}
              <div className={`rounded-2xl border-2 transition-all ${
                formData.paymentMethod === 'bkash' ? 'border-[#D12053] bg-pink-50/30 dark:bg-pink-900/10' : 'border-stone-100 dark:border-slate-800 hover:border-stone-200 dark:hover:border-slate-700'
              }`}>
                <label className="flex cursor-pointer items-center gap-4 p-4">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="bkash"
                    checked={formData.paymentMethod === 'bkash'}
                    onChange={handleInputChange}
                    className="h-4 w-4 accent-[#D12053]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-stone-900 dark:text-white">bKash Send Money</p>
                      <span className="rounded bg-[#D12053] px-1.5 py-0.5 text-[10px] font-bold text-white uppercase">Fast</span>
                    </div>
                    <p className="text-xs text-stone-500 dark:text-slate-400">Pay upfront via bKash</p>
                  </div>
                  <img src="https://www.logo.wine/a/logo/BKash/BKash-Logo.wine.svg" alt="bKash" className="h-8 w-auto" />
                </label>

                <AnimatePresence>
                  {formData.paymentMethod === 'bkash' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden px-4 pb-4"
                    >
                      <div className="rounded-xl bg-white dark:bg-slate-900 p-4 border border-pink-100 dark:border-pink-900/30 space-y-3">
                        <div className="flex items-start gap-2 text-xs text-stone-600 dark:text-slate-300">
                          <Info className="h-4 w-4 shrink-0 text-[#D12053]" />
                          <div className="space-y-1">
                            <p className="font-bold text-stone-900 dark:text-white">Instructions:</p>
                            <ol className="list-decimal pl-4 space-y-1">
                              <li>Go to your bKash app or dial *247#</li>
                              <li>Choose <span className="font-bold">Send Money</span></li>
                              <li>Enter Number: <span className="font-bold text-[#D12053]">01700-000000</span></li>
                              <li>Enter Amount: <span className="font-bold text-emerald-600 dark:text-emerald-400">৳{finalTotal.toFixed(0)}</span></li>
                              <li>Enter Reference: <span className="font-bold">GIFT</span></li>
                              <li>After successful payment, enter the <span className="font-bold">Transaction ID</span> below</li>
                            </ol>
                          </div>
                        </div>
                        
                        <div className="space-y-2 pt-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-slate-500">Transaction ID</label>
                          <div className="relative">
                            <Smartphone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400 dark:text-slate-500" />
                            <input 
                              required={formData.paymentMethod === 'bkash'}
                              type="text"
                              name="transactionId"
                              value={formData.transactionId}
                              onChange={handleInputChange}
                              placeholder="e.g. 8N7X6W5V"
                              className="w-full rounded-lg border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 py-2.5 pl-10 pr-4 text-sm text-stone-900 dark:text-white focus:border-[#D12053] focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Order Summary */}
        <div className="space-y-6">
          <div className="sticky top-24 rounded-3xl bg-stone-50 dark:bg-slate-900 p-6 md:p-8">
            <h2 className="mb-6 text-xl font-bold text-stone-900 dark:text-white">Order Summary</h2>
            
            <div className="mb-6 max-h-60 overflow-y-auto pr-2 space-y-4 no-scrollbar">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-white dark:bg-slate-800 border border-stone-100 dark:border-slate-700">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-stone-900 dark:text-white">{item.name}</p>
                    <p className="text-xs text-stone-500 dark:text-slate-400">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-bold text-stone-900 dark:text-white">
                    ${((item.discount ? item.price * (1 - item.discount / 100) : item.price) * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-4 border-t border-stone-200 dark:border-slate-800 pt-6">
              <div className="flex justify-between text-sm">
                <span className="text-stone-500 dark:text-slate-400">Subtotal</span>
                <span className="font-bold text-stone-900 dark:text-white">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-500 dark:text-slate-400">Shipping</span>
                <span className="font-bold text-stone-900 dark:text-white">৳{shippingCharge}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-500 dark:text-slate-400">Estimated Tax</span>
                <span className="font-bold text-stone-900 dark:text-white">${tax.toFixed(2)}</span>
              </div>
              
              <div className="my-6 h-px bg-stone-200 dark:bg-slate-800" />
              
              <div className="flex justify-between text-lg font-bold">
                <span className="text-stone-900 dark:text-white">Total</span>
                <div className="text-right">
                  <span className="block text-emerald-600 dark:text-emerald-400">${finalTotal.toFixed(2)}</span>
                  <span className="text-[10px] font-medium text-stone-400 dark:text-slate-500">Approx. ৳{(finalTotal * 115).toFixed(0)}</span>
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="mt-8 w-full rounded-2xl bg-emerald-600 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-200 dark:shadow-none transition-all hover:bg-emerald-700 hover:shadow-none active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Processing...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  Place Order <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </button>

            <p className="mt-4 text-center text-[10px] text-stone-400 dark:text-slate-500">
              By placing your order, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};
