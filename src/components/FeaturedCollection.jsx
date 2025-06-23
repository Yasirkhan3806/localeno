
import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAllProducts } from "../contexts/ProductsContext";
import { useProductReviewContext } from "../contexts/ReviewContext";
import { getDoc,query,collection,where ,getDocs} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { useAuth } from "../contexts/AuthContext";



const FeaturedCollection = () => {
  const navigate = useNavigate();
  const [prodRevSel, setProdRevSel] = useState([]);
  const { allProducts } = useAllProducts();
  const { setProductId, review } = useProductReviewContext();
  const {isAuthenticated} = useAuth();

  useEffect(() => {
    const fetchProductData = async () => {
      if (!allProducts || allProducts.length === 0) return;
      
      try {
        const allData = await Promise.all(
          allProducts.map(async (prod) => {
            const q = query(collection(db, "reviews"), where("productId", "==", prod.id));
            const snapshot = await getDocs(q);
            const reviewsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const sellerData = (await getDoc(prod.sellerRef)).data();
            
            return {
              reviews: reviewsData,
              seller: sellerData,
              product: prod,
            };
          })
        );
        
        console.log(allData);
        setProdRevSel(allData);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, [allProducts]);

  


  const handleProductClick = (product) => {
    // Redirect to login page since product details require authentication
      if(isAuthenticated){
        
      }
    navigate('/login');
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
        OUR COLLECTION
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
        {prodRevSel.slice(0, 4).map((product) => (
        <div
          key={product.product.id}
          className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
          onClick={() => handleProductClick(product.product)}
        >
          <div className="relative">
          <img
            src={product?.product?.productsData?.images[0]}
            alt={product?.product?.productsData?.name}
            className="w-full h-48 object-cover"
          />
          
            <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            ✓ Verified
            </div>
         
          </div>

          <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
            {product?.product?.productsData?.name}
          </h3>
          
          <div className="flex items-center gap-1 mb-2">
            <Star size={14} className="text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{5}</span>
            <span className="text-sm text-gray-500">({product?.reviews[0]?.reviews?.length || 0})</span>
          </div>

          <p className="text-sm text-gray-600 mb-3">{product?.seller?.sellerInfo?.shopName || "Good Shop"}</p>
          
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-bold text-gray-900">{product?.product?.price}</span>
          </div>

          <div className="space-y-2">
            <button
            className="w-full bg-black text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-800 hover:scale-105 transition-all duration-200 transform active:scale-95"
            >
            View Details
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
