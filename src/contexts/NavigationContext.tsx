import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type PageType =
  | 'login'
  | 'forgot-password'
  | 'create-account'
  | 'create-salon'
  | 'add-schedules'
  | 'specialties'
  | 'ready'
  | 'dashboard'
  | 'citas'
  | 'nueva-cita'
  | 'agenda'
  | 'appointment-details'
  | 'clientes'
  | 'add-client'
  | 'client-details'
  | 'edit-client'
  | 'llamadas'
  | 'especialistas'
  | 'add-especialista'
  | 'especialista-details'
  | 'edit-especialista'
  | 'tratamientos'
  | 'tratamiento-details'
  | 'configuracion'
  | 'perfil'
  | 'comprar-minutos'
  | 'logout';

interface NavigationContextType {
  currentPage: PageType;
  selectedSpecialty: string;
  navigateTo: (page: PageType) => void;
  navigateToCitas: (specialty: string) => void;
  navigateToNuevaCita: () => void;
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
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('Corte');

  const navigateTo = (page: PageType) => {
    setCurrentPage(page);
    // Scroll al top cuando se cambia de página
    window.scrollTo(0, 0);
    // No guardar en localStorage para evitar problemas de persistencia
  };

  const navigateToCitas = (specialty: string) => {
    setSelectedSpecialty(specialty);
    setCurrentPage('citas');
    // Scroll al top cuando se navega a citas
    window.scrollTo(0, 0);
  };

  const navigateToNuevaCita = () => {
    setCurrentPage('nueva-cita');
    // Scroll al top cuando se navega a nueva cita
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    const currentIndex = pageOrder.indexOf(currentPage);
    if (currentIndex > 0) {
      setCurrentPage(pageOrder[currentIndex - 1]);
      window.scrollTo(0, 0);
    } else if (currentPage === 'forgot-password') {
      setCurrentPage('login');
      window.scrollTo(0, 0);
    }
  };

  const goNext = () => {
    const currentIndex = pageOrder.indexOf(currentPage);
    if (currentIndex < pageOrder.length - 1) {
      setCurrentPage(pageOrder[currentIndex + 1]);
      window.scrollTo(0, 0);
    } else if (currentPage === 'ready') {
      setCurrentPage('dashboard');
      window.scrollTo(0, 0);
    }
  };

  return (
    <NavigationContext.Provider value={{ currentPage, selectedSpecialty, navigateTo, navigateToCitas, navigateToNuevaCita, goBack, goNext }}>
      {children}
    </NavigationContext.Provider>
  );
};
