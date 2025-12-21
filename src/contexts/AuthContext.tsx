"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
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

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [logoutTimer, setLogoutTimer] = useState<NodeJS.Timeout | null>(null);
  const router = useRouter();

  // Auto-logout after 10 minutes
  const setupAutoLogout = () => {
    // Clear existing timer
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }

    // Set new timer for 10 minutes (600000 ms)
    const timer = setTimeout(() => {
      logout();
    }, 600000); // 10 minutes

    setLogoutTimer(timer);
  };

  // Check authentication status
  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/profile');
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setupAutoLogout();
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      setUser(data.user);
      setupAutoLogout();

      // Redirect based on role - use replace to avoid back button issues
      if (data.user.role === 'admin') {
        router.replace('/backendadmin');
      } else {
        router.replace('/');
      }
    } catch (error) {
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    const isAdmin = user?.role === 'admin';
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
      setUser(null);
      // Admin goes to login, regular users go to home
      router.push(isAdmin ? '/login' : '/');
    }
  };

  // Check auth on mount
  useEffect(() => {
    checkAuth();
    
    // Cleanup timer on unmount
    return () => {
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
