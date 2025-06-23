import React, { useState, useRef } from "react";
import { ArrowLeft, Upload, X } from "lucide-react";
import { useCategories } from "../../contexts/ProductsContext";
import { addProducts } from "../../Firebase Functions/addProducts";
import { fetchAdminUserRef } from "../../Firebase Functions/authFunctions";

const AddProductPage = ({ onBack, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    images: [],
  });
  const [dragActive, setDragActive] = useState(false);
  const [previewImages, setPreviewImages] = useState([]); // For UI preview
  const [isUploading, setIsUploading] = useState(false);
   const [forRent, setForRent] = useState(false);
   const [rentPrice,setRentPrice]= useState(0)
  const { categories } = useCategories();
  const fileRef = useRef();

  // Fetch admin user document reference
  

  // Upload single image to Cloudinary
  async function uploadImageToCloudinary(file) {
    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", "localeno_unsigned");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dwheinvov/image/upload",
        {
          method: "POST",
          body: uploadData,
        }
      );

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  }

  // Handle image upload and update formData
  const handleImageUpload = async (e) => {
    const selectedFiles = Array.from(e.target.files).slice(0, 10);
    
    if (selectedFiles.length === 0) return;

    setIsUploading(true);
    
    try {
      // Create preview URLs for immediate UI feedback
      const previewUrls = selectedFiles.map(file => URL.createObjectURL(file));
      setPreviewImages(prev => [...prev, ...previewUrls]);

      // Upload all images to Cloudinary
      const uploadPromises = selectedFiles.map(file => uploadImageToCloudinary(file));
      const imageUrls = await Promise.all(uploadPromises);

      // Update formData with the actual Cloudinary URLs
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...imageUrls]
      }));

      console.log("Images uploaded successfully:", imageUrls);
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Failed to upload some images. Please try again.");
      
      // Remove failed preview images
      const failedPreviews = selectedFiles.map(file => URL.createObjectURL(file));
      setPreviewImages(prev => 
        prev.filter(preview => !failedPreviews.includes(preview))
      );
    } finally {
      setIsUploading(false);
      // Clear file input
      if (fileRef.current) {
        fileRef.current.value = '';
      }
    }
  };

  // Remove image from formData and preview
  const removeImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
    
    setPreviewImages(prev => {
      // Clean up preview URL to prevent memory leaks
      if (prev[indexToRemove]) {
        URL.revokeObjectURL(prev[indexToRemove]);
      }
      return prev.filter((_, index) => index !== indexToRemove);
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // // Handle drag and drop
  // const handleDrop = (e) => {
  //   e.preventDefault();
  //   setDragActive(false);
    
  //   const droppedFiles = Array.from(e.dataTransfer.files).filter(
  //     file => file.type.startsWith('image/')
  //   );
    
  //   if (droppedFiles.length > 0) {
  //     // Create a fake event object for handleImageUpload
  //     const fakeEvent = {
  //       target: {
  //         files: droppedFiles
  //       }
  //     };
  //     handleImageUpload(fakeEvent);
  //   }
  // };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.category || !formData.price || !formData.stock) {
      alert("Please fill in all required fields");
      return;
    }

    if (formData.images.length === 0) {
      alert("Please add at least one product image");
      return;
    }

    setIsUploading(true);
    
    try {
      // Get admin user reference
      const adminRef = await fetchAdminUserRef();
      
      // Prepare final product data
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        status: parseInt(formData.stock) > 10 ? "Active" : "Low Stock",
        forRent,
        rentPrice,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Add product to database
      await addProducts(productData, adminRef);
      
      console.log("Product added successfully:", productData);
      alert("Product added successfully!");
      
      // Clean up preview URLs
      previewImages.forEach(url => URL.revokeObjectURL(url));
      
      // Reset form or navigate back
      if (onSave) onSave(productData);
      onBack();
      
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Addition Failed: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };



return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-black mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        <span className="font-medium">Back to Products</span>
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
          Add New Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                placeholder="Enter product name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                required
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.category} value={cat.category}>
                    {cat.category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price ($) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                placeholder="0.00"
                step="0.01"
                min="0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock Quantity *
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                placeholder="0"
                min="0"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none"
              placeholder="Enter product description..."
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

          {/* Image upload section */}
        <div>
          <input
            ref={fileRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            disabled={isUploading}
          />
          
          {/* Preview images */}
          <div className="image-preview-grid">
            {previewImages.map((preview, index) => (
              <div key={index} className="relative">
                <img src={preview} alt={`Preview ${index + 1}`} />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  disabled={isUploading}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
          
          {isUploading && <p>Uploading images...</p>}
        </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6">
            <button
              type="button"
              onClick={onBack}
              className="w-full sm:w-auto px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
