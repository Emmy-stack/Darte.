export interface Product {
  id: string;
  title: string;
  price: number;
  rating: number;
  seller: string;
  image: string;
  category: string[];
  description: string;
  isFavorited: boolean;
  inStock: boolean;
  reviews: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  profileImage: string;
  isSeller: boolean;
  isAdmin: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  productId?: string;
}

export type Category = 'All' | 'Men' | 'Women' | 'Gadgets' | 'Clothing' | 'Jewelry' | 'Gifts';