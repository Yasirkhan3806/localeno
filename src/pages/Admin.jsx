import React, { useState } from "react";
import {
  Package,
  ShoppingCart,
  Users,
  UserCheck,
  FileWarning,
  Settings,
  LogOut,
  Bell,
  Box,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import AdminDashboard from "../components/admin/AdminDashboard";
import AdminProductTable from "../components/admin/AdminProductTable";
import AdminOrdersTable from "../components/admin/AdminOrdersTable";
import AdminCustomersTable from "../components/admin/AdminCustomersTable";
import AdminSellersTable from "../components/admin/AdminSellersTable";
import AdminReportsTable from "../components/admin/AdminReportsTable";
import ReportDetailPage from "../components/admin/ReportDetailPage";
import SettingsDetailPage from "../components/admin/SettingsDetailPage";

// Demo Product Data
const DEMO_PRODUCTS = [
  {
    id: 1,
    name: "Handcrafted Wooden Chair",
    category: "Furniture",
    price: 299.99,
    stock: 15,
    status: "Active",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=80&q=80",
  },
  {
    id: 2,
    name: "Traditional Pottery Vase",
    category: "Handicrafts",
    price: 89.99,
    stock: 25,
    status: "Active",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=80&q=80",
  },
  {
    id: 3,
    name: "Decorative Wall Mirror",
    category: "Home Decor",
    price: 159.99,
    stock: 8,
    status: "Low Stock",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=80&q=80",
  },
  {
    id: 4,
    name: "Natural Face Cream",
    category: "Health and Beauty",
    price: 49.99,
    stock: 45,
    status: "Active",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=80&q=80",
  },
  {
    id: 5,
    name: "Silk Scarf",
    category: "Clothing Accessories",
    price: 79.99,
    stock: 0,
    status: "Out of Stock",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=80&q=80",
  },
  {
    id: 6,
    name: "Wooden Dining Table",
    category: "Furniture",
    price: 899.99,
    stock: 5,
    status: "Low Stock",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=80&q=80",
  },
];

const SIDEBAR_MENU = [
  { label: "Dashboard", icon: Box, key: "dashboard" },
  { label: "Products", icon: Package, key: "products" },
  { label: "Orders", icon: ShoppingCart, key: "orders" },
  { label: "Customers", icon: Users, key: "customers" },
  { label: "Sellers", icon: UserCheck, key: "sellers" },
  { label: "Reports", icon: FileWarning, key: "reports" },
  { label: "Settings", icon: Settings, key: "settings" },
];

const Admin = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [section, setSection] = useState("products");
  const [products, setProducts] = useState(DEMO_PRODUCTS);

  // Report detail state
  const [reportDetail, setReportDetail] = useState(null);

  // Simple edit handler
  const handleEditProduct = (product) => {
    window.alert("Edit product: " + product.name);
  };

  // Handler for viewing report detail
  const handleViewReport = (reportId) => {
    // In real app, fetch report by ID; here use demo value.
    setReportDetail(reportId);
    setSection("report-detail");
  };

  const handleBackFromReport = () => {
    setReportDetail(null);
    setSection("reports");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-[#F6F8FB] font-inter">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="h-20 px-6 flex items-center border-b border-gray-200">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 focus:outline-none"
          >
            <div className="flex items-center justify-center bg-black w-10 h-10 rounded-full mr-2">
              <span className="text-white font-bold text-lg">LV</span>
            </div>
            <span className="ml-1 text-2xl font-black tracking-wide text-gray-900" style={{ fontFamily: "Inter" }}>
              Localena
            </span>
          </button>
        </div>
        {/* Menu */}
        <nav className="flex-1 py-4 flex flex-col gap-1">
          {SIDEBAR_MENU.map((item) => (
            <button
              key={item.key}
              className={
                `flex items-center gap-3 w-full px-6 py-2 text-[15px] rounded-lg font-medium mb-1
                ${section === item.key
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-100 transition-colors"
                }`
              }
              tabIndex={0}
              onClick={() => setSection(item.key)}
            >
              <item.icon size={20} className={section === item.key ? "text-white" : "text-gray-400"} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        {/* Logout */}
        <div className="mt-auto mb-6 px-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg font-semibold transition
              bg-white text-gray-700 hover:bg-black hover:text-white border border-gray-200"
          >
            <LogOut size={20} className="mr-1" />
            Logout
          </button>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Topbar */}
        <div className="h-20 px-10 flex items-center justify-between border-b border-gray-200 bg-white sticky top-0 z-20">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 capitalize">
            {section === "dashboard"
              ? "Dashboard"
              : section.charAt(0).toUpperCase() + section.slice(1)}
          </h2>
          <div className="flex items-center gap-4">
            {/* Notification */}
            <div className="relative">
              <button className="p-2 rounded-full bg-white hover:bg-gray-100 border border-gray-200 relative">
                <Bell size={20} className="text-gray-500" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 pt-0.5 pb-0 w-5 h-5 flex items-center justify-center">2</span>
              </button>
            </div>
            {/* Admin info */}
            <div className="flex items-center gap-3 pl-4">
              <div className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-full font-bold text-lg border-2 border-white">A</div>
              <span className="text-gray-900 font-bold">Admin</span>
            </div>
            {/* Logout icon */}
            <button
              className="ml-2 p-2 rounded-full hover:bg-gray-100"
              title="Logout"
              onClick={handleLogout}
            >
              <LogOut size={22} className="text-gray-400 hover:text-red-500" />
            </button>
          </div>
        </div>
        {/* Section Switch */}
        <section className="px-10 py-8 bg-[#F6F8FB] flex-1 w-full">
          {/* Detail pages */}
          {section === "report-detail" && (
            <ReportDetailPage onBack={handleBackFromReport} />
          )}
          {section === "settings" && <SettingsDetailPage />}
          {/* Regular Sections */}
          {section === "dashboard" && (
            <>
              <AdminDashboard />
            </>
          )}
          {section === "products" && (
            <>
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">Products</h3>
                <span className="text-gray-500 text-base font-normal">Manage your product inventory</span>
              </div>
              <AdminProductTable products={products} onEditProduct={handleEditProduct} />
            </>
          )}
          {section === "orders" && (
            <>
              <AdminOrdersTable />
            </>
          )}
          {section === "customers" && (
            <>
              <AdminCustomersTable />
            </>
          )}
          {section === "sellers" && (
            <>
              <AdminSellersTable />
            </>
          )}
          {section === "reports" && (
            <>
              {/* Pass handleViewReport to table for report row actions */}
              <AdminReportsTable onViewReport={handleViewReport} />
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default Admin;

// NOTE TO USER: This file is now 250+ lines. Please consider splitting it into smaller files for future maintainability!
