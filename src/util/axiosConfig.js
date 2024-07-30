import axios from 'axios';
import { getCookie } from './cookie';

const instance = axios.create({
  baseURL: 'http://localhost:8888',
  withCredentials: true,
});

instance.interceptors.request.use(
    (config) => {
      const token = getCookie('AccessToken');  // 'AccessToken' 쿠키에서 토큰 가져오기
      if (token) {
        config.headers['AccessToken'] = token;  // 'AccessToken' 이름으로 헤더에 토큰 추가
      }
      return config;
    },
    (error) => Promise.reject(error)
);

export default instance;