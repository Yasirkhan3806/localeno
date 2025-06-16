
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, Shield, Users, Star, ArrowRight } from "lucide-react";

// Updated images for marketplace with local Pakistan context - 5 categories
const images = [
  {
    src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
    title: "Beautiful Home Decor Collection",
    subtitle: "Transform your living space with our curated selection of home decor items from verified local sellers in Pakistan",
    cta: "Explore Home Decor",
    secondaryCta: "Verify Identity to Build Trust"
  },
  {
    src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
    title: "Premium Furniture Collection",
    subtitle: "Discover handcrafted and modern furniture pieces made by skilled artisans across Pakistan",
    cta: "Browse Furniture",
    secondaryCta: "Verify Identity to Build Trust"
  },
  {
    src: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80",
    title: "Trendy Clothing & Accessories",
    subtitle: "Express your unique style with our fashion-forward clothing and accessories from local designers",
    cta: "Shop Fashion",
    secondaryCta: "Verify Identity to Build Trust"
  },
  {
    src: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=80",
    title: "Health & Beauty Essentials",
    subtitle: "Premium health and beauty products to help you look and feel your absolute best every day",
    cta: "Discover Beauty",
    secondaryCta: "Verify Identity to Build Trust"
  },
  {
    src: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1200&q=80",
    title: "Authentic Handicrafts",
    subtitle: "Celebrate Pakistani culture with beautiful handmade crafts and traditional artwork from local artisans",
    cta: "Explore Handicrafts",
    secondaryCta: "Verify Identity to Build Trust"
  }
];

function HeroCarousel() {
  const [curr, setCurr] = useState(0);
  const navigate = useNavigate();

  const goto = (i) => setCurr(i);
  const next = () => setCurr((curr + 1) % images.length);
  const prev = () => setCurr((curr - 1 + images.length) % images.length);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [curr]);

  const handleGetStarted = () => {
    // Navigate to products page to start browsing
    navigate("/products");
  };

  const handleVerifyIdentity = () => {
    // Navigate to signup/login page for identity verification
    navigate("/signup");
  };

  return (
    <section className="relative w-full mx-auto max-w-7xl h-[500px] sm:h-[600px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {images.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
            i === curr ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={img.src}
              alt={img.title}
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
                  {img.title}
                </h1>

                {/* Subtitle */}
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 mb-8 leading-relaxed max-w-4xl mx-auto">
                  {img.subtitle}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                  <Button
                    onClick={handleGetStarted}
                    size="lg"
                    className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold px-8 py-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center gap-2"
                  >
                    {img.cta}
                    <ArrowRight size={20} />
                  </Button>
                  <Button
                    onClick={handleVerifyIdentity}
                    variant="outline"
                    size="lg"
                    className="border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 flex items-center gap-2 group relative overflow-hidden"
                  >
                    <Shield size={20} />
                    <span className="transition-opacity duration-300 group-hover:opacity-0">
                      {img.secondaryCta}
                    </span>
                    <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Start Your Journey Today
                    </span>
                  </Button>
                </div>

                {/* Statistics Section */}
                <div className="flex flex-col sm:flex-row gap-8 justify-center items-center text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                      <Shield size={24} className="text-black" />
                    </div>
                    <div className="text-left">
                      <div className="text-2xl sm:text-3xl font-bold text-yellow-500">100%</div>
                      <div className="text-sm sm:text-base text-gray-300">Verified Sellers</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                      <Users size={24} className="text-black" />
                    </div>
                    <div className="text-left">
                      <div className="text-2xl sm:text-3xl font-bold text-yellow-500">50K+</div>
                      <div className="text-sm sm:text-base text-gray-300">Happy Customers</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                      <Star size={24} className="text-black" />
                    </div>
                    <div className="text-left">
                      <div className="text-2xl sm:text-3xl font-bold text-yellow-500">4.9</div>
                      <div className="text-sm sm:text-base text-gray-300">Average Rating</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full text-white shadow-lg hover:bg-white/30 focus:outline-none transition-all duration-300 flex items-center justify-center group"
            onClick={prev}
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} className="group-hover:scale-110 transition-transform" />
          </button>
          <button
            className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full text-white shadow-lg hover:bg-white/30 focus:outline-none transition-all duration-300 flex items-center justify-center group"
            onClick={next}
            aria-label="Next slide"
          >
            <ChevronRight size={24} className="group-hover:scale-110 transition-transform" />
          </button>
        </div>
      ))}

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {images.map((_, j) => (
          <button
            key={j}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              curr === j
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${j + 1}`}
            onClick={() => goto(j)}
          ></button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div 
          className="h-full bg-white transition-all duration-300 ease-linear"
          style={{ width: `${((curr + 1) / images.length) * 100}%` }}
        ></div>
      </div>
    </section>
  );
}

export default HeroCarousel;
