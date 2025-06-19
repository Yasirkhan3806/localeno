
import React, { useState } from 'react';
import { Package, Clock, CheckCircle, XCircle, Eye, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BackToHomeButton from '../BackToHomeButton';

const UserOrders = () => {
  const navigate = useNavigate();
  
  // Convert price to PKR
  const convertToPKR = (price) => {
    if (!price) return 0;
    
    let numericPrice;
    if (typeof price === 'string') {
      numericPrice = parseFloat(price.replace(/[₹$,]/g, ''));
    } else {
      numericPrice = price;
    }
    
    if (isNaN(numericPrice)) return 0;
    
    // If it's already in PKR, return as is, otherwise convert from USD
    if (typeof price === 'string' && price.includes('PKR')) {
      return numericPrice;
    }
    
    return Math.round(numericPrice * 280);
  };

  const formatPKR = (amount) => {
    return `PKR ${amount.toLocaleString()}`;
  };
  
  // Mock orders data
  const [orders] = useState([
    {
      id: "ORD-2024-001",
      date: "2024-06-10",
      status: "delivered",
      total: 129.99,
      items: 2,
      estimatedDelivery: "2024-06-15",
      products: [
        { name: "Wireless Headphones", quantity: 1, price: 89.99 },
        { name: "Phone Case", quantity: 1, price: 39.99 }
      ]
    },
    {
      id: "ORD-2024-002",
      date: "2024-06-12",
      status: "shipped",
      total: 199.99,
      items: 1,
      estimatedDelivery: "2024-06-16",
      trackingNumber: "TRK123456789",
      products: [
        { name: "Smart Watch", quantity: 1, price: 199.99 }
      ]
    },
    {
      id: "ORD-2024-003",
      date: "2024-06-14",
      status: "processing",
      total: 79.99,
      items: 3,
      estimatedDelivery: "2024-06-18",
      products: [
        { name: "USB Cable", quantity: 2, price: 19.99 },
        { name: "Power Bank", quantity: 1, price: 39.99 }
      ]
    },
    {
      id: "ORD-2024-004",
      date: "2024-06-13",
      status: "cancelled",
      total: 159.99,
      items: 1,
      products: [
        { name: "Bluetooth Speaker", quantity: 1, price: 159.99 }
      ]
    }
  ]);

  const [filterStatus, setFilterStatus] = useState('all');

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'shipped':
        return <Truck className="text-blue-500" size={20} />;
      case 'processing':
        return <Clock className="text-orange-500" size={20} />;
      case 'cancelled':
        return <XCircle className="text-red-500" size={20} />;
      default:
        return <Package className="text-gray-500" size={20} />;
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

  const viewOrderDetails = (orderId) => {
    navigate(`/user/orders/${orderId}`);
  };

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  return (
    <div className="space-y-8">
      <BackToHomeButton />
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
        <div className="text-sm text-gray-500">
          {filteredOrders.length} orders
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
        <div className="flex flex-wrap gap-2">
          {['all', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-xl font-medium transition-colors capitalize ${
                filterStatus === status
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status === 'all' ? 'All Orders' : status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 shadow-md border border-gray-200 text-center">
          <Package size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-600 mb-6">
            {filterStatus === 'all' 
              ? "You haven't placed any orders yet" 
              : `No ${filterStatus} orders found`}
          </p>
          <button
            onClick={() => navigate('/user/home')}
            className="bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-900 transition-colors"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                  {getStatusIcon(order.status)}
                  <div>
                    <h3 className="font-semibold text-gray-900">{order.id}</h3>
                    <p className="text-sm text-gray-500">Placed on {new Date(order.date).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <span className="font-bold text-lg">{formatPKR(convertToPKR(order.total))}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Items</p>
                  <p className="font-medium">{order.items} item(s)</p>
                </div>
                {order.estimatedDelivery && (
                  <div>
                    <p className="text-sm text-gray-500">Estimated Delivery</p>
                    <p className="font-medium">{new Date(order.estimatedDelivery).toLocaleDateString()}</p>
                  </div>
                )}
                {order.trackingNumber && (
                  <div>
                    <p className="text-sm text-gray-500">Tracking Number</p>
                    <p className="font-medium">{order.trackingNumber}</p>
                  </div>
                )}
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-2">Order Items:</h4>
                <div className="space-y-2">
                  {order.products.map((product, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span>{product.name} x{product.quantity}</span>
                      <span className="font-medium">{formatPKR(convertToPKR(product.price))}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-4">
                <button
                  onClick={() => viewOrderDetails(order.id)}
                  className="flex items-center space-x-2 bg-gray-100 text-gray-900 px-4 py-2 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  <Eye size={16} />
                  <span>View Details</span>
                </button>
                
                {order.status === 'delivered' && (
                  <button
                    onClick={() => navigate('/user/reviews')}
                    className="bg-black text-white px-4 py-2 rounded-xl font-medium hover:bg-gray-900 transition-colors"
                  >
                    Write Review
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrders;
