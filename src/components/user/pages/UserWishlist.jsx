
import React from 'react';
import { Heart, ShoppingCart, Eye, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../../../hooks/useWishlist';
import { useCart } from '../../../hooks/useCart';
import BackToHomeButton from '../BackToHomeButton';

const UserWishlist = () => {
  const navigate = useNavigate();
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const removeFromWishlist = (item) => {
    toggleWishlist(item);
  };

  const handleAddToCart = (item) => {
    const cartProduct = {
      id: item.id,
      name: item.name,
      price: typeof item.price === 'string' ? parseFloat(item.price.replace(/[₹$,]/g, '')) : item.price,
      image: item.image,
      category: item.category,
      inStock: item.inStock
    };
    
    addToCart(cartProduct);
    console.log('Added to cart from wishlist:', cartProduct.name);
  };

  // Convert price to PKR
  const convertToPKR = (price) => {
    if (!price) return 'PKR 0';
    
    let numericPrice;
    if (typeof price === 'string') {
      numericPrice = parseFloat(price.replace(/[₹$,]/g, ''));
    } else {
      numericPrice = price;
    }
    
    if (isNaN(numericPrice)) return 'PKR 0';
    
    // If it's already in PKR, return as is, otherwise convert from USD
    if (typeof price === 'string' && price.includes('PKR')) {
      return price;
    }
    
    return `PKR ${Math.round(numericPrice * 280).toLocaleString()}`;
  };

  return (
    <div className="space-y-8">
      <BackToHomeButton />
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
        <div className="text-sm text-gray-500">
          {wishlist.length} items
        </div>
      </div>

      {wishlist.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 shadow-md border border-gray-200 text-center">
          <Heart size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
          <p className="text-gray-600 mb-6">Start adding products you love to see them here</p>
          <button
            onClick={() => navigate('/user/products')}
            className="bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-900 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="relative mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-xl"
                />
                <button
                  onClick={() => removeFromWishlist(item)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                >
                  <Heart size={20} className="text-red-500 fill-current" />
                </button>
                {!item.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center">
                    <span className="text-white font-semibold">Out of Stock</span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 line-clamp-2">{item.name}</h3>
                
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-sm ${i < Math.floor(item.rating || 4) ? 'text-yellow-400' : 'text-gray-300'}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">({item.reviews || 0})</span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-gray-900">{convertToPKR(item.price)}</span>
                  {item.originalPrice && item.originalPrice > item.price && (
                    <span className="text-sm text-gray-500 line-through">{convertToPKR(item.originalPrice)}</span>
                  )}
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => navigate(`/product/${item.id}`)}
                    className="flex-1 flex items-center justify-center space-x-2 bg-gray-100 text-gray-900 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                  >
                    <Eye size={18} />
                    <span>View</span>
                  </button>
                  
                  {item.inStock && (
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="flex-1 flex items-center justify-center space-x-2 bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition-colors"
                    >
                      <ShoppingCart size={18} />
                      <span>Add to Cart</span>
                    </button>
                  )}
                </div>

                <button
                  onClick={() => removeFromWishlist(item)}
                  className="w-full flex items-center justify-center space-x-2 text-red-600 py-2 rounded-xl font-medium hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={18} />
                  <span>Remove from Wishlist</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserWishlist;
