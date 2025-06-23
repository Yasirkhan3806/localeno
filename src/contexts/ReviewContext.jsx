import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../config/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

const productsReviewContext = createContext();

export const ProductsReviewProvider  = ({ children }) => {
  const [productId, setProductId] = useState(null);
  const [review, setReview] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch reviews only when productId is available
 useEffect(() => {
  if (!productId) return;


  const timer = setTimeout(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, "reviews"), where("productId", "==", productId));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setReview(data);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, 3000); // milliseconds
  return () => clearTimeout(timer); // Cleanup if component unmounts
}, [productId]);

  return (
    <productsReviewContext.Provider value={{ review, loading, setProductId }}>
      {children}
    </productsReviewContext.Provider>
  );
};

export const useProductReviewContext = () => useContext(productsReviewContext);
