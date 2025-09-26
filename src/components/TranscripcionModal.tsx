import React from 'react';
import './TranscripcionModal.css';

interface TranscripcionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  callData?: {
    paciente: string;
    telefono: string;
    especialidad: string;
    fecha: string;
    hora: string;
    duracion: string;
    motivo: string;
  };
  transcription?: string;
}

const TranscripcionModal: React.FC<TranscripcionModalProps> = ({
  isOpen,
  onClose,
  onAccept,
  callData = {
    paciente: 'Elena Ruiz González',
    telefono: '+34 620 25 64',
    especialidad: 'Uñas',
    fecha: '2025/08/09',
    hora: '09:30',
    duracion: '45 minutos',
    motivo: 'Uñas Limado y tratamiento especial'
  },
  transcription = `[00:00] IA: Buenos días, ha llamado a Peluquería Gabriel. Soy su asistente virtual. ¿En qué puedo ayudarle?

[00:04] Cliente: Hola, quería pedir una cita para hacerme las uñas

[00:07] IA: Claro, ¿podría decirme su nombre, por favor?

[00:10] Cliente: Sí, Ana María López.

[00:13] IA: Gracias, Ana. ¿Es la primera vez que viene a la peluquería o ya es cliente?

[00:17] Cliente: Ya soy cliente.

[00:19] IA: Perfecto. Déjeme comprobar la disponibilidad para uñas. Tenemos huecos con Alba Martínez el martes 20 a las 10:30 o el miércoles 21 a las 12:00. ¿Cuál prefiere?`
}) => {
  if (!isOpen) return null;

  return (
    <div className="transcripcion-overlay" onClick={onClose}>
      <div className="transcripcion-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="transcripcion-header">
          <div className="transcripcion-title-section">
            <h2 className="transcripcion-title">Transcripción de la llamada</h2>
            <p className="transcripcion-subtitle">
              Consulta el detalle de la conversación detectada por la IA para verificar datos o gestionar acciones relacionadas.
            </p>
          </div>
          <button className="transcripcion-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="transcripcion-content">
          {/* Resumen de la llamada */}
          <div className="resumen-section">
            <h3 className="resumen-title">Resumen de la llamada</h3>
            <div className="resumen-details">
              <div className="resumen-item">
                <span className="resumen-label">Paciente:</span>
                <span className="resumen-value">{callData.paciente}</span>
              </div>
              <div className="resumen-item">
                <span className="resumen-label">Teléfono:</span>
                <span className="resumen-value">{callData.telefono}</span>
              </div>
              <div className="resumen-item">
                <span className="resumen-label">Especialidad:</span>
                <span className="resumen-value">{callData.especialidad}</span>
              </div>
              <div className="resumen-item">
                <span className="resumen-label">Fecha y hora:</span>
                <span className="resumen-value">{callData.fecha} - {callData.hora} Duración: {callData.duracion}</span>
              </div>
              <div className="resumen-item">
                <span className="resumen-label">Motivo de consulta:</span>
                <span className="resumen-value">{callData.motivo}</span>
              </div>
            </div>
          </div>

          {/* Transcripción */}
          <div className="transcripcion-section">
            <h3 className="transcripcion-section-title">Transcripción de la conversación</h3>
            <div className="transcripcion-text">
              <pre className="transcripcion-content-text">{transcription}</pre>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="transcripcion-footer">
          <button className="transcripcion-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button className="transcripcion-accept" onClick={onAccept}>
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TranscripcionModal;
