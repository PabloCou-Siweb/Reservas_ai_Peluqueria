import React from 'react';
import './RecordatorioEnviadoModal.css';

interface RecordatorioEnviadoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RecordatorioEnviadoModal: React.FC<RecordatorioEnviadoModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="recordatorio-enviado-overlay" onClick={onClose}>
      <div className="recordatorio-enviado-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="recordatorio-enviado-header">
          <div className="success-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22,4 12,14.01 9,11.01"></polyline>
            </svg>
          </div>
          <div className="recordatorio-enviado-text">
            <h2 className="recordatorio-enviado-title">Recordatorio enviado con éxito</h2>
            <p className="recordatorio-enviado-subtitle">Se ha enviado un SMS a cliente con la fecha y hora de la cita</p>
          </div>
          <button className="recordatorio-enviado-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordatorioEnviadoModal;
