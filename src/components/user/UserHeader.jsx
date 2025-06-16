
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, Search, User, Settings, LogOut, Heart, Filter } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';

const UserHeader = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [
    'All Categories',
    'Handicrafts',
    'Home Decor', 
    'Furniture',
    'Health & Beauty',
    'Clothing',
    'Accessories'
  ];

  const navTabs = [
    { name: "Home", link: "/user/home" },
    { name: "Products", link: "/user/products" },
    { name: "About Us", link: "/about" }
  ];

  const handleLogout = () => {
    console.log("Logging out user...");
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      let searchUrl = `/user/products?search=${encodeURIComponent(searchQuery.trim())}`;
      if (selectedCategory && selectedCategory !== 'All Categories') {
        searchUrl += `&category=${encodeURIComponent(selectedCategory)}`;
      }
      navigate(searchUrl);
    } else if (selectedCategory && selectedCategory !== 'All Categories') {
      navigate(`/user/products?category=${encodeURIComponent(selectedCategory)}`);
    }
  };

  const wishlistCount = wishlist.length;

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm px-3 sm:px-4 lg:px-6">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between h-14 sm:h-16">
        {/* Left side - Logo and Mobile Menu */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} className="sm:w-[24px] sm:h-[24px]" />
          </button>
          
          {/* Responsive Logo */}
          <div 
            className="cursor-pointer hover:scale-105 transition-transform"
            onClick={() => navigate('/user/home')}
          >
            <div className="flex items-center bg-gradient-to-r from-black via-gray-800 to-black text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl shadow-lg">
              <span className="font-bold text-sm sm:text-lg lg:text-xl tracking-wider">LOCALENA</span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navTabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => navigate(tab.link)}
              className="px-3 lg:px-4 py-2 rounded-lg text-sm lg:text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-black transition-all duration-200"
            >
              {tab.name}
            </button>
          ))}
        </nav>

        {/* Right side - User Actions */}
        <div className="flex items-center gap-1 sm:gap-3">
          {/* Wishlist */}
          <button 
            onClick={() => navigate('/user/wishlist')}
            className="relative p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <Heart size={18} className="sm:w-[20px] sm:h-[20px]" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center text-[10px] sm:text-xs">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Notifications */}
          <button 
            onClick={() => navigate('/user/orders')}
            className="relative p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <Bell size={18} className="sm:w-[20px] sm:h-[20px]" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center text-[10px] sm:text-xs">
              2
            </span>
          </button>

          {/* User Avatar with Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="w-8 h-8 sm:w-10 sm:h-10 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm hover:bg-gray-800 transition border-2 border-gray-200 shadow-sm"
            >
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-lg z-50 py-2 animate-fade-in border border-gray-100">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="font-semibold text-gray-900 text-sm">{user?.firstName} {user?.lastName}</p>
                  <p className="text-xs text-gray-600">{user?.email}</p>
                </div>
                <button 
                  onClick={() => {navigate('/user/home'); setProfileDropdownOpen(false);}}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 transition text-sm flex items-center gap-2"
                >
                  <User size={16} />
                  Dashboard
                </button>
                <button 
                  onClick={() => {navigate('/user/settings'); setProfileDropdownOpen(false);}}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 transition text-sm flex items-center gap-2"
                >
                  <Settings size={16} />
                  Settings
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 transition text-sm text-red-600 flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Search Bar - Now more prominent */}
      <div className="pb-3 sm:pb-4">
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 max-w-4xl mx-auto">
          <form onSubmit={handleSearch} className="flex-1">
            <div className="flex rounded-xl border border-gray-300 overflow-hidden shadow-sm">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2.5 sm:py-3 bg-gray-50 text-sm border-none focus:outline-none focus:ring-0 min-w-0 flex-shrink"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="relative flex-1 min-w-0">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 border-none focus:ring-0 focus:outline-none text-sm"
                />
              </div>
              <button
                type="submit"
                className="px-4 sm:px-6 bg-black text-white hover:bg-gray-800 transition-colors flex items-center justify-center"
              >
                <Search size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Overlay to close dropdown */}
      {profileDropdownOpen && (
        <button
          className="fixed inset-0 z-40"
          style={{ background: "transparent" }}
          onClick={() => setProfileDropdownOpen(false)}
        />
      )}
    </header>
  );
};

export default UserHeader;
