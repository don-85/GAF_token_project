import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'merchant' | 'admin';
  kycVerified: boolean;
  wallet?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  connectWallet: (address: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Simulate login API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: '1',
      email,
      name: email === 'admin@gaf.com' ? 'Admin User' : 'John Doe',
      role: email === 'admin@gaf.com' ? 'admin' : email.includes('merchant') ? 'merchant' : 'user',
      kycVerified: true,
    };
    
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  const connectWallet = (address: string) => {
    if (user) {
      setUser({ ...user, wallet: address });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, connectWallet }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}