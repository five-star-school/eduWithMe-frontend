import axios from 'axios';
import { getCookie } from './cookie';

const apiUrl = process.env.REACT_APP_API_URL;
const instance = axios.create({
  
  baseURL: apiUrl,
  withCredentials: true,
});

instance.interceptors.request.use(
    (config) => {
      const token = getCookie('AccessToken');
      if (token) {
        config.headers['AccessToken'] = token;
      }
      return config;
    },
    (error) => Promise.reject(error)
);

export default instance;