
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid3x3 } from 'lucide-react';

const CategoriesSection = ({ featuredCategories }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Grid3x3 size={24} className="text-gray-900" />
          <h2 className="text-2xl font-bold text-gray-900">Browse Categories</h2>
        </div>
        <button
          onClick={() => navigate('/user/products')}
          className="bg-black text-white font-semibold py-3 px-6 rounded-2xl hover:bg-gray-800 hover:scale-105 transition-all duration-300"
        >
          View All Products
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
        {featuredCategories.map((category, index) => (
          <div
            key={index}
            onClick={() => navigate(`/user/products?category=${encodeURIComponent(category.id)}`)}
            className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group border border-gray-100"
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="font-bold text-gray-900 mb-1 text-sm lg:text-base">
                {category.name}
              </h3>
              <p className="text-xs lg:text-sm text-gray-600">
                {category.count}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
