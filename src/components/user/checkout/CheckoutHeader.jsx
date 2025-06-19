
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CheckoutHeader = () => {
  const navigate = useNavigate();

  return (
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
  );
};

export default CheckoutHeader;
