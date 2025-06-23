import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { ArrowLeft } from "lucide-react";
import SignupForm from "./SignupForm";
import { auth, db } from "../../config/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { handleGoogleSignup } from "../../Firebase Functions/authFunctions";

const SignupPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [mode, setMode] = React.useState("customer");
  const { login } = useAuth();

  const handleSubmit = async (formData, resetForm) => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    const userData = {
      dateCreated: Date.now().toString(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      accountType: formData.accountType,
      dateOfBirth: formData.dateOfBirth,
      phone: formData.phone,

      avatar: "",
      status: "active",
      accountCreated: new Date().toISOString(),
      sellerInfo:
        formData.accountType === "seller"
          ? {
              dailyOrderVolume: formData.dailyOrderVolume,
              businessOpenTime: formData.businessOpenTime,
              businessCloseTime: formData.businessCloseTime,
              totalSales: 0,
              totalProducts: 0,
              address :formData.address,
              shopName : formData.shopName,
            }
          : null,
    };

    try {
      setMode(formData.accountType);
      await handleEmailSignIn(userData, formData.password); // Await it properly here
      login(userData); // Assuming login function is available in AuthContext
      if (formData.accountType === "seller") {
         navigate("/seller/dashboard");
      } else if (formData.accountType === "customer") {
       
        navigate("/user/home");
      }

      if (typeof resetForm === "function") resetForm({});
    } catch (error) {
      console.error("Sign-in failed:", error.message);
      alert("Sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignIn = async (userData, password) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        password
      ); // <- FIXED
      const userId = userCredential.user.uid;

      // Save userData to Firestore
      const userDocRef = doc(db, "userData", userId);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          userId,
          userData,
        });
        console.log("User document created for:", userCredential.user.email);
      } else {
        console.log("User already exists:", userDoc.data());
      }
    } catch (error) {
      console.error("Error signing up:", error);
      throw error; // rethrow so handleSubmit can catch it
    }
  };

  const handleGoogleLogin = async () => {
    // This function can be used to handle Google login if needed
    const userId = await handleGoogleSignup();
    const docRef = doc(db, "userData", userId);
    const docSnap = await getDoc(docRef);
    
      const userData = docSnap.data();
      login(userData); // Assuming login function is available in AuthContext

    if (mode === "seller") {
      navigate("/seller/dashboard");
    } else if (mode === "customer") {
      navigate("/user/home");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl sm:max-w-2xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 sm:mb-6 text-sm sm:text-base"
          >
            <ArrowLeft size={18} className="mr-1 sm:mr-2" />
            Back to Home
          </button>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Join our marketplace today
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 lg:p-8">
          <SignupForm
            onSubmit={handleSubmit}
            loading={loading}
            handleGoogleLogin={handleGoogleLogin}
          />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
