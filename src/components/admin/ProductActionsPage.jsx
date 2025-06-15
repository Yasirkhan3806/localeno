
import React, { useState } from "react";
import { ArrowLeft, Trash2, Copy, Archive, Edit, Eye, Share } from "lucide-react";

const ProductActionsPage = ({ product, onBack }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDuplicate = () => {
    console.log("Duplicating product:", product.name);
    alert(`Product "${product.name}" duplicated successfully!`);
    onBack();
  };

  const handleArchive = () => {
    console.log("Archiving product:", product.name);
    alert(`Product "${product.name}" archived successfully!`);
    onBack();
  };

  const handleShare = () => {
    const url = `${window.location.origin}/products/${product.id}`;
    navigator.clipboard.writeText(url);
    alert("Product URL copied to clipboard!");
  };

  const handleDelete = () => {
    console.log("Deleting product:", product.name);
    alert(`Product "${product.name}" deleted successfully!`);
    setShowDeleteModal(false);
    onBack();
  };

  const actions = [
    {
      icon: Edit,
      label: "Edit Product",
      description: "Modify product details, pricing, and inventory",
      action: () => alert("Edit functionality - would open edit form"),
      color: "text-blue-600 bg-blue-50 hover:bg-blue-100"
    },
    {
      icon: Eye,
      label: "View Details",
      description: "View complete product information and analytics",
      action: () => alert("View details functionality"),
      color: "text-green-600 bg-green-50 hover:bg-green-100"
    },
    {
      icon: Copy,
      label: "Duplicate Product",
      description: "Create a copy of this product with same details",
      action: handleDuplicate,
      color: "text-purple-600 bg-purple-50 hover:bg-purple-100"
    },
    {
      icon: Share,
      label: "Share Product",
      description: "Copy product URL to share with others",
      action: handleShare,
      color: "text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
    },
    {
      icon: Archive,
      label: "Archive Product",
      description: "Hide product from active listings",
      action: handleArchive,
      color: "text-yellow-600 bg-yellow-50 hover:bg-yellow-100"
    },
    {
      icon: Trash2,
      label: "Delete Product",
      description: "Permanently remove this product",
      action: () => setShowDeleteModal(true),
      color: "text-red-600 bg-red-50 hover:bg-red-100"
    }
  ];

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
        {/* Product Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
          <img
            src={product.image}
            alt={product.name}
            className="w-20 h-20 rounded-xl object-cover border border-gray-200"
          />
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{product.name}</h1>
            <p className="text-gray-600 mb-1">Product ID: {product.id}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span>Category: {product.category}</span>
              <span>Price: ${product.price.toFixed(2)}</span>
              <span>Stock: {product.stock}</span>
            </div>
          </div>
        </div>

        {/* Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className={`p-6 rounded-xl border border-gray-200 text-left transition-all hover:shadow-md ${action.color}`}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-white">
                  <action.icon size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{action.label}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <Trash2 size={20} className="text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Delete Product</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{product.name}"? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductActionsPage;
