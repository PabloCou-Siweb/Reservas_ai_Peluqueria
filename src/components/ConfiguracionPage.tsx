import React, { useState } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import Sidebar from './Sidebar';
import './ConfiguracionPage.css';
import './HeaderButtons.css';

const ConfiguracionPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showHorariosEdit, setShowHorariosEdit] = useState(false);
  const [formData, setFormData] = useState({
    nombreComercial: 'Peluquería Gabriel',
    razonSocial: 'Peluquería Gabriel S.A.',
    cif: 'B93656898',
    direccion: 'Calle Mayor 123, Madrid',
    telefono1: '+34 900256895',
    telefono2: '+34 625989696',
    email1: 'gabipeluquero@gmail.com',
    email2: 'gabipeluquero@gmail.com'
  });

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleBack = () => {
    navigateTo('dashboard');
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Guardando datos del local:', formData);
  };

  const handleCancel = () => {
    console.log('Cancelando cambios');
  };

  const handleChangePlan = () => {
    navigateTo('comprar-minutos');
  };

  const handleCancelSubscription = () => {
    setShowCancelModal(true);
  };

  const handleCloseCancelModal = () => {
    setShowCancelModal(false);
  };

  const handleConfirmCancel = () => {
    console.log('Cancelando suscripción...');
    setShowCancelModal(false);
  };

  const handleEditHorarios = () => {
    setShowHorariosEdit(true);
  };

  const handleSaveHorarios = () => {
    console.log('Guardando horarios...');
    setShowHorariosEdit(false);
  };

  return (
    <div className="configuracion-page">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

      <div className={`main-content ${!sidebarOpen ? 'sidebar-closed' : ''}`}>
        {/* Header */}
        <div className="config-header">
          <div className="config-header-left">
            <div className="config-breadcrumbs">
              <span>Inicio</span>
              <span className="config-separator">/</span>
              <span>Configuración</span>
            </div>
            <div className="config-title-section">
              <button className="config-back-btn" onClick={handleBack}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
              <h1 className="config-page-title">Configuración</h1>
            </div>
            <p className="config-page-subtitle">
              Ajusta la información general, horarios, especialidades, equipo y preferencias de la agenda. 
              Aquí podrás personalizar la experiencia de tu local y optimizar el funcionamiento de las citas y la atención al cliente.
            </p>
          </div>
          <div className="config-header-actions">
            <div className="config-notification-btn">
              <img src="/img/notification-icon.png" alt="Notificaciones" width="20" height="20" />
            </div>
            <div className="config-settings-btn">
              <img src="/img/settings-icon.png" alt="Configuración" width="20" height="20" />
            </div>
          </div>
        </div>

        {/* Settings Container */}
        <div className="settings-container">
          {/* Datos del local */}
          <div className="settings-card">
            <div 
              className="card-header" 
              onClick={() => toggleSection('datos-local')}
            >
              <div className="card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9,22 9,12 15,12 15,22"/>
                </svg>
              </div>
              <div className="card-content">
                <h3>Datos del local</h3>
                <p>Información básica del establecimiento</p>
              </div>
              <div className={`card-arrow ${expandedSection === 'datos-local' ? 'expanded' : ''}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </div>
            </div>
            
            {expandedSection === 'datos-local' && (
              <div className="card-form">
                <div className="form-content">
                  <div className="form-left">
                    <div className="image-upload">
                      <div className="image-placeholder">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                          <circle cx="12" cy="7" r="4"/>
                        </svg>
                      </div>
                      <button className="add-image-btn">
                        <span>Añadir imagen</span>
                        <img src="/img/rounded_pen-icon.png" alt="Editar" width="16" height="16" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="form-right">
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Nombre comercial</label>
                        <input 
                          type="text" 
                          value={formData.nombreComercial}
                          onChange={(e) => handleInputChange('nombreComercial', e.target.value)}
                          placeholder="Ej: Peluquería Gabriel"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Razón social</label>
                        <input 
                          type="text" 
                          value={formData.razonSocial}
                          onChange={(e) => handleInputChange('razonSocial', e.target.value)}
                          placeholder="Ej: Peluquería Gabriel S.A."
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>CIF</label>
                        <input 
                          type="text" 
                          value={formData.cif}
                          onChange={(e) => handleInputChange('cif', e.target.value)}
                          placeholder="B93656898"
                        />
                      </div>
                      
                      <div className="form-group full-width">
                        <label>Dirección</label>
                        <input 
                          type="text" 
                          value={formData.direccion}
                          onChange={(e) => handleInputChange('direccion', e.target.value)}
                          placeholder="Dirección completa..."
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Teléfono 1</label>
                        <input 
                          type="tel" 
                          value={formData.telefono1}
                          onChange={(e) => handleInputChange('telefono1', e.target.value)}
                          placeholder="+34 900256895"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Teléfono 2</label>
                        <input 
                          type="tel" 
                          value={formData.telefono2}
                          onChange={(e) => handleInputChange('telefono2', e.target.value)}
                          placeholder="+34 625989696"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Correo electrónico 1</label>
                        <input 
                          type="email" 
                          value={formData.email1}
                          onChange={(e) => handleInputChange('email1', e.target.value)}
                          placeholder="gabipeluquero@gmail.com"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Correo electrónico 2</label>
                        <input 
                          type="email" 
                          value={formData.email2}
                          onChange={(e) => handleInputChange('email2', e.target.value)}
                          placeholder="gabipeluquero@gmail.com"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="form-actions">
                  <button className="btn-cancel" onClick={handleCancel}>
                    Cancelar
                  </button>
                  <button className="btn-save" onClick={handleSave}>
                    Guardar
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Suscripción y facturación */}
          <div className="settings-card">
            <div 
              className="card-header" 
              onClick={() => toggleSection('suscripcion')}
            >
              <div className="card-icon">
                <img src="/img/card-icon.png" alt="Suscripción y facturación" width="24" height="24" />
              </div>
              <div className="card-content">
                <h3>Suscripción y facturación</h3>
                <p>Gestiona tu plan y métodos de pago</p>
              </div>
              <div className={`card-arrow ${expandedSection === 'suscripcion' ? 'expanded' : ''}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </div>
            </div>
            
            {expandedSection === 'suscripcion' && (
              <div className="card-form">
                <div className="suscripcion-content">
                  <div className="suscripcion-left">
                    <div className="suscripcion-plan-section">
                      <h4 className="suscripcion-plan-title">Detalles del plan</h4>
                      <div className="suscripcion-plan-details">
                        <div className="suscripcion-plan-content">
                        <div className="suscripcion-plan-row">
                          <div className="suscripcion-plan-item">
                            <span className="suscripcion-plan-label">Plan actual</span>
                            <span className="suscripcion-plan-value">Plan Profesional</span>
                          </div>
                          <div className="suscripcion-plan-item">
                            <span className="suscripcion-plan-label">Precio mensual</span>
                            <span className="suscripcion-plan-value">$89/mes</span>
                          </div>
                        </div>
                        <div className="suscripcion-plan-row">
                          <div className="suscripcion-plan-item">
                            <span className="suscripcion-plan-label">Fecha de inicio</span>
                            <span className="suscripcion-plan-value">15 de enero de 2024</span>
                          </div>
                          <div className="suscripcion-plan-item">
                            <span className="suscripcion-plan-label">Estado de renovación</span>
                            <span className="suscripcion-plan-value">Automática</span>
                          </div>
                        </div>
                        <div className="suscripcion-plan-row">
                          <div className="suscripcion-plan-item">
                            <span className="suscripcion-plan-label">Próxima facturación</span>
                            <span className="suscripcion-plan-value">15 de febrero de 2024</span>
                          </div>
                          <div className="suscripcion-plan-item">
                            <span className="suscripcion-plan-label">Fecha de vencimiento</span>
                            <span className="suscripcion-plan-value">15 de febrero de 2024</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>
                  
                  <div className="suscripcion-right">
                    <div className="suscripcion-widget">
                      <div className="suscripcion-illustration">
                        <img src="/img/minutos-img.png" alt="Minutos" className="suscripcion-minutos-illustration" />
                      </div>
                      <div className="suscripcion-widget-content">
                        <div className="suscripcion-minutes-info">
                          <div className="suscripcion-clock-icon">
                            <img src="/img/clock-icon.png" alt="Clock" width="16" height="16" />
                          </div>
                          <span className="suscripcion-minutes-number">300</span>
                          <span className="suscripcion-minutes-text">minutos restantes</span>
                        </div>
                        <button className="suscripcion-comprar-btn">
                          <div className="suscripcion-plus-icon">
                            <img src="/img/add-icon.png" alt="Añadir" width="16" height="16" />
                          </div>
                          Comprar más minutos
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="suscripcion-minutos-actuales">
                  <div className="suscripcion-minutos-header">
                    <h4>Minutos actuales</h4>
                    <div className="suscripcion-info-icon">
                      <img src="/img/alert-icon.png" alt="Alert" width="16" height="16" />
                    </div>
                  </div>
                  <div className="suscripcion-minutos-content">
                    <div className="suscripcion-minutos-display">
                      <span className="suscripcion-minutos-number">480</span>
                      <span className="suscripcion-minutos-text">Minutos utilizados</span>
                    </div>
                    <div className="suscripcion-progress-section">
                      <div className="suscripcion-progress-bar">
                        <div className="suscripcion-progress-fill" style={{ width: '96%' }}></div>
                      </div>
                      <div className="suscripcion-progress-text">
                        <span>480/500</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="suscripcion-form-actions">
                  <button className="suscripcion-btn-download">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7,10 12,15 17,10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Descargar factura
                  </button>
                  <div className="suscripcion-actions-row">
                    <button className="suscripcion-btn-cancel" onClick={handleCancelSubscription}>
                      Cancelar suscripción
                    </button>
                    <button className="suscripcion-btn-save" onClick={handleChangePlan}>
                      Cambiar plan
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Horarios */}
          <div className="settings-card">
            <div 
              className="card-header" 
              onClick={() => toggleSection('horarios')}
            >
              <div className="card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12,6 12,12 16,14"/>
                </svg>
              </div>
              <div className="card-content">
                <h3>Horarios</h3>
                <p>Configura los horarios de atención</p>
              </div>
              <div className={`card-arrow ${expandedSection === 'horarios' ? 'expanded' : ''}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </div>
            </div>
            
            {expandedSection === 'horarios' && (
              <div className="card-form">
                <div className="horarios-content">
                  <div className="horarios-cards">
                    <div className="horarios-day-card">
                      <div className="horarios-day-header">
                        <span className="horarios-day-name">Lunes</span>
                        <div className="horarios-clock-icon">
                          <img src="/img/clock-icon.png" alt="Clock" width="16" height="16" />
                        </div>
                      </div>
                      <div className="horarios-day-status">Abierto</div>
                      <div className="horarios-time-slots">
                        <div className="horarios-time">09:00 - 14:00</div>
                        <div className="horarios-time">15:00 - 21:00</div>
                      </div>
                    </div>

                    <div className="horarios-day-card">
                      <div className="horarios-day-header">
                        <span className="horarios-day-name">Martes</span>
                        <div className="horarios-clock-icon">
                          <img src="/img/clock-icon.png" alt="Clock" width="16" height="16" />
                        </div>
                      </div>
                      <div className="horarios-day-status">Abierto</div>
                      <div className="horarios-time-slots">
                        <div className="horarios-time">09:00 - 14:00</div>
                        <div className="horarios-time">15:00 - 21:00</div>
                      </div>
                    </div>

                    <div className="horarios-day-card">
                      <div className="horarios-day-header">
                        <span className="horarios-day-name">Miércoles</span>
                        <div className="horarios-clock-icon">
                          <img src="/img/clock-icon.png" alt="Clock" width="16" height="16" />
                        </div>
                      </div>
                      <div className="horarios-day-status">Abierto</div>
                      <div className="horarios-time-slots">
                        <div className="horarios-time">09:00 - 14:00</div>
                        <div className="horarios-time">15:00 - 21:00</div>
                      </div>
                    </div>

                    <div className="horarios-day-card">
                      <div className="horarios-day-header">
                        <span className="horarios-day-name">Jueves</span>
                        <div className="horarios-clock-icon">
                          <img src="/img/clock-icon.png" alt="Clock" width="16" height="16" />
                        </div>
                      </div>
                      <div className="horarios-day-status">Abierto</div>
                      <div className="horarios-time-slots">
                        <div className="horarios-time">09:00 - 14:00</div>
                        <div className="horarios-time">15:00 - 21:00</div>
                      </div>
                    </div>

                    <div className="horarios-day-card">
                      <div className="horarios-day-header">
                        <span className="horarios-day-name">Viernes</span>
                        <div className="horarios-clock-icon">
                          <img src="/img/clock-icon.png" alt="Clock" width="16" height="16" />
                        </div>
                      </div>
                      <div className="horarios-day-status">Abierto</div>
                      <div className="horarios-time-slots">
                        <div className="horarios-time">09:00 - 14:00</div>
                        <div className="horarios-time">15:00 - 21:00</div>
                      </div>
                    </div>

                    <div className="horarios-day-card">
                      <div className="horarios-day-header">
                        <span className="horarios-day-name">Sábado</span>
                        <div className="horarios-clock-icon">
                          <img src="/img/clock-icon.png" alt="Clock" width="16" height="16" />
                        </div>
                      </div>
                      <div className="horarios-day-status">Abierto</div>
                      <div className="horarios-time-slots">
                        <div className="horarios-time">09:00 - 14:00</div>
                        <div className="horarios-time">15:00 - 24:00</div>
                      </div>
                    </div>

                    <div className="horarios-day-card">
                      <div className="horarios-day-header">
                        <span className="horarios-day-name">Domingo</span>
                        <div className="horarios-clock-icon">
                          <img src="/img/clock-icon.png" alt="Clock" width="16" height="16" />
                        </div>
                      </div>
                      <div className="horarios-day-status">Guardia</div>
                      <div className="horarios-time-slots">
                        <div className="horarios-time">09:00 - 14:00</div>
                        <div className="horarios-time">15:00 - 21:00</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="horarios-actions">
                    <button className="horarios-edit-btn" onClick={handleEditHorarios}>
                      Editar
                    </button>
                  </div>
                  
                  {showHorariosEdit && (
                    <div className="horarios-edit-form">
                      <div className="horarios-form-row">
                        <div className="horarios-form-group">
                          <label>Día</label>
                          <select className="horarios-form-select">
                            <option value="lunes">Lunes</option>
                            <option value="martes">Martes</option>
                            <option value="miercoles">Miércoles</option>
                            <option value="jueves">Jueves</option>
                            <option value="viernes">Viernes</option>
                            <option value="sabado">Sábado</option>
                            <option value="domingo">Domingo</option>
                          </select>
                        </div>
                        <div className="horarios-form-group">
                          <label>Inicio</label>
                          <input type="time" className="horarios-form-input" defaultValue="08:00" />
                        </div>
                        <div className="horarios-form-group">
                          <label>Fin</label>
                          <input type="time" className="horarios-form-input" defaultValue="13:30" />
                        </div>
                        <div className="horarios-form-buttons">
                          <button className="horarios-btn-add">
                            Añadir
                          </button>
                          <button className="horarios-btn-save" onClick={handleSaveHorarios}>
                            Guardar
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Seguridad */}
          <div className="settings-card">
            <div 
              className="card-header" 
              onClick={() => toggleSection('seguridad')}
            >
              <div className="card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="M9 12l2 2 4-4"/>
                </svg>
              </div>
              <div className="card-content">
                <h3>Seguridad</h3>
                <p>Contraseñas y acceso seguro</p>
              </div>
              <div className={`card-arrow ${expandedSection === 'seguridad' ? 'expanded' : ''}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </div>
            </div>
            
            {expandedSection === 'seguridad' && (
              <div className="card-form">
                <div className="seguridad-content">
                  <div className="seguridad-password-section">
                    <div className="seguridad-form-group">
                      <label>Contraseña actual</label>
                      <input 
                        type="password" 
                        className="seguridad-form-input" 
                        placeholder="Ej: Peluquería Gabriel"
                      />
                    </div>
                    
                    <div className="seguridad-form-group">
                      <label>Nueva contraseña</label>
                      <input 
                        type="password" 
                        className="seguridad-form-input" 
                        placeholder="Ej: Peluquería Gabriel"
                      />
                    </div>
                    
                    <div className="seguridad-form-group">
                      <label>Confirmar contraseña</label>
                      <input 
                        type="password" 
                        className="seguridad-form-input" 
                        placeholder="Ej: Peluquería Gabriel"
                      />
                    </div>
                  </div>
                  
                  <div className="seguridad-2fa-section">
                    <div className="seguridad-2fa-content">
                      <div className="seguridad-2fa-text">
                        <h4>Doble factor de autenticación.</h4>
                        <p>Añade una capa extra de seguridad solicitando un código de verificación adicional al iniciar sesión, enviado por SMS, correo electrónico o aplicación de autenticación.</p>
                      </div>
                      <div className="seguridad-2fa-toggle">
                        <label className="seguridad-toggle-switch">
                          <input type="checkbox" />
                          <span className="seguridad-toggle-slider"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="seguridad-actions">
                    <button className="seguridad-btn-cancel">
                      Cancelar
                    </button>
                    <button className="seguridad-btn-save">
                      Guardar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Notificaciones */}
          <div className="settings-card">
            <div 
              className="card-header" 
              onClick={() => toggleSection('notificaciones')}
            >
              <div className="card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
              </div>
              <div className="card-content">
                <h3>Notificaciones</h3>
                <p>Configura las alertas y recordatorios</p>
              </div>
              <div className={`card-arrow ${expandedSection === 'notificaciones' ? 'expanded' : ''}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </div>
            </div>
            
            {expandedSection === 'notificaciones' && (
              <div className="card-form">
                <div className="notificaciones-content">
                  <p className="notificaciones-intro">
                    Administra cómo recibes actualizaciones sobre las citas, pacientes y eventos importantes dentro de tu clínica.
                  </p>
                  
                  <div className="notificaciones-section">
                    <h4>Notificaciones Generales</h4>
                    
                    <div className="notificaciones-option">
                      <div className="notificaciones-option-content">
                        <h5>Nuevas citas agendadas</h5>
                        <p>Recibe alertas cuando se registra una nueva cita en la clínica, ya sea por IA o de forma manual.</p>
                      </div>
                      <div className="notificaciones-option-toggle">
                        <label className="notificaciones-toggle-switch">
                          <input type="checkbox" />
                          <span className="notificaciones-toggle-slider"></span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="notificaciones-option">
                      <div className="notificaciones-option-content">
                        <h5>Cambios o reprogramaciones de citas</h5>
                        <p>Recibe notificaciones cuando una cita es modificada por el paciente o por recepción.</p>
                      </div>
                      <div className="notificaciones-option-toggle">
                        <label className="notificaciones-toggle-switch">
                          <input type="checkbox" />
                          <span className="notificaciones-toggle-slider"></span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="notificaciones-option">
                      <div className="notificaciones-option-content">
                        <h5>Cancelaciones de citas</h5>
                        <p>Recibe alertas cuando un paciente cancela una cita programada.</p>
                      </div>
                      <div className="notificaciones-option-toggle">
                        <label className="notificaciones-toggle-switch">
                          <input type="checkbox" />
                          <span className="notificaciones-toggle-slider"></span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="notificaciones-option">
                      <div className="notificaciones-option-content">
                        <h5>Recordatorios automáticos</h5>
                        <p>Recibe avisos cuando un paciente envía un mensaje por WhatsApp o chat.</p>
                      </div>
                      <div className="notificaciones-option-toggle">
                        <label className="notificaciones-toggle-switch">
                          <input type="checkbox" />
                          <span className="notificaciones-toggle-slider"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="notificaciones-section">
                    <h4>Métodos de Entrega</h4>
                    
                    <div className="notificaciones-option">
                      <div className="notificaciones-option-content">
                        <h5>Notificaciones por Correo Electrónico</h5>
                        <p>Recibe notificaciones por correo electrónico para actualizaciones y alertas importantes.</p>
                      </div>
                      <div className="notificaciones-option-toggle">
                        <label className="notificaciones-toggle-switch">
                          <input type="checkbox" />
                          <span className="notificaciones-toggle-slider"></span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="notificaciones-option">
                      <div className="notificaciones-option-content">
                        <h5>Notificaciones dentro de la aplicación</h5>
                        <p>Visualiza alertas en tiempo real desde el panel principal de la app.</p>
                      </div>
                      <div className="notificaciones-option-toggle">
                        <label className="notificaciones-toggle-switch">
                          <input type="checkbox" />
                          <span className="notificaciones-toggle-slider"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="notificaciones-actions">
                    <button className="notificaciones-btn-cancel">
                      Cancelar
                    </button>
                    <button className="notificaciones-btn-save">
                      Guardar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Configuración del agente */}
          <div className="settings-card">
            <div 
              className="card-header" 
              onClick={() => toggleSection('agente')}
            >
              <div className="card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
              </div>
              <div className="card-content">
                <h3>Configuración del agente</h3>
                <p>Personaliza el comportamiento del asistente</p>
              </div>
              <div className={`card-arrow ${expandedSection === 'agente' ? 'expanded' : ''}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </div>
            </div>
            
            {expandedSection === 'agente' && (
              <div className="card-form">
                <div className="agente-content">
                  <div className="agente-section">
                    <div className="agente-option">
                      <div className="agente-option-content">
                        <h4>Activar/desactivar IA para atención de llamadas.</h4>
                        <p>Permite que la asistente virtual atienda automáticamente las llamadas, gestione la agenda y confirme citas según la configuración de la clínica. Si está desactivado, las llamadas se derivarán directamente a recepción.</p>
                      </div>
                      <div className="agente-option-toggle">
                        <label className="agente-toggle-switch">
                          <input type="checkbox" />
                          <span className="agente-toggle-slider"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="agente-form-section">
              <div className="agente-form-group">
                <label>Redactar mensaje de bienvenida</label>
                <input
                  type="text"
                  className="agente-form-input"
                  placeholder="Mensaje de bienvenida..."
                />
              </div>
                    
                    <div className="agente-form-group">
                      <label>Idioma por defecto</label>
                      <select className="agente-form-select">
                        <option value="español">Español</option>
                        <option value="ingles">Inglés</option>
                        <option value="frances">Francés</option>
                        <option value="aleman">Alemán</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="agente-actions">
                    <button className="agente-btn-cancel">
                      Cancelar
                    </button>
                    <button className="agente-btn-save">
                      Guardar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de confirmación de cancelación */}
      {showCancelModal && (
        <div className="cancel-modal-overlay">
          <div className="cancel-modal-content">
            <button className="cancel-modal-close" onClick={handleCloseCancelModal}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            
            <div className="cancel-modal-header">
              <h2>Confirmación de cancelación</h2>
              <p>Esta acción cancelará tu suscripción actual.</p>
            </div>

            <div className="cancel-plan-summary">
              <h3>Resumen del plan</h3>
              <div className="cancel-plan-details">
                <div className="cancel-plan-item">
                  <span className="cancel-plan-label">Plan actual</span>
                  <span className="cancel-plan-value">Plan profesional</span>
                </div>
                <div className="cancel-plan-item">
                  <span className="cancel-plan-label">Finaliza</span>
                  <span className="cancel-plan-value">15 de febrero de 2024</span>
                </div>
                <div className="cancel-plan-item">
                  <span className="cancel-plan-label">Minutos restantes</span>
                  <span className="cancel-plan-value">380 minutos</span>
                </div>
                <div className="cancel-plan-item">
                  <span className="cancel-plan-label">Doctor</span>
                  <span className="cancel-plan-value">Dr. Laura Fernández</span>
                </div>
              </div>
            </div>

            <div className="cancel-important-notice">
              <div className="cancel-notice-icon">
                <img src="/img/shield_warning-icon.png" alt="Warning" width="16" height="16" />
              </div>
              <div className="cancel-notice-text">
                <strong>Importante</strong>
                <p>Tu suscripción permanecerá activa hasta el final del período actual. No se realizarán más cobros automáticos.</p>
              </div>
            </div>

            <div className="cancel-modal-actions">
              <button className="cancel-btn-cancel" onClick={handleCloseCancelModal}>
                Cancelar
              </button>
              <button className="cancel-btn-confirm" onClick={handleConfirmCancel}>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfiguracionPage;