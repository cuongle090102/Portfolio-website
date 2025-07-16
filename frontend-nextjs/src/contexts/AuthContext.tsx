'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiClient } from '@/lib/api';

interface User {
  id: number;
  username: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:5000';

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    // Only check localStorage on client side
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token) {
        setIsAuthenticated(true);
        setUser({ id: 1, username: 'admin' });
      }
    }
    setIsLoading(false);
  };

  const login = async (password: string) => {
    try {
      setIsLoading(true);
      console.log('Attempting login to:', `${API_BASE_URL}/api/admin/login`);
      
      const response = await apiClient.loginAdmin(password);
      
      console.log('Login response:', response.data);
      
      const { token } = response.data;
      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', token);
      }
      
      setIsAuthenticated(true);
      setUser({ id: 1, username: 'admin' });
      
      return { success: true };
    } catch (error: any) {
      console.error('Login error:', error);
      console.error('Error response:', error.response?.data);
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Login failed'
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};