
import React from "react";

export default function SellerDashboardStatCard({ icon: Icon, iconBg, label, value, link, border, animDelay }) {
  return (
    <a
      href={link}
      aria-label={label}
      className={`
        group relative flex flex-col justify-between p-4 min-h-[140px]
        bg-white border border-gray-200
        rounded-2xl shadow-md transition
        hover:shadow-lg
        focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2
        cursor-pointer
        hover:scale-[1.03] active:scale-100
        ${border}
        animate-card-slide-up
      `}
      style={animDelay}
      tabIndex={0}
    >
      {/* Icon circle */}
      <div className={`absolute top-4 right-5 z-0`}>
        <span className={`w-12 h-12 flex items-center justify-center rounded-full ${iconBg} shadow-sm`}>
          <Icon size={26} strokeWidth={2.2} aria-hidden="true" />
        </span>
      </div>
      {/* Title & stat */}
      <div className="z-30 mt-8">
        <span className="block text-gray-700 font-medium text-base mb-1">{label}</span>
        <span className="text-3xl md:text-4xl font-extrabold text-black tracking-tight">
          {value}
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
  )
}
