
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Filter, Grid, List, Heart, ShoppingCart, Calendar, Star, ArrowLeft } from 'lucide-react';
import { useCart } from '../../../hooks/useCart';
import { useWishlist } from '../../../hooks/useWishlist';

const UserProducts = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || categoryName || '');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    'All Products',
    'Handicrafts',
    'Home Decor',
    'Furniture', 
    'Health & Beauty',
    'Clothing',
    'Accessories'
  ];

  // Mock products organized by categories
  const allProducts = [
    // Handicrafts (10 products)
    { id: 1, name: 'Handwoven Ceramic Bowl', price: 45, rentPrice: 5, image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=300&q=80', category: 'Handicrafts', rating: 4.8, reviews: 89, inStock: true, isRentable: true },
    { id: 2, name: 'Traditional Wood Carving', price: 120, rentPrice: 12, image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=300&q=80', category: 'Handicrafts', rating: 4.7, reviews: 56, inStock: true, isRentable: true },
    { id: 3, name: 'Handmade Pottery Vase', price: 65, rentPrice: 8, image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=300&q=80', category: 'Handicrafts', rating: 4.6, reviews: 34, inStock: false, isRentable: false },
    { id: 4, name: 'Artisan Wicker Basket', price: 35, rentPrice: 4, image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=300&q=80', category: 'Handicrafts', rating: 4.5, reviews: 78, inStock: true, isRentable: true },
    { id: 5, name: 'Hand-painted Canvas', price: 85, rentPrice: 10, image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=300&q=80', category: 'Handicrafts', rating: 4.9, reviews: 23, inStock: true, isRentable: true },
    { id: 6, name: 'Traditional Tapestry', price: 150, rentPrice: 15, image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=300&q=80', category: 'Handicrafts', rating: 4.4, reviews: 45, inStock: true, isRentable: true },
    { id: 7, name: 'Handcrafted Jewelry Box', price: 75, rentPrice: 8, image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=300&q=80', category: 'Handicrafts', rating: 4.7, reviews: 67, inStock: true, isRentable: false },
    { id: 8, name: 'Artisan Glass Sculpture', price: 200, rentPrice: 20, image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=300&q=80', category: 'Handicrafts', rating: 4.8, reviews: 12, inStock: false, isRentable: false },
    { id: 9, name: 'Hand-knitted Blanket', price: 90, rentPrice: 12, image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=300&q=80', category: 'Handicrafts', rating: 4.6, reviews: 89, inStock: true, isRentable: true },
    { id: 10, name: 'Wooden Wind Chimes', price: 25, rentPrice: 3, image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=300&q=80', category: 'Handicrafts', rating: 4.3, reviews: 156, inStock: true, isRentable: true },

    // Home Decor (10 products)
    { id: 11, name: 'Modern Wall Art', price: 79, rentPrice: 6, image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=300&q=80', category: 'Home Decor', rating: 4.3, reviews: 22, inStock: true, isRentable: true },
    { id: 12, name: 'Decorative Mirror', price: 120, rentPrice: 10, image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=300&q=80', category: 'Home Decor', rating: 4.5, reviews: 45, inStock: true, isRentable: true },
    { id: 13, name: 'Table Lamp', price: 65, rentPrice: 7, image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=300&q=80', category: 'Home Decor', rating: 4.7, reviews: 78, inStock: false, isRentable: false },
    { id: 14, name: 'Throw Pillows Set', price: 45, rentPrice: 5, image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=300&q=80', category: 'Home Decor', rating: 4.4, reviews: 67, inStock: true, isRentable: true },
    { id: 15, name: 'Floor Vase', price: 95, rentPrice: 8, image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=300&q=80', category: 'Home Decor', rating: 4.6, reviews: 34, inStock: true, isRentable: true },
    { id: 16, name: 'Wall Clock', price: 55, rentPrice: 6, image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=300&q=80', category: 'Home Decor', rating: 4.5, reviews: 89, inStock: true, isRentable: false },
    { id: 17, name: 'Candle Holders', price: 35, rentPrice: 4, image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=300&q=80', category: 'Home Decor', rating: 4.3, reviews: 123, inStock: true, isRentable: true },
    { id: 18, name: 'Decorative Tray', price: 40, rentPrice: 4, image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=300&q=80', category: 'Home Decor', rating: 4.4, reviews: 56, inStock: false, isRentable: false },
    { id: 19, name: 'Wall Shelves', price: 85, rentPrice: 9, image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=300&q=80', category: 'Home Decor', rating: 4.7, reviews: 45, inStock: true, isRentable: true },
    { id: 20, name: 'Picture Frames Set', price: 30, rentPrice: 3, image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=300&q=80', category: 'Home Decor', rating: 4.2, reviews: 78, inStock: true, isRentable: true },

    // Continue for other categories...
    // Furniture (10 products)
    { id: 21, name: 'Handcrafted Wooden Table', price: 299, rentPrice: 25, image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=300&q=80', category: 'Furniture', rating: 4.5, reviews: 124, inStock: true, isRentable: true },
    { id: 22, name: 'Vintage Armchair', price: 450, rentPrice: 35, image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=300&q=80', category: 'Furniture', rating: 4.8, reviews: 67, inStock: true, isRentable: true },
    { id: 23, name: 'Bookshelf Unit', price: 180, rentPrice: 18, image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=300&q=80', category: 'Furniture', rating: 4.6, reviews: 89, inStock: false, isRentable: false },
    { id: 24, name: 'Coffee Table', price: 220, rentPrice: 20, image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=300&q=80', category: 'Furniture', rating: 4.7, reviews: 45, inStock: true, isRentable: true },
    { id: 25, name: 'Dining Chairs Set', price: 350, rentPrice: 30, image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=300&q=80', category: 'Furniture', rating: 4.5, reviews: 78, inStock: true, isRentable: true },
    { id: 26, name: 'Storage Ottoman', price: 95, rentPrice: 10, image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=300&q=80', category: 'Furniture', rating: 4.4, reviews: 34, inStock: true, isRentable: false },
    { id: 27, name: 'Desk Organizer', price: 65, rentPrice: 7, image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=300&q=80', category: 'Furniture', rating: 4.3, reviews: 123, inStock: true, isRentable: true },
    { id: 28, name: 'Bar Stool', price: 120, rentPrice: 12, image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=300&q=80', category: 'Furniture', rating: 4.6, reviews: 56, inStock: false, isRentable: false },
    { id: 29, name: 'Cabinet Unit', price: 280, rentPrice: 25, image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=300&q=80', category: 'Furniture', rating: 4.7, reviews: 23, inStock: true, isRentable: true },
    { id: 30, name: 'TV Stand', price: 150, rentPrice: 15, image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=300&q=80', category: 'Furniture', rating: 4.4, reviews: 67, inStock: true, isRentable: true },

    // Health & Beauty, Clothing, Accessories - similar pattern...
    { id: 31, name: 'Organic Face Cream', price: 45, rentPrice: 4, image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=300&q=80', category: 'Health & Beauty', rating: 4.6, reviews: 51, inStock: true, isRentable: false },
    { id: 40, name: 'Traditional Embroidered Dress', price: 199, rentPrice: 20, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&q=80', category: 'Clothing', rating: 4.3, reviews: 67, inStock: false, isRentable: false },
    { id: 50, name: 'Handmade Leather Bag', price: 149, rentPrice: 12, image: 'https://images.unsplash.com/photo-1487252665478-49b61b47f302?auto=format&fit=crop&w=300&q=80', category: 'Accessories', rating: 4.4, reviews: 40, inStock: true, isRentable: true },
  ];

  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [rentedItems, setRentedItems] = useState([]);

  useEffect(() => {
    setSearchQuery(searchParams.get('search') || '');
    setSelectedCategory(searchParams.get('category') || categoryName || '');
  }, [searchParams, categoryName]);

  const handleRentNow = (product) => {
    setRentedItems(prev => [...prev, product.id]);
    navigate('/user/rentals');
    console.log('Rented product:', product.name);
  };

  const handleBuyNow = (product) => {
    navigate(`/product/${product.id}`);
  };

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'All Products' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const ProductCard = ({ product }) => (
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
              <Star key={i} size={14} className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">${product.price}</span>
            {product.rentPrice && (
              <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-lg">
                ${product.rentPrice}/day
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
              onClick={() => addToCart(product)}
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/user/home')}
            className="mb-4 flex items-center gap-2 text-gray-600 hover:text-black transition"
          >
            <ArrowLeft size={20} />
            Back to Home
          </button>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                {selectedCategory && selectedCategory !== 'All Products' ? `${selectedCategory} Products` : 'Browse Categories'}
              </h1>
              <p className="text-gray-600 mt-2">{filteredProducts.length} products found</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-xl ${viewMode === 'grid' ? 'bg-black text-white' : 'bg-white text-gray-600 hover:bg-gray-100'} transition`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-xl ${viewMode === 'list' ? 'bg-black text-white' : 'bg-white text-gray-600 hover:bg-gray-100'} transition`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-black focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category === 'All Products' ? '' : category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-black focus:border-transparent"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={48} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 text-lg mb-6">Try adjusting your search or browse our categories</p>
            <button
              onClick={() => {setSearchQuery(''); setSelectedCategory('');}}
              className="bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProducts;
