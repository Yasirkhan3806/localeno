
import React from "react";

const SignupSocialButtons = ({ onSocialSignup }) => (
  <div className="space-y-3 mb-6">
    <button
      onClick={() => onSocialSignup("google")}
      className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-colors"
    >
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" className="w-5 h-5 mr-3" />
      Continue with Google
    </button>
    <button
      onClick={() => onSocialSignup("facebook")}
      className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-colors"
    >
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg" alt="Facebook" className="w-5 h-5 mr-3" />
      Continue with Facebook
    </button>
  </div>
);

export default SignupSocialButtons;
