import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase.config';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  doc, 
  updateDoc, 
  arrayUnion, 
  arrayRemove,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  Settings, 
  ChevronRight, 
  Plus, 
  Trash2, 
  Edit2,
  CheckCircle2,
  Clock,
  Truck,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DashboardSkeleton, Skeleton } from '../components/Skeleton';

interface Address {
  id: string;
  label: string;
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: any;
  createdAt: any;
}

interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  addedAt: any;
}

export const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'wishlist' | 'addresses'>('profile');
  const [orders, setOrders] = useState<Order[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    setLoading(true);
    // Fetch User Profile
    const userDocRef = doc(db, 'users', user.uid);
    const unsubscribeProfile = onSnapshot(userDocRef, (doc) => {
      if (doc.exists()) {
        setUserProfile(doc.data());
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching profile:", error);
      setLoading(false);
    });

    // Fetch Orders
    const ordersQuery = query(
      collection(db, 'orders'), 
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );
    const unsubscribeOrders = onSnapshot(ordersQuery, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
      setOrders(ordersData);
    }, (error) => {
      console.error("Error fetching orders:", error);
    });

    // Fetch Wishlist
    const wishlistQuery = query(
      collection(db, 'wishlist'), 
      where('userId', '==', user.uid)
    );
    const unsubscribeWishlist = onSnapshot(wishlistQuery, (snapshot) => {
      const wishlistData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as WishlistItem));
      setWishlist(wishlistData);
    }, (error) => {
      console.error("Error fetching wishlist:", error);
    });

    return () => {
      unsubscribeProfile();
      unsubscribeOrders();
      unsubscribeWishlist();
    };
  }, [user]);

  const tabs = useMemo(() => [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
  ], []);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="mt-2 h-4 w-64" />
        </div>
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="space-y-2 rounded-3xl border border-stone-100 bg-white p-2 shadow-sm">
              {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-10 w-full rounded-2xl" />)}
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="rounded-3xl border border-stone-100 bg-white p-8 shadow-sm">
              <DashboardSkeleton />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900">My Account</h1>
        <p className="text-stone-500">Manage your profile, orders, and preferences</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="flex flex-col gap-1 rounded-3xl border border-stone-100 bg-white p-2 shadow-sm">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all ${
                    activeTab === tab.id 
                      ? 'bg-emerald-50 text-emerald-600' 
                      : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div 
                      layoutId="activeTab"
                      className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-600"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="rounded-3xl border border-stone-100 bg-white p-8 shadow-sm"
            >
              {activeTab === 'profile' && (
                <div className="space-y-8">
                  <div className="flex items-center gap-6">
                    <div className="h-24 w-24 overflow-hidden rounded-3xl bg-stone-100">
                      {user?.photoURL ? (
                        <img src={user.photoURL} alt={user.displayName || 'User'} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-emerald-100 text-3xl font-bold text-emerald-600">
                          {user?.email?.[0].toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-stone-900">{user?.displayName || 'User'}</h2>
                      <p className="text-stone-500">{user?.email}</p>
                      <button className="mt-2 text-sm font-bold text-emerald-600 hover:underline">Edit Profile</button>
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Full Name</label>
                      <p className="rounded-xl border border-stone-100 bg-stone-50 p-3 text-stone-900">{user?.displayName || 'Not set'}</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Email Address</label>
                      <p className="rounded-xl border border-stone-100 bg-stone-50 p-3 text-stone-900">{user?.email}</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Phone Number</label>
                      <p className="rounded-xl border border-stone-100 bg-stone-50 p-3 text-stone-900">{userProfile?.phoneNumber || 'Not set'}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-stone-900">Order History</h2>
                    <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-bold text-stone-600">{orders.length} Orders</span>
                  </div>

                  {orders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="mb-4 rounded-full bg-stone-50 p-4">
                        <Package className="h-8 w-8 text-stone-300" />
                      </div>
                      <p className="text-stone-500">You haven't placed any orders yet.</p>
                      <button className="mt-4 font-bold text-emerald-600 hover:underline">Start Shopping</button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="rounded-2xl border border-stone-100 p-6 transition-all hover:border-emerald-100 hover:bg-emerald-50/10">
                          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                            <div>
                              <p className="text-xs font-bold uppercase tracking-widest text-stone-400">Order #{order.id.slice(0, 8)}</p>
                              <p className="text-sm text-stone-500">{new Date(order.createdAt?.toDate()).toLocaleDateString()}</p>
                            </div>
                            <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold shadow-sm">
                              {order.status === 'delivered' && <CheckCircle2 className="h-3 w-3 text-emerald-500" />}
                              {order.status === 'processing' && <Clock className="h-3 w-3 text-amber-500" />}
                              {order.status === 'shipped' && <Truck className="h-3 w-3 text-blue-500" />}
                              <span className="capitalize">{order.status}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex -space-x-3 overflow-hidden">
                              {order.items.slice(0, 3).map((item, i) => (
                                <img 
                                  key={i} 
                                  src={item.image} 
                                  alt={item.name} 
                                  className="h-10 w-10 rounded-full border-2 border-white object-cover" 
                                />
                              ))}
                              {order.items.length > 3 && (
                                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-stone-100 text-[10px] font-bold text-stone-600">
                                  +{order.items.length - 3}
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-bold text-stone-900">${order.totalAmount.toFixed(2)}</p>
                              <p className="text-xs text-stone-500">{order.items.length} items</p>
                            </div>
                            <button className="rounded-xl bg-stone-50 p-2 text-stone-400 transition-colors hover:bg-emerald-100 hover:text-emerald-600">
                              <ChevronRight className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-stone-900">My Wishlist</h2>
                    <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-bold text-stone-600">{wishlist.length} Items</span>
                  </div>

                  {wishlist.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="mb-4 rounded-full bg-stone-50 p-4">
                        <Heart className="h-8 w-8 text-stone-300" />
                      </div>
                      <p className="text-stone-500">Your wishlist is empty.</p>
                      <button className="mt-4 font-bold text-emerald-600 hover:underline">Browse Products</button>
                    </div>
                  ) : (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {wishlist.map((item) => (
                        <div key={item.id} className="group relative flex items-center gap-4 rounded-2xl border border-stone-100 p-4 transition-all hover:bg-stone-50">
                          <div className="h-16 w-16 overflow-hidden rounded-xl bg-stone-100">
                            <img src={`https://picsum.photos/seed/${item.productId}/200/200`} alt="Product" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-bold text-stone-900">Gift Item {item.productId.slice(0, 4)}</p>
                            <p className="text-xs text-stone-500">Added on {new Date(item.addedAt?.toDate()).toLocaleDateString()}</p>
                          </div>
                          <button className="rounded-lg p-2 text-stone-300 transition-colors hover:bg-rose-50 hover:text-rose-500">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'addresses' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-stone-900">Saved Addresses</h2>
                    <button className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-emerald-200 transition-all hover:bg-emerald-700 hover:shadow-none">
                      <Plus className="h-4 w-4" />
                      Add New
                    </button>
                  </div>

                  {!userProfile?.addresses || userProfile.addresses.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="mb-4 rounded-full bg-stone-50 p-4">
                        <MapPin className="h-8 w-8 text-stone-300" />
                      </div>
                      <p className="text-stone-500">You haven't saved any addresses yet.</p>
                    </div>
                  ) : (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {userProfile.addresses.map((address: Address) => (
                        <div key={address.id} className={`relative rounded-2xl border p-6 transition-all ${address.isDefault ? 'border-emerald-600 bg-emerald-50/30' : 'border-stone-100 hover:bg-stone-50'}`}>
                          {address.isDefault && (
                            <span className="absolute right-4 top-4 rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">Default</span>
                          )}
                          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-stone-400">{address.label}</p>
                          <p className="font-bold text-stone-900">{address.fullName}</p>
                          <p className="mt-2 text-sm text-stone-600">{address.street}</p>
                          <p className="text-sm text-stone-600">{address.city}, {address.state} {address.zipCode}</p>
                          <p className="text-sm text-stone-600">{address.country}</p>
                          
                          <div className="mt-6 flex items-center gap-3">
                            <button className="flex items-center gap-1 text-xs font-bold text-stone-400 hover:text-stone-900">
                              <Edit2 className="h-3 w-3" />
                              Edit
                            </button>
                            <button className="flex items-center gap-1 text-xs font-bold text-stone-400 hover:text-rose-500">
                              <Trash2 className="h-3 w-3" />
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
