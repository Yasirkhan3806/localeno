
import React, { useState } from "react";
import { Menu, X, Search, User, LogIn, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import IdentityVerification from "./IdentityVerification.jsx";

const navTabs = [
  { name: "Home", link: "/" },
  { name: "Products", link: "/products" },
  { name: "About Us", link: "/about" }
];

const Header = () => {
  const navigate = useNavigate();
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
    // Handle verification completion
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
                  className="px-4 py-2 rounded hover:bg-neutral-100 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
                >
                  {tab.name}
                </button>
              </li>
            ))}
          </ul>
          
          {/* Action Buttons */}
          <div className="hidden md:flex gap-2 items-center">
            <button 
              onClick={() => setShowVerification(true)}
              className="px-4 py-2 bg-black text-white font-semibold rounded-lg hover:scale-105 hover:bg-neutral-900 transition-all focus:ring-2 focus:ring-neutral-400 focus:outline-none"
            >
              <LogIn size={18} className="inline-block mr-1 -mt-1" />
              Login
            </button>
            <button className="px-4 py-2 bg-neutral-100 text-neutral-900 font-semibold rounded-lg hover:scale-105 hover:bg-neutral-200 transition-all focus:ring-2 focus:ring-neutral-400 focus:outline-none">
              <UserPlus size={18} className="inline-block mr-1 -mt-1" />
              Sign Up
            </button>
          </div>
          
          {/* Hamburger (Mobile) */}
          <button
            className="md:hidden p-2 rounded border border-neutral-200 hover:bg-neutral-100 transition focus:outline-none"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Open mobile navigation"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          
          {/* Slide-Out Mobile Menu */}
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
                <ul className="flex flex-col gap-2">
                  {navTabs.map((tab) => (
                    <li key={tab.name}>
                      <button
                        onClick={() => {
                          navigate(tab.link);
                          setMobileMenuOpen(false);
                        }}
                        className="block w-full text-left px-3 py-2 rounded hover:bg-neutral-100 text-base"
                      >
                        {tab.name}
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-col gap-2">
                  <button 
                    onClick={() => {
                      setShowVerification(true);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 bg-black text-white font-semibold rounded-lg hover:scale-105 hover:bg-neutral-900 transition-all mb-1 focus:ring-2 focus:ring-neutral-400"
                  >
                    <LogIn size={18} className="inline-block mr-1 -mt-1" />
                    Login
                  </button>
                  <button className="w-full px-4 py-2 bg-neutral-100 text-neutral-900 font-semibold rounded-lg hover:scale-105 hover:bg-neutral-200 transition-all focus:ring-2 focus:ring-neutral-400">
                    <UserPlus size={18} className="inline-block mr-1 -mt-1" />
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          )}
        </nav>
        
        {/* Centered Search Bar */}
        <div className="flex justify-center w-full bg-white py-3 border-b border-neutral-200">
          <form onSubmit={handleSearch} className="flex items-center gap-0 w-full max-w-xl mx-auto px-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, categories, brands…"
              className="w-full px-4 py-2 border border-neutral-200 rounded-l-lg bg-neutral-50 font-roboto outline-none text-[15px] focus:ring-2 focus:ring-neutral-300"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-r-lg font-semibold hover:scale-105 transition-all focus:ring-2 focus:ring-neutral-400"
            >
              <Search size={18} />
            </button>
          </form>
        </div>
      </header>

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
