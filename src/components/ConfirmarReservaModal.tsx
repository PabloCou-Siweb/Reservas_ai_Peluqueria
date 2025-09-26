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
      // Simular procesamiento
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
          <h2>Confirmar Reserva</h2>
          <button className="close-button" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="modal-body">
          <div className="confirmation-info">
            <h3>¿Confirmar la reserva para {clientName}?</h3>
            {appointmentData && (
              <div className="appointment-details">
                <div className="detail-row">
                  <span className="label">Especialidad:</span>
                  <span className="value">{appointmentData.specialty}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Especialista:</span>
                  <span className="value">{appointmentData.specialist}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Fecha:</span>
                  <span className="value">{appointmentData.date}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Hora:</span>
                  <span className="value">{appointmentData.time}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Duración:</span>
                  <span className="value">{appointmentData.duration}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Motivo:</span>
                  <span className="value">{appointmentData.reason}</span>
                </div>
              </div>
            )}
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