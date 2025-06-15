
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock, ArrowLeft, User } from 'lucide-react';

const ROLES = [
  { key: 'customer', label: 'Sign in as Customer' },
  { key: 'seller', label: 'Sign in as Seller' },
  { key: 'admin', label: 'Sign in as Admin' },
];

const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin123",
};

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    adminUsername: '',
    adminPassword: '',
  });
  // Read mode from localStorage on load, default to customer
  const [mode, setMode] = useState(
    () => localStorage.getItem('loginMode') || 'customer'
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [adminError, setAdminError] = useState('');

  useEffect(() => {
    localStorage.setItem('loginMode', mode);
  }, [mode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (mode === 'admin') {
      // Admin login logic
      setTimeout(() => {
        if (
          formData.adminUsername === ADMIN_CREDENTIALS.username &&
          formData.adminPassword === ADMIN_CREDENTIALS.password
        ) {
          setAdminError('');
          // Simulate admin login - no user context
          setLoading(false);
          navigate('/admin');
        } else {
          setLoading(false);
          setAdminError('Incorrect admin username or password.');
        }
      }, 600);
      return;
    }

    // Customer/Seller login logic
    setTimeout(() => {
      const userData = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: formData.email,
        accountType: mode,
        avatar: null
      };
      login(userData);
      setLoading(false);
      if (mode === 'seller') {
        navigate('/seller/dashboard');
      } else {
        navigate('/user/home');
      }
    }, 1000);
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    // Implement social login logic
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Mode Toggle Buttons */}
        <div className="flex justify-center gap-2 mb-6">
          {ROLES.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setMode(key)}
              className={`px-4 py-2 rounded-full font-semibold transition-colors text-sm border
                ${
                  mode === key
                    ? "bg-black text-white border-black shadow"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                }
                focus:outline-none focus:ring-2 focus:ring-black`}
              style={{ minWidth: 140 }}
              data-testid={`login-mode-${key}`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </button>
          <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-8">
          {mode !== 'admin' && (
            <>
              {/* Social Login Buttons */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => handleSocialLogin('google')}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" className="w-5 h-5 mr-3" />
                  Continue with Google
                </button>
                <button
                  onClick={() => handleSocialLogin('facebook')}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg" alt="Facebook" className="w-5 h-5 mr-3" />
                  Continue with Facebook
                </button>
              </div>
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with email</span>
                </div>
              </div>
            </>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'admin' ? (
              <>
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
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <Link to="/forgot-password" className="text-sm text-black hover:underline">
                    Forgot password?
                  </Link>
                </div>
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
                  style={{
                    letterSpacing: '0.5px'
                  }}
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>
              </>
            )}
          </form>
          {mode !== 'admin' && (
            <p className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-black font-semibold hover:underline">
                Sign up here
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

