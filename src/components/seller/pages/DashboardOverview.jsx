
import React from "react";
import { useNavigate } from "react-router-dom";
import { User, Package, Star, Box } from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";

// Helper: Timely greeting
function getGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function SellerDashboardOverview() {
  const { currentUser } = useAuth();
  const sellerName = currentUser && currentUser.firstName ? currentUser.firstName : "Seller";
  const navigate = useNavigate();

  // Example data (replace with real fetch later)
  const stats = [
    {
      title: "Total Products",
      value: 18,
      icon: Box,
      bg: "from-gray-200/80 via-gray-50/80 to-gray-100/80",
      iconBg: "bg-gradient-to-br from-gray-300/60 to-white/80 text-black",
      shadow: "shadow-[0_2px_32px_0_rgba(80,80,80,0.10)]",
      onClick: () => navigate("/seller/products"),
    },
    {
      title: "Active Rentals",
      value: 7,
      icon: Package,
      bg: "from-black/5 via-gray-100/95 to-gray-200/100",
      iconBg: "bg-gradient-to-br from-gray-800/10 to-gray-300/20 text-black",
      shadow: "shadow-[0_2px_32px_0_rgba(60,90,120,0.07)]",
      onClick: () => navigate("/seller/rentals"),
    },
    {
      title: "Pending Reviews",
      value: 3,
      icon: Star,
      bg: "from-yellow-100/60 via-white/80 to-yellow-50/80",
      iconBg: "bg-gradient-to-br from-yellow-200/85 to-yellow-100/90 text-yellow-600",
      shadow: "shadow-[0_2px_32px_0_rgba(200,150,40,0.09)]",
      onClick: () => navigate("/seller/reviews"),
      highlight: true,
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-1 md:px-6 py-2">
      {/* Header Section */}
      <header className="mb-8 mt-2 animate-fade-in">
        <h1 className="font-extrabold text-3xl md:text-4xl tracking-tight text-gray-900 mb-2">
          Dashboard Overview
        </h1>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-3">
          <div className="flex items-center">
            <User size={22} className="text-black/80 mr-1.5" aria-hidden="true" />
            <span className="font-semibold text-lg text-gray-900">
              Welcome back, <span className="text-black">{sellerName}</span>
            </span>
          </div>
        </div>
        <p className="mt-2 text-gray-500 text-base">
          {getGreeting()}, here’s what’s happening with your store today.
        </p>
      </header>

      {/* Stats Grid */}
      <section
        className="
          grid grid-cols-1
          gap-6
          sm:grid-cols-2 
          lg:grid-cols-3
        "
      >
        {stats.map((card, i) => (
          <button
            type="button"
            aria-label={card.title}
            key={card.title}
            tabIndex={0}
            onClick={card.onClick}
            className={`
              group relative flex flex-col items-start justify-between
              rounded-2xl border border-gray-200
              bg-gradient-to-tr ${card.bg}
              ${card.shadow}
              transition-all duration-200
              animate-fade-in
              hover:scale-[1.03] hover:shadow-lg
              active:scale-100
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
              px-7 py-7
              cursor-pointer
              min-h-[180px]
              ring-1 ring-transparent
              ${card.highlight ? "ring-yellow-200" : ""}
            `}
            style={{
              animationDelay: `${i * 120}ms`,
              animationFillMode: "backwards",
            }}
          >
            {/* Floating icon background */}
            <div
              className={`
                absolute top-5 right-6 z-0 w-14 h-14 rounded-full
                filter blur-[3px] opacity-50
                ${card.iconBg}
                pointer-events-none
              `}
            />
            {/* Icon foreground */}
            <div
              className={`
                flex items-center justify-center absolute top-6 left-7 z-10
                w-12 h-12 rounded-xl shadow-sm
                ${card.iconBg}
                group-hover:shadow-md
                transition-shadow
                text-2xl
              `}
            >
              <card.icon size={28} aria-hidden="true" />
            </div>
            <div className="z-20 mt-20">
              <span className="block text-gray-800 font-medium text-base mb-1">{card.title}</span>
              <span className="text-3xl font-extrabold text-black tracking-tight">{card.value}</span>
            </div>
            <span
              className={`
                mt-3 absolute bottom-5 right-8 z-30
                text-xs font-semibold uppercase tracking-wider
                group-hover:underline group-hover:text-black transition
                ${card.highlight ? "text-yellow-700" : "text-gray-400"}
              `}
            >
              View
            </span>
          </button>
        ))}
      </section>
    </div>
  );
}
