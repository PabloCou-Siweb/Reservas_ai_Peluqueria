import React from 'react';
import './LogoutModal.css';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="logout-modal-overlay">
      <div className="logout-modal">
        <div className="logout-modal-content">
          <div className="logout-icon">
            <img src="/img/export-icon.png" alt="Cerrar sesión" width="24" height="24" />
          </div>
          <div className="logout-text">
            <h3 className="logout-title">¿Cerrar sesión?</h3>
            <p className="logout-description">
              Estás a punto de salir de tu cuenta. Deberás iniciar sesión nuevamente para acceder a la aplicación.
            </p>
          </div>
        </div>
        <div className="logout-actions">
          <button className="logout-cancel-btn" onClick={onClose}>
            Cancelar
          </button>
          <button className="logout-confirm-btn" onClick={onConfirm}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
