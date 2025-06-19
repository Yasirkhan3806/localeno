
import React from 'react';
import { MapPin, CreditCard } from 'lucide-react';

const OrderSidebar = ({ order }) => {
  return (
    <div className="space-y-6">
      {/* Order Summary */}
      <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Order Date:</span>
            <span className="font-medium">{new Date(order.date).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Items:</span>
            <span className="font-medium">{order.items}</span>
          </div>
          {order.trackingNumber && (
            <div className="flex justify-between">
              <span className="text-gray-600">Tracking:</span>
              <span className="font-medium">{order.trackingNumber}</span>
            </div>
          )}
          <div className="border-t pt-3">
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>${order.total}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <MapPin size={20} className="text-gray-600" />
          <h2 className="text-xl font-bold text-gray-900">Shipping Address</h2>
        </div>
        <div className="text-gray-700">
          <p className="font-medium">{order.shippingAddress.name}</p>
          <p>{order.shippingAddress.address}</p>
          <p>{order.shippingAddress.phone}</p>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard size={20} className="text-gray-600" />
          <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
        </div>
        <p className="text-gray-700">{order.paymentMethod}</p>
      </div>
    </div>
  );
};

export default OrderSidebar;
