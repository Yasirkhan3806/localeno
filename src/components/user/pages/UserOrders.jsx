import React, { useEffect, useState } from 'react';
import { Package, Clock, CheckCircle, XCircle, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BackToHomeButton from '../BackToHomeButton';
import OrderCard from '../orders/OrderCard';
import OrderStatusFilter from '../orders/OrderStatusFilter';
import { getOrdersByUser } from '../../../Firebase Functions/orderFunctions';

const UserOrders = () => {
  const navigate = useNavigate();
  const [orderData,setOrderData] = useState()
  
  const fetchOrders = async() =>{
    const orders = await getOrdersByUser()
    setOrderData(orders?.orders)
    console.log(orders?.orders)

  }

  useEffect(()=>{
    fetchOrders()
  },[])
  
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
      case 'In Process':
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
      case 'In Process':
        return 'bg-orange-100 text-orange-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = filterStatus === 'all' 
    ? (orderData || [])
    : orderData.filter(order => order.status === filterStatus);

    console.log(filteredOrders)
  return (
    <div className="space-y-8">
      <BackToHomeButton />
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
        <div className="text-sm text-gray-500">
          {filteredOrders.length} orders
        </div>
      </div>

      <OrderStatusFilter 
        filterStatus={filterStatus} 
        setFilterStatus={setFilterStatus} 
      />

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
            <OrderCard
              key={order.id}
              order={order}
              getStatusIcon={getStatusIcon}
              getStatusColor={getStatusColor}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrders;
