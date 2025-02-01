import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LandingIntro from './LandingIntro';
import ErrorText from '../../components/Typography/ErrorText';
import InputText from '../../components/Input/InputText';

function Login() {
    const INITIAL_LOGIN_OBJ = {
        username: "admin",
        password: "admin"
    };

    const ADMIN_CREDENTIALS = {
        username: "admin",
        password: "admin" // Admin credentials stored as username and password
    };

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const submitForm = (e) => {
        e.preventDefault();
        setErrorMessage("");
        
        const { username, password } = loginObj;

        // Basic validation
        if (username.trim() === "") return setErrorMessage("Username is required!");
        if (password.trim() === "") return setErrorMessage("Password is required!");

        setLoading(true);
        
        // Custom admin authentication logic
        setTimeout(() => {
            if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
                navigate('/app/welcome'); // Navigate to dashboard without storing a token
            } else {
                setErrorMessage("Invalid username or password.");
            }
            setLoading(false);
        }, 1000);
    };

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("");
        setLoginObj({ ...loginObj, [updateType]: value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center py-8">
            <div className="card mx-auto w-full max-w-lg shadow-xl rounded-xl overflow-hidden">
                <div className="grid md:grid-cols-2 grid-cols-1 bg-base-100 rounded-xl">
                    <div className="relative hidden md:block">
                        <img
                            src="Designer2.jpeg"
                            alt="Login Image"
                            className="w-full h-full object-cover rounded-l-xl"
                        />
                        <div className="absolute inset-0 bg-black opacity-30"></div>
                    </div>
                    <div className='py-16 px-10'>
                        <h2 className='text-3xl font-semibold mb-4 text-center text-primary'>Login</h2>
                        <form onSubmit={submitForm}>
                            <div className="mb-6">
                                <InputText
                                    defaultValue={loginObj.username}
                                    type="text"
                                    updateType="username"
                                    containerStyle="mt-4"
                                    labelTitle="Username"
                                    updateFormValue={updateFormValue}
                                />
                                <div className="relative mt-4">
                                    <InputText
                                        defaultValue={loginObj.password}
                                        type={showPassword ? "text" : "password"}
                                        updateType="password"
                                        containerStyle="mt-4"
                                        labelTitle="Password"
                                        updateFormValue={updateFormValue}
                                    />
                                    <button
                                        type="button"
                                        className="absolute top-1/2 mt-4 right-3 transform -translate-y-1/2"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? "🙈" : "👁️"}
                                    </button>
                                </div>
                            </div>

                            <div className='text-right text-primary'>
                                <Link to="/forgot-password">
                                    <span className="text-sm inline-block hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Forgot Password?</span>
                                </Link>
                            </div>

                            <ErrorText styleClass="mt-6">{errorMessage}</ErrorText>
                            <button type="submit" className={"btn mt-6 w-full bg-orange-500 text-white" + (loading ? " loading" : "")}>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
