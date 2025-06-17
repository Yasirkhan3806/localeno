
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Clock, CheckCircle, XCircle, Truck, MapPin, CreditCard } from 'lucide-react';

const UserOrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  // Mock order data - in real app, fetch by orderId
  const order = {
    id: orderId || "ORD-2024-001",
    date: "2024-06-10",
    status: "delivered",
    total: 129.99,
    items: 2,
    estimatedDelivery: "2024-06-15",
    deliveredDate: "2024-06-14",
    trackingNumber: "TRK123456789",
    shippingAddress: {
      name: "John Doe",
      address: "123 Main St, Springfield, USA",
      phone: "+1 234-567-8900"
    },
    paymentMethod: "Cash on Delivery",
    products: [
      { 
        id: 1,
        name: "Handcrafted Wooden Dining Table", 
        quantity: 1, 
        price: 89.99, 
        image: "https://images.unsplash.com/photo-1549497538-303791108f95?auto=format&fit=crop&w=300&q=80"
      },
      { 
        id: 2,
        name: "Modern Table Lamp", 
        quantity: 1, 
        price: 39.99, 
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
      }
    ],
    orderTimeline: [
      { status: "Order Placed", date: "2024-06-10", time: "10:30 AM", completed: true },
      { status: "Order Confirmed", date: "2024-06-10", time: "11:15 AM", completed: true },
      { status: "Shipped", date: "2024-06-12", time: "2:00 PM", completed: true },
      { status: "Out for Delivery", date: "2024-06-14", time: "9:00 AM", completed: true },
      { status: "Delivered", date: "2024-06-14", time: "3:30 PM", completed: true }
    ]
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="text-green-500" size={24} />;
      case 'shipped':
        return <Truck className="text-blue-500" size={24} />;
      case 'processing':
        return <Clock className="text-orange-500" size={24} />;
      case 'cancelled':
        return <XCircle className="text-red-500" size={24} />;
      default:
        return <Package className="text-gray-500" size={24} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-orange-100 text-orange-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto p-4 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/user/orders')}
            className="mb-4 flex items-center gap-2 text-gray-600 hover:text-black transition"
          >
            <ArrowLeft size={20} />
            Back to Orders
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">Order Details</h1>
              <p className="text-gray-600 mt-2">Order {order.id}</p>
            </div>
            <div className="flex items-center gap-3">
              {getStatusIcon(order.status)}
              <span className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Timeline */}
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Timeline</h2>
              <div className="space-y-4">
                {order.orderTimeline.map((step, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`w-4 h-4 rounded-full ${step.completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                          {step.status}
                        </span>
                        <span className="text-sm text-gray-500">
                          {step.date} at {step.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Items</h2>
              <div className="space-y-4">
                {order.products.map((product, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{product.name}</h3>
                      <p className="text-gray-600">Quantity: {product.quantity}</p>
                    </div>
                    <p className="font-bold text-gray-900">${product.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Date:</span>
                  <span className="font-medium">{new Date(order.date).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Items:</span>
                  <span className="font-medium">{order.items}</span>
                </div>
                {order.trackingNumber && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tracking:</span>
                    <span className="font-medium">{order.trackingNumber}</span>
                  </div>
                )}
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>${order.total}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={20} className="text-gray-600" />
                <h2 className="text-xl font-bold text-gray-900">Shipping Address</h2>
              </div>
              <div className="text-gray-700">
                <p className="font-medium">{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.address}</p>
                <p>{order.shippingAddress.phone}</p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard size={20} className="text-gray-600" />
                <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
              </div>
              <p className="text-gray-700">{order.paymentMethod}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOrderDetail;
