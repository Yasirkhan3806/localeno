import React, { useState, useRef, useEffect } from "react";
import { Bell, Globe, Shield, Lock, Trash2, Store, Camera } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useAuth } from "../../../contexts/AuthContext";
import {useUser } from '../../../contexts/UserContext'
import { updateCurrentUserData } from "../../../Firebase Functions/authFunctions";
import {auth} from '../../../config/firebaseConfig'

const languages = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" },
  { value: "de", label: "Deutsch" },
];

const currencies = [
  { value: "USD", label: "USD ($)" },
  { value: "EUR", label: "EUR (€)" },
  { value: "GBP", label: "GBP (£)" },
  { value: "CAD", label: "CAD (C$)" },
];

const genders = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

export default function SellerSettings() {
  // const { user } = useAuth();
  const {userData} = useUser();
  const [profile2,setProfile2] = useState({})
  // Profile state
  const [profile, setProfile] = useState({
    avatar: "https://randomuser.me/api/portraits/men/25.jpg", // Demo image
    firstName: "John",
    lastName: "Seller",
    email: "john.seller@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-01-15",
    gender: "male",
    storeName: "John's Electronics Store",
    address: "123 Main St, New York, NY 10001",
    bio: "Experienced electronics seller with over 5 years in the marketplace. Specializing in laptops, cameras, and tech accessories.",
  });
  const profileInputRef = useRef(null);
  useEffect(() => {
    console.log(userData);
    const user = userData.filter((user)=> user.userId == auth?.currentUser?.uid)
    setProfile(user[0])
    // console.log(profile?.sellerInfo.shopName)
  }, [userData]);

  // Main state for all checkboxes and fields
  const [settings, setSettings] = useState({
    // Notification
    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: false,
    orderUpdates: true,
    newReviews: true,
    chatMessages: true,
    // Privacy
    profileVisibility: "public",
    showEmail: false,
    showPhone: false,
    // Display
    language: "en",
    currency: "USD",
    darkMode: false,
    // Security
    twoFactor: false,
    loginAlerts: true,
    // Password
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    passwordVisible: {
      current: false,
      new: false,
      confirm: false,
    },
  });

  const [deleteDialog, setDeleteDialog] = useState(false);

  const handleChange = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Handle profile changes
  const handleProfileChange = async(key, value) => {
    setProfile((prev) => ({
      ...prev,
      [key]: value,
    }));
  
  };

  // Handle profile image upload
 const handleProfileImg = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "localenoUser");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dwheinvov/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      if (data.secure_url) {
        setProfile((prev) => ({
          ...prev,
          avatar: data.secure_url,
        }));
      }
    } catch (err) {
      console.error("Cloudinary upload failed:", err);
    }
  };

  // Toggle password visibility
  const togglePasswordVisible = (field) => {
    setSettings((prev) => ({
      ...prev,
      passwordVisible: {
        ...prev.passwordVisible,
        [field]: !prev.passwordVisible[field],
      },
    }));
  };

  // Utility for select options
  const renderOptions = (opts) =>
    opts.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ));

  // --- Main return ---
  return (
    <div className="max-w-3xl mx-auto w-full space-y-8 pb-12">
      {/* Profile Information Card */}
      <section className="bg-white rounded-2xl shadow px-8 py-9 border">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Profile Information
        </h2>
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
          {/* Profile Photo */}
          <div className="flex flex-col items-center gap-2 relative mb-4 min-w-[120px]">
            <div className="relative">
         <img
  src={profile?.avatar || "https://www.example.com/default.jpg"}
  alt="Profile"
  // className="h-12 w-12"
/>
              <button
                className="absolute bottom-0 right-0 bg-black text-white p-2 rounded-full border-2 border-white hover:bg-gray-700 transition"
                style={{ lineHeight: 0 }}
                onClick={() => profileInputRef.current.click()}
                type="button"
                aria-label="Upload profile photo"
              >
                <Camera size={18} />
              </button>
              <input
                type="file"
                ref={profileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleProfileImg}
              />
            </div>
            <div className="text-center mt-2">
              <div className="font-semibold text-lg text-gray-900">
                {profile?.firstName || "N/A"} {profile?.lastName || "N/A"}
              </div>
              <div className="text-sm text-gray-500">
                Click the camera icon to update your profile photo
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <form
            className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-5"
            onSubmit={(e) => {
              e.preventDefault();
            }}
            autoComplete="off"
          >
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                First Name
              </label>
              <Input
                value={profile?.firstName}
                onChange={(e) =>
                  handleProfileChange("firstName", e.target.value)
                }
                autoComplete="off"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Last Name
              </label>
              <Input
                value={profile?.lastName}
                onChange={(e) =>
                  handleProfileChange("lastName", e.target.value)
                }
                autoComplete="off"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <Input
                type="email"
                value={profile?.email}
                onChange={(e) => handleProfileChange("email", e.target.value)}
                autoComplete="off"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <Input
                value={profile?.phone || "No Phone Provided"}
                onChange={(e) => handleProfileChange("phone", e.target.value)}
                autoComplete="off"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Date of Birth
              </label>
              <Input
                type="date"
                value={profile?.dateOfBirth}
                onChange={(e) => handleProfileChange("dob", e.target.value)}
                autoComplete="off"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Gender
              </label>
              <select
                className="block w-full border-gray-300 rounded-md px-4 py-2 bg-white focus:ring-2 focus:ring-black focus:outline-none"
                value={profile?.gender}
                onChange={(e) => handleProfileChange("gender", e.target.value)}
              >
                {genders.map((g) => (
                  <option value={g.value} key={g.value}>
                    {g.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Store Name
              </label>
              <Input
                value={profile?.sellerInfo?.shopName || "No Store Name Provided"}
                onChange={(e) =>
                  handleProfileChange("storeName", e.target.value)
                }
                autoComplete="off"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Address
              </label>
              <Input
                value={profile?.sellerInfo?.address || "No Address Provided"}
                onChange={(e) => handleProfileChange("address", e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Store Bio
              </label>
              <Textarea
                value={profile?.bio}
                onChange={(e) => handleProfileChange("bio", e.target.value)}
                rows={3}
              />
            </div>
            <div className="md:col-span-2 flex justify-end mt-2">
              <Button
                type="submit"
                onClick={async()=> await updateCurrentUserData(profile)}
                className="bg-gray-900 text-white font-semibold px-6 py-2 rounded-lg hover:bg-black transition flex gap-2"
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <rect
                    x="3"
                    y="3"
                    width="7"
                    height="5"
                    rx="1"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <rect
                    x="3"
                    y="14"
                    width="7"
                    height="7"
                    rx="1"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <rect
                    x="14"
                    y="3"
                    width="7"
                    height="18"
                    rx="1"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                Save Profile
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Account Management Section */}
      <section className="bg-white rounded-2xl shadow px-8 py-7 border">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Account Management
        </h2>
        <div className="bg-red-50 border border-red-200 rounded-xl px-6 py-5 flex items-start gap-5">
          <div className="flex flex-col w-full">
            <div className="font-bold text-lg text-red-700 mb-1 flex items-center gap-2">
              <Trash2 className="text-red-700" size={22} /> Delete Account
            </div>
            <div className="text-red-700 mb-4 text-sm">
              Once you delete your account, there is no going back. This will
              permanently delete your profile, store, and all associated data.
            </div>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded-lg flex gap-2 w-fit"
              type="button"
              onClick={() => setDeleteDialog(true)}
            >
              <Trash2 size={18} /> Delete Account
            </Button>
          </div>
        </div>
      </section>

      {/* Notification Settings */}
      <section className="bg-white rounded-2xl shadow px-8 py-7 space-y-5 border">
        <div className="flex items-center gap-2 mb-2">
          <Bell className="text-black" size={26} />
          <span className="font-extrabold text-xl text-black">
            Notification Settings
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-7 gap-x-12">
          {/* Communication Preferences */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Communication Preferences
            </h4>
            <div className="space-y-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) =>
                    handleChange("emailNotifications", e.target.checked)
                  }
                  className="accent-blue-600 w-5 h-5"
                />
                <span>Email Notifications</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={settings.pushNotifications}
                  onChange={(e) =>
                    handleChange("pushNotifications", e.target.checked)
                  }
                  className="accent-blue-600 w-5 h-5"
                />
                <span>Push Notifications</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={settings.smsNotifications}
                  onChange={(e) =>
                    handleChange("smsNotifications", e.target.checked)
                  }
                  className="accent-blue-600 w-5 h-5"
                />
                <span>SMS Notifications</span>
              </label>
            </div>
          </div>
          {/* Activity Notifications */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Activity Notifications
            </h4>
            <div className="space-y-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={settings.orderUpdates}
                  onChange={(e) =>
                    handleChange("orderUpdates", e.target.checked)
                  }
                  className="accent-blue-600 w-5 h-5"
                />
                <span>Order Updates</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={settings.newReviews}
                  onChange={(e) => handleChange("newReviews", e.target.checked)}
                  className="accent-blue-600 w-5 h-5"
                />
                <span>New Reviews</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={settings.chatMessages}
                  onChange={(e) =>
                    handleChange("chatMessages", e.target.checked)
                  }
                  className="accent-blue-600 w-5 h-5"
                />
                <span>Chat Messages</span>
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Settings */}
      <section className="bg-white rounded-2xl shadow px-8 py-7 space-y-5 border">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="text-black" size={25} />
          <span className="font-extrabold text-xl text-black">
            Privacy Settings
          </span>
        </div>
        <div className="space-y-3">
          <div>
            <label
              className="block font-semibold text-gray-900 mb-2 text-sm"
              htmlFor="profileVisibility"
            >
              Profile Visibility
            </label>
            <select
              id="profileVisibility"
              className="block w-full border-gray-300 rounded-md px-4 py-2 bg-white focus:ring-2 focus:ring-black focus:outline-none"
              value={settings.profileVisibility}
              onChange={(e) =>
                handleChange("profileVisibility", e.target.value)
              }
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="friends">Friends Only</option>
            </select>
          </div>
          <div className="flex flex-col md:flex-row gap-5">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.showEmail}
                onChange={(e) => handleChange("showEmail", e.target.checked)}
                className="accent-blue-600 w-5 h-5"
              />
              <span>Show Email Address</span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.showPhone}
                onChange={(e) => handleChange("showPhone", e.target.checked)}
                className="accent-blue-600 w-5 h-5"
              />
              <span>Show Phone Number</span>
            </label>
          </div>
        </div>
      </section>

      {/* Display Settings */}
      <section className="bg-white rounded-2xl shadow px-8 py-7 space-y-5 border">
        <div className="flex items-center gap-2 mb-2">
          <Globe className="text-black" size={25} />
          <span className="font-extrabold text-xl text-black">
            Display Settings
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              className="block font-semibold text-gray-900 mb-2 text-sm"
              htmlFor="language"
            >
              Language
            </label>
            <select
              id="language"
              className="block w-full border-gray-300 rounded-md px-4 py-2 bg-white focus:ring-2 focus:ring-black focus:outline-none"
              value={settings.language}
              onChange={(e) => handleChange("language", e.target.value)}
            >
              {renderOptions(languages)}
            </select>
          </div>
          <div>
            <label
              className="block font-semibold text-gray-900 mb-2 text-sm"
              htmlFor="currency"
            >
              Currency
            </label>
            <select
              id="currency"
              className="block w-full border-gray-300 rounded-md px-4 py-2 bg-white focus:ring-2 focus:ring-black focus:outline-none"
              value={settings.currency}
              onChange={(e) => handleChange("currency", e.target.value)}
            >
              {renderOptions(currencies)}
            </select>
          </div>
        </div>
        <div className="mt-3 flex items-center">
          <span className="mr-4 flex items-center gap-1">
            <svg width="20" height="20" fill="none" className="inline">
              <circle cx="10" cy="10" r="9" stroke="#888" strokeWidth="2" />
              <circle cx="10" cy="10" r="4" stroke="#888" strokeWidth="2" />
            </svg>
            <span className="font-medium text-gray-900">Dark Mode</span>
          </span>
          <Switch
            checked={settings.darkMode}
            onCheckedChange={(v) => handleChange("darkMode", v)}
          />
        </div>
      </section>

      {/* Security Settings */}
      <section className="bg-white rounded-2xl shadow px-8 py-7 space-y-5 border">
        <div className="flex items-center gap-2 mb-2">
          <Lock className="text-black" size={25} />
          <span className="font-extrabold text-xl text-black">
            Security Settings
          </span>
        </div>
        <div className="flex flex-col md:flex-row gap-7">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={settings.twoFactor}
              onChange={(e) => handleChange("twoFactor", e.target.checked)}
              className="accent-blue-600 w-5 h-5"
            />
            <span>Two-Factor Authentication</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={settings.loginAlerts}
              onChange={(e) => handleChange("loginAlerts", e.target.checked)}
              className="accent-blue-600 w-5 h-5"
            />
            <span>Login Alerts</span>
          </label>
        </div>
        {/* Change Password */}
        <h4 className="font-bold text-lg mt-6 mb-2">Change Password</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-1">
          <div>
            <label className="block mb-1 font-medium text-gray-800 text-sm">
              Current Password
            </label>
            <div className="relative">
              <Input
                type={settings.passwordVisible.current ? "text" : "password"}
                value={settings.currentPassword}
                onChange={(e) =>
                  handleChange("currentPassword", e.target.value)
                }
                className="pr-12"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="absolute right-2 top-1.5 text-gray-500 hover:text-black"
                tabIndex={-1}
                onClick={() => togglePasswordVisible("current")}
                aria-label={settings.passwordVisible.current ? "Hide" : "Show"}
              >
                {settings.passwordVisible.current ? (
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                    <path
                      stroke="currentColor"
                      strokeWidth="2"
                      d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                ) : (
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                    <path
                      stroke="currentColor"
                      strokeWidth="2"
                      d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
                    />
                    <path
                      stroke="currentColor"
                      strokeWidth="2"
                      d="M4.5 19.5 19.5 4.5"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-800 text-sm">
              New Password
            </label>
            <div className="relative">
              <Input
                type={settings.passwordVisible.new ? "text" : "password"}
                value={settings.newPassword}
                onChange={(e) => handleChange("newPassword", e.target.value)}
                className="pr-12"
                autoComplete="new-password"
              />
              <button
                type="button"
                className="absolute right-2 top-1.5 text-gray-500 hover:text-black"
                tabIndex={-1}
                onClick={() => togglePasswordVisible("new")}
                aria-label={settings.passwordVisible.new ? "Hide" : "Show"}
              >
                {settings.passwordVisible.new ? (
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                    <path
                      stroke="currentColor"
                      strokeWidth="2"
                      d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                ) : (
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                    <path
                      stroke="currentColor"
                      strokeWidth="2"
                      d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
                    />
                    <path
                      stroke="currentColor"
                      strokeWidth="2"
                      d="M4.5 19.5 19.5 4.5"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-800 text-sm">
              Confirm New Password
            </label>
            <div className="relative">
              <Input
                type={settings.passwordVisible.confirm ? "text" : "password"}
                value={settings.confirmPassword}
                onChange={(e) =>
                  handleChange("confirmPassword", e.target.value)
                }
                className="pr-12"
                autoComplete="new-password"
              />
              <button
                type="button"
                className="absolute right-2 top-1.5 text-gray-500 hover:text-black"
                tabIndex={-1}
                onClick={() => togglePasswordVisible("confirm")}
                aria-label={settings.passwordVisible.confirm ? "Hide" : "Show"}
              >
                {settings.passwordVisible.confirm ? (
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                    <path
                      stroke="currentColor"
                      strokeWidth="2"
                      d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                ) : (
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                    <path
                      stroke="currentColor"
                      strokeWidth="2"
                      d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
                    />
                    <path
                      stroke="currentColor"
                      strokeWidth="2"
                      d="M4.5 19.5 19.5 4.5"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        {/* Password Requirements + Change Btn */}
        <div className="flex items-start gap-5 mt-4 flex-col md:flex-row md:items-end md:justify-between">
          <div className="bg-gray-50 rounded-lg px-5 py-3 border w-full md:w-auto">
            <p className="font-bold mb-1 text-gray-800">
              Password Requirements:
            </p>
            <ul className="list-disc ml-5 text-sm text-gray-700 space-y-0.5">
              <li>At least 8 characters long</li>
              <li>Include uppercase and lowercase letters</li>
              <li>Include at least one number</li>
              <li>Include at least one special character</li>
            </ul>
          </div>
          <button
            className="bg-gray-900 text-white px-6 mt-3 md:mt-0 py-2 font-semibold rounded-lg hover:bg-black transition min-w-[160px]"
            type="button"
          >
            Change Password
          </button>
        </div>
      </section>

      {/* Store Management */}
      <section className="bg-white rounded-2xl shadow px-8 py-7 border">
        <div className="flex items-center gap-2 mb-3">
          <Store className="text-black" size={24} />
          <span className="font-extrabold text-xl text-black">
            Store Management
          </span>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl px-6 py-5 flex items-start gap-5 mb-3">
          <Trash2 className="text-red-700 mt-1" size={26} />
          <div>
            <div className="font-bold text-lg text-red-700 mb-1">
              Delete Store
            </div>
            <div className="text-red-700 mb-5">
              Once you delete your store, there is no going back. This will
              permanently delete all your products, rental history, reviews, and
              customer data.
            </div>
            <button
              className="bg-red-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-red-700 transition flex gap-2 items-center"
              onClick={() => setDeleteDialog(true)}
              type="button"
            >
              <Trash2 size={18} /> Delete Store
            </button>
          </div>
        </div>
      </section>
      {/* Save All Settings button */}
      <div className="flex justify-end">
        <button className="bg-gray-900 text-white px-7 py-3 rounded-xl font-semibold hover:bg-black transition flex gap-2 items-center">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
            <rect
              x="3"
              y="3"
              width="7"
              height="5"
              rx="1"
              stroke="currentColor"
              strokeWidth="2"
            />
            <rect
              x="3"
              y="14"
              width="7"
              height="7"
              rx="1"
              stroke="currentColor"
              strokeWidth="2"
            />
            <rect
              x="14"
              y="3"
              width="7"
              height="18"
              rx="1"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          Save All Settings
        </button>
      </div>
    </div>
  );
}
