
import React from 'react';

const PaymentMethodSection = ({ paymentMethods, selectedPayment, setSelectedPayment }) => {
  return (
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
  );
};

export default PaymentMethodSection;
