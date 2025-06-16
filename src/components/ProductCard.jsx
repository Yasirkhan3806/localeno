
import React, { useState } from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";

const ProductCard = ({ product, onClick, minimal = false, showActions = false }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    // Redirect to login since this is on landing page
    console.log('Redirecting to login for wishlist');
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    // Redirect to login since this is on landing page
    console.log('Redirecting to login for cart');
  };

  const handleRentClick = (e) => {
    e.stopPropagation();
    // Redirect to login since this is on landing page
    console.log('Redirecting to login for rental');
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    // Redirect to login since this is on landing page
    console.log('Redirecting to login for purchase');
  };

  const handleProductClick = () => {
    onClick();
  };

  if (minimal) {
    return (
      <div
        className="flex items-center gap-4 p-4 bg-white rounded-2xl hover:shadow-lg transition-all duration-300 cursor-pointer group border border-gray-100 hover:border-blue-200"
        onClick={handleProductClick}
      >
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-16 h-16 rounded-xl object-cover group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center">
              <span className="text-white text-xs font-semibold">Out</span>
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-lg text-gray-900 truncate group-hover:text-blue-600 transition-colors">
            {product.name}
          </h4>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="text-sm text-gray-600">({product.reviews})</span>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <span className="font-bold text-xl text-gray-900">{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
            )}
            {product.rentPrice && (
              <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
                {product.rentPrice}
              </span>
            )}
          </div>
        </div>

        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
          View Details
        </button>
      </div>
    );
  }

  // Full card layout for grid view
  return (
    <div
      className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer group"
      onClick={handleProductClick}
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Status Badges */}
        <div className="absolute top-4 left-4 space-y-2">
          {!product.inStock && (
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Out of Stock
            </span>
          )}
          {product.rentPrice && product.inStock && (
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Available for Rent
            </span>
          )}
        </div>

        <div className="absolute top-4 right-4">
          <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-semibold text-gray-700">
            Login Required
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h4 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {product.name}
          </h4>
          
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-700">{product.rating}</span>
            <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-bold text-gray-900">{product.price}</span>
            {product.originalPrice && (
              <span className="text-lg text-gray-500 line-through">{product.originalPrice}</span>
            )}
          </div>
          {product.rentPrice && (
            <div className="text-sm text-blue-600 bg-blue-50 px-3 py-2 rounded-lg text-center font-medium">
              Rent for {product.rentPrice}
            </div>
          )}
        </div>

        <div className="space-y-3">
          <button
            onClick={handleProductClick}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-6 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            View Details - Login Required
          </button>
          
          <div className="text-center text-sm text-gray-500">
            Login to add to cart or wishlist
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
