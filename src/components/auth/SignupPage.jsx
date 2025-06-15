import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock, User, Calendar, ArrowLeft, Building, ShoppingBag } from 'lucide-react';

const SignupPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    accountType: 'customer',
    phone: '',
    address: '',
    dailyOrderVolume: '',
    businessOpenTime: '',
    businessCloseTime: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setLoading(true);
    
    // Simulate signup API call
    setTimeout(() => {
      const userData = {
        id: Date.now().toString(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        accountType: formData.accountType,
        dateOfBirth: formData.dateOfBirth,
        phone: formData.phone,
        address: formData.address,
        avatar: null,
        sellerInfo:
          formData.accountType === 'seller'
            ? {
                dailyOrderVolume: formData.dailyOrderVolume,
                businessOpenTime: formData.businessOpenTime,
                businessCloseTime: formData.businessCloseTime
              }
            : null
      };
      
      login(userData);
      setLoading(false);
      navigate('/user/home');
    }, 1000);
  };

  const handleSocialSignup = (provider) => {
    console.log(`Signup with ${provider}`);
    // Implement social signup logic
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </button>
          
          <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-2 text-gray-600">Join our marketplace today</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8">
          {/* Account Type Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Account Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, accountType: 'customer' })}
                className={`p-4 border-2 rounded-xl transition-all ${
                  formData.accountType === 'customer'
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <ShoppingBag className="mx-auto mb-2" size={24} />
                <div className="font-semibold">Customer</div>
                <div className="text-sm opacity-75">Buy and rent products</div>
              </button>
              
              <button
                type="button"
                onClick={() => setFormData({ ...formData, accountType: 'seller' })}
                className={`p-4 border-2 rounded-xl transition-all ${
                  formData.accountType === 'seller'
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <Building className="mx-auto mb-2" size={24} />
                <div className="font-semibold">Seller</div>
                <div className="text-sm opacity-75">Sell your products</div>
              </button>
            </div>
          </div>

          {/* Social Signup Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleSocialSignup('google')}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" className="w-5 h-5 mr-3" />
              Continue with Google
            </button>
            <button
              onClick={() => handleSocialSignup('facebook')}
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

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="First name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Last name"
                  />
                </div>
              </div>
            </div>

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
                Date of Birth
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="date"
                  required
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
            </div>

            {/* Seller-specific daily questions */}
            {formData.accountType === 'seller' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Average Daily Order Volume
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.dailyOrderVolume}
                    onChange={(e) => setFormData({ ...formData, dailyOrderVolume: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="e.g. 25"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Open Time
                  </label>
                  <input
                    type="time"
                    value={formData.businessOpenTime}
                    onChange={(e) => setFormData({ ...formData, businessOpenTime: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Close Time
                  </label>
                  <input
                    type="time"
                    value={formData.businessCloseTime}
                    onChange={(e) => setFormData({ ...formData, businessCloseTime: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
                    required
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    placeholder="Create password"
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Confirm password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 px-4 rounded-xl font-semibold hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-black font-semibold hover:underline">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
