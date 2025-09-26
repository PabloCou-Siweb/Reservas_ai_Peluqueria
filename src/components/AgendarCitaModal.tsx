import React, { useState } from 'react';
import ConfirmarCitaModal from './ConfirmarCitaModal';
import './AgendarCitaModal.css';

interface AgendarCitaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: any) => void;
  selectedClient?: any;
}

const AgendarCitaModal: React.FC<AgendarCitaModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  selectedClient
}) => {
  const [formData, setFormData] = useState({
    especialista: 'Ana Martinez',
    hora: '08:30',
    duracion: '30 minutos',
    motivo: 'Tratamiento capilar',
    notas: ''
  });
  const [isConfirmarCitaOpen, setIsConfirmarCitaOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConfirmarCitaOpen(true);
  };

  const handleConfirmarCitaClose = () => {
    setIsConfirmarCitaOpen(false);
    onClose();
  };

  const handleConfirmarCitaConfirm = () => {
    console.log('Cita confirmada');
    setIsConfirmarCitaOpen(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="agendar-modal-overlay">
      <div className="agendar-modal-content">
        {/* Header */}
        <div className="agendar-modal-header">
          <div className="agendar-header-content">
            <h2 className="agendar-modal-title">Agendar cita</h2>
            <p className="agendar-modal-subtitle">
              Complete el formulario con los datos del cliente para reservar la cita.
            </p>
          </div>
          <button className="agendar-close-btn" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Detalles de la cita */}
        <div className="agendar-details-section">
          <div className="agendar-details-header">
            <div className="agendar-details-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="6" cy="6" r="3"/>
                <circle cx="6" cy="18" r="3"/>
                <line x1="20" y1="4" x2="8.12" y2="15.88"/>
                <line x1="14.47" y1="14.48" x2="20" y2="20"/>
                <line x1="8.12" y1="8.12" x2="12" y2="12"/>
              </svg>
            </div>
            <span className="agendar-details-title">Detalles de la cita</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="agendar-form">
          <div className="agendar-form-row">
            <div className="agendar-form-group">
              <label className="agendar-form-label">Especialista</label>
              <div className="agendar-input-container">
                <input
                  type="text"
                  name="especialista"
                  value={formData.especialista}
                  onChange={handleInputChange}
                  className="agendar-form-input"
                />
                <div className="agendar-dropdown-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6,9 12,15 18,9"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="agendar-form-group">
              <label className="agendar-form-label">Hora</label>
              <div className="agendar-input-container">
                <div className="agendar-clock-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12,6 12,12 16,14"/>
                  </svg>
                </div>
                <input
                  type="text"
                  name="hora"
                  value={formData.hora}
                  onChange={handleInputChange}
                  className="agendar-form-input"
                />
              </div>
            </div>
          </div>

          <div className="agendar-form-row">
            <div className="agendar-form-group">
              <label className="agendar-form-label">Duración</label>
              <div className="agendar-input-container">
                <input
                  type="text"
                  name="duracion"
                  value={formData.duracion}
                  onChange={handleInputChange}
                  className="agendar-form-input"
                />
                <div className="agendar-dropdown-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6,9 12,15 18,9"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="agendar-form-group">
              <label className="agendar-form-label">Motivo de la cita</label>
              <input
                type="text"
                name="motivo"
                value={formData.motivo}
                onChange={handleInputChange}
                className="agendar-form-input"
              />
            </div>
          </div>

          <div className="agendar-form-group">
            <label className="agendar-form-label">Notas adicionales</label>
            <textarea
              name="notas"
              value={formData.notas}
              onChange={handleInputChange}
              placeholder="Información adicional que consideres relevante..."
              className="agendar-form-textarea"
            />
          </div>

          {/* Action Buttons */}
          <div className="agendar-modal-actions">
            <button type="button" className="agendar-btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="agendar-btn-confirm">
              Aceptar
            </button>
          </div>
        </form>
      </div>

      {/* Modal de Confirmar Cita */}
      {isConfirmarCitaOpen && (
        <ConfirmarCitaModal
          isOpen={isConfirmarCitaOpen}
          onClose={handleConfirmarCitaClose}
          onConfirm={handleConfirmarCitaConfirm}
          appointmentData={{
            cliente: selectedClient ? {
              nombre: selectedClient.nombre,
              telefono: selectedClient.telefono
            } : {
              nombre: 'Cliente',
              telefono: '000-000-000'
            },
            especialidad: 'Peluquería',
            especialista: formData.especialista,
            fecha: '2025-01-15',
            hora: formData.hora,
            duracion: formData.duracion,
            motivo: formData.motivo
          }}
        />
      )}
    </div>
  );
};

export default AgendarCitaModal;
