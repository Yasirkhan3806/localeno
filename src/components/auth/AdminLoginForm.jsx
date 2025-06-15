
import React, { useState } from 'react';
import { Eye, EyeOff, User, Lock } from 'lucide-react';

const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin123",
};

const AdminLoginForm = ({ formData, setFormData, onSubmit, loading, adminError }) => {
  const [showAdminPassword, setShowAdminPassword] = useState(false);

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Admin Username
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            required
            value={formData.adminUsername}
            onChange={(e) =>
              setFormData({ ...formData, adminUsername: e.target.value })
            }
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
            placeholder="Enter admin username"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Admin Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type={showAdminPassword ? 'text' : 'password'}
            required
            value={formData.adminPassword}
            onChange={(e) =>
              setFormData({ ...formData, adminPassword: e.target.value })
            }
            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
            placeholder="Enter admin password"
          />
          <button
            type="button"
            onClick={() => setShowAdminPassword((v) => !v)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showAdminPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>
      <div className="mb-2">
        <div className="bg-gray-50 border border-gray-200 rounded-md px-4 py-2 text-xs text-gray-600 text-center">
          <div className="mb-1 font-semibold">Admin Login Details</div>
          <div>
            <span className="font-mono">Username: <b>{ADMIN_CREDENTIALS.username}</b></span>
          </div>
          <div>
            <span className="font-mono">Password: <b>{ADMIN_CREDENTIALS.password}</b></span>
          </div>
        </div>
      </div>
      {adminError && (
        <div className="text-sm text-red-600 text-center">{adminError}</div>
      )}
      <button
        type="submit"
        disabled={loading}
        className={`
          w-full py-3 px-4 rounded-xl font-semibold transition
          bg-gradient-to-tr from-primary to-gray-900
          text-white shadow-lg
          hover:scale-105 hover:shadow-2xl hover:from-gray-900 hover:to-primary
          focus-visible:ring-4 focus-visible:ring-primary/40 focus-visible:ring-offset-2
          transition-transform duration-200 
          disabled:opacity-50 disabled:cursor-not-allowed
          animate-fade-in
        `}
        style={{ letterSpacing: '0.5px' }}
      >
        {loading ? 'Signing in...' : 'Sign In as Admin'}
      </button>
    </form>
  );
};

export default AdminLoginForm;
