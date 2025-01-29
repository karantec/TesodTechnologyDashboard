import React, { lazy, useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { themeChange } from 'theme-change';

import initializeApp from './app/init';
import ForgotPasswordOTP from './features/user/ForgotOtp';
import ResetPassword from './features/user/ResetPassword';
import Address from './features/user/Address';
import { AuthProvider } from './app/AuthContext';
import PrivateRoute from './containers/PrivateRoute';


// Importing pages
const Layout = lazy(() => import('./containers/Layout'));
const Login = lazy(() => import('./pages/Login'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const Register = lazy(() => import('./pages/Register'));

// Initializing different libraries
initializeApp();

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize daisy UI themes
    themeChange(false);

    setTimeout(() => {
      setLoading(false);
    }, 500); // Simulate loading delay
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthProvider> {/* Wrap the entire app with AuthProvider */}
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/Verify-otp" element={<ForgotPasswordOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/address" element={<Address />} />
          
          {/* Protected Routes */}
          <Route
            path="/app/*"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
