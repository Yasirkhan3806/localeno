
import React from "react";
import { Box, RotateCw, Star } from "lucide-react";
import SellerDashboardStatCard from "./SellerDashboardStatCard";

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

const getAnimDelay = idx => ({
  animationDelay: `${180 + idx * 160}ms`,
  animationFillMode: "backwards",
});

export default function SellerDashboardStatCards() {
  return (
    <section className="
      grid gap-4
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-3
      w-full
      animate-none
    ">
      {STATS.map((stat, i) => (
        <SellerDashboardStatCard
          key={stat.label}
          {...stat}
          animDelay={getAnimDelay(i)}
        />
      ))}
    </section>
  );
}
