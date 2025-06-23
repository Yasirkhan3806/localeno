import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Products from "./pages/Products.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import VerifyIdentity from "./pages/VerifyIdentity.jsx";
import NotFound from "./pages/NotFound";
import LoginPage from "./components/auth/LoginPage";
import SignupPage from "./components/auth/SignupPage";
import UserDashboard from "./components/user/UserDashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import SellerDashboard from "./components/seller/SellerDashboard";
import Admin from "./pages/Admin.jsx";
import { UserProvider } from "./contexts/UserContext.jsx";
import {
  CategoriesProvider,
  ProductsProvider,
  ReviewsProvider,
} from "./contexts/ProductsContext.jsx";
import { AllProductsProvider } from "./contexts/ProductsContext.jsx";
import { ProductsReviewProvider  } from "./contexts/ReviewContext.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
       <AllProductsProvider>
      <UserProvider>
       
        <CategoriesProvider>
          <ProductsProvider>
            <CartProvider>
            <ProductsReviewProvider >
            <ReviewsProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route
                      path="/verify-identity"
                      element={<VerifyIdentity />}
                    />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route
                      path="/user/*"
                      element={
                        <ProtectedRoute>
                          <UserDashboard />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="/seller/*" element={<SellerDashboard />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </TooltipProvider>
            </ReviewsProvider>
            </ProductsReviewProvider>
            </CartProvider>
          </ProductsProvider>
        </CategoriesProvider>
       
      </UserProvider>
       </AllProductsProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
