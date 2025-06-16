import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import ProductsHero from "../components/products/ProductsHero.jsx";
import ProductsCategories from "../components/products/ProductsCategories.jsx";
import ProductsFilters from "../components/products/ProductsFilters.jsx";
import ProductsGrid from "../components/products/ProductsGrid.jsx";
import { Search, Filter, Grid, List, ChevronDown, Star, Heart, ShoppingCart, Shield } from "lucide-react";

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
      
      <ProductsHero />
      
      <ProductsCategories 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      
      <div className="flex gap-8">
        <ProductsFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          filteredProducts={filteredProducts}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />

        <ProductsGrid
          filteredProducts={filteredProducts}
          viewMode={viewMode}
          handleProductClick={handleProductClick}
          setSearchQuery={setSearchQuery}
          setSelectedCategory={setSelectedCategory}
          setPriceRange={setPriceRange}
        />
      </div>

      <Footer />
    </div>
  );
};

export default Products;
