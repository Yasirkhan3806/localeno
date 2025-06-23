import { db } from "../config/firebaseConfig";
import { collection, addDoc, doc } from "firebase/firestore";

export const addProducts = async (formData, sellerId) => {
    console.log(formData)
    console.log(sellerId)
  const sellerRef = doc(db, "userData", sellerId);
  const details = {
    productsData: formData,
    sellerRef
  };

  try {
    await addDoc(collection(db, "Products"), details);
  } catch (e) {
    console.error("Failed to add product:", e);
  }
};
