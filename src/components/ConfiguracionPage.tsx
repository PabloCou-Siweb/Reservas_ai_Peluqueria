import React, { useState } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import Sidebar from './Sidebar';
import './ConfiguracionPage.css';

const ConfiguracionPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedSection, setExpandedSection] = useState<string | null>('datos-local');
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
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <div className="config-notification-dot"></div>
            </div>
            <div className="config-settings-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
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
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66L9.64 16.2a2 2 0 0 1-2.83-2.83l8.49-8.49"/>
                        </svg>
                        Añadir imagen
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
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10,9 9,9 8,9"/>
                </svg>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfiguracionPage;