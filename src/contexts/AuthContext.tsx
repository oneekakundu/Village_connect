import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  role: 'traveler' | 'villager';
  profile: {
    firstName: string;
    lastName: string;
    phone?: string;
    avatar?: string;
  };
  isEmailVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  role: 'traveler' | 'villager';
  firstName: string;
  lastName: string;
  phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // For now, simulate a successful login since the backend might not be running
      // In production, this would connect to your actual API
      const mockUser = {
        id: '1',
        email: email,
        role: 'traveler' as const,
        profile: {
          firstName: email.split('@')[0],
          lastName: '',
          phone: '',
          avatar: ''
        },
        isEmailVerified: true
      };

      const mockToken = 'mock-jwt-token-' + Date.now();

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setToken(mockToken);
      setUser(mockUser);
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));

      // Uncomment this when your backend is ready:
      /*
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Login failed';
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || 'Login failed';
        } catch {
          errorMessage = errorText || 'Login failed';
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      */
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      // For now, simulate a successful registration since the backend might not be running
      // In production, this would connect to your actual API
      const mockUser = {
        id: '1',
        email: userData.email,
        role: userData.role,
        profile: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          phone: userData.phone || '',
          avatar: ''
        },
        isEmailVerified: false
      };

      const mockToken = 'mock-jwt-token-' + Date.now();

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setToken(mockToken);
      setUser(mockUser);
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUser));

      // Uncomment this when your backend is ready:
      /*
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = 'Registration failed';
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || 'Registration failed';
        } catch {
          errorMessage = errorText || 'Registration failed';
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      */
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};