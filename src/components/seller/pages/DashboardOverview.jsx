
import React from "react";
import SellerDashboardWelcomeSection from "./SellerDashboardWelcomeSection";
import SellerDashboardStatCards from "./SellerDashboardStatCards";

// All sidebar/header layout is handled by the parent SellerDashboard
export default function SellerDashboardOverview() {
  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-5 pt-6 pb-6">
      <SellerDashboardWelcomeSection />
      <SellerDashboardStatCards />
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
