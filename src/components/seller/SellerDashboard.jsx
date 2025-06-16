
import React, { useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import SellerSidebar from "./SellerSidebar";
import SellerProducts from "./pages/Products";
import SellerAddProduct from "./pages/AddProduct";
import SellerRentals from "./pages/Rentals";
import SellerReviews from "./pages/Reviews";
import SellerChat from "./pages/Chat";
import SellerSettings from "./pages/Settings";
import SellerDashboardOverview from "./pages/DashboardOverview";
import { Menu, User, Settings, LogOut } from "lucide-react";

export default function SellerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const DUMMY_SELLER_NAME = "Samantha Liu";

  const handleLogout = () => {
    console.log("Logging out seller...");
    navigate('/');
  };

  const handleProfileSettings = () => {
    navigate('/seller/settings');
    setProfileDropdownOpen(false);
  };

  return (
    <div className="bg-[#f7f7f7] min-h-screen w-full font-inter">
      {/* Sticky Top Header */}
      <header className="flex items-center h-14 sm:h-16 px-3 sm:px-4 md:px-6 lg:px-8 bg-white border-b fixed top-0 left-0 right-0 z-40 shadow-sm">
        <button
          className="lg:hidden p-1.5 sm:p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open seller sidebar"
        >
          <Menu size={20} className="sm:w-[22px] sm:h-[22px]" />
        </button>
        <h1 className="text-base sm:text-lg font-bold ml-2 sm:ml-3 text-gray-900 select-none flex-1 lg:flex-none truncate">
          {getPageTitle(location.pathname)}
        </h1>
        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <ProfileDropdown 
            name={DUMMY_SELLER_NAME} 
            open={profileDropdownOpen}
            setOpen={setProfileDropdownOpen}
            onLogout={handleLogout}
            onProfileSettings={handleProfileSettings}
          />
        </div>
      </header>
      
      <div className="flex pt-14 sm:pt-16 w-full min-h-[calc(100dvh-3.5rem)] sm:min-h-[calc(100dvh-4rem)]">
        <SellerSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 lg:ml-64 w-full max-w-full animate-fade-in overflow-x-hidden">
          <Routes>
            <Route path="/dashboard" element={<SellerDashboardOverview />} />
            <Route path="/my-products" element={<SellerProducts />} />
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
  if (path.includes("/dashboard")) return "Dashboard";
  if (path.includes("/products/add")) return "Add Product";
  if (path.includes("/products")) return "My Products";
  if (path.includes("/rentals")) return "Rentals";
  if (path.includes("/reviews")) return "Reviews";
  if (path.includes("/chat")) return "Chat";
  if (path.includes("/settings")) return "Settings";
  return "";
}

// Profile Dropdown with logout and settings
function ProfileDropdown({ name, open, setOpen, onLogout, onProfileSettings }) {
  const navigate = useNavigate();

  return (
    <div className="relative select-none">
      <button
        className="flex items-center gap-1 sm:gap-2 rounded-full p-1 hover:bg-gray-100 transition"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Seller profile menu"
      >
        {/* Avatar */}
        <span className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-base sm:text-lg text-black ring-2 ring-gray-300 select-none shadow">
          <User size={16} className="sm:w-[22px] sm:h-[22px]" />
        </span>
        <span className="font-medium hidden sm:block text-black text-sm lg:text-base truncate max-w-[120px]">{name}</span>
      </button>
      {open && (
        <div
          className="absolute right-0 mt-2 w-40 sm:w-48 rounded-xl bg-white shadow-lg z-50 py-2 animate-fade-in border border-gray-100"
          style={{
            animationDuration: "0.23s",
            transformOrigin: "top right"
          }}
          tabIndex={-1}
        >
          <button 
            onClick={() => navigate('/seller/dashboard')}
            className="w-full px-4 sm:px-5 py-2 text-left hover:bg-gray-100 transition text-sm flex items-center gap-2" 
            tabIndex={0}
          >
            <User size={16} />
            Dashboard
          </button>
          <button 
            onClick={onProfileSettings}
            className="w-full px-4 sm:px-5 py-2 text-left hover:bg-gray-100 transition text-sm flex items-center gap-2" 
            tabIndex={0}
          >
            <Settings size={16} />
            Profile Settings
          </button>
          <button 
            onClick={onLogout}
            className="w-full px-4 sm:px-5 py-2 text-left hover:bg-gray-100 transition text-sm text-red-600 flex items-center gap-2" 
            tabIndex={0}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
      {/* Overlay to close dropdown */}
      {open && (
        <button
          className="fixed inset-0 z-40"
          style={{ background: "transparent" }}
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
}
