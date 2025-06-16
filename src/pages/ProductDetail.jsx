import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, MessageCircle, Share2, Star, Camera, Send, ArrowLeft, Plus, Minus } from "lucide-react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import IdentityVerificationModal from "../components/IdentityVerificationModal.jsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

// Sample product data with new categories
const sampleProducts = {
  1: {
    id: 1,
    name: "Handcrafted Wooden Dining Table",
    brand: "FurniCraft",
    price: "$299",
    originalPrice: "$399",
    rentPrice: "$25/day",
    category: "Furniture",
    images: [
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Beautiful handcrafted wooden dining table made from premium oak wood. Perfect for family gatherings and elegant dining experiences.",
    specifications: {
      "Material": "Premium Oak Wood",
      "Dimensions": "180 x 90 x 75 cm",
      "Weight": "45 kg",
      "Seating Capacity": "6 people",
      "Finish": "Natural Wood Stain",
      "Assembly": "Minimal assembly required"
    },
    features: [
      "Handcrafted Design",
      "Premium Oak Wood",
      "Seats 6 People",
      "Durable Construction",
      "Natural Wood Finish"
    ],
    seller: {
      name: "FurniCraft Studio",
      rating: 4.8,
      verified: true,
      responseTime: "Within 2 hours"
    },
    inStock: true,
    stock: 5,
    rating: 4.6,
    totalReviews: 124
  }
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product] = useState(sampleProducts[id] || sampleProducts[1]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [reviews, setReviews] = useState([
    {
      id: 1,
      user: "Ahmed Khan",
      rating: 5,
      date: "2024-01-15",
      comment: "Excellent quality furniture! Worth every penny.",
      images: ["https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=200&q=80"],
      verified: true,
      helpful: 12,
      replies: [
        {
          id: 1,
          user: "FurniCraft Studio",
          date: "2024-01-16",
          comment: "Thank you for your feedback! We're glad you love the product.",
          seller: true
        }
      ]
    },
    {
      id: 2,
      user: "Sarah Ali",
      rating: 4,
      date: "2024-01-10",
      comment: "Beautiful table but delivery took longer than expected.",
      verified: true,
      helpful: 8,
      replies: []
    }
  ]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "", images: [] });

  const handleAddToCart = () => {
    console.log(`Added ${quantity} x ${product.name} to cart`);
    navigate('/user/cart');
  };

  const handleBuyNow = () => {
    console.log(`Buying ${quantity} x ${product.name}`);
    navigate('/user/checkout');
  };

  const handleRentNow = () => {
    console.log(`Renting ${product.name}`);
    navigate('/user/rentals');
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    
    if (!isVerified) {
      setShowVerificationModal(true);
      return;
    }

    const review = {
      id: reviews.length + 1,
      user: "Current User",
      rating: newReview.rating,
      date: new Date().toISOString().split('T')[0],
      comment: newReview.comment,
      images: newReview.images,
      verified: true,
      helpful: 0,
      replies: []
    };
    setReviews([review, ...reviews]);
    setNewReview({ rating: 5, comment: "", images: [] });
  };

  const handleVerificationComplete = () => {
    setIsVerified(true);
    console.log("Identity verification completed successfully");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <button onClick={() => navigate('/')} className="hover:text-gray-900">Home</button>
          <span>/</span>
          <button onClick={() => navigate('/products')} className="hover:text-gray-900">Products</button>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-md">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex space-x-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-gray-900' : 'border-gray-200'
                  }`}
                >
                  <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">{product.brand}</span>
                <button
                  onClick={() => setIsFavorited(!isFavorited)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <Heart
                    size={24}
                    className={`${isFavorited ? 'text-red-500 fill-current' : 'text-gray-400'}`}
                  />
                </button>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">
                    {product.rating} ({product.totalReviews} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-bold text-gray-900">{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">{product.originalPrice}</span>
                )}
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  25% OFF
                </span>
              </div>
              <div className="text-sm text-gray-600 mb-4">
                Rent option: <span className="font-semibold text-gray-900">{product.rentPrice}</span>
              </div>
              
              {/* Quantity */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <span className="text-sm text-gray-600">({product.stock} available)</span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-black text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-800 hover:scale-105 transition-all duration-200 transform active:scale-95"
                >
                  Buy Now
                </button>
                
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-xl hover:bg-gray-300 hover:scale-105 transition-all duration-200 transform active:scale-95 flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={18} />
                    Add to Cart
                  </button>
                  
                  <button
                    onClick={handleRentNow}
                    className="border border-gray-900 text-gray-900 py-3 px-4 rounded-xl font-semibold hover:bg-gray-900 hover:text-white transition-all duration-200"
                  >
                    Rent Now
                  </button>
                </div>
              </div>
            </div>

            {/* Seller Info */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="font-semibold text-gray-900 mb-3">Seller Information</h3>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{product.seller.name}</span>
                    {product.seller.verified && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-1 mt-1">
                    <Star size={14} className="text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{product.seller.rating}</span>
                    <span className="text-sm text-gray-500">• {product.seller.responseTime}</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowChat(true)}
                  className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
                >
                  <MessageCircle size={16} />
                  <span>Chat</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 bg-gray-50">
              <TabsTrigger value="overview" className="py-3">Overview</TabsTrigger>
              <TabsTrigger value="specifications" className="py-3">Specifications</TabsTrigger>
              <TabsTrigger value="reviews" className="py-3">Reviews</TabsTrigger>
              <TabsTrigger value="seller" className="py-3">Seller</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Product Description</h3>
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="p-6">
              <h3 className="text-xl font-semibold mb-6">Technical Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-b border-gray-200">
                    <span className="font-medium text-gray-700">{key}</span>
                    <span className="text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Customer Reviews</h3>
                  <div className="flex items-center space-x-2">
                    <Star size={20} className="text-yellow-400 fill-current" />
                    <span className="font-semibold">{product.rating}</span>
                    <span className="text-gray-600">({product.totalReviews} reviews)</span>
                  </div>
                </div>

                {/* Write Review */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold mb-4">Write a Review</h4>
                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewReview({...newReview, rating: star})}
                            className="p-1"
                          >
                            <Star
                              size={24}
                              className={`${star <= newReview.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
                      <textarea
                        value={newReview.comment}
                        onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        rows="4"
                        placeholder="Share your experience with this product..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 hover:scale-105 transition-all duration-200"
                    >
                      {isVerified ? 'Submit Review' : 'Verify Identity & Submit Review'}
                    </button>
                  </form>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="font-semibold text-gray-700">
                              {review.user.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{review.user}</span>
                              {review.verified && (
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                                  Verified Purchase
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className="flex space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    size={14}
                                    className={`${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-600">{review.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">{review.comment}</p>
                      {review.images && review.images.length > 0 && (
                        <div className="flex space-x-2 mb-3">
                          {review.images.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt="Review"
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                          ))}
                        </div>
                      )}
                      <div className="flex items-center space-x-4">
                        <button className="text-sm text-gray-600 hover:text-gray-900">
                          Helpful ({review.helpful})
                        </button>
                        <button className="text-sm text-gray-600 hover:text-gray-900">
                          Reply
                        </button>
                      </div>
                      
                      {/* Replies */}
                      {review.replies && review.replies.length > 0 && (
                        <div className="ml-8 mt-4 space-y-3">
                          {review.replies.map((reply) => (
                            <div key={reply.id} className="bg-gray-50 rounded-lg p-4">
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="font-medium">{reply.user}</span>
                                {reply.seller && (
                                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                                    Seller
                                  </span>
                                )}
                                <span className="text-sm text-gray-600">{reply.date}</span>
                              </div>
                              <p className="text-gray-700">{reply.comment}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="seller" className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{product.seller.name}</h3>
                    <div className="flex items-center space-x-2 mt-2">
                      <Star size={16} className="text-yellow-400 fill-current" />
                      <span className="font-medium">{product.seller.rating}</span>
                      <span className="text-gray-600">(1,234 reviews)</span>
                      {product.seller.verified && (
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                          Verified Seller
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => setShowChat(true)}
                    className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-black transition-colors flex items-center space-x-2"
                  >
                    <MessageCircle size={18} />
                    <span>Contact Seller</span>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-gray-900">98%</div>
                    <div className="text-sm text-gray-600">Positive Feedback</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-gray-900">2.1k</div>
                    <div className="text-sm text-gray-600">Items Sold</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-gray-900">2 hrs</div>
                    <div className="text-sm text-gray-600">Response Time</div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Identity Verification Modal */}
      <IdentityVerificationModal
        isOpen={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
        onVerificationComplete={handleVerificationComplete}
        productName={product.name}
      />

      <Footer />
    </div>
  );
};

export default ProductDetail;
