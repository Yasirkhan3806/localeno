
import React from "react";
import WelcomeSection from "./WelcomeSection";
import DashboardKpiCard from "./DashboardKpiCard";
import { useNavigate } from "react-router-dom";

// Example static data—swap with real data from API as needed.
const KPI_DATA = [
  {
    icon: "products",
    label: "Total Products",
    value: 45,
    linkText: "View Products",
    route: "/seller/products"
  },
  {
    icon: "rentals",
    label: "Active Rentals",
    value: 8,
    linkText: "Manage Rentals",
    route: "/seller/rentals"
  },
  {
    icon: "reviews",
    label: "Pending Reviews",
    value: 5,
    linkText: "See Feedback",
    route: "/seller/reviews"
  }
];

const DUMMY_SELLER_NAME = "Samantha Liu"; // Replace with actual seller name from context

const DashboardOverview = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col gap-3 sm:gap-4">
      {/* Welcome Section */}
      <WelcomeSection sellerName={DUMMY_SELLER_NAME} />
      {/* KPI Cards */}
      <div
        className="
          grid grid-cols-1 gap-3 sm:gap-4
          sm:grid-cols-2
          lg:grid-cols-3
          mt-1 sm:mt-2
        "
        aria-label="Overview KPIs"
      >
        {KPI_DATA.map((kpi) => (
          <DashboardKpiCard
            key={kpi.icon}
            icon={kpi.icon}
            label={kpi.label}
            value={kpi.value}
            linkText={kpi.linkText}
            onLinkClick={() => navigate(kpi.route)}
            ariaLabel={`${kpi.label}: ${kpi.value}`}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardOverview;
