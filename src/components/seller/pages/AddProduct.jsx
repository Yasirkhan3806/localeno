
import React, { useRef, useState } from "react";

export default function SellerAddProduct() {
  const [images, setImages] = useState([]);
  const fileRef = useRef();

  function handleImageChange(e) {
    const files = Array.from(e.target.files);
    setImages(files.map(file => URL.createObjectURL(file)));
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-4 xs:p-6 sm:p-8 rounded-2xl shadow mt-6 animate-fade-in">
      <h2 className="font-bold text-2xl text-gray-900 mb-6">Add New Product</h2>
      <form className="space-y-6">
        {/* Product Title & Category */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-gray-700 mb-1 font-medium">Product Title <span className="text-red-500">*</span></label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-black outline-none text-base"
              required
              type="text"
              placeholder="Enter product title"
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 mb-1 font-medium">Category <span className="text-red-500">*</span></label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-base focus:ring-2 focus:ring-black outline-none"
              required
              defaultValue=""
            >
              <option value="" disabled>Select a category</option>
              <option>Furniture</option>
              <option>Handicrafts</option>
              <option>Clothing & Accessories</option>
              <option>Home Decor</option>
              <option>Health & Beauty</option>
              {/* More options as needed */}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">Description <span className="text-red-500">*</span></label>
          <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-black outline-none min-h-[110px] text-base" rows={4} placeholder="Describe your product in detail" />
        </div>

        {/* Price, Quantity, Rent Option */}
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1">
            <label className="block text-gray-700 mb-1 font-medium">Sale Price ($) <span className="text-red-500">*</span></label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-black outline-none text-base"
              min={0}
              placeholder="0.00"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 mb-1 font-medium">Quantity Available <span className="text-red-500">*</span></label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-black outline-none text-base"
              min={1}
              placeholder="1"
              required
            />
          </div>
          <div className="flex items-center mb-2 sm:mb-0 ml-0 sm:ml-2">
            <input id="forRent" type="checkbox" className="accent-black scale-125 mr-2" />
            <label htmlFor="forRent" className="text-gray-700 select-none text-base">Available for Rent</label>
          </div>
        </div>

        {/* Images */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">Product Images <span className="text-xs text-gray-500">(Max 10)</span></label>
          <div
            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50 rounded-xl min-h-[128px] p-4 transition hover:bg-gray-100 relative cursor-pointer"
            onClick={() => fileRef.current && fileRef.current.click()}
            tabIndex={0}
            role="button"
            aria-label="Upload images"
          >
            {/* Upload/drag area */}
            {images.length === 0 ? (
              <div className="flex flex-col items-center text-gray-400">
                <svg width={40} height={40} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" d="M12 16V4m0 0-4 4m4-4 4 4m-7 6v4m0 0h10m-10 0a5 5 0 0 1 10 0v4"></path></svg>
                <span className="mt-2 text-gray-500 font-medium">Click to upload or drag and drop</span>
                <span className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 10MB</span>
              </div>
            ) : (
              <div className="flex gap-3 flex-wrap">
                {images.map((img, i) => (
                  <img key={i} src={img} alt="Preview" className="w-20 h-20 rounded object-cover border" />
                ))}
              </div>
            )}
            <input
              type="file"
              multiple accept="image/*"
              ref={fileRef}
              className="w-full hidden"
              onChange={handleImageChange}
              max={10}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-4 py-2 bg-white text-black border border-black rounded-xl font-semibold hover:bg-gray-100 transition text-base"
          >
            <svg width={20} height={20} stroke="currentColor" fill="none" viewBox="0 0 24 24"><path strokeWidth="2" d="M15 12H9m3-3v6m9 0a9 9 0 1 1-18 0a9 9 0 0 1 18 0Z"></path></svg>
            Show Preview
          </button>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 px-7 py-2 bg-black text-white rounded-xl font-semibold hover:bg-gray-900 hover:scale-105 transition text-base"
          >
            + Add Product
          </button>
        </div>
      </form>
    </div>
  );
}
