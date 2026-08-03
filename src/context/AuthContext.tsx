import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role?: Role) => Promise<void>;
  logout: () => void;
  setDemoUser: (role: Role) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('smart_event_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('smart_event_token') || null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('smart_event_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('smart_event_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('smart_event_token', token);
    } else {
      localStorage.removeItem('smart_event_token');
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    const data = await api.login(email, password);
    setUser(data.user);
    setToken(data.token);
  };

  const register = async (name: string, email: string, password: string, role: Role = 'user') => {
    const data = await api.register(name, email, password, role);
    setUser(data.user);
    setToken(data.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('smart_event_user');
    localStorage.removeItem('smart_event_token');
  };

  const setDemoUser = (role: Role) => {
    if (role === 'admin') {
      const adminUser: User = {
        id: 'usr_admin',
        name: 'Admin Manager',
        email: 'admin@abcsolutions.com',
        role: 'admin',
      };
      setUser(adminUser);
      setToken('mock_jwt_admin');
    } else {
      const regularUser: User = {
        id: 'usr_1',
        name: 'Alex Johnson',
        email: 'alex@example.com',
        role: 'user',
      };
      setUser(regularUser);
      setToken('mock_jwt_user');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout,
        setDemoUser,
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
