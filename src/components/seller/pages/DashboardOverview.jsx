
import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { Box, RotateCw, Star, Menu, User } from "lucide-react";
import SellerSidebar from "../SellerSidebar";

// Helper for greeting
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
      {/* Sticky header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 h-14 flex items-center px-3 sm:px-6">
        {/* Hamburger: Mobile/Tablet */}
        <button
          onClick={() => setSidebarOpen(true)}
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

      {/* Sidebar (modal for mobile/tablet) */}
      <aside>
        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm transition-opacity animate-fade-in"
            style={{ animation: "fade-in 0.18s ease" }}
            aria-label="Sidebar overlay"
            tabIndex={-1}
            onClick={() => setSidebarOpen(false)}
          />
        )}
        {/* Slide-in nav */}
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
        {/* Welcome animated section */}
        <section
          className="mb-8 mt-2 px-1 animate-fade-in flex flex-col gap-0"
          style={{
            animation: "fade-in 0.6s cubic-bezier(.24,1.4,.47,.98)",
            animationDelay: "80ms",
            animationFillMode: "backwards",
          }}
          aria-label="Welcome section"
        >
          <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl tracking-tight text-black mb-1">
            Dashboard Overview
          </h1>
          <div className="flex items-center gap-2">
            <User size={20} className="text-black/80" aria-hidden="true" />
            <span className="text-lg sm:text-xl font-semibold text-black" data-testid="welcome-user">
              Welcome back, {sellerName}!
            </span>
          </div>
          <p className="mt-1 text-gray-500 text-base mb-1">
            {getGreeting()}, here’s what’s happening with your store today.
          </p>
        </section>

        {/* Stats cards: Responsive grid/flex/stack */}
        <section className="
          grid gap-4
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          w-full
          animate-none
        ">
          {STATS.map((stat, i) => (
            <a
              key={stat.label}
              href={stat.link}
              aria-label={stat.label}
              className={`
                group relative flex flex-col justify-between p-4 min-h-[140px]
                bg-white border border-gray-200
                rounded-2xl shadow-md transition
                hover:shadow-lg
                focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2
                cursor-pointer
                hover:scale-[1.03] active:scale-100
                ${stat.border}
                animate-card-slide-up
              `}
              style={getAnimDelay(i)}
              tabIndex={0}
            >
              {/* Icon circle */}
              <div className={`absolute top-4 right-5 z-0`}>
                <span className={`w-12 h-12 flex items-center justify-center rounded-full ${stat.iconBg} shadow-sm`}>
                  <stat.icon size={26} strokeWidth={2.2} aria-hidden="true" />
                </span>
              </div>
              {/* Title & stat */}
              <div className="z-30 mt-8">
                <span className="block text-gray-700 font-medium text-base mb-1">{stat.label}</span>
                <span className="text-3xl md:text-4xl font-extrabold text-black tracking-tight">
                  {stat.value}
                </span>
              </div>
              {/* View link */}
              <span className="
                mt-3 absolute bottom-4 right-7 z-30 text-xs font-semibold uppercase
                tracking-wider text-gray-400 group-hover:text-black group-hover:underline transition
              ">
                View
              </span>
            </a>
          ))}
        </section>
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
