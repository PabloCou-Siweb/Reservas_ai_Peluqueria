import React, { useState } from 'react';
import './ConfirmarCitaModal.css';
import CitaConfirmadaModal from './CitaConfirmadaModal';

interface ConfirmarCitaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onCloseMainModal?: () => void;
  appointmentData: {
    cliente: {
      nombre: string;
      telefono: string;
    };
    especialidad: string;
    especialista: string;
    fecha: string;
    hora: string;
    duracion: string;
    motivo: string;
  };
}

const ConfirmarCitaModal: React.FC<ConfirmarCitaModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  onCloseMainModal,
  appointmentData
}) => {
  const [isCitaConfirmadaOpen, setIsCitaConfirmadaOpen] = useState(false);

  const handleConfirm = () => {
    setIsCitaConfirmadaOpen(true);
  };

  const handleCitaConfirmadaClose = () => {
    setIsCitaConfirmadaOpen(false);
    onClose();
  };

  const handleViewAgenda = () => {
    setIsCitaConfirmadaOpen(false);
    onClose();
    // Llamar a la función onConfirm del componente padre para mostrar el popup de cita agendada
    onConfirm();
  };

  const handleSendSMS = () => {
    // Aquí puedes añadir lógica para enviar SMS
    console.log('Enviando SMS...');
  };

  const handleDownload = () => {
    // Aquí puedes añadir lógica para descargar
    console.log('Descargando...');
  };

  if (!isOpen) return null;

  return (
    <div className="confirm-modal-overlay" onClick={onClose}>
      <div className="confirm-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="confirm-modal-header">
          <h2 className="confirm-modal-title">¿Confirmar reserva de cita?</h2>
          <button className="confirm-modal-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="confirm-modal-body">
          <p className="confirm-instruction">
            Por favor revisa cuidadosamente la información antes de confirmar la reserva de la cita.
          </p>

          {/* Resumen de la cita */}
          <div className="confirm-summary">
            <h3 className="confirm-summary-title">Resumen de la cita</h3>
            <div className="confirm-summary-grid">
              <div className="confirm-summary-item">
                <div className="confirm-dot"></div>
                <div className="confirm-summary-content">
                  <span className="confirm-label">Cliente:</span>
                  <span className="confirm-value">{appointmentData.cliente.nombre}</span>
                </div>
              </div>
              <div className="confirm-summary-item">
                <div className="confirm-dot"></div>
                <div className="confirm-summary-content">
                  <span className="confirm-label">Teléfono:</span>
                  <span className="confirm-value">{appointmentData.cliente.telefono}</span>
                </div>
              </div>
              <div className="confirm-summary-item">
                <div className="confirm-dot"></div>
                <div className="confirm-summary-content">
                  <span className="confirm-label">Especialidad:</span>
                  <span className="confirm-value">{appointmentData.especialidad}</span>
                </div>
              </div>
              <div className="confirm-summary-item">
                <div className="confirm-dot"></div>
                <div className="confirm-summary-content">
                  <span className="confirm-label">Especialista:</span>
                  <span className="confirm-value">{appointmentData.especialista}</span>
                </div>
              </div>
              <div className="confirm-summary-item">
                <div className="confirm-dot"></div>
                <div className="confirm-summary-content">
                  <span className="confirm-label">Fecha y hora:</span>
                  <span className="confirm-value">{appointmentData.fecha} - {appointmentData.hora} <span className="confirm-duration">(Duración: {appointmentData.duracion})</span></span>
                </div>
              </div>
              <div className="confirm-summary-item">
                <div className="confirm-dot"></div>
                <div className="confirm-summary-content">
                  <span className="confirm-label">Motivo de cita:</span>
                  <span className="confirm-value">{appointmentData.motivo}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sección importante */}
          <div className="confirm-important">
            <div className="confirm-warning-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                <path d="M12 8v4"></path>
                <path d="M12 16h.01"></path>
              </svg>
            </div>
            <p className="confirm-warning-text">
              Una vez confirmada la cita, se enviará una notificación al cliente y se bloqueará el horario seleccionado.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="confirm-modal-actions">
          <button className="btn-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn-confirm" onClick={handleConfirm}>
            Confirmar
          </button>
        </div>

        {/* Modal de cita confirmada */}
        <CitaConfirmadaModal
          isOpen={isCitaConfirmadaOpen}
          onClose={handleCitaConfirmadaClose}
          onViewAgenda={handleViewAgenda}
          onSendSMS={handleSendSMS}
          onDownload={handleDownload}
          appointmentData={{
            numeroConfirmacion: 'HRME6',
            cliente: {
              nombre: appointmentData.cliente.nombre,
              numero: '145',
              dni: '7894582V',
              telefono: appointmentData.cliente.telefono,
              email: 'elena.ruiz@gmail.com'
            },
            especialidad: appointmentData.especialidad,
            especialista: appointmentData.especialista,
            fecha: appointmentData.fecha,
            hora: appointmentData.hora,
            duracion: appointmentData.duracion,
            motivo: appointmentData.motivo
          }}
        />
      </div>
    </div>
  );
};

export default ConfirmarCitaModal;
