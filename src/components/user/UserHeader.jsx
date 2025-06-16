
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, Search, ShoppingCart } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const UserHeader = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

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
        
        <div 
          className="font-bold text-lg sm:text-xl text-gray-900 cursor-pointer hover:text-gray-700 transition truncate"
          onClick={() => navigate('/user/home')}
        >
          Dashboard
        </div>
      </div>

      {/* Center - Search (hidden on small screens) */}
      <div className="hidden md:flex flex-1 max-w-md mx-4 lg:mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none text-sm"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-1 sm:gap-3">
        {/* Search icon for mobile */}
        <button className="md:hidden p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition">
          <Search size={18} className="sm:w-[20px] sm:h-[20px]" />
        </button>
        
        {/* Cart */}
        <button 
          onClick={() => navigate('/user/cart')}
          className="relative p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <ShoppingCart size={18} className="sm:w-[20px] sm:h-[20px]" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center text-[10px] sm:text-xs">
            3
          </span>
        </button>

        {/* Notifications */}
        <button className="relative p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition">
          <Bell size={18} className="sm:w-[20px] sm:h-[20px]" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center text-[10px] sm:text-xs">
            2
          </span>
        </button>

        {/* User Avatar */}
        <button 
          onClick={() => navigate('/user/profile')}
          className="w-8 h-8 sm:w-10 sm:h-10 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm hover:bg-gray-800 transition border-2 border-gray-200 shadow-sm"
        >
          {user?.firstName?.[0]}{user?.lastName?.[0]}
        </button>
      </div>
    </header>
  );
};

export default UserHeader;
