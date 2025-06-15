
import React, { useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import SellerSidebar from "./SellerSidebar";
import SellerDashboardOverview from "./pages/DashboardOverview";
import SellerProducts from "./pages/Products";
import SellerAddProduct from "./pages/AddProduct";
import SellerRentals from "./pages/Rentals";
import SellerReviews from "./pages/Reviews";
import SellerChat from "./pages/Chat";
import SellerSettings from "./pages/Settings";
import { Menu } from "lucide-react";

export default function SellerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  // Trigger sidebar for mobile
  return (
    <div className="bg-gray-50 min-h-screen w-full font-inter">
      {/* Header: Sidebar toggle & page title */}
      <header className="flex items-center h-16 px-4 md:px-8 bg-white border-b fixed top-0 left-0 right-0 z-40 shadow-sm">
        <button
          className="lg:hidden p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open seller sidebar"
        >
          <Menu size={22} />
        </button>
        <h1 className="text-lg font-bold ml-3 text-gray-900">
          {getPageTitle(location.pathname)}
        </h1>
        <div className="ml-auto"></div>
      </header>
      {/* Main layout starts under header */}
      <div className="flex pt-16 w-full min-h-[calc(100dvh-4rem)]">
        {/* Sidebar */}
        <SellerSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        {/* Content */}
        <main className="flex-1 p-4 md:p-8 lg:ml-64 w-full max-w-full animate-fade-in">
          <Routes>
            <Route path="/dashboard" element={<SellerDashboardOverview />} />
            <Route path="/products" element={<SellerProducts />} />
            <Route path="/products/add" element={<SellerAddProduct />} />
            <Route path="/rentals" element={<SellerRentals />} />
            <Route path="/reviews" element={<SellerReviews />} />
            <Route path="/chat" element={<SellerChat />} />
            <Route path="/settings" element={<SellerSettings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
// Helper: get header title based on route
function getPageTitle(path) {
  if (path.includes("/products/add")) return "Add Product";
  if (path.includes("/products")) return "My Products";
  if (path.includes("/rentals")) return "Rentals";
  if (path.includes("/reviews")) return "Reviews";
  if (path.includes("/chat")) return "Chat";
  if (path.includes("/settings")) return "Settings";
  return "Dashboard";
}
