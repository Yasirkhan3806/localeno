
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Clock, Heart, DollarSign } from 'lucide-react';
import WelcomeSection from '../home/WelcomeSection';
import QuickStatsCard from '../home/QuickStatsCard';
import DashboardOverview from '../home/DashboardOverview';
import CategoriesSection from '../home/CategoriesSection';
import RecentOrdersSection from '../home/RecentOrdersSection';
import { getOrdersByUser } from '../../../Firebase Functions/orderFunctions';
import { getRentalsByUser } from '../../../Firebase Functions/RentalFunc';
import { auth } from '../../../config/firebaseConfig';

const UserHome = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [orders,setOrders] = useState(null)
  const [rentals,setRentals] = useState(null)

  const fetchOrders = async()=>{
    const order = await getOrdersByUser()
    const rent = await getRentalsByUser()
    const activeRent = rent.filter((ren)=>ren.status == 'active')
    console.log(order)
    console.log(activeRent)
    setOrders([order.orders])
    setRentals(activeRent)
  }
  useEffect(() => {
    fetchOrders()
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);

  }, []);

  useEffect(()=>{
        fetchOrders()
        
  },[auth?.currentUser])

  //  useEffect(()=>{
  //       const totalRent = rentals.filter((ren)=>ren.totalAmount)
  //       const totalOrdMon = orders.orders.filter((ord)=>ord.total)
         
        
  // },[orders,rentals])

  const quickStats = [
    { 
      label: 'Total Orders', 
      value: orders?.length || 0, 
      icon: ShoppingBag, 
      color: 'bg-blue-500',
      trend: '+2 this month',
      onClick: () => navigate('/user/orders')
    },
    { 
      label: 'Active Rentals', 
      value: rentals?.length || 0, 
      icon: Clock, 
      color: 'bg-green-500',
      trend: '2 ending soon',
      onClick: () => navigate('/user/rentals')
    },
    { 
      label: 'Wishlist Items', 
      value: '0', 
      icon: Heart, 
      color: 'bg-purple-500',
      trend: '3 on sale',
      onClick: () => navigate('/user/wishlist')
    },
    { 
      label: 'Total Spent', 
      value: '$1,250', 
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
        <CategoriesSection />
        <RecentOrdersSection recentOrders={recentOrders} />
      </div>
    </div>
  );
};

export default UserHome;
