import React from 'react';
import './CitaAgendadaModal.css';

interface CitaAgendadaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CitaAgendadaModal: React.FC<CitaAgendadaModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="cita-agendada-overlay">
      <div className="cita-agendada-content">
        <button className="close-btn" onClick={onClose}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        
        <div className="success-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22,4 12,14.01 9,11.01"/>
          </svg>
        </div>
        
        <div className="message-content">
          <h3 className="success-title">Cita agendada con éxito</h3>
          <p className="success-subtitle">Su cita médica ha sido confirmada.</p>
        </div>
      </div>
    </div>
  );
};

export default CitaAgendadaModal;
