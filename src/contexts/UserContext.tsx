import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserData {
  salonName: string;
  email: string;
  businessName?: string;
  address?: string;
  phone?: string;
}

interface UserContextType {
  userData: UserData;
  isAuthenticated: boolean;
  updateUserData: (data: Partial<UserData>) => void;
  login: (data: UserData) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>({
    salonName: 'Mi Peluquería',
    email: 'usuario@ejemplo.com',
    businessName: '',
    address: '',
    phone: ''
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const updateUserData = (data: Partial<UserData>) => {
    setUserData(prev => {
      const newData = { ...prev, ...data };
      return newData;
    });
  };

  const login = (data: UserData) => {
    setUserData(data);
    setIsAuthenticated(true);
  };

  const logout = () => {
    const defaultData = {
      salonName: 'Mi Peluquería',
      email: 'usuario@ejemplo.com',
      businessName: '',
      address: '',
      phone: ''
    };
    setUserData(defaultData);
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider value={{ userData, isAuthenticated, updateUserData, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
