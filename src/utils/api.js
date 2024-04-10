import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:1111',
  withCredentials: true, // Include credentials (cookies) in requests
});

export default axiosInstance;