
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, Filter, Grid, List, Heart, ShoppingCart, Calendar, Star } from 'lucide-react';
import { useCart } from '../../../hooks/useCart';
import { useWishlist } from '../../../hooks/useWishlist';
import BackToHomeButton from '../BackToHomeButton';

const UserProducts = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryName || '');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    'All Products',
    'Home Decor',
    'Furniture',
    'Clothing',
    'Accessories', 
    'Handicrafts',
    'Health & Beauty',
  ];

  const products = [
    {
      id: 1,
      name: 'Handcrafted Wooden Table',
      price: 299,
      rentPrice: 25,
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=300&q=80',
      category: 'Furniture',
      rating: 4.5,
      reviews: 124,
      inStock: true
    },
    {
      id: 2,
      name: 'Vintage Ceramic Vase',
      price: 89,
      rentPrice: 8,
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=300&q=80',
      category: 'Handicrafts',
      rating: 4.8,
      reviews: 89,
      inStock: true
    },
    {
      id: 3,
      name: 'Traditional Embroidered Dress',
      price: 199,
      rentPrice: 20,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&q=80',
      category: 'Clothing',
      rating: 4.3,
      reviews: 67,
      inStock: false
    },
    {
      id: 4,
      name: 'Handmade Leather Bag',
      price: 149,
      rentPrice: 12,
      image: 'https://images.unsplash.com/photo-1487252665478-49b61b47f302?auto=format&fit=crop&w=300&q=80',
      category: 'Accessories',
      rating: 4.4,
      reviews: 40,
      inStock: true
    },
    {
      id: 5,
      name: 'Modern Wall Art',
      price: 79,
      rentPrice: 6,
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=300&q=80',
      category: 'Home Decor',
      rating: 4.3,
      reviews: 22,
      inStock: true
    },
    {
      id: 6,
      name: 'Organic Face Cream',
      price: 45,
      rentPrice: 4,
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=300&q=80',
      category: 'Health & Beauty',
      rating: 4.6,
      reviews: 51,
      inStock: true
    },
  ];

  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [rentedItems, setRentedItems] = useState([]);

  const handleRentNow = (product) => {
    setRentedItems(prev => [...prev, product.id]);
    navigate('/user/rentals');
    console.log('Rented product:', product.name);
  };

  const handleBuyNow = (product) => {
    navigate(`/product/${product.id}`);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'All Products' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden group hover:shadow-xl transition-all duration-300">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition ${
            isWishlisted(product.id) ? 'bg-red-100 text-red-600' : 'bg-white text-gray-600'
          }`}
          onClick={() => toggleWishlist(product)}
          aria-label={isWishlisted(product.id) ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            size={20}
            className={
              isWishlisted(product.id)
                ? "fill-current text-red-500"
                : "text-gray-600 hover:text-red-500"
            }
          />
        </button>
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
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
            <span className="text-sm text-gray-600">${product.rentPrice}/day rent</span>
          </div>
        </div>
        <div className="space-y-2">
          <button
            onClick={() => handleBuyNow(product)}
            className="w-full bg-black text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-800 hover:scale-105 transition-all duration-200 transform active:scale-95"
          >
            Buy Now
          </button>
          
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => addToCart(product)}
              className="bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-300 hover:scale-105 transition-all duration-200 transform active:scale-95 flex items-center justify-center gap-2"
            >
              <ShoppingCart size={16} />
              Cart
            </button>
            
            <button
              onClick={() => handleRentNow(product)}
              className={`border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-purple-600 hover:text-white transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center ${
                rentedItems.includes(product.id) ? "bg-purple-100 text-purple-700" : ""
              }`}
            >
              <Calendar size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <BackToHomeButton />
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {categoryName ? `${categoryName} Products` : 'All Products'}
          </h1>
          <p className="text-gray-600 mt-1">{filteredProducts.length} products found</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            <Grid size={20} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            <List size={20} />
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
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
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
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
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
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
          <p className="text-gray-500 text-lg">No products found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default UserProducts;
