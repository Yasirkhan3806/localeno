
import React from 'react';
import { convertToPKR, formatPKR } from '../../../utils/currency';

const OrderItemsPreview = ({ cart }) => {
  return (
    <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-lg border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Order Items ({cart.length})</h3>
      <div className="space-y-4 max-h-64 overflow-y-auto">
        {cart.map(item => (
          <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-xl"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">{item.name}</h4>
              <p className="text-gray-600">Qty: {item.quantity}</p>
            </div>
            <p className="font-bold text-gray-900">{formatPKR(convertToPKR(item.price) * item.quantity)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderItemsPreview;
