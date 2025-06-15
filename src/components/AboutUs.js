
import React from "react";
import { User, Heart, ShoppingBag, Shield } from "lucide-react";

const aboutIcons = [
  { icon: <Heart size={24} className="text-black" />, title: "Verified Sellers", text: "Shop only with authenticated, reviewed stores." },
  { icon: <Shield size={24} className="text-black" />, title: "Secure Marketplace", text: "Safe payments & buyer protection always." },
  { icon: <ShoppingBag size={24} className="text-black" />, title: "Wide Selection", text: "4,000+ items in 30+ trusted categories." },
  { icon: <User size={24} className="text-black" />, title: "Reliable Support", text: "Get quick help from our friendly team." }
];

const AboutUs = () => (
  <section className="container mx-auto px-4 py-8" id="about">
    <h2 className="text-2xl md:text-3xl font-bold mb-3">About Us</h2>
    <div className="max-w-2xl mb-6 text-black/80">
      Shoply is Pakistan’s trusted multi-vendor eCommerce platform for modern, verified, and seamless online shopping. 
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
      {aboutIcons.map((item) => (
        <div className="bg-white border border-neutral-200 rounded-lg px-3 py-4 flex flex-col items-center text-center shadow-sm hover:scale-105 transition-all" key={item.title}>
          <div>{item.icon}</div>
          <div className="font-semibold mt-2">{item.title}</div>
          <div className="text-xs text-black/70 mt-1">{item.text}</div>
        </div>
      ))}
    </div>
    <div className="flex flex-col md:flex-row gap-4">
      <div className="bg-black text-white rounded-xl p-5 flex-1">
        <h3 className="text-xl font-bold mb-2">Our Mission</h3>
        <div>Empower every Pakistani to shop, sell, and trust eCommerce—safely and locally.</div>
      </div>
      <div className="bg-neutral-100 text-black rounded-xl p-5 flex-1">
        <h3 className="text-xl font-bold mb-2">Our Vision</h3>
        <div>Create a verified, innovative marketplace for Pakistan’s future.</div>
      </div>
    </div>
  </section>
);

export default AboutUs;
