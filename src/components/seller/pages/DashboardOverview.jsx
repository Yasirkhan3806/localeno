
import React from "react";
export default function SellerDashboardOverview() {
  // Slide-up + fade for cards
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="font-bold text-xl text-gray-900 mb-6 animate-fade-in">Welcome back, Seller!</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: "Total Products", value: 18 },
          { title: "Active Rentals", value: 7 },
          { title: "Pending Reviews", value: 3 },
        ].map((card, i) => (
          <div
            className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center animate-fade-in"
            style={{
              animationDelay: `${i * 100}ms`,
              animationFillMode: "backwards"
            }}
            key={card.title}
          >
            <div className="text-3xl font-extrabold">{card.value}</div>
            <div className="text-gray-600 font-medium mt-2">{card.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
