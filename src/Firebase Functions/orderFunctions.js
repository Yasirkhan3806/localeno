import { getFirestore, collection, addDoc,query,where,getDocs } from "firebase/firestore"; 
import {auth, db} from '../config/firebaseConfig'

export async function addOrder(orderData) {
    console.log('Adding order:', orderData);
    
    if (!orderData || Object.keys(orderData).length === 0) {
        return { success: false, error: "Order data is required" };
    }
    
    try {
        const docRef = await addDoc(collection(db, "orders"), {
            ...orderData,
            createdAt: new Date().toISOString()
        });
        
        console.log('Order added successfully with ID:', docRef.id);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error adding order:', error);
        return { success: false, error: error.message };
    }
}

export async function getOrdersByUser() {
    const userId = auth?.currentUser?.uid

    try {
        const ordersCol = collection(db, "orders");
        const q = query(ordersCol, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        const orders = [];
        querySnapshot.forEach((doc) => {
            orders.push({ id: doc.id, ...doc.data() });
        });

        return { success: true, orders };
    } catch (error) {
        console.error('Error fetching orders:', error);
        return { success: false, error: error.message };
    }
}