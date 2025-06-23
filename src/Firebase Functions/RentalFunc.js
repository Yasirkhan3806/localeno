import { getFirestore, collection, addDoc } from "firebase/firestore";
import { db,auth } from "../config/firebaseConfig";
import { 
  query, 
  where, 
  getDocs, 
  doc, 
  setDoc, 
  updateDoc ,
  getDoc
} from "firebase/firestore";

/**
 * Adds rental details to the 'rentals' collection in Firestore.
 * @param {Object} rentalDetails - The rental details to add.
 * @returns {Promise<string>} - The document ID of the new rental.
 */
export async function addRental(rentalDetails) {
    try {
        const docRef = await addDoc(collection(db, "rentals"), rentalDetails);
        return {success:true,id:docRef.id};
    } catch (error) {
        console.error("Error adding rental: ", error);
        throw error;
    }
}

/**
 * Retrieves all rentals for the current user from the 'rentals' collection.
 * @param {string} userId - The user ID to match.
 * @returns {Promise<Array>} - Array of rental documents.
 */

export async function getRentalsByUser() {
    const userId = auth?.currentUser?.uid
    try {
        const rentalsQuery = query(
            collection(db, "rentals"),
            where("userId", "==", userId)
        );
        const querySnapshot = await getDocs(rentalsQuery);
        const rentals = [];
        querySnapshot.forEach((doc) => {
            rentals.push({ rentalId: doc.id, ...doc.data() });
        });
        // console.log(rentals)
        return rentals;
    } catch (error) {
        console.error("Error fetching rentals: ", error);
        throw error;
    }
}

/**
  * @param {string} id - The id field to match in the documents.
 * @param {Object} updates - The fields to update.
 * @returns {Promise<boolean>} - True if a document was updated, false otherwise.
 */
export async function updateRentalById(id, updates) {
    try {
        if (!id || typeof id !== 'string') {
            throw new Error('Invalid id: must be a non-empty string');
        }
        
        if (!updates || typeof updates !== 'object') {
            throw new Error('Invalid updates: must be an object');
        }

        const rentalsRef = collection(db, "rentals");
        const rentalsQuery = query(rentalsRef, where("id", "==", id));
        const querySnapshot = await getDocs(rentalsQuery);

        if (querySnapshot.empty) {
            console.log(`No rental found with id: ${id}`);
            return false;
        }

        // Update all documents with matching id field
        const promises = [];
        querySnapshot.forEach((docSnap) => {
            const docRef = doc(db, "rentals", docSnap.id);
            promises.push(updateDoc(docRef, updates));
        });

        await Promise.all(promises);
        console.log(`Successfully updated ${querySnapshot.size} rental(s) with id: ${id}`);
        return true;
        
    } catch (error) {
        console.error("Error updating rental: ", error);
        throw error;
    }
}


/**
 * Updates or creates the 'returned' field for a rental document
 * @param {string} rentalId - The ID of the rental document
 * @param {string} collectionName - Name of the collection (default: 'rentals')
 * @returns {Promise<boolean>} - Returns true if successful, false if document not found
 */
export async function updateRentalReturned(rentalId) {
  try {
    console.log(rentalId)
    // Reference to the document
    const docRef = doc(db, 'rentals', rentalId);
    
    // Check if document exists
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      // Document exists, update the returned field
      await updateDoc(docRef, {
        
        status: 'returned',
        returnDate: new Date() // Optional: add timestamp
      });
      
      console.log(`Rental ${rentalId} marked as returned`);
      return true;
    } else {
      console.log(`Document with rental ID ${rentalId} not found`);
      return false;
    }
  } catch (error) {
    console.error('Error updating rental:', error);
    throw error;
  }
}

export async function updateRentalActive(rentalId) {
  try {
    console.log(rentalId)
    // Reference to the document
    const docRef = doc(db, 'rentals', rentalId);
    
    // Check if document exists
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      // Document exists, update the returned field
      const now = new Date();
      const endDate = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000); // 5 days from now

      await updateDoc(docRef, {
        status: 'active',
        startDate: now, // Optional: add timestamp
        endDate: endDate
      });
      
      console.log(`Rental ${rentalId} marked as returned`);
      return true;
    } else {
      console.log(`Document with rental ID ${rentalId} not found`);
      return false;
    }
  } catch (error) {
    console.error('Error updating rental:', error);
    throw error;
  }
}

