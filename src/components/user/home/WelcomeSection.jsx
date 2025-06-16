
import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomeSection = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-black via-gray-800 to-gray-900 text-white rounded-3xl p-8 shadow-2xl">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">Welcome back!</h1>
          <p className="text-gray-300 text-lg">Discover amazing products and manage your orders</p>
        </div>
        <div className="mt-6 lg:mt-0">
          <button
            onClick={() => navigate('/user/products')}
            className="bg-white text-black px-8 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          >
            Start Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
