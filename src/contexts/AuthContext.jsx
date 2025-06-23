
import React, { createContext, useContext, useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

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
  //   // // Check if user is logged in from localStorage
  //   // const userData = localStorage.getItem('user');
  //   // const verificationStatus = localStorage.getItem('isVerified');
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        setIsAuthenticated(true);
      }
        // You can also check email verification here if needed
        // setIsVerified(firebaseUser.emailVerified);
      
  //   if (userData) {
  //     // setUser(JSON.parse(userData));
  //     setIsAuthenticated(true);
  //     // setIsVerified(verificationStatus === 'true');
  //   }
    setLoading(false);
      });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const login = (userData) => {
    // setUser(userData);
    setIsAuthenticated(true);
    // localStorage.setItem('user', JSON.stringify(userData));
  };



const logout = async () => {
  try {
    // Sign out from Firebase
    await signOut(auth);
    
    // Clear your local state
    setUser(null);
    setIsAuthenticated(false);
    // setIsVerified(false);
    localStorage.removeItem('user');
    localStorage.removeItem('isVerified');
    
    console.log('Successfully logged out');
  } catch (error) {
    console.error('Error signing out:', error);
    // You might want to show an error message to the user
  }
};
  // const verifyIdentity = () => {
  //   setIsVerified(true);
  //   localStorage.setItem('isVerified', 'true');
  // };

  const value = {

    isAuthenticated,
    // isVerified,
    loading,
    login,
    logout,
    // verifyIdentity
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
