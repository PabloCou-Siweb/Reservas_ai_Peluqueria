import React, { useState } from 'react';
import './EditAppointmentModal.css';

interface EditAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: any) => void;
  appointmentData?: {
    specialist: string;
    date: string;
    time: string;
    duration: string;
    client: string;
    phone: string;
    email: string;
    documentType: string;
    documentNumber: string;
    reason: string;
    notes: string;
  };
}

const EditAppointmentModal: React.FC<EditAppointmentModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  appointmentData
}) => {
  const [formData, setFormData] = useState({
    specialist: appointmentData?.specialist || '',
    date: appointmentData?.date || '',
    time: appointmentData?.time || '',
    duration: appointmentData?.duration || '',
    client: appointmentData?.client || '',
    phone: appointmentData?.phone || '',
    email: appointmentData?.email || '',
    documentType: appointmentData?.documentType || 'DNI',
    documentNumber: appointmentData?.documentNumber || '',
    reason: appointmentData?.reason || '',
    notes: appointmentData?.notes || ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleConfirm = () => {
    onConfirm(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="edit-appointment-overlay">
      <div className="edit-appointment-modal">
        <div className="modal-header">
          <h2>Información de la cita</h2>
          <button className="close-button" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        
        <p className="modal-description">
          Modifica los detalles de la cita para reflejar cambios o añadir información relevante.
        </p>

        {/* Resumen de la cita */}
        <div className="appointment-summary">
          <h3>Resumen de la cita</h3>
          <div className="summary-grid">
            <div className="summary-column">
              <div className="summary-item">
                <span className="label">Especialista:</span>
                <span className="value">{formData.specialist}</span>
                <p className="secondary-info">Peluquera</p>
              </div>
            </div>
            <div className="summary-column">
              <div className="summary-item">
                <span className="label">Fecha y hora:</span>
                <span className="value">{formData.date} - {formData.time}</span>
                <p className="secondary-info">Duración: {formData.duration}</p>
              </div>
            </div>
            <div className="summary-column">
              <div className="summary-item">
                <span className="label">Cliente:</span>
                <span className="value">{formData.client}</span>
                <p className="secondary-info">{formData.phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Datos del cliente */}
        <div className="client-data">
          <div className="section-header">
            <div className="section-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <h3>Datos del cliente</h3>
          </div>
          
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Buscar por nombre, teléfono, DNI o email..."
              className="search-input"
            />
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </div>

          <div className="form-grid">
            {/* Primera fila: Nombre, Email y Teléfono */}
            <div className="form-row-three">
              <div className="form-group">
                <label>Nombre completo</label>
                <input 
                  type="text" 
                  value={formData.client}
                  onChange={(e) => handleInputChange('client', e.target.value)}
                  placeholder="Ej: Juan Pérez Izquierdo"
                />
              </div>
              
              <div className="form-group">
                <label>Correo electrónico</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="ejemplo@correo.com"
                />
              </div>
              
              <div className="form-group">
                <label>Teléfono</label>
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+34 622 02 58 26"
                />
              </div>
            </div>
            
            {/* Segunda fila: Documento */}
            <div className="form-row">
              <div className="form-group">
                <label>Tipo de documento</label>
                <select 
                  value={formData.documentType}
                  onChange={(e) => handleInputChange('documentType', e.target.value)}
                >
                  <option value="DNI">DNI</option>
                  <option value="NIE">NIE</option>
                  <option value="Pasaporte">Pasaporte</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Nº de documento</label>
                <input 
                  type="text" 
                  value={formData.documentNumber}
                  onChange={(e) => handleInputChange('documentNumber', e.target.value)}
                  placeholder="359784685Q"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Detalles de la cita */}
        <div className="appointment-details">
          <div className="section-header">
            <div className="section-icon">
              <img src="/img/scissor-icon.png" alt="Scissors" width="20" height="20" />
            </div>
            <h3>Detalles de la cita</h3>
          </div>
          
          <div className="form-group">
            <label>Motivo de la cita</label>
            <input 
              type="text" 
              value={formData.reason}
              onChange={(e) => handleInputChange('reason', e.target.value)}
              placeholder="Ej: Corte, Tinte, Peinado..."
            />
          </div>
          
          <div className="form-group">
            <label>Notas adicionales</label>
            <textarea 
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Información adicional que consideres relevante..."
              rows={4}
            />
          </div>
        </div>

        {/* Botones de acción */}
        <div className="modal-actions">
          <button className="cancel-button" onClick={onClose}>
            Cancelar
          </button>
          <button className="confirm-button" onClick={handleConfirm}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAppointmentModal;
