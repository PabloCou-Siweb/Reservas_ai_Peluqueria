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
    telefono: '+34 622 02 58 26',
    email: 'juan@gmail.com',
    tipoDocumento: 'DNI',
    numeroDocumento: '3597846850',
    medico: 'Dr. Martinez de la Rosa',
    fecha: '09-10-2025',
    hora: '08:30',
    duracion: '30 minutos',
    motivo: 'Corte de cabello',
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
            
            <p className="page-description">Complete el formulario para agendar una nueva cita médica. Seleccione el médico, fecha y hora disponible.</p>
          </div>
        </header>

        {/* Formulario */}
        <form className="nueva-cita-form" onSubmit={handleSubmit}>
          {/* Datos del cliente */}
          <div className="form-section">
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
                <div className="search-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="M21 21l-4.35-4.35"/>
                  </svg>
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="nombre">Nombre completo</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder="Ej: Juan Pérez Izquierdo"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="telefono">Teléfono</label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Correo electrónico</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="tipoDocumento">Tipo de documento</label>
                  <select
                    id="tipoDocumento"
                    name="tipoDocumento"
                    value={formData.tipoDocumento}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="DNI">DNI</option>
                    <option value="NIE">NIE</option>
                    <option value="Pasaporte">Pasaporte</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="numeroDocumento">Nº de documento</label>
                  <input
                    type="text"
                    id="numeroDocumento"
                    name="numeroDocumento"
                    value={formData.numeroDocumento}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Detalles de la cita */}
          <div className="form-section">
            <div className="section-header">
              <div className="header-icon">
                <img src="/img/scissor-icon.png" alt="Tijeras" width="16" height="16" />
              </div>
              <h3>Detalles de la cita</h3>
            </div>
            
            <div className="section-content">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="medico">Médico</label>
                  <input
                    type="text"
                    id="medico"
                    name="medico"
                    value={formData.medico}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="fecha">Fecha</label>
                  <div className="input-with-icon">
                    <input
                      type="text"
                      id="fecha"
                      name="fecha"
                      value={formData.fecha}
                      onChange={handleInputChange}
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
                  <label htmlFor="hora">Hora</label>
                  <div className="input-with-icon">
                    <input
                      type="text"
                      id="hora"
                      name="hora"
                      value={formData.hora}
                      onChange={handleInputChange}
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
                  <label htmlFor="duracion">Duración</label>
                  <select
                    id="duracion"
                    name="duracion"
                    value={formData.duracion}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="30 minutos">30 minutos</option>
                    <option value="45 minutos">45 minutos</option>
                    <option value="60 minutos">60 minutos</option>
                    <option value="90 minutos">90 minutos</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="motivo">Motivo de la cita</label>
                  <input
                    type="text"
                    id="motivo"
                    name="motivo"
                    value={formData.motivo}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              {/* Notas adicionales */}
              <div className="section-subtitle-container">
                <h4 className="section-subtitle">Notas adicionales</h4>
                <div className="form-group full-width">
                  <textarea
                    id="notas"
                    name="notas"
                    value={formData.notas}
                    onChange={handleInputChange}
                    rows={4}
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
                    <span className="summary-dot specialist-dot"></span>
                    <span className="summary-label">Especialista</span>
                  </div>
                  <div className="summary-value">José Martínez Soria</div>
                  <div className="summary-duration">Peluquera</div>
                </div>
              </div>
              <div className="summary-column">
                <div className="summary-item">
                  <div className="summary-label-row">
                    <span className="summary-dot date-time-dot"></span>
                    <span className="summary-label">Fecha y hora</span>
                  </div>
                  <div className="summary-value">2025/08/08 - 08:00</div>
                  <div className="summary-duration">Duración: 30 minutos</div>
                </div>
              </div>
              <div className="summary-column">
                <div className="summary-item">
                  <div className="summary-label-row">
                    <span className="summary-dot client-dot"></span>
                    <span className="summary-label">Cliente</span>
                  </div>
                  <div className="summary-value">Elena Ruiz González</div>
                  <div className="summary-duration">+34 585 58 52</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={handleCancel}>
              Cancelar
            </button>
            <button type="submit" className="btn-confirm">
              Confirmar
            </button>
          </div>
        </form>

        {/* Copyright sin footer */}
        <div className="copyright-container">
          <span>© 2025 Bokifly</span>
        </div>
      </div>

      {/* Modal de Confirmación */}
      <ConfirmarCitaModal
        isOpen={isConfirmModalOpen}
        onClose={handleConfirmModalClose}
        onConfirm={handleConfirmModalConfirm}
        appointmentData={{
          cliente: {
            nombre: formData.nombre || 'Elena Ruiz González',
            telefono: formData.telefono || '+34 620 25 64'
          },
          especialidad: 'Corte',
          especialista: formData.medico || 'Laura Fernández',
          fecha: formData.fecha || '2025/08/09',
          hora: formData.hora || '09:30',
          duracion: formData.duracion || '45 minutos',
          motivo: formData.motivo || 'Corte Mantenimiento y corte de cabello'
        }}
      />

      {/* Modal de Cita Agendada */}
      <CitaAgendadaModal
        isOpen={isCitaAgendadaOpen}
        onClose={handleCitaAgendadaClose}
      />
    </div>
  );
};

export default NuevaCitaPage;