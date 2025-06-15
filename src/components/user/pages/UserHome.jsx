
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, TrendingUp, Star, Clock } from 'lucide-react';

const UserHome = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Responsive check for mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const quickStats = [
    { label: 'Total Orders', value: '12', icon: ShoppingBag, color: 'bg-blue-500' },
    { label: 'Active Rentals', value: '3', icon: Clock, color: 'bg-green-500' },
    { label: 'Wishlist Items', value: '8', icon: Star, color: 'bg-purple-500' },
    { label: 'Reviews Given', value: '5', icon: TrendingUp, color: 'bg-orange-500' },
  ];

  const recentOrders = [
    { id: '1', product: 'Wireless Headphones', date: '2024-01-15', status: 'Delivered', amount: '$99' },
    { id: '2', product: 'Smart Watch', date: '2024-01-12', status: 'Shipped', amount: '$299' },
    { id: '3', product: 'Bluetooth Speaker', date: '2024-01-10', status: 'Processing', amount: '$79' },
  ];

  const featuredCategories = [
    { name: 'Electronics', image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=300&q=80', count: '150+ items' },
    { name: 'Fashion', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=300&q=80', count: '200+ items' },
    { name: 'Home & Garden', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=300&q=80', count: '120+ items' },
    { name: 'Sports', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=300&q=80', count: '80+ items' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-black to-gray-800 text-white rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
        <p className="text-gray-300">Discover amazing products and manage your orders</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-xl`}>
                <stat.icon className="text-white" size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Shop by Categories */}
      <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Shop by Categories</h2>
          <button
            onClick={() => navigate('/user/products')}
            className="text-black font-semibold hover:underline"
          >
            View All
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => navigate(`/user/products/category/${category.name.toLowerCase()}`)}
              className="group text-left"
            >
              <div className="relative overflow-hidden rounded-xl mb-4">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
              <p className="text-sm text-gray-600">{category.count}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Recent Orders</h2>
          <button
            onClick={() => navigate('/user/orders')}
            className="text-black font-semibold hover:underline"
          >
            View All Orders
          </button>
        </div>

        {/* Responsive orders: table for md+ and cards for mobile */}
        <div>
          {/* Table (md+) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Product</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">{order.product}</td>
                    <td className="py-4 px-4 text-gray-600">{order.date}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-semibold">{order.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Card view (mobile) */}
          <div className="block md:hidden space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-gray-900">{order.product}</span>
                  <span className="font-semibold">{order.amount}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <span>{order.date}</span>
                  <span className={`px-2 py-1 rounded-full font-medium text-xs ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
