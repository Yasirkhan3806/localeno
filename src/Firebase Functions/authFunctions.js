import { auth,db,googleProvider } from "../config/firebaseConfig";
import { doc,getDoc,setDoc,collection,where,query,getDocs } from "firebase/firestore";
import { signInWithPopup } from "firebase/auth";
    
    export const handleGoogleSignup = async() => {
        try {
      const result = await signInWithPopup(auth, googleProvider);
      const userId = result.user.uid;


      // Check if user document exists in Firestore, create if not
      const userDocRef = doc(db, "userData", userId);
      const userDoc = await getDoc(userDocRef);
      const user = {
        userId,
      userData: {
        email: result.user.email,
        userName: result.user.displayName || "",
        profilePicture: result.user.photoURL,
        accountCreated: new Date(),
        status: "active",
        accountType: "customer"
      }
      }
      if (!userDoc.exists()) {
        await setDoc(userDocRef, user);
        console.log("User document created:", result.user.displayName);
      
      } else {
        console.log("User already exists:", userDoc.data());
      }
      return userId;
    } catch (error) {
      console.error("Google sign-in failed:", error.message);
    }
  };

  import { updateDoc } from "firebase/firestore";

export const updateCurrentUserData = async (data) => {
  try {
    const user = auth?.currentUser;
    if (!user) throw new Error("No authenticated user found.");
    const userDocRef = doc(db, "userData", user?.uid);
    await updateDoc(userDocRef, data); // 💡 will fail if any field in `data` doesn't exist
    console.log("User data updated for:", user.uid);
    return true;
  } catch (error) {
    console.error("Failed to update user data:", error.message);
    return false;
  }
};

export async function fetchAdminUserRef() {
    try {
      const usersCol = collection(db, "userData");
      const q = query(usersCol, where("userName", "==", "localenoadmin"));
      const userSnapshot = await getDocs(q);
      
      if (!userSnapshot.empty) {
        console.log(userSnapshot.docs[0].id)
        return userSnapshot.docs[0].id; // Return document reference
      }
      throw new Error("Admin user not found");
    } catch (error) {
      console.error("Error fetching admin user:", error);
      throw error;
    }
  }


export const updateAdminPass = async (currPass, newPass) => {
  try {
    // Input validation
    if (!currPass || !newPass) {
      throw new Error("Both current and new passwords are required");
    }


    // Get admin user ID
    const adminId = await fetchAdminUserRef();
    
    if (!adminId) {
      throw new Error("Admin user not found");
    }

    // Create document reference using the ID
    const docRef = doc(db, "userData", adminId);
    
    // Get current admin document
    const adminDoc = await getDoc(docRef);
    
    if (!adminDoc.exists()) {
      throw new Error("Admin document does not exist");
    }

    const adminData = adminDoc.data();
    
    // Verify current password
    if (adminData.password !== currPass) {
      throw new Error("Current password is incorrect");
    }

    // Update only the password field (don't overwrite other data)
    await updateDoc(docRef, {
      password: newPass,
      updatedAt: new Date().toISOString() // Track when password was changed
    });

    console.log("Password updated successfully for admin:", adminId);
    return { success: true, message: "Password updated successfully" };

  } catch (error) {
    console.error("Error updating password:", error.message);
    
    // Return error instead of just logging
    return { 
      success: false, 
      message: error.message || "Failed to update password" 
    };
  }
};
