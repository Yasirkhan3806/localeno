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
import AddProductPage from "../components/admin/AddProductPage";
import EditProductPage from "../components/admin/EditProductPage";
import AddCustomerPage from "../components/admin/AddCustomerPage";
import AddSellerPage from "../components/admin/AddSellerPage";
import ProductActionsPage from "../components/admin/ProductActionsPage";

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
  const [section, setSection] = useState("dashboard");
  const [products] = useState(DEMO_PRODUCTS);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Detail page state for every type
  const [reportDetail, setReportDetail] = useState(null);
  const [productDetail, setProductDetail] = useState(null);
  const [orderDetail, setOrderDetail] = useState(null);
  const [customerDetail, setCustomerDetail] = useState(null);
  const [sellerDetail, setSellerDetail] = useState(null);

  // New page states
  const [addProductMode, setAddProductMode] = useState(false);
  const [editProductMode, setEditProductMode] = useState(null);
  const [addCustomerMode, setAddCustomerMode] = useState(false);
  const [addSellerMode, setAddSellerMode] = useState(false);
  const [productActionsMode, setProductActionsMode] = useState(null);

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

  // New handlers for add/edit operations
  const handleAddProduct = () => {
    setAddProductMode(true);
    setSection("add-product");
  };

  const handleEditProduct = (product) => {
    setEditProductMode(product);
    setSection("edit-product");
  };

  const handleProductActions = (product) => {
    setProductActionsMode(product);
    setSection("product-actions");
  };

  const handleAddCustomer = () => {
    setAddCustomerMode(true);
    setSection("add-customer");
  };

  const handleAddSeller = () => {
    setAddSellerMode(true);
    setSection("add-seller");
  };

  // Back handlers
  const handleBackFromAddProduct = () => {
    setAddProductMode(false);
    setSection("products");
  };

  const handleBackFromEditProduct = () => {
    setEditProductMode(null);
    setSection("products");
  };

  const handleBackFromProductActions = () => {
    setProductActionsMode(null);
    setSection("products");
  };

  const handleBackFromAddCustomer = () => {
    setAddCustomerMode(false);
    setSection("customers");
  };

  const handleBackFromAddSeller = () => {
    setAddSellerMode(false);
    setSection("sellers");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-[#F6F8FB] font-inter">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out`}>
        {/* Logo */}
        <div className="h-16 lg:h-20 px-6 flex items-center border-b border-gray-200">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 focus:outline-none"
          >
            <div className="flex items-center justify-center bg-black w-8 lg:w-10 h-8 lg:h-10 rounded-full mr-2">
              <span className="text-white font-bold text-sm lg:text-lg">LV</span>
            </div>
            <span className="ml-1 text-xl lg:text-2xl font-black tracking-wide text-gray-900" style={{ fontFamily: "Inter" }}>
              Localena
            </span>
          </button>
        </div>
        
        {/* Menu */}
        <nav className="flex-1 py-4 flex flex-col gap-1 overflow-y-auto">
          {SIDEBAR_MENU.map((item) => (
            <button
              key={item.key}
              className={`flex items-center gap-3 w-full px-6 py-2 lg:py-3 text-sm lg:text-[15px] rounded-lg font-medium mb-1 transition-colors
                ${section === item.key || 
                  (item.key === "products" && ["add-product", "edit-product", "product-actions", "product-detail"].includes(section)) ||
                  (item.key === "customers" && ["add-customer", "customer-detail"].includes(section)) ||
                  (item.key === "sellers" && ["add-seller", "seller-detail"].includes(section))
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-100"
                }`}
              onClick={() => {
                setSection(item.key);
                setSidebarOpen(false);
              }}
            >
              <item.icon size={18} className={
                section === item.key || 
                (item.key === "products" && ["add-product", "edit-product", "product-actions", "product-detail"].includes(section)) ||
                (item.key === "customers" && ["add-customer", "customer-detail"].includes(section)) ||
                (item.key === "sellers" && ["add-seller", "seller-detail"].includes(section))
                ? "text-white" : "text-gray-400"
              } />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        
        {/* Logout */}
        <div className="mt-auto mb-6 px-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg font-semibold transition-colors
              bg-white text-gray-700 hover:bg-black hover:text-white border border-gray-200"
          >
            <LogOut size={18} className="mr-1" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <div className="h-16 lg:h-20 px-4 lg:px-10 flex items-center justify-between border-b border-gray-200 bg-white sticky top-0 z-20">
          {/* Mobile Menu Button */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <h2 className="text-xl lg:text-2xl font-bold tracking-tight text-gray-900 capitalize">
            {section === "dashboard" ? "Dashboard" :
             section === "add-product" ? "Add Product" :
             section === "edit-product" ? "Edit Product" :
             section === "product-actions" ? "Product Actions" :
             section === "add-customer" ? "Add Customer" :
             section === "add-seller" ? "Add Seller" :
             section.charAt(0).toUpperCase() + section.slice(1)}
          </h2>
          
          <div className="flex items-center gap-2 lg:gap-4">
            {/* Admin info */}
            <div className="flex items-center gap-2 lg:gap-3">
              <div className="w-8 lg:w-10 h-8 lg:h-10 bg-black text-white flex items-center justify-center rounded-full font-bold text-sm lg:text-lg border-2 border-white">A</div>
              <span className="hidden sm:inline text-gray-900 font-bold text-sm lg:text-base">Admin</span>
            </div>
            
            {/* Logout icon */}
            <button
              className="p-2 rounded-full hover:bg-gray-100"
              title="Logout"
              onClick={handleLogout}
            >
              <LogOut size={20} className="text-gray-400 hover:text-red-500" />
            </button>
          </div>
        </div>
        
        {/* Section Content */}
        <section className="px-4 lg:px-10 py-6 lg:py-8 bg-[#F6F8FB] flex-1 w-full overflow-x-hidden">
          {/* Add/Edit Product Pages */}
          {section === "add-product" && (
            <AddProductPage onBack={handleBackFromAddProduct} />
          )}
          {section === "edit-product" && editProductMode && (
            <EditProductPage 
              product={editProductMode} 
              onBack={handleBackFromEditProduct}
            />
          )}
          {section === "product-actions" && productActionsMode && (
            <ProductActionsPage 
              product={productActionsMode} 
              onBack={handleBackFromProductActions}
            />
          )}
          
          {/* Add Customer/Seller Pages */}
          {section === "add-customer" && (
            <AddCustomerPage onBack={handleBackFromAddCustomer} />
          )}
          {section === "add-seller" && (
            <AddSellerPage onBack={handleBackFromAddSeller} />
          )}

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
            <AdminDashboard onViewAllOrders={handleViewAllOrders} />
          )}
          {section === "products" && (
            <>
              <div className="mb-6 lg:mb-8">
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">Products</h3>
                <span className="text-gray-500 text-sm lg:text-base font-normal">Manage your product inventory</span>
              </div>
              <AdminProductTable 
                products={products} 
                onEditProduct={handleEditProduct}
                onViewProduct={handleViewProduct}
                onAddProduct={handleAddProduct}
                onProductActions={handleProductActions}
              />
            </>
          )}
          {section === "orders" && (
            <AdminOrdersTable onViewOrder={handleViewOrder} />
          )}
          {section === "customers" && (
            <AdminCustomersTable 
              onViewCustomer={handleViewCustomer}
              onAddCustomer={handleAddCustomer}
            />
          )}
          {section === "sellers" && (
            <AdminSellersTable 
              onViewSeller={handleViewSeller}
              onAddSeller={handleAddSeller}
            />
          )}
          {section === "reports" && (
            <AdminReportsTable onViewReport={handleViewReport} />
          )}
        </section>
      </main>
    </div>
  );
};

export default Admin;
