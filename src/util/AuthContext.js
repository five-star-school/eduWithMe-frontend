import React, { createContext, useState, useEffect } from 'react';
import axios from '../util/axiosConfig';
import { getCookie } from './cookie';

export const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = getCookie('AccessToken');
      const userId = getCookie('userId');
      if (token && userId) {
        try {
          const response = await axios.get('/profiles');
          console.log('User profile fetched:', response.data);
          setUser(response.data.data);
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
        }
      }
      setLoading(false);
    };

    checkLoginStatus();
  }, []);

  const login = async (userData) => {
    setUser(userData);
    try {
      const response = await axios.get('/profiles');
      console.log('User profile fetched after login:', response.data);
      setUser(response.data.data);
    } catch (error) {
      console.error('Failed to fetch user profile after login:', error);
    }
  };

  const logout = () => {
    setUser(null);
    document.cookie = 'AccessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'userId=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
      <AuthContext.Provider value={{ user, login, logout }}>
        {children}
      </AuthContext.Provider>
  );
};