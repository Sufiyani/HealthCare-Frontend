import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../config/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await api.get('/auth/me');
      // Response format: { success: true, message: "...", data: { user: {...} } }
      setUser(response.data.data.user);
    } catch (error) {
      console.error('❌ Auth check failed:', error);
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    
    // Response: { success: true, message: "Login successful", data: { token, user } }
    const { token, user } = response.data.data;
    
    // First set token
    localStorage.setItem('token', token);
    
    // Then set user
    setUser(user);
    
    // Set loading false
    setLoading(false);
    
    console.log('✅ User logged in:', user);
    
    return response.data;
  };

  const register = async (name, email, password) => {
    const response = await api.post('/auth/register', { name, email, password });
    
    const { token, user } = response.data.data;
    
    localStorage.setItem('token', token);
    setUser(user);
    setLoading(false);
    
    console.log('✅ User registered:', user);
    
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};