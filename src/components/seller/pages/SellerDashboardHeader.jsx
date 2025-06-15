
import React from "react";
import { Menu, User } from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";

export default function SellerDashboardHeader({ onOpenSidebar }) {
  const { currentUser } = useAuth() || {};
  const sellerName =
    (currentUser && currentUser.firstName) ? currentUser.firstName : "Seller";

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 h-14 flex items-center px-3 sm:px-6">
      {/* Hamburger: Mobile/Tablet */}
      <button
        onClick={onOpenSidebar}
        aria-label="Open sidebar"
        className="lg:hidden flex items-center justify-center h-10 w-10 rounded-2xl hover:bg-[#f8f8f8] hover:ring-2 hover:ring-black/10 transition"
      >
        <Menu size={24} />
      </button>
      {/* Mobile Center label */}
      <span className="text-lg font-bold mx-auto block lg:hidden">
        Dashboard
      </span>
      {/* Right: avatar */}
      <div className="ml-auto flex items-center gap-2">
        <div className="hidden sm:flex flex-col text-xs text-neutral-500 mr-2 leading-tight text-right">
          <span className="font-semibold text-black/80">
            {sellerName}
          </span>
          <span className="text-neutral-400">
            Seller
          </span>
        </div>
        <span className="bg-[#f8f8f8] text-black rounded-full w-9 h-9 flex items-center justify-center border border-gray-200 font-bold text-base select-none shadow-sm">
          {sellerName[0] || "S"}
        </span>
      </div>
    </header>
  )
}
