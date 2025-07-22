import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Product } from '@/types/product';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleFavorite, favorites } = useApp();
  const { toast } = useToast();
  
  const isFavorited = favorites.some(fav => fav.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    });
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(product);
    toast({
      title: isFavorited ? "Removed from favorites" : "Added to favorites",
      description: `${product.title} has been ${isFavorited ? 'removed from' : 'added to'} your favorites.`,
    });
  };

  return (
    <Card className="product-card group">
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={handleToggleFavorite}
            className="bg-white/90 hover:bg-white"
          >
            <Heart className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
          
          <Link to={`/product/${product.id}`}>
            <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
          
          <Button 
            size="sm" 
            onClick={handleAddToCart}
            className="hero-button"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>

        {/* Stock Badge */}
        {!product.inStock && (
          <Badge variant="destructive" className="absolute top-2 left-2">
            Out of Stock
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          {/* Category Tags */}
          <div className="flex flex-wrap gap-1">
            {product.category.map((cat) => (
              <Badge key={cat} variant="outline" className="text-xs">
                {cat}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h3 className="font-semibold text-sm line-clamp-2 hover:text-primary transition-colors">
            {product.title}
          </h3>

          {/* Rating and Reviews */}
          <div className="flex items-center space-x-2 text-sm">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 font-medium">{product.rating}</span>
            </div>
            <span className="text-muted-foreground">({product.reviews})</span>
          </div>

          {/* Seller */}
          <p className="text-xs text-muted-foreground">by {product.seller}</p>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-primary">${product.price}</span>
          </div>
          
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleToggleFavorite}
              className="p-2"
            >
              <Heart className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            
            <Button 
              size="sm" 
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex-1"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;