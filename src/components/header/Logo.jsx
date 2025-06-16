import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
const Logo = () => {
  const navigate = useNavigate();
  return <div className="flex items-center gap-2 text-2xl font-bold">
      <button onClick={() => navigate('/')} aria-label="Go to home" className="flex flex-col items-center bg-gradient-to-r from-black via-gray-800 to-black text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 my-[27px] mx-0 py-[4px] px-[18px] rounded">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-bold text-xl tracking-wider">LOCALENA</span>
          
        </div>
        
      </button>
    </div>;
};
export default Logo;