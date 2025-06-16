
import React from 'react';

const ProductsCategories = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <section className="py-16 -mt-10 relative z-10">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 cursor-pointer group ${
                selectedCategory === category.id ? 'ring-2 ring-blue-500 shadow-blue-200' : ''
              }`}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-gray-900 mb-1 text-sm lg:text-base">
                  {category.name}
                </h3>
                <p className="text-xs lg:text-sm text-gray-600">
                  {category.count} products
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsCategories;
