// src/lib/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + '/api', // ✅ Environment-safe + organized routing
  withCredentials: true, // ✅ Sends secure cookies for login sessions
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default axiosInstance;
