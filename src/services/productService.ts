import { Product } from '../types';

// Mock service for product data
export const productService = {
  getProducts: async (): Promise<Product[]> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          Array.from({ length: 8 }).map((_, i) => ({
            id: `p-${i}`,
            name: `Gift Item ${i + 1}`,
            description: 'A beautiful handcrafted gift for your loved ones.',
            price: Math.floor(Math.random() * 100) + 20,
            image: `https://picsum.photos/seed/gift-${i}/600/600`,
            category: 'General',
          }))
        );
      }, 500);
    });
  },

  getProductById: async (id: string): Promise<Product | null> => {
    const products = await productService.getProducts();
    return products.find((p) => p.id === id) || null;
  },
};
