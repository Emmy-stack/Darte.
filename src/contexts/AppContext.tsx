import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product, CartItem, User, Category } from '../types/product';
import { mockProducts, mockUser } from '../data/mockData';

interface AppContextType {
  products: Product[];
  cart: CartItem[];
  favorites: Product[];
  user: User | null;
  currentCategory: Category;
  searchQuery: string;
  
  // Actions
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  toggleFavorite: (product: Product) => void;
  setCurrentCategory: (category: Category) => void;
  setSearchQuery: (query: string) => void;
  login: (user: User) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [products] = useState<Product[]>(mockProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(mockUser);
  const [currentCategory, setCurrentCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const toggleFavorite = (product: Product) => {
    setFavorites(prev => {
      const isFavorited = prev.some(fav => fav.id === product.id);
      if (isFavorited) {
        return prev.filter(fav => fav.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const login = (newUser: User) => {
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const value: AppContextType = {
    products,
    cart,
    favorites,
    user,
    currentCategory,
    searchQuery,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    toggleFavorite,
    setCurrentCategory,
    setSearchQuery,
    login,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};