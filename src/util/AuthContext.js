// src/util/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from '../util/axiosConfig';
import { getCookie } from './cookie';
import Cookies from 'js-cookie';

export const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = getCookie('AccessToken');
      if (token) {
        try {
          const response = await axios.get('/profiles');
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
      setUser(response.data.data);
    } catch (error) {
      console.error('Failed to fetch user profile after login:', error);
    }
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('AccessToken');
    Cookies.remove('RefreshToken');
    delete axios.defaults.headers.common['AccessToken'];
  };

  return (
      <AuthContext.Provider value={{ user, login, logout }}>
        {children}
      </AuthContext.Provider>
  );
};