
import React from 'react';
import { Truck, Shield, CheckCircle } from 'lucide-react';
import { formatPKR } from '../../../utils/currency';

const OrderSummary = ({ 
  subtotal, 
  tax, 
  shipping, 
  total, 
  isProcessing, 
  handlePlaceOrder 
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-xl border border-gray-100 sticky top-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-semibold">{formatPKR(subtotal)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Tax (10%)</span>
          <span className="font-semibold">{formatPKR(tax)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <div className="flex items-center gap-1">
            <Truck size={16} />
            <span>Shipping</span>
          </div>
          <span className="font-semibold">
            {shipping === 0 ? 'FREE' : formatPKR(shipping)}
          </span>
        </div>
        {shipping === 0 && (
          <div className="text-sm text-green-600 bg-green-50 p-3 rounded-2xl">
            🎉 Free shipping applied!
          </div>
        )}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between text-xl font-bold text-gray-900">
            <span>Total</span>
            <span>{formatPKR(total)}</span>
          </div>
        </div>
      </div>

      {/* Security Features */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Shield size={16} className="text-green-600" />
          <span>256-bit SSL encryption</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <CheckCircle size={16} className="text-green-600" />
          <span>Money-back guarantee</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Truck size={16} className="text-green-600" />
          <span>Fast & secure delivery</span>
        </div>
      </div>

      <button
        onClick={handlePlaceOrder}
        disabled={isProcessing}
        className="w-full bg-gradient-to-r from-black to-gray-800 text-white py-4 rounded-2xl font-bold text-lg hover:from-gray-800 hover:to-black transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {isProcessing ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Processing...
          </div>
        ) : (
          'Place Order'
        )}
      </button>

      <p className="text-xs text-gray-500 text-center mt-4">
        By placing your order, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  );
};

export default OrderSummary;
