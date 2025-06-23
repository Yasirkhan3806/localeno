
import React from "react";
import { auth,db,googleProvider } from "../../config/firebaseConfig.js";
import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const SignupSocialButtons = ({handleGoogleLogin}) =>{


  return (
  <div className="space-y-3 mb-6">
    <button
      onClick={() => handleGoogleLogin()}
      className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-colors"
    >
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" className="w-5 h-5 mr-3" />
      Continue with Google
    </button>

  </div>
);
}

export default SignupSocialButtons;
