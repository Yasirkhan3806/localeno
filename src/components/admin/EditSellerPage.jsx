
import React, { useState } from "react";
import { ArrowLeft, Store } from "lucide-react";

const EditSellerPage = ({ seller, onBack, onSave }) => {
  const [formData, setFormData] = useState({
    name: seller?.name || "",
    owner: seller?.owner || "",
    email: seller?.email || "",
    phone: seller?.phone || "",
    address: seller?.address || "",
    city: seller?.city || "",
    state: seller?.state || "",
    zipCode: seller?.zipCode || "",
    businessType: seller?.businessType || "",
    taxId: seller?.taxId || "",
    commissionRate: seller?.commissionRate?.toString() || "10",
    status: seller?.status || "Active"
  });

  const businessTypes = [
    "Sole Proprietorship",
    "Partnership", 
    "LLC",
    "Corporation",
    "Non-Profit"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedSeller = {
      ...seller,
      ...formData,
      commissionRate: parseFloat(formData.commissionRate)
    };
    console.log("Updating seller:", updatedSeller);
    alert("Seller updated successfully!");
    if (onSave) onSave(updatedSeller);
    onBack();
  };

  if (!seller) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6 text-center">
        <p className="text-gray-600">Seller not found</p>
        <button onClick={onBack} className="mt-4 text-black hover:underline">
          Back to Sellers
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
        <span className="font-medium">Back to Sellers</span>
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gray-800 text-white flex items-center justify-center font-semibold text-xl">
            <Store size={24} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Edit Seller</h1>
            <p className="text-gray-600">Seller ID: {seller.id}</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Store/Business Name *
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
                Owner Name *
              </label>
              <input
                type="text"
                name="owner"
                value={formData.owner}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Type
              </label>
              <select
                name="businessType"
                value={formData.businessType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              >
                <option value="">Select business type</option>
                {businessTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tax ID/EIN
              </label>
              <input
                type="text"
                name="taxId"
                value={formData.taxId}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              placeholder="Street address"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ZIP Code
              </label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Commission Rate (%)
              </label>
              <input
                type="number"
                name="commissionRate"
                value={formData.commissionRate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                min="0"
                max="100"
                step="0.1"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status *
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                required
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Suspended">Suspended</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
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
              Update Seller
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSellerPage;
