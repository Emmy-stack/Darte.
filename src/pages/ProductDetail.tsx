import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, MessageCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart, toggleFavorite, favorites } = useApp();
  const { toast } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const product = products.find(p => p.id === id);
  
  if (!product) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Link to="/">
          <Button className="hero-button">Back to Home</Button>
        </Link>
      </div>
    );
  }

  const isFavorited = favorites.some(fav => fav.id === product.id);
  
  // Mock additional images
  const images = [product.image, product.image, product.image];

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    });
  };

  const handleToggleFavorite = () => {
    toggleFavorite(product);
    toast({
      title: isFavorited ? "Removed from favorites" : "Added to favorites",
      description: `${product.title} has been ${isFavorited ? 'removed from' : 'added to'} your favorites.`,
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Back Button */}
      <Link to="/">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden">
            <img
              src={images[currentImageIndex]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Image Thumbnails */}
          <div className="flex space-x-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                  currentImageIndex === index ? 'border-primary' : 'border-transparent'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {product.category.map((cat) => (
              <Badge key={cat} variant="outline">
                {cat}
              </Badge>
            ))}
          </div>

          {/* Title and Price */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <p className="text-2xl font-bold text-primary">${product.price}</p>
          </div>

          {/* Rating and Reviews */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 font-medium">{product.rating}</span>
            </div>
            <span className="text-muted-foreground">({product.reviews} reviews)</span>
          </div>

          {/* Seller Info */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Seller Information</h3>
              <p className="text-muted-foreground">{product.seller}</p>
            </CardContent>
          </Card>

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          {/* Stock Status */}
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className={product.inStock ? 'text-green-600' : 'text-red-600'}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex-1 hero-button"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>
            
            <Button
              variant="outline"
              onClick={handleToggleFavorite}
              className="px-6"
            >
              <Heart className={`h-5 w-5 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
          </div>

          {/* Contact Seller */}
          <Link to={`/message/seller_001`}>
            <Button variant="outline" className="w-full">
              <MessageCircle className="h-5 w-5 mr-2" />
              Message Seller
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;