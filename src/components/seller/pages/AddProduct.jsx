import React, { useRef, useState } from "react";
import { useCategories } from "../../../contexts/ProductsContext";
import { addProducts } from "../../../Firebase Functions/addProducts";
import { auth } from "../../../config/firebaseConfig";

export default function SellerAddProduct() {
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [forRent, setForRent] = useState(false);
  const [rentPrice,setRentPrice] = useState(0)
  const [error, setError] = useState("");

  const fileRef = useRef();
  const { categories } = useCategories();

  async function uploadImageToCloudinary(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "localeno_unsigned");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dwheinvov/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url;
  }

  function handleImageChange(e) {
    const filesArr = Array.from(e.target.files).slice(0, 10);
    setImages(filesArr.map(file => URL.createObjectURL(file)));
    setFiles(filesArr);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const imageUrls = await Promise.all(files.map(uploadImageToCloudinary));

      const formData = {
        name:title,
        category,
        description,
        price,
        stock : quantity,
        forRent,
        rentPrice,
        dateAdded : new Date().toLocaleDateString(),
        images: imageUrls,
        status: 'Active'
      };

      await addProducts(formData, auth.currentUser.uid);
      setTitle("");
setCategory("");
setDescription("");
setPrice("");
setQuantity(1);
setForRent(false);
setFiles([]);
setImages([]);


    } catch (e) {
      setError(e.message || "Failed to add product. Please try again.");
      console.log(e.message);
    }
  }


  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-4 xs:p-6 sm:p-8 rounded-2xl shadow mt-6 animate-fade-in">
      
      <h2 className="font-bold text-2xl text-gray-900 mb-6">Add New Product</h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Product Title & Category */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-gray-700 mb-1 font-medium">Product Title <span className="text-red-500">*</span></label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-black outline-none text-base"
              required
              type="text"
              placeholder="Enter product title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 mb-1 font-medium">Category <span className="text-red-500">*</span></label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-base focus:ring-2 focus:ring-black outline-none"
              required
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option value="" disabled>Select a category</option>
              {categories && categories.map(cat => (
                <option key={cat.category} value={cat.category}>
                  {cat.category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 mb-1 font-medium">Description <span className="text-red-500">*</span></label>
          <textarea
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-black outline-none min-h-[110px] text-base"
            rows={4}
            placeholder="Describe your product in detail"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
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
              value={price}
              onChange={e => setPrice(e.target.value)}
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
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
            />
          </div>
  <div className="flex items-center mb-2 sm:mb-0 ml-0 sm:ml-2">
  <input
    id="forRent"
    type="checkbox"
    className="accent-black scale-125 mr-2"
    checked={forRent}
    onChange={e => setForRent(e.target.checked)}
  />
  <label htmlFor="forRent" className="text-gray-700 select-none text-base">Available for Rent</label>
</div>

{forRent && (
   <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rent Price
              </label>
              <input
                type="number"
                name="stock"
                value={rentPrice}
                onChange={(e)=>setRentPrice(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                placeholder="0"
                min="0"
                required
              />
            </div>
)}

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
      <p className={`${error?"text-red-600":"text-green-500"}`}>{error?error:"Product Added Successfully"}</p>
    </div>
  );
}
