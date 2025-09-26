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
import AppointmentDetailsPage from './AppointmentDetailsPage';
import ClientesPage from './ClientesPage';
import AddClientPage from './AddClientPage';
import ClientDetailsPage from './ClientDetailsPage';
import EditClientPage from './EditClientPage';
import LlamadasPage from './LlamadasPage';
import EspecialistasPage from './EspecialistasPage';
import AddEspecialistaPage from './AddEspecialistaPage';
import EspecialistaDetailsPage from './EspecialistaDetailsPage';
import EditEspecialistaPage from './EditEspecialistaPage';
import ConfiguracionPage from './ConfiguracionPage';

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
    case 'appointment-details':
      return <AppointmentDetailsPage />;
    case 'clientes':
      return <ClientesPage />;
    case 'add-client':
      return <AddClientPage />;
    case 'client-details':
      return <ClientDetailsPage />;
    case 'edit-client':
      return <EditClientPage />;
    case 'llamadas':
      return <LlamadasPage />;
      case 'especialistas':
        return <EspecialistasPage />;
      case 'add-especialista':
        return <AddEspecialistaPage />;
        case 'especialista-details':
          return <EspecialistaDetailsPage />;
        case 'edit-especialista':
          return <EditEspecialistaPage />;
        case 'configuracion':
          return <ConfiguracionPage />;
        case 'perfil':
          return <div>Página de perfil - En desarrollo</div>;
        default:
          return <LoginPage />;
  }
};

export default AppRouter;
