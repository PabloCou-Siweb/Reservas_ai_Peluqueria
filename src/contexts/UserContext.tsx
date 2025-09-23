import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserData {
  salonName: string;
  email: string;
  businessName?: string;
  address?: string;
  phone?: string;
}

interface UserContextType {
  userData: UserData;
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

  const updateUserData = (data: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...data }));
  };

  const login = (data: UserData) => {
    setUserData(data);
  };

  const logout = () => {
    setUserData({
      salonName: 'Mi Peluquería',
      email: 'usuario@ejemplo.com',
      businessName: '',
      address: '',
      phone: ''
    });
  };

  return (
    <UserContext.Provider value={{ userData, updateUserData, login, logout }}>
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
