
import React from "react";
import { ArrowLeft, ShoppingCart } from "lucide-react";

// Simple demo detail for one order
const AdminOrderDetail = ({ order, onBack }) => {
  if (!order) return null;

  return (
    <div className="w-full max-w-2xl mx-auto mt-6 animate-fade-in">
      <button
        onClick={onBack}
        className="flex items-center gap-2 bg-transparent text-gray-500 hover:text-black font-medium mb-4"
      >
        <ArrowLeft size={20} /> Back to Orders
      </button>
      <div className="bg-white rounded-2xl p-7 shadow-md border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <ShoppingCart size={28} className="text-gray-600" />
          <h1 className="text-2xl font-bold text-gray-900">Order #{order.id}</h1>
        </div>
        <div className="space-y-2 text-gray-800">
          <div>
            <span className="text-xs text-gray-500 mr-2">Customer:</span>{order.customer}
          </div>
          <div>
            <span className="text-xs text-gray-500 mr-2">Status:</span>
            <span className={`rounded-full px-3 py-1 text-sm font-semibold ${order.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-700"}`}>{order.status}</span>
          </div>
          <div>
            <span className="text-xs text-gray-500 mr-2">Order Date:</span>{order.date}
          </div>
          {/* Add more order details if available */}
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetail;
