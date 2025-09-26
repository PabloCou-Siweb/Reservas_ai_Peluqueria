import React from 'react';
import './AppointmentContextMenu.css';

interface AppointmentContextMenuProps {
  isOpen: boolean;
  position: { x: number; y: number };
  onClose: () => void;
  patientName: string;
  onViewDetails: () => void;
  onEditInfo: () => void;
  onReschedule: () => void;
  onCallPatient: () => void;
  onSendReminder: () => void;
  onMarkAttended: () => void;
  onMarkNoShow: () => void;
  onCancelAppointment: () => void;
}

const AppointmentContextMenu: React.FC<AppointmentContextMenuProps> = ({
  isOpen,
  position,
  onClose,
  patientName,
  onViewDetails,
  onEditInfo,
  onReschedule,
  onCallPatient,
  onSendReminder,
  onMarkAttended,
  onMarkNoShow,
  onCancelAppointment
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay para cerrar el menú */}
      <div className="context-menu-overlay" onClick={onClose} />
      
      {/* Menú contextual */}
      <div 
        className="context-menu"
        style={{
          position: 'fixed',
          left: position.x,
          top: position.y,
          zIndex: 1000
        }}
      >
        {/* Header del paciente */}
        <div className="context-menu-header">
          <div className="patient-info">
            <img src="/img/user-icon.png" alt="Paciente" width="16" height="16" />
            <span>{patientName}</span>
          </div>
          <button className="context-menu-close" onClick={onClose}>
            <img src="/img/close-icon.png" alt="Cerrar" width="16" height="16" />
          </button>
        </div>

        {/* Acciones principales */}
        <div className="context-menu-section">
          <button className="context-menu-item" onClick={onViewDetails}>
            <img src="/img/eye-icon.png" alt="Ver detalles" width="16" height="16" />
            Ver detalles completos
          </button>
          
          <button className="context-menu-item" onClick={onEditInfo}>
            <img src="/img/user-icon.png" alt="Editar" width="16" height="16" />
            Editar información
          </button>
          
          <button className="context-menu-item" onClick={onReschedule}>
            <img src="/img/calendar-icon.png" alt="Reprogramar" width="16" height="16" />
            Reprogramar cita
          </button>
          
          <button className="context-menu-item" onClick={onCallPatient}>
            <img src="/img/phone_call-icon.png" alt="Llamar" width="16" height="16" />
            Llamar paciente
          </button>
          
          <button className="context-menu-item" onClick={onSendReminder}>
            <img src="/img/send_msg-icon.png" alt="Enviar" width="16" height="16" />
            Enviar recordatorio
          </button>
        </div>

        {/* Cambios de estado */}
        <div className="context-menu-section">
          <button className="context-menu-item status-item" onClick={onMarkAttended}>
            <div className="status-dot brown"></div>
            Atendida
          </button>
          
          <button className="context-menu-item status-item" onClick={onMarkNoShow}>
            <div className="status-dot red"></div>
            No asistió
          </button>
        </div>

        {/* Cancelación */}
        <div className="context-menu-section">
          <button className="context-menu-item cancel-item" onClick={onCancelAppointment}>
            <img src="/img/close-icon.png" alt="Cancelar" width="16" height="16" />
            Cancelar cita
          </button>
        </div>
      </div>
    </>
  );
};

export default AppointmentContextMenu;
