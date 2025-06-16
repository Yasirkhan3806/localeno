
import React from 'react';
import { Shield } from 'lucide-react';

const ProductsHero = () => {
  return (
    <section className="relative py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80" 
          alt="Products Background" 
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      <div className="relative container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Discover Amazing Products
        </h1>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Browse through our curated collection of quality products from trusted local sellers
        </p>
        
        {/* Trust Badge */}
        <div className="group inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full text-white hover:bg-white/20 transition-all duration-300 cursor-pointer">
          <Shield size={20} className="text-green-400" />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Verified Identity Required - Build Trust
          </span>
          <span className="group-hover:opacity-0 transition-opacity duration-300">
            Verify Identity to Build Trust
          </span>
        </div>
      </div>
    </section>
  );
};

export default ProductsHero;
