import axios from 'axios';
const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, 
});


api.interceptors.request.use(
  (config) => {
 
    const token = localStorage.getItem('token');
    
    // Agar token hai, toh Authorization header mein add karo
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log karo development mein (debugging ke liye)
    if (import.meta.env.DEV) {
      console.log('🚀 API Request:', config.method.toUpperCase(), config.url);
    }

    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => {
    // Success response - sirf data return karo
    if (import.meta.env.DEV) {
      console.log('✅ API Response:', response.config.url, response.data);
    }
    
   
    return response;
  },
  (error) => {
    // Error handling
    console.error('❌ API Error:', error.response?.data || error.message);

    // 401 Unauthorized - Token expired ya invalid
    if (error.response?.status === 401) {
      console.log('🔒 Unauthorized - Redirecting to login...');
      
      // Token remove karo
      localStorage.removeItem('token');
      
      // Login page pe redirect karo (agar login page pe nahi ho)
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }

    // 403 Forbidden
    if (error.response?.status === 403) {
      console.log('🚫 Forbidden - Access denied');
    }

    // 404 Not Found
    if (error.response?.status === 404) {
      console.log('🔍 Not Found - Resource does not exist');
    }

    // 500 Server Error
    if (error.response?.status === 500) {
      console.log('💥 Server Error - Something went wrong');
    }

    return Promise.reject(error);
  }
);

export default api;
