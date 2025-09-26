import React, { useState, useEffect } from 'react';
import './CitaConfirmadaModal.css';

interface CitaConfirmadaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendSMS: () => void;
  onDownload: () => void;
  onViewAgenda: () => void;
  appointmentData: {
    client: string;
    clientNumber: string;
    dni: string;
    phone: string;
    email: string;
    specialty: string;
    specialist: string;
    date: string;
    time: string;
    duration: string;
    reason: string;
  };
}

const CitaConfirmadaModal: React.FC<CitaConfirmadaModalProps> = ({
  isOpen,
  onClose,
  onSendSMS,
  onDownload,
  onViewAgenda,
  appointmentData
}) => {
  const [confirmationNumber, setConfirmationNumber] = useState('');

  const generateConfirmationNumber = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    let result = '';
    for (let i = 0; i < 4; i++) {
      result += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    result += numbers.charAt(Math.floor(Math.random() * numbers.length));
    return result;
  };

  useEffect(() => {
    if (isOpen) {
      setConfirmationNumber(generateConfirmationNumber());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="cita-confirmada-overlay">
      <div className="cita-confirmada-modal">
        {/* Header */}
        <div className="cita-confirmada-header">
          <div className="cita-confirmada-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 12l2 2 4-4"/>
              <circle cx="12" cy="12" r="10"/>
            </svg>
          </div>
          <div className="cita-confirmada-title-section">
            <h2 className="cita-confirmada-title">Cita confirmada</h2>
            <p className="cita-confirmada-subtitle">Tu cita médica ha sido reservada exitosamente</p>
          </div>
          <button className="cita-confirmada-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="cita-confirmada-content">
          {/* Número de confirmación */}
          <div className="cita-confirmada-confirmation">
            <h3 className="confirmation-title">Número de confirmación</h3>
            <div className="confirmation-number">
              <span className="confirmation-bullet">•</span>
              <span className="confirmation-code">{confirmationNumber}</span>
            </div>
          </div>

          {/* Detalles de la cita */}
          <div className="cita-confirmada-details">
            <h3 className="details-title">Detalles de la cita</h3>
            <div className="details-list">
              <div className="detail-item">
                <span className="detail-bullet">•</span>
                <span className="detail-label">Cliente: </span>
                <span className="detail-value">{appointmentData.client}</span>
              </div>
              <div className="detail-item">
                <span className="detail-bullet">•</span>
                <span className="detail-label">N° de cliente: </span>
                <span className="detail-value">{appointmentData.clientNumber}</span>
              </div>
              <div className="detail-item">
                <span className="detail-bullet">•</span>
                <span className="detail-label">DNI: </span>
                <span className="detail-value">{appointmentData.dni}</span>
              </div>
              <div className="detail-item">
                <span className="detail-bullet">•</span>
                <span className="detail-label">Teléfono: </span>
                <span className="detail-value">{appointmentData.phone}</span>
              </div>
              <div className="detail-item">
                <span className="detail-bullet">•</span>
                <span className="detail-label">Email: </span>
                <span className="detail-value">{appointmentData.email}</span>
              </div>
              <div className="detail-item">
                <span className="detail-bullet">•</span>
                <span className="detail-label">Especialidad: </span>
                <span className="detail-value">{appointmentData.specialty}</span>
              </div>
              <div className="detail-item">
                <span className="detail-bullet">•</span>
                <span className="detail-label">Especialista: </span>
                <span className="detail-value">{appointmentData.specialist}</span>
              </div>
              <div className="detail-item">
                <span className="detail-bullet">•</span>
                <span className="detail-label">Fecha y hora: </span>
                <span className="detail-value">{appointmentData.date} - {appointmentData.time} <span className="detail-duration">Duración: {appointmentData.duration}</span></span>
              </div>
              <div className="detail-item">
                <span className="detail-bullet">•</span>
                <span className="detail-label">Motivo de cita: </span>
                <span className="detail-value">{appointmentData.reason}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="cita-confirmada-buttons">
          <div className="cita-confirmada-top-buttons">
            <button className="cita-confirmada-sms" onClick={onSendSMS}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                <path d="M13 8H7"/>
                <path d="M17 12H7"/>
              </svg>
              Enviar SMS
            </button>
            <button className="cita-confirmada-download" onClick={onDownload}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7,10 12,15 17,10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Descargar
            </button>
          </div>
          <button className="cita-confirmada-agenda" onClick={onViewAgenda}>
            Ver agenda
          </button>
        </div>
      </div>
    </div>
  );
};

export default CitaConfirmadaModal;