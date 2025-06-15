
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { User, Package, Star, Box } from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";

// Helper to get greeting based on hour
function getGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function SellerDashboardOverview() {
  const { currentUser } = useAuth();
  const sellerName =
    currentUser && currentUser.firstName
      ? currentUser.firstName
      : "Seller";
  const navigate = useNavigate();

  // Demo data; replace with actual fetch logic later
  const stats = [
    {
      title: "Total Products",
      value: 18,
      icon: Box,
      bg: "bg-gradient-to-tr from-gray-200 via-gray-100 to-white",
      onClick: () => navigate("/seller/products"),
    },
    {
      title: "Active Rentals",
      value: 7,
      icon: Package,
      bg: "bg-gradient-to-tr from-gray-200 via-gray-100 to-white",
      onClick: () => navigate("/seller/rentals"),
    },
    {
      title: "Pending Reviews",
      value: 3,
      icon: Star,
      bg: "bg-gradient-to-tr from-gray-200 via-gray-100 to-white",
      onClick: () => navigate("/seller/reviews"),
      highlight: true,
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-1 md:px-6">
      {/* Header Section */}
      <header className="mb-7 mt-2 animate-fade-in">
        <h1 className="font-extrabold text-2xl md:text-3xl text-gray-900 tracking-tight">
          Dashboard Overview
        </h1>
        <div className="mt-2 font-semibold text-lg text-gray-800 flex items-center gap-2">
          <User size={22} className="text-black/80" aria-hidden="true" />
          <span>
            Welcome back, <span className="text-black">{sellerName}</span>
            <span className="ml-2 text-sm text-gray-400 font-normal">
              {getGreeting()}, here’s what’s happening with your store today.
            </span>
          </span>
        </div>
      </header>

      {/* Stats Cards Section */}
      <section
        className={`
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-5
        `}
      >
        {stats.map((card, i) => (
          <button
            type="button"
            aria-label={card.title}
            key={card.title}
            tabIndex={0}
            onClick={card.onClick}
            className={`
              group w-full rounded-2xl border border-gray-100 shadow-md p-7 flex flex-col items-start
              focus:outline-none focus:ring-2 focus:ring-black/30 focus:ring-offset-2
              bg-white
              transition-all
              animate-fade-in
              hover:scale-[1.03] hover:shadow-xl
              active:scale-100
              relative
              ${card.highlight ? "ring-1 ring-yellow-400/40" : ""}
            `}
            style={{
              animationDelay: `${i * 120}ms`,
              animationFillMode: "backwards",
            }}
          >
            <div
              className={`
                flex items-center justify-center rounded-lg mb-5
                w-12 h-12
                ${card.highlight ? "bg-yellow-50 text-yellow-500" : "bg-gray-50 text-black"}
                group-hover:shadow
                transition-shadow
              `}
            >
              <card.icon size={26} aria-hidden="true" />
            </div>
            <span className="text-gray-700 font-medium text-base mb-1">{card.title}</span>
            <span className="text-3xl font-extrabold text-black tracking-tight">{card.value}</span>
            <span
              className={`
                mt-3 text-xs font-semibold uppercase tracking-widest text-primary underline-offset-1
                group-hover:underline group-hover:text-black transition
                absolute bottom-5 right-7
                ${card.highlight ? "text-yellow-800" : "text-gray-400"}
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
