
import React from "react";
import PropTypes from "prop-types";
import { Box, Repeat, Star, ArrowRight } from "lucide-react";

const iconMap = {
  products: Box,
  rentals: Repeat,
  reviews: Star
};

const DashboardKpiCard = ({
  icon,
  label,
  value,
  linkText,
  onLinkClick,
  ariaLabel
}) => {
  const LucideIcon = iconMap[icon];
  return (
    <div
      className="bg-white p-6 rounded-2xl shadow-md transition-all duration-200 ease-out hover:shadow-lg hover:scale-[1.03] flex flex-col gap-4 group"
      tabIndex={0}
      aria-label={ariaLabel}
    >
      {/* Icon */}
      <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full mb-3 transition-transform group-hover:rotate-6">
        {LucideIcon && <LucideIcon size={28} className="text-black/70" aria-hidden="true" />}
      </div>
      {/* KPI Value */}
      <div className="text-2xl font-bold text-black" aria-live="polite">{value}</div>
      {/* Label */}
      <div className="text-sm uppercase tracking-widest font-medium text-gray-500">{label}</div>
      {/* Mini link */}
      <button
        className="mt-auto self-end flex items-center gap-1 text-blue-600 text-xs font-semibold hover:underline focus:underline focus:outline-none transition"
        onClick={onLinkClick}
        aria-label={linkText}
      >
        {linkText} <ArrowRight size={16} />
      </button>
    </div>
  );
};

DashboardKpiCard.propTypes = {
  icon: PropTypes.oneOf(["products", "rentals", "reviews"]).isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  linkText: PropTypes.string.isRequired,
  onLinkClick: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string
};

export default DashboardKpiCard;
