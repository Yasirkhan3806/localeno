
import React from "react";
import { Star, Heart, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const featuredProducts = [
  {
    id: 1,
    name: "Handcrafted Wooden Table",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=400&q=80",
    price: "Rs. 2,500/day",
    rating: 4.8,
    reviews: 24,
    seller: "Ahmad Furniture",
    verified: true,
    category: "furniture"
  },
  {
    id: 2,
    name: "Vintage Ceramic Vase",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=400&q=80",
    price: "Rs. 800/day",
    rating: 4.9,
    reviews: 18,
    seller: "Pottery House",
    verified: true,
    category: "handicrafts"
  },
  {
    id: 3,
    name: "Traditional Embroidered Dress",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80",
    price: "Rs. 1,200/day",
    rating: 4.7,
    reviews: 22,
    seller: "Ethnic Wear Studio",
    verified: true,
    category: "clothing"
  },
  {
    id: 4,
    name: "Handmade Leather Bag",
    image: "https://images.unsplash.com/photo-1487252665478-49b61b47f302?auto=format&fit=crop&w=400&q=80",
    price: "Rs. 600/day",
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
    navigate(`/product/${product.id}`);
  };

  const handleRentNow = (product, e) => {
    e.stopPropagation();
    navigate(`/product/${product.id}?action=rent`);
  };

  const handleWhatsAppContact = (product, e) => {
    e.stopPropagation();
    const message = `Hi, I'm interested in renting your ${product.name}`;
    const whatsappUrl = `https://wa.me/923001234567?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
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
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Add to wishlist functionality
                  }}
                  className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors"
                >
                  <Heart size={16} className="text-gray-600" />
                </button>
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
                    onClick={(e) => handleRentNow(product, e)}
                    className="w-full bg-yellow-500 text-black font-semibold py-2 rounded-lg hover:bg-yellow-400 transition-colors"
                  >
                    Rent Now
                  </button>
                  
                  <button
                    onClick={(e) => handleWhatsAppContact(product, e)}
                    className="w-full border border-gray-300 text-gray-700 font-medium py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={16} />
                    WhatsApp Contact
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
