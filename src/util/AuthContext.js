import React, { createContext, useState, useEffect } from 'react';
import axios from '../util/axiosConfig';
import { getCookie } from './cookie';

export const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

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
  };

  return (
      <AuthContext.Provider value={{ user, login, logout }}>
        {children}
      </AuthContext.Provider>
  );
};