
import React from "react";
import { User } from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function SellerDashboardWelcomeSection() {
  const { currentUser } = useAuth() || {};
  const sellerName =
    (currentUser && currentUser.firstName) ? currentUser.firstName : "Seller";

  return (
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
  );
}
