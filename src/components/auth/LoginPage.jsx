import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { ArrowLeft } from "lucide-react";
import LoginModeToggle from "./LoginModeToggle";
import SocialLoginButtons from "./SocialLoginButtons";
import AdminLoginForm from "./AdminLoginForm";
import UserLoginForm from "./UserLoginForm";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebaseConfig";
import { collection, query, where, getDocs, doc,getDoc } from "firebase/firestore";
import { handleGoogleSignup } from "../../Firebase Functions/authFunctions";
// import { handleGoogleSignup } from "./SignupSocialButtons";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // Read mode from localStorage on load, default to customer
  const [mode, setMode] = useState(
    () => localStorage.getItem("loginMode") || "customer"
  );
  const [loading, setLoading] = useState(false);
  const [adminError, setAdminError] = useState("");
  const { login } = useAuth();

  useEffect(() => {
    localStorage.setItem("loginMode", mode);
  }, [mode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (mode === "admin") {
      await handleAdminLogin();
    }


    // Proper redirection based on account type
    else if (mode === "seller") {
      try {
        await emailSignIn(formData.email, formData.password);

        navigate("/seller/dashboard");
        setLoading(false);
      } catch (e) {
        console.error("invalid credientials ");
        setLoading(false);
      }
    } else if (mode === "customer") {
      try {
        await emailSignIn(formData.email, formData.password);
        navigate("/user/home");
        setLoading(false);
      } catch (e) {
        console.error("invalid credientials ");
        setLoading(false);
      }
    }
  };

  const emailSignIn = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const docRef = doc(db, "userData", userCredential.user.uid);
   
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      console.error("No such document!");
      setLoading(false);
      return;
    }
    const userData = docSnap.data();
    console.log("User data:", userData.userData);
    login(userData.userData)
  };
  const handleAdminLogin = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "userData"),
        where("userName", "==", formData.adminUsername)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setAdminError("Admin user not found");
        return;
      }

      const userDoc = querySnapshot.docs[0]; // Assuming only one admin
      const userData = userDoc.data();

      if (formData.adminPassword === userData.password) {
        navigate("/admin");
        // proceed to admin panel or set state
      } else {
        setAdminError("Incorrect password");
      }
    } catch (error) {
      console.error("Admin login failed:", error);
      setAdminError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const handleSocialLogin = async () => {
    const userId = await handleGoogleSignup();
    const docRef = doc(db, "userData", userId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      console.error("No such document!");
      return;
    }
    const userData = docSnap.data();
  
    login(userData);
    if (mode === "customer") {
      navigate("/user/home");
      }else{
      navigate("/seller/dashboard");
      }

    // await handleGoogleSignup(setGoogleLoggedIn);
    // console.log("Google logged in:", googleLoggedIn);
    // if (googleLoggedIn) {
    //   if (mode === "seller") {
    //   navigate("/user/home");
    //   }else{
    //   navigate("/seller/dashboard");
    //   }
    // }
    // Implement social login logic
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 sm:space-y-8">
        {/* Mode Toggle Buttons */}
        <LoginModeToggle mode={mode} setMode={setMode} />

        <div className="text-center">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 sm:mb-6 text-sm sm:text-base"
          >
            <ArrowLeft size={18} className="mr-1 sm:mr-2" />
            Back to Home
          </button>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Welcome back
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Sign in to your account
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8">
          {mode === "customer"  && (
            <SocialLoginButtons onSocialLogin={handleSocialLogin} />
          )}

          {mode === "admin" ? (
            <AdminLoginForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              loading={loading}
              adminError={adminError}
            />
          ) : (
            <UserLoginForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              loading={loading}
            />
          )}

          {mode !== "admin" && (
            <p className="mt-6 text-center text-xs sm:text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-black font-semibold hover:underline"
              >
                Sign up here
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
