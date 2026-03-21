export type UserRole = 'buyer' | 'seller' | 'vendor';

export interface User {
  username: string;
  email: string;
  password: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  image: string;
  farmName: string;
  location: string;
  stock: number;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  serviceFee: number;
  deliveryOption: 'pickup' | 'delivery';
  deliveryAddress?: string;
  phoneNumber?: string;
  status: 'pending' | 'confirmed' | 'delivered';
  createdAt: Date;
  hasReview?: boolean;
}

export interface Review {
  id: string;
  orderId: string;
  rating: number;
  feedback: string;
  query?: string;
  createdAt: Date;
}

export interface Farm {
  id: string;
  name: string;
  logo: string;
  heroImage: string;
  location: string;
  rating: number;
  harvestInfo: string;
  deliveryFee: number;
  description: string;
  specialties: string[];
  established: string;
  certifications: string[];
}

export interface VendorProduct {
  id: string;
  product: Product;
  farmPrice: number;
  resalePrice: number;
  targetMarket: string;
  addedAt: Date;
}