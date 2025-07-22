import React from 'react';
import ProductCard from '@/components/common/ProductCard';
import { useApp } from '@/contexts/AppContext';

const SearchResults: React.FC = () => {
  const { products, searchQuery } = useApp();

  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <section>
        <h1 className="text-3xl font-bold mb-2">Search Results</h1>
        <p className="text-muted-foreground mb-6">
          {searchQuery ? `Showing results for "${searchQuery}"` : 'Enter a search term to find products'}
        </p>
        
        {searchQuery && (
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Found {filteredProducts.length} products</h2>
          </div>
        )}
        
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : searchQuery ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found matching your search.</p>
          </div>
        ) : null}
      </section>
    </div>
  );
};

export default SearchResults;