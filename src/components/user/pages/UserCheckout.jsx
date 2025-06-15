import React, { useState } from 'react';
import BackToHomeButton from '../BackToHomeButton';

const mockAddresses = [
  { id: 1, label: "Home", address: "123 Main St, Springfield, USA" },
  { id: 2, label: "Work", address: "456 5th Ave, Metropolis, USA" }
];
const paymentMethods = [
  { id: 'cod', label: 'Cash on Delivery', icon: '💵' },
  { id: 'jazzcash', label: 'JazzCash', icon: '📱' },
  { id: 'bank', label: 'Bank Transfer', icon: '🏦' }
];

const UserCheckout = () => {
  const [selectedAddress, setSelectedAddress] = useState(mockAddresses[0].id);
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0].id);

  // Example order breakdown
  const subtotal = 350;
  const tax = 35;
  const shipping = 15;
  const total = subtotal + tax + shipping;

  const handlePlaceOrder = () => {
    // Show toast or UI change (using Shadcn/Sonner if used in app)
    alert('Order placed successfully! 🎉');
  };

  return (
    <div className="space-y-8">
      <BackToHomeButton />
      <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Address & Payment */}
        <div className="flex-1 space-y-6">
          <div className="bg-white rounded-2xl p-5 shadow border border-gray-200">
            <h2 className="font-semibold text-lg text-gray-900 mb-3">Shipping Address</h2>
            <ul className="space-y-2">
              {mockAddresses.map((addr) => (
                <li key={addr.id}>
                  <label className={`flex gap-3 items-center p-3 rounded-lg cursor-pointer transition border ${selectedAddress === addr.id ? "border-black bg-gray-50" : "border-gray-200 hover:bg-gray-50"}`}>
                    <input
                      type="radio"
                      checked={selectedAddress === addr.id}
                      onChange={() => setSelectedAddress(addr.id)}
                      className="form-radio accent-black"
                    />
                    <span>
                      <span className="font-semibold">{addr.label}:</span> <span className="text-gray-700">{addr.address}</span>
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow border border-gray-200">
            <h2 className="font-semibold text-lg text-gray-900 mb-3">Payment Method</h2>
            <ul className="grid gap-2">
              {paymentMethods.map((method) => (
                <li key={method.id}>
                  <label className={`flex gap-3 items-center px-4 py-3 rounded-lg cursor-pointer transition border ${selectedPayment === method.id ? "border-black bg-gray-50" : "border-gray-200 hover:bg-gray-50"}`}>
                    <input
                      type="radio"
                      checked={selectedPayment === method.id}
                      onChange={() => setSelectedPayment(method.id)}
                      className="form-radio accent-black"
                    />
                    <span className="text-xl">{method.icon}</span>
                    <span className="font-semibold">{method.label}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Order Summary */}
        <div className="w-full md:w-[370px] bg-white rounded-2xl p-6 shadow border border-gray-200 h-fit">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax</span>
              <span className="font-semibold">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-semibold">${shipping.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <button
            onClick={handlePlaceOrder}
            className="w-full mt-6 bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition-colors"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCheckout;
