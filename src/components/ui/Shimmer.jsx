
import React from "react";

const Shimmer = ({ className = "" }) => (
  <div
    className={`relative overflow-hidden bg-neutral-200 rounded-md ${className}`}
  >
    <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 opacity-60" />
  </div>
);

export default Shimmer;
