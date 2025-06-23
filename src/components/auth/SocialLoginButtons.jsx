
import React from 'react';

const SocialLoginButtons = ({ onSocialLogin }) => {
  return (
    <>
      <div className="space-y-3 mb-6">
        <button
          onClick={() => onSocialLogin()}
          className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-colors"
        >
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" className="w-5 h-5 mr-3" />
          Continue with Google
        </button>

      </div>
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with email</span>
        </div>
      </div>
    </>
  );
};

export default SocialLoginButtons;
