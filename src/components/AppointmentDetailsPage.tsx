import React, { useState } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import Sidebar from './Sidebar';
import './AppointmentDetailsPage.css';
import './HeaderButtons.css';

const AppointmentDetailsPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleBackClick = () => {
    navigateTo('agenda');
  };

  return (
    <div className="appointment-details-container">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      <div className={`main-content ${!sidebarOpen ? 'sidebar-closed' : ''}`}>
        {/* Header */}
        <div className="details-header">
          <div className="header-left">
            <div className="header-content">
              <div className="breadcrumb">
                <span>Citas</span>
                <span className="separator">/</span>
                <span>Pablo Simón</span>
              </div>
              <h1 className="header-title">
                <button className="back-button" onClick={handleBackClick}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="15,18 9,12 15,6"/>
                  </svg>
                </button>
                Detalles de la cita
              </h1>
            </div>
          </div>
          <div className="header-right">
            <button className="header-icon-btn notification-btn">
              <img src="/img/notification-icon.png" alt="Notificaciones" width="20" height="20" />
            </button>
            <button className="header-icon-btn settings-btn" onClick={() => navigateTo('configuracion')}>
              <img src="/img/settings-icon.png" alt="Configuración" width="20" height="20" />
            </button>
          </div>
        </div>

        {/* Appointment Summary Card - 4 COLUMNAS */}
        <div className="appointment-summary-card">
          {/* Columna 1: Cliente */}
          <div className="client-column">
            <div className="client-avatar">
              <div className="avatar-placeholder">
                <img src="/img/user-icon.png" alt="Usuario" width="24" height="24" />
              </div>
            </div>
            <div className="client-details">
              <h3>Pablo Simón López</h3>
              <p className="client-email">pablo.simón@gmail.com</p>
              <p className="client-birth">Fecha de nacimiento 09/11/1978</p>
            </div>
          </div>
          
          {/* Columna 2: Fecha y Hora */}
          <div className="datetime-column">
            <div className="datetime-content">
              <div className="datetime-with-icon">
                <img src="/img/note-icon.png" alt="Nota" width="40" height="40" className="note-icon-large" />
                <div className="datetime-info">
                  <div className="time-display">18:00 - 19:00</div>
                  <div className="date-display">29/11/2025</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Columna 3: Local */}
          <div className="location-column">
            <div className="location-content">
              <div className="specialist-info">
                <div className="specialist-dot"></div>
                <span>Pol Palomo</span>
              </div>
              <div className="service-type">Barbería</div>
            </div>
          </div>
          
          {/* Columna 4: Contacto */}
          <div className="contact-column">
            <div className="contact-content">
              <div className="contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span>+34 625 58 0 15</span>
              </div>
              <div className="contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span>pablosimon@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Sections */}
        <div className="main-sections">
          {/* Treatments Section - Recreado según plantilla */}
          <div className="treatments-section">
            <h3>Tratamientos</h3>
            <div className="treatments-container">
              <div className="treatment-entry">
                <div className="treatment-info">
                  <div className="treatment-title">Tinte raíz + mechas balayage</div>
                  <div className="treatment-description">Duración: 2h | Producto: línea sin amoníaco.</div>
                  <div className="treatment-client">Laura Gómez • 06 ene 2025</div>
                </div>
                <div className="treatment-status-container">
                  <div className="status-badge">
                    <div className="status-dot"></div>
                    <span>Activo</span>
                  </div>
                  <div className="treatment-duration">3 meses</div>
                </div>
              </div>
              
              <div className="treatment-entry">
                <div className="treatment-info">
                  <div className="treatment-title">Corte de puntas + tratamiento hidratación profunda</div>
                  <div className="treatment-description">Cabello muy reseco, se recomendó repetir en 4 semanas.</div>
                  <div className="treatment-client">Márcos Peleteiro • 06 ene 2025</div>
                </div>
                <div className="treatment-status-container">
                  <div className="status-badge">
                    <div className="status-dot"></div>
                    <span>Activo</span>
                  </div>
                  <div className="treatment-duration">7 días</div>
                </div>
              </div>
              
              <div className="treatment-entry">
                <div className="treatment-info">
                  <div className="treatment-title">Alisado de keratina</div>
                  <div className="treatment-description">Duración: 3h</div>
                  <div className="treatment-client">Ana Gómez • 06 ene 2025</div>
                </div>
                <div className="treatment-status-container">
                  <div className="status-badge">
                    <div className="status-dot"></div>
                    <span>Activo</span>
                  </div>
                  <div className="treatment-duration">6 meses</div>
                </div>
              </div>
            </div>
          </div>

          {/* Notes Section - LISTADO SIMPLE */}
          <div className="notes-section">
            <h3>Notas</h3>
            <ul className="notes-list">
              <li className="note-item">
                <div className="note-text">Prefiere corte recto con puntas desfiladas, no le gustan los cambios muy drásticos</div>
                <div className="note-date">06/08/2025</div>
              </li>
              
              <li className="note-item">
                <div className="note-text">Siempre pide tinte castaño 5.0 con mechas finas; retocar raíces cada 6 semanas.</div>
                <div className="note-date">21/07/2025</div>
              </li>
              
              <li className="note-item">
                <div className="note-text">Muy puntual y le gusta que le atiendan rápido; suele venir en la pausa de trabajo.</div>
                <div className="note-date">12/07/2025</div>
              </li>
              
              <li className="note-item">
                <div className="note-text">Alérgico a algunos tintes con amoníaco, usar linea sin amoniaco.</div>
                <div className="note-date">29/03/2025</div>
              </li>
              
              <li className="note-item">
                <div className="note-text">Compra siempre el champú sin sulfatos de la linea X; recomendar reposición en cada visita.</div>
                <div className="note-date">15/01/2025</div>
              </li>
              
              <li className="note-item">
                <div className="note-text">Cabello seco y quebradizo, se aconseja tratamiento de hidratación profunda cada mes.</div>
                <div className="note-date">06/08/2025</div>
              </li>
              
              <li className="note-item">
                <div className="note-text">Suele reservar los sábados por la mañana, evitar ofrecerle tardes entre semana.</div>
                <div className="note-date">06/08/2025</div>
              </li>
              
              <li className="note-item">
                <div className="note-text">Tiene boda en septiembre, reservar paquete de peinado y maquillaje.</div>
                <div className="note-date">12/06/2025</div>
              </li>
              
              <li className="note-item">
                <div className="note-text">Prefiere horarios de mañana, evitar citas después de las 18:00.</div>
                <div className="note-date">05/05/2025</div>
              </li>
              
              <li className="note-item">
                <div className="note-text">Suele traer su propio champú, preguntar si necesita recomendaciones.</div>
                <div className="note-date">28/04/2025</div>
              </li>
            </ul>
          </div>
        </div>

        {/* Last Appointment Section */}
        <div className="last-appointment-section">
          <div className="last-appointment-card">
            <div className="last-appointment-details">
              <div className="detail-column last-cita-column">
                <div className="last-cita-header">
                  <div className="icon-square">
                    <img src="/img/info-icon.png" alt="Info" width="28" height="28" />
                  </div>
                  <span>Última Cita</span>
                </div>
              </div>
              
              <div className="detail-column">
                <div className="detail-label">Peluquerías</div>
                <div className="detail-value">Pancho Villa. Florin</div>
              </div>
              
              <div className="detail-column">
                <div className="detail-label">Motivo</div>
                <div className="detail-value">Mantenimiento</div>
              </div>
              
              <div className="detail-column">
                <div className="detail-label">Fecha de cita</div>
                <div className="detail-value">07/06/2022</div>
              </div>
              
              <div className="detail-column">
                <div className="detail-label">Nota breve</div>
                <div className="detail-value">Cabello seco y quebradizo, se aconseja tratamiento de hidratación profunda cada mes.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetailsPage;