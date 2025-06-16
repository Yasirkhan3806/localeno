
import React, { useState } from "react";
import { ArrowLeft, Package } from "lucide-react";

const EditOrderPage = ({ order, onBack, onSave }) => {
  const [formData, setFormData] = useState({
    status: order?.status || "Pending",
    shippingAddress: order?.shippingAddress || "",
    trackingNumber: order?.trackingNumber || "",
    notes: order?.notes || ""
  });

  const orderStatuses = [
    "Pending",
    "Processing", 
    "Shipped",
    "Delivered",
    "Cancelled",
    "Returned"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedOrder = {
      ...order,
      ...formData
    };
    console.log("Updating order:", updatedOrder);
    alert("Order updated successfully!");
    if (onSave) onSave(updatedOrder);
    onBack();
  };

  if (!order) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6 text-center">
        <p className="text-gray-600">Order not found</p>
        <button onClick={onBack} className="mt-4 text-black hover:underline">
          Back to Orders
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
        <span className="font-medium">Back to Orders</span>
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gray-800 text-white flex items-center justify-center font-semibold text-xl">
            <Package size={24} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Edit Order</h1>
            <p className="text-gray-600">Order ID: {order.id}</p>
            <p className="text-gray-500 text-sm">Customer: {order.customer}</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Order Status *
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                required
              >
                {orderStatuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tracking Number
              </label>
              <input
                type="text"
                name="trackingNumber"
                value={formData.trackingNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                placeholder="Enter tracking number"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shipping Address
            </label>
            <textarea
              name="shippingAddress"
              value={formData.shippingAddress}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none"
              placeholder="Enter complete shipping address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Order Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none"
              placeholder="Add any notes about this order..."
            />
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Order Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Customer:</span>
                <span className="ml-2 font-medium">{order.customer}</span>
              </div>
              <div>
                <span className="text-gray-500">Order Date:</span>
                <span className="ml-2 font-medium">{order.date}</span>
              </div>
              <div>
                <span className="text-gray-500">Total Amount:</span>
                <span className="ml-2 font-medium">${order.total || "0.00"}</span>
              </div>
              <div>
                <span className="text-gray-500">Payment Status:</span>
                <span className="ml-2 font-medium">{order.paymentStatus || "Paid"}</span>
              </div>
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
              Update Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOrderPage;
