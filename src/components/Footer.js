
import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => (
  <footer className="bg-neutral-100 text-black py-6 border-t border-neutral-200 mt-10">
    <div className="container mx-auto px-4 flex flex-col md:flex-row gap-6 md:gap-0 justify-between items-center">
      <div className="flex flex-col md:flex-row gap-3 md:gap-6 items-center">
        <a href="#" className="hover:underline">Privacy Policy</a>
        <a href="#" className="hover:underline">Terms of Service</a>
        <a href="#" className="hover:underline">FAQ</a>
      </div>
      <form className="flex gap-2 items-center mt-3 md:mt-0">
        <input
          type="email"
          className="px-3 py-1.5 rounded-l-lg border border-neutral-300 focus:outline-none text-[15px]"
          style={{ minWidth: 190 }}
          placeholder="Join our newsletter"
        />
        <button
          className="px-3 py-1.5 rounded-r-lg bg-black text-white font-semibold hover:bg-neutral-800 hover:scale-105 transition-all"
          type="submit"
        >
          Subscribe
        </button>
      </form>
      <div className="flex gap-2 items-center mt-3 md:mt-0">
        <a href="#" className="rounded-full p-1.5 bg-black hover:scale-110 transition-all">
          <Facebook size={16} className="text-white" />
        </a>
        <a href="#" className="rounded-full p-1.5 bg-black hover:scale-110 transition-all">
          <Instagram size={16} className="text-white" />
        </a>
        <a href="#" className="rounded-full p-1.5 bg-black hover:scale-110 transition-all">
          <Twitter size={16} className="text-white" />
        </a>
      </div>
    </div>
    <div className="text-center text-xs text-black/50 mt-2">
      &copy; 2025 Shoply. Powered by Lovable AI.
    </div>
  </footer>
);

export default Footer;
