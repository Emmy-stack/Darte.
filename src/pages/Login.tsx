import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
  });
  const { login } = useApp();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock login/signup
    const mockUser = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      username: formData.username || 'user',
      email: formData.email,
      profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b775',
      isSeller: false,
      isAdmin: false
    };
    
    login(mockUser);
    toast({
      title: isLogin ? "Welcome back!" : "Account created!",
      description: `You have successfully ${isLogin ? 'logged in' : 'signed up'}.`,
    });
    navigate('/');
  };

  const handleGoogleLogin = () => {
    toast({
      title: "Google Sign In",
      description: "Google OAuth would be implemented here.",
    });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center animate-fade-in">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gradient">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  required
                />
              </div>
            )}
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
            
            <Button type="submit" className="w-full hero-button">
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleGoogleLogin}
          >
            Continue with Google
          </Button>
          
          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-primary hover:underline"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
          
          {isLogin && (
            <div className="text-center">
              <Link to="/forgot-password" className="text-sm text-muted-foreground hover:underline">
                Forgot your password?
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;