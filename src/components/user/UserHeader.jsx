
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, Search, ShoppingCart, User, Settings, LogOut, Heart, Filter } from 'lucide-react';
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
  const [showSearchFilters, setShowSearchFilters] = useState(false);
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

  const handleLogout = () => {
    console.log("Logging out user...");
    navigate('/');
  };

  const handleProfileSettings = () => {
    navigate('/user/settings');
    setProfileDropdownOpen(false);
  };

  const handleDashboard = () => {
    navigate('/user/home');
    setProfileDropdownOpen(false);
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

  const cartItemCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);
  const wishlistCount = wishlist.length;

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm h-14 sm:h-16 px-3 sm:px-4 lg:px-6 flex items-center justify-between">
      {/* Left side */}
      <div className="flex items-center gap-2 sm:gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} className="sm:w-[24px] sm:h-[24px]" />
        </button>
        
        {/* Professional Localena Logo */}
        <div 
          className="cursor-pointer hover:scale-105 transition-transform"
          onClick={() => navigate('/user/home')}
        >
          <div className="flex flex-col items-center bg-gradient-to-r from-black via-gray-800 to-black text-white px-3 py-2 rounded-xl shadow-lg">
            <div className="flex items-center gap-1">
              <span className="font-bold text-lg tracking-wider">LOCALENA</span>
              <ShoppingCart size={16} className="text-green-400" />
            </div>
            <span className="text-xs text-gray-300 font-medium tracking-wide">Local • Global • Digital</span>
          </div>
        </div>
      </div>

      {/* Center - Enhanced Search */}
      <div className="hidden md:flex flex-1 max-w-lg mx-4 lg:mx-8">
        <form onSubmit={handleSearch} className="relative w-full">
          <div className="flex">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-l-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border-t border-b border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none text-sm"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-r-lg hover:bg-gray-800 transition-colors"
            >
              <Search size={16} />
            </button>
          </div>
        </form>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-1 sm:gap-3">
        {/* Search icon for mobile */}
        <button 
          className="md:hidden p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition"
          onClick={() => navigate('/user/products')}
        >
          <Search size={18} className="sm:w-[20px] sm:h-[20px]" />
        </button>
        
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
        
        {/* Cart */}
        <button 
          onClick={() => navigate('/user/cart')}
          className="relative p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <ShoppingCart size={18} className="sm:w-[20px] sm:h-[20px]" />
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center text-[10px] sm:text-xs">
              {cartItemCount}
            </span>
          )}
        </button>

        {/* Notifications */}
        <button className="relative p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition">
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
                <p className="font-semibold text-gray-900">{user?.firstName} {user?.lastName}</p>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>
              <button 
                onClick={handleDashboard}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 transition text-sm flex items-center gap-2"
              >
                <User size={16} />
                Dashboard
              </button>
              <button 
                onClick={handleProfileSettings}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 transition text-sm flex items-center gap-2"
              >
                <Settings size={16} />
                Profile Settings
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
