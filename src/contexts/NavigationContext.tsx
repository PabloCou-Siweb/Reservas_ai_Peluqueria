import React, { createContext, useContext, useState, ReactNode } from 'react';

export type PageType = 
  | 'login'
  | 'forgot-password'
  | 'create-account'
  | 'create-salon'
  | 'add-schedules'
  | 'specialties'
  | 'ready';

interface NavigationContextType {
  currentPage: PageType;
  navigateTo: (page: PageType) => void;
  goBack: () => void;
  goNext: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

interface NavigationProviderProps {
  children: ReactNode;
}

const pageOrder: PageType[] = [
  'create-account',
  'create-salon', 
  'add-schedules',
  'specialties',
  'ready'
];

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageType>('login');

  const navigateTo = (page: PageType) => {
    setCurrentPage(page);
  };

  const goBack = () => {
    const currentIndex = pageOrder.indexOf(currentPage);
    if (currentIndex > 0) {
      setCurrentPage(pageOrder[currentIndex - 1]);
    } else if (currentPage === 'forgot-password') {
      setCurrentPage('login');
    }
  };

  const goNext = () => {
    const currentIndex = pageOrder.indexOf(currentPage);
    if (currentIndex < pageOrder.length - 1) {
      setCurrentPage(pageOrder[currentIndex + 1]);
    }
  };

  return (
    <NavigationContext.Provider value={{ currentPage, navigateTo, goBack, goNext }}>
      {children}
    </NavigationContext.Provider>
  );
};
