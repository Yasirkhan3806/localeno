
import React from "react";

const Admin = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-bl from-gray-900 via-primary to-gray-200 py-12">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-700 mb-6">
          Welcome, Admin! You are now logged in. Here you can manage users, view analytics, and access all admin features.
        </p>
        <div className="flex flex-col gap-2">
          {/* Example Admin Actions */}
          <button className="bg-black text-white px-5 py-2 rounded-lg hover:bg-primary transition font-semibold">Manage Users</button>
          <button className="bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-primary transition font-semibold">View Analytics</button>
        </div>
      </div>
    </div>
  );
};

export default Admin;

