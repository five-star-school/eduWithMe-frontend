import React, { useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../util/AuthContext';

function KakaoRedirect() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    const userId = searchParams.get('userId');

    if (token && userId) {
      // Set cookies
      document.cookie = `AccessToken=${token}; path=/; Secure; SameSite=Strict`;
      document.cookie = `userId=${userId}; path=/; Secure; SameSite=Strict`;

      // Update auth context
      login({ userId });

      // Redirect to main page
      navigate('/main');
    } else {
      console.error('Token or userId not found in URL');
      navigate('/login');
    }
  }, [location, login, navigate]);

  return <div>Redirecting...</div>;
}

export default KakaoRedirect;