
import React from "react";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const featuredProducts = [
  {
    id: 1,
    name: "Handcrafted Wooden Table",
    image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=400&q=80",
    price: "PKR 45,000/day",
    rating: 4.8,
    reviews: 24,
    seller: "Ahmad Furniture",
    verified: true,
    category: "furniture"
  },
  {
    id: 2,
    name: "Vintage Ceramic Vase",
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68d61?auto=format&fit=crop&w=400&q=80",
    price: "PKR 12,000/day",
    rating: 4.9,
    reviews: 18,
    seller: "Pottery House",
    verified: true,
    category: "handicrafts"
  },
  {
    id: 3,
    name: "Traditional Embroidered Dress",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=400&q=80",
    price: "PKR 18,000/day",
    rating: 4.7,
    reviews: 22,
    seller: "Ethnic Wear Studio",
    verified: true,
    category: "clothing"
  },
  {
    id: 4,
    name: "Handmade Leather Bag",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80",
    price: "PKR 9,000/day",
    rating: 4.6,
    reviews: 15,
    seller: "Leather Craft Co.",
    verified: true,
    category: "accessories"
  }
];

const FeaturedCollection = () => {
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    // Redirect to login page since product details require authentication
    navigate('/login');
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
            FEATURED COLLECTION
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Discover Local Treasures
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Handpicked products from verified local creators
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                {product.verified && (
                  <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    ✓ Verified
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                
                <div className="flex items-center gap-1 mb-2">
                  <Star size={14} className="text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-sm text-gray-500">({product.reviews})</span>
                </div>

                <p className="text-sm text-gray-600 mb-3">{product.seller}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-gray-900">{product.price}</span>
                </div>

                <div className="space-y-2">
                  <button
                    className="w-full bg-black text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-800 hover:scale-105 transition-all duration-200 transform active:scale-95"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
