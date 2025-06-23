
import React, { useState } from "react";
import ProductCard from "./ProductCard.jsx";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";


const CategoryCard = ({ category, onProductClick, onCategoryClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  

  const handleCategoryClick = () => {
    navigate(`/products?category=${category.id}`);
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div 
      className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden group hover:shadow-xl hover:scale-103 transition-all duration-300 transform"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Category Header */}
      <div 
        className="relative cursor-pointer"
        onClick={handleCategoryClick}
      >
        <div className="h-48 overflow-hidden bg-gray-100 relative">
          <img
            src={category.image}
            alt={category.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
        </div>
        
        <div className="absolute top-4 left-4">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md">
            <span className="text-2xl">{category.icon}</span>
          </div>
        </div>
        
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
            <ArrowRight className="w-5 h-5 text-gray-700" />
          </div>
        </div>
      </div>

      {/* Category Info */}
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-1 font-inter">
            {category.title}
          </h3>
          <p className="text-sm text-gray-500">
            {category.products.length} products available
          </p>
        </div>

        {/* Featured Products */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            Featured Products
          </h4>
          <div className="space-y-2">
            {category.products.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => handleProductClick(product)}
                minimal={true}
                showActions={isHovered}
              />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <button 
          onClick={handleCategoryClick}
          className="w-full mt-6 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-black transition-all duration-300 transform hover:scale-105"
        >
          View All {category.title}
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
