
import React from "react";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

const BackToHomeButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/user/home")}
      className="flex items-center gap-2 px-4 py-2 mb-4 rounded-lg bg-gray-100 text-black hover:bg-gray-200 transition font-medium"
      aria-label="Back to Home"
      style={{ width: 'fit-content' }}
    >
      <Home size={18} />
      Back to Home
    </button>
  );
};

export default BackToHomeButton;
