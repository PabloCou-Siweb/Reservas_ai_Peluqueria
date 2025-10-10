import React, { useState } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import Sidebar from './Sidebar';
import './AddEspecialistaPage.css';

const AddEspecialistaPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('datos-personales');
  
  // Estados para el formulario
  const [formData, setFormData] = useState({
    titulo: 'Sr',
    nombre: '',
    apellidos: '',
    telefono: '+34 622 02 58 26',
    email: 'juan.pérez.izquierdo@gmail.com',
    tipoDocumento: 'DNI',
    numeroDocumento: '359784685Q',
    fechaNacimiento: '2025-10-09',
    direccion: '',
    // Campos de información profesional
    especialidadPrincipal: '',
    subespecialidad: '',
    tarifaServicio: '50€',
    cursos: 'MC-COL-12345',
    ciudad: '',
    añoRealizacion: '2025-10-09'
  });

  // Estados para horarios
  const [schedules, setSchedules] = useState({
    lunes: { enabled: false, start: '08:00', end: '16:00' },
    martes: { enabled: false, start: '09:00', end: '17:00' },
    miercoles: { enabled: false, start: '10:00', end: '18:00' },
    jueves: { enabled: false, start: '06:30', end: '16:30' },
    viernes: { enabled: false, start: '09:00', end: '17:00' },
    sabado: { enabled: false, start: '10:00', end: '14:00' },
    domingo: { enabled: false, start: '', end: '' }
  });

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Función para calcular horas entre dos tiempos
  const calculateHours = (start: string, end: string) => {
    if (!start || !end) return 0;
    
    const startTime = new Date(`2000-01-01T${start}:00`);
    const endTime = new Date(`2000-01-01T${end}:00`);
    
    const diffMs = endTime.getTime() - startTime.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    
    return Math.max(0, diffHours);
  };

  // Función para calcular horas totales
  const calculateTotalHours = () => {
    let total = 0;
    Object.values(schedules).forEach(schedule => {
      if (schedule.enabled && schedule.start && schedule.end) {
        total += calculateHours(schedule.start, schedule.end);
      }
    });
    return total;
  };

  // Función para manejar cambios en horarios
  const handleScheduleChange = (day: string, field: string, value: string | boolean) => {
    setSchedules(prev => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    console.log('Guardar especialista:', formData);
    console.log('Horarios:', schedules);
    console.log('Horas totales:', calculateTotalHours().toFixed(1));
    
    // Los contadores se actualizan automáticamente al cambiar los horarios
    // No se necesita notificación adicional
  };

  const handleCancel = () => {
    navigateTo('especialistas');
  };

  return (
    <div className="add-especialista-page">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      <div className={`main-content ${!sidebarOpen ? 'sidebar-closed' : ''}`}>
        {/* Header */}
        <div className="page-header">
          <div className="header-left">
            <div className="breadcrumbs">
              <span>Equipo especialista</span>
              <span className="separator">/</span>
              <span>Añadir especialista</span>
            </div>
            <div className="title-row">
              <button className="back-button" onClick={() => navigateTo('especialistas')}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
              <h1>Añadir especialista</h1>
            </div>
            <p className="subtitle">Complete la información del especialista para agregarlo al equipo.</p>
          </div>
          <div className="header-actions">
            <button className="notification-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
            </button>
            <button className="settings-btn" onClick={() => navigateTo('configuracion')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Form Container */}
        <div className="form-container">
          {/* Form Header */}
          <div className="form-header">
            <div className="form-header-content">
              <div className="form-header-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <span>Información del especialista</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="tabs-container">
            <button 
              className={`tab ${activeTab === 'datos-personales' ? 'active' : ''}`}
              onClick={() => setActiveTab('datos-personales')}
            >
              Datos personales
            </button>
            <button 
              className={`tab ${activeTab === 'informacion-profesional' ? 'active' : ''}`}
              onClick={() => setActiveTab('informacion-profesional')}
            >
              Información profesional
            </button>
            <button 
              className={`tab ${activeTab === 'horarios' ? 'active' : ''}`}
              onClick={() => setActiveTab('horarios')}
            >
              Horarios
            </button>
          </div>

          {/* Form Content */}
          <div className="form-content">
            {activeTab === 'datos-personales' && (
              <div className="form-section">
                {/* Row 1 - Nombre y Apellidos */}
                <div className="form-row">
                  <div className="form-field">
                    <label>Nombre</label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      placeholder="Ej: Juan"
                    />
                  </div>
                  <div className="form-field">
                    <label>Apellidos</label>
                    <input
                      type="text"
                      name="apellidos"
                      value={formData.apellidos}
                      onChange={handleInputChange}
                      placeholder="Ej: Pérez Izquierdo"
                    />
                  </div>
                </div>

                {/* Row 2 - Teléfono, Correo, Documento, N° documento y Fecha de nacimiento */}
                <div className="form-row">
                  <div className="form-field">
                    <label>Teléfono</label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-field">
                    <label>Correo electrónico</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-field">
                    <label>Tipo de documento</label>
                    <select 
                      name="tipoDocumento" 
                      value={formData.tipoDocumento} 
                      onChange={handleInputChange}
                    >
                      <option value="DNI">DNI</option>
                      <option value="NIE">NIE</option>
                      <option value="Pasaporte">Pasaporte</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label>N° de documento</label>
                    <input
                      type="text"
                      name="numeroDocumento"
                      value={formData.numeroDocumento}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-field">
                    <label>Fecha de nacimiento</label>
                    <div className="date-input-container">
                      <input
                        type="date"
                        name="fechaNacimiento"
                        value={formData.fechaNacimiento}
                        onChange={handleInputChange}
                      />
                      <img src="/img/calendar-icon.png" alt="Calendar" className="calendar-icon" />
                    </div>
                  </div>
                </div>

                {/* Row 3 */}
                <div className="form-row">
                  <div className="form-field">
                    <label>Dirección</label>
                    <input
                      type="text"
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleInputChange}
                      placeholder="Dirección completa..."
                    />
                  </div>
                </div>
              </div>
            )}

                {activeTab === 'informacion-profesional' && (
                  <div className="professional-form">
                    {/* Primera fila: Especialidad principal, Subespecialidad, Tarifa del servicio */}
                    <div className="professional-row">
                      <div className="professional-field">
                        <label>Especialidad principal</label>
                        <select
                          name="especialidadPrincipal"
                          value={formData.especialidadPrincipal || ''}
                          onChange={handleInputChange}
                        >
                          <option value="">Seleccionar especialidad</option>
                          <option value="Corte y peinado">Corte y peinado</option>
                          <option value="Coloración">Coloración</option>
                          <option value="Tratamientos capilares">Tratamientos capilares</option>
                          <option value="Manicura y pedicura">Manicura y pedicura</option>
                          <option value="Maquillaje">Maquillaje</option>
                        </select>
                      </div>
                      <div className="professional-field">
                        <label>Subespecialidad</label>
                        <select
                          name="subespecialidad"
                          value={formData.subespecialidad || ''}
                          onChange={handleInputChange}
                        >
                          <option value="">Seleccionar subespecialidad (opcional)</option>
                          <option value="Corte masculino">Corte masculino</option>
                          <option value="Corte femenino">Corte femenino</option>
                          <option value="Mechas">Mechas</option>
                          <option value="Decoloración">Decoloración</option>
                          <option value="Tratamientos de queratina">Tratamientos de queratina</option>
                        </select>
                      </div>
                      <div className="professional-field">
                        <label>Tarifa del servicio</label>
                        <input
                          type="text"
                          name="tarifaServicio"
                          value={formData.tarifaServicio || '50€'}
                          onChange={handleInputChange}
                          placeholder="Ej: 50€"
                        />
                      </div>
                    </div>

                    {/* Segunda fila: Cursos, Ciudad, Año de realización */}
                    <div className="professional-row">
                      <div className="professional-field">
                        <label>Cursos</label>
                        <input
                          type="text"
                          name="cursos"
                          value={formData.cursos || 'MC-COL-12345'}
                          onChange={handleInputChange}
                          placeholder="Ej: MC-COL-12345"
                        />
                      </div>
                      <div className="professional-field">
                        <label>Ciudad</label>
                        <select
                          name="ciudad"
                          value={formData.ciudad || ''}
                          onChange={handleInputChange}
                        >
                          <option value="">Seleccionar ciudad</option>
                          <option value="Madrid">Madrid</option>
                          <option value="Barcelona">Barcelona</option>
                          <option value="Valencia">Valencia</option>
                          <option value="Sevilla">Sevilla</option>
                          <option value="Bilbao">Bilbao</option>
                        </select>
                      </div>
                      <div className="professional-field">
                        <label>Año de realización</label>
                        <div className="date-input-container">
                          <input
                            type="date"
                            name="añoRealizacion"
                            value={formData.añoRealizacion || '2025-10-09'}
                            onChange={handleInputChange}
                          />
                          <img src="/img/calendar-icon.png" alt="Calendar" className="calendar-icon" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'horarios' && (
                  <div className="schedules-container">
                    <div className="total-hours-display">
                      <span className="total-hours-label">Horas totales semanales:</span>
                      <span className="total-hours-value">{calculateTotalHours().toFixed(1)} horas</span>
                    </div>
                    <div className="schedules-list">
                      {/* Lunes */}
                      <div className="schedule-item">
                        <div className="day-section">
                          <span className="day-name">Lunes</span>
                          <div className="toggle-switch">
                            <input 
                              type="checkbox" 
                              id="lunes" 
                              checked={schedules.lunes.enabled}
                              onChange={(e) => handleScheduleChange('lunes', 'enabled', e.target.checked)}
                            />
                            <label htmlFor="lunes"></label>
                          </div>
                        </div>
                        <div className="time-section">
                          <div className="time-field">
                            <label>Hora de inicio</label>
                            <select
                              value={schedules.lunes.start}
                              onChange={(e) => handleScheduleChange('lunes', 'start', e.target.value)}
                            >
                              <option value="09:00">09:00</option>
                              <option value="09:30">09:30</option>
                              <option value="10:00">10:00</option>
                              <option value="10:30">10:30</option>
                              <option value="11:00">11:00</option>
                              <option value="11:30">11:30</option>
                              <option value="12:00">12:00</option>
                              <option value="12:30">12:30</option>
                              <option value="13:00">13:00</option>
                              <option value="13:30">13:30</option>
                              <option value="14:00">14:00</option>
                            </select>
                          </div>
                          <div className="time-field">
                            <label>Hora de fin</label>
                            <select
                              value={schedules.lunes.end}
                              onChange={(e) => handleScheduleChange('lunes', 'end', e.target.value)}
                            >
                              <option value="17:00">17:00</option>
                              <option value="17:30">17:30</option>
                              <option value="18:00">18:00</option>
                              <option value="18:30">18:30</option>
                              <option value="19:00">19:00</option>
                              <option value="19:30">19:30</option>
                              <option value="20:00">20:00</option>
                              <option value="20:30">20:30</option>
                              <option value="21:00">21:00</option>
                              <option value="21:30">21:30</option>
                              <option value="22:00">22:00</option>
                            </select>
                          </div>
                        </div>
                        <div className="hours-text">
                          {schedules.lunes.enabled ? `${calculateHours(schedules.lunes.start, schedules.lunes.end).toFixed(1)} horas` : '0.0 horas'}
                        </div>
                      </div>

                      {/* Martes */}
                      <div className="schedule-item">
                        <div className="day-section">
                          <span className="day-name">Martes</span>
                          <div className="toggle-switch">
                            <input 
                              type="checkbox" 
                              id="martes" 
                              checked={schedules.martes.enabled}
                              onChange={(e) => handleScheduleChange('martes', 'enabled', e.target.checked)}
                            />
                            <label htmlFor="martes"></label>
                          </div>
                        </div>
                        <div className="time-section">
                          <div className="time-field">
                            <label>Hora de inicio</label>
                            <select
                              value={schedules.martes.start}
                              onChange={(e) => handleScheduleChange('martes', 'start', e.target.value)}
                            >
                              <option value="09:00">09:00</option>
                              <option value="09:30">09:30</option>
                              <option value="10:00">10:00</option>
                              <option value="10:30">10:30</option>
                              <option value="11:00">11:00</option>
                              <option value="11:30">11:30</option>
                              <option value="12:00">12:00</option>
                              <option value="12:30">12:30</option>
                              <option value="13:00">13:00</option>
                              <option value="13:30">13:30</option>
                              <option value="14:00">14:00</option>
                            </select>
                          </div>
                          <div className="time-field">
                            <label>Hora de fin</label>
                            <select
                              value={schedules.martes.end}
                              onChange={(e) => handleScheduleChange('martes', 'end', e.target.value)}
                            >
                              <option value="17:00">17:00</option>
                              <option value="17:30">17:30</option>
                              <option value="18:00">18:00</option>
                              <option value="18:30">18:30</option>
                              <option value="19:00">19:00</option>
                              <option value="19:30">19:30</option>
                              <option value="20:00">20:00</option>
                              <option value="20:30">20:30</option>
                              <option value="21:00">21:00</option>
                              <option value="21:30">21:30</option>
                              <option value="22:00">22:00</option>
                            </select>
                          </div>
                        </div>
                        <div className="hours-text">
                          {schedules.martes.enabled ? `${calculateHours(schedules.martes.start, schedules.martes.end).toFixed(1)} horas` : '0.0 horas'}
                        </div>
                      </div>

                      {/* Miércoles */}
                      <div className="schedule-item">
                        <div className="day-section">
                          <span className="day-name">Miércoles</span>
                          <div className="toggle-switch">
                            <input 
                              type="checkbox" 
                              id="miercoles" 
                              checked={schedules.miercoles.enabled}
                              onChange={(e) => handleScheduleChange('miercoles', 'enabled', e.target.checked)}
                            />
                            <label htmlFor="miercoles"></label>
                          </div>
                        </div>
                        <div className="time-section">
                          <div className="time-field">
                            <label>Hora de inicio</label>
                            <select
                              value={schedules.miercoles.start}
                              onChange={(e) => handleScheduleChange('miercoles', 'start', e.target.value)}
                            >
                              <option value="09:00">09:00</option>
                              <option value="09:30">09:30</option>
                              <option value="10:00">10:00</option>
                              <option value="10:30">10:30</option>
                              <option value="11:00">11:00</option>
                              <option value="11:30">11:30</option>
                              <option value="12:00">12:00</option>
                              <option value="12:30">12:30</option>
                              <option value="13:00">13:00</option>
                              <option value="13:30">13:30</option>
                              <option value="14:00">14:00</option>
                            </select>
                          </div>
                          <div className="time-field">
                            <label>Hora de fin</label>
                            <select
                              value={schedules.miercoles.end}
                              onChange={(e) => handleScheduleChange('miercoles', 'end', e.target.value)}
                            >
                              <option value="17:00">17:00</option>
                              <option value="17:30">17:30</option>
                              <option value="18:00">18:00</option>
                              <option value="18:30">18:30</option>
                              <option value="19:00">19:00</option>
                              <option value="19:30">19:30</option>
                              <option value="20:00">20:00</option>
                              <option value="20:30">20:30</option>
                              <option value="21:00">21:00</option>
                              <option value="21:30">21:30</option>
                              <option value="22:00">22:00</option>
                            </select>
                          </div>
                        </div>
                        <div className="hours-text">
                          {schedules.miercoles.enabled ? `${calculateHours(schedules.miercoles.start, schedules.miercoles.end).toFixed(1)} horas` : '0.0 horas'}
                        </div>
                      </div>

                      {/* Jueves */}
                      <div className="schedule-item">
                        <div className="day-section">
                          <span className="day-name">Jueves</span>
                          <div className="toggle-switch">
                            <input 
                              type="checkbox" 
                              id="jueves" 
                              checked={schedules.jueves.enabled}
                              onChange={(e) => handleScheduleChange('jueves', 'enabled', e.target.checked)}
                            />
                            <label htmlFor="jueves"></label>
                          </div>
                        </div>
                        <div className="time-section">
                          <div className="time-field">
                            <label>Hora de inicio</label>
                            <select
                              value={schedules.jueves.start}
                              onChange={(e) => handleScheduleChange('jueves', 'start', e.target.value)}
                            >
                              <option value="09:00">09:00</option>
                              <option value="09:30">09:30</option>
                              <option value="10:00">10:00</option>
                              <option value="10:30">10:30</option>
                              <option value="11:00">11:00</option>
                              <option value="11:30">11:30</option>
                              <option value="12:00">12:00</option>
                              <option value="12:30">12:30</option>
                              <option value="13:00">13:00</option>
                              <option value="13:30">13:30</option>
                              <option value="14:00">14:00</option>
                            </select>
                          </div>
                          <div className="time-field">
                            <label>Hora de fin</label>
                            <select
                              value={schedules.jueves.end}
                              onChange={(e) => handleScheduleChange('jueves', 'end', e.target.value)}
                            >
                              <option value="17:00">17:00</option>
                              <option value="17:30">17:30</option>
                              <option value="18:00">18:00</option>
                              <option value="18:30">18:30</option>
                              <option value="19:00">19:00</option>
                              <option value="19:30">19:30</option>
                              <option value="20:00">20:00</option>
                              <option value="20:30">20:30</option>
                              <option value="21:00">21:00</option>
                              <option value="21:30">21:30</option>
                              <option value="22:00">22:00</option>
                            </select>
                          </div>
                        </div>
                        <div className="hours-text">
                          {schedules.jueves.enabled ? `${calculateHours(schedules.jueves.start, schedules.jueves.end).toFixed(1)} horas` : '0.0 horas'}
                        </div>
                      </div>

                      {/* Viernes */}
                      <div className="schedule-item">
                        <div className="day-section">
                          <span className="day-name">Viernes</span>
                          <div className="toggle-switch">
                            <input 
                              type="checkbox" 
                              id="viernes" 
                              checked={schedules.viernes.enabled}
                              onChange={(e) => handleScheduleChange('viernes', 'enabled', e.target.checked)}
                            />
                            <label htmlFor="viernes"></label>
                          </div>
                        </div>
                        <div className="time-section">
                          <div className="time-field">
                            <label>Hora de inicio</label>
                            <select
                              value={schedules.viernes.start}
                              onChange={(e) => handleScheduleChange('viernes', 'start', e.target.value)}
                            >
                              <option value="09:00">09:00</option>
                              <option value="09:30">09:30</option>
                              <option value="10:00">10:00</option>
                              <option value="10:30">10:30</option>
                              <option value="11:00">11:00</option>
                              <option value="11:30">11:30</option>
                              <option value="12:00">12:00</option>
                              <option value="12:30">12:30</option>
                              <option value="13:00">13:00</option>
                              <option value="13:30">13:30</option>
                              <option value="14:00">14:00</option>
                            </select>
                          </div>
                          <div className="time-field">
                            <label>Hora de fin</label>
                            <select
                              value={schedules.viernes.end}
                              onChange={(e) => handleScheduleChange('viernes', 'end', e.target.value)}
                            >
                              <option value="17:00">17:00</option>
                              <option value="17:30">17:30</option>
                              <option value="18:00">18:00</option>
                              <option value="18:30">18:30</option>
                              <option value="19:00">19:00</option>
                              <option value="19:30">19:30</option>
                              <option value="20:00">20:00</option>
                              <option value="20:30">20:30</option>
                              <option value="21:00">21:00</option>
                              <option value="21:30">21:30</option>
                              <option value="22:00">22:00</option>
                            </select>
                          </div>
                        </div>
                        <div className="hours-text">
                          {schedules.viernes.enabled ? `${calculateHours(schedules.viernes.start, schedules.viernes.end).toFixed(1)} horas` : '0.0 horas'}
                        </div>
                      </div>

                      {/* Sábado */}
                      <div className="schedule-item">
                        <div className="day-section">
                          <span className="day-name">Sábado</span>
                          <div className="toggle-switch">
                            <input 
                              type="checkbox" 
                              id="sabado" 
                              checked={schedules.sabado.enabled}
                              onChange={(e) => handleScheduleChange('sabado', 'enabled', e.target.checked)}
                            />
                            <label htmlFor="sabado"></label>
                          </div>
                        </div>
                        <div className="time-section">
                          <div className="time-field">
                            <label>Hora de inicio</label>
                            <select
                              value={schedules.sabado.start}
                              onChange={(e) => handleScheduleChange('sabado', 'start', e.target.value)}
                            >
                              <option value="09:00">09:00</option>
                              <option value="09:30">09:30</option>
                              <option value="10:00">10:00</option>
                              <option value="10:30">10:30</option>
                              <option value="11:00">11:00</option>
                              <option value="11:30">11:30</option>
                              <option value="12:00">12:00</option>
                              <option value="12:30">12:30</option>
                              <option value="13:00">13:00</option>
                            </select>
                          </div>
                          <div className="time-field">
                            <label>Hora de fin</label>
                            <select
                              value={schedules.sabado.end}
                              onChange={(e) => handleScheduleChange('sabado', 'end', e.target.value)}
                            >
                              <option value="11:00">11:00</option>
                              <option value="11:30">11:30</option>
                              <option value="12:00">12:00</option>
                              <option value="12:30">12:30</option>
                              <option value="13:00">13:00</option>
                              <option value="13:30">13:30</option>
                              <option value="14:00">14:00</option>
                            </select>
                          </div>
                        </div>
                        <div className="hours-text">
                          {schedules.sabado.enabled ? `${calculateHours(schedules.sabado.start, schedules.sabado.end).toFixed(1)} horas` : '0.0 horas'}
                        </div>
                      </div>

                      {/* Domingo */}
                      <div className="schedule-item">
                        <div className="day-section">
                          <span className="day-name">Domingo</span>
                          <div className="toggle-switch">
                            <input 
                              type="checkbox" 
                              id="domingo" 
                              checked={schedules.domingo.enabled}
                              onChange={(e) => handleScheduleChange('domingo', 'enabled', e.target.checked)}
                            />
                            <label htmlFor="domingo"></label>
                          </div>
                        </div>
                        <div className="time-section">
                          <div className="time-field">
                            <label>Hora de inicio</label>
                            <select
                              value={schedules.domingo.start}
                              onChange={(e) => handleScheduleChange('domingo', 'start', e.target.value)}
                            >
                              <option value="">--</option>
                              <option value="09:00">09:00</option>
                              <option value="09:30">09:30</option>
                              <option value="10:00">10:00</option>
                              <option value="10:30">10:30</option>
                              <option value="11:00">11:00</option>
                              <option value="11:30">11:30</option>
                              <option value="12:00">12:00</option>
                              <option value="12:30">12:30</option>
                              <option value="13:00">13:00</option>
                            </select>
                          </div>
                          <div className="time-field">
                            <label>Hora de fin</label>
                            <select
                              value={schedules.domingo.end}
                              onChange={(e) => handleScheduleChange('domingo', 'end', e.target.value)}
                            >
                              <option value="">--</option>
                              <option value="11:00">11:00</option>
                              <option value="11:30">11:30</option>
                              <option value="12:00">12:00</option>
                              <option value="12:30">12:30</option>
                              <option value="13:00">13:00</option>
                              <option value="13:30">13:30</option>
                              <option value="14:00">14:00</option>
                            </select>
                          </div>
                        </div>
                        <div className="hours-text">
                          {schedules.domingo.enabled ? `${calculateHours(schedules.domingo.start, schedules.domingo.end).toFixed(1)} horas` : '0.0 horas'}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

            {/* Action Buttons - Now inside form-content */}
            <div className="form-actions">
              <button className="btn-cancel" onClick={handleCancel}>
                Cancelar
              </button>
              <button className="btn-save" onClick={handleSave}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEspecialistaPage;
