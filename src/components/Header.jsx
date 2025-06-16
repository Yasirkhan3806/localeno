
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import IdentityVerification from "./IdentityVerification.jsx";
import MobileSidebar from "./MobileSidebar.jsx";
import Logo from "./header/Logo.jsx";
import Navigation from "./header/Navigation.jsx";
import SearchBar from "./header/SearchBar.jsx";
import UserActions from "./header/UserActions.jsx";

const Header = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [iconsVisible, setIconsVisible] = useState(true);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleVerificationComplete = (verified) => {
    console.log("Verification completed:", verified);
  };

  const handleIconSingleClick = () => setIconsVisible(true);
  const handleIconDoubleClick = () => setIconsVisible(false);

  return (
    <>
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur font-inter shadow-none border-b border-neutral-200">
        <nav className="container mx-auto flex items-center justify-between h-20 relative">
          <Logo />
          <Navigation />

          {/* Right Section */}
          <div
            className="hidden md:flex flex-col gap-2 items-center"
            onClick={handleIconSingleClick}
            onDoubleClick={handleIconDoubleClick}
            style={{ userSelect: "none", cursor: "pointer" }}
          >
            <div className="flex gap-2 items-center">
              <SearchBar 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch}
              />
              <UserActions iconsVisible={iconsVisible} />
            </div>
          </div>
          
          {/* Hamburger (Mobile) */}
          <button
            className="md:hidden p-2 rounded-lg border border-input hover:bg-accent transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Open mobile navigation"
            style={{
              boxShadow: '0 4px 16px 0 rgba(0,0,0,0.03)'
            }}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>
      </header>
      
      <MobileSidebar
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navigate={navigate}
      />
      
      <IdentityVerification
        isOpen={showVerification}
        onClose={() => setShowVerification(false)}
        onVerificationComplete={handleVerificationComplete}
      />
    </>
  );
};

export default Header;
