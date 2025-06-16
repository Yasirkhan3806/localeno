
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

const Logo = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2 text-2xl font-bold">
      <button
        onClick={() => navigate('/')}
        className="flex flex-col items-center bg-gradient-to-r from-black via-gray-800 to-black text-white px-4 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        aria-label="Go to home"
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="font-bold text-xl tracking-wider">LOCALENA</span>
          <ShoppingCart size={20} className="text-green-400" />
        </div>
        <span className="text-xs text-gray-300 font-medium tracking-wide">Local • Global • Digital</span>
      </button>
    </div>
  );
};

export default Logo;
