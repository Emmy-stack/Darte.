import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import Navbar from "./components/common/Navbar";
import Index from "./pages/Index";
import CategoryPage from "./pages/CategoryPage";
import SearchResults from "./pages/SearchResults";
import Cart from "./pages/Cart";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProductDetail from "./pages/ProductDetail";
import MessageSeller from "./pages/MessageSeller";
import UploadProduct from "./pages/UploadProduct";
import AdminDashboard from "./pages/AdminDashboard";
import BecomeSeller from "./pages/BecomeSeller";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Navbar />
            <main className="container mx-auto px-4 py-6">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/men" element={<CategoryPage category="Men" />} />
                <Route path="/women" element={<CategoryPage category="Women" />} />
                <Route path="/gadgets" element={<CategoryPage category="Gadgets" />} />
                <Route path="/clothing" element={<CategoryPage category="Clothing" />} />
                <Route path="/jewelry" element={<CategoryPage category="Jewelry" />} />
                <Route path="/gifts" element={<CategoryPage category="Gifts" />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/message/:sellerId" element={<MessageSeller />} />
                <Route path="/upload-product" element={<UploadProduct />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/become-seller" element={<BecomeSeller />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
