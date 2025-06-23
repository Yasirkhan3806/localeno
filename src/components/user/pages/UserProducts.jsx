
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Search, ArrowLeft } from 'lucide-react';
import ProductCard from '../../ProductCard'
import ProductSearchFilters from '../products/ProductSearchFilters';
import { allProducts, categories } from '../products/ProductsData';
import { useAllProducts } from '../../../contexts/ProductsContext';
import { getDocs, collection } from "firebase/firestore";
import { db } from '../../../config/firebaseConfig';
import { useCategories } from '../../../contexts/ProductsContext';

const UserProducts = () => {
  const { categoryName } = useParams();
  // const {allProducts,loading} = useAllProducts();
  const [dProd,setDProd] = useState([])
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || categoryName || '');
  const [sortBy, setSortBy] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  // const {categories} =  useCategories()

 
  const fetchAllProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Products"));
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };

 useEffect(() => {
  fetchAllProducts()
    .then(allProducts => {
      setDProd(allProducts)
      console.log(allProducts)
    })
    .catch(error => {
      console.error("Error:", error);
    });
}, [])




  useEffect(() => {
    setSearchQuery(searchParams.get('search') || '');
    setSelectedCategory(searchParams.get('category') || categoryName || '');
  }, [searchParams, categoryName]);

  let filteredProducts = dProd.filter(product => {
    const matchesSearch = product?.productsData?.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'All Products' || product?.productsData.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });


//   const sortProducts = (products) => {
//     switch (sortBy) {
//       case 'price-low':
//         return [...products].sort((a, b) => parseInt((a?.productsData?.productsData.price || 0)) - parseInt((b?.productsData?.productsData.price || 0)));
//       case 'price-high':
//         return [...products].sort((a, b) => (b?.productsData?.productsData.price || 0) - (a?.productsData?.productsData.price || 0));
//       case 'rating':
//         return [...products].sort((a, b) => (b?.productsData?.productsData.rating || 0) - (a?.productsData?.productsData.rating || 0));
//       case 'newest':
//         return [...products].sort((a, b) => {
//           const dateA = new Date(a?.productsData?.productsData.dateAdded || 0);
//           const dateB = new Date(b?.productsData?.productsData.dateAdded || 0);
//           return dateB - dateA;
//         });
//       default:
//         return products;
//     }
//   };

//   // Fixed this line - removed .productsData
//  filteredProducts  = sortProducts(dProd);



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
          </div>
        </div>

        Search and Filters
        <ProductSearchFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
          categories={categories}
        />

        {/* Products Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} productId={product.id} product={product?.productsData} />
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
