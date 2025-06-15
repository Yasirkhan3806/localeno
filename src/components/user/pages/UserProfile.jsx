import React, { useState } from "react";
import { useAuth } from '../../../contexts/AuthContext';
import { Camera, Save, Edit, Upload, User, Shield } from 'lucide-react';
import { useCart } from "../../../hooks/useCart";
import { useWishlist } from "../../../hooks/useWishlist";
import { ShoppingCart, Heart } from "lucide-react";

const mockProducts = [
  {
    id: 11,
    name: "Pro Camera",
    price: 599,
    image: "https://images.unsplash.com/photo-1482062364825-616fd23b8fc1?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 12,
    name: "Bluetooth Speaker",
    price: 89,
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=200&q=80"
  }
];

const UserProfile = () => {
  const { user } = useAuth();
  const { addToCart, cart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    dateOfBirth: user?.dateOfBirth || '',
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || '',
    zipCode: user?.zipCode || '',
    country: user?.country || '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [isVerified, setIsVerified] = useState(user?.isVerified || false);

  const handleSave = () => {
    // Save profile data
    console.log('Saving profile:', formData);
    // Add API call here
    setIsEditing(false);
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    console.log('Changing password');
    // Add password change logic here
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Uploading image:', file);
      // Add image upload logic here
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-900 transition-colors"
        >
          <Edit size={18} />
          <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
        </button>
      </div>

      {/* Profile Tabs */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200">
        <div className="border-b border-gray-200">
          <div className="flex space-x-8 px-6">
            {[
              { id: 'personal', label: 'Personal Info', icon: User },
              { id: 'security', label: 'Security', icon: Shield },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon size={18} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'personal' && (
            <div className="space-y-6">
              {/* Profile Picture */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </div>
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-50 cursor-pointer">
                      <Camera size={16} />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {user?.firstName} {user?.lastName}
                  </h2>
                  <p className="text-gray-600 capitalize">{user?.accountType} Account</p>
                  <div className="flex items-center mt-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {isVerified ? 'Verified' : 'Unverified'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Verification Notice */}
              {!isVerified && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <Shield className="text-yellow-600" size={20} />
                    <div>
                      <h4 className="font-medium text-yellow-800">Account Verification Required</h4>
                      <p className="text-sm text-yellow-700">
                        Please verify your identity to unlock all features and build trust with other users.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsVerified(true)}
                    className="mt-3 bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-700 transition-colors"
                  >
                    Verify Now
                  </button>
                </div>
              )}

              {/* Personal Information Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-50"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    disabled={!isEditing}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-50"
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex space-x-4">
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
                  >
                    <Save size={18} />
                    <span>Save Changes</span>
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>

                  <button
                    onClick={handlePasswordChange}
                    className="bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-900 transition-colors"
                  >
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Example Section: "My Products" with Add to Cart/Wishlist */}
      <div>
        <h2 className="mb-3 text-lg font-bold text-gray-900">Frequently Purchased Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {mockProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white border rounded-2xl shadow-sm p-4 flex flex-col items-center text-center group transition hover:shadow-lg"
            >
              <img src={prod.image} alt={prod.name} className="w-20 h-20 rounded-lg object-cover mb-2" />
              <div className="font-semibold text-gray-900">{prod.name}</div>
              <div className="text-xl font-bold text-black mb-1">${prod.price}</div>
              <div className="flex gap-2">
                <button
                  className="flex items-center gap-1 px-3 py-1 bg-black text-white rounded-lg hover:bg-gray-900 transition"
                  onClick={() => addToCart(prod)}
                >
                  <ShoppingCart size={16} />
                  <span>Add to Cart</span>
                </button>
                <button
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg transition ${
                    isWishlisted(prod.id)
                      ? "bg-red-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-red-100"
                  }`}
                  onClick={() => toggleWishlist(prod)}
                >
                  <Heart size={16} fill={isWishlisted(prod.id) ? "#fff" : "none"} />
                  <span>{isWishlisted(prod.id) ? "Wishlisted" : "Wishlist"}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
