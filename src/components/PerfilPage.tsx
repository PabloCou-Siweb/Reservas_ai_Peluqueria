import React, { useState } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import { useUser } from '../contexts/UserContext';
import Sidebar from './Sidebar';
import './PerfilPage.css';
import './HeaderButtons.css';

const PerfilPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const { userData } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Datos de especialidades (simulados - normalmente vendrían de la configuración)
  const especialidades = [
    'Peluquería',
    'Uñas',
    'Manicura',
    'Peluquero',
    'Tratamientos',
    'Coloración',
    'Niños',
    'Tratamientos faciales',
    'Tratamientos capilares',
    'Depilación',
    'Novias',
    'Barbería'
  ];

  return (
    <div className="perfil-page">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      <div className={`main-content ${!sidebarOpen ? 'sidebar-closed' : ''}`}>
        {/* Header */}
        <div className="page-header">
          <div className="header-left">
            <h1>Mi Perfil</h1>
          </div>
          <div className="header-right">
            <button className="notification-btn">
              <img src="/img/notification-icon.png" alt="Notificaciones" width="20" height="20" />
            </button>
            <button className="settings-btn" onClick={() => navigateTo('configuracion')}>
              <img src="/img/settings-icon.png" alt="Configuración" width="20" height="20" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="perfil-content">
          {/* Profile Information Card */}
          <div className="profile-card">
            <div className="profile-left">
              <div className="profile-avatar-container">
                <div className="profile-avatar-large">
                  <div className="avatar-shape"></div>
                </div>
                <button className="edit-avatar-btn">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                </button>
              </div>
              <div className="profile-name">{userData.salonName}</div>
            </div>
            
            <div className="profile-separator"></div>
            
            <div className="profile-right">
              <div className="profile-details">
                <div className="detail-row">
                  <div className="detail-column">
                    <div className="detail-item">
                      <span className="detail-label">Razón Social</span>
                      <span className="detail-value">{userData.salonName} S.A</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Razón Social</span>
                      <span className="detail-value">{userData.salonName} S.A</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Gmail</span>
                      <span className="detail-value">{userData.email}</span>
                    </div>
                  </div>
                  <div className="detail-column">
                    <div className="detail-item">
                      <span className="detail-label">Fecha de registro</span>
                      <span className="detail-value">15 de marzo, 2020</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Fecha de registro</span>
                      <span className="detail-value">15 de marzo, 2020</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Teléfono</span>
                      <span className="detail-value">+34 625 58 0 15</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Specialties Card */}
          <div className="specialties-card">
            <h3 className="specialties-title">Especialidades</h3>
            <div className="specialties-grid">
              {especialidades.map((especialidad, index) => (
                <div key={index} className="specialty-item">
                  {especialidad}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <span>© 2025 Bokifly</span>
        </div>
      </div>
    </div>
  );
};

export default PerfilPage;
