
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Grid2x2, Box, Plus, ClipboardList, Star, MessageSquare, Settings } from "lucide-react";

const navItems = [
  { to: "/seller/dashboard", icon: Grid2x2, label: "Dashboard" },
  { to: "/seller/products", icon: Box, label: "My Products" },
  { to: "/seller/products/add", icon: Plus, label: "Add Product" },
  { to: "/seller/rentals", icon: ClipboardList, label: "Rentals" },
  { to: "/seller/reviews", icon: Star, label: "Reviews" },
  { to: "/seller/chat", icon: MessageSquare, label: "Chat" },
  { to: "/seller/settings", icon: Settings, label: "Settings" },
];

function SellerSidebar({ open, setOpen }) {
  const navigate = useNavigate();
  // Sidebar slides in/out on mobile, always visible on lg+
  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/30 animate-fade-in lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-full w-64 bg-white border-r shadow-xl
          transform ${open ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300 ease-in-out
          flex flex-col
          lg:static lg:translate-x-0 lg:h-[100dvh]
        `}
        style={{
          fontFamily: "'Inter', 'Roboto', 'Open Sans', sans-serif"
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b">
          <span className="font-extrabold text-lg tracking-tight text-gray-900">SellerHub</span>
          <button
            className="p-2 rounded hover:bg-gray-100 transition lg:hidden"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={24} />
          </button>
        </div>
        {/* Nav Links */}
        <nav className="flex-1 px-3 pt-6 space-y-1">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors font-medium group
                ${isActive ? "bg-black text-white shadow" : "text-gray-700 hover:bg-gray-100"}`
              }
            >
              <item.icon className="shrink-0" size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}

export default SellerSidebar;
