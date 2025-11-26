
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  featured?: boolean;
  shippingInfo?: string; // e.g., "In Stock - Windhoek" or "Import Order (CN)"
  specs?: {
    hpGain?: string;
    weight?: string;
    material?: string;
    fitment?: string;
  };
  // Vehicle Specifics
  make?: string;
  model?: string;
  year?: number;
  mileage?: string;
  transmission?: 'Automatic' | 'Manual' | 'DSG' | 'PDK';
  fuelType?: 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
  engine?: string;
  zeroToSixty?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image?: string;
  description?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum PageView {
  HOME = 'HOME',
  PRODUCTS = 'PRODUCTS',
  PRODUCT_DETAIL = 'PRODUCT_DETAIL',
  CART = 'CART',
  WISHLIST = 'WISHLIST',
  COMPARE = 'COMPARE',
  SERVICES = 'SERVICES',
  INNOVATION = 'INNOVATION',
  PROFILE = 'PROFILE'
}
