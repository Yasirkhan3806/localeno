
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, Search, ShoppingCart, Heart, Bell, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const UserHeader = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  // Per-icon visibility state
  const [iconStates, setIconStates] = useState({
    cart: true,
    wishlist: true,
    notification: true,
  });

  // Handler: single-click shows icon again
  const handleIconSingleClick = (icon) =>
    setIconStates((s) => ({ ...s, [icon]: true }));

  // Handler: double-click hides icon
  const handleIconDoubleClick = (icon) =>
    setIconStates((s) => ({ ...s, [icon]: false }));

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
      <header className="fixed top-0 left-0 right-0 z-40 bg-white shadow border-b border-gray-200 font-inter">
        <div className="h-16 md:h-14 px-2 md:px-8 flex items-center justify-between gap-4 transition-all">
          {/* Left: Hamburger and Logo */}
          <div className="flex items-center gap-2 min-w-fit">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
              aria-label="Open sidebar"
            >
              <Menu size={22} />
            </button>
            <button
              onClick={() => navigate('/')}
              className="text-[1.1rem] md:text-lg font-extrabold bg-black text-white px-2 py-1 rounded-xl tracking-tight shadow hover:bg-gray-900 transition leading-none"
              style={{ letterSpacing: '0.01em', height: '28px' }}
            >
              Shoply
            </button>
          </div>

          {/* Center: Search Bar on desktop */}
          <div className="hidden md:flex flex-1 justify-center">
            <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products…"
                className="w-44 md:w-72 pl-3 pr-10 py-2 border border-gray-300 rounded-l-lg focus:ring focus:ring-black focus:border-black text-sm"
              />
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded-r-lg hover:bg-gray-900 transition"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
            </form>
          </div>

          {/* Right - Icons and Avatar */}
          <div
            className="flex items-center gap-0 md:gap-1 min-w-fit"
            style={{ userSelect: "none", cursor: "pointer" }}
          >
            {/* Cart */}
            {iconStates.cart && location.pathname !== "/user/cart" && (
              <button
                onClick={() => navigate('/user/cart')}
                onClickCapture={() => handleIconSingleClick("cart")}
                onDoubleClick={() => handleIconDoubleClick("cart")}
                className="p-1.5 md:p-2 rounded-full group hover:bg-gray-100 transition relative"
                aria-label="View cart"
              >
                <ShoppingCart size={20} className="text-gray-900 group-hover:text-black transition" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold shadow">2</span>
              </button>
            )}
            {/* Wishlist */}
            {iconStates.wishlist && location.pathname !== "/user/wishlist" && (
              <button
                onClick={() => navigate('/user/wishlist')}
                onClickCapture={() => handleIconSingleClick("wishlist")}
                onDoubleClick={() => handleIconDoubleClick("wishlist")}
                className="p-1.5 md:p-2 rounded-full group hover:bg-gray-100 transition relative"
                aria-label="Wishlist"
              >
                <Heart size={20} className="text-gray-900 group-hover:text-black transition" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold shadow">5</span>
              </button>
            )}
            {/* Notifications */}
            {iconStates.notification && location.pathname !== "/user/notifications" && (
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  onClickCapture={() => handleIconSingleClick("notification")}
                  onDoubleClick={() => handleIconDoubleClick("notification")}
                  className="p-1.5 md:p-2 rounded-full hover:bg-gray-100 transition relative"
                  aria-label="Notifications"
                >
                  <Bell size={20} className="text-gray-900" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">{unreadCount}</span>
                  )}
                </button>
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50 animate-fade-in">
                    <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">Notifications</h3>
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="p-2 hover:bg-gray-100 rounded"
                        aria-label="Close notifications"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">No notifications</div>
                      ) : (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 hover:bg-gray-50 cursor-pointer ${!notification.read ? 'bg-blue-50/40' : ''}`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-2 h-2 rounded-full mt-2 ${!notification.read ? 'bg-blue-500' : 'bg-gray-300'}`} />
                              <div>
                                <h4 className="font-semibold text-sm">{notification.title}</h4>
                                <p className="text-gray-700 text-sm">{notification.message}</p>
                                <span className="text-gray-400 text-xs">{notification.time}</span>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="p-3 border-t text-center">
                      <button className="text-blue-700 hover:text-blue-900 font-medium text-sm">View All Notifications</button>
                    </div>
                  </div>
                )}
              </div>
            )}
            {/* User Avatar */}
            <button
              onClick={() => navigate('/user/profile')}
              className="w-9 h-9 md:w-10 md:h-10 bg-black text-white rounded-full flex items-center justify-center font-extrabold text-base md:text-lg border-2 border-gray-200 shadow hover:scale-105 transition ml-2"
              aria-label="User Profile"
            >
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </button>
          </div>
        </div>
        {/* Mobile search bar (below nav for small screens) */}
        <div className="md:hidden px-2 py-2 border-t border-gray-100">
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search products…"
              className="flex-1 px-3 py-2 border border-gray-200 rounded-l-lg focus:ring focus:ring-black focus:border-black"
            />
            <button
              type="submit"
              className="px-3 py-2 bg-black text-white rounded-r-lg hover:bg-gray-900 transition"
              aria-label="Search"
            >
              <Search size={18} />
            </button>
          </form>
        </div>
      </header>
      {/* Notification overlay */}
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
