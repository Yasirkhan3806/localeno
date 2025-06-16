
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Tag, Truck, Shield } from 'lucide-react';
import { useCart } from '../../../hooks/useCart';

const UserCart = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1;
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + tax + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => navigate('/user/home')}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-black transition"
          >
            <ArrowLeft size={20} />
            Back to Shopping
          </button>
          
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={48} className="text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 text-lg">Discover amazing products and start your shopping journey</p>
            <button
              onClick={() => navigate('/user/products')}
              className="bg-gradient-to-r from-black to-gray-800 text-white px-8 py-4 rounded-2xl font-semibold hover:from-gray-800 hover:to-black transition-all duration-300 transform hover:scale-105"
            >
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/user/home')}
            className="mb-4 flex items-center gap-2 text-gray-600 hover:text-black transition"
          >
            <ArrowLeft size={20} />
            Continue Shopping
          </button>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">Shopping Cart</h1>
              <p className="text-gray-600 mt-2">{cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart</p>
            </div>
            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-800 font-medium transition"
            >
              Clear Cart
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="xl:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.id} className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="relative group">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-2xl transition-all duration-300"></div>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">{item.name}</h3>
                      <div className="flex items-center gap-4">
                        <span className="text-2xl font-bold text-gray-900">${item.price}</span>
                        {item.rentPrice && (
                          <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-lg">
                            ${item.rentPrice}/day rent
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <span className="text-gray-600 font-medium">Qty:</span>
                        <div className="flex items-center bg-gray-100 rounded-2xl">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-3 hover:bg-gray-200 rounded-l-2xl transition"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-16 text-center font-bold text-lg">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-3 hover:bg-gray-200 rounded-r-2xl transition"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Subtotal */}
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Subtotal</p>
                        <p className="text-xl font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-3 text-red-600 hover:bg-red-50 rounded-2xl transition-all duration-200 hover:scale-110"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="xl:col-span-1">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              {/* Promo Code */}
              <div className="mb-6 p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <Tag size={16} className="text-gray-600" />
                  <span className="font-medium text-gray-900">Promo Code</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                  <button className="px-6 py-2 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition">
                    Apply
                  </button>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cart.length} items)</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (10%)</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <div className="flex items-center gap-1">
                    <Truck size={16} />
                    <span>Shipping</span>
                  </div>
                  <span className="font-semibold">
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {subtotal > 100 && (
                  <div className="text-sm text-green-600 bg-green-50 p-2 rounded-lg">
                    🎉 You saved $15 on shipping!
                  </div>
                )}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
                <Shield size={16} className="text-green-600" />
                <span>Secure 256-bit SSL encryption</span>
              </div>

              <button
                onClick={() => navigate('/user/checkout')}
                className="w-full bg-gradient-to-r from-black to-gray-800 text-white py-4 rounded-2xl font-bold text-lg hover:from-gray-800 hover:to-black transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => navigate('/user/products')}
                className="w-full mt-4 border-2 border-gray-300 text-gray-700 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all duration-300"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCart;
