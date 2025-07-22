import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Star, TrendingUp, Shield, ArrowLeft, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';

const BecomeSeller: React.FC = () => {
  const { user } = useApp();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    businessName: '',
    description: '',
    experience: '',
    whatsapp: '',
    email: '',
    website: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application submitted!",
      description: "Your seller application has been submitted and is under review.",
    });
    
    // Reset form
    setFormData({
      businessName: '',
      description: '',
      experience: '',
      whatsapp: '',
      email: '',
      website: ''
    });
  };

  const benefits = [
    {
      icon: <DollarSign className="h-8 w-8 text-green-500" />,
      title: "Earn More",
      description: "Keep 93% of your sales with our low 7% commission rate"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-500" />,
      title: "Grow Your Business",
      description: "Access to thousands of potential customers daily"
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-500" />,
      title: "Secure Platform",
      description: "Protected payments and buyer-seller protection"
    },
    {
      icon: <Star className="h-8 w-8 text-yellow-500" />,
      title: "Build Your Brand",
      description: "Create a trusted seller profile with customer reviews"
    }
  ];

  const steps = [
    "Fill out the application form below",
    "Wait for admin approval (usually 24-48 hours)",
    "Complete your seller profile",
    "Start uploading and selling your products"
  ];

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Back Button */}
      <Link to="/">
        <Button variant="ghost">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
      </Link>

      {/* Hero Section */}
      <section className="text-center py-12 bg-hero rounded-3xl">
        <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-6">
          Start Selling on Darté
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Join thousands of successful sellers and turn your products into profit. 
          Low fees, high exposure, and powerful tools to grow your business.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-lg">
          <div className="flex items-center space-x-2">
            <Check className="h-5 w-5 text-green-500" />
            <span>First 3 months FREE</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="h-5 w-5 text-green-500" />
            <span>Only 7% commission</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="h-5 w-5 text-green-500" />
            <span>No setup fees</span>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">Why Sell with Darté?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center hover-lift">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">How to Get Started</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {index + 1}
                </div>
                <p className="text-muted-foreground">{step}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="text-center py-12 bg-muted rounded-3xl">
        <h2 className="text-3xl font-bold mb-6">Simple, Transparent Pricing</h2>
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Seller Plan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">₦3,000</div>
                <div className="text-muted-foreground">per month</div>
                <div className="text-sm text-muted-foreground mt-2">+ 7% commission per sale</div>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="text-green-800 font-semibold">🎉 Special Launch Offer</div>
                <div className="text-green-700 text-sm">First 3 months absolutely FREE!</div>
              </div>

              <ul className="space-y-2 text-sm text-left">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Unlimited product uploads
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Customer messaging system
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Analytics and insights
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  24/7 seller support
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Application Form */}
      <section>
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Seller Application</CardTitle>
              <p className="text-center text-muted-foreground">
                {user ? 'Complete the form below to become a seller' : 'Please log in to apply as a seller'}
              </p>
            </CardHeader>
            <CardContent>
              {user ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="businessName">Business/Store Name *</Label>
                    <Input
                      id="businessName"
                      value={formData.businessName}
                      onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Business Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Tell us about your business and what you sell..."
                      rows={4}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="experience">Selling Experience</Label>
                    <Textarea
                      id="experience"
                      value={formData.experience}
                      onChange={(e) => setFormData({...formData, experience: e.target.value})}
                      placeholder="Describe your previous selling experience (optional)"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="whatsapp">WhatsApp Number</Label>
                      <Input
                        id="whatsapp"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Business Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="website">Website/Social Media (optional)</Label>
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) => setFormData({...formData, website: e.target.value})}
                      placeholder="https://yourwebsite.com or @yoursocial"
                    />
                  </div>

                  <Button type="submit" className="w-full hero-button">
                    Submit Application
                  </Button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">You need to be logged in to apply</p>
                  <Link to="/login">
                    <Button className="hero-button">Log In to Apply</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-6 text-left">
              <h3 className="font-semibold mb-2">How long does approval take?</h3>
              <p className="text-sm text-muted-foreground">
                Most applications are reviewed within 24-48 hours. You'll receive an email once approved.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-left">
              <h3 className="font-semibold mb-2">What can I sell?</h3>
              <p className="text-sm text-muted-foreground">
                Almost anything legal! Fashion, electronics, handmade items, digital products, and more.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-left">
              <h3 className="font-semibold mb-2">When do I get paid?</h3>
              <p className="text-sm text-muted-foreground">
                Payments are processed weekly directly to your bank account or mobile money.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-left">
              <h3 className="font-semibold mb-2">Is there seller support?</h3>
              <p className="text-sm text-muted-foreground">
                Yes! Our dedicated seller support team is available 24/7 to help you succeed.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default BecomeSeller;