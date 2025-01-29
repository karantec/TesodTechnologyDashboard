import React, { lazy, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { themeChange } from 'theme-change';

import initializeApp from './app/init';
import ForgotPasswordOTP from './features/user/ForgotOtp';
import ResetPassword from './features/user/ResetPassword';
import Address from './features/user/Address';

// Importing pages
const Layout = lazy(() => import('./containers/Layout'));
const Login = lazy(() => import('./pages/Login'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const Register = lazy(() => import('./pages/Register'));

// Initializing different libraries
initializeApp();

// Token check
const token = localStorage.getItem("token");

function App() {
  useEffect(() => {
    // Initialize daisy UI themes
    themeChange(false);
  }, []);

  return (
    <>
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
          <Route path="/app/*" element={token ? <Layout /> : <Navigate to="/" />} />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to={token ? "/app/welcome" : "/"} replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
