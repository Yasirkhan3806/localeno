import React, { useState, useEffect } from "react";
import { Search, Filter, Grid, List, ChevronDown, Star, Heart, ShoppingCart } from "lucide-react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";

// Sample products data
const allProducts = [
  // FURNITURE
  { id: 1, name: "Handcrafted Wooden Table", category: "furniture", image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=200&q=80", price: "$299", originalPrice: "$399", rentPrice: "$25/day", inStock: true, rating: 4.5, reviews: 123 },
  { id: 2, name: "Vintage Armchair", category: "furniture", image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=200&q=80", price: "$450", originalPrice: "$550", rentPrice: "$35/day", inStock: true, rating: 4.8, reviews: 89 },
  { id: 3, name: "Coffee Table", category: "furniture", image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=200&q=80", price: "$220", originalPrice: "$280", rentPrice: "$20/day", inStock: false, rating: 4.7, reviews: 234 },
  
  // HANDICRAFTS
  { id: 4, name: "Handwoven Ceramic Bowl", category: "handicrafts", image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=200&q=80", price: "$45", originalPrice: "$65", rentPrice: "$5/day", inStock: true, rating: 4.8, reviews: 67 },
  { id: 5, name: "Traditional Wood Carving", category: "handicrafts", image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=200&q=80", price: "$120", originalPrice: "$150", rentPrice: "$12/day", inStock: true, rating: 4.7, reviews: 156 },
  { id: 6, name: "Handmade Pottery Vase", category: "handicrafts", image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=200&q=80", price: "$65", originalPrice: "$85", rentPrice: "$8/day", inStock: true, rating: 4.6, reviews: 89 },
  
  // CLOTHING ACCESSORIES
  { id: 7, name: "Handmade Leather Bag", category: "clothing accessories", image: "https://images.unsplash.com/photo-1487252665478-49b61b47f302?auto=format&fit=crop&w=200&q=80", price: "$149", originalPrice: "$199", rentPrice: "$12/day", inStock: true, rating: 4.4, reviews: 43 },
  { id: 8, name: "Silver Jewelry Set", category: "clothing accessories", image: "https://images.unsplash.com/photo-1487252665478-49b61b47f302?auto=format&fit=crop&w=200&q=80", price: "$200", originalPrice: "$250", rentPrice: "$15/day", inStock: true, rating: 4.6, reviews: 45 },
  { id: 9, name: "Designer Scarf", category: "clothing accessories", image: "https://images.unsplash.com/photo-1487252665478-49b61b47f302?auto=format&fit=crop&w=200&q=80", price: "$85", originalPrice: "$110", rentPrice: "$8/day", inStock: false, rating: 4.5, reviews: 78 },
  
  // HOME DECOR
  { id: 10, name: "Modern Wall Art", category: "home decor", image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=200&q=80", price: "$79", originalPrice: "$99", rentPrice: "$6/day", inStock: true, rating: 4.3, reviews: 21 },
  { id: 11, name: "Table Lamp", category: "home decor", image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=200&q=80", price: "$65", originalPrice: "$85", rentPrice: "$7/day", inStock: true, rating: 4.7, reviews: 56 },
  { id: 12, name: "Decorative Candles", category: "home decor", image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=200&q=80", price: "$35", originalPrice: "$45", rentPrice: "$4/day", inStock: true, rating: 4.2, reviews: 89 },
  
  // HEALTH AND BEAUTY
  { id: 13, name: "Organic Face Cream", category: "health and beauty", image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=200&q=80", price: "$45", originalPrice: "$60", rentPrice: "$0/day", inStock: true, rating: 4.6, reviews: 67 },
  { id: 14, name: "Natural Hair Oil", category: "health and beauty", image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=200&q=80", price: "$35", originalPrice: "$45", rentPrice: "$0/day", inStock: false, rating: 4.4, reviews: 34 },
  { id: 15, name: "Herbal Soap Set", category: "health and beauty", image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=200&q=80", price: "$25", originalPrice: "$35", rentPrice: "$0/day", inStock: true, rating: 4.5, reviews: 45 }
];

const categories = [
  { id: "all", name: "All Products", count: allProducts.length },
  { id: "furniture", name: "Furniture", count: allProducts.filter(p => p.category === "furniture").length },
  { id: "handicrafts", name: "Handicrafts", count: allProducts.filter(p => p.category === "handicrafts").length },
  { id: "clothing accessories", name: "Clothing Accessories", count: allProducts.filter(p => p.category === "clothing accessories").length },
  { id: "home decor", name: "Home Decor", count: allProducts.filter(p => p.category === "home decor").length },
  { id: "health and beauty", name: "Health and Beauty", count: allProducts.filter(p => p.category === "health and beauty").length }
];

const sortOptions = [
  { value: "relevance", label: "Most Relevant" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest First" }
];

const Products = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState(allProducts);
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    filterAndSortProducts();
  }, [searchQuery, selectedCategory, sortBy, priceRange]);

  const filterAndSortProducts = () => {
    let filtered = allProducts;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter(product => {
      const price = parseInt(product.price.replace('$', ''));
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => parseInt(a.price.replace('$', '')) - parseInt(b.price.replace('$', '')));
        break;
      case 'price-high':
        filtered.sort((a, b) => parseInt(b.price.replace('$', '')) - parseInt(a.price.replace('$', '')));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        // Keep original order for relevance
        break;
    }

    setFilteredProducts(filtered);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ search: searchQuery, category: selectedCategory });
    filterAndSortProducts();
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setSearchParams({ search: searchQuery, category: categoryId });
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Products</h1>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                className="bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-black transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          {/* Filters and Sort */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter size={16} />
                <span>Filters</span>
              </button>
              
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 px-4 py-2 pr-8 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {filteredProducts.length} products found
              </span>
              <div className="flex bg-white border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-64 space-y-6`}>
            {/* Categories */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.id 
                        ? 'bg-gray-900 text-white' 
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{category.name}</span>
                      <span className="text-sm opacity-75">({category.count})</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Min"
                  />
                  <span className="text-gray-500">to</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="Max"
                  />
                </div>
              </div>
            </div>

            {/* Rating Filter */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="font-semibold text-gray-900 mb-4">Rating</h3>
              <div className="space-y-2">
                {[4, 3, 2, 1].map(rating => (
                  <button
                    key={rating}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={`${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">& up</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search size={48} className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => handleProductClick(product)}
                    minimal={viewMode === 'list'}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Products;
