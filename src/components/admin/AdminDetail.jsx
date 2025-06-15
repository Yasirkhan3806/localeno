
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ADMIN_CREDENTIALS = {
  email: "admin@localverse.com",
  password: "admin123",
};

const AdminDetail = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      if (
        form.email === ADMIN_CREDENTIALS.email &&
        form.password === ADMIN_CREDENTIALS.password
      ) {
        setLoading(false);
        setError("");
        // Simulate successful admin login
        // You may want to add your logic here
        navigate("/admin");
      } else {
        setLoading(false);
        setError("Incorrect email or password.");
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#f8fafd] flex flex-col items-center justify-center px-4 py-16">
      {/* Header/Logo */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 rounded-xl bg-gray-900 flex items-center justify-center mb-4 shadow">
          <span className="text-white font-bold text-2xl">LV</span>
        </div>
        <h1 className="text-3xl font-semibold text-gray-900 mb-1">LocalVerse</h1>
        <div className="text-gray-500 text-base mb-0.5">Admin Portal</div>
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 flex flex-col gap-4"
        autoComplete="off"
      >
        <div>
          <label className="block text-gray-800 font-medium mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            autoFocus
            name="email"
            id="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            placeholder="admin@localverse.com"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition outline-none placeholder-gray-400 bg-white"
            required
          />
        </div>
        <div>
          <label className="block text-gray-800 font-medium mb-2" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              name="password"
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition outline-none placeholder-gray-400 bg-white pr-12"
              required
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 inset-y-0 flex items-center text-gray-400 hover:text-gray-700"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2 mb-1">
          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="checkbox"
              className="h-4 w-4 border-gray-300 rounded accent-gray-900 focus:ring-gray-900"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <span className="text-sm">Remember me</span>
          </label>
          <button
            type="button"
            tabIndex={-1}
            className="text-sm text-gray-500 hover:underline transition"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot password?
          </button>
        </div>
        {error && (
          <div className="text-center text-sm text-red-600 font-medium px-2">
            {error}
          </div>
        )}
        <button
          type="submit"
          className="w-full mt-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 rounded-lg text-base transition shadow-md focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in to Admin Portal"}
        </button>
        <div className="text-xs text-gray-400 text-center mt-3">
          Secure admin access for LocalVerse platform
        </div>
      </form>
    </div>
  );
};

export default AdminDetail;

