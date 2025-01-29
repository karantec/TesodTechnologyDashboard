import React, { lazy, useEffect, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { themeChange } from "theme-change";
import initializeApp from "./app/init";
import ForgotPasswordOTP from "./features/user/ForgotOtp";
import ResetPassword from "./features/user/ResetPassword";
import Address from "./features/user/Address";
import PrivateRoute from "./containers/PrivateRoute";

// Importing pages (Lazy Loading)
const Layout = lazy(() => import("./containers/Layout"));
const Login = lazy(() => import("./pages/Login"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Register = lazy(() => import("./pages/Register"));

// Initialize external libraries
initializeApp();

function App() {
    useEffect(() => {
        themeChange(false);
    }, []);

    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Login />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/Verify-otp" element={<ForgotPasswordOTP />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/register" element={<Register />} />
                    

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
            </Suspense>
        </Router>
    );
}

export default App;
