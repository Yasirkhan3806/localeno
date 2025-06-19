
import React from 'react';

const OrderItems = ({ products }) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Order Items</h2>
      <div className="space-y-4">
        {products.map((product, index) => (
          <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-16 object-cover rounded-xl"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{product.name}</h3>
              <p className="text-gray-600">Quantity: {product.quantity}</p>
            </div>
            <p className="font-bold text-gray-900">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderItems;
