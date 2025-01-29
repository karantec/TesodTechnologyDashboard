import { useState } from 'react'
import { Link } from 'react-router-dom'
import LandingIntro from './LandingIntro'
import ErrorText from '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'

function Login() {
    const INITIAL_LOGIN_OBJ = {
        username: "",
        password: ""
    }

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ)

    const submitForm = (e) => {
        e.preventDefault()
        setErrorMessage("")

        const { username, password } = loginObj

        if (username.trim() === "") return setErrorMessage("Username is required!")
        if (password.trim() === "") return setErrorMessage("Password is required!")

        // Custom login validation
        if (username !== "vb@yopmail.com" || password !== "Test@123") {
            return setErrorMessage("Invalid username or password!")
        }

        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            // Save token or any flag in localStorage (if needed)
            localStorage.setItem("token", "RenderverseToken")
            window.location.href = '/app/welcome'
        }, 1000) // Simulate API call
    }

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("")
        setLoginObj({ ...loginObj, [updateType]: value })
    }

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
                                <InputText
                                    defaultValue={loginObj.password}
                                    type="password"
                                    updateType="password"
                                    containerStyle="mt-4"
                                    labelTitle="Password"
                                    updateFormValue={updateFormValue}
                                />
                            </div>

                            <div className='text-right text-primary'>
                                <Link to="/forgot-password">
                                    <span className="text-sm inline-block hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Forgot Password?</span>
                                </Link>
                            </div>

                            <ErrorText styleClass="mt-6">{errorMessage}</ErrorText>
                            <button type="submit" className={"btn mt-6 w-full btn-primary" + (loading ? " loading" : "")}>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
