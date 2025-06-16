
import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    id: "home-decor",
    title: "Home Decor",
    productCount: "150 products",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "furniture",
    title: "Furniture", 
    productCount: "200 products",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "clothing",
    title: "Clothing",
    productCount: "300 products", 
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "accessories",
    title: "Accessories",
    productCount: "180 products",
    image: "https://images.unsplash.com/photo-1487252665478-49b61b47f302?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "handicrafts",
    title: "Handicrafts", 
    productCount: "120 products",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "health-beauty",
    title: "Health & Beauty",
    productCount: "90 products",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=400&q=80"
  }
];

const CategoriesGrid = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    navigate(`/products?category=${categoryId}`);
  };

  const handleBrowseAllCategories = () => {
    navigate('/products');
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 cursor-pointer group"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-gray-900 mb-1 text-sm lg:text-base">
                  {category.title}
                </h3>
                <p className="text-xs lg:text-sm text-gray-600">
                  {category.productCount}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesGrid;
