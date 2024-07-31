import React, { createContext, useState } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('AccessToken');
  };

  return (
      <AuthContext.Provider value={{ user, login, logout }}>
        {children}
      </AuthContext.Provider>
  );
};