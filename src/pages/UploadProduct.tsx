import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Upload, ArrowLeft, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';

const UploadProduct: React.FC = () => {
  const { user } = useApp();
  const { toast } = useToast();
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    whatsapp: '',
    email: '',
    paymentInfo: '',
    image: null as File | null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPricingModal(true);
  };

  const handleConfirmUpload = () => {
    setShowPricingModal(false);
    toast({
      title: "Product uploaded!",
      description: "Your product has been successfully uploaded and is pending approval.",
    });
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      price: '',
      category: '',
      whatsapp: '',
      email: '',
      paymentInfo: '',
      image: null
    });
  };

  if (!user || (!user.isSeller && !user.isAdmin)) {
    return (
      <div className="text-center py-12">
        <Alert className="max-w-md mx-auto mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You need to be a seller to upload products.
          </AlertDescription>
        </Alert>
        <Link to="/become-seller">
          <Button className="hero-button">Become a Seller</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      {/* Back Button */}
      <Link to="/">
        <Button variant="ghost">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Upload New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Title */}
            <div>
              <Label htmlFor="title">Product Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Long Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={4}
                required
              />
            </div>

            {/* Price */}
            <div>
              <Label htmlFor="price">Price ($) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                required
              />
            </div>

            {/* Category */}
            <div>
              <Label htmlFor="category">Category *</Label>
              <select
                id="category"
                className="w-full p-2 border border-input rounded-md"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                required
              >
                <option value="">Select Category</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Gadgets">Gadgets</option>
                <option value="Clothing">Clothing</option>
                <option value="Jewelry">Jewelry</option>
                <option value="Gifts">Gifts</option>
              </select>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="whatsapp">WhatsApp</Label>
                <Input
                  id="whatsapp"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            {/* Payment Info */}
            <div>
              <Label htmlFor="paymentInfo">Payment Information</Label>
              <Textarea
                id="paymentInfo"
                value={formData.paymentInfo}
                onChange={(e) => setFormData({...formData, paymentInfo: e.target.value})}
                placeholder="Bank details, payment methods accepted, etc."
                rows={3}
              />
            </div>

            {/* Image Upload */}
            <div>
              <Label htmlFor="image">Product Image * (min 1020x780px)</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => setFormData({...formData, image: e.target.files?.[0] || null})}
                required
              />
            </div>

            <Button type="submit" className="w-full hero-button">
              <Upload className="h-4 w-4 mr-2" />
              Upload Product
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Pricing Modal */}
      <Dialog open={showPricingModal} onOpenChange={setShowPricingModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Seller Fee Information</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-center p-6 bg-muted rounded-lg">
              <h3 className="text-2xl font-bold text-primary mb-2">₦3,000/month</h3>
              <p className="text-sm text-muted-foreground">+ 7% commission per sale</p>
            </div>
            
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Special Offer:</strong> First 3 months absolutely free! Start selling without any upfront costs.
              </AlertDescription>
            </Alert>
            
            <div className="flex space-x-4">
              <Button 
                variant="outline" 
                onClick={() => setShowPricingModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleConfirmUpload}
                className="flex-1 hero-button"
              >
                I Agree - Upload Product
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UploadProduct;