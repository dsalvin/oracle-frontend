import axios from 'axios';

console.log("API Base URL:", import.meta.env.VITE_API_BASE_URL);

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
});

// This function will be called by our components to set up the interceptor
export const setupInterceptors = (auth) => {

  // Add a request interceptor to include the token in every request
  apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('oracle_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  }, error => {
    return Promise.reject(error);
  });

  // Add a response interceptor to handle 401 errors globally
  apiClient.interceptors.response.use(response => {
    return response;
  }, error => {
    // If the error is a 401 (Unauthorized), the token is likely expired or invalid
    if (error.response && error.response.status === 401) {
      // Use the logout function from AuthContext
      auth.logout();
      // Redirect to login page
      window.location = '/login?sessionExpired=true';
    }
    return Promise.reject(error);
  });
};

export default apiClient;