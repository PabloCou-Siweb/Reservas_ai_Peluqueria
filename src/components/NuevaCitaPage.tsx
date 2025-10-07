import React, { useState } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import Sidebar from './Sidebar';
import ConfirmarCitaModal from './ConfirmarCitaModal';
import CitaAgendadaModal from './CitaAgendadaModal';
import './NuevaCitaPage.css';

const NuevaCitaPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isCitaAgendadaOpen, setIsCitaAgendadaOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    tipoDocumento: '',
    numeroDocumento: '',
    estilista: '',
    fecha: '',
    hora: '',
    duracion: '',
    motivo: '',
    notas: ''
  });

  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConfirmModalOpen(true);
  };

  const handleCancel = () => {
    navigateTo('citas');
  };

  const handleConfirmModalClose = () => {
    setIsConfirmModalOpen(false);
  };

  const handleConfirmModalConfirm = () => {
    setIsConfirmModalOpen(false);
    setIsCitaAgendadaOpen(true);
  };

const handleCitaAgendadaClose = () => {
    setIsCitaAgendadaOpen(false);
    navigateTo('citas');
  };

  return (
    <div className="nueva-cita-container nueva-cita-page">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="main-content">
        {/* Header */}
        <header className="nueva-cita-header">
          <div className="header-content">
            <div className="header-top-row">
              <div className="breadcrumb-nav">
                <span className="breadcrumb-item">Citas</span>
                <span className="breadcrumb-separator">/</span>
                <span className="breadcrumb-current">Nueva cita</span>
              </div>
              
              <div className="header-right-section">
                <button className="icon-button notification-btn">
                  <img src="/img/notification-icon.png" alt="Notificaciones" width="20" height="20" />
                  <span className="notification-badge"></span>
                </button>
                
                <button className="icon-button settings-btn" onClick={() => navigateTo('configuracion')}>
                  <img src="/img/settings-icon.png" alt="Configuración" width="20" height="20" />
                </button>
              </div>
            </div>
            
            <div className="title-section">
              <button 
                className="page-back-btn"
                onClick={() => navigateTo('citas')}
                aria-label="Volver a citas"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.5">
                  <polyline points="15,18 9,12 15,6"/>
                </svg>
              </button>
              <span className="page-title">Nueva cita</span>
            </div>
            
            <p className="page-description">Complete el formulario para agendar una nueva cita. Seleccione el estilista, fecha y hora disponible.</p>
          </div>
        </header>

        {/* Formulario */}
        <form className="nueva-cita-form" onSubmit={handleSubmit}>
          
          {/* Sección 1: Datos del cliente */}
          <div className="form-section client-data-section">
            <div className="section-header">
              <div className="header-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <h3>Datos del cliente</h3>
            </div>
            
            <div className="section-content">
              <div className="search-container">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Buscar por nombre, teléfono, DNI o email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="form-grid">
                <div className="form-group">
                  <label>Nombre completo</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder="Juan Pérez Izquierdo"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Teléfono</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    placeholder="+34 622 02 58 26"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Correo electrónico</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="juan@gmail.com"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Tipo de documento</label>
                  <select
                    name="tipoDocumento"
                    value={formData.tipoDocumento}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Seleccionar tipo</option>
                    <option value="DNI">DNI</option>
                    <option value="NIE">NIE</option>
                    <option value="Pasaporte">Pasaporte</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>N° de documento</label>
                  <input
                    type="text"
                    name="numeroDocumento"
                    value={formData.numeroDocumento}
                    onChange={handleInputChange}
                    placeholder="359784685Q"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sección 2: Detalles de la cita */}
          <div className="form-section appointment-details-section">
            <div className="section-header">
              <div className="header-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
              <h3>Detalles de la cita</h3>
            </div>
            
            <div className="section-content">
              <div className="form-grid">
                <div className="form-group">
                  <label>Estilista</label>
                  <input
                    type="text"
                    name="estilista"
                    value={formData.estilista}
                    onChange={handleInputChange}
                    placeholder="María García"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Fecha</label>
                  <div className="input-with-icon">
                    <input
                      type="text"
                      name="fecha"
                      value={formData.fecha}
                      onChange={handleInputChange}
                      placeholder="09-10-2025"
                      required
                    />
                    <div className="input-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Hora</label>
                  <div className="input-with-icon">
                    <input
                      type="text"
                      name="hora"
                      value={formData.hora}
                      onChange={handleInputChange}
                      placeholder="08:30"
                      required
                    />
                    <div className="input-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12,6 12,12 16,14"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Duración</label>
                  <select
                    name="duracion"
                    value={formData.duracion}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Seleccionar duración</option>
                    <option value="30 minutos">30 minutos</option>
                    <option value="45 minutos">45 minutos</option>
                    <option value="60 minutos">60 minutos</option>
                    <option value="90 minutos">90 minutos</option>
                    <option value="120 minutos">120 minutos</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Motivo de la cita</label>
                  <input
                    type="text"
                    name="motivo"
                    value={formData.motivo}
                    onChange={handleInputChange}
                    placeholder="Corte de cabello"
                    required
                  />
                </div>
              </div>
              
              <div className="section-subtitle-container">
                <div className="section-subtitle">Notas adicionales</div>
                <div className="form-group">
                  <textarea
                    name="notas"
                    value={formData.notas}
                    onChange={handleInputChange}
                    placeholder="Información adicional que consideres relevante..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Resumen de la cita */}
          <div className="appointment-summary">
            <h3>Resumen de la cita</h3>
            <div className="summary-grid">
              <div className="summary-column">
                <div className="summary-item">
                  <div className="summary-label-row">
                    <div className="summary-dot specialist-dot"></div>
                    <span className="summary-label">Estilista</span>
                  </div>
                  <div className="summary-value">Ana Gómez, Peluquera</div>
                </div>
              </div>
              
              <div className="summary-column">
                <div className="summary-item">
                  <div className="summary-label-row">
                    <div className="summary-dot date-time-dot"></div>
                    <span className="summary-label">Fecha y hora</span>
                  </div>
                  <div className="summary-value">2025/08/08 - 08:00</div>
                  <div className="summary-duration">Duración: 30 minutos</div>
                </div>
              </div>
              
              <div className="summary-column">
                <div className="summary-item">
                  <div className="summary-label-row">
                    <div className="summary-dot client-dot"></div>
                    <span className="summary-label">Cliente</span>
                  </div>
                  <div className="summary-value">Elena Ruiz González</div>
                  <div className="summary-duration">+34 585 58 52</div>
                </div>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="form-actions">
            <button 
              type="button" 
              className="btn-cancel" 
              onClick={handleCancel}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn-confirm"
            >
              Confirmar
            </button>
          </div>
        </form>

        {/* Copyright */}
        <div className="copyright-container">
          <span>© 2025 Bokifly</span>
        </div>
      </div>

      {/* Modales */}
      <ConfirmarCitaModal
        isOpen={isConfirmModalOpen}
        onClose={handleConfirmModalClose}
        onConfirm={handleConfirmModalConfirm}
        appointmentData={{
          cliente: {
            nombre: formData.nombre,
            telefono: formData.telefono
          },
          especialidad: 'Peluquería',
          especialista: formData.estilista,
          fecha: formData.fecha,
          hora: formData.hora,
          duracion: formData.duracion,
          motivo: formData.motivo
        }}
      />

      <CitaAgendadaModal
        isOpen={isCitaAgendadaOpen}
        onClose={handleCitaAgendadaClose}
      />
    </div>
  );
};

export default NuevaCitaPage;