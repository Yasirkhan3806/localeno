
import React, { useState } from "react";
import { Menu, X, Search, User, LogIn, UserPlus, ShoppingCart, Heart, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import IdentityVerification from "./IdentityVerification.jsx";

const navTabs = [
  { name: "Home", link: "/" },
  { name: "Products", link: "/products" },
  { name: "About Us", link: "/about" }
];

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showVerification, setShowVerification] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleVerificationComplete = (verified) => {
    console.log("Verification completed:", verified);
  };

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur font-inter shadow-none border-b border-neutral-200">
        <nav className="container mx-auto flex items-center justify-between h-20 relative">
          {/* Logo */}
          <div className="flex items-center gap-2 text-2xl font-bold">
            <button onClick={() => navigate('/')} className="text-foreground tracking-tight">
              <span className="rounded bg-neutral-900 text-white px-2 py-1 font-bold text-xl">Shoply</span>
            </button>
          </div>
          
          {/* Desktop Nav */}
          <ul className="hidden md:flex gap-2 items-center text-base font-medium">
            {navTabs.map((tab) => (
              <li key={tab.name}>
                <button
                  onClick={() => navigate(tab.link)}
                  className="px-4 py-2 rounded-lg hover:bg-neutral-100 focus:bg-neutral-100 transition-all focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1"
                >
                  {tab.name}
                </button>
              </li>
            ))}
          </ul>
          
          {/* Right Section */}
          <div className="hidden md:flex gap-2 items-center">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-48 px-3 py-2 border border-neutral-200 rounded-l-lg bg-neutral-50 text-sm outline-none focus:ring-2 focus:ring-neutral-300"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-black text-white rounded-r-lg hover:bg-neutral-800 transition-colors"
              >
                <Search size={16} />
              </button>
            </form>

            {isAuthenticated ? (
              <>
                {/* Cart, Wishlist, Rental Icons */}
                <button 
                  onClick={() => navigate('/user/cart')}
                  className="p-2 rounded-lg hover:bg-neutral-100 relative"
                >
                  <ShoppingCart size={20} />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">2</span>
                </button>
                
                <button 
                  onClick={() => navigate('/user/wishlist')}
                  className="p-2 rounded-lg hover:bg-neutral-100 relative"
                >
                  <Heart size={20} />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">5</span>
                </button>

                <button 
                  onClick={() => navigate('/user/rentals')}
                  className="p-2 rounded-lg hover:bg-neutral-100"
                >
                  <Calendar size={20} />
                </button>

                {/* User Menu */}
                <div className="relative group">
                  <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-neutral-100">
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
                  className="px-4 py-2 bg-black text-white font-semibold rounded-lg hover:scale-105 hover:bg-neutral-900 transition-all focus:ring-2 focus:ring-neutral-400 focus:outline-none"
                >
                  <LogIn size={18} className="inline-block mr-1 -mt-1" />
                  Login
                </button>
                <button 
                  onClick={() => navigate('/signup')}
                  className="px-4 py-2 bg-neutral-100 text-neutral-900 font-semibold rounded-lg hover:scale-105 hover:bg-neutral-200 transition-all focus:ring-2 focus:ring-neutral-400 focus:outline-none"
                >
                  <UserPlus size={18} className="inline-block mr-1 -mt-1" />
                  Sign Up
                </button>
              </>
            )}
          </div>
          
          {/* Hamburger (Mobile) */}
          <button
            className="md:hidden p-2 rounded-lg border border-neutral-200 hover:bg-neutral-200 shadow transition focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Open mobile navigation"
            style={{
              boxShadow: '0 4px 16px 0 rgba(0,0,0,0.03)' // subtle shadow for visibility
            }}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="fixed top-0 left-0 w-full h-full z-50 bg-black/30 animate-fade-in">
              <div className="fixed top-0 right-0 w-80 max-w-full h-full bg-white shadow-lg px-5 py-6 flex flex-col gap-4">
                <div className="flex justify-between items-center pb-4 border-b mb-2">
                  <span className="font-bold text-xl text-black">Shoply</span>
                  <button
                    className="p-2 rounded hover:bg-neutral-100"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close menu"
                  >
                    <X size={28} />
                  </button>
                </div>

                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="flex mb-4">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="flex-1 px-3 py-2 border border-neutral-200 rounded-l-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-black text-white rounded-r-lg"
                  >
                    <Search size={18} />
                  </button>
                </form>
                
                <ul className="flex flex-col gap-2">
                  {navTabs.map((tab) => (
                    <li key={tab.name}>
                      <button
                        onClick={() => {
                          navigate(tab.link);
                          setMobileMenuOpen(false);
                        }}
                        className="block w-full text-left px-3 py-2 rounded-lg hover:bg-neutral-100 text-base"
                      >
                        {tab.name}
                      </button>
                    </li>
                  ))}
                </ul>

                {isAuthenticated ? (
                  <div className="mt-6 flex flex-col gap-2">
                    <button
                      onClick={() => {
                        navigate('/user/home');
                        setMobileMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 bg-black text-white font-semibold rounded-lg shadow hover:bg-gray-900 transition"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="mt-6 flex flex-col gap-2">
                    <button 
                      onClick={() => {
                        navigate('/login');
                        setMobileMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 bg-black text-white font-semibold rounded-lg shadow hover:bg-neutral-900 transition"
                    >
                      <LogIn size={18} className="inline-block mr-1 -mt-1" />
                      Login
                    </button>
                    <button 
                      onClick={() => {
                        navigate('/signup');
                        setMobileMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 bg-neutral-100 text-neutral-900 font-semibold rounded-lg shadow hover:bg-neutral-200 transition"
                    >
                      <UserPlus size={18} className="inline-block mr-1 -mt-1" />
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </nav>
      </header>
      {/* Hero Buttons */}
      <div className="w-full flex flex-col items-center gap-5 mt-8 pb-5">
        <button
          onClick={() => navigate('/products')}
          className="px-10 py-4 bg-black text-white font-bold rounded-2xl text-lg shadow-lg hover:bg-gray-900 hover:scale-105 transition-all border-2 border-transparent hover:border-black focus:outline-none focus:ring-2 focus:ring-black"
        >
          Start Shopping
        </button>
        <button
          onClick={() => setShowVerification(true)}
          className="px-10 py-4 bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white font-bold rounded-2xl text-lg shadow-lg hover:from-gray-800 hover:to-black hover:scale-105 transition-all border-2 border-transparent hover:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
        >
          Verify Identity
        </button>
      </div>

      {/* Identity Verification Modal */}
      <IdentityVerification
        isOpen={showVerification}
        onClose={() => setShowVerification(false)}
        onVerificationComplete={handleVerificationComplete}
      />
    </>
  );
};

export default Header;
