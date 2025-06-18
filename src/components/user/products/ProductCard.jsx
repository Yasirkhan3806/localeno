
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Calendar, Star } from 'lucide-react';
import { useCart } from '../../../hooks/useCart';
import { useWishlist } from '../../../hooks/useWishlist';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const handleRentNow = (product) => {
    navigate('/user/rentals');
    console.log('Rented product:', product.name);
  };

  const handleBuyNow = (product) => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (product) => {
    // Ensure the product has all required fields for the cart
    const cartProduct = {
      id: product.id,
      name: product.name,
      price: typeof product.price === 'string' ? parseFloat(product.price.replace(/[₹$,]/g, '')) : product.price,
      image: product.image,
      category: product.category,
      inStock: product.inStock
    };
    
    addToCart(cartProduct);
    console.log('Added to cart:', cartProduct.name);
  };

  // Convert dollar prices to PKR (assuming 1 USD = 280 PKR)
  const convertToPKR = (dollarPrice) => {
    if (!dollarPrice) return 'PKR 0';
    
    let numericPrice;
    if (typeof dollarPrice === 'string') {
      numericPrice = parseFloat(dollarPrice.replace(/[₹$,]/g, ''));
    } else if (typeof dollarPrice === 'number') {
      numericPrice = dollarPrice;
    } else {
      console.log('Unexpected price format:', dollarPrice);
      return 'PKR 0';
    }
    
    if (isNaN(numericPrice)) {
      console.log('Could not parse price:', dollarPrice);
      return 'PKR 0';
    }
    
    // If it's already in PKR, return as is, otherwise convert from USD
    if (typeof dollarPrice === 'string' && dollarPrice.includes('PKR')) {
      return dollarPrice;
    }
    
    return `PKR ${Math.round(numericPrice * 280).toLocaleString()}`;
  };

  const convertRentToPKR = (rentPrice) => {
    if (!rentPrice) return null;
    
    let numericPrice;
    if (typeof rentPrice === 'string') {
      numericPrice = parseFloat(rentPrice.replace(/[₹$,]/g, '').replace('/day', ''));
    } else if (typeof rentPrice === 'number') {
      numericPrice = rentPrice;
    } else {
      console.log('Unexpected rent price format:', rentPrice);
      return null;
    }
    
    if (isNaN(numericPrice)) {
      console.log('Could not parse rent price:', rentPrice);
      return null;
    }
    
    // If it's already in PKR, return as is, otherwise convert from USD
    if (typeof rentPrice === 'string' && rentPrice.includes('PKR')) {
      return rentPrice;
    }
    
    return `PKR ${Math.round(numericPrice * 280).toLocaleString()}/day`;
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <button
          className={`absolute top-3 right-3 p-2 rounded-full shadow-lg transition-all duration-300 ${
            isWishlisted(product.id) ? 'bg-red-100 text-red-600 scale-110' : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'
          }`}
          onClick={() => toggleWishlist(product)}
          aria-label={isWishlisted(product.id) ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            size={20}
            className={isWishlisted(product.id) ? "fill-current" : ""}
          />
        </button>
        
        {/* Status Badges */}
        <div className="absolute top-3 left-3 space-y-2">
          {!product.inStock && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Out of Stock
            </span>
          )}
          {product.isRentable && (
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Rentable
            </span>
          )}
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-3">
          <span className="text-xs text-gray-500 uppercase tracking-wide">{product.category}</span>
          <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
        </div>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className={`${i < Math.floor(product.rating || 4) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">({product.reviews || 0})</span>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">{convertToPKR(product.price)}</span>
            {product.rentPrice && (
              <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-lg">
                {convertRentToPKR(product.rentPrice)}
              </span>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <button
            onClick={() => handleBuyNow(product)}
            className="w-full bg-gradient-to-r from-black to-gray-800 text-white font-semibold py-3 px-4 rounded-2xl hover:from-gray-800 hover:to-black transition-all duration-300 transform hover:scale-105"
          >
            Buy Now
          </button>
          
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleAddToCart(product)}
              disabled={!product.inStock}
              className="bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-xl hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <ShoppingCart size={16} />
              Cart
            </button>
            
            {product.isRentable && (
              <button
                onClick={() => handleRentNow(product)}
                disabled={!product.inStock}
                className="border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-xl hover:bg-purple-600 hover:text-white transition-all duration-200 flex items-center justify-center disabled:opacity-50"
              >
                <Calendar size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
