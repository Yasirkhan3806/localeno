
import React from "react";
import { ArrowLeft, User } from "lucide-react";

// Minimal customer detail page
const AdminCustomerDetail = ({ customer, onBack }) => {
  console.log(customer)
  if (!customer) return null;


  return (
    <div className="w-full max-w-2xl mx-auto mt-6 animate-fade-in">
      <button
        onClick={onBack}
        className="flex items-center gap-2 bg-transparent text-gray-500 hover:text-black font-medium mb-4"
      >
        <ArrowLeft size={20} /> Back to Customers
      </button>
      <div className="bg-white rounded-2xl p-7 shadow-md border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <User size={28} className="text-gray-600" />
          <h1 className="text-2xl font-bold text-gray-900">{customer?.userData?.userName}{customer?.userData?.firstName} {customer?.userData?.lastName}</h1>
        </div>
        <div className="space-y-2 text-gray-800">
          <div>
            <span className="text-xs text-gray-500 mr-2">Email:</span>{customer?.userData?.email}
          </div>
          <div>
            <span className="text-xs text-gray-500 mr-2">Joined:</span>{customer.joined}
          </div>
          {/* Add more customer fields if available */}
        </div>
      </div>
    </div>
  );
};

export default AdminCustomerDetail;
