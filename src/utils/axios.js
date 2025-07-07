import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // update if you deploy
  withCredentials: true, // allows secure cookie usage
});

export default axiosInstance;
