import { collection, query, where, getDocs, addDoc, setDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db,auth } from "../config/firebaseConfig";

/**
 * Stores a review object into the 'reviews' collection in Firestore.
 * If a document exists for the productId, adds the review to the existing reviews array.
 * If no document exists, creates a new document with the review in a reviews array.
 * @param {Object} review - The review data to store.
 * @param {string} id - The product ID.
 * @returns {Promise<string>} - The document ID of the stored review.
 */
export async function addReviewToFirestore(review, id) {
  try {
    // Query to check if a doc already exists for this productId
    const q = query(collection(db, "reviews"), where("productId", "==", id));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Document exists, add the new review to the existing reviews array
      const existingDocRef = querySnapshot.docs[0].ref;
      await updateDoc(existingDocRef, {
        reviews: arrayUnion(review)
      });
      return existingDocRef.id;
    } else {
      // No document found, create a new one with the review in an array
      const newDoc = {
        productId: id,
        reviews: [review]
      };
      const docRef = await addDoc(collection(db, "reviews"), newDoc);
      return docRef.id;
    }
  } catch (error) {
    console.error("Error saving review: ", error);
    throw error;
  }
}


/**
 * Fetches all reviews and returns them grouped by user
 * @returns {Promise<Object>} - Object with user UIDs as keys and their reviews as values
 */
export async function fetchCurrentUserReviews() {
  try {
    // if (!auth?.currentUser?.uid) {
    //   throw new Error("User not authenticated");
    // }

    const querySnapshot = await getDocs(collection(db, 'reviews'));
    const currentUserReviews = [];

    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();

      if (Array.isArray(data.reviews)) {
        data.reviews.forEach((review) => {
          const uid = review?.userRef?.path?.split('/')?.[1];


          if (uid === auth?.currentUser?.uid) {
            currentUserReviews.push({
              ...review,
              docId: docSnap.id,
              productId: data.productId,
            });
          }
        });
      }
    });

    console.log(currentUserReviews);
    return currentUserReviews;

  } catch (error) {
    console.error('Error fetching current user reviews:', error);
    throw error;
  }
}



