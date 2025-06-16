
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, TrendingUp, Star, Clock, Grid3x3, BarChart3, Package, Heart, DollarSign, Target } from 'lucide-react';

const UserHome = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
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
      trend: '+2 this month',
      onClick: () => navigate('/user/orders')
    },
    { 
      label: 'Active Rentals', 
      value: '3', 
      icon: Clock, 
      color: 'bg-green-500',
      trend: '2 ending soon',
      onClick: () => navigate('/user/rentals')
    },
    { 
      label: 'Wishlist Items', 
      value: '8', 
      icon: Heart, 
      color: 'bg-purple-500',
      trend: '3 on sale',
      onClick: () => navigate('/user/wishlist')
    },
    { 
      label: 'Total Spent', 
      value: '$1,247', 
      icon: DollarSign, 
      color: 'bg-orange-500',
      trend: 'This year',
      onClick: () => navigate('/user/orders')
    },
  ];

  const dashboardOverview = [
    {
      title: 'Order Activity',
      items: [
        { label: 'Pending Orders', value: '2', color: 'text-yellow-600' },
        { label: 'Completed Orders', value: '10', color: 'text-green-600' },
        { label: 'Cancelled Orders', value: '0', color: 'text-red-600' },
      ]
    },
    {
      title: 'Rental Status',
      items: [
        { label: 'Active Rentals', value: '3', color: 'text-blue-600' },
        { label: 'Past Rentals', value: '7', color: 'text-gray-600' },
        { label: 'Overdue Returns', value: '0', color: 'text-red-600' },
      ]
    },
    {
      title: 'Account Health',
      items: [
        { label: 'Profile Completion', value: '85%', color: 'text-green-600' },
        { label: 'Reviews Given', value: '5', color: 'text-blue-600' },
        { label: 'Saved Addresses', value: '2', color: 'text-gray-600' },
      ]
    }
  ];

  const recentOrders = [
    { id: '1', product: 'Wireless Headphones', date: '2024-01-15', status: 'Delivered', amount: '$99' },
    { id: '2', product: 'Smart Watch', date: '2024-01-12', status: 'Shipped', amount: '$299' },
    { id: '3', product: 'Bluetooth Speaker', date: '2024-01-10', status: 'Processing', amount: '$79' },
  ];

  const featuredCategories = [
    { 
      name: 'Handicrafts', 
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=300&q=80', 
      count: '150+ items',
      id: 'Handicrafts'
    },
    { 
      name: 'Home Decor', 
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=300&q=80', 
      count: '200+ items',
      id: 'Home Decor'
    },
    { 
      name: 'Furniture', 
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=300&q=80', 
      count: '180+ items',
      id: 'Furniture'
    },
    { 
      name: 'Health & Beauty', 
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=300&q=80', 
      count: '120+ items',
      id: 'Health & Beauty'
    },
    { 
      name: 'Clothing', 
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&q=80', 
      count: '300+ items',
      id: 'Clothing'
    },
    { 
      name: 'Accessories', 
      image: 'https://images.unsplash.com/photo-1487252665478-49b61b47f302?auto=format&fit=crop&w=300&q=80', 
      count: '90+ items',
      id: 'Accessories'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto p-4 lg:p-8 space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-black via-gray-800 to-gray-900 text-white rounded-3xl p-8 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">Welcome back!</h1>
              <p className="text-gray-300 text-lg">Discover amazing products and manage your orders</p>
            </div>
            <div className="mt-6 lg:mt-0">
              <button
                onClick={() => navigate('/user/products')}
                className="bg-white text-black px-8 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              >
                Start Shopping
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300"
              onClick={stat.onClick}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-2xl`}>
                  <stat.icon className="text-white" size={24} />
                </div>
                <TrendingUp size={16} className="text-green-500" />
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.trend}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Dashboard Overview */}
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 size={24} className="text-gray-900" />
            <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dashboardOverview.map((section, index) => (
              <div key={index} className="space-y-4">
                <h3 className="font-semibold text-gray-900 text-lg">{section.title}</h3>
                <div className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
                      <span className="text-gray-700">{item.label}</span>
                      <span className={`font-bold ${item.color}`}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Browse Categories */}
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Grid3x3 size={24} className="text-gray-900" />
              <h2 className="text-2xl font-bold text-gray-900">Browse Categories</h2>
            </div>
            <button
              onClick={() => navigate('/user/products')}
              className="bg-black text-white font-semibold py-3 px-6 rounded-2xl hover:bg-gray-800 hover:scale-105 transition-all duration-300"
            >
              View All Products
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
            {featuredCategories.map((category, index) => (
              <div
                key={index}
                onClick={() => navigate(`/user/products?category=${encodeURIComponent(category.id)}`)}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group border border-gray-100"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-gray-900 mb-1 text-sm lg:text-base">
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
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Package size={24} className="text-gray-900" />
              <h2 className="text-2xl font-bold text-gray-900">Recent Orders</h2>
            </div>
            <button
              onClick={() => navigate('/user/orders')}
              className="text-black font-semibold hover:underline"
            >
              View All Orders
            </button>
          </div>

          {/* Table for md+ and cards for mobile */}
          <div>
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
                      <td className="py-4 px-4 font-medium">{order.product}</td>
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
                      <td className="py-4 px-4 font-bold">{order.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="block md:hidden space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="border border-gray-200 rounded-2xl shadow-sm p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-900">{order.product}</span>
                    <span className="font-bold">{order.amount}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
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
    </div>
  );
};

export default UserHome;
