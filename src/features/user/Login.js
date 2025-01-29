import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Import useNavigate

import ErrorText from "../../components/Typography/ErrorText";
import InputText from "../../components/Input/InputText";
import { loginUser } from "../../app/api";

function Login() {
    const navigate = useNavigate(); // ✅ Initialize navigate
    const INITIAL_LOGIN_OBJ = {
        email: "",
        password: ""
    };

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);

    const submitForm = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setLoading(true);

        const { email, password } = loginObj;

        if (email.trim() === "" || password.trim() === "") {
            setLoading(false);
            return setErrorMessage("Email and Password are required!");
        }

        try {
            // Use the loginUser function from the API utility file
            const data = await loginUser(email, password);
            console.log(data);
            // ✅ Save token and navigate after successful login
            navigate("/app/welcome"); // ✅ Navigate without reloading
        } catch (error) {
            // ❌ Handle API errors properly
            setErrorMessage(error);
        } finally {
            setLoading(false);
        }
    };

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("");
        setLoginObj({ ...loginObj, [updateType]: value });
    };

    return (
        <div className="min-h-screen bg-base-200 flex justify-center items-center">
            <div className="card w-full max-w-xl shadow-xl bg-base-100 rounded-xl">
                <div className="grid md:grid-cols-2 grid-cols-1">
                    <div className="hidden md:block">
                        <img src="Designer2.jpeg" alt="Dashwind Admin Template" className="w-full h-full object-cover rounded-l-xl"/>
                    </div>
                    <div className="py-24 px-10">
                        <h2 className="text-2xl font-semibold mb-2 text-center">Login</h2>
                        <form onSubmit={submitForm}>
                            <div className="mb-4">
                                <InputText
                                    defaultValue={loginObj.email}
                                    type="email"
                                    updateType="email"
                                    containerStyle="mt-4"
                                    labelTitle="Email"
                                    updateFormValue={updateFormValue}
                                />
                                <InputText
                                    defaultValue={loginObj.password}
                                    type="password"
                                    updateType="password"
                                    containerStyle="mt-4"
                                    labelTitle="Password"
                                    updateFormValue={updateFormValue}
                                />
                            </div>

                            <div className="text-right text-primary">
                                <Link to="/forgot-password">
                                    <span className="text-sm inline-block hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                                        Forgot Password?
                                    </span>
                                </Link>
                            </div>

                            <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                            <button 
                                type="submit" 
                                className={`btn mt-2 w-full bg-orange-500 text-white hover:bg-orange-600 ${loading ? "loading" : ""}`}
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
