
import React from "react";
import { ArrowLeft, Box } from "lucide-react";

const AdminProductDetail = ({ product, onBack }) => {
  if (!product) return null;

  return (
    <div className="w-full max-w-2xl mx-auto mt-6 animate-fade-in">
      <button
        onClick={onBack}
        className="flex items-center gap-2 bg-transparent text-gray-500 hover:text-black font-medium mb-4"
      >
        <ArrowLeft size={20} /> Back to Products
      </button>
      <div className="bg-white rounded-2xl p-7 shadow-md border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
          <img src={product.image} alt={product.name} className="w-28 h-28 rounded-xl border object-cover mb-3 md:mb-0" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{product.name}</h1>
            <div className="flex items-center gap-2">
              <Box size={18} className="text-gray-400" />
              <span className="text-gray-700">{product.category}</span>
            </div>
            <div className="text-gray-500 text-sm mt-2">Product ID: {product.id}</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-3">
          <div>
            <div className="text-xs text-gray-500">Price</div>
            <div className="text-gray-800 font-semibold">${product.price.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Stock</div>
            <div className="text-gray-800 font-semibold">{product.stock}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Status</div>
            <div className={`rounded-full px-3 py-1 text-sm font-semibold ${product.status === "Active" ? "bg-green-100 text-green-800" : product.status === "Low Stock" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-500"}`}>
              {product.status}
            </div>
          </div>
        </div>
        {/* You can add more product info here if needed */}
      </div>
    </div>
  );
};

export default AdminProductDetail;
