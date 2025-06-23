import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

/**
 * Updates fields in a document in the "Products" collection by document ID.
 * @param {string} docId - The ID of the document to update.
 * @param {Object} updatedFields - The fields to update in the document.
 * @returns {Promise<void>}
 */

export async function updateProductFields(docId, updatedFields) {

  const productRef = doc(db, "Products", docId);

  // Update the nested 'productsData' field using dot notation
  const nestedUpdate = {};
  for (const [key, value] of Object.entries(updatedFields)) {
    nestedUpdate[`productsData.${key}`] = value;
  }

  console.log("Updating the following fields in productsData:", nestedUpdate);

  await updateDoc(productRef, nestedUpdate);
}
