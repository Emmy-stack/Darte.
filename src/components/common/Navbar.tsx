import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingCart, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/contexts/AppContext';
import { Category } from '@/types/product';

const categories: { name: Category; color: string }[] = [
  { name: 'All', color: 'bg-primary text-primary-foreground' },
  { name: 'Men', color: 'category-men' },
  { name: 'Women', color: 'category-women' },
  { name: 'Gadgets', color: 'category-gadgets' },
  { name: 'Clothing', color: 'category-clothing' },
  { name: 'Jewelry', color: 'category-jewelry' },
  { name: 'Gifts', color: 'category-gifts' },
];

const Navbar: React.FC = () => {
  const { cart, favorites, currentCategory, setCurrentCategory, searchQuery, setSearchQuery, user } = useApp();
  const location = useLocation();

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const favoritesCount = favorites.length;

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-gradient">Darté</div>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Button - Mobile only */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>

            {/* Favorites */}
            <Link to="/favorites">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                {favoritesCount > 0 && (
                  <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {favoritesCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Profile/Login */}
            <Link to={user ? "/profile" : "/login"}>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            {/* Become a Seller */}
            <Link to="/become-seller">
              <Button className="hero-button hidden sm:inline-flex">
                Become a Seller
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex space-x-2 pb-4 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <Link 
              key={category.name} 
              to={category.name === 'All' ? '/' : `/${category.name.toLowerCase()}`}
            >
              <Button
                variant={currentCategory === category.name ? "default" : "outline"}
                className={`whitespace-nowrap transition-all duration-300 ${
                  currentCategory === category.name ? category.color : 'hover:' + category.color
                }`}
                onClick={() => setCurrentCategory(category.name)}
              >
                {category.name}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;