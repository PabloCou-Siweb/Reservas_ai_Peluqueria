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
    // Mostrar el modal de cita agendada
    setIsCitaAgendadaOpen(true);
  };

  const handleCitaAgendadaClose = () => {
    setIsCitaAgendadaOpen(false);
    // Navegar a la página de citas después de cerrar el modal
    navigateTo('citas');
  };

  return (
    <div className="nueva-cita-container nueva-cita-page">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="main-content">
        {/* Header unificado */}
        <div className="unified-header">
          <div className="header-top">
            <div className="breadcrumbs">
              <span>Citas</span>
              <span className="separator">/</span>
              <span className="current">Nueva cita</span>
            </div>
            <div className="header-actions">
              <button className="notification-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
              </button>
              <button className="settings-btn" onClick={() => navigateTo('configuracion')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
              </button>
            </div>
          </div>
          <div className="title-section">
            <div className="title-row">
              <button className="back-button" onClick={() => navigateTo('citas')}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="15,18 9,12 15,6"/>
                </svg>
              </button>
              <h1>Nueva cita</h1>
            </div>
            <p>Complete el formulario para agendar una nueva cita médica. Seleccione el médico, fecha y hora disponible.</p>
          </div>
        </div>

        {/* Formulario compacto */}
        <form className="nueva-cita-form" onSubmit={handleSubmit}>
          {/* Datos del cliente */}
          <div className="section-header">
            <div className="header-left">
              <div className="header-icon">
                <img src="/img/user-icon.png" alt="Usuario" />
              </div>
              <h3>Datos del cliente</h3>
            </div>
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

          {/* Detalles de la cita */}
          <div className="section-header">
            <div className="header-left">
              <div className="header-icon">
                <img src="/img/scissor-icon.png" alt="Tijeras" />
              </div>
              <h3>Detalles de la cita</h3>
            </div>
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
          </div>

          {/* Notas adicionales */}
          <div className="section-content">
            <h4 className="section-subtitle">Notas adicionales</h4>
            <div className="form-group">
              <label htmlFor="notas">Información adicional que consideres relevante...</label>
              <textarea
                id="notas"
                name="notas"
                value={formData.notas}
                onChange={handleInputChange}
                rows={3}
                placeholder="Escribe aquí cualquier información adicional..."
              />
            </div>
          </div>

          {/* Resumen de la cita */}
          <div className="appointment-summary">
            <h3>Resumen de la cita</h3>
            <div className="summary-grid">
              <div className="summary-column">
                <div className="summary-content">
                  <div className="summary-label-row">
                    <div className="summary-dot"></div>
                    <span className="summary-label">Especialista:</span>
                  </div>
                  <span className="summary-value">José Martinez Soria Peluquera</span>
                </div>
              </div>
              <div className="summary-column">
                <div className="summary-content">
                  <div className="summary-label-row">
                    <div className="summary-dot"></div>
                    <span className="summary-label">Fecha y hora:</span>
                  </div>
                  <span className="summary-value">2025/08/08 - 08:00 <span className="summary-duration">Duración: 30 minutos</span></span>
                </div>
              </div>
              <div className="summary-column">
                <div className="summary-content">
                  <div className="summary-label-row">
                    <div className="summary-dot"></div>
                    <span className="summary-label">Cliente:</span>
                  </div>
                  <span className="summary-value">Elena Ruiz González +34 585 58 52</span>
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

        {/* Footer */}
        <div className="footer">
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