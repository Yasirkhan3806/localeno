
import React from 'react';
import { Search } from 'lucide-react';
import ProductCard from '../ProductCard';

const ProductsGrid = ({
  filteredProducts,
  viewMode,
  handleProductClick,
  setSearchQuery,
  setSelectedCategory,
  setPriceRange
}) => {
  if (filteredProducts.length === 0) {
    return (
      <div className="flex-1">
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
      </div>
    );
  }

  return (
    <div className="flex-1">
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
    </div>
  );
};

export default ProductsGrid;
