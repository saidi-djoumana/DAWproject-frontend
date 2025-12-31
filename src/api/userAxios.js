import axios from 'axios';

const userApi = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

userApi.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem('userToken'); // only user token
    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    } else {
      // Optional: throw error if no token exists
      console.warn('No user token found for userApi request');
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default userApi;
