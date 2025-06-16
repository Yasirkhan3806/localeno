
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, TrendingUp, Star, Clock } from 'lucide-react';
import BackToHomeButton from '../BackToHomeButton';

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
    { 
      label: 'Total Orders', 
      value: '12', 
      icon: ShoppingBag, 
      color: 'bg-blue-500',
      onClick: () => navigate('/user/orders')
    },
    { 
      label: 'Active Rentals', 
      value: '3', 
      icon: Clock, 
      color: 'bg-green-500',
      onClick: () => navigate('/user/rentals')
    },
    { 
      label: 'Wishlist Items', 
      value: '8', 
      icon: Star, 
      color: 'bg-purple-500',
      onClick: () => navigate('/user/wishlist')
    },
    { 
      label: 'Reviews Given', 
      value: '5', 
      icon: TrendingUp, 
      color: 'bg-orange-500',
      onClick: () => navigate('/user/reviews')
    },
  ];

  const recentOrders = [
    { id: '1', product: 'Wireless Headphones', date: '2024-01-15', status: 'Delivered', amount: '$99' },
    { id: '2', product: 'Smart Watch', date: '2024-01-12', status: 'Shipped', amount: '$299' },
    { id: '3', product: 'Bluetooth Speaker', date: '2024-01-10', status: 'Processing', amount: '$79' },
  ];

  const featuredCategories = [
    { 
      name: 'Home Decor', 
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=300&q=80', 
      count: '150+ items',
      id: 'home-decor'
    },
    { 
      name: 'Furniture', 
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=300&q=80', 
      count: '200+ items',
      id: 'furniture'
    },
    { 
      name: 'Clothing', 
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&q=80', 
      count: '300+ items',
      id: 'clothing'
    },
    { 
      name: 'Accessories', 
      image: 'https://images.unsplash.com/photo-1487252665478-49b61b47f302?auto=format&fit=crop&w=300&q=80', 
      count: '180+ items',
      id: 'accessories'
    },
    { 
      name: 'Handicrafts', 
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=300&q=80', 
      count: '120+ items',
      id: 'handicrafts'
    },
    { 
      name: 'Health & Beauty', 
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=300&q=80', 
      count: '90+ items',
      id: 'health-beauty'
    },
  ];

  return (
    <div className="space-y-8">
      <BackToHomeButton />
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-black to-gray-800 text-white rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
        <p className="text-gray-300">Discover amazing products and manage your orders</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200"
            onClick={stat.onClick}
          >
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
            onClick={() => navigate('/products')}
            className="bg-black text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 hover:scale-105 transition-all duration-200 transform active:scale-95"
          >
            View All
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {featuredCategories.map((category, index) => (
            <div
              key={index}
              onClick={() => navigate(`/products?category=${category.id}`)}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 cursor-pointer group"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-gray-900 mb-1 text-sm lg:text-base">
                  {category.name}
                </h3>
                <p className="text-xs lg:text-sm text-gray-600">
                  {category.count}
                </p>
              </div>
            </div>
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
