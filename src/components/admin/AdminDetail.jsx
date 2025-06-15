
import React from "react";

const AdminDetail = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
    <div className="bg-white shadow-xl rounded-2xl px-8 py-10 flex flex-col items-center max-w-lg w-full">
      <h1 className="text-3xl font-bold mb-2 text-gray-900">Welcome, Admin</h1>
      <p className="text-gray-700 text-center mb-2">This is your admin detail page.<br />Expand this section to add admin functionality.</p>
      <span className="mt-4 bg-yellow-100 text-yellow-800 text-sm px-4 py-2 rounded-full font-mono">
        admin panel
      </span>
    </div>
  </div>
);

export default AdminDetail;
