import React, { useState } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import Sidebar from './Sidebar';
import ServiceGrid from './ServiceGrid';
import './DashboardPage.css';

interface ServiceCategory {
  id: string;
  name: string;
  specialists: number;
  icon: string;
}

const DashboardPage: React.FC = () => {
  const { navigateToCitas, navigateTo } = useNavigation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const serviceCategories: ServiceCategory[] = [
    { id: '1', name: 'Tratamientos capilares', specialists: 4, icon: 'hair' },
    { id: '2', name: 'Coloración', specialists: 5, icon: 'color' },
    { id: '3', name: 'Peinados', specialists: 5, icon: 'style' },
    { id: '4', name: 'Corte', specialists: 3, icon: 'cut' },
    { id: '5', name: 'Depilación', specialists: 1, icon: 'wax' },
    { id: '6', name: 'Pedicura', specialists: 2, icon: 'pedicure' },
    { id: '7', name: 'Manicura', specialists: 1, icon: 'manicure' },
    { id: '8', name: 'Cejas y pestañas', specialists: 5, icon: 'eyebrows' },
    { id: '9', name: 'Novias', specialists: 1, icon: 'bride' },
    { id: '10', name: 'Barbería', specialists: 1, icon: 'barber' },
    { id: '11', name: 'Uñas', specialists: 3, icon: 'nails' },
    { id: '12', name: 'Tratamientos', specialists: 1, icon: 'treatment' },
    { id: '13', name: 'Niños', specialists: 1, icon: 'kids' },
  ];

  const filteredCategories = serviceCategories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

          {/* Main Content */}
          <div className="main-content">
            <div className="main-content-area">
              <div className="main-header">
                <h1 className="main-title">Citas</h1>
                <div className="header-right">
                  <div className="header-actions">
                    <div className="notification-icon">
                      <img src="/img/notification-icon.png" alt="Notificaciones" />
                      <div className="notification-dot"></div>
                    </div>
                    <div className="settings-icon" onClick={() => navigateTo('configuracion')}>
                      <img src="/img/settings-icon.png" alt="Configuración" />
                    </div>
                  </div>
                  <div className="header-search">
                    <input
                      type="text"
                      placeholder="Buscar por nombre"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="header-search-input"
                    />
                    <div className="header-search-icon">
                      <img src="/img/search-icon.png" alt="Buscar" />
                    </div>
                  </div>
                </div>
              </div>

              <ServiceGrid
                categories={filteredCategories}
                onServiceClick={(category) => {
                  console.log('Service clicked:', category);
                  // Navegar a la página de citas cuando se hace clic en un servicio
                  navigateToCitas(category.name);
                }}
              />
            </div>

            <div className="main-footer">
              <span>© 2025 Bokifly</span>
            </div>
          </div>
    </div>
  );
};

export default DashboardPage;
