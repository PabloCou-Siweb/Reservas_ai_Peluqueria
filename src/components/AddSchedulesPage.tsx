import React, { useState } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import './AddSchedulesPage.css';

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
}

interface DaySchedule {
  day: string;
  enabled: boolean;
  timeSlots: TimeSlot[];
}

const AddSchedulesPage: React.FC = () => {
  const { goNext, goBack } = useNavigation();
  const [schedules, setSchedules] = useState<DaySchedule[]>([
    { day: 'Lunes', enabled: false, timeSlots: [] },
    { day: 'Martes', enabled: false, timeSlots: [] },
    { day: 'Miércoles', enabled: true, timeSlots: [{ id: '1', startTime: '20:00', endTime: '20:00' }] },
    { day: 'Jueves', enabled: true, timeSlots: [{ id: '1', startTime: '20:00', endTime: '20:00' }] },
    { day: 'Viernes', enabled: false, timeSlots: [] },
    { day: 'Sábado', enabled: false, timeSlots: [] },
    { day: 'Domingo', enabled: false, timeSlots: [] },
  ]);

  const handleToggleChange = (dayToToggle: string) => {
    setSchedules(prevSchedules =>
      prevSchedules.map(schedule => {
        if (schedule.day === dayToToggle) {
          const newEnabled = !schedule.enabled;
          return {
            ...schedule,
            enabled: newEnabled,
            timeSlots: newEnabled && schedule.timeSlots.length === 0 
              ? [{ id: Date.now().toString(), startTime: '20:00', endTime: '20:00' }]
              : schedule.timeSlots
          };
        }
        return schedule;
      })
    );
  };

  const addTimeSlot = (dayName: string) => {
    setSchedules(prevSchedules =>
      prevSchedules.map(schedule =>
        schedule.day === dayName
          ? {
              ...schedule,
              timeSlots: [
                ...schedule.timeSlots,
                { id: Date.now().toString(), startTime: '20:00', endTime: '20:00' }
              ]
            }
          : schedule
      )
    );
  };

  const removeTimeSlot = (dayName: string, slotId: string) => {
    setSchedules(prevSchedules =>
      prevSchedules.map(schedule =>
        schedule.day === dayName
          ? {
              ...schedule,
              timeSlots: schedule.timeSlots.filter(slot => slot.id !== slotId)
            }
          : schedule
      )
    );
  };

  const updateTimeSlot = (dayName: string, slotId: string, field: 'startTime' | 'endTime', value: string) => {
    setSchedules(prevSchedules =>
      prevSchedules.map(schedule =>
        schedule.day === dayName
          ? {
              ...schedule,
              timeSlots: schedule.timeSlots.map(slot =>
                slot.id === slotId ? { ...slot, [field]: value } : slot
              )
            }
          : schedule
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Schedules submitted:', schedules);
    // Aquí iría la lógica para guardar los horarios
    goNext();
  };

  const handleBackClick = () => {
    goBack();
  };

  return (
    <div className="add-schedules-container">
      {/* Sección izquierda - Formulario */}
      <div className="form-section">
        <div className="form-container">
          <div className="step-indicator">
            <span>03/05</span>
            <div className="progress-dots">
              <div className="dot active"></div>
              <div className="dot active"></div>
              <div className="dot active"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
          
          <h1 className="form-title">Añade tus horarios</h1>
          <p className="form-subtitle">
            Define los días y franjas horarias en los que tu establecimiento atenderá citas. Esto permitirá a la agenda y a la asistente virtual ofrecer disponibilidad precisa a tus clientes.
          </p>
          
          <form onSubmit={handleSubmit} className="schedules-form">
            <div className="schedule-list">
              {schedules.map((schedule) => (
                <div className="schedule-item" key={schedule.day}>
                  <div className="day-header">
                    <span className="day-name">{schedule.day}</span>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={schedule.enabled}
                        onChange={() => handleToggleChange(schedule.day)}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                  
                  {schedule.enabled && (
                    <div className="time-slots">
                      {schedule.timeSlots.map((slot) => (
                        <div className="time-slot" key={slot.id}>
                          <div className="time-inputs">
                            <span className="time-label">Desde</span>
                            <input
                              type="time"
                              value={slot.startTime}
                              onChange={(e) => updateTimeSlot(schedule.day, slot.id, 'startTime', e.target.value)}
                              className="time-input"
                            />
                            <span className="time-separator">a</span>
                            <input
                              type="time"
                              value={slot.endTime}
                              onChange={(e) => updateTimeSlot(schedule.day, slot.id, 'endTime', e.target.value)}
                              className="time-input"
                            />
                            <button
                              type="button"
                              className="remove-slot"
                              onClick={() => removeTimeSlot(schedule.day, slot.id)}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18"/>
                                <line x1="6" y1="6" x2="18" y2="18"/>
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="add-slot-button"
                        onClick={() => addTimeSlot(schedule.day)}
                      >
                        Añadir
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="button-group">
              <button 
                type="button" 
                className="back-button"
                onClick={handleBackClick}
              >
                <div className="button-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15,18 9,12 15,6"/>
                  </svg>
                </div>
              </button>
              
              <button type="submit" className="next-button">
                <span>Siguiente</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Sección derecha - Imagen promocional */}
      <div className="promotional-section">
        <div className="promotional-image">
          <div className="image-overlay">
            {/* Sin elementos adicionales - todo está en la imagen */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSchedulesPage;
