
import React from 'react';
import { Search, Filter, Grid, List, ChevronDown, Star } from 'lucide-react';

const sortOptions = [
  { value: "relevance", label: "Most Relevant" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest First" }
];

const ProductsFilters = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  showFilters,
  setShowFilters,
  filteredProducts,
  priceRange,
  setPriceRange
}) => {
  return (
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

      {/* Sidebar Filters */}
      {showFilters && (
        <div className="w-80 space-y-6 mb-8">
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
      )}
    </div>
  );
};

export default ProductsFilters;
