
import React, { useState, useRef } from "react";
import { Camera, Save, Lock, User, Settings as SettingsIcon } from "lucide-react";

const SettingsDetailPage = () => {
  const [profile, setProfile] = useState({
    profileImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&q=80",
    firstName: "Admin",
    lastName: "User",
    email: "admin@localena.com",
    phone: "+1 (555) 000-0000",
    role: "Super Administrator"
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const profileInputRef = useRef(null);

  const handleProfileChange = (key, value) => {
    setProfile(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handlePasswordChange = (key, value) => {
    setPasswords(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile(prev => ({
          ...prev,
          profileImg: e.target.result
        }));
      };
      reader.readAsDataURL(file);
      window.alert('Profile image updated successfully!');
    }
  };

  const handleSaveChanges = () => {
    window.alert(`Profile changes saved successfully!\n\nUpdated Information:\nName: ${profile.firstName} ${profile.lastName}\nEmail: ${profile.email}\nPhone: ${profile.phone}\nRole: ${profile.role}`);
  };

  const handleUpdatePassword = () => {
    if (!passwords.currentPassword || !passwords.newPassword || !passwords.confirmPassword) {
      window.alert('Please fill in all password fields.');
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      window.alert('New password and confirm password do not match.');
      return;
    }

    if (passwords.newPassword.length < 8) {
      window.alert('New password must be at least 8 characters long.');
      return;
    }

    window.alert('Password updated successfully!\n\nYour password has been changed. Please use the new password for future logins.');
    
    // Clear password fields
    setPasswords({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <SettingsIcon className="text-gray-700" size={32} />
          Admin Settings
        </h1>
        <p className="text-gray-600">Manage your administrator account settings and preferences</p>
      </div>

      {/* Profile Settings */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <User className="text-gray-700" size={24} />
          Profile Information
        </h2>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Profile Photo */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={profile.profileImg}
                alt="Admin Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-lg"
              />
              <button
                className="absolute bottom-0 right-0 bg-black text-white p-3 rounded-full border-4 border-white hover:bg-gray-700 transition shadow-lg"
                onClick={() => profileInputRef.current?.click()}
                type="button"
                aria-label="Change profile photo"
              >
                <Camera size={20} />
              </button>
              <input
                type="file"
                ref={profileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleProfileImageChange}
              />
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-lg text-gray-900">{profile.firstName} {profile.lastName}</h3>
              <p className="text-sm text-gray-500">{profile.role}</p>
            </div>
          </div>

          {/* Profile Form */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
                value={profile.firstName}
                onChange={(e) => handleProfileChange('firstName', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
                value={profile.lastName}
                onChange={(e) => handleProfileChange('lastName', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
                value={profile.email}
                onChange={(e) => handleProfileChange('email', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
                value={profile.phone}
                onChange={(e) => handleProfileChange('phone', e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                value={profile.role}
                disabled
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleSaveChanges}
            className="flex items-center gap-2 px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition shadow-lg"
          >
            <Save size={20} />
            Save Changes
          </button>
        </div>
      </div>

      {/* Password Settings */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Lock className="text-gray-700" size={24} />
          Change Password
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showPasswords.current ? "text" : "password"}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition pr-12"
                value={passwords.currentPassword}
                onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                placeholder="Enter current password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black transition"
                onClick={() => togglePasswordVisibility('current')}
              >
                {showPasswords.current ? (
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeWidth="2" d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeWidth="2" d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/>
                    <path stroke="currentColor" strokeWidth="2" d="M4.5 19.5 19.5 4.5"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
            <div className="relative">
              <input
                type={showPasswords.new ? "text" : "password"}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition pr-12"
                value={passwords.newPassword}
                onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                placeholder="Enter new password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black transition"
                onClick={() => togglePasswordVisibility('new')}
              >
                {showPasswords.new ? (
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeWidth="2" d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeWidth="2" d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/>
                    <path stroke="currentColor" strokeWidth="2" d="M4.5 19.5 19.5 4.5"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? "text" : "password"}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition pr-12"
                value={passwords.confirmPassword}
                onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                placeholder="Confirm new password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black transition"
                onClick={() => togglePasswordVisibility('confirm')}
              >
                {showPasswords.confirm ? (
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeWidth="2" d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeWidth="2" d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/>
                    <path stroke="currentColor" strokeWidth="2" d="M4.5 19.5 19.5 4.5"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mt-6">
          <h4 className="font-semibold text-gray-900 mb-2">Password Requirements:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• At least 8 characters long</li>
            <li>• Include uppercase and lowercase letters</li>
            <li>• Include at least one number</li>
            <li>• Include at least one special character</li>
          </ul>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleUpdatePassword}
            className="flex items-center gap-2 px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition shadow-lg"
          >
            <Lock size={20} />
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsDetailPage;
