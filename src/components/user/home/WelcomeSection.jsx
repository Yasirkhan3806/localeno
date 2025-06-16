
import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomeSection = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-black via-gray-800 to-gray-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Welcome back!</h1>
          <p className="text-gray-300 text-base sm:text-lg">Discover amazing products and manage your orders</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate('/user/products')}
            className="bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
          >
            Start Shopping
          </button>
          <button
            onClick={() => navigate('/user/orders')}
            className="bg-transparent border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
          >
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
