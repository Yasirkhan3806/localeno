
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
  Calendar,
  BarChart3
} from 'lucide-react';

const UserSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { icon: BarChart3, label: 'Dashboard', path: '/user/home' },
    { icon: ShoppingBag, label: 'Products', path: '/user/products' },
    { icon: User, label: 'Profile', path: '/user/profile' },
    { icon: ShoppingCart, label: 'My Cart', path: '/user/cart' },
    { icon: Heart, label: 'Wishlist', path: '/user/wishlist' },
    { icon: Calendar, label: 'My Rentals', path: '/user/rentals' },
    { icon: Package, label: 'My Orders', path: '/user/orders' },
    { icon: Star, label: 'Reviews', path: '/user/reviews' },
    { icon: MessageCircle, label: 'Messages', path: '/user/chats' },
    { icon: Settings, label: 'Settings', path: '/user/settings' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-x-0 top-24 sm:top-28 bottom-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar drawer */}
      <div className={`
        fixed 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        top-24 sm:top-28 lg:top-0 left-0 z-50 w-60 sm:w-64
        h-[calc(100vh-6rem)] sm:h-[calc(100vh-7rem)] lg:h-full 
        bg-white shadow-xl transform transition-transform duration-300
        lg:translate-x-0 lg:static lg:z-10
        flex flex-col
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-black via-gray-800 to-gray-900 text-white rounded-2xl flex items-center justify-center font-bold text-sm sm:text-lg shadow-lg transition hover:scale-105 cursor-pointer flex-shrink-0"
              aria-label="User Profile"
              onClick={() => { navigate('/user/profile'); setSidebarOpen(false); }}
            >
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-bold text-gray-900 text-sm sm:text-base truncate">{user?.firstName} {user?.lastName}</div>
              <div className="text-xs text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded-lg inline-block">{user?.accountType}</div>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 sm:p-2 rounded-xl hover:bg-gray-100 transition flex-shrink-0"
          >
            <X size={18} className="sm:w-[20px] sm:h-[20px]" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 sm:p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 sm:py-4 rounded-2xl transition-all duration-300 font-medium group text-sm sm:text-base ${
                  isActive
                    ? 'bg-gradient-to-r from-black to-gray-800 text-white shadow-lg transform scale-105'
                    : 'text-gray-700 hover:bg-gray-100 hover:scale-105'
                }`
              }
            >
              <item.icon size={18} className="sm:w-[22px] sm:h-[22px] transition group-hover:scale-110 flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom section */}
        <div className="mt-auto">
          {/* Logout */}
          <div className="p-3 sm:p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="
                flex items-center gap-2 sm:gap-3 w-full px-3 sm:px-4 py-3 sm:py-4 
                bg-gradient-to-r from-red-600 via-red-700 to-red-800
                text-white hover:from-red-700 hover:to-red-900
                rounded-2xl font-bold transition-all duration-300
                shadow-lg hover:shadow-xl
                transform hover:scale-105
                group
                text-sm sm:text-base
              "
            >
              <LogOut size={18} className="sm:w-[22px] sm:h-[22px] group-hover:scale-110 transition flex-shrink-0" />
              <span className="font-bold">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSidebar;
