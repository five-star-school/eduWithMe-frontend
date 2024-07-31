import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
  baseURL: 'http://localhost:8888',
  withCredentials: true,
});

instance.interceptors.request.use(
    (config) => {
      const token = Cookies.get('AccessToken');  // 쿠키에서 AccessToken 가져오기
      if (token) {
        config.headers['AccessToken'] = token;  // 헤더에 AccessToken 추가
      }
      return config;
    },
    (error) => Promise.reject(error)
);

export default instance;
