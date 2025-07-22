import React, { useEffect } from 'react';
import ProductCard from '@/components/common/ProductCard';
import { useApp } from '@/contexts/AppContext';
import { Category } from '@/types/product';

interface CategoryPageProps {
  category: Category;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ category }) => {
  const { products, setCurrentCategory } = useApp();

  useEffect(() => {
    setCurrentCategory(category);
  }, [category, setCurrentCategory]);

  const filteredProducts = products.filter(product => 
    product.category.includes(category)
  );

  const getCategoryColor = (cat: Category) => {
    const colors = {
      'Men': 'text-blue-600',
      'Women': 'text-pink-600', 
      'Gadgets': 'text-gray-600',
      'Clothing': 'text-orange-600',
      'Jewelry': 'text-yellow-600',
      'Gifts': 'text-purple-600'
    };
    return colors[cat] || 'text-primary';
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Category Header */}
      <section className="text-center py-8">
        <h1 className={`text-4xl font-bold mb-4 ${getCategoryColor(category)}`}>
          {category} Collection
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover our curated selection of {category.toLowerCase()} products from trusted sellers.
        </p>
      </section>

      {/* Products Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{category} Products</h2>
          <span className="text-muted-foreground">{filteredProducts.length} products</span>
        </div>
        
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found in this category.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default CategoryPage;