import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/common/ProductCard';
import { useApp } from '@/contexts/AppContext';

const Favorites: React.FC = () => {
  const { favorites } = useApp();

  if (favorites.length === 0) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <Heart className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
        <h1 className="text-3xl font-bold mb-4">No Favorites Yet</h1>
        <p className="text-muted-foreground mb-6">Start adding products to your favorites!</p>
        <Link to="/">
          <Button className="hero-button">Explore Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Favorites</h1>
        <span className="text-muted-foreground">{favorites.length} items</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;