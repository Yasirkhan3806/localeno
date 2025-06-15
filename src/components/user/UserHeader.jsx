
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Search, ShoppingCart, Heart, Calendar, Bell } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const UserHeader = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/user/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white shadow-sm border-b border-gray-200">
      <div className="h-20 px-4 lg:px-8 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu size={24} />
          </button>
          
          <button 
            onClick={() => navigate('/')}
            className="text-2xl font-bold"
          >
            <span className="bg-black text-white px-2 py-1 rounded font-bold">Shoply</span>
          </button>
        </div>

        {/* Center Search */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-8">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-black focus:border-transparent"
            />
            <button
              type="submit"
              className="absolute right-0 top-0 h-full px-4 bg-black text-white rounded-r-lg hover:bg-gray-900 transition-colors"
            >
              <Search size={18} />
            </button>
          </div>
        </form>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Mobile Search */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
            <Search size={20} />
          </button>

          {/* Action Icons */}
          <button 
            onClick={() => navigate('/user/cart')}
            className="p-2 rounded-lg hover:bg-gray-100 relative"
          >
            <ShoppingCart size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              2
            </span>
          </button>

          <button 
            onClick={() => navigate('/user/wishlist')}
            className="p-2 rounded-lg hover:bg-gray-100 relative"
          >
            <Heart size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              5
            </span>
          </button>

          <button 
            onClick={() => navigate('/user/rentals')}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Calendar size={20} />
          </button>

          <button className="p-2 rounded-lg hover:bg-gray-100 relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </button>

          {/* User Avatar */}
          <button 
            onClick={() => navigate('/user/profile')}
            className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold hover:bg-gray-900 transition-colors"
          >
            {user?.firstName?.[0]}{user?.lastName?.[0]}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 py-3 border-t border-gray-200">
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded-r-lg hover:bg-gray-900 transition-colors"
          >
            <Search size={18} />
          </button>
        </form>
      </div>
    </header>
  );
};

export default UserHeader;
