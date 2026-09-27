import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('apex_token');
      if (token) {
        try {
          const data = await authService.getMe();
          if (data.success) {
            setUser(data.user);
          }
        } catch (error) {
          console.error('Failed to authenticate token:', error);
          localStorage.removeItem('apex_token');
          setUser(null);
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      const data = await authService.login({ email, password });
      if (data.success) {
        localStorage.setItem('apex_token', data.token);
        setUser(data.user);
        showToast(`Welcome back, ${data.user.name}!`, 'success');
        return data.user;
      }
    } catch (error) {
      showToast(error.message, 'error');
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const data = await authService.register(userData);
      if (data.success) {
        localStorage.setItem('apex_token', data.token);
        setUser(data.user);
        showToast('Account created successfully! Welcome to Apex Wheels.', 'success');
        return data.user;
      }
    } catch (error) {
      showToast(error.message, 'error');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('apex_token');
    setUser(null);
    showToast('You have been logged out successfully.', 'info');
  };

  const updateProfile = async (formData) => {
    try {
      const data = await authService.updateProfile(formData);
      if (data.success) {
        setUser((prev) => ({ ...prev, ...data.user }));
        showToast('Profile updated successfully!', 'success');
        return data.user;
      }
    } catch (error) {
      showToast(error.message, 'error');
      throw error;
    }
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
