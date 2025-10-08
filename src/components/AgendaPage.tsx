import React, { useState } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import Sidebar from './Sidebar';
import './AgendaPage.css';

const AgendaPage: React.FC = () => {
  const { navigateTo, navigateToNuevaCita } = useNavigation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [selectedAppointments, setSelectedAppointments] = useState<number[]>([]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleAddAppointment = () => {
    navigateToNuevaCita();
  };

  const handleAppointmentSelect = (id: number) => {
    setSelectedAppointments(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedAppointments.length === appointmentsData.length) {
      setSelectedAppointments([]);
    } else {
      setSelectedAppointments(appointmentsData.map(app => app.id));
    }
  };

  const handleDropdownToggle = (id: number) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const handleMenuAction = (action: string, appointmentId: number) => {
    console.log(`${action} clicked for appointment ${appointmentId}`);
    setActiveDropdown(null);
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
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const days = getDaysInMonth(currentDate);
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Datos de ejemplo para las citas
  const appointmentsData = [
    {
      id: 1,
      paciente: 'Pablo Simón',
      email: 'janecooper@gmail.com',
      telefono: '+34 606 20 45',
      tipoConsulta: 'Uñas',
      especialista: 'Laura Gómez',
      hora: '09:00',
      duracion: '30 min',
      estado: 'Confirmada'
    },
    {
      id: 2,
      paciente: 'John Smith',
      email: 'johnsmith@yahoo.com',
      telefono: '+44 20 7946 0958',
      tipoConsulta: 'Peluquería',
      especialista: 'Alberto Gómez',
      hora: '09:00',
      duracion: '30 min',
      estado: 'Confirmada'
    },
    {
      id: 3,
      paciente: 'Liam Johnson',
      email: 'liam.johnson@example.com',
      telefono: '555-4567',
      tipoConsulta: 'Novias',
      especialista: 'Alberto Gómez',
      hora: '09:30',
      duracion: '30 min',
      estado: 'Confirmada'
    },
    {
      id: 4,
      paciente: 'Ana García Figueiro',
      email: 'garciasoyana@hotmail.com',
      telefono: '+1 202 555 0172',
      tipoConsulta: 'Uñas',
      especialista: 'Cristina Rodríguez',
      hora: '11:00',
      duracion: '30 min',
      estado: 'Atendida'
    },
    {
      id: 5,
      paciente: 'Emilio Rodriguez Jiménez',
      email: 'emily.johnson@hotmail.com',
      telefono: '+1 202 555 0172',
      tipoConsulta: 'Peluquería',
      especialista: 'Laura Gómez',
      hora: '10:00',
      duracion: '30 min',
      estado: 'Cancelada'
    },
    {
      id: 6,
      paciente: 'Manuel Pérez Rodríguez',
      email: 'manuelroriguez78@hotmail.com',
      telefono: '+1 202 555 0172',
      tipoConsulta: 'Uñas',
      especialista: 'Cristina Rodríguez',
      hora: '12:00',
      duracion: '30 min',
      estado: 'Confirmada'
    },
    {
      id: 7,
      paciente: 'Rodrigo Gutiérrez',
      email: 'emily.johnson@hotmail.com',
      telefono: '+1 202 555 0172',
      tipoConsulta: 'Peluquería',
      especialista: 'Alberto Gómez',
      hora: '11:30',
      duracion: '30 min',
      estado: 'Confirmada'
    },
    {
      id: 8,
      paciente: 'Miguel Conde',
      email: 'mconde@hotmail.com',
      telefono: '+1 202 555 0172',
      tipoConsulta: 'Pedicura',
      especialista: 'Cristina Rodríguez',
      hora: '10:30',
      duracion: '30 min',
      estado: 'Confirmada'
    },
    {
      id: 9,
      paciente: 'Marta Figueroa',
      email: 'soymartafigueroa@hotmail.com',
      telefono: '+1 202 555 0172',
      tipoConsulta: 'Coloración',
      especialista: 'Laura Gómez',
      hora: '09:00',
      duracion: '30 min',
      estado: 'Cancelada'
    }
  ];

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'Confirmada':
        return '#FF8C42';
      case 'Atendida':
        return '#FF8C42';
      case 'Cancelada':
        return '#9CA3AF';
      default:
        return '#9CA3AF';
    }
  };

  return (
    <div className="agenda-container">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      <main className={`main-content ${!sidebarOpen ? 'sidebar-closed' : ''}`}>
        {/* Header */}
        <header className="agenda-header">
          <div className="header-content">
            <div className="header-top-row">
              <div className="breadcrumb-nav">
                <span className="breadcrumb-text">Agenda</span>
              </div>
              
              <div className="header-actions">
                <button className="notification-btn">
                  <img src="/img/notification-icon.png" alt="Notificaciones" width="20" height="20" />
                </button>
                <button className="settings-btn">
                  <img src="/img/settings-icon.png" alt="Configuración" width="20" height="20" />
                </button>
                <button className="help-btn">
                  <img src="/img/info-icon.png" alt="Ayuda" width="20" height="20" />
                </button>
              </div>
            </div>
            
            <h1 className="page-title">Agenda</h1>
          </div>
        </header>

        {/* Main Content */}
        <div className="agenda-content">
          {/* Left Section - Calendar and Summary */}
          <div className="calendar-section">
            {/* Calendar Widget */}
            <div className="calendar-widget">
              {/* Month Navigation */}
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

              {/* Calendar Grid */}
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

              {/* Day Summary integrated */}
              <div className="day-summary-integrated">
                <h3 className="summary-title">Resumen de día</h3>
                <div className="summary-stats">
                  <div className="stat-item">
                    <span className="stat-label">Citas confirmadas</span>
                    <div className="stat-value-row">
                      <div className="stat-dot confirmed"></div>
                      <span className="stat-value">5</span>
                    </div>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Citas disponibles</span>
                    <div className="stat-value-row">
                      <div className="stat-dot available"></div>
                      <span className="stat-value">4</span>
                    </div>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Próxima cita disponible</span>
                    <div className="stat-value-row">
                      <div className="stat-dot next"></div>
                      <span className="stat-value">09:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Appointments Table */}
          <div className="appointments-section">
            {/* Header Section - Recreated from zero following template exactly */}
            <div className="div-header">
              <div className="date-title-section">
                <h2 className="date-title">02 Enero 2025</h2>
              </div>
              
              <div className="header-actions-row">
                <div className="confirmed-info-left">
                  <div className="orange-check-icon"></div>
                  <span className="confirmed-count">Citas confirmadas (6)</span>
                </div>
                
                <div className="search-and-buttons-right">
                  <div className="search-box">
                    <input
                      type="text"
                      className="search-field"
                      placeholder="Buscar paciente..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="action-buttons-group">
                    <button className="filter-button">
                      <img src="/img/filter-icon.png" alt="Filtro" width="16" height="16" />
                    </button>
                    <button className="add-appointment-button" onClick={handleAddAppointment}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F2C288" strokeWidth="3">
                        <line x1="12" y1="5" x2="12" y2="19"/>
                        <line x1="5" y1="12" x2="19" y2="12"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Table Header - Recreated from zero following template exactly */}
            <div className="table-container">
              <div className="table-header-row">
                <div className="col-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedAppointments.length === appointmentsData.length}
                    onChange={handleSelectAll}
                  />
                </div>
                <div className="col-patient">
                  <span className="column-title">Paciente</span>
                  <div className="sort-arrows">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="18,15 12,9 6,15"/>
                    </svg>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6,9 12,15 18,9"/>
                    </svg>
                  </div>
                </div>
                <div className="col-consultation-type">
                  <span className="column-title">Tipo de consulta</span>
                  <div className="sort-arrows">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="18,15 12,9 6,15"/>
                    </svg>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6,9 12,15 18,9"/>
                    </svg>
                  </div>
                </div>
                <div className="col-specialist">
                  <span className="column-title">Especialista</span>
                  <div className="sort-arrows">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="18,15 12,9 6,15"/>
                    </svg>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6,9 12,15 18,9"/>
                    </svg>
                  </div>
                </div>
                <div className="col-time">
                  <span className="column-title">Hora</span>
                </div>
                <div className="col-status">
                  <span className="column-title">Estado</span>
                </div>
                <div className="col-actions"></div>
              </div>

              <div className="table-rows">
                {appointmentsData.map((appointment) => (
                  <div 
                    key={appointment.id} 
                    className={`appointment-row ${selectedAppointments.includes(appointment.id) ? 'selected' : ''}`}
                  >
                    <div className="cell-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedAppointments.includes(appointment.id)}
                        onChange={() => handleAppointmentSelect(appointment.id)}
                      />
                    </div>
                    <div className="cell-patient">
                      <div className="patient-name">{appointment.paciente}</div>
                      <div className="patient-email">{appointment.email}</div>
                      <div className="patient-phone">{appointment.telefono}</div>
                    </div>
                    <div className="cell-type">
                      <span>{appointment.tipoConsulta}</span>
                    </div>
                    <div className="cell-specialist">
                      <span>{appointment.especialista}</span>
                    </div>
                    <div className="cell-time">
                      <span>{appointment.hora} ({appointment.duracion})</span>
                    </div>
                    <div className="cell-status">
                      <div className={`status-badge ${appointment.estado.toLowerCase()}`}>
                        <div className={`status-dot ${appointment.estado.toLowerCase()}`}></div>
                        <span>{appointment.estado}</span>
                      </div>
                    </div>
                    <div className="cell-actions">
                      <button 
                        className="three-dots-btn"
                        onClick={() => handleDropdownToggle(appointment.id)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="1"/>
                          <circle cx="12" cy="5" r="1"/>
                          <circle cx="12" cy="19" r="1"/>
                        </svg>
                      </button>
                      {activeDropdown === appointment.id && (
                        <div className="dropdown-menu">
                          <button onClick={() => handleMenuAction('edit', appointment.id)}>
                            Editar cita
                          </button>
                          <button onClick={() => handleMenuAction('cancel', appointment.id)}>
                            Cancelar cita
                          </button>
                          <button onClick={() => handleMenuAction('reschedule', appointment.id)}>
                            Reprogramar
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination - Recreated to match template */}
            <div className="pagination-container">
              <div className="pagination-numbers">
                <span className="page-number">01</span>
                <span className="page-number active">02</span>
                <span className="page-number">03</span>
                <span className="page-ellipsis">...</span>
                <span className="page-number">04</span>
                <span className="page-number">05</span>
                <span className="page-number">06</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="copyright">
          © 2025 Bokifly
        </div>
      </main>
    </div>
  );
};

export default AgendaPage;