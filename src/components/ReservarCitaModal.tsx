import React, { useState } from 'react';
import './ReservarCitaModal.css';
import ConfirmarCitaModal from './ConfirmarCitaModal';

interface ReservarCitaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: any) => void;
  specialist: {
    name: string;
    role: string;
  };
  date: string;
  time: string;
  duration: string;
}

const ReservarCitaModal: React.FC<ReservarCitaModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  specialist,
  date,
  time,
  duration
}) => {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    tipoDocumento: 'DNI',
    numeroDocumento: '',
    motivo: 'Corte',
    notas: ''
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

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

  const handleConfirmModalClose = () => {
    setIsConfirmModalOpen(false);
  };

  const handleConfirmModalConfirm = () => {
    setIsConfirmModalOpen(false);
    onConfirm(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-section">
            <h2 className="modal-title">Reservar cita</h2>
            <p className="modal-subtitle">Complete el formulario con los datos del cliente para reservar la cita.</p>
          </div>
          <button className="modal-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Resumen de la cita */}
        <div className="appointment-summary">
          <h3 className="summary-title">Resumen de la cita</h3>
          <div className="summary-grid">
            <div className="summary-column">
              <div className="summary-content">
                <div className="summary-label-row">
                  <div className="summary-dot"></div>
                  <span className="summary-label">Especialista:</span>
                </div>
                <span className="summary-value">{specialist.name} ({specialist.role})</span>
              </div>
            </div>
            <div className="summary-column">
              <div className="summary-content">
                <div className="summary-label-row">
                  <div className="summary-dot"></div>
                  <span className="summary-label">Fecha y hora:</span>
                </div>
                <span className="summary-value">{date} - {time} (Duración: {duration})</span>
              </div>
            </div>
            <div className="summary-column">
              <div className="summary-content">
                <div className="summary-label-row">
                  <div className="summary-dot"></div>
                  <span className="summary-label">Cliente:</span>
                </div>
                <span className="summary-value">Elena Ruiz González (+34 585 58 52)</span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Datos del cliente */}
          <div className="client-data-section">
            <div className="section-header">
              <div className="header-left">
                <div className="header-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h3 className="header-title">Datos del cliente</h3>
              </div>
            </div>

            <div className="section-body">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Buscar por nombre, teléfono, DNI o email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <div className="search-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                </div>
              </div>

              <div className="form-grid">
                {/* Primera fila: Nombre, Email y Teléfono */}
                <div className="form-row-three">
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
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="ejemplo@correo.com"
                      value={formData.email}
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
                      placeholder="+34 622 02 58 26"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                {/* Segunda fila: Documento */}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="tipoDocumento">Tipo de documento</label>
                    <select
                      id="tipoDocumento"
                      name="tipoDocumento"
                      value={formData.tipoDocumento}
                      onChange={handleInputChange}
                    >
                      <option value="DNI">DNI</option>
                      <option value="NIE">NIE</option>
                      <option value="Pasaporte">Pasaporte</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="numeroDocumento">N° de documento</label>
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
          </div>

          {/* Detalles de la cita */}
          <div className="appointment-details-section-clean">
            <div className="section-header">
              <div className="header-left">
                <div className="header-icon">
                  <img src="/img/scissor-icon.png" alt="Tijeras" width="20" height="20" />
                </div>
                <h3 className="header-title">Detalles de la cita</h3>
              </div>
            </div>

            <div className="section-body">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="motivo">Motivo de la cita</label>
                  <input
                    type="text"
                    id="motivo"
                    name="motivo"
                    placeholder="Corte de cabello"
                    value={formData.motivo}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="notas">Notas adicionales</label>
                  <textarea
                    id="notas"
                    name="notas"
                    placeholder="Información adicional que consideres relevante..."
                    value={formData.notas}
                    onChange={handleInputChange}
                    rows={1}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-confirm">
              Confirmar
            </button>
          </div>
        </form>

        {/* Modal de confirmación */}
        <ConfirmarCitaModal
          isOpen={isConfirmModalOpen}
          onClose={handleConfirmModalClose}
          onConfirm={handleConfirmModalConfirm}
          onCloseMainModal={onClose}
          appointmentData={{
            cliente: {
              nombre: formData.nombre || 'Elena Ruiz González',
              telefono: formData.telefono || '+34 620 25 64'
            },
            especialidad: 'Corte',
            especialista: specialist.name,
            fecha: date,
            hora: time,
            duracion: duration,
            motivo: formData.motivo || 'Corte Mantenimiento y corte de cabello'
          }}
        />
      </div>
    </div>
  );
};

export default ReservarCitaModal;
