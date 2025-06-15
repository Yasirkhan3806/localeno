
import React, { useRef, useState } from "react";
export default function SellerAddProduct() {
  const [images, setImages] = useState([]);
  const fileRef = useRef();

  function handleImageChange(e) {
    const files = Array.from(e.target.files);
    setImages(files.map(file => URL.createObjectURL(file)));
  }

  return (
    <div className="w-full max-w-lg mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="font-bold text-xl text-gray-900 mb-4">Add Product</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Product Name</label>
          <input className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-black outline-none" required />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Description</label>
          <textarea className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-black outline-none" rows={3} />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Images</label>
          <input
            type="file"
            multiple accept="image/*"
            ref={fileRef}
            className="w-full"
            onChange={handleImageChange}
          />
          <div className="flex gap-3 mt-2">
            {images.map((img, i) => (
              <img key={i} src={img} alt="Preview" className="w-16 h-16 rounded object-cover border" />
            ))}
          </div>
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Category</label>
          <input className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-black outline-none" />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Price</label>
          <input type="number" className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-black outline-none" />
        </div>
        <div className="flex items-center gap-2">
          <input id="forRent" type="checkbox" className="accent-black scale-125" />
          <label htmlFor="forRent" className="text-gray-700 select-none">Available for Rent</label>
        </div>
        <button
          type="submit"
          className="w-full mt-4 bg-black text-white rounded-xl py-2 font-semibold hover:bg-gray-900 transition transform hover:scale-105"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
