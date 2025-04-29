import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputText from '../../components/Input/InputText';
import ErrorText from '../../components/Typography/ErrorText';
import { loginUser } from '../../app/api';

function Login() {
    const INITIAL_LOGIN_OBJ = {
        email: '',
        password: ''
    };

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const submitForm = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        const { email, password } = loginObj;

        if (!email.trim()) return setErrorMessage('Email is required!');
        if (!password.trim()) return setErrorMessage('Password is required!');

        setLoading(true);

        try {
            const result = await loginUser(email, password);
            if (result.status) {
                navigate('/app/team');
            } else {
                setErrorMessage(result.message);
            }
        } catch (error) {
            setErrorMessage(error.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage('');
        setLoginObj({ ...loginObj, [updateType]: value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            {/* Full Page Loader */}
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-orange-500"></div>
                </div>
            )}

            {/* Login Form */}
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-white to-orange-200 px-4">
                <div className="w-full max-w-5xl mx-auto grid md:grid-cols-2 grid-cols-1 bg-white bg-opacity-80 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden animate-fadeIn">
                    {/* Image Section */}
                    <div className="hidden md:block relative">
                        <img
                            src="/logo2.png"
                            alt="Login Visual"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-30 rounded-l-3xl"></div>
                    </div>

                    {/* Form Section */}
                    <div className="p-10 flex flex-col justify-center">
                        <h2 className="text-4xl font-bold text-center text-orange-600 mb-8">Login</h2>
                        <form onSubmit={submitForm}>
                            <InputText
                                defaultValue={loginObj.email}
                                type="email"
                                updateType="email"
                                containerStyle="mb-6"
                                labelTitle="Email"
                                updateFormValue={updateFormValue}
                            />
                            <div className="relative mb-6">
                                <InputText
                                    defaultValue={loginObj.password}
                                    type={showPassword ? "text" : "password"}
                                    updateType="password"
                                    containerStyle=""
                                    labelTitle="Password"
                                    updateFormValue={updateFormValue}
                                />
                                <button
                                    type="button"
                                    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? "🙈" : "👁️"}
                                </button>
                            </div>

                            <div className="text-right text-sm text-orange-600 mb-4">
                                <Link to="/forgot-password" className="hover:underline">Forgot Password?</Link>
                            </div>

                            <ErrorText styleClass="mb-4">{errorMessage}</ErrorText>

                            <button
                                type="submit"
                                className="w-full py-3 rounded-lg bg-orange-500 text-white text-lg font-semibold shadow-md hover:bg-orange-600 transition-all duration-300 disabled:opacity-50"
                                disabled={loading}
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
