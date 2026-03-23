import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { ProtectedRoute } from '../components/ProtectedRoute';

// Lazy load pages
const Home = lazy(() => import('../pages/Home').then(m => ({ default: m.Home })));
const Products = lazy(() => import('../pages/Products').then(m => ({ default: m.Products })));
const Categories = lazy(() => import('../pages/Categories').then(m => ({ default: m.Categories })));
const ProductDetails = lazy(() => import('../pages/ProductDetails').then(m => ({ default: m.ProductDetails })));
const Cart = lazy(() => import('../pages/Cart').then(m => ({ default: m.Cart })));
const Checkout = lazy(() => import('../pages/Checkout').then(m => ({ default: m.Checkout })));
const Login = lazy(() => import('../pages/Login').then(m => ({ default: m.Login })));
const Register = lazy(() => import('../pages/Register').then(m => ({ default: m.Register })));
const Dashboard = lazy(() => import('../pages/Dashboard').then(m => ({ default: m.Dashboard })));
const Wishlist = lazy(() => import('../pages/Wishlist').then(m => ({ default: m.Wishlist })));
const Deals = lazy(() => import('../pages/Deals').then(m => ({ default: m.Deals })));

const PageLoader = () => (
  <div className="flex h-[60vh] items-center justify-center">
    <div className="h-12 w-12 animate-spin rounded-full border-4 border-stone-100 border-t-emerald-600"></div>
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'products',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Products />
          </Suspense>
        ),
      },
      {
        path: 'product/:id',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProductDetails />
          </Suspense>
        ),
      },
      {
        path: 'cart',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: 'checkout',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<PageLoader />}>
              <Checkout />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<PageLoader />}>
              <Dashboard />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin',
        element: (
          <ProtectedRoute requireAdmin={true}>
            <div className="p-20 text-center">
              <h1 className="text-3xl font-bold text-stone-900">Admin Dashboard</h1>
              <p className="mt-4 text-stone-500">Only administrators can see this page.</p>
            </div>
          </ProtectedRoute>
        ),
      },
      {
        path: 'login',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: 'register',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: 'categories',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Categories />
          </Suspense>
        ),
      },
      {
        path: 'wishlist',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Wishlist />
          </Suspense>
        ),
      },
      {
        path: 'deals',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Deals />
          </Suspense>
        ),
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
