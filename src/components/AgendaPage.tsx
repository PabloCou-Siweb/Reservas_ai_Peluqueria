import React, { useState } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import Sidebar from './Sidebar';
import './AgendaPage.css';

const AgendaPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedDate, setSelectedDate] = useState(2); // 2 de enero 2025
  const [currentMonth, setCurrentMonth] = useState(0); // Enero
  const [currentYear, setCurrentYear] = useState(2025);
  const [searchQuery, setSearchQuery] = useState('');

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const startingDayOfWeek = (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7; // Monday = 0
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const days = generateCalendarDays();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleBackClick = () => {
    navigateTo('dashboard');
  };

  // Datos de ejemplo para las citas
  const appointments = [
    {
      id: 1,
      patient: 'Pablo Simón',
      email: 'pablo.simon@email.com',
      phone: '+34 600 123 456',
      type: 'Uñas',
      specialist: 'Laura Gómez',
      time: '09:00',
      duration: '30 min',
      status: 'Confirmada',
      selected: true
    },
    {
      id: 2,
      patient: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+34 600 234 567',
      type: 'Peluquería',
      specialist: 'Alberto Gómez',
      time: '09:00',
      duration: '30 min',
      status: 'Confirmada',
      selected: true
    },
    {
      id: 3,
      patient: 'Liam Johnson',
      email: 'liam.johnson@email.com',
      phone: '+34 600 345 678',
      type: 'Novias',
      specialist: 'Alberto Gómez',
      time: '09:30',
      duration: '30 min',
      status: 'Confirmada',
      selected: false
    },
    {
      id: 4,
      patient: 'Ana García Figueiro',
      email: 'ana.garcia@email.com',
      phone: '+34 600 456 789',
      type: 'Uñas',
      specialist: 'Cristina Rodriguez',
      time: '11:00',
      duration: '30 min',
      status: 'Atendida',
      selected: false
    },
    {
      id: 5,
      patient: 'Emilio Rodriguez Jiménez',
      email: 'emilio.rodriguez@email.com',
      phone: '+34 600 567 890',
      type: 'Peluquería',
      specialist: 'Laura Gómez',
      time: '10:00',
      duration: '30 min',
      status: 'Cancelada',
      selected: false
    },
    {
      id: 6,
      patient: 'Manuel Pérez Rodriguez',
      email: 'manuel.perez@email.com',
      phone: '+34 600 678 901',
      type: 'Uñas',
      specialist: 'Cristina Rodriquez',
      time: '12:00',
      duration: '30 min',
      status: 'Confirmada',
      selected: false
    },
    {
      id: 7,
      patient: 'Rodrigo Gutiérrez',
      email: 'rodrigo.gutierrez@email.com',
      phone: '+34 600 789 012',
      type: 'Peluquería',
      specialist: 'Alberto Gómez',
      time: '11:30',
      duration: '30 min',
      status: 'Confirmada',
      selected: false
    },
    {
      id: 8,
      patient: 'Miguel Conde',
      email: 'miguel.conde@email.com',
      phone: '+34 600 890 123',
      type: 'Pedicura',
      specialist: 'Cristina Rodríguez',
      time: '10:30',
      duration: '30 min',
      status: 'Confirmada',
      selected: false
    },
    {
      id: 9,
      patient: 'Marta Figueroa',
      email: 'marta.figueroa@email.com',
      phone: '+34 600 901 234',
      type: 'Coloración',
      specialist: 'Laura Gómez',
      time: '09:00',
      duration: '30 min',
      status: 'Cancelada',
      selected: false
    }
  ];

  const confirmedAppointments = appointments.filter(apt => apt.status === 'Confirmada');
  const totalAppointments = appointments.length;
  const availableSlots = 4;
  const nextAvailableTime = '09:00';

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Confirmada':
        return 'status-confirmed';
      case 'Atendida':
        return 'status-attended';
      case 'Cancelada':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmada':
        return '#F2C288';
      case 'Atendida':
        return '#FFE8BC';
      case 'Cancelada':
        return '#E5E5E5';
      default:
        return '#F2C288';
    }
  };

  return (
    <div className="agenda-container">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      <div className={`main-content ${!sidebarOpen ? 'sidebar-closed' : ''}`}>
        {/* Header */}
        <div className="agenda-header">
          <div className="header-left">
            <button className="back-button" onClick={handleBackClick}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15,18 9,12 15,6"/>
              </svg>
            </button>
            <h1>Agenda</h1>
          </div>
          <div className="header-right">
            <button className="header-icon-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
            </button>
            <button className="header-icon-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="agenda-content">
          {/* Calendar Section */}
          <div className="calendar-section">
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
                <h2 className="calendar-title">
                  {monthNames[currentMonth]}, {currentYear}
                </h2>
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
            </div>

            {/* Day Summary */}
            <div className="day-summary">
              <h3>Resumen de día</h3>
              <div className="summary-stats">
                <div className="stat-item">
                  <div className="stat-dot brown"></div>
                  <span>Citas confirmadas: <strong>{confirmedAppointments.length}</strong></span>
                </div>
                <div className="stat-item">
                  <div className="stat-dot orange"></div>
                  <span>Citas disponibles: <strong>{availableSlots}</strong></span>
                </div>
                <div className="stat-item">
                  <div className="stat-dot green"></div>
                  <span>Próxima cita disponible: <strong>{nextAvailableTime}</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Appointments Section */}
          <div className="appointments-section">
            <div className="appointments-header">
              <div className="appointments-title-section">
                <h3>{selectedDate} {monthNames[currentMonth]} {currentYear}</h3>
                <div className="appointments-counter">
                  <span className="counter-number">{confirmedAppointments.length}</span>
                  <span className="counter-label">citas confirmadas</span>
                </div>
              </div>
              <div className="appointments-actions">
                <div className="search-container">
                  <input
                    type="text"
                    placeholder="Buscar paciente..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                  <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="M21 21l-4.35-4.35"/>
                  </svg>
                </div>
                <button className="filter-btn">
                  <img src="/img/filter-icon.png" alt="Filtros" />
                </button>
                <button className="add-appointment-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                </button>
              </div>
            </div>

            <div className="appointments-table">
              <div className="table-header">
                <div className="table-cell checkbox">
                  <input type="checkbox" />
                </div>
                <div className="table-cell patient">
                  Paciente
                  <div className="sort-arrows">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="18,15 12,9 6,15"/>
                    </svg>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6,9 12,15 18,9"/>
                    </svg>
                  </div>
                </div>
                <div className="table-cell type">
                  Tipo de consulta
                  <div className="sort-arrows">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="18,15 12,9 6,15"/>
                    </svg>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6,9 12,15 18,9"/>
                    </svg>
                  </div>
                </div>
                <div className="table-cell specialist">
                  Especialista
                  <div className="sort-arrows">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="18,15 12,9 6,15"/>
                    </svg>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6,9 12,15 18,9"/>
                    </svg>
                  </div>
                </div>
                <div className="table-cell time">
                  Hora
                  <div className="sort-arrows">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="18,15 12,9 6,15"/>
                    </svg>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6,9 12,15 18,9"/>
                    </svg>
                  </div>
                </div>
                <div className="table-cell status">
                  Estado
                  <div className="sort-arrows">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="18,15 12,9 6,15"/>
                    </svg>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6,9 12,15 18,9"/>
                    </svg>
                  </div>
                </div>
                <div className="table-cell actions"></div>
              </div>


              <div className="appointments-list">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className={`appointment-row ${appointment.selected ? 'selected' : ''}`}>
                    <div className="table-cell checkbox">
                      <input type="checkbox" defaultChecked={appointment.selected} />
                    </div>
                    <div className="table-cell patient">
                      <div className="patient-info">
                        <div className="patient-name">{appointment.patient}</div>
                        <div className="patient-details">
                          <span>{appointment.email}</span>
                          <span>{appointment.phone}</span>
                        </div>
                      </div>
                    </div>
                    <div className="table-cell type">
                      {appointment.type}
                    </div>
                    <div className="table-cell specialist">
                      {appointment.specialist}
                    </div>
                    <div className="table-cell time">
                      {appointment.time} ({appointment.duration})
                    </div>
                    <div className="table-cell status">
                      <span 
                        className={`status-tag ${getStatusClass(appointment.status)}`}
                        style={{ backgroundColor: getStatusColor(appointment.status) }}
                      >
                        {appointment.status}
                      </span>
                    </div>
                    <div className="table-cell actions">
                      <button className="actions-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="1"/>
                          <circle cx="19" cy="12" r="1"/>
                          <circle cx="5" cy="12" r="1"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination */}
            <div className="pagination">
              <span className="page-number active">01</span>
              <span className="page-number">02</span>
              <span className="page-number">03</span>
              <span className="page-dots">...</span>
              <span className="page-number">04</span>
              <span className="page-number">05</span>
              <span className="page-number">06</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <span>© 2025 Bokifly</span>
        </div>
      </div>
    </div>
  );
};

export default AgendaPage;
