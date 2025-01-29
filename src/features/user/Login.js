import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LandingIntro from "./LandingIntro";
import ErrorText from "../../components/Typography/ErrorText";
import InputText from "../../components/Input/InputText";

function Login() {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loginObj, setLoginObj] = useState({ email: "", password: "" });

    const navigate = useNavigate(); // ✅ Use useNavigate()

    const submitForm = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        const { email, password } = loginObj;
        if (!email.trim()) return setErrorMessage("Email is required!");
        if (!password.trim()) return setErrorMessage("Password is required!");

        try {
            setLoading(true);
            const response = await axios.post(
                "http://44.211.243.116:30001/api/super-admin/auth/login",
                { email, password },
                { headers: { "Content-Type": "application/json" } }
            );

            // ✅ Save token & redirect
            localStorage.setItem("token", response.data.token);
            navigate("/app/welcome"); // Redirect to dashboard

        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("");
        setLoginObj({ ...loginObj, [updateType]: value });
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-5xl shadow-xl">
                <div className="grid md:grid-cols-2 grid-cols-1 bg-base-100 rounded-xl">
                    <div>
                        <LandingIntro />
                    </div>
                    <div className="py-24 px-10">
                        <h2 className="text-2xl font-semibold mb-2 text-center">Login</h2>
                        <form onSubmit={submitForm}>
                            <InputText type="text" updateType="email" labelTitle="Email" updateFormValue={updateFormValue} />
                            <InputText type="password" updateType="password" labelTitle="Password" updateFormValue={updateFormValue} />
                            <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                            <button type="submit" className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}>
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
