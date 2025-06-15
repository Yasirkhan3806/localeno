
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem("admin_logged_in") === "true";
    if (!adminLoggedIn) {
      navigate("/admin-login");
    }
  }, [navigate]);

  const handleAdminLogout = () => {
    localStorage.removeItem("admin_logged_in");
    navigate("/admin-login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <button
            onClick={handleAdminLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
        <hr className="mb-6"/>
        <div>
          <h2 className="text-xl font-semibold mb-2">Welcome, Admin!</h2>
          <p className="text-gray-700 mb-4">You are now logged in to the admin panel.</p>
          {/* Add your admin-only widgets, stats, tables, etc. here */}
          <div className="mt-6 text-gray-700">This is a demo admin panel page. Add your management features here!</div>
        </div>
      </div>
    </div>
  );
};
export default AdminPanel;
