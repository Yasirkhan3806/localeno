
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid3x3 } from 'lucide-react';
import {useCategories} from '../../../contexts/ProductsContext'

const CategoriesSection = ({ featuredCategories }) => {
  const navigate = useNavigate();
  const [category,setCategory] = useState([])
  const {categories} = useCategories()


  useEffect(()=>{
    setCategory(categories)
  },[categories])
  const updatedCategories = [
    { 
      name: 'Furniture', 
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=300&q=80', 
      count: '10 items',
      id: 'furniture'
    },
    { 
      name: 'Handicrafts', 
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=300&q=80', 
      count: '8 items',
      id: 'handicrafts'
    },
    { 
      name: 'Clothing Accessories', 
      image: 'https://images.unsplash.com/photo-1487252665478-49b61b47f302?auto=format&fit=crop&w=300&q=80', 
      count: '7 items',
      id: 'clothing accessories'
    },
    { 
      name: 'Home Decor', 
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=300&q=80', 
      count: '6 items',
      id: 'home decor'
    },
    { 
      name: 'Health & Beauty', 
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=300&q=80', 
      count: '8 items',
      id: 'health and beauty'
    }
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <Grid3x3 size={24} className="text-gray-900" />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Browse Categories</h2>
        </div>
        <button
          onClick={() => navigate('/products')}
          className="bg-black text-white font-semibold py-2.5 sm:py-3 px-5 sm:px-6 rounded-2xl hover:bg-gray-800 hover:scale-105 transition-all duration-300 text-sm sm:text-base"
        >
          View All Products
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
        {category.map((category, index) => (
          <div
            key={index}
            onClick={() => navigate(`/products?category=${encodeURIComponent(category.category)}`)}
            className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group border border-gray-100"
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={category.image}
                alt={category.category}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-3 sm:p-4 text-center">
              <h3 className="font-bold text-gray-900 mb-1 text-xs sm:text-sm lg:text-base">
                {category.category}
              </h3>
              <p className="text-xs text-gray-600">
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
