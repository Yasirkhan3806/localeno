
import React from "react";
import ProductCard from "./ProductCard.jsx";
import { ArrowRight } from "lucide-react";

const CategoryCard = ({ category, onProductClick, index }) => (
  <div className={`bg-white rounded-3xl p-8 flex flex-col shadow-2xl border border-gray-100 hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 min-h-[420px] group relative overflow-hidden ${index === 1 ? 'lg:scale-105 lg:z-10' : ''}`}>
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
            {category.icon}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              {category.title}
            </h3>
            <p className="text-gray-500 text-sm">{category.products.length} products</p>
          </div>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <ArrowRight className="w-6 h-6 text-blue-600" />
        </div>
      </div>
      
      <div className="space-y-3 flex-1">
        {category.products.slice(0, 3).map((prod) => (
          <ProductCard
            key={prod.id}
            product={prod}
            minimal
            onClick={() => onProductClick(prod)}
          />
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-100">
        <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
          View All {category.title}
        </button>
      </div>
    </div>
  </div>
);

export default CategoryCard;
