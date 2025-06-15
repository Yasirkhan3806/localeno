
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
import { Menu, User } from "lucide-react";

export default function SellerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const DUMMY_SELLER_NAME = "Samantha Liu"; // Replace with real seller name

  // Responsive: center title on mobile if not enough space
  return (
    <div className="bg-[#f7f7f7] min-h-screen w-full font-inter">
      {/* Sticky Top Header */}
      <header className="flex items-center h-16 px-4 md:px-8 bg-white border-b fixed top-0 left-0 right-0 z-40 shadow-sm">
        <button
          className="lg:hidden p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open seller sidebar"
        >
          <Menu size={22} />
        </button>
        <h1
          className="
            text-lg font-bold ml-3 text-gray-900 select-none
            mx-auto lg:mx-0
          "
          style={{
            marginLeft: "12px"
          }}
        >
          {getPageTitle(location.pathname)}
        </h1>
        <div className="ml-auto flex items-center gap-2">
          <ProfileDropdown name={DUMMY_SELLER_NAME} />
        </div>
      </header>
      <div className="flex pt-16 w-full min-h-[calc(100dvh-4rem)]">
        <SellerSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <main className="flex-1 p-4 md:p-8 lg:ml-64 w-full max-w-full animate-fade-in" style={{ minHeight: "100%" }}>
          <Routes>
            <Route path="/dashboard" element={<SellerDashboardOverview />} />
            {/* Remaining routes */}
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

// Profile Dropdown: basic fade/scale menu
function ProfileDropdown({ name }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative select-none">
      <button
        className="flex items-center gap-2 rounded-full p-1 hover:bg-gray-100 transition"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Seller profile menu"
      >
        {/* Avatar */}
        <span className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-lg text-black ring-2 ring-gray-300 select-none shadow">
          <User size={22} />
        </span>
        <span className="font-medium hidden sm:block text-black">{name}</span>
      </button>
      {open && (
        <div
          className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-lg z-50 py-2 animate-fade-in"
          style={{
            animationDuration: "0.23s",
            transformOrigin: "top right"
          }}
          tabIndex={-1}
        >
          <button className="w-full px-5 py-2 text-left hover:bg-gray-100 transition" tabIndex={0}>Profile</button>
          <button className="w-full px-5 py-2 text-left hover:bg-gray-100 transition" tabIndex={0}>Logout</button>
          <button className="w-full px-5 py-2 text-left hover:bg-gray-100 transition" tabIndex={0}>Help Center</button>
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
