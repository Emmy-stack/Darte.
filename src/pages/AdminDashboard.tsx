import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, UserCheck, UserX, Package, ArrowLeft, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard: React.FC = () => {
  const { user, products } = useApp();
  const { toast } = useToast();
  
  // Mock data for demonstration
  const [users] = useState([
    { id: 'usr_001', username: 'john_doe', email: 'john@example.com', isSeller: false, isAdmin: false },
    { id: 'usr_002', username: 'jane_seller', email: 'jane@example.com', isSeller: true, isAdmin: false },
    { id: 'usr_003', username: 'mike_buyer', email: 'mike@example.com', isSeller: false, isAdmin: false },
  ]);

  const [pendingSellers] = useState([
    { id: 'pending_001', username: 'new_seller1', email: 'seller1@example.com', appliedDate: '2024-01-15' },
    { id: 'pending_002', username: 'new_seller2', email: 'seller2@example.com', appliedDate: '2024-01-16' },
  ]);

  if (!user?.isAdmin) {
    return (
      <div className="text-center py-12">
        <Shield className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p className="text-muted-foreground mb-6">You need admin privileges to access this page.</p>
        <Link to="/">
          <Button className="hero-button">Back to Home</Button>
        </Link>
      </div>
    );
  }

  const handleApproveSeller = (sellerId: string, username: string) => {
    toast({
      title: "Seller approved",
      description: `${username} has been approved as a seller.`,
    });
  };

  const handleRejectSeller = (sellerId: string, username: string) => {
    toast({
      title: "Seller rejected",
      description: `${username}'s seller application has been rejected.`,
    });
  };

  const handleRemoveSellerRole = (userId: string, username: string) => {
    toast({
      title: "Seller role removed",
      description: `${username} is no longer a seller.`,
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Back Button */}
      <Link to="/">
        <Button variant="ghost">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
      </Link>

      <div className="flex items-center space-x-3">
        <Shield className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{users.length}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Sellers</p>
                <p className="text-2xl font-bold">{users.filter(u => u.isSeller).length}</p>
              </div>
              <UserCheck className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Applications</p>
                <p className="text-2xl font-bold">{pendingSellers.length}</p>
              </div>
              <UserX className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Products</p>
                <p className="text-2xl font-bold">{products.length}</p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Seller Applications */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Seller Applications</CardTitle>
        </CardHeader>
        <CardContent>
          {pendingSellers.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Applied Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingSellers.map((seller) => (
                  <TableRow key={seller.id}>
                    <TableCell>{seller.username}</TableCell>
                    <TableCell>{seller.email}</TableCell>
                    <TableCell>{seller.appliedDate}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleApproveSeller(seller.id, seller.username)}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleRejectSeller(seller.id, seller.username)}
                        >
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground text-center py-4">No pending applications</p>
          )}
        </CardContent>
      </Card>

      {/* All Users */}
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.isAdmin ? "default" : user.isSeller ? "secondary" : "outline"}>
                      {user.isAdmin ? "Admin" : user.isSeller ? "Seller" : "Customer"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {user.isSeller && !user.isAdmin && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRemoveSellerRole(user.id, user.username)}
                      >
                        Remove Seller Role
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;