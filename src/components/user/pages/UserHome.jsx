
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Clock, Heart, DollarSign } from 'lucide-react';
import WelcomeSection from '../home/WelcomeSection';
import QuickStatsCard from '../home/QuickStatsCard';
import DashboardOverview from '../home/DashboardOverview';
import CategoriesSection from '../home/CategoriesSection';
import RecentOrdersSection from '../home/RecentOrdersSection';

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
        <WelcomeSection />

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <QuickStatsCard 
              key={index} 
              stat={stat} 
              onClick={stat.onClick}
            />
          ))}
        </div>

        <DashboardOverview dashboardOverview={dashboardOverview} />
        <CategoriesSection featuredCategories={featuredCategories} />
        <RecentOrdersSection recentOrders={recentOrders} />
      </div>
    </div>
  );
};

export default UserHome;
