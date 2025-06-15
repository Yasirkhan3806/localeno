
import React from "react";

const ProductDetailModal = ({ product, open, onClose }) => {
  if (!open || !product) return null;
  return (
    <div className="fixed inset-0 z-[120] bg-black/30 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg max-w-xl w-full p-8 relative animate-fade-in">
        <button onClick={onClose} className="absolute right-3 top-3 bg-gray-100 hover:bg-gray-200 rounded-full p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
        <div className="flex gap-8">
          <img src={product.image} alt={product.name} className="h-36 w-36 object-cover rounded-lg border flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-2xl mb-2">{product.name}</h2>
            <div className="mb-2 text-gray-700">{product.category}</div>
            <div className="mb-4 text-lg font-semibold text-primary">${product.price}</div>
            <div className="mb-2">Stock: <b>{product.stock}</b></div>
            <div className="mb-2">Status: <span className="px-2 py-1 text-xs rounded bg-gray-100">{product.status}</span></div>
            <div>Description: <span className="text-gray-700">A beautiful {product.category.toLowerCase()} product for your store.</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
