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

  const handleConfirm = () => {
    onConfirm(formData);
    setIsConfirmModalOpen(false);
    onClose();
  };

  const handleCloseConfirm = () => {
    setIsConfirmModalOpen(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="reservar-modal-overlay" onClick={onClose}>
        <div className="reservar-modal-content" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="reservar-modal-header">
            <div className="reservar-header-content">
              <h2 className="reservar-modal-title">Reservar cita</h2>
              <p className="reservar-modal-subtitle">
                Complete el formulario con los datos del cliente para reservar la cita.
              </p>
            </div>
            <button className="reservar-close-btn" onClick={onClose}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Resumen de la cita */}
          <div className="reservar-summary-section">
            <h3 className="reservar-summary-title">Resumen de la cita</h3>
            <div className="reservar-summary-content">
              <div className="reservar-summary-item">
                <span className="reservar-summary-label">Especialista:</span>
                <span className="reservar-summary-value">{specialist.name}, {specialist.role}</span>
              </div>
              <div className="reservar-summary-item">
                <span className="reservar-summary-label">Fecha y hora:</span>
                <span className="reservar-summary-value">{date} - {time}, Duración: {duration}</span>
              </div>
              <div className="reservar-summary-item">
                <span className="reservar-summary-label">Cliente:</span>
                <span className="reservar-summary-value">Elena Ruiz González, +34 585 58 52</span>
              </div>
            </div>
          </div>

          {/* Datos del cliente */}
          <div className="reservar-client-section">
            <div className="reservar-client-header">
              <div className="reservar-client-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <span className="reservar-client-title">Datos del cliente</span>
            </div>
            <div className="reservar-client-content">
              <div className="reservar-form-group">
                <label className="reservar-form-label">Buscar cliente</label>
                <input
                  type="text"
                  className="reservar-form-input"
                  placeholder="Buscar por nombre, teléfono, DNI o email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="reservar-form-row">
                <div className="reservar-form-group">
                  <label className="reservar-form-label">Nombre completo</label>
                  <input
                    type="text"
                    name="nombre"
                    className="reservar-form-input"
                    placeholder="Ej: Juan Pérez Izquierdo"
                    value={formData.nombre}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="reservar-form-group">
                  <label className="reservar-form-label">Teléfono</label>
                  <input
                    type="tel"
                    name="telefono"
                    className="reservar-form-input"
                    placeholder="+34 622 02 58 26"
                    value={formData.telefono}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="reservar-form-row">
                <div className="reservar-form-group">
                  <label className="reservar-form-label">Correo electrónico</label>
                  <input
                    type="email"
                    name="email"
                    className="reservar-form-input"
                    placeholder="ejemplo@correo.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="reservar-form-group">
                  <label className="reservar-form-label">Tipo de documento</label>
                  <select
                    name="tipoDocumento"
                    className="reservar-form-input"
                    value={formData.tipoDocumento}
                    onChange={handleInputChange}
                  >
                    <option value="DNI">DNI</option>
                    <option value="NIE">NIE</option>
                    <option value="Pasaporte">Pasaporte</option>
                  </select>
                </div>
              </div>
              <div className="reservar-form-group">
                <label className="reservar-form-label">N° de documento</label>
                <input
                  type="text"
                  name="numeroDocumento"
                  className="reservar-form-input"
                  placeholder="359784685Q"
                  value={formData.numeroDocumento}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Detalles de la cita */}
          <div className="reservar-details-section">
            <div className="reservar-details-header">
              <div className="reservar-details-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="6" cy="6" r="3"/>
                  <circle cx="6" cy="18" r="3"/>
                  <line x1="20" y1="4" x2="8.12" y2="15.88"/>
                  <line x1="14.47" y1="14.48" x2="20" y2="20"/>
                  <line x1="8.12" y1="8.12" x2="12" y2="12"/>
                </svg>
              </div>
              <span className="reservar-details-title">Detalles de la cita</span>
            </div>
            <div className="reservar-details-content">
              <div className="reservar-form-group">
                <label className="reservar-form-label">Motivo de la cita</label>
                <input
                  type="text"
                  name="motivo"
                  className="reservar-form-input"
                  placeholder="Corte"
                  value={formData.motivo}
                  onChange={handleInputChange}
                />
              </div>
              <div className="reservar-form-group">
                <label className="reservar-form-label">Notas adicionales</label>
                <textarea
                  name="notas"
                  className="reservar-form-textarea"
                  placeholder="Información adicional que consideres relevante..."
                  value={formData.notas}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="reservar-modal-actions">
            <button type="button" className="reservar-btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="button" className="reservar-btn-confirm" onClick={handleSubmit}>
              Confirmar
            </button>
          </div>
        </div>
      </div>

      {isConfirmModalOpen && (
        <ConfirmarCitaModal
          isOpen={isConfirmModalOpen}
          onClose={handleCloseConfirm}
          onConfirm={handleConfirm}
          appointmentData={{
            especialista: specialist.name,
            especialidad: specialist.role,
            fecha: date,
            hora: time,
            duracion: duration,
            motivo: formData.motivo,
            cliente: {
              nombre: formData.nombre,
              telefono: formData.telefono
            }
          }}
        />
      )}
    </>
  );
};

export default ReservarCitaModal;