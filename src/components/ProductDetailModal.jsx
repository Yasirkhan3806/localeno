
import React from "react";
import { X, User, Heart } from "lucide-react";

// Sample product data fallback 
const sampleProduct = {
  name: "Bluetooth Speaker",
  images: [
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=400&q=80"
  ],
  price: "PKR 7,350",
  description: "A powerful portable speaker with deep bass, Bluetooth 5.0, 12hr battery.",
  seller: "TechStore",
  verified: true,
  availability: "In Stock",
};

const ProductDetailModal = ({ product = sampleProduct, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fade-in">
      <div className="relative bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 mx-2 animate-scale-in overflow-y-auto max-h-[90vh]">
        <button
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-100 transition-all"
          onClick={onClose}
        >
          <X size={22} />
        </button>
        {/* Images Carousel (mocked, 2-3 images only) */}
        <div className="flex gap-2 justify-center mb-4">
          {product.images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Product view ${i + 1}`}
              className="w-24 h-24 object-cover rounded-xl border border-neutral-200"
              draggable="false"
            />
          ))}
        </div>
        <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
        <div className="text-black text-xl font-semibold mb-2">{product.price}</div>
        <div className="mb-2 text-base text-black/80">{product.description}</div>
        <div className="mb-2 text-sm">Availability: <span className="font-semibold">{product.availability}</span></div>
        <div className="mb-2 text-sm">Seller: <a href="#" className="underline hover:text-neutral-700 font-semibold">{product.seller}</a></div>
        <div className="flex gap-3 my-3">
          <button className="rounded-lg bg-black text-white px-4 py-2 font-semibold hover:scale-105 hover:bg-neutral-800 focus:ring-2 focus:ring-neutral-400 transition-all">
            Add to Cart
          </button>
          <button className="rounded-lg border border-neutral-200 text-black bg-white px-4 py-2 font-semibold hover:scale-105 hover:bg-neutral-100 focus:ring-2 focus:ring-neutral-300 transition-all">
            <Heart size={16} className="inline -mt-1 mr-1" />
            Add to Wishlist
          </button>
        </div>
        {/* Reviews (sample UI, verified only) */}
        <div className="border-t pt-4 mt-4">
          <h4 className="font-semibold mb-3 text-lg">Customer Reviews (Verified)</h4>
          <div className="flex flex-col gap-3 max-h-40 overflow-y-auto pr-1">
            <div className="flex items-start gap-2">
              <User size={28} className="text-neutral-400" />
              <div>
                <div className="font-bold text-black">Zara S. <span className="text-xs text-green-600 ml-1">Verified</span></div>
                <div className="text-sm">Love this speaker! The sound is surprisingly loud for the size.</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <User size={28} className="text-neutral-400" />
              <div>
                <div className="font-bold text-black">Ahmed R. <span className="text-xs text-green-600 ml-1">Verified</span></div>
                <div className="text-sm">Battery lasts all day, and very portable. Highly recommended.</div>
              </div>
            </div>
          </div>
          {/* Review input UI (mocked, no upload) */}
          <form className="pt-3 flex flex-col gap-2">
            <label className="font-medium">Leave a review</label>
            <textarea className="border rounded-lg px-3 py-2 min-h-[40px]" placeholder="Share your experience…"></textarea>
            <div className="flex items-center gap-2">
              <input type="file" className="block text-xs" />
              <button type="button" className="ml-auto px-3 py-1.5 rounded-lg bg-neutral-200 hover:bg-neutral-300 text-black font-semibold text-sm hover:scale-105 transition-all">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ProductDetailModal;
