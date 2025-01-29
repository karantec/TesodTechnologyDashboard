import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const token = localStorage.getItem("token"); // Check authentication

    return token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
