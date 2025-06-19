
import React from 'react';
import { MapPin } from 'lucide-react';

const ShippingAddressSection = ({ 
  mockAddresses, 
  selectedAddress, 
  setSelectedAddress, 
  setShowAddAddressModal 
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-lg border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold">
          1
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Shipping Address</h2>
          <p className="text-gray-600">Where should we deliver your order?</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {mockAddresses.map((addr) => (
          <label key={addr.id} className="block cursor-pointer">
            <div className={`p-4 lg:p-6 rounded-2xl border-2 transition-all duration-300 ${
              selectedAddress === addr.id 
                ? "border-black bg-gray-50 shadow-md" 
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}>
              <div className="flex items-start gap-4">
                <input
                  type="radio"
                  checked={selectedAddress === addr.id}
                  onChange={() => setSelectedAddress(addr.id)}
                  className="mt-1 w-5 h-5 text-black focus:ring-black border-gray-300"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={16} className="text-gray-600" />
                    <span className="font-bold text-gray-900">{addr.label}</span>
                  </div>
                  <p className="text-gray-700 mb-1">{addr.address}</p>
                  <p className="text-sm text-gray-600">{addr.phone}</p>
                </div>
              </div>
            </div>
          </label>
        ))}
        
        <button 
          onClick={() => setShowAddAddressModal(true)}
          className="w-full p-4 border-2 border-dashed border-gray-300 rounded-2xl text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-all duration-300"
        >
          + Add New Address
        </button>
      </div>
    </div>
  );
};

export default ShippingAddressSection;
