
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const userData = localStorage.getItem('user');
    const verificationStatus = localStorage.getItem('isVerified');
    
    if (userData) {
      setUser(JSON.parse(userData));
      setIsAuthenticated(true);
      setIsVerified(verificationStatus === 'true');
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsVerified(false);
    localStorage.removeItem('user');
    localStorage.removeItem('isVerified');
  };

  const verifyIdentity = () => {
    setIsVerified(true);
    localStorage.setItem('isVerified', 'true');
  };

  const value = {
    user,
    isAuthenticated,
    isVerified,
    loading,
    login,
    logout,
    verifyIdentity
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
