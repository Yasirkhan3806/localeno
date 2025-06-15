
import React from "react";
import { ArrowLeft, UserCheck } from "lucide-react";

// Minimal seller detail page
const AdminSellerDetail = ({ seller, onBack }) => {
  if (!seller) return null;

  return (
    <div className="w-full max-w-2xl mx-auto mt-6 animate-fade-in">
      <button
        onClick={onBack}
        className="flex items-center gap-2 bg-transparent text-gray-500 hover:text-black font-medium mb-4"
      >
        <ArrowLeft size={20} /> Back to Sellers
      </button>
      <div className="bg-white rounded-2xl p-7 shadow-md border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <UserCheck size={28} className="text-gray-600" />
          <h1 className="text-2xl font-bold text-gray-900">{seller.name}</h1>
        </div>
        <div className="space-y-2 text-gray-800">
          <div>
            <span className="text-xs text-gray-500 mr-2">Email:</span>{seller.email}
          </div>
          <div>
            <span className="text-xs text-gray-500 mr-2">Registered:</span>{seller.registered}
          </div>
          {/* Add more seller fields if available */}
        </div>
      </div>
    </div>
  );
};

export default AdminSellerDetail;
