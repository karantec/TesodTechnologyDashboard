import React, { lazy, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { themeChange } from 'theme-change';
import initializeApp from './app/init';
import ForgotPasswordOTP from './features/user/ForgotOtp';
import ResetPassword from './features/user/ResetPassword';
import Address from './features/user/Address';
import PrivateRoute from './containers/PrivateRoute';
import InternalPage from './pages/protected/Dashboard';

// Importing pages
const Layout = lazy(() => import('./containers/Layout'));
const Login = lazy(() => import('./pages/Login'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const Register = lazy(() => import('./pages/Register'));

// Initializing different libraries
initializeApp();

function App() {
    useEffect(() => {
        themeChange(false);
    }, []);

    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/Verify-otp" element={<ForgotPasswordOTP />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/register" element={<Register />} />
                {/* <Route path="/app/PrivacyPolicy" element={<InternalPage />} /> */}
                {/* Protected Routes */}
                <Route
                    path="/address"
                    element={
                        <PrivateRoute>
                            <Address />
                        </PrivateRoute>
                    }
                />
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
    );
}

export default App;
