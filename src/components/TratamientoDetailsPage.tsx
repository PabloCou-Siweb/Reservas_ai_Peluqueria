import React, { useState } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import Sidebar from './Sidebar';
import './TratamientoDetailsPage.css';

const TratamientoDetailsPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="page-container tratamiento-details-page">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      <div className={`main-content ${!sidebarOpen ? 'sidebar-closed' : ''}`}>
        {/* Header */}
        <header className="header-section">
          <div className="header-left">
            <h1>Peluquería</h1>
            <p>Especialidad médica orientada a la atención integral del paciente, abarcando la prevención, diagnóstico y tratamiento de las enfermedades más frecuentes.</p>
          </div>
          <div className="header-right">
            <button className="icon-button" onClick={() => navigateTo('llamadas')}>
              <img src="/img/bell-icon.png" alt="Notificaciones" />
            </button>
            <button className="icon-button" onClick={() => navigateTo('configuracion')}>
              <img src="/img/settings-icon.png" alt="Configuración" />
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="content-section">
          {/* Top Cards Row */}
          <div className="cards-row">
            {/* Treatment Card */}
            <div className="treatment-card">
              <img src="/img/pen-icon.png" alt="Editar" className="edit-treatment-icon" />
              <div className="treatment-left">
                <div className="service-icon">
                  <img src="/img/scissor-icon.png" alt="Peluquería" />
                </div>
                <div className="status-badge">Activa</div>
                <div className="duration-info">
                  <div className="duration-value">25 min</div>
                  <div className="duration-label">Duración estándar</div>
                </div>
                <div className="action-buttons">
                  <button className="btn-edit">
                    <img src="/img/rounded_pen-icon.png" alt="Editar" />
                    Editar
                  </button>
                  <button className="btn-delete">
                    <img src="/img/trash-icon.png" alt="Eliminar" />
                    Eliminar
                  </button>
                </div>
              </div>
              
              <div className="treatment-right">
                <div className="schedule-header">
                  <h3>Horarios</h3>
                </div>
                <div className="schedule-items">
                  <div className="schedule-row">
                    <span className="day">Lunes</span>
                    <span className="time">09:00 - 18:00</span>
                  </div>
                  <div className="schedule-row">
                    <span className="day">Martes</span>
                    <span className="time">09:00 - 18:00</span>
                  </div>
                  <div className="schedule-row">
                    <span className="day">Miércoles</span>
                    <span className="time">09:00 - 18:00</span>
                  </div>
                  <div className="schedule-row">
                    <span className="day">Jueves</span>
                    <span className="time">09:00 - 18:00</span>
                  </div>
                  <div className="schedule-row">
                    <span className="day">Viernes</span>
                    <span className="time">09:00 - 18:00</span>
                  </div>
                  <div className="schedule-row">
                    <span className="day">Sábado</span>
                    <span className="time">No disponible</span>
                  </div>
                  <div className="schedule-row">
                    <span className="day">Domingo</span>
                    <span className="time">No disponible</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Specialists Card */}
            <div className="specialists-card">
              <h2>Especialistas asignados</h2>
              <div className="specialist-item">
                <input type="checkbox" id="spec1" />
                <label htmlFor="spec1" className="specialist-name">Pol Palomo Cortés</label>
                <a href="#" className="view-link">Ver ficha</a>
              </div>
              <div className="specialist-item">
                <input type="checkbox" id="spec2" />
                <label htmlFor="spec2" className="specialist-name">Alberto Jiménez Rodríguez</label>
                <a href="#" className="view-link">Ver ficha</a>
              </div>
              <div className="specialist-item">
                <input type="checkbox" id="spec3" />
                <label htmlFor="spec3" className="specialist-name">Raúl Iznate Cabras</label>
                <a href="#" className="view-link">Ver ficha</a>
              </div>
              <div className="specialist-item">
                <input type="checkbox" id="spec4" />
                <label htmlFor="spec4" className="specialist-name">Roberto Bloste Cañí</label>
                <a href="#" className="view-link">Ver ficha</a>
              </div>
              <div className="specialist-item">
                <input type="checkbox" id="spec5" />
                <label htmlFor="spec5" className="specialist-name">Martín Guijarro López</label>
                <a href="#" className="view-link">Ver ficha</a>
              </div>
              <div className="specialists-actions">
                <button className="btn-remove">Eliminar</button>
                <button className="btn-add">Añadir</button>
              </div>
            </div>
          </div>

          {/* Appointments Card */}
          <div className="appointments-card">
            <div className="appointments-header">
              <h2>Citas programadas</h2>
            </div>
            
            <div className="search-container">
              <input type="text" placeholder="Buscar paciente..." className="search-input" />
              <img src="/img/search-icon.png" alt="Buscar" className="search-icon" />
            </div>

            <div className="appointments-table">
              <div className="table-container">
                <div className="table-header">
                  <div className="header-checkbox">
                    <input type="checkbox" id="select-all" />
                    <label htmlFor="select-all"></label>
                  </div>
                  <div className="header-patient">
                    <span>Paciente</span>
                    <img src="/img/sort-icon.png" alt="Sort" />
                  </div>
                  <div className="header-phone">Teléfono</div>
                  <div className="header-email">Email</div>
                  <div className="header-appointment">Próxima cita</div>
                  <div className="header-status">Estado</div>
                  <div className="header-actions"></div>
                </div>

                  <div className="table-row highlighted">
                    <div className="col-checkbox">
                      <input type="checkbox" id="apt1" />
                      <label htmlFor="apt1"></label>
                    </div>
                  <div className="col-patient">
                    <div className="patient-name">Pablo Simón López</div>
                    <div className="patient-number">555-4567</div>
                  </div>
                  <div className="col-phone">+34 654 25 20 45</div>
                  <div className="col-email">pablosimón_lopez@gmail.com</div>
                  <div className="col-appointment">15/08/2025 - 09:00</div>
                  <div className="col-status confirmed">
                    <span className="status-dot"></span>
                    Confirmada
                  </div>
                  <div className="col-actions">
                    <button className="options-btn">
                      <img src="/img/3dots-icon.png" alt="Opciones" />
                    </button>
                  </div>
                </div>

                  <div className="table-row highlighted">
                    <div className="col-checkbox">
                      <input type="checkbox" id="apt2" />
                      <label htmlFor="apt2"></label>
                    </div>
                  <div className="col-patient">
                    <div className="patient-name">Javi Correa Gómez</div>
                    <div className="patient-number">555-4567</div>
                  </div>
                  <div className="col-phone">+34 620 12 34 89</div>
                  <div className="col-email">maria.gonzalez@yahoo.com</div>
                  <div className="col-appointment">16/08/2025 - 10:30</div>
                  <div className="col-status confirmed">
                    <span className="status-dot"></span>
                    Confirmada
                  </div>
                  <div className="col-actions">
                    <button className="options-btn">
                      <img src="/img/3dots-icon.png" alt="Opciones" />
                    </button>
                  </div>
                </div>

                <div className="table-row">
                  <div className="col-checkbox">
                    <input type="checkbox" id="apt3" />
                    <label htmlFor="apt3"></label>
                  </div>
                  <div className="col-patient">
                    <div className="patient-name">Ana María Jiménez</div>
                    <div className="patient-number">555-4567</div>
                  </div>
                  <div className="col-phone">+34 610 12 34 56</div>
                  <div className="col-email">olivia.martinez@live.com</div>
                  <div className="col-appointment">20/08/2025 - 15:45</div>
                  <div className="col-status pending">
                    <span className="status-dot"></span>
                    Pendiente
                  </div>
                  <div className="col-actions">
                    <button className="options-btn">
                      <img src="/img/3dots-icon.png" alt="Opciones" />
                    </button>
                  </div>
                </div>

                <div className="table-row">
                  <div className="col-checkbox">
                    <input type="checkbox" id="apt4" />
                    <label htmlFor="apt4"></label>
                  </div>
                  <div className="col-patient">
                    <div className="patient-name">Pepito Jiménez Sancho</div>
                    <div className="patient-number">555-7890</div>
                  </div>
                  <div className="col-phone">+34 615 67 89 01</div>
                  <div className="col-email">michael.johnson@protonmail.com</div>
                  <div className="col-appointment">20/08/2025 - 15:45</div>
                  <div className="col-status confirmed">
                    <span className="status-dot"></span>
                    Confirmada
                  </div>
                  <div className="col-actions">
                    <button className="options-btn">
                      <img src="/img/3dots-icon.png" alt="Opciones" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="pagination-container">
              <div className="pagination">
                <span className="page active">01</span>
                <span className="page">02</span>
                <span className="page">03</span>
                <span className="dots">...</span>
                <span className="page">04</span>
                <span className="page">05</span>
                <span className="page">06</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="footer-section">
          <span>© 2025 Bokifly</span>
        </footer>
      </div>
    </div>
  );
};

export default TratamientoDetailsPage;