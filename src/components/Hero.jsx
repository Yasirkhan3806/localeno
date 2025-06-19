
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Shield, ArrowRight } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/products");
  };

  const handleVerifyIdentity = () => {
    navigate("/verify-identity");
  };

  return (
    <section className="relative w-full mx-auto max-w-7xl h-[500px] sm:h-[600px] lg:h-[700px] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Background Image - Beautiful aesthetic home showcase */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80"
          alt="Beautiful aesthetic home decor and furniture showcase"
          className="object-cover w-full h-full"
          draggable="false"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-center">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
              Rent or Buy Local Products with Confidence
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 mb-8 leading-relaxed max-w-4xl mx-auto">
              Discover verified sellers, secure transactions, and authentic products in Pakistan's most trusted marketplace
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                onClick={handleGetStarted}
                size="lg"
                className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold px-8 py-4 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center gap-2"
              >
                Get Started
                <ArrowRight size={20} />
              </Button>
              <Button
                onClick={handleVerifyIdentity}
                variant="outline"
                size="lg"
                className="border-0 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 font-semibold px-8 py-4 rounded-2xl text-lg transition-all duration-300 flex items-center gap-2"
              >
                <Shield size={20} />
                Verify Identity to Build Trust
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
