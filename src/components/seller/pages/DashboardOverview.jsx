import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import SellerSidebar from "../SellerSidebar";
import SellerDashboardHeader from "./SellerDashboardHeader";
import SellerDashboardWelcomeSection from "./SellerDashboardWelcomeSection";
import SellerDashboardStatCards from "./SellerDashboardStatCards";

// ICONS (use allowed lucide-react icons, mapping as close as possible)
import { Box, RotateCw, Star, Menu, User } from "lucide-react";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function SellerDashboardOverview() {
  const { currentUser } = useAuth() || {};
  const sellerName =
    (currentUser && currentUser.firstName) ? currentUser.firstName : "Seller";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Key stats (replace with real data)
  const STATS = [
    {
      label: "Total Products",
      value: 45,
      icon: Box,
      iconBg: "bg-[#f8f8f8] text-black",
      link: "/seller/products",
      border: "hover:border-black/20",
    },
    {
      label: "Active Rentals",
      value: 8,
      icon: RotateCw,
      iconBg: "bg-[#f8f8f8] text-black",
      link: "/seller/rentals",
      border: "hover:border-black/20",
    },
    {
      label: "Pending Reviews",
      value: 5,
      icon: Star,
      iconBg: "bg-[#f8f8f8] text-yellow-500",
      link: "/seller/reviews",
      border: "hover:border-yellow-400",
    },
  ];

  // For animation stagger
  const getAnimDelay = idx => ({
    animationDelay: `${180 + idx * 160}ms`,
    animationFillMode: "backwards",
  });

  return (
    <div className="relative min-h-screen bg-[#f8f8f8] font-inter">
      <SellerDashboardHeader onOpenSidebar={() => setSidebarOpen(true)} />
      {/* Sidebar (modal for mobile/tablet) */}
      <aside>
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm transition-opacity animate-fade-in"
            style={{ animation: "fade-in 0.18s ease" }}
            aria-label="Sidebar overlay"
            tabIndex={-1}
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <div
          className={`
            fixed top-0 left-0 z-50 h-full w-64 bg-white border-r
            shadow-2xl transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            lg:static lg:translate-x-0 lg:h-screen
          `}
        >
          <SellerSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        </div>
      </aside>
      {/* Content layout */}
      <main className="w-full max-w-5xl mx-auto px-2 sm:px-5 pt-6 pb-6">
        <SellerDashboardWelcomeSection />
        <SellerDashboardStatCards />
      </main>
      {/* Animations for cards */}
      <style>
        {`
        @media (prefers-reduced-motion: no-preference) {
          .animate-card-slide-up {
            opacity: 0;
            transform: translateY(32px);
            animation: dash-slide-up 0.72s cubic-bezier(.22,1.05,.54,.97) forwards;
          }
          @keyframes dash-slide-up {
            to {
              opacity: 1;
              transform: none;
            }
          }
        }
        `}
      </style>
    </div>
  );
}
