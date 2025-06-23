import React, { createContext, useContext, useEffect, useState } from 'react';
import { getDocs, collection, doc,query,where ,getDoc} from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig';
import {useUser} from './UserContext'

// Replace with your actual Firestore import and initialization

const CategoriesContext = createContext();

export const useCategories = () => useContext(CategoriesContext);

export const CategoriesProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const querySnapshot = await getDocs(collection(db, 'categories'));
                const cats = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setCategories(cats);
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    return (
        <CategoriesContext.Provider value={{ categories, loading }}>
            {children}
        </CategoriesContext.Provider>
    );
};


const ProductsContext = createContext();

export const useProducts = () => useContext(ProductsContext);


export const ProductsProvider = ({ children }) => {
  const [product, setProduct] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const {userData} = useUser()
  setTimeout(()=>{
const uid = auth?.currentUser?.uid
setUserId(uid)
},[4000])

  useEffect(() => {
    // if (!userId) return;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        // console.log(auth?.currentUser)
        const docRef =  doc(db,'userData',userId);
        const userDocs = await getDoc(docRef)
        const q = query(collection(db, "Products"), where("sellerRef", "==", userDocs.ref));
        const querySnapshot = await getDocs(q);
        const prods = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProduct(prods);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [userId]);

  return (
    <ProductsContext.Provider value={{ product, loading }}>
      {children}
    </ProductsContext.Provider>
  );
};

const ReviewsContext = createContext();

export const useReviews = () => useContext(ReviewsContext);

export const ReviewsProvider = ({ children }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            try {
                const userId = auth?.currentUser?.uid;
                if (!userId) {
                    setReviews([]);
                    setLoading(false);
                    return;
                }
                const userDocRef = doc(db, 'userData', userId);
                const q = query(collection(db, 'reviews'), where('userRef', '==', userDocRef));
                const querySnapshot = await getDocs(q);
                const fetchedReviews = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setReviews(fetchedReviews);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [auth?.currentUser?.uid]);

    return (
        <ReviewsContext.Provider value={{ reviews, loading }}>
            {children}
        </ReviewsContext.Provider>
    );
};

const AllProductsContext = createContext();

export const useAllProducts = () => useContext(AllProductsContext);

export const AllProductsProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "Products"));
        const products = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllProducts(products);
      } catch (error) {
        console.error("Error fetching all products:", error);
      } finally {
        setLoading(false);
      }
    };
   

    fetchAllProducts();
  }, []);

  return (
    <AllProductsContext.Provider value={{ allProducts, loading }}>
      {children}
    </AllProductsContext.Provider>
  );
};