import React, { useState } from "react";
import { Menu, X, LogIn, UserPlus, Search, User, ShoppingCart, Heart, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import IdentityVerification from "./IdentityVerification.jsx";
import MobileSidebar from "./MobileSidebar.jsx";

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
                  onClick={() => {
                    if (tab.name === "Home") {
                      navigate('/');
                    } else {
                      navigate(tab.link);
                    }
                  }}
                  className="px-4 py-2 rounded-lg bg-background hover:bg-accent text-foreground hover:text-primary transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
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
                  className="p-2 rounded-lg hover:bg-accent transition-colors relative"
                >
                  <ShoppingCart size={20} />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">2</span>
                </button>
                
                <button 
                  onClick={() => navigate('/user/wishlist')}
                  className="p-2 rounded-lg hover:bg-accent transition-colors relative"
                >
                  <Heart size={20} />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">5</span>
                </button>

                <button 
                  onClick={() => navigate('/user/rentals')}
                  className="p-2 rounded-lg hover:bg-accent"
                >
                  <Calendar size={20} />
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
                <button 
                  onClick={() => navigate('/signup')}
                  className="px-4 py-2 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:bg-secondary/80 hover:scale-105 transition-all focus:ring-2 focus:ring-primary focus:outline-none"
                >
                  <UserPlus size={18} className="inline-block mr-1 -mt-1" />
                  Sign Up
                </button>
              </>
            )}
          </div>
          
          {/* Hamburger (Mobile) */}
          <button
            className="md:hidden p-2 rounded-lg border border-input hover:bg-accent transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Open mobile navigation"
            style={{
              boxShadow: '0 4px 16px 0 rgba(0,0,0,0.03)' // subtle shadow for visibility
            }}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>
      </header>
      
      {/* Mobile Sidebar Menu */}
      <MobileSidebar
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navigate={navigate}
      />
      
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
