
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
  Search,
  Box,
  Eye,
  Edit,
  MoreHorizontal,
  Filter as FilterIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// Sidebar items
const SIDEBAR_MENU = [
  { label: "Dashboard", icon: Box },
  { label: "Products", icon: Package, active: true },
  { label: "Orders", icon: ShoppingCart },
  { label: "Customers", icon: Users },
  { label: "Sellers", icon: UserCheck },
  { label: "Reports", icon: FileWarning },
  { label: "Settings", icon: Settings },
];

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

const STATUS_STYLES = {
  Active: "bg-green-100 text-green-600",
  "Low Stock": "bg-yellow-100 text-yellow-700",
  "Out of Stock": "bg-red-100 text-red-600",
};

const Admin = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  // State for product search
  const [searchText, setSearchText] = useState("");
  // Filter for product status/category (for demo, only toggles input UI)
  const [filterActive, setFilterActive] = useState(false);
  const [products, setProducts] = useState(DEMO_PRODUCTS);

  // Search logic
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Demo for actions
  const handleAction = (type, product) => {
    window.alert(`${type} clicked for "${product.name}"`);
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
              key={item.label}
              className={
                `flex items-center gap-3 w-full px-6 py-2 text-[15px] rounded-lg font-medium mb-1
                ${item.active
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-100 transition-colors"
                }`
              }
              tabIndex={0}
            >
              <item.icon size={20} className={item.active ? "text-white" : "text-gray-400"} />
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
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Products</h2>
          <div className="flex items-center gap-4">
            {/* Search input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                className="pl-11 pr-3 py-2 rounded-lg border border-gray-200 bg-[#F5F6FA] text-gray-900 text-sm w-64 focus:border-black focus:ring-2 focus:ring-black transition"
              />
              <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
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
        {/* Product Content */}
        <section className="px-10 py-8 bg-[#F6F8FB] flex-1 w-full">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-1">Products</h3>
            <span className="text-gray-500 text-base font-normal">Manage your product inventory</span>
          </div>
          {/* Search, Filter, Add Product Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex gap-2">
              <input
                className="bg-white border border-gray-200 rounded-lg px-4 py-2 placeholder-gray-400 focus:ring-2 focus:ring-black focus:outline-none text-sm transition"
                placeholder="Search products..."
                value={searchText}
                style={{ minWidth: 220 }}
                onChange={e => setSearchText(e.target.value)}
              />
              <button
                onClick={() => setFilterActive((prev) => !prev)}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium bg-white hover:bg-gray-100 transition ${filterActive ? "ring-2 ring-black" : ""}`}
              >
                <FilterIcon className="text-gray-500" size={18} />
                Filter
              </button>
            </div>
            <button
              className="ml-auto flex items-center gap-2 px-5 py-2 rounded-lg bg-black text-white font-semibold shadow hover:bg-gray-900 transition"
              onClick={() => window.alert("Add product clicked")}
            >
              + Add Product
            </button>
          </div>

          {/* Table */}
          <div className="w-full bg-white rounded-xl shadow border border-gray-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400 text-xs font-semibold border-b">
                  <th className="px-4 py-3 text-left font-semibold">PRODUCT</th>
                  <th className="px-4 py-3 text-left font-semibold">CATEGORY</th>
                  <th className="px-4 py-3 text-left font-semibold">PRICE</th>
                  <th className="px-4 py-3 text-left font-semibold">STOCK</th>
                  <th className="px-4 py-3 text-left font-semibold">STATUS</th>
                  <th className="px-4 py-3 text-left font-semibold">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="text-gray-900">
                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-5 text-center text-gray-400">
                      No products found.
                    </td>
                  </tr>
                )}
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="border-b last:border-0 hover:bg-gray-50 transition">
                    <td className="px-4 py-3 font-medium flex items-center gap-3 min-w-[230px]">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-10 h-10 object-cover rounded-lg border border-gray-200"
                        loading="lazy"
                      />
                      <span>{p.name}</span>
                    </td>
                    <td className="px-4 py-3">{p.category}</td>
                    <td className="px-4 py-3">${p.price.toFixed(2)}</td>
                    <td className="px-4 py-3">{p.stock}</td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${STATUS_STYLES[p.status] || "bg-gray-200 text-gray-600"}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <button
                          className="p-1.5 rounded-full hover:bg-gray-100 transition text-gray-500"
                          title="View product"
                          onClick={() => handleAction("View", p)}
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          className="p-1.5 rounded-full hover:bg-gray-100 transition text-gray-500"
                          title="Edit product"
                          onClick={() => handleAction("Edit", p)}
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          className="p-1.5 rounded-full hover:bg-gray-100 transition text-gray-500"
                          title="More actions"
                          onClick={() => handleAction("More", p)}
                        >
                          <MoreHorizontal size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Admin;
