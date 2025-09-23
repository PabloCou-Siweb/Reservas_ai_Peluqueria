import React from 'react';
import './CitaConfirmadaModal.css';

interface CitaConfirmadaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewAgenda: () => void;
  onSendSMS: () => void;
  onDownload: () => void;
  appointmentData: {
    numeroConfirmacion: string;
    cliente: {
      nombre: string;
      numero: string;
      dni: string;
      telefono: string;
      email: string;
    };
    especialidad: string;
    especialista: string;
    fecha: string;
    hora: string;
    duracion: string;
    motivo: string;
  };
}

const CitaConfirmadaModal: React.FC<CitaConfirmadaModalProps> = ({
  isOpen,
  onClose,
  onViewAgenda,
  onSendSMS,
  onDownload,
  appointmentData
}) => {
  if (!isOpen) return null;

  return (
    <div className="cita-confirmada-overlay" onClick={onClose}>
      <div className="cita-confirmada-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cita-confirmada-header">
          <div className="success-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22,4 12,14.01 9,11.01"></polyline>
            </svg>
          </div>
          <h2 className="cita-confirmada-title">Cita confirmada</h2>
          <p className="cita-confirmada-subtitle">Tu cita ha sido reservada exitosamente</p>
          <button className="cita-confirmada-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Número de confirmación */}
        <div className="confirmacion-number">
          <div className="confirmacion-dot"></div>
          <span className="confirmacion-label">Número de confirmación:</span>
          <span className="confirmacion-value">{appointmentData.numeroConfirmacion}</span>
        </div>

        {/* Detalles de la cita */}
        <div className="cita-details">
          <h3 className="cita-details-title">Detalles de la cita</h3>
          <div className="cita-details-grid">
            <div className="cita-detail-item">
              <div className="cita-dot"></div>
              <div className="cita-detail-content">
                <span className="cita-detail-label">Cliente:</span>
                <span className="cita-detail-value">{appointmentData.cliente.nombre}</span>
              </div>
            </div>
            <div className="cita-detail-item">
              <div className="cita-dot"></div>
              <div className="cita-detail-content">
                <span className="cita-detail-label">N° de cliente:</span>
                <span className="cita-detail-value">{appointmentData.cliente.numero}</span>
              </div>
            </div>
            <div className="cita-detail-item">
              <div className="cita-dot"></div>
              <div className="cita-detail-content">
                <span className="cita-detail-label">DNI:</span>
                <span className="cita-detail-value">{appointmentData.cliente.dni}</span>
              </div>
            </div>
            <div className="cita-detail-item">
              <div className="cita-dot"></div>
              <div className="cita-detail-content">
                <span className="cita-detail-label">Teléfono:</span>
                <span className="cita-detail-value">{appointmentData.cliente.telefono}</span>
              </div>
            </div>
            <div className="cita-detail-item">
              <div className="cita-dot"></div>
              <div className="cita-detail-content">
                <span className="cita-detail-label">Email:</span>
                <span className="cita-detail-value">{appointmentData.cliente.email}</span>
              </div>
            </div>
            <div className="cita-detail-item">
              <div className="cita-dot"></div>
              <div className="cita-detail-content">
                <span className="cita-detail-label">Especialidad:</span>
                <span className="cita-detail-value">{appointmentData.especialidad}</span>
              </div>
            </div>
            <div className="cita-detail-item">
              <div className="cita-dot"></div>
              <div className="cita-detail-content">
                <span className="cita-detail-label">Especialista:</span>
                <span className="cita-detail-value">{appointmentData.especialista}</span>
              </div>
            </div>
            <div className="cita-detail-item">
              <div className="cita-dot"></div>
              <div className="cita-detail-content">
                <span className="cita-detail-label">Fecha y hora:</span>
                <span className="cita-detail-value">{appointmentData.fecha} - {appointmentData.hora} <span className="cita-duration">Duración: {appointmentData.duracion}</span></span>
              </div>
            </div>
            <div className="cita-detail-item">
              <div className="cita-dot"></div>
              <div className="cita-detail-content">
                <span className="cita-detail-label">Motivo de cita:</span>
                <span className="cita-detail-value">{appointmentData.motivo}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="cita-confirmada-actions">
          <div className="actions-row">
            <button className="btn-sms" onClick={onSendSMS}>
              <img src="/img/send_msg-icon.png" alt="Enviar SMS" className="btn-icon" />
              Enviar SMS
            </button>
            <button className="btn-download" onClick={onDownload}>
              <img src="/img/download-icon.png" alt="Descargar" className="btn-icon" />
              Descargar
            </button>
          </div>
          <button className="btn-view-agenda" onClick={onViewAgenda}>
            Ver agenda
          </button>
        </div>
      </div>
    </div>
  );
};

export default CitaConfirmadaModal;
