import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();

  // Check if there's a token in localStorage on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      // Optionally, you could verify the token with the backend here
      setAuth({ token: storedToken });
    }
  }, []);

  const login = (data) => {
    try {
      setAuth(data);
      localStorage.setItem('authToken', data.token); // Store the token in localStorage
    } catch (error) {
      console.error('Failed to login:', error);
    }
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem('authToken'); // Remove the token from localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
