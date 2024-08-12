import axios from 'axios';
import { getCookie } from './cookie';

const instance = axios.create({
  baseURL: 'https://eduwithme.com',
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