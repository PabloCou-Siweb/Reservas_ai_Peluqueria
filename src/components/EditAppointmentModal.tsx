import React, { useState } from 'react';
import './EditAppointmentModal.css';

interface EditAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: any) => void;
  appointmentData?: any;
}

const EditAppointmentModal: React.FC<EditAppointmentModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  appointmentData
}) => {
  const [data, setData] = useState({
    specialist: 'José Martínez Soria',
    date: '2025/08/08',
    time: '08:00',
    duration: '30 minutos',
    clientName: 'Elena Ruiz González',
    clientPhone: '+34 585 58 52',
    clientEmail: 'ejemplo@correo.com',
    docType: 'DNI',
    docNumber: '3597846850',
    appointmentReason: 'Corte',
    additionalNotes: ''
  });

  const updateField = (key: string, value: string) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const submitForm = () => {
    onConfirm(data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="backdrop" onClick={onClose}>
      <div className="window" onClick={(e) => e.stopPropagation()}>
        <div className="close-button" onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </div>

        <div className="title-area">
          <h1>Información de la cita</h1>
          <p>Modifica los detalles de la cita para reflejar cambios o añadir información relevante.</p>
        </div>

        <div className="orange-section">
          <div className="section-header">
            <div className="header-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <span>Resumen de la cita</span>
          </div>
          
          <div className="info-blocks">
            <div className="info-block">
              <div className="dot"></div>
              <div className="block-content">
                <div className="block-title">Especialista</div>
                <div className="block-main">{data.specialist}</div>
                <div className="block-sub">Peluquera</div>
              </div>
            </div>

            <div className="info-block">
              <div className="dot"></div>
              <div className="block-content">
                <div className="block-title">Fecha y hora</div>
                <div className="block-main">{data.date} - {data.time}</div>
                <div className="block-sub">Duración: {data.duration}</div>
              </div>
            </div>

            <div className="info-block">
              <div className="dot"></div>
              <div className="block-content">
                <div className="block-title">Cliente</div>
                <div className="block-main">{data.clientName}</div>
                <div className="block-sub">{data.clientPhone}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="orange-section">
          <div className="section-header">
            <div className="header-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <span>Datos del cliente</span>
          </div>

          <div className="search-area">
            <input 
              type="text" 
              className="search-field"
              placeholder="Buscar por nombre, teléfono, DNI o email..."
            />
            <svg className="search-svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </div>

          <div className="fields-area">
            <div className="field-row">
              <div className="field-item">
                <label>Nombre completo</label>
                <input 
                  type="text" 
                  value={data.clientName}
                  onChange={(e) => updateField('clientName', e.target.value)}
                  placeholder="Ej: Juan Pérez Izquierdo"
                />
              </div>

              <div className="field-item">
                <label>Teléfono</label>
                <input 
                  type="tel" 
                  value={data.clientPhone}
                  onChange={(e) => updateField('clientPhone', e.target.value)}
                  placeholder="+34 622 02 58 26"
                />
              </div>

              <div className="field-item">
                <label>Correo electrónico</label>
                <input 
                  type="email" 
                  value={data.clientEmail}
                  onChange={(e) => updateField('clientEmail', e.target.value)}
                  placeholder="ejemplo@correo.com"
                />
              </div>
            </div>

            <div className="field-row">
              <div className="field-item">
                <label>Tipo de documento</label>
                <div className="dropdown">
                  <select 
                    value={data.docType}
                    onChange={(e) => updateField('docType', e.target.value)}
                  >
                    <option value="DNI">DNI</option>
                    <option value="NIE">NIE</option>
                    <option value="Pasaporte">Pasaporte</option>
                  </select>
                  <svg className="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6,9 12,15 18,9"></polyline>
                  </svg>
                </div>
              </div>

              <div className="field-item">
                <label>N° de documento</label>
                <input 
                  type="text" 
                  value={data.docNumber}
                  onChange={(e) => updateField('docNumber', e.target.value)}
                  placeholder="3597846850"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="orange-section">
          <div className="section-header">
            <div className="header-icon">
              <img src="/img/scissor-icon.png" alt="Tijeras" width="16" height="16" />
            </div>
            <span>Detalles de la cita</span>
          </div>

          <div className="details-area">
            <div className="field-item">
              <label>Motivo de la cita</label>
              <input 
                type="text" 
                value={data.appointmentReason}
                onChange={(e) => updateField('appointmentReason', e.target.value)}
                placeholder="Corte"
              />
            </div>

            <div className="field-item">
              <label>Notas adicionales</label>
              <textarea 
                value={data.additionalNotes}
                onChange={(e) => updateField('additionalNotes', e.target.value)}
                placeholder="Información adicional que consideres relevante..."
                rows={4}
              />
            </div>
          </div>
        </div>

        <div className="button-area">
          <button className="cancel" onClick={onClose}>
            Cancelar
          </button>
          <button className="confirm" onClick={submitForm}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAppointmentModal;
