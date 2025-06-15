import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Home, 
  ShoppingBag, 
  ShoppingCart, 
  Heart, 
  Package, 
  User, 
  Star, 
  MessageCircle, 
  Settings, 
  LogOut,
  X,
  Menu
} from 'lucide-react';

const UserSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Profile BEFORE Cart
  const menuItems = [
    { icon: User, label: 'Profile', path: '/user/profile' },
    { icon: ShoppingCart, label: 'My Cart', path: '/user/cart' },
    { icon: Heart, label: 'Wishlist', path: '/user/wishlist' },
    { icon: Package, label: 'My Orders', path: '/user/orders' },
    { icon: Star, label: 'Reviews', path: '/user/reviews' },
    { icon: MessageCircle, label: 'Messages', path: '/user/chats' },
    { icon: Settings, label: 'Settings', path: '/user/settings' },
  ];

  return (
    <>
      {/* Mobile Overlay: always starts *below* header, never covers header */}
      {sidebarOpen && (
        <div
          className="fixed inset-x-0 top-16 bottom-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar drawer */}
      <div className={`
        fixed 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        top-16 lg:top-0 left-0 z-50 w-64
        h-[calc(100vh-4rem)] lg:h-full 
        bg-white shadow-xl transform transition-transform duration-300
        lg:translate-x-0 lg:static lg:z-10
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-black text-white rounded-full flex items-center justify-center font-bold text-lg border-2 border-gray-200 shadow-lg transition hover:scale-105 cursor-pointer"
              aria-label="User Profile"
              onClick={() => { navigate('/user/profile'); setSidebarOpen(false); }}
            >
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            <div>
              <div className="font-bold text-gray-900">{user?.firstName} {user?.lastName}</div>
              <div className="text-xs text-gray-500 capitalize">{user?.accountType}</div>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded hover:bg-gray-100 transition"
          >
            <X size={20} />
          </button>
        </div>
        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors duration-200 font-medium group ${
                  isActive
                    ? 'bg-black text-white shadow shadow-black/10'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <item.icon size={22} className="transition group-hover:text-black" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        {/* Back to Home Button */}
        <div className="px-4 pb-4 mt-auto">
          <button
            className="w-full flex items-center gap-2 bg-gray-900 text-white px-4 py-3 rounded-xl font-semibold hover:bg-gray-800 transition shadow-lg"
            style={{ justifyContent: 'center' }}
            onClick={() => navigate('/user/home')}
            aria-label="Back to Home"
          >
            <Home size={20} />
            <span>Back to Home</span>
          </button>
        </div>
        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="
              flex items-center gap-3 w-full px-4 py-3 
              bg-gradient-to-r from-black via-gray-800 to-gray-900
              text-white hover:from-gray-800 hover:to-black
              rounded-xl font-semibold transition
              shadow-lg shadow-black/5
              border-2 border-transparent
              hover:border-red-500
              group
              relative
              overflow-hidden
              focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
            "
          >
            <LogOut size={22} className="text-red-100 group-hover:text-red-500 transition" />
            <span className="font-bold">Logout</span>
            <span className="absolute right-4 top-3 text-xs text-gray-400 group-hover:text-red-400 transition">Sign out</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default UserSidebar;
