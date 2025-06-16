import React from "react";
import { X, Package, ShoppingCart, User, UserCheck, MapPin, Phone, Mail, Calendar, DollarSign, Tag, TrendingUp } from "lucide-react";

const ViewDetailModal = ({ item, type, isOpen, onClose }) => {
  if (!isOpen || !item) return null;

  const renderProductDetails = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-6">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full sm:w-48 h-48 object-cover rounded-lg border"
        />
        <div className="flex-1 space-y-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
            <p className="text-gray-600">{item.category}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Price</label>
              <p className="text-lg font-semibold text-green-600">${item.price.toFixed(2)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Stock</label>
              <p className="text-lg font-semibold">{item.stock} units</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Status</label>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                item.status === "Active" ? "bg-green-100 text-green-600" :
                item.status === "Low Stock" ? "bg-yellow-100 text-yellow-700" :
                "bg-red-100 text-red-600"
              }`}>
                {item.status}
              </span>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Product ID</label>
              <p className="text-gray-900">#{item.id}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-500">Description</label>
        <p className="mt-1 text-gray-700">
          {item.description || `A high-quality ${item.category.toLowerCase()} product perfect for your needs. This item combines functionality with style, making it an excellent addition to any collection.`}
        </p>
      </div>
    </div>
  );

  const renderOrderDetails = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-500">Order ID</label>
          <p className="text-lg font-semibold">{item.id}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Customer</label>
          <p className="text-gray-900">{item.customer}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Status</label>
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
            item.status === "Delivered" ? "bg-green-100 text-green-600" :
            item.status === "Shipped" ? "bg-blue-100 text-blue-600" :
            item.status === "Processing" ? "bg-yellow-100 text-yellow-700" :
            item.status === "Pending" ? "bg-orange-100 text-orange-600" :
            "bg-red-100 text-red-600"
          }`}>
            {item.status}
          </span>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Total Amount</label>
          <p className="text-lg font-semibold text-green-600">${item.total?.toFixed(2) || "0.00"}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Items</label>
          <p className="text-gray-900">{item.items} items</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Date</label>
          <p className="text-gray-900">{item.date}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-gray-500">Payment Method</label>
          <p className="text-gray-900">{item.paymentMethod || "Credit Card"}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Payment Status</label>
          <p className="text-gray-900">{item.paymentStatus || "Paid"}</p>
        </div>
      </div>
      {item.shippingAddress && (
        <div>
          <label className="text-sm font-medium text-gray-500">Shipping Address</label>
          <p className="text-gray-900 mt-1">{item.shippingAddress}</p>
        </div>
      )}
      {item.trackingNumber && (
        <div>
          <label className="text-sm font-medium text-gray-500">Tracking Number</label>
          <p className="text-gray-900 font-mono">{item.trackingNumber}</p>
        </div>
      )}
    </div>
  );

  const renderCustomerDetails = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gray-800 text-white flex items-center justify-center font-semibold text-xl">
          {item.name?.split(" ").map(n => n[0]).join("").slice(0, 2) || "NA"}
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
          <p className="text-gray-600">Customer ID: {item.id}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-gray-500">Email</label>
          <p className="text-gray-900">{item.email}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Phone</label>
          <p className="text-gray-900">{item.phone || "Not provided"}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Status</label>
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
            item.status === "Active" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
          }`}>
            {item.status}
          </span>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Total Orders</label>
          <p className="text-lg font-semibold">{item.orders || 0}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Total Spent</label>
          <p className="text-lg font-semibold text-green-600">${item.totalSpent?.toLocaleString(undefined, {minimumFractionDigits:2}) || "0.00"}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Last Order</label>
          <p className="text-gray-900">{item.lastOrder || "Never"}</p>
        </div>
      </div>
      {(item.address || item.city || item.state || item.zipCode) && (
        <div>
          <label className="text-sm font-medium text-gray-500">Address</label>
          <div className="mt-1 text-gray-900">
            {item.address && <p>{item.address}</p>}
            {(item.city || item.state || item.zipCode) && (
              <p>{[item.city, item.state, item.zipCode].filter(Boolean).join(", ")}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const renderSellerDetails = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gray-800 text-white flex items-center justify-center font-semibold text-xl">
          {item.name?.split(" ").map(n => n[0]).join("").slice(0, 2) || "NA"}
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
          <p className="text-gray-600">Seller ID: {item.id}</p>
          {item.owner && <p className="text-gray-500 text-sm">Owner: {item.owner}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-gray-500">Email</label>
          <p className="text-gray-900">{item.email}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Phone</label>
          <p className="text-gray-900">{item.phone || "Not provided"}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Status</label>
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
            item.status === "Active" ? "bg-green-100 text-green-600" : 
            item.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
            "bg-red-100 text-red-600"
          }`}>
            {item.status}
          </span>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Products</label>
          <p className="text-lg font-semibold">{item.products || 0}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Total Sales</label>
          <p className="text-lg font-semibold text-green-600">${item.sales?.toLocaleString(undefined, {minimumFractionDigits:2}) || "0.00"}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">Rating</label>
          <p className="text-gray-900 flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            {item.rating || "N/A"}
          </p>
        </div>
      </div>
      {item.businessAddress && (
        <div>
          <label className="text-sm font-medium text-gray-500">Business Address</label>
          <p className="text-gray-900 mt-1">{item.businessAddress}</p>
        </div>
      )}
    </div>
  );

  const getIcon = () => {
    switch (type) {
      case "product": return <Package className="w-6 h-6" />;
      case "order": return <ShoppingCart className="w-6 h-6" />;
      case "customer": return <User className="w-6 h-6" />;
      case "seller": return <UserCheck className="w-6 h-6" />;
      default: return <Package className="w-6 h-6" />;
    }
  };

  const getTitle = () => {
    switch (type) {
      case "product": return "Product Details";
      case "order": return "Order Details";
      case "customer": return "Customer Details";
      case "seller": return "Seller Details";
      default: return "Details";
    }
  };

  const renderContent = () => {
    switch (type) {
      case "product": return renderProductDetails();
      case "order": return renderOrderDetails();
      case "customer": return renderCustomerDetails();
      case "seller": return renderSellerDetails();
      default: return <p>No details available</p>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center">
              {getIcon()}
            </div>
            <h2 className="text-xl font-bold text-gray-900">{getTitle()}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ViewDetailModal;
