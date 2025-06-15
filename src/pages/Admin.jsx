
import React, { useState } from "react";
import {
  Package,
  ShoppingCart,
  Users,
  UserCheck,
  FileWarning,
  Settings,
  LogOut,
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
import AdminProductDetail from "../components/admin/AdminProductDetail";
import AdminOrderDetail from "../components/admin/AdminOrderDetail";
import AdminCustomerDetail from "../components/admin/AdminCustomerDetail";
import AdminSellerDetail from "../components/admin/AdminSellerDetail";

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

// DEMO Customers/Sellers/Orders for new details, can extend this as needed.
const DEMO_CUSTOMERS = [
  { id: 1, name: "Samantha Yu", email: "sam.yu@email.com", joined: "2023-06-14" },
];
const DEMO_SELLERS = [
  { id: 1, name: "CraftMakers", email: "contact@craftmakers.com", registered: "2023-04-11" },
];
const DEMO_ORDERS = [
  { id: "ORD-102", customer: "Samantha Yu", status: "Completed", date: "2024-01-14" },
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
  const [products] = useState(DEMO_PRODUCTS);

  // Detail page state for every type
  const [reportDetail, setReportDetail] = useState(null);
  const [productDetail, setProductDetail] = useState(null);
  const [orderDetail, setOrderDetail] = useState(null);
  const [customerDetail, setCustomerDetail] = useState(null);
  const [sellerDetail, setSellerDetail] = useState(null);

  // Handler for dashboard "View All" orders
  const handleViewAllOrders = () => {
    setSection("orders");
  };

  // Handlers
  const handleEditProduct = (product) => {
    window.alert("Edit product: " + product.name);
  };

  // Report
  const handleViewReport = (reportId) => {
    setReportDetail(reportId);
    setSection("report-detail");
  };
  const handleBackFromReport = () => {
    setReportDetail(null);
    setSection("reports");
  };

  // Product
  const handleViewProduct = (productId) => {
    const product = products.find((p) => p.id === productId);
    setProductDetail(product);
    setSection("product-detail");
  };
  const handleBackFromProduct = () => {
    setProductDetail(null);
    setSection("products");
  };

  // Orders (demo)
  const handleViewOrder = (orderId) => {
    const order = DEMO_ORDERS.find((o) => o.id === orderId);
    setOrderDetail(order);
    setSection("order-detail");
  };
  const handleBackFromOrder = () => {
    setOrderDetail(null);
    setSection("orders");
  };

  // Customers (demo)
  const handleViewCustomer = (customerId) => {
    const customer = DEMO_CUSTOMERS.find((c) => c.id === customerId);
    setCustomerDetail(customer);
    setSection("customer-detail");
  };
  const handleBackFromCustomer = () => {
    setCustomerDetail(null);
    setSection("customers");
  };

  // Sellers (demo)
  const handleViewSeller = (sellerId) => {
    const seller = DEMO_SELLERS.find((s) => s.id === sellerId);
    setSellerDetail(seller);
    setSection("seller-detail");
  };
  const handleBackFromSeller = () => {
    setSellerDetail(null);
    setSection("sellers");
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
        {/* Topbar - Removed Bell Icon */}
        <div className="h-20 px-10 flex items-center justify-between border-b border-gray-200 bg-white sticky top-0 z-20">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 capitalize">
            {section === "dashboard"
              ? "Dashboard"
              : section.charAt(0).toUpperCase() + section.slice(1)}
          </h2>
          <div className="flex items-center gap-4">
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
          {section === "product-detail" && !!productDetail && (
            <AdminProductDetail product={productDetail} onBack={handleBackFromProduct} />
          )}
          {section === "order-detail" && !!orderDetail && (
            <AdminOrderDetail order={orderDetail} onBack={handleBackFromOrder} />
          )}
          {section === "customer-detail" && !!customerDetail && (
            <AdminCustomerDetail customer={customerDetail} onBack={handleBackFromCustomer} />
          )}
          {section === "seller-detail" && !!sellerDetail && (
            <AdminSellerDetail seller={sellerDetail} onBack={handleBackFromSeller} />
          )}
          {/* Regular Sections */}
          {section === "dashboard" && (
            <>
              <AdminDashboard onViewAllOrders={handleViewAllOrders} />
            </>
          )}
          {section === "products" && (
            <>
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">Products</h3>
                <span className="text-gray-500 text-base font-normal">Manage your product inventory</span>
              </div>
              <AdminProductTable products={products} onEditProduct={handleEditProduct} onViewProduct={handleViewProduct} />
            </>
          )}
          {section === "orders" && (
            <>
              <AdminOrdersTable onViewOrder={handleViewOrder} />
            </>
          )}
          {section === "customers" && (
            <>
              <AdminCustomersTable onViewCustomer={handleViewCustomer} />
            </>
          )}
          {section === "sellers" && (
            <>
              <AdminSellersTable onViewSeller={handleViewSeller} />
            </>
          )}
          {section === "reports" && (
            <>
              <AdminReportsTable onViewReport={handleViewReport} />
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default Admin;
