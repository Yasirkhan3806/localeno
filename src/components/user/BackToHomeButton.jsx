
import React from "react";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

const BackToHomeButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/user/home")}
      className="inline-flex items-center justify-center p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition text-green-700 border border-green-100 shadow"
      aria-label="Back to Home"
      style={{
        position: 'absolute',
        top: 16, // give space from header, adjust as needed
        left: 16,
        zIndex: 30
      }}
    >
      <Home size={22} strokeWidth={2.3} className="text-green-700" />
      <span className="sr-only">Back to Home</span>
    </button>
  );
};

export default BackToHomeButton;
