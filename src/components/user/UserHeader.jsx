
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, Search, ShoppingCart, User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const UserHeader = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

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
          Localena
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
