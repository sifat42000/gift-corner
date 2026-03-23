export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  occasion?: string;
  gender?: string;
  discount?: number;
  rating?: number;
  images?: string[];
  variants?: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
}
