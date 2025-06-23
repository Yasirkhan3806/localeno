
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../contexts/ProductsContext.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";

const CategoriesGrid = () => {
  const navigate = useNavigate();
  const {categories} = useCategories();
  const {isAuthenticated} = useAuth()
  const handleCategoryClick = (categoryId) => {
    navigate(`/products?category=${encodeURIComponent(categoryId)}`);
  };

  const handleBrowseAllCategories = () => {
    if(isAuthenticated){
navigate('/products');
    }else{
      navigate('/login')
    }
    
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Browse Categories
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Discover unique products across different categories from local creators
          </p>
          
          {/* Browse All Categories Button */}
          <button
            onClick={handleBrowseAllCategories}
            className="bg-black text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 hover:scale-105 transition-all duration-200 transform active:scale-95"
          >
            Browse All Categories
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.category)}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 cursor-pointer group"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={category.image}
                  alt={category.category}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-gray-900 mb-1 text-sm lg:text-base">
                  {category.category}
                </h3>
                {/* <p className="text-xs lg:text-sm text-gray-600">
                  {category.productCount}
                </p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesGrid;
