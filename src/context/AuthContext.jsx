import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Initialize token from localStorage to stay logged in on refresh
  const [token, setToken] = useState(localStorage.getItem('oracle_token'));

  const saveToken = (userToken) => {
    localStorage.setItem('oracle_token', userToken);
    setToken(userToken);
  };

  const logout = () => {
    localStorage.removeItem('oracle_token');
    setToken(null);
  };

  const authValue = {
    token,
    saveToken,
    logout,
  };

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context easily
export const useAuth = () => {
  return useContext(AuthContext);
};