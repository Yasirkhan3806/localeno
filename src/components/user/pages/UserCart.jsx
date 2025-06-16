
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../hooks/useCart';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';

const UserCart = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, clearCart, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-4xl mx-auto p-4 lg:p-8">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-black via-gray-800 to-gray-900 text-white p-4 sm:p-6 lg:p-8">
              <button
                onClick={() => navigate('/user/home')}
                className="mb-4 flex items-center gap-2 text-gray-300 hover:text-white transition text-sm sm:text-base"
              >
                <ArrowLeft size={18} className="sm:w-[20px] sm:h-[20px]" />
                Back to Dashboard
              </button>
              <div className="flex items-center gap-3">
                <ShoppingBag size={24} className="sm:w-[32px] sm:h-[32px]" />
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">My Shopping Cart</h1>
              </div>
            </div>

            {/* Empty State */}
            <div className="p-6 sm:p-8 lg:p-12 text-center">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag size={48} className="sm:w-[64px] sm:h-[64px] text-gray-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h3>
              <p className="text-gray-600 text-base sm:text-lg mb-8 max-w-md mx-auto">
                Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
              </p>
              <button
                onClick={() => navigate('/user/products')}
                className="bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Start Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleIncrease = (itemId) => {
    updateQuantity(itemId, 1);
  };

  const handleDecrease = (itemId) => {
    updateQuantity(itemId, -1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto p-4 lg:p-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-black via-gray-800 to-gray-900 text-white p-4 sm:p-6 lg:p-8">
            <button
              onClick={() => navigate('/user/home')}
              className="mb-4 flex items-center gap-2 text-gray-300 hover:text-white transition text-sm sm:text-base"
            >
              <ArrowLeft size={18} className="sm:w-[20px] sm:h-[20px]" />
              Back to Dashboard
            </button>
            <div className="flex items-center gap-3">
              <ShoppingBag size={24} className="sm:w-[32px] sm:h-[32px]" />
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">My Shopping Cart</h1>
            </div>
          </div>

          {/* Cart Items */}
          <div className="p-4 sm:p-6 lg:p-8">
            {cart.map(item => (
              <div key={item.id} className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-6 border-b border-gray-200 pb-6">
                {/* Product Image */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shadow-md flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>

                {/* Product Details */}
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">Price: ${item.price}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleDecrease(item.id)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full p-2 transition-colors"
                    disabled={item.quantity <= 1}
                  >
                    <Minus size={14} className="sm:w-[16px] sm:h-[16px]" />
                  </button>
                  <span className="font-semibold text-gray-800 text-sm sm:text-base min-w-[2rem] text-center">{item.quantity}</span>
                  <button
                    onClick={() => handleIncrease(item.id)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full p-2 transition-colors"
                  >
                    <Plus size={14} className="sm:w-[16px] sm:h-[16px]" />
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:text-red-800 transition-colors p-2"
                >
                  <Trash2 size={18} className="sm:w-[20px] sm:h-[20px]" />
                </button>
              </div>
            ))}

            {/* Cart Summary */}
            <div className="mt-8 flex flex-col items-center lg:items-end gap-4">
              <div className="text-center lg:text-right">
                <h4 className="text-lg sm:text-xl font-bold text-gray-900">
                  Total: ${getCartTotal()}
                </h4>
                <p className="text-gray-600 text-sm sm:text-base">Including taxes and discounts</p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                <button
                  onClick={() => clearCart()}
                  className="bg-red-100 text-red-700 px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl font-bold hover:bg-red-200 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                >
                  Clear Cart
                </button>
                <button
                  onClick={() => navigate('/user/checkout')}
                  className="bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCart;
