import axios from "axios";

// Base URL for your backend API
const BASE_URL = "http://44.211.243.116:30001/api/";

// Axios instance for default configurations
const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Handle errors globally (optional)
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error?.response?.data?.message || "Something went wrong");
    }
);

// Authentication APIs
export const loginUser = async (email, password) => {
    try {
        const response = await apiClient.post("super-admin/auth/login", { email, password });

        // Check if login was successful
        if (response.status === 200 && response.data.status) {
            // Save the token and other user info to localStorage (or state if needed)
            const { _token, name, email, roles } = response.data.data;
            const token = _token;
            localStorage.setItem("userName", name);  // Save token
            localStorage.setItem("token", token); // Optionally store other data
            localStorage.setItem("userEmail", email); 
            localStorage.setItem("userRoles", JSON.stringify(roles));

            return { status: true, message: response.data.message };
        } else {
            return { status: false, message: response.data.message || "Login failed" };
        }
    } catch (error) {
        // Handle any errors that occur during the API request
        return {
            status: false,
            message: error?.response?.data?.message || "Something went wrong",
        };
    }
};

export const registerUser = async (userData) => {
    const response = await apiClient.post("/auth/register", userData);
    return response.data;
};

export const forgotPassword = async (email) => {
    const response = await apiClient.post("/auth/forgot-password", { email });
    return response.data;
};

export const resetPassword = async (otp, newPassword) => {
    const response = await apiClient.post("/auth/reset-password", { otp, password: newPassword });
    return response.data;
};

// Utility API: Fetch Privacy Policy
export const fetchPrivacyPolicy = async () => {
    const response = await apiClient.get("super-admin/utility/privacy");
    return response.data; // Assuming the API returns an object with privacy policy content
};

// Export the Axios instance for general use
export { apiClient };
