
import React from "react";
import { Heart, Star } from "lucide-react";

const ProductCard = ({ product, onClick, minimal }) => (
  <div
    className={`flex items-center gap-4 group bg-white rounded-2xl p-4 border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300 hover:scale-[1.02] cursor-pointer ${minimal ? "" : "flex-col"} `}
    onClick={onClick}
    tabIndex={0}
    role="button"
    aria-label={product.name}
  >
    <div className="relative">
      <img
        src={product.image}
        alt={product.name}
        className={minimal
          ? "h-14 w-14 rounded-xl object-cover group-hover:scale-110 transition-transform duration-300"
          : "w-[120px] h-[120px] rounded-2xl object-cover mb-3 group-hover:scale-105 transition-transform duration-300"}
        loading="lazy"
      />
      {minimal && (
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center">
          <Star className="w-3 h-3 text-white fill-current" />
        </div>
      )}
    </div>
    
    <div className="flex-1">
      <h4 className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors duration-300 truncate">
        {product.name}
      </h4>
      <div className="flex items-center gap-2 mt-1">
        <span className="font-bold text-lg text-gray-900">{product.price}</span>
        {minimal && <span className="text-xs text-gray-500 line-through">$99</span>}
      </div>
      {!minimal && (
        <div className="flex items-center gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
          ))}
          <span className="text-sm text-gray-500 ml-1">(4.5)</span>
        </div>
      )}
    </div>
    
    {!minimal && (
      <button
        className="ml-auto p-2 rounded-full border border-gray-200 bg-white hover:bg-red-50 hover:border-red-200 hover:scale-110 transition-all duration-300 group/heart"
        title="Add to Wishlist"
        onClick={e => { e.stopPropagation(); }}
      >
        <Heart size={18} className="text-gray-400 group-hover/heart:text-red-500 transition-colors" />
      </button>
    )}
  </div>
);

export default ProductCard;
