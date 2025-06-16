
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ArrowLeft } from 'lucide-react';
import LoginModeToggle from './LoginModeToggle';
import SocialLoginButtons from './SocialLoginButtons';
import AdminLoginForm from './AdminLoginForm';
import UserLoginForm from './UserLoginForm';

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
      
      // Proper redirection based on account type
      if (mode === 'seller') {
        navigate('/seller/dashboard');
      } else if (mode === 'customer') {
        navigate('/user/home');
      }
    }, 1000);
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    // Implement social login logic
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 sm:space-y-8">
        {/* Mode Toggle Buttons */}
        <LoginModeToggle mode={mode} setMode={setMode} />
        
        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 sm:mb-6 text-sm sm:text-base"
          >
            <ArrowLeft size={18} className="mr-1 sm:mr-2" />
            Back to Home
          </button>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600">Sign in to your account</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8">
          {mode !== 'admin' && (
            <SocialLoginButtons onSocialLogin={handleSocialLogin} />
          )}
          
          {mode === 'admin' ? (
            <AdminLoginForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              loading={loading}
              adminError={adminError}
            />
          ) : (
            <UserLoginForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              loading={loading}
            />
          )}
          
          {mode !== 'admin' && (
            <p className="mt-6 text-center text-xs sm:text-sm text-gray-600">
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
