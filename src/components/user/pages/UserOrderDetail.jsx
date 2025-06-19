import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Clock, CheckCircle, XCircle, Truck } from 'lucide-react';
import OrderTimeline from '../orderDetail/OrderTimeline';
import OrderItems from '../orderDetail/OrderItems';
import OrderSidebar from '../orderDetail/OrderSidebar';

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
            <OrderTimeline orderTimeline={order.orderTimeline} />
            <OrderItems products={order.products} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <OrderSidebar order={order} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOrderDetail;
