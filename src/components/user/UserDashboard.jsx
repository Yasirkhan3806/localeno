
import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import UserSidebar from './UserSidebar';
import UserHeader from './UserHeader';
import UserHome from './pages/UserHome';
import UserProducts from './pages/UserProducts';
import UserCart from './pages/UserCart';
import UserCheckout from './pages/UserCheckout';
import UserWishlist from './pages/UserWishlist';
import UserOrders from './pages/UserOrders';
import UserOrderDetail from './pages/UserOrderDetail';
import UserRentals from './pages/UserRentals';
import UserRentalDetail from './pages/UserRentalDetail';
import UserProfile from './pages/UserProfile';
import UserReviews from './pages/UserReviews';
import UserChats from './pages/UserChats';
import UserSettings from './pages/UserSettings';

const UserDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <UserHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex">
        <UserSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        <div className="flex-1 lg:ml-64">
          <main className="pt-20 p-4 lg:p-8">
            <Routes>
              <Route path="/home" element={<UserHome />} />
              <Route path="/products" element={<UserProducts />} />
              <Route path="/products/category/:categoryName" element={<UserProducts />} />
              <Route path="/cart" element={<UserCart />} />
              <Route path="/checkout" element={<UserCheckout />} />
              <Route path="/wishlist" element={<UserWishlist />} />
              <Route path="/orders" element={<UserOrders />} />
              <Route path="/orders/:orderId" element={<UserOrderDetail />} />
              <Route path="/rentals" element={<UserRentals />} />
              <Route path="/rentals/:rentalId" element={<UserRentalDetail />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/reviews" element={<UserReviews />} />
              <Route path="/chats" element={<UserChats />} />
              <Route path="/settings" element={<UserSettings />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
