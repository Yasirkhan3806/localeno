
import React from "react";
import { X, LogIn, UserPlus } from "lucide-react";
import PropTypes from "prop-types";

const navTabs = [
  { name: "Home", link: "/" },
  { name: "Products", link: "/products" },
  { name: "About Us", link: "/about" }
];

function MobileSidebar({
  open,
  onClose,
  navigate
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 animate-fade-in">
      {/* Sidebar slides from the left */}
      <div className="fixed top-0 left-0 h-full w-64 max-w-full bg-background shadow-xl px-5 py-8 flex flex-col gap-6">
        <div className="flex items-center justify-between pb-4 border-b">
          <span className="font-bold text-xl text-primary">Shoply</span>
          <button
            className="p-2 rounded hover:bg-accent"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={28} />
          </button>
        </div>
        <ul className="flex flex-col gap-2 mt-3">
          {navTabs.map((tab) => (
            <li key={tab.name}>
              <button
                onClick={() => {
                  if (tab.name === "Home") {
                    navigate("/");
                  } else {
                    navigate(tab.link);
                  }
                  onClose();
                }}
                className="block w-full text-left px-3 py-2 rounded-lg bg-background text-foreground font-medium hover:bg-accent hover:text-primary transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                {tab.name}
              </button>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-2 pt-6 border-t border-neutral-100">
          <button 
            onClick={() => {
              navigate('/login');
              onClose();
            }}
            className="w-full px-4 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 hover:scale-105 transition"
          >
            <LogIn size={18} className="inline-block mr-1 -mt-1" />
            Login
          </button>
          <button 
            onClick={() => {
              navigate('/signup');
              onClose();
            }}
            className="w-full px-4 py-2 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:bg-secondary/80 hover:scale-105 transition"
          >
            <UserPlus size={18} className="inline-block mr-1 -mt-1" />
            Sign Up
          </button>
        </div>
      </div>
      {/* Click overlay closes sidebar */}
      <div className="fixed inset-0 z-40" onClick={onClose} />
    </div>
  );
}

MobileSidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default MobileSidebar;
