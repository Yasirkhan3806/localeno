
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Search, ShoppingCart, Heart, Calendar, Bell, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const UserHeader = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock notifications
  const [notifications] = useState([
    {
      id: 1,
      title: "Order Shipped",
      message: "Your order #ORD-2024-001 has been shipped",
      time: "2 hours ago",
      read: false,
      type: "order"
    },
    {
      id: 2,
      title: "New Message",
      message: "You have a new message from Tech Store Support",
      time: "4 hours ago",
      read: false,
      type: "message"
    },
    {
      id: 3,
      title: "Rental Due Soon",
      message: "Your camera rental is due in 2 days",
      time: "1 day ago",
      read: true,
      type: "rental"
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
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
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-8">
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

            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-lg hover:bg-gray-100 relative"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-gray-500">
                        No notifications
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                            !notification.read ? 'bg-blue-50' : ''
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`w-2 h-2 rounded-full mt-2 ${
                              !notification.read ? 'bg-blue-500' : 'bg-gray-300'
                            }`} />
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 text-sm">
                                {notification.title}
                              </h4>
                              <p className="text-gray-600 text-sm mt-1">
                                {notification.message}
                              </p>
                              <p className="text-gray-400 text-xs mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  
                  <div className="p-3 border-t border-gray-200">
                    <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium">
                      View All Notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

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

      {/* Notification Overlay */}
      {showNotifications && (
        <div 
          className="fixed inset-0 z-30"
          onClick={() => setShowNotifications(false)}
        />
      )}
    </>
  );
};

export default UserHeader;
