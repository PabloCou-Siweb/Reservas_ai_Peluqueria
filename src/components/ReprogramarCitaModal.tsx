import React, { useState } from 'react';
import './ReprogramarCitaModal.css';

interface ReprogramarCitaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: any) => void;
  appointmentData?: any;
}

const ReprogramarCitaModal: React.FC<ReprogramarCitaModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  appointmentData
}) => {
  const [modalSelectedDate, setModalSelectedDate] = useState(new Date());
  const [modalCurrentMonth, setModalCurrentMonth] = useState(new Date().getMonth());
  const [modalCurrentYear, setModalCurrentYear] = useState(new Date().getFullYear());
  
  const [formData, setFormData] = useState({
    doctor: appointmentData?.especialista || 'Roberto Bolaños Izquierdo',
    time: appointmentData?.hora || '08:30',
    duration: appointmentData?.duracion || '30 minutos',
    reason: appointmentData?.tipoConsulta || 'Corte de cabello',
    notes: appointmentData?.notes || ''
  });

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['l', 'm', 'x', 'j', 'v', 's', 'd'];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleConfirm = () => {
    onConfirm({
      ...formData,
      date: modalSelectedDate
    });
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(modalCurrentYear, modalCurrentMonth, day);
    setModalSelectedDate(newDate);
  };

  const handlePrevMonth = () => {
    if (modalCurrentMonth === 0) {
      setModalCurrentMonth(11);
      setModalCurrentYear(modalCurrentYear - 1);
    } else {
      setModalCurrentMonth(modalCurrentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (modalCurrentMonth === 11) {
      setModalCurrentMonth(0);
      setModalCurrentYear(modalCurrentYear + 1);
    } else {
      setModalCurrentMonth(modalCurrentMonth + 1);
    }
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return (new Date(year, month, 1).getDay() + 6) % 7;
  };

  if (!isOpen) return null;

  return (
    <div className="reprogramar-cita-overlay" onClick={onClose}>
      <div className="reprogramar-cita-content" onClick={(e) => e.stopPropagation()}>
        <button className="reprogramar-cita-close" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="reprogramar-cita-header">
          <h2 className="reprogramar-cita-title">Reprogramar cita</h2>
          <p className="reprogramar-cita-subtitle">Complete el formulario con los datos del cliente para reservar la cita.</p>
        </div>

          <div className="appointment-details-banner">
            <div className="banner-icon">
              <img src="/img/scissor-icon.png" alt="Tijeras" width="18" height="18" />
            </div>
            <span className="banner-text">Detalles de la cita</span>
          </div>

        <div className="details-content">
          {/* Calendario recreado desde cero según plantilla */}
          <div className="calendar-container">
            <div className="calendar-header">
              <button className="nav-button prev" onClick={handlePrevMonth}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15,18 9,12 15,6"></polyline>
                </svg>
              </button>
              <h3 className="month-year">{monthNames[modalCurrentMonth]}, {modalCurrentYear}</h3>
              <button className="nav-button next" onClick={handleNextMonth}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9,18 15,12 9,6"></polyline>
                </svg>
              </button>
            </div>
            
            <div className="calendar-body">
              <div className="weekdays">
                {dayNames.map((day, index) => (
                  <div key={index} className="weekday">{day}</div>
                ))}
              </div>
              
              <div className="days-grid">
                {Array.from({ length: getFirstDayOfMonth(modalCurrentMonth, modalCurrentYear) }, (_, i) => (
                  <div key={`empty-${i}`} className="day-cell empty"></div>
                ))}
                
                {Array.from({ length: getDaysInMonth(modalCurrentMonth, modalCurrentYear) }, (_, i) => {
                  const day = i + 1;
                  const isSelected = modalSelectedDate.getDate() === day && 
                                  modalSelectedDate.getMonth() === modalCurrentMonth && 
                                  modalSelectedDate.getFullYear() === modalCurrentYear;
                  
                  return (
                    <button
                      key={day}
                      className={`day-cell ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleDateClick(day)}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Formulario dentro de los márgenes del popup */}
          <div className="form-section">
            {/* Primera fila: 3 campos */}
            <div className="form-row-first">
              <div className="field-container">
                <label>Asignar especialista</label>
                <div className="input-container">
                  <input
                    type="text"
                    value={formData.doctor}
                    onChange={(e) => handleInputChange('doctor', e.target.value)}
                  />
                  <svg className="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6,9 12,15 18,9"></polyline>
                  </svg>
                </div>
              </div>

              <div className="field-container">
                <label>Hora</label>
                <div className="input-container">
                  <svg className="clock-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12,6 12,12 16,14"></polyline>
                  </svg>
                  <input
                    type="text"
                    className="time-input"
                    value={formData.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                  />
                  <svg className="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6,9 12,15 18,9"></polyline>
                  </svg>
                </div>
              </div>

              <div className="field-container">
                <label>Duración</label>
                <div className="input-container">
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                  />
                  <svg className="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6,9 12,15 18,9"></polyline>
                  </svg>
                </div>
              </div>
            </div>

            {/* Segunda fila: Motivo */}
            <div className="form-row-second">
              <div className="field-container">
                <label>Motivo de la cita</label>
                <input
                  type="text"
                  value={formData.reason}
                  onChange={(e) => handleInputChange('reason', e.target.value)}
                />
              </div>
            </div>

            {/* Tercera fila: Notas */}
            <div className="form-row-third">
              <div className="field-container">
                <label>Notas adicionales</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="reprogramar-cita-footer">
          <button className="cancel-btn" onClick={onClose}>Cancelar</button>
          <button className="confirm-btn" onClick={handleConfirm}>Confirmar</button>
        </div>
      </div>
    </div>
  );
};

export default ReprogramarCitaModal;