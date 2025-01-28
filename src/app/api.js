
// Base URL for your backend API
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

// Attach token to headers dynamically
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        console.log("Token:", token);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Authentication APIs
export const loginUser = async (email, password) => {
    try {
        const response = await apiClient.post('super-admin/auth/login', { email, password });
        
        if (response.data?.status && response.data?.data?._token) {
            // Save token to localStorage
            localStorage.setItem('authToken', response.data.data._token);
            return response.data;
        } else {
            throw new Error(response.data?.message || 'Login failed');
        }
    } catch (error) {
        console.error("Error during login:", error.message || error);
        throw error;
    }
};

export const fetchPrivacyPolicy = async () => {
    try {
        const token = localStorage.getItem('authToken');
        console.log("Token retrieved:", token); // Log the token to verify it's there

        if (token) {
            const response = await apiClient.get('super-admin/utility/privacy', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Privacy policy fetched:", response);
            return response.data; // Assuming the API returns the privacy policy
        } else {
            throw new Error('No auth token found');
        }
    } catch (err) {
        console.error("Error fetching privacy policy:", err.response?.data || err.message);
        throw err;
    }
};

export { apiClient };