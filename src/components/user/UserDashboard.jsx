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
    <div className="relative min-h-screen bg-gray-50">
      {/* Header: always fixed and highest z-index */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <UserHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>

      {/* Layout below header with padding */}
      <div className="flex pt-16 min-h-screen w-full overflow-x-hidden">
        <UserSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Dashboard main content */}
        <div className="flex-1 lg:ml-64">
          <main className="w-full h-full p-4 lg:p-8">
            <Routes>
              <Route path="/home" element={<UserHome />} />
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
