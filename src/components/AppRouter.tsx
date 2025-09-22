import React from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import LoginPage from './LoginPage';
import ForgotPasswordPage from './ForgotPasswordPage';
import CreateAccountPage from './CreateAccountPage';
import CreateSalonPage from './CreateSalonPage';
import AddSchedulesPage from './AddSchedulesPage';
import SpecialtiesPage from './SpecialtiesPage';
import ReadyPage from './ReadyPage';

const AppRouter: React.FC = () => {
  const { currentPage } = useNavigation();

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
    default:
      return <CreateAccountPage />;
  }
};

export default AppRouter;
