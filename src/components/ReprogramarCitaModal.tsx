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
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [formData, setFormData] = useState({
    doctor: appointmentData?.doctor || 'Roberto Bolaños Izquierdo',
    time: appointmentData?.time || '08:30',
    duration: appointmentData?.duration || '30 minutos',
    reason: appointmentData?.reason || 'Corte de cabello',
    notes: appointmentData?.notes || ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleConfirm = () => {
    onConfirm({
      ...formData,
      date: selectedDate
    });
    onClose();
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentYear, currentMonth, day);
    setSelectedDate(newDate);
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['l', 'm', 'x', 'j', 'v', 's', 'd'];

  if (!isOpen) return null;

  return (
    <div className="reprogramar-modal-overlay">
      <div className="reprogramar-modal-content">
        <div className="reprogramar-modal-header">
          <h2>Reprogramar cita</h2>
          <button className="reprogramar-modal-close-btn" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <p className="reprogramar-modal-description">
          Complete el formulario con los datos del cliente para reservar la cita.
        </p>

        {/* Detalles de la cita */}
        <div className="appointment-details-section">
          <div className="section-header">
            <div className="section-icon">
              <img src="/img/scissor-icon.png" alt="Scissors" width="20" height="20" />
            </div>
            <h3>Detalles de la cita</h3>
          </div>
          
          <div className="details-content">
            {/* Calendario */}
            <div className="calendar-section">
              <div className="calendar-header">
                <button className="calendar-nav-btn" onClick={handlePrevMonth}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15,18 9,12 15,6"></polyline>
                  </svg>
                </button>
                <h4>{monthNames[currentMonth]}, {currentYear}</h4>
                <button className="calendar-nav-btn" onClick={handleNextMonth}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9,18 15,12 9,6"></polyline>
                  </svg>
                </button>
              </div>
              
              <div className="calendar-grid">
                <div className="calendar-days-header">
                  {dayNames.map((day, index) => (
                    <div key={index} className="calendar-day-header">{day}</div>
                  ))}
                </div>
                
                <div className="calendar-days">
                  {Array.from({ length: getFirstDayOfMonth(currentMonth, currentYear) }, (_, i) => (
                    <div key={`empty-${i}`} className="calendar-day empty"></div>
                  ))}
                  
                  {Array.from({ length: getDaysInMonth(currentMonth, currentYear) }, (_, i) => {
                    const day = i + 1;
                    const isSelected = selectedDate.getDate() === day && 
                                    selectedDate.getMonth() === currentMonth && 
                                    selectedDate.getFullYear() === currentYear;
                    
                    return (
                      <button
                        key={day}
                        className={`calendar-day ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleDateClick(day)}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Formulario */}
            <div className="form-section">
              <div className="form-group">
                <label>Asignar doctor</label>
                <select 
                  value={formData.doctor}
                  onChange={(e) => handleInputChange('doctor', e.target.value)}
                >
                  <option value="Roberto Bolaños Izquierdo">Roberto Bolaños Izquierdo</option>
                  <option value="María García López">María García López</option>
                  <option value="Carlos Ruiz Martín">Carlos Ruiz Martín</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Hora</label>
                <div className="time-input-container">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12,6 12,12 16,14"></polyline>
                  </svg>
                  <input 
                    type="time" 
                    value={formData.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Duración</label>
                <select 
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                >
                  <option value="30 minutos">30 minutos</option>
                  <option value="45 minutos">45 minutos</option>
                  <option value="60 minutos">60 minutos</option>
                  <option value="90 minutos">90 minutos</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Motivo de la cita</label>
                <input 
                  type="text" 
                  value={formData.reason}
                  onChange={(e) => handleInputChange('reason', e.target.value)}
                />
              </div>
              
              <div className="form-group">
                <label>Notas adicionales</label>
                <textarea 
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Información adicional que consideres relevante..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="reprogramar-modal-actions">
          <button className="cancel-button" onClick={onClose}>
            Cancelar
          </button>
          <button className="confirm-button" onClick={handleConfirm}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReprogramarCitaModal;
