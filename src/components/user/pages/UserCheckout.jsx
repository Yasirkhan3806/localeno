
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, CreditCard, Truck, Shield, CheckCircle } from 'lucide-react';
import { useCart } from '../../../hooks/useCart';

const UserCheckout = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [selectedAddress, setSelectedAddress] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState('cod');
  const [isProcessing, setIsProcessing] = useState(false);

  const mockAddresses = [
    { id: 1, label: "Home", address: "123 Main St, Springfield, USA", phone: "+1 234-567-8900" },
    { id: 2, label: "Work", address: "456 5th Ave, Metropolis, USA", phone: "+1 234-567-8901" }
  ];

  const paymentMethods = [
    { id: 'cod', label: 'Cash on Delivery', icon: '💵', description: 'Pay when you receive' },
    { id: 'jazzcash', label: 'JazzCash', icon: '📱', description: 'Mobile wallet payment' },
    { id: 'bank', label: 'Bank Transfer', icon: '🏦', description: 'Direct bank transfer' },
    { id: 'card', label: 'Credit/Debit Card', icon: '💳', description: 'Visa, Mastercard accepted' }
  ];

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1;
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + tax + shipping;

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      alert('Order placed successfully! 🎉');
      navigate('/user/orders');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/user/cart')}
            className="mb-4 flex items-center gap-2 text-gray-600 hover:text-black transition"
          >
            <ArrowLeft size={20} />
            Back to Cart
          </button>
          
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2">Complete your order securely</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Side - Forms */}
          <div className="xl:col-span-2 space-y-8">
            {/* Shipping Address */}
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
                  <label key={addr.id} className={`block cursor-pointer`}>
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
                
                <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-2xl text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-all duration-300">
                  + Add New Address
                </button>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
                  <p className="text-gray-600">Choose your preferred payment option</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paymentMethods.map((method) => (
                  <label key={method.id} className="cursor-pointer">
                    <div className={`p-4 lg:p-6 rounded-2xl border-2 transition-all duration-300 ${
                      selectedPayment === method.id 
                        ? "border-black bg-gray-50 shadow-md" 
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}>
                      <div className="flex items-center gap-4">
                        <input
                          type="radio"
                          checked={selectedPayment === method.id}
                          onChange={() => setSelectedPayment(method.id)}
                          className="w-5 h-5 text-black focus:ring-black border-gray-300"
                        />
                        <div className="text-2xl">{method.icon}</div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-900">{method.label}</p>
                          <p className="text-sm text-gray-600">{method.description}</p>
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Order Items Preview */}
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
                    <p className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="xl:col-span-1">
            <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-xl border border-gray-100 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
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
                {shipping === 0 && (
                  <div className="text-sm text-green-600 bg-green-50 p-3 rounded-2xl">
                    🎉 Free shipping applied!
                  </div>
                )}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCheckout;
