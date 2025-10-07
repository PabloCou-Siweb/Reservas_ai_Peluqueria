import React, { useState } from 'react';
import './ConfirmarCitaModal.css';
import CitaConfirmadaModal from './CitaConfirmadaModal';
import RecordatorioEnviadoModal from './RecordatorioEnviadoModal';
import { useNavigation } from '../contexts/NavigationContext';

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
  const [isRecordatorioEnviadoOpen, setIsRecordatorioEnviadoOpen] = useState(false);
  const { navigateTo } = useNavigation();

  const handleConfirm = () => {
    setIsCitaConfirmadaOpen(true);
  };

  const handleCitaConfirmadaClose = () => {
    setIsCitaConfirmadaOpen(false);
    onConfirm();
    onClose();
    if (onCloseMainModal) {
      onCloseMainModal();
    }
  };

  const handleSendSMS = () => {
    setIsRecordatorioEnviadoOpen(true);
  };

  const handleRecordatorioEnviadoClose = () => {
    setIsRecordatorioEnviadoOpen(false);
  };

  const handleDownload = () => {
    console.log('Descargar');
  };

  const handleViewAgenda = () => {
    console.log('Ver agenda');
    // Cerrar el modal de cita confirmada
    setIsCitaConfirmadaOpen(false);
    // Cerrar el modal de confirmación
    onClose();
    // Cerrar el modal principal si existe
    if (onCloseMainModal) {
      onCloseMainModal();
    }
    // Navegar a la página de agenda
    navigateTo('agenda');
  };

  if (!isOpen) return null;

  return (
    <div className="confirmar-cita-overlay">
      <div className="confirmar-cita-modal">
        {/* Header */}
        <div className="confirmar-cita-header">
          <div className="confirmar-cita-title-section">
            <h2 className="confirmar-cita-title">¿Confirmar reserva de cita?</h2>
            <p className="confirmar-cita-subtitle">
              Por favor revisa cuidadosamente la información antes de confirmar la reserva de la cita.
            </p>
          </div>
          <button className="confirmar-cita-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="confirmar-cita-content">
          {/* Appointment Summary */}
          <div className="confirmar-cita-summary">
            <h3 className="summary-title">Resumen de la cita</h3>
            <div className="summary-grid">
              <div className="summary-item">
                <span className="summary-label">Cliente:</span>
                <span className="summary-value">{appointmentData.cliente.nombre}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Teléfono:</span>
                <span className="summary-value">{appointmentData.cliente.telefono}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Especialidad:</span>
                <span className="summary-value">{appointmentData.especialidad}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Especialista:</span>
                <span className="summary-value">{appointmentData.especialista}</span>
              </div>
              <div className="summary-item summary-datetime">
                <span className="summary-label">Fecha y hora:</span>
                <span className="summary-value">{appointmentData.fecha} - {appointmentData.hora}</span>
                <span className="summary-duration">Duración: {appointmentData.duracion}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Motivo de cita:</span>
                <span className="summary-value">{appointmentData.motivo}</span>
              </div>
            </div>
          </div>

          {/* Important Note */}
          <div className="aviso-container">
            <div className="aviso-icon">
              <div className="aviso-icon-bg">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="M12 8v4"/>
                  <path d="M12 16h.01"/>
                </svg>
              </div>
            </div>
            <div className="aviso-content">
              <div className="aviso-title">Importante</div>
              <div className="aviso-message">
                Una vez confirmada la cita, se enviará una notificación al cliente y se bloqueará el horario seleccionado.
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="confirmar-cita-actions">
          <button 
            className="confirmar-cita-cancel" 
            onClick={onClose}
          >
            Cancelar
          </button>
          <button 
            className="confirmar-cita-confirm" 
            onClick={handleConfirm}
          >
            Confirmar
          </button>
        </div>
      </div>

      {/* Cita Confirmada Modal */}
      <CitaConfirmadaModal
        isOpen={isCitaConfirmadaOpen}
        onClose={handleCitaConfirmadaClose}
        onSendSMS={handleSendSMS}
        onDownload={handleDownload}
        onViewAgenda={handleViewAgenda}
        appointmentData={{
          client: appointmentData.cliente.nombre,
          clientNumber: '145',
          dni: '7894582V',
          phone: appointmentData.cliente.telefono,
          email: 'elena.ruiz@gmail.com',
          specialty: appointmentData.especialidad,
          specialist: appointmentData.especialista,
          date: appointmentData.fecha,
          time: appointmentData.hora,
          duration: appointmentData.duracion,
          reason: appointmentData.motivo
        }}
      />

      {/* Recordatorio Enviado Modal */}
      <RecordatorioEnviadoModal
        isOpen={isRecordatorioEnviadoOpen}
        onClose={handleRecordatorioEnviadoClose}
      />
    </div>
  );
};

export default ConfirmarCitaModal;