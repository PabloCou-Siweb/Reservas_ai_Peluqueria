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
    { day: 'Miércoles', enabled: false, timeSlots: [] },
    { day: 'Jueves', enabled: false, timeSlots: [] },
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
    <div className="add-schedules-page">
      {/* Sección del formulario */}
      <div className="form-section">
        <div className="form-wrapper">
          {/* Indicador de progreso */}
          <div className="progress-indicator">
            <span className="step-text">03/05</span>
            <div className="dots">
              <div className="dot active"></div>
              <div className="dot active"></div>
              <div className="dot active"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
          
          <h1 className="page-title">Añade tus horarios</h1>
          <p className="page-subtitle">
            Define los días y franjas horarias en los que tu establecimiento atenderá citas. Esto permitirá a la agenda y a la asistente virtual ofrecer disponibilidad precisa a tus clientes.
          </p>
          
          <form onSubmit={handleSubmit} className="schedules-form">
            <div className="days-container">
              {schedules.map((schedule) => (
                <div className="schedule-day" key={schedule.day}>
                  <div className="day-header">
                    <span className="day-name">{schedule.day}</span>
                    <button
                      type="button"
                      className={`day-toggle ${schedule.enabled ? 'active' : ''}`}
                      onClick={() => handleToggleChange(schedule.day)}
                    >
                      <div className="toggle-slider"></div>
                    </button>
                  </div>
                  
                  {schedule.enabled && (
                    <div className="time-slots">
                      {schedule.timeSlots.map((slot) => (
                        <div className="time-slot" key={slot.id}>
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
                            className="remove-slot-btn"
                            onClick={() => removeTimeSlot(schedule.day, slot.id)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="add-slot-btn"
                        onClick={() => addTimeSlot(schedule.day)}
                      >
                        Añadir
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="action-buttons">
              <button 
                type="button" 
                className="back-btn"
                onClick={handleBackClick}
              >
                <div className="back-btn-icon">
                  <img src="/img/arrow-icon.png" alt="Volver" style={{transform: 'scaleX(-1)'}} />
                </div>
              </button>
              
              <button type="submit" className="next-btn">
                Siguiente
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Sección de imagen promocional */}
      <div className="image-section">
        <div className="promotional-image">
        </div>
      </div>
    </div>
  );
};

export default AddSchedulesPage;
