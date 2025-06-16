
import React, { useState, useEffect } from "react";
import { Search, Filter, Grid, List, ChevronDown, Star, Heart, ShoppingCart, Shield } from "lucide-react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";

// Updated products data with 5 categories and realistic products
const allProducts = [
  // HOME DECOR (8 products)
  { id: 1, name: "Modern Table Lamp", category: "home-decor", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80", price: "PKR 8,500", originalPrice: "PKR 12,000", rentPrice: "PKR 450/day", inStock: true, rating: 4.5, reviews: 89 },
  { id: 2, name: "Ceramic Decorative Vase", category: "home-decor", image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68d61?auto=format&fit=crop&w=400&q=80", price: "PKR 6,500", originalPrice: "PKR 8,500", rentPrice: "PKR 350/day", inStock: true, rating: 4.3, reviews: 67 },
  { id: 3, name: "Wall Art Canvas Set", category: "home-decor", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=400&q=80", price: "PKR 15,000", originalPrice: "PKR 20,000", rentPrice: "PKR 750/day", inStock: true, rating: 4.7, reviews: 124 },
  { id: 4, name: "Decorative Mirror", category: "home-decor", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80", price: "PKR 12,000", originalPrice: "PKR 16,000", rentPrice: "PKR 600/day", inStock: false, rating: 4.4, reviews: 45 },
  { id: 5, name: "Throw Pillow Set", category: "home-decor", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80", price: "PKR 4,500", originalPrice: "PKR 6,000", rentPrice: "PKR 200/day", inStock: true, rating: 4.2, reviews: 78 },
  { id: 6, name: "Scented Candle Collection", category: "home-decor", image: "https://images.unsplash.com/photo-1602874801006-e747fb3ba818?auto=format&fit=crop&w=400&q=80", price: "PKR 3,500", originalPrice: "PKR 4,500", rentPrice: "PKR 150/day", inStock: true, rating: 4.6, reviews: 156 },
  { id: 7, name: "Indoor Plant Pot", category: "home-decor", image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=400&q=80", price: "PKR 2,800", originalPrice: "PKR 3,500", rentPrice: "PKR 120/day", inStock: true, rating: 4.1, reviews: 89 },
  { id: 8, name: "Crystal Chandelier", category: "home-decor", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80", price: "PKR 35,000", originalPrice: "PKR 45,000", rentPrice: "PKR 1,500/day", inStock: true, rating: 4.8, reviews: 23 },

  // FURNITURE (10 products)
  { id: 9, name: "Wooden Dining Table", category: "furniture", image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=400&q=80", price: "PKR 75,000", originalPrice: "PKR 95,000", rentPrice: "PKR 2,500/day", inStock: true, rating: 4.7, reviews: 67 },
  { id: 10, name: "Comfort Sofa Set", category: "furniture", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80", price: "PKR 125,000", originalPrice: "PKR 150,000", rentPrice: "PKR 4,000/day", inStock: true, rating: 4.5, reviews: 89 },
  { id: 11, name: "Office Chair", category: "furniture", image: "https://images.unsplash.com/photo-1541558869434-2840d308329a?auto=format&fit=crop&w=400&q=80", price: "PKR 25,000", originalPrice: "PKR 35,000", rentPrice: "PKR 800/day", inStock: false, rating: 4.3, reviews: 134 },
  { id: 12, name: "Bookshelf Unit", category: "furniture", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80", price: "PKR 45,000", originalPrice: "PKR 55,000", rentPrice: "PKR 1,200/day", inStock: true, rating: 4.6, reviews: 78 },
  { id: 13, name: "Coffee Table", category: "furniture", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80", price: "PKR 35,000", originalPrice: "PKR 42,000", rentPrice: "PKR 950/day", inStock: true, rating: 4.4, reviews: 45 },
  { id: 14, name: "Wardrobe Cabinet", category: "furniture", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80", price: "PKR 85,000", originalPrice: "PKR 110,000", rentPrice: "PKR 2,800/day", inStock: true, rating: 4.8, reviews: 56 },
  { id: 15, name: "Study Desk", category: "furniture", image: "https://images.unsplash.com/photo-1541558869434-2840d308329a?auto=format&fit=crop&w=400&q=80", price: "PKR 28,000", originalPrice: "PKR 35,000", rentPrice: "PKR 750/day", inStock: true, rating: 4.2, reviews: 92 },
  { id: 16, name: "Bar Stool Set", category: "furniture", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80", price: "PKR 18,000", originalPrice: "PKR 24,000", rentPrice: "PKR 450/day", inStock: true, rating: 4.1, reviews: 67 },
  { id: 17, name: "Recliner Chair", category: "furniture", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80", price: "PKR 65,000", originalPrice: "PKR 80,000", rentPrice: "PKR 1,800/day", inStock: false, rating: 4.7, reviews: 34 },
  { id: 18, name: "Side Table", category: "furniture", image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=400&q=80", price: "PKR 15,000", originalPrice: "PKR 18,000", rentPrice: "PKR 350/day", inStock: true, rating: 4.3, reviews: 89 },

  // HANDICRAFTS (7 products)
  { id: 19, name: "Handwoven Carpet", category: "handicrafts", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80", price: "PKR 55,000", originalPrice: "PKR 70,000", rentPrice: "PKR 1,500/day", inStock: true, rating: 4.8, reviews: 45 },
  { id: 20, name: "Clay Pottery Set", category: "handicrafts", image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68d61?auto=format&fit=crop&w=400&q=80", price: "PKR 12,000", originalPrice: "PKR 15,000", rentPrice: "PKR 350/day", inStock: true, rating: 4.5, reviews: 78 },
  { id: 21, name: "Wooden Sculpture", category: "handicrafts", image: "https://images.unsplash.com/photo-1544096644-0e1f4e3ce48a?auto=format&fit=crop&w=400&q=80", price: "PKR 25,000", originalPrice: "PKR 32,000", rentPrice: "PKR 650/day", inStock: true, rating: 4.6, reviews: 34 },
  { id: 22, name: "Embroidered Wall Hanging", category: "handicrafts", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=400&q=80", price: "PKR 18,000", originalPrice: "PKR 23,000", rentPrice: "PKR 450/day", inStock: false, rating: 4.4, reviews: 67 },
  { id: 23, name: "Brass Decorative Items", category: "handicrafts", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80", price: "PKR 8,500", originalPrice: "PKR 11,000", rentPrice: "PKR 250/day", inStock: true, rating: 4.3, reviews: 89 },
  { id: 24, name: "Handmade Basket", category: "handicrafts", image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=400&q=80", price: "PKR 6,500", originalPrice: "PKR 8,500", rentPrice: "PKR 180/day", inStock: true, rating: 4.2, reviews: 56 },
  { id: 25, name: "Traditional Calligraphy", category: "handicrafts", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=400&q=80", price: "PKR 15,000", originalPrice: "PKR 19,000", rentPrice: "PKR 400/day", inStock: true, rating: 4.7, reviews: 23 },

  // HEALTH & BEAUTY (6 products)
  { id: 26, name: "Organic Skincare Set", category: "health-beauty", image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=400&q=80", price: "PKR 8,500", originalPrice: "PKR 11,000", inStock: true, rating: 4.6, reviews: 156 },
  { id: 27, name: "Natural Hair Care Kit", category: "health-beauty", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80", price: "PKR 6,500", originalPrice: "PKR 8,500", inStock: true, rating: 4.4, reviews: 89 },
  { id: 28, name: "Essential Oils Collection", category: "health-beauty", image: "https://images.unsplash.com/photo-1602874801006-e747fb3ba818?auto=format&fit=crop&w=400&q=80", price: "PKR 12,000", originalPrice: "PKR 15,000", inStock: false, rating: 4.7, reviews: 67 },
  { id: 29, name: "Herbal Tea Set", category: "health-beauty", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=400&q=80", price: "PKR 4,500", originalPrice: "PKR 6,000", inStock: true, rating: 4.3, reviews: 78 },
  { id: 30, name: "Aromatherapy Diffuser", category: "health-beauty", image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=400&q=80", price: "PKR 9,500", originalPrice: "PKR 12,000", inStock: true, rating: 4.5, reviews: 45 },
  { id: 31, name: "Face Mask Set", category: "health-beauty", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80", price: "PKR 3,500", originalPrice: "PKR 4,500", inStock: true, rating: 4.2, reviews: 134 },

  // CLOTHING & ACCESSORIES (9 products)
  { id: 32, name: "Designer Handbag", category: "clothing-accessories", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80", price: "PKR 18,000", originalPrice: "PKR 24,000", rentPrice: "PKR 450/day", inStock: true, rating: 4.6, reviews: 89 },
  { id: 33, name: "Silk Scarf Collection", category: "clothing-accessories", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80", price: "PKR 8,500", originalPrice: "PKR 11,000", rentPrice: "PKR 250/day", inStock: true, rating: 4.4, reviews: 67 },
  { id: 34, name: "Leather Wallet", category: "clothing-accessories", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80", price: "PKR 6,500", originalPrice: "PKR 8,500", rentPrice: "PKR 180/day", inStock: true, rating: 4.3, reviews: 78 },
  { id: 35, name: "Gold Jewelry Set", category: "clothing-accessories", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&q=80", price: "PKR 45,000", originalPrice: "PKR 55,000", rentPrice: "PKR 1,200/day", inStock: false, rating: 4.8, reviews: 34 },
  { id: 36, name: "Designer Sunglasses", category: "clothing-accessories", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=400&q=80", price: "PKR 12,000", originalPrice: "PKR 15,000", rentPrice: "PKR 350/day", inStock: true, rating: 4.5, reviews: 56 },
  { id: 37, name: "Traditional Shawl", category: "clothing-accessories", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80", price: "PKR 15,000", originalPrice: "PKR 18,000", rentPrice: "PKR 400/day", inStock: true, rating: 4.7, reviews: 45 },
  { id: 38, name: "Leather Belt", category: "clothing-accessories", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80", price: "PKR 4,500", originalPrice: "PKR 6,000", rentPrice: "PKR 150/day", inStock: true, rating: 4.2, reviews: 89 },
  { id: 39, name: "Pearl Necklace", category: "clothing-accessories", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&q=80", price: "PKR 25,000", originalPrice: "PKR 32,000", rentPrice: "PKR 650/day", inStock: true, rating: 4.6, reviews: 23 },
  { id: 40, name: "Watch Collection", category: "clothing-accessories", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=400&q=80", price: "PKR 35,000", originalPrice: "PKR 42,000", rentPrice: "PKR 900/day", inStock: true, rating: 4.4, reviews: 67 }
];

const categories = [
  { id: "all", name: "All Products", count: allProducts.length, image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80" },
  { id: "home-decor", name: "Home Decor", count: allProducts.filter(p => p.category === "home-decor").length, image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=400&q=80" },
  { id: "furniture", name: "Furniture", count: allProducts.filter(p => p.category === "furniture").length, image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=400&q=80" },
  { id: "handicrafts", name: "Handicrafts", count: allProducts.filter(p => p.category === "handicrafts").length, image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68d61?auto=format&fit=crop&w=400&q=80" },
  { id: "health-beauty", name: "Health & Beauty", count: allProducts.filter(p => p.category === "health-beauty").length, image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=400&q=80" },
  { id: "clothing-accessories", name: "Clothing & Accessories", count: allProducts.filter(p => p.category === "clothing-accessories").length, image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80" }
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
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState([0, 150000]);
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
      const price = parseInt(product.price.replace('PKR ', '').replace(',', ''));
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => parseInt(a.price.replace('PKR ', '').replace(',', '')) - parseInt(b.price.replace('PKR ', '').replace(',', '')));
        break;
      case 'price-high':
        filtered.sort((a, b) => parseInt(b.price.replace('PKR ', '').replace(',', '')) - parseInt(a.price.replace('PKR ', '').replace(',', '')));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
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
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      {/* Hero Section with Categories */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80" 
            alt="Products Background" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Discover Amazing Products
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Browse through our curated collection of quality products from trusted local sellers
          </p>
          
          {/* Trust Badge */}
          <div className="group inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full text-white hover:bg-white/20 transition-all duration-300 cursor-pointer">
            <Shield size={20} className="text-green-400" />
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Verified Identity Required - Build Trust
            </span>
            <span className="group-hover:opacity-0 transition-opacity duration-300">
              Verify Identity to Build Trust
            </span>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 -mt-10 relative z-10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 cursor-pointer group ${
                  selectedCategory === category.id ? 'ring-2 ring-blue-500 shadow-blue-200' : ''
                }`}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm lg:text-base">
                    {category.name}
                  </h3>
                  <p className="text-xs lg:text-sm text-gray-600">
                    {category.count} products
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-8 border border-gray-100">
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="flex-1 relative w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-600 focus:border-transparent text-lg"
                />
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                Search Products
              </button>
            </div>
          </form>

          {/* Filters and Sort */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 bg-gray-100 border border-gray-300 px-4 py-3 rounded-xl hover:bg-gray-200 transition-colors"
              >
                <Filter size={18} />
                <span>Filters</span>
              </button>
              
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-gray-100 border border-gray-300 px-4 py-3 pr-10 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-gray-600 font-medium">
                {filteredProducts.length} products found
              </span>
              <div className="flex bg-gray-100 border border-gray-300 rounded-xl overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'} transition-colors`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'} transition-colors`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-80 space-y-6`}>
            {/* Price Range */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-6 text-lg">Price Range</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Min PKR"
                  />
                  <span className="text-gray-500 font-medium">to</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Max PKR"
                  />
                </div>
                <div className="text-sm text-gray-600 text-center">
                  PKR {priceRange[0].toLocaleString()} - PKR {priceRange[1].toLocaleString()}
                </div>
              </div>
            </div>

            {/* Rating Filter */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-6 text-lg">Customer Rating</h3>
              <div className="space-y-3">
                {[4, 3, 2, 1].map(rating => (
                  <button
                    key={rating}
                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={`${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-gray-600">& up</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search size={64} className="text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No products found</h3>
                <p className="text-gray-600 text-lg mb-8">Try adjusting your search or filter criteria</p>
                <button
                  onClick={() => {setSearchQuery(''); setSelectedCategory('all'); setPriceRange([0, 150000]);}}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className={`grid gap-8 ${
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
