import React, { useState } from 'react';
import './ConfirmarReservaModal.css';

interface ConfirmarReservaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  clientName?: string;
  appointmentData?: {
    client: string;
    phone: string;
    specialty: string;
    specialist: string;
    date: string;
    time: string;
    duration: string;
    reason: string;
  };
}

const ConfirmarReservaModal: React.FC<ConfirmarReservaModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  clientName = 'Cliente',
  appointmentData
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onConfirm();
      onClose();
    } catch (error) {
      console.error('Error al confirmar la reserva:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>¿Confirmar nueva cita?</h2>
          <button className="close-button" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="modal-body">
          <p className="confirmation-text">
            Por favor revisa cuidadosamente la información antes de confirmar la reserva de la cita.
          </p>
          
          {appointmentData && (
            <div className="resumen-container">
              <h4 className="resumen-titulo">Resumen de la cita</h4>
              <div className="resumen-grid">
                <div className="resumen-columna">
                  <div className="resumen-item">
                    <span className="punto"></span>
                    <span className="tipo-dato">Cliente:</span>
                  </div>
                  <div className="resumen-item">
                    <span className="punto"></span>
                    <span className="tipo-dato">Teléfono:</span>
                  </div>
                  <div className="resumen-item">
                    <span className="punto"></span>
                    <span className="tipo-dato">Especialidad:</span>
                  </div>
                  <div className="resumen-item">
                    <span className="punto"></span>
                    <span className="tipo-dato">Especialista:</span>
                  </div>
                  <div className="resumen-item">
                    <span className="punto"></span>
                    <span className="tipo-dato">Fecha y hora:</span>
                  </div>
                  <div className="resumen-item">
                    <span className="punto"></span>
                    <span className="tipo-dato">Duración:</span>
                  </div>
                  <div className="resumen-item">
                    <span className="punto"></span>
                    <span className="tipo-dato">Motivo de cita:</span>
                  </div>
                </div>
                <div className="resumen-columna">
                  <div className="valor-item">{appointmentData.client}</div>
                  <div className="valor-item">{appointmentData.phone}</div>
                  <div className="valor-item">{appointmentData.specialty}</div>
                  <div className="valor-item">{appointmentData.specialist}</div>
                  <div className="valor-item">{appointmentData.date} - {appointmentData.time}</div>
                  <div className="valor-item">{appointmentData.duration}</div>
                  <div className="valor-item">{appointmentData.reason}</div>
                </div>
              </div>
            </div>
          )}
          
          <div className="important-notice">
            <div className="notice-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 9v4"/>
                <path d="M12 17h.01"/>
                <circle cx="12" cy="12" r="10"/>
              </svg>
            </div>
            <div className="notice-text">
              <h4>Importante</h4>
              <p>Una vez confirmada la cita, se enviará una notificación al paciente y se bloqueará el horario seleccionado.</p>
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button 
            className="cancel-button" 
            onClick={onClose}
            disabled={isLoading}
          >
            Cancelar
          </button>
          <button 
            className="confirm-button" 
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Confirmando...' : 'Confirmar Reserva'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmarReservaModal;