import React, { useState } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import Sidebar from './Sidebar';
import ReservarCitaModal from './ReservarCitaModal';
import AppointmentContextMenu from './AppointmentContextMenu';
import './CitasPage.css';
import './HeaderButtons.css';

interface CitasPageProps {
  specialty?: string;
}

const CitasPage: React.FC<CitasPageProps> = ({ specialty = 'Corte' }) => {
  const { navigateTo, navigateToNuevaCita } = useNavigation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [specialistSearch, setSpecialistSearch] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(11);
  const [selectedSpecialist, setSelectedSpecialist] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState<{
    isOpen: boolean;
    position: { x: number; y: number };
    patientName: string;
    appointmentId: number;
  }>({
    isOpen: false,
    position: { x: 0, y: 0 },
    patientName: '',
    appointmentId: 0
  });

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleReservarClick = () => {
    setIsModalOpen(true);
  };

  const handleNewAppointmentClick = (time: string) => {
    console.log('Creating new appointment for:', {
      specialty: specialty,
      specialist: selectedSpecialist,
      date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`,
      time: time
    });
    navigateToNuevaCita();
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalConfirm = (data: any) => {
    console.log('Datos de la cita:', data);
    setIsModalOpen(false);
  };

  const handleContextMenuOpen = (e: React.MouseEvent, patientName: string, appointmentId: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    const rect = e.currentTarget.getBoundingClientRect();
    const menuWidth = 240;
    const menuHeight = 320; // Altura fija para el menú
    
    let x = rect.right + 5; // 5px a la derecha del botón
    let y = rect.top;
    
    if (x + menuWidth > window.innerWidth) {
      x = rect.left - menuWidth - 5; // 5px a la izquierda del botón
    }
    
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    
    if (spaceBelow < menuHeight) {
      if (spaceAbove >= menuHeight) {
        y = rect.top - menuHeight - 5;
      } else {
        y = Math.max(10, (window.innerHeight - menuHeight) / 2);
      }
    }
    
    setContextMenu({
      isOpen: true,
      position: { x, y },
      patientName,
      appointmentId
    });
  };

  const handleContextMenuClose = () => {
    setContextMenu({
      isOpen: false,
      position: { x: 0, y: 0 },
      patientName: '',
      appointmentId: 0
    });
  };

  const handleViewDetails = () => {
    console.log('Ver detalles de:', contextMenu.patientName);
    handleContextMenuClose();
    navigateTo('appointment-details');
  };

  const handleEditInfo = () => {
    console.log('Editar información de:', contextMenu.patientName);
    handleContextMenuClose();
  };

  const handleReschedule = () => {
    console.log('Reprogramar cita de:', contextMenu.patientName);
    handleContextMenuClose();
  };

  const handleCallPatient = () => {
    console.log('Llamar a:', contextMenu.patientName);
    handleContextMenuClose();
  };

  const handleSendReminder = () => {
    console.log('Enviar recordatorio a:', contextMenu.patientName);
    handleContextMenuClose();
  };

  const handleMarkAttended = () => {
    console.log('Marcar como atendida:', contextMenu.patientName);
    handleContextMenuClose();
  };

  const handleMarkNoShow = () => {
    console.log('Marcar como no asistió:', contextMenu.patientName);
    handleContextMenuClose();
  };

  const handleCancelAppointment = () => {
    console.log('Cancelar cita de:', contextMenu.patientName);
    handleContextMenuClose();
  };

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['l', 'm', 'x', 'j', 'v', 's', 'd'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7; // Convert Sunday=0 to Monday=0

    const days = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    const totalCells = 42;
    const remainingCells = totalCells - days.length;
    
    for (let day = 1; day <= remainingCells; day++) {
      days.push(day);
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const days = getDaysInMonth(currentDate);
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const especialistas = [
    {
      id: 1,
      nombre: 'Laura Martinez',
      rol: 'Peluquera',
      consulta: 'Consulta 105',
      imagen: '/img/avatar1.jpg'
    },
    {
      id: 2,
      nombre: 'Roberto Leiva',
      rol: 'Peluquero',
      consulta: 'Consulta 105',
      imagen: '/img/avatar2.jpg'
    },
    {
      id: 3,
      nombre: 'Ginés Gutiérrez',
      rol: 'Peluquero',
      consulta: 'Consulta 105',
      imagen: '/img/avatar3.jpg'
    },
    {
      id: 4,
      nombre: 'Ana García',
      rol: 'Esteticista',
      consulta: 'Consulta 105',
      imagen: '/img/avatar4.jpg'
    }
  ];

  const citas = [
    {
      id: 1,
      cliente: 'Paula Gonzalez',
      servicio: 'Corte',
      especialista: 'Laura Martinez',
      fecha: '02 Enero 2025',
      hora: '09:00 - 10:45',
      estado: 'confirmada'
    },
    {
      id: 2,
      cliente: 'Maria Pérez Gonzalez',
      servicio: 'Uñas',
      especialista: 'Ana García',
      fecha: '02 Enero 2025',
      hora: '11:00 - 11:45',
      estado: 'confirmada'
    },
    {
      id: 3,
      cliente: 'Carlos Rodriguez',
      servicio: 'Barbería',
      especialista: 'Roberto Leiva',
      fecha: '03 Enero 2025',
      hora: '14:30 - 15:30',
      estado: 'pendiente'
    },
    {
      id: 4,
      cliente: 'Sofia Martinez',
      servicio: 'Coloración',
      especialista: 'Ginés Gutiérrez',
      fecha: '04 Enero 2025',
      hora: '10:00 - 12:00',
      estado: 'confirmada'
    }
  ];

  const filteredEspecialistas = especialistas.filter(especialista =>
    especialista.nombre.toLowerCase().includes(specialistSearch.toLowerCase()) ||
    especialista.rol.toLowerCase().includes(specialistSearch.toLowerCase())
  );

  const filteredCitas = citas.filter(cita =>
    cita.cliente.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cita.servicio.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cita.especialista.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="citas-container">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

      {/* Main Content */}
      <div className={`main-content ${!sidebarOpen ? 'sidebar-closed' : ''}`}>
        <header className="citas-header">
          <div className="header-content">
            <div className="header-top-row">
              <div className="breadcrumb-nav">
                <span className="breadcrumb-item">Citas</span>
                <span className="breadcrumb-separator">/</span>
                <span className="breadcrumb-current">{specialty}</span>
              </div>
              
              <div className="header-right-section">
                <button className="icon-button notification-btn">
                  <img src="/img/notification-icon.png" alt="Notificaciones" width="20" height="20" />
                </button>
                
                <button className="icon-button settings-btn" onClick={() => navigateTo('configuracion')}>
                  <img src="/img/settings-icon.png" alt="Configuración" width="20" height="20" />
                </button>
              </div>
            </div>
            
            <div className="title-section">
                <button 
                  className="page-back-btn"
                  onClick={() => navigateTo('dashboard')}
                  aria-label="Volver al dashboard"
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.5">
                    <polyline points="15,18 9,12 15,6"/>
                  </svg>
                </button>
              <span className="page-title">Citas</span>
            </div>
          </div>
        </header>

        {/* Próxima cita disponible */}
        <div className="next-appointment-section">
          <h2 className="section-title">Próxima cita disponible</h2>
          <div className="appointment-content">
            <div className="specialist-info">
              <div className="specialist-main-info">
                <div className="user-placeholder">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div className="specialist-details">
                  <div className="specialist-name">Laura Martinez</div>
                  <div className="specialist-role">Peluquera</div>
                  <div className="specialist-office">Consulta 105</div>
                </div>
              </div>
              
              <div className="appointment-inputs">
                <div className="input-group">
                  <label className="input-label">Fecha</label>
                  <input type="text" className="appointment-input" value="25/02/2025" readOnly />
                </div>
                <div className="input-group">
                  <label className="input-label">Hora</label>
                  <input type="text" className="appointment-input" value="09:00" readOnly />
                </div>
              </div>
            </div>
            
            <button className="reserve-button" onClick={handleReservarClick}>
              Reservar ahora
            </button>
          </div>
        </div>

        {/* Search Specialist Section */}
        <div className="search-specialist-section">
          <div className="search-input-container">
            <input
              type="text"
              placeholder="Buscar especialista..."
              value={specialistSearch}
              onChange={(e) => setSpecialistSearch(e.target.value)}
              className="search-specialist-input"
            />
            <div className="search-icon">
              <img src="/img/search-icon.png" alt="Buscar" width="16" height="16" />
            </div>
          </div>
        </div>

        <div className="main-content-layout">
          {/* Left Column - Specialists List */}
          <div className="specialists-section">
            <div className="specialists-list">
              {filteredEspecialistas.map((especialista) => (
                <div 
                  key={especialista.id}
                  className={`specialist-card ${selectedSpecialist === especialista.id.toString() ? 'selected' : ''}`}
                  onClick={() => setSelectedSpecialist(especialista.id.toString())}
                >
                  <div className="specialist-avatar">
                    <div className="avatar-placeholder">
                      {especialista.nombre.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  <div className="specialist-details">
                    <div className="specialist-name">{especialista.nombre}</div>
                    <div className="specialist-role">{especialista.rol}</div>
                    <div className="specialist-office">{especialista.consulta}</div>
                  </div>
                  <div className="specialist-status"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Calendar and Schedule */}
          <div className="calendar-schedule-section">
            <div className="calendar-and-summary">
              {/* Combined Calendar and Summary Widget */}
              <div className="calendar-widget">
                <div className="calendar-header">
                  <button 
                    className="calendar-nav-btn"
                    onClick={() => navigateMonth('prev')}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="15,18 9,12 15,6"/>
                    </svg>
                  </button>
                  <h3 className="calendar-title">{monthNames[currentMonth]}, {currentYear}</h3>
                  <button 
                    className="calendar-nav-btn"
                    onClick={() => navigateMonth('next')}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9,18 15,12 9,6"/>
                    </svg>
                  </button>
                </div>

                <div className="calendar-days-header">
                  {dayNames.map((day, index) => (
                    <div key={index} className="day-header">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="calendar-grid">
                  {days.map((day, index) => {
                    const startingDayOfWeek = (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7;
                    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
                    const isCurrentMonth = index >= startingDayOfWeek && index < startingDayOfWeek + daysInMonth;
                    const isSelected = day === selectedDate && isCurrentMonth;
                    
                    return (
                      <button
                        key={index}
                        className={`calendar-day ${isSelected ? 'selected' : ''} ${!isCurrentMonth ? 'other-month' : ''}`}
                        onClick={() => day && isCurrentMonth && setSelectedDate(day)}
                        disabled={!day || !isCurrentMonth}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>

                {/* Day Summary integrated in the same widget */}
                <div className="day-summary-integrated">
                  <h3 className="summary-title">Resumen de día</h3>
                  <div className="summary-stats">
                    <div className="stat-item">
                      <span className="stat-label">Citas confirmadas</span>
                      <span className="stat-value">5</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Citas disponibles</span>
                      <span className="stat-value">4</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Próxima cita disponible</span>
                      <span className="stat-value">09:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Daily Schedule */}
            <div className="daily-schedule">
              <div className="schedule-header">
                <h3 className="schedule-date">{String(selectedDate).padStart(2, '0')} {monthNames[currentMonth]} {currentYear}</h3>
              </div>
              <div className="schedule-timeline">
                {Array.from({ length: 16 }, (_, i) => {
                  const hour = i + 8; // Start from 8:00 to 23:30
                  const time = `${hour.toString().padStart(2, '0')}:00`;
                  const halfHourTime = `${hour.toString().padStart(2, '0')}:30`;
                  
                  const appointmentAtFullHour = filteredCitas.find(cita => cita.hora === time);
                  const appointmentAtHalfHour = filteredCitas.find(cita => cita.hora === halfHourTime);
                  
                  return (
                    <React.Fragment key={hour}>
                      {/* Full hour slot */}
                      <div className="time-slot">
                        <div className="time-label">{time}</div>
                        <div 
                          className={`appointment-slot ${!appointmentAtFullHour ? 'empty-slot' : ''}`}
                          onClick={() => !appointmentAtFullHour && handleNewAppointmentClick(time)}
                        >
                          {appointmentAtFullHour ? (
                            <div className="appointment-block">
                              <div className="appointment-title">Cita {appointmentAtFullHour.servicio}</div>
                              <div className="appointment-client">{appointmentAtFullHour.cliente}</div>
                              <div className="appointment-specialist">{appointmentAtFullHour.especialista}</div>
                            </div>
                          ) : (
                            <div className="empty-slot-content">
                              <span className="add-appointment-text">+ Agregar cita</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Half hour slot */}
                      <div className="time-slot">
                        <div className="time-label">{halfHourTime}</div>
                        <div 
                          className={`appointment-slot ${!appointmentAtHalfHour ? 'empty-slot' : ''}`}
                          onClick={() => !appointmentAtHalfHour && handleNewAppointmentClick(halfHourTime)}
                        >
                          {appointmentAtHalfHour ? (
                            <div className="appointment-block">
                              <div className="appointment-title">Cita {appointmentAtHalfHour.servicio}</div>
                              <div className="appointment-client">{appointmentAtHalfHour.cliente}</div>
                              <div className="appointment-specialist">{appointmentAtHalfHour.especialista}</div>
                            </div>
                          ) : (
                            <div className="empty-slot-content">
                              <span className="add-appointment-text">+ Agregar cita</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="main-footer">
          <span>© 2025 Bokifly</span>
        </div>
      </div>

      {/* Modal de Reservar Cita */}
      <ReservarCitaModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
        specialist={{
          name: especialistas.find(esp => esp.id.toString() === selectedSpecialist)?.nombre || 'Laura Martinez',
          role: especialistas.find(esp => esp.id.toString() === selectedSpecialist)?.rol || 'Peluquera'
        }}
        date="2025/08/08"
        time="08:00"
        duration="30 minutos"
      />

      {/* Menú contextual */}
      <AppointmentContextMenu
        isOpen={contextMenu.isOpen}
        position={contextMenu.position}
        onClose={handleContextMenuClose}
        patientName={contextMenu.patientName}
        onViewDetails={handleViewDetails}
        onEditInfo={handleEditInfo}
        onReschedule={handleReschedule}
        onCallPatient={handleCallPatient}
        onSendReminder={handleSendReminder}
        onMarkAttended={handleMarkAttended}
        onMarkNoShow={handleMarkNoShow}
        onCancelAppointment={handleCancelAppointment}
      />
    </div>
  );
};

export default CitasPage;