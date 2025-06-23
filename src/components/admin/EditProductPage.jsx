
import React, { useState } from "react";
import { ArrowLeft, Upload, X } from "lucide-react";
import { useCategories } from '../../contexts/ProductsContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';

const EditProductPage = ({ product, onBack, onSave }) => {
  // Initialize form data from the nested productsData
  const [formData, setFormData] = useState({
    name: product?.productsData?.name || "",
    category: product?.productsData?.category || "",
    price: product?.productsData?.price?.toString() || "",
    stock: product?.productsData?.stock?.toString() || "",
    description: product?.productsData?.description || "",
    images: product?.productsData?.images || []
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const { categories } = useCategories();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!product?.id) {
      alert("Product ID is missing. Cannot update.");
      return;
    }

    setIsUpdating(true);

    try {
      // Create the updated product data structure
      const updatedProductsData = {
        ...product.productsData, // Keep existing data
        ...formData, // Overwrite with form data
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        status: getStatusFromStock(parseInt(formData.stock)),
        updatedAt: new Date().toISOString()
      };

      // Create the complete updated product object
      const updatedProduct = {
        ...product,
        productsData: updatedProductsData
      };

      // Update in Firestore
      const productRef = doc(db, "Products", product.id);
      await updateDoc(productRef, {
        productsData: updatedProductsData
      });

      console.log("Product updated successfully:", updatedProduct);
      alert("Product updated successfully!");
      
      if (onSave) onSave(updatedProduct);
      onBack();

    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product: " + error.message);
    } finally {
      setIsUpdating(false);
    }
  };

    // Helper function to determine status based on stock
  const getStatusFromStock = (stock) => {
    if (stock > 10) return "Active";
    if (stock > 0) return "Low Stock";
    return "Out of Stock";
  };


  if (!product) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6 text-center">
        <p className="text-gray-600">Product not found</p>
        <button onClick={onBack} className="mt-4 text-black hover:underline">
          Back to Products
        </button>
      </div>
    );
  }

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
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <img
            src={product?.productsData?.images[0]}
            alt={product?.productsData?.name}
            className="w-16 h-16 rounded-lg object-cover border border-gray-200"
          />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Edit Product</h1>
            <p className="text-gray-600">Product ID: {product.id}</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
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
                {categories.map(cat => (
                  <option key={cat.category} value={cat.category}>{cat.category}</option>
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
                min="0"
                required
              />
            </div>
          </div>

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
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductPage;
