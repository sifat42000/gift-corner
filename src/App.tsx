/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppRouter } from './routes';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from 'react-hot-toast';

const Providers = React.memo(({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
});

export default function App() {
  return (
    <ThemeProvider>
      <Providers>
        <AppRouter />
        <Toaster position="top-center" />
      </Providers>
    </ThemeProvider>
  );
}

