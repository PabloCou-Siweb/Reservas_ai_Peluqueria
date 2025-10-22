import React, { useState } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import Sidebar from './Sidebar';
import EditTratamientoModal from './EditTratamientoModal';
import './TratamientoDetailsPage.css';
import './HeaderButtons.css';

const TratamientoDetailsPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showHorariosModal, setShowHorariosModal] = useState(false);
  const [horarios, setHorarios] = useState({
    lunes: { inicio: '08:00', fin: '20:00' },
    martes: { inicio: '08:00', fin: '20:00' },
    miercoles: { inicio: '08:00', fin: '20:00' },
    jueves: { inicio: '08:00', fin: '20:00' },
    viernes: { inicio: '08:00', fin: '20:00' },
    sabado: { inicio: '08:00', fin: '20:00' },
    domingo: { inicio: '08:00', fin: '20:00' }
  });

  

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleEditTreatment = () => {
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleSaveTreatment = (data: any) => {
    console.log('Datos del tratamiento guardados:', data);
    // Aquí se puede implementar la lógica para guardar los datos
  };

  const handleOpenHorariosModal = () => {
    setShowHorariosModal(true);
  };

  const handleCloseHorariosModal = () => {
    setShowHorariosModal(false);
  };

  const handleSaveHorarios = () => {
    console.log('Horarios guardados:', horarios);
    setShowHorariosModal(false);
  };

  const handleHorarioChange = (dia: string, campo: 'inicio' | 'fin', valor: string) => {
    setHorarios(prev => ({
      ...prev,
      [dia]: {
        ...prev[dia as keyof typeof prev],
        [campo]: valor
      }
    }));
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
      setSelectAll(false);
    } else {
      setSelectedRows(['tratamiento-apt1', 'tratamiento-apt2', 'tratamiento-apt3', 'tratamiento-apt4']);
      setSelectAll(true);
    }
  };

  const handleRowSelect = (rowId: string) => {
    if (selectedRows.includes(rowId)) {
      const newSelection = selectedRows.filter(id => id !== rowId);
      setSelectedRows(newSelection);
      setSelectAll(false);
    } else {
      const newSelection = [...selectedRows, rowId];
      setSelectedRows(newSelection);
      if (newSelection.length === 4) {
        setSelectAll(true);
      }
    }
  };

  return (
    <div className="tratamiento-details-page">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      <div className={`main-content ${!sidebarOpen ? 'sidebar-closed' : ''}`}>
        {/* Header */}
        <header className="tratamiento-header-section">
          <div className="tratamiento-header-left">
            <h1>Peluquería</h1>
            <p>Especialidad médica orientada a la atención integral del paciente, abarcando la prevención, diagnóstico y tratamiento de las enfermedades más frecuentes.</p>
          </div>
          <div className="tratamiento-header-right">
            <button className="notification-btn" onClick={() => navigateTo('llamadas')}>
              <img src="/img/notification-icon.png" alt="Notificaciones" width="20" height="20" />
            </button>
            <button className="settings-btn" onClick={() => navigateTo('configuracion')}>
              <img src="/img/settings-icon.png" alt="Configuración" width="20" height="20" />
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="tratamiento-content-section">
          {/* Top Cards Row */}
          <div className="tratamiento-cards-row">
            {/* Treatment Card - Div Doble */}
            <div className="tratamiento-double-card">
              {/* Left Side - Service Info */}
              <div className="tratamiento-left-section">
                <div className="tratamiento-icon-container">
                  <img src="/img/scissor-icon.png" alt="Peluquería" />
                </div>
                <div className="tratamiento-status">Activa</div>
                <div className="tratamiento-duration">
                  <div className="duration-time">25 min</div>
                  <div className="duration-text">Duración estándar</div>
                </div>
                <div className="tratamiento-actions">
                  <button className="tratamiento-edit-button" onClick={handleEditTreatment}>
                    <img src="/img/rounded_pen-icon.png" alt="Editar" />
                    Editar
                  </button>
                  <button className="tratamiento-delete-button">
                    <img src="/img/trash-icon.png" alt="Eliminar" />
                    Eliminar
                  </button>
                </div>
              </div>
              
              {/* Right Side - Schedule */}
              <div className="tratamiento-right-section">
                <div className="tratamiento-schedule-header">
                  <h3 className="tratamiento-schedule-title">Horarios</h3>
                  <button className="tratamiento-schedule-edit-btn" onClick={handleOpenHorariosModal}>
                    <img src="/img/pen-icon.png" alt="Editar" />
                  </button>
                </div>
                <div className="tratamiento-schedule-content">
                  <div className="tratamiento-schedule-item">
                    <span className="tratamiento-day-label">Lunes</span>
                    <span className="tratamiento-time-label">09:00 - 18:00</span>
                  </div>
                  <div className="tratamiento-schedule-item">
                    <span className="tratamiento-day-label">Martes</span>
                    <span className="tratamiento-time-label">09:00 - 18:00</span>
                  </div>
                  <div className="tratamiento-schedule-item">
                    <span className="tratamiento-day-label">Miércoles</span>
                    <span className="tratamiento-time-label">09:00 - 18:00</span>
                  </div>
                  <div className="tratamiento-schedule-item">
                    <span className="tratamiento-day-label">Jueves</span>
                    <span className="tratamiento-time-label">09:00 - 18:00</span>
                  </div>
                  <div className="tratamiento-schedule-item">
                    <span className="tratamiento-day-label">Viernes</span>
                    <span className="tratamiento-time-label">09:00 - 18:00</span>
                  </div>
                  <div className="tratamiento-schedule-item">
                    <span className="tratamiento-day-label">Sábado</span>
                    <span className="tratamiento-time-label">No disponible</span>
                  </div>
                  <div className="tratamiento-schedule-item">
                    <span className="tratamiento-day-label">Domingo</span>
                    <span className="tratamiento-time-label">No disponible</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Specialists Card */}
            <div className="tratamiento-specialists-card">
              <h2>Especialistas asignados</h2>
              <div className="tratamiento-specialist-item">
                <input type="checkbox" id="tratamiento-spec1" />
                <label htmlFor="tratamiento-spec1" className="tratamiento-specialist-name">Pol Palomo Cortés</label>
                <a href="#" className="tratamiento-view-link">Ver ficha</a>
              </div>
              <div className="tratamiento-specialist-item">
                <input type="checkbox" id="tratamiento-spec2" />
                <label htmlFor="tratamiento-spec2" className="tratamiento-specialist-name">Alberto Jiménez Rodríguez</label>
                <a href="#" className="tratamiento-view-link">Ver ficha</a>
              </div>
              <div className="tratamiento-specialist-item">
                <input type="checkbox" id="tratamiento-spec3" />
                <label htmlFor="tratamiento-spec3" className="tratamiento-specialist-name">Raúl Iznate Cabras</label>
                <a href="#" className="tratamiento-view-link">Ver ficha</a>
              </div>
              <div className="tratamiento-specialist-item">
                <input type="checkbox" id="tratamiento-spec4" />
                <label htmlFor="tratamiento-spec4" className="tratamiento-specialist-name">Roberto Bloste Cañí</label>
                <a href="#" className="tratamiento-view-link">Ver ficha</a>
              </div>
              <div className="tratamiento-specialist-item">
                <input type="checkbox" id="tratamiento-spec5" />
                <label htmlFor="tratamiento-spec5" className="tratamiento-specialist-name">Martín Guijarro López</label>
                <a href="#" className="tratamiento-view-link">Ver ficha</a>
              </div>
              <div className="tratamiento-specialists-actions">
                <button className="tratamiento-btn-remove">Eliminar</button>
                <button className="tratamiento-btn-add">Añadir</button>
              </div>
            </div>
          </div>

          {/* Appointments Card */}
          <div className="tratamiento-appointments-card">
            <div className="tratamiento-appointments-header">
              <h2>Citas programadas</h2>
            </div>
            
            <div className="tratamiento-search-container">
              <input type="text" placeholder="Buscar paciente..." className="tratamiento-search-input" />
              <img src="/img/search-icon.png" alt="Buscar" className="tratamiento-search-icon" />
            </div>

            <div className="tratamiento-appointments-table">
              <div className="tratamiento-table-container">
                <div className="tratamiento-table-header">
                  <div className="tratamiento-header-checkbox">
                    <input 
                      type="checkbox" 
                      id="tratamiento-select-all"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                  </div>
                  <div className="tratamiento-header-patient">
                    <span>Paciente</span>
                    <div className="tratamiento-sort-icons">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="18,15 12,9 6,15"/>
                      </svg>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6,9 12,15 18,9"/>
                      </svg>
                    </div>
                  </div>
                  <div className="tratamiento-header-phone">Teléfono</div>
                  <div className="tratamiento-header-email">Email</div>
                  <div className="tratamiento-header-appointment">Próxima cita</div>
                  <div className="tratamiento-header-status">Estado</div>
                  <div className="tratamiento-header-actions"></div>
                </div>
                
                <div className="tratamiento-table-body">
                  <div className="tratamiento-table-row">
                  <div className="tratamiento-col-checkbox">
                    <input 
                      type="checkbox" 
                      id="tratamiento-apt1"
                      checked={selectedRows.includes('tratamiento-apt1')}
                      onChange={() => handleRowSelect('tratamiento-apt1')}
                    />
                  </div>
                  <div className="tratamiento-col-patient">
                    <div className="tratamiento-patient-name">Pablo Simón López</div>
                    <div className="tratamiento-patient-number">555-4567</div>
                  </div>
                  <div className="tratamiento-col-phone">+34 654 25 20 45</div>
                  <div className="tratamiento-col-email">pablosimón_lopez@gmail.com</div>
                  <div className="tratamiento-col-appointment">15/08/2025 - 09:00</div>
                  <div className="tratamiento-col-status tratamiento-confirmed">
                    <span className="tratamiento-status-dot"></span>
                    Confirmada
                  </div>
                  <div className="tratamiento-col-actions">
                    <button className="tratamiento-options-btn">
                      <img src="/img/3dots-icon.png" alt="Opciones" />
                    </button>
                  </div>
                </div>

                <div className="tratamiento-table-row">
                  <div className="tratamiento-col-checkbox">
                    <input 
                      type="checkbox" 
                      id="tratamiento-apt2"
                      checked={selectedRows.includes('tratamiento-apt2')}
                      onChange={() => handleRowSelect('tratamiento-apt2')}
                    />
                  </div>
                  <div className="tratamiento-col-patient">
                    <div className="tratamiento-patient-name">Javi Correa Gómez</div>
                    <div className="tratamiento-patient-number">555-4567</div>
                  </div>
                  <div className="tratamiento-col-phone">+34 620 12 34 89</div>
                  <div className="tratamiento-col-email">maria.gonzalez@yahoo.com</div>
                  <div className="tratamiento-col-appointment">16/08/2025 - 10:30</div>
                  <div className="tratamiento-col-status tratamiento-confirmed">
                    <span className="tratamiento-status-dot"></span>
                    Confirmada
                  </div>
                  <div className="tratamiento-col-actions">
                    <button className="tratamiento-options-btn">
                      <img src="/img/3dots-icon.png" alt="Opciones" />
                    </button>
                  </div>
                </div>

                <div className="tratamiento-table-row">
                  <div className="tratamiento-col-checkbox">
                    <input 
                      type="checkbox" 
                      id="tratamiento-apt3"
                      checked={selectedRows.includes('tratamiento-apt3')}
                      onChange={() => handleRowSelect('tratamiento-apt3')}
                    />
                  </div>
                  <div className="tratamiento-col-patient">
                    <div className="tratamiento-patient-name">Ana María Jiménez</div>
                    <div className="tratamiento-patient-number">555-4567</div>
                  </div>
                  <div className="tratamiento-col-phone">+34 610 12 34 56</div>
                  <div className="tratamiento-col-email">olivia.martinez@live.com</div>
                  <div className="tratamiento-col-appointment">20/08/2025 - 15:45</div>
                  <div className="tratamiento-col-status tratamiento-pending">
                    <span className="tratamiento-status-dot"></span>
                    Pendiente
                  </div>
                  <div className="tratamiento-col-actions">
                    <button className="tratamiento-options-btn">
                      <img src="/img/3dots-icon.png" alt="Opciones" />
                    </button>
                  </div>
                </div>

                <div className="tratamiento-table-row">
                  <div className="tratamiento-col-checkbox">
                    <input 
                      type="checkbox" 
                      id="tratamiento-apt4"
                      checked={selectedRows.includes('tratamiento-apt4')}
                      onChange={() => handleRowSelect('tratamiento-apt4')}
                    />
                  </div>
                  <div className="tratamiento-col-patient">
                    <div className="tratamiento-patient-name">Pepito Jiménez Sancho</div>
                    <div className="tratamiento-patient-number">555-7890</div>
                  </div>
                  <div className="tratamiento-col-phone">+34 615 67 89 01</div>
                  <div className="tratamiento-col-email">michael.johnson@protonmail.com</div>
                  <div className="tratamiento-col-appointment">20/08/2025 - 15:45</div>
                  <div className="tratamiento-col-status tratamiento-confirmed">
                    <span className="tratamiento-status-dot"></span>
                    Confirmada
                  </div>
                  <div className="tratamiento-col-actions">
                    <button className="tratamiento-options-btn">
                      <img src="/img/3dots-icon.png" alt="Opciones" />
                    </button>
                  </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="tratamiento-pagination-container">
              <div className="tratamiento-pagination">
                <span className="tratamiento-page tratamiento-active">01</span>
                <span className="tratamiento-page">02</span>
                <span className="tratamiento-page">03</span>
                <span className="tratamiento-dots">...</span>
                <span className="tratamiento-page">04</span>
                <span className="tratamiento-page">05</span>
                <span className="tratamiento-page">06</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="tratamiento-copyright">© 2025 Bokifly</div>
      </div>

      {/* Edit Treatment Modal */}
      <EditTratamientoModal
        isOpen={showEditModal}
        onClose={handleCloseEditModal}
        onSave={handleSaveTreatment}
      />

      {/* Horarios Modal */}
      {showHorariosModal && (
        <div className="horarios-modal-overlay" onClick={handleCloseHorariosModal}>
          <div className="horarios-modal" onClick={(e) => e.stopPropagation()}>
            <div className="horarios-modal-header">
              <h3 className="horarios-modal-title">Horarios</h3>
            </div>

            <div className="horarios-modal-content">
              <div className="horarios-table">
                <div className="horarios-table-header">
                  <div className="horarios-col-dia">Día</div>
                  <div className="horarios-col-inicio">Inicio</div>
                  <div className="horarios-col-fin">Fin</div>
                </div>
                
                {Object.entries(horarios).map(([dia, horario]) => (
                  <div key={dia} className="horarios-table-row">
                    <div className="horarios-col-dia">
                      {dia.charAt(0).toUpperCase() + dia.slice(1)}
                    </div>
                    <div className="horarios-col-inicio">
                      <div className="horarios-select-wrapper">
                        <select
                          value={horario.inicio}
                          onChange={(e) => handleHorarioChange(dia, 'inicio', e.target.value)}
                          className="horarios-time-select"
                        >
                          {['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00'].map(t => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="horarios-col-fin">
                      <div className="horarios-select-wrapper">
                        <select
                          value={horario.fin}
                          onChange={(e) => handleHorarioChange(dia, 'fin', e.target.value)}
                          className="horarios-time-select"
                        >
                          {['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00'].map(t => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="horarios-modal-footer">
              <button className="horarios-btn-cancel" onClick={handleCloseHorariosModal}>
                Cancelar
              </button>
              <button className="horarios-btn-save" onClick={handleSaveHorarios}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TratamientoDetailsPage;