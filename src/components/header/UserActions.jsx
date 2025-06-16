
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const UserActions = ({ iconsVisible }) => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  if (!iconsVisible) return null;

  return (
    <>
      {isAuthenticated ? (
        <>
          {/* Cart Icon */}
          <button 
            onClick={() => navigate('/user/cart')}
            className="p-2 rounded-lg hover:bg-accent transition-colors relative"
          >
            <ShoppingCart size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">2</span>
          </button>
          {/* Wishlist Icon */}
          <button 
            onClick={() => navigate('/user/wishlist')}
            className="p-2 rounded-lg hover:bg-accent transition-colors relative"
          >
            <Heart size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">5</span>
          </button>
          {/* User Menu */}
          <div className="relative group">
            <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-accent">
              <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </div>
              <span className="text-sm font-medium">{user?.firstName}</span>
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <div className="py-2">
                <button
                  onClick={() => navigate('/user/home')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => navigate('/user/profile')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <button 
            onClick={() => navigate('/login')}
            className="px-4 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 hover:scale-105 transition-all focus:ring-2 focus:ring-primary focus:outline-none"
          >
            <LogIn size={18} className="inline-block mr-1 -mt-1" />
            Login
          </button>
          <div className="relative">
            <button 
              onClick={() => navigate('/signup')}
              className="px-4 py-2 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:bg-secondary/80 hover:scale-105 transition-all focus:ring-2 focus:ring-primary focus:outline-none flex flex-col items-center"
              style={{ position: "relative" }}
            >
              <span className="flex items-center">
                <UserPlus size={18} className="inline-block mr-1 -mt-1" />
                Sign Up
              </span>
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default UserActions;
