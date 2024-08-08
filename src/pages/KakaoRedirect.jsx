import React, { useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../util/AuthContext';
import axios from '../util/axiosConfig';

function KakaoRedirect() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    const userId = searchParams.get('userId');
    const nickName = searchParams.get('nickName');

    if (token && userId && nickName) {
      // 백엔드에서 전달받은 정보로 로그인 처리
      const decodedNickName = decodeURIComponent(nickName);
      document.cookie = `AccessToken=${token}; path=/; Secure; SameSite=Strict`;
      document.cookie = `userId=${userId}; path=/; Secure; SameSite=Strict`;
      login({ userId, nickName: decodedNickName });
      navigate('/main');
    } else {
      console.error('Login information not found in URL');
      navigate('/login');
    }
  }, [location, login, navigate]);

  return <div>카카오 로그인 처리 중...</div>;
}

export default KakaoRedirect;