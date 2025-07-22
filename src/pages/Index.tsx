import React, { useEffect } from 'react';
import ProductCard from '@/components/common/ProductCard';
import { useApp } from '@/contexts/AppContext';

const Index: React.FC = () => {
  const { products, favorites, setCurrentCategory } = useApp();

  useEffect(() => {
    setCurrentCategory('All');
  }, [setCurrentCategory]);

  // Get recommended products (most favorited)
  const recommendedProducts = products
    .sort((a, b) => b.reviews - a.reviews)
    .slice(0, 4);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <section className="bg-hero rounded-3xl p-8 md:p-12 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-4">
          Welcome to Darté
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Discover amazing products from trusted sellers. Shop fashion, gadgets, jewelry and more.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="hero-button">Shop Now</button>
          <button className="hero-button bg-white text-primary hover:bg-gray-50">
            Become a Seller
          </button>
        </div>
      </section>

      {/* Recommended Products */}
      {recommendedProducts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Recommended for You</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* All Products */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">All Products</h2>
          <span className="text-muted-foreground">{products.length} products</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;