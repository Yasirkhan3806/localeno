import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Box, Plus, ClipboardList, Star, MessageSquare, Settings, Grid2x2, Repeat } from "lucide-react";
const navItems = [{
  to: "/seller/dashboard",
  icon: Grid2x2,
  label: "Dashboard"
}, {
  to: "/seller/my-products",
  icon: Box,
  label: "My Products"
}, {
  to: "/seller/products/add",
  icon: Plus,
  label: "Add Product"
}, {
  to: "/seller/rentals",
  icon: Repeat,
  label: "Rental Management"
}, {
  to: "/seller/reviews",
  icon: Star,
  label: "Customer Reviews"
},
// }, {
//   to: "/seller/chat",
//   icon: MessageSquare,
//   label: "Real-Time Chat"
// }, {
{
  to: "/seller/settings",
  icon: Settings,
  label: "Settings"
}];
function SellerSidebar({
  open,
  setOpen
}) {
  const navigate = useNavigate();
  return <>
      {/* Overlay */}
      {open && <div className="fixed inset-0 z-30 bg-black/30 animate-fade-in lg:hidden" onClick={() => setOpen(false)} />}
      <aside className={`
          fixed top-0 left-0 z-40 h-full w-60 sm:w-64 bg-white border-r shadow-xl
          transform ${open ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300 ease-in-out
          flex flex-col
          lg:static lg:translate-x-0 lg:h-[100dvh]
        `} style={{
      fontFamily: "'Inter', 'Roboto', 'Open Sans', sans-serif"
    }}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b min-h-[3.5rem] sm:min-h-[4rem]">
          <span className="font-extrabold text-base sm:text-lg tracking-tight truncate bg-accent-foreground text-slate-50 px-[18px] py-[2px]  ">Localena</span>
          <button className="p-1.5 sm:p-2 rounded hover:bg-gray-100 transition lg:hidden" onClick={() => setOpen(false)} aria-label="Close sidebar">
            <X size={20} className="sm:w-[24px] sm:h-[24px]" />
          </button>
        </div>
        
        {/* Nav Links */}
        <nav className="flex-1 px-2 sm:px-3 pt-4 sm:pt-6 space-y-1 overflow-y-auto">
          {navItems.map(item => <NavLink key={item.to} to={item.to} onClick={() => setOpen(false)} className={({
          isActive
        }) => `flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-colors transition-transform font-medium group text-sm sm:text-base
                ${isActive ? "bg-black text-white shadow scale-[1.02] sm:scale-[1.04]" : "text-gray-700 hover:bg-gray-100 hover:scale-105"}`} style={{
          transition: "transform 0.14s cubic-bezier(.4,0,.2,1)"
        }} aria-label={item.label}>
              <span className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-gray-100 flex items-center justify-center font-semibold text-base sm:text-lg text-black ring-2 ring-gray-300 select-none shadow transition group-hover:bg-gray-200 group-hover:scale-110 flex-shrink-0">
                <item.icon className="shrink-0" size={16} aria-hidden="true" />
              </span>
              <span className="truncate">{item.label}</span>
            </NavLink>)}
        </nav>
      </aside>
    </>;
}
export default SellerSidebar;