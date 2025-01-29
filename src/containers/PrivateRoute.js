import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

const PrivateRoute = () => {
//     const [loading, setLoading] = useState(true); // Track loading state
//     const [isAuthenticated, setIsAuthenticated] = useState(false); // State to hold the authentication status

//     useEffect(() => {
//         const token = localStorage.getItem("token");
        
//         // Log the token to the console
//         if (token) {
//             console.log("Token found:", token);
//             setIsAuthenticated(true);
//         } else {
//             console.log("No token found");
//         }

//         setLoading(false); // Stop loading after the check
//     }, []);

//     // Show loading state until token check is complete
//     if (loading) {
//         return <div>Loading...</div>; // Or a spinner/loading indicator
//     }

//     // If authenticated, render child components; otherwise, navigate to login page
//     return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
// };
return <Outlet/>;
}

export default PrivateRoute;
