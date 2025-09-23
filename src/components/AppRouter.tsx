import React from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import LoginPage from './LoginPage';
import ForgotPasswordPage from './ForgotPasswordPage';
import CreateAccountPage from './CreateAccountPage';
import CreateSalonPage from './CreateSalonPage';
import AddSchedulesPage from './AddSchedulesPage';
import SpecialtiesPage from './SpecialtiesPage';
import ReadyPage from './ReadyPage';
import DashboardPage from './DashboardPage';
import CitasPage from './CitasPage';
import NuevaCitaPage from './NuevaCitaPage';
import AgendaPage from './AgendaPage';

const AppRouter: React.FC = () => {
  const { currentPage, selectedSpecialty } = useNavigation();

  switch (currentPage) {
    case 'login':
      return <LoginPage />;
    case 'forgot-password':
      return <ForgotPasswordPage />;
    case 'create-account':
      return <CreateAccountPage />;
    case 'create-salon':
      return <CreateSalonPage />;
    case 'add-schedules':
      return <AddSchedulesPage />;
    case 'specialties':
      return <SpecialtiesPage />;
    case 'ready':
      return <ReadyPage />;
    case 'dashboard':
      return <DashboardPage />;
    case 'citas':
      return <CitasPage specialty={selectedSpecialty} />;
    case 'nueva-cita':
      return <NuevaCitaPage />;
    case 'agenda':
      return <AgendaPage />;
    default:
      return <LoginPage />;
  }
};

export default AppRouter;
