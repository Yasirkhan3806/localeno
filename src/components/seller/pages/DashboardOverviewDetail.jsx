
import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function DashboardOverviewDetail() {
  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-6 pt-8 pb-8">
      <div className="flex items-center mb-6">
        <Link to="/seller/dashboard" className="flex items-center gap-2 text-black hover:underline hover:text-primary transition">
          <ArrowLeft size={20} />
          <span className="font-semibold text-base">Back to Overview</span>
        </Link>
      </div>
      <h2 className="font-extrabold text-2xl sm:text-3xl md:text-4xl mb-2 tracking-tight text-black">Dashboard Details</h2>
      <p className="text-gray-500 text-lg mb-8">Here you can see the detailed analytics and insights about your store's performance.</p>

      {/* Example detailed summaries */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold mb-2 text-black">Monthly Revenue</h3>
          <div className="font-mono text-3xl text-primary mb-2">$5,200</div>
          <p className="text-gray-500 text-sm">Total revenue earned in the past month from rentals and sales.</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold mb-2 text-black">Recent Activity</h3>
          <ul className="list-disc ml-5 text-gray-500 text-sm">
            <li>2 new product listings</li>
            <li>5 successful rentals</li>
            <li>1 new product review</li>
          </ul>
        </div>
      </div>

      {/* You can add more detailed cards/widgets here */}
    </div>
  );
}
