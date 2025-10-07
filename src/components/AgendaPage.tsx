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
            {/* Date Header */}
            <div className="date-header">
              <h2 className="date-title">02 Enero 2025</h2>
            </div>

            {/* Action Bar */}
            <div className="action-bar">
              <div className="search-container">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Buscar paciente..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="action-buttons">
                <button className="filter-btn">
                  <img src="/img/filter-icon.png" alt="Filtro" width="16" height="16" />
                </button>
                <button className="add-btn" onClick={handleAddAppointment}>
                  <img src="/img/add-icon.png" alt="Agregar" width="16" height="16" />
                </button>
              </div>
            </div>

            {/* Appointments Table */}
            <div className="appointments-table">
              <div className="table-header">
                <div className="col-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedAppointments.length === appointmentsData.length}
                    onChange={handleSelectAll}
                  />
                </div>
                <div className="col-patient">Paciente</div>
                <div className="col-type">Tipo de consulta</div>
                <div className="col-specialist">Especialista</div>
                <div className="col-time">Hora</div>
                <div className="col-status">Estado</div>
                <div className="col-menu"></div>
              </div>

              <div className="table-body">
                {appointmentsData.map((appointment) => (
                  <div key={appointment.id} className="table-row">
                    <div className="col-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedAppointments.includes(appointment.id)}
                        onChange={() => handleAppointmentSelect(appointment.id)}
                      />
                    </div>
                    <div className="col-patient">
                      <div className="patient-info">
                        <div className="patient-name">{appointment.paciente}</div>
                        <div className="patient-contact">
                          {appointment.email}, {appointment.telefono}
                        </div>
                      </div>
                    </div>
                    <div className="col-type">
                      <span className="type-badge">{appointment.tipoConsulta}</span>
                    </div>
                    <div className="col-specialist">{appointment.especialista}</div>
                    <div className="col-time">
                      {appointment.hora} ({appointment.duracion})
                    </div>
                    <div className="col-status">
                      <div className="status-item">
                        <div 
                          className="status-dot" 
                          style={{ backgroundColor: getStatusColor(appointment.estado) }}
                        ></div>
                        <span>{appointment.estado}</span>
                      </div>
                    </div>
                    <div className="col-menu">
                      <button 
                        className="menu-btn"
                        onClick={() => handleDropdownToggle(appointment.id)}
                      >
                        <img src="/img/3dots-icon.png" alt="Menu" width="16" height="16" />
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

            {/* Pagination */}
            <div className="pagination">
              <span className="page-numbers">01 02 03 ... 04 05 06</span>
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