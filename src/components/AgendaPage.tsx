import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import Sidebar from './Sidebar';
import EditAppointmentModal from './EditAppointmentModal';
import RecordatorioEnviadoModal from './RecordatorioEnviadoModal';
import ReprogramarCitaModal from './ReprogramarCitaModal';
import AppointmentDetailsPage from './AppointmentDetailsPage';
import FiltrosModal from './FiltrosModal';
import './AgendaPage.css';
import './HeaderButtons.css';

const AgendaPage: React.FC = () => {
  const { navigateTo, navigateToNuevaCita } = useNavigation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [selectedAppointments, setSelectedAppointments] = useState<number[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRecordatorioModal, setShowRecordatorioModal] = useState(false);
  const [showReprogramarModal, setShowReprogramarModal] = useState(false);
  const [showFiltrosModal, setShowFiltrosModal] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<number | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const handleApplyFilters = (filters: any) => {
    console.log('Aplicando filtros:', filters);
    // Aquí se implementaría la lógica de filtrado
    setShowFiltrosModal(false);
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
    
    switch (action) {
      case 'view-details':
        console.log('Ver detalles completos');
        navigateTo('appointment-details');
        break;
      case 'edit':
        console.log('Editar información');
        setSelectedAppointmentId(appointmentId);
        setShowEditModal(true);
        break;
      case 'reschedule':
        console.log('Reprogramar cita');
        setSelectedAppointmentId(appointmentId);
        setShowReprogramarModal(true);
        break;
      case 'call':
        console.log('Llamar paciente');
        break;
      case 'reminder':
        console.log('Enviar recordatorio');
        setShowRecordatorioModal(true);
        break;
      case 'attended':
        console.log('Marcar como atendida');
        break;
      case 'no-show':
        console.log('Marcar como no asistió');
        break;
      case 'cancel':
        console.log('Cancelar cita');
        break;
      default:
        console.log('Acción no reconocida:', action);
    }
    
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
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const days = getDaysInMonth(currentDate);
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

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
              <h1 className="page-title">Agenda</h1>
              <div className="header-actions">
                <button className="notification-btn">
                  <img src="/img/notification-icon.png" alt="Notificaciones" width="20" height="20" />
                </button>
                <button className="settings-btn" onClick={() => navigateTo('configuracion')}>
                  <img src="/img/settings-icon.png" alt="Configuración" width="20" height="20" />
                </button>
              </div>
            </div>
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
                    <button className="filter-button" onClick={() => setShowFiltrosModal(true)}>
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
                  <div className="sort-icons">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="18,15 12,9 6,15"/>
                    </svg>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6,9 12,15 18,9"/>
                    </svg>
                  </div>
                </div>
                <div className="col-consultation-type">
                  <span className="column-title">Tipo de consulta</span>
                  <div className="sort-icons">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="18,15 12,9 6,15"/>
                    </svg>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6,9 12,15 18,9"/>
                    </svg>
                  </div>
                </div>
                <div className="col-specialist">
                  <span className="column-title">Especialista</span>
                  <div className="sort-icons">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="18,15 12,9 6,15"/>
                    </svg>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                        <span>{appointment.estado}</span>
                      </div>
                    </div>
                    <div className="cell-actions">
                      <button 
                        className="three-dots-btn"
                        onClick={() => handleDropdownToggle(appointment.id)}
                      >
                        <img src="/img/3dots-icon.png" alt="Opciones" width="16" height="16" />
                      </button>
                      {activeDropdown === appointment.id && (
                        <div className="dropdown-menu" ref={dropdownRef}>
                          {/* Header with patient name */}
                          <div className="dropdown-header">
                            <div className="patient-icon">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8C623E" strokeWidth="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                <circle cx="12" cy="7" r="4"/>
                              </svg>
                            </div>
                            <span className="patient-name">{appointment.paciente}</span>
                          </div>
                          
                          {/* Group 1: Details & Editing */}
                          <div className="dropdown-group">
                            <button className="dropdown-item" onClick={() => handleMenuAction('view-details', appointment.id)}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                <circle cx="12" cy="12" r="3"/>
                              </svg>
                              Ver detalles completos
                            </button>
                            <button className="dropdown-item" onClick={() => handleMenuAction('edit', appointment.id)}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                              </svg>
                              Editar información
                            </button>
                          </div>
                          
                          {/* Group 2: Appointment Management */}
                          <div className="dropdown-group">
                            <button className="dropdown-item" onClick={() => handleMenuAction('reschedule', appointment.id)}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                <line x1="16" y1="2" x2="16" y2="6"/>
                                <line x1="8" y1="2" x2="8" y2="6"/>
                                <line x1="3" y1="10" x2="21" y2="10"/>
                              </svg>
                              Reprogramar cita
                            </button>
                          </div>
                          
                          {/* Group 3: Patient Contact */}
                          <div className="dropdown-group">
                            <button className="dropdown-item" onClick={() => handleMenuAction('call', appointment.id)}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                              </svg>
                              Llamar paciente
                            </button>
                            <button className="dropdown-item" onClick={() => handleMenuAction('reminder', appointment.id)}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                              </svg>
                              Enviar recordatorio
                            </button>
                          </div>
                          
                          {/* Group 4: Status Updates */}
                          <div className="dropdown-group">
                            <button className="dropdown-item" onClick={() => handleMenuAction('attended', appointment.id)}>
                              <div className="status-dot attended"></div>
                              Atendida
                            </button>
                            <button className="dropdown-item" onClick={() => handleMenuAction('no-show', appointment.id)}>
                              <div className="status-dot no-show"></div>
                              No asistió
                            </button>
                          </div>
                          
                          {/* Group 5: Cancellation */}
                          <div className="dropdown-group">
                            <button className="dropdown-item" onClick={() => handleMenuAction('cancel', appointment.id)}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18"/>
                                <line x1="6" y1="6" x2="18" y2="18"/>
                              </svg>
                              Cancelar cita
                            </button>
                          </div>
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

      {/* Modals */}
      {showEditModal && selectedAppointmentId && (
        <EditAppointmentModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          onConfirm={(updatedData: any) => {
            console.log('Cita actualizada:', updatedData);
            setShowEditModal(false);
          }}
          appointmentData={(() => {
            const appointment = appointmentsData.find(app => app.id === selectedAppointmentId);
            if (!appointment) return undefined;
            
            return {
              specialist: appointment.especialista,
              date: '2025-01-02', // Valor por defecto - podrías obtenerlo de la fecha seleccionada
              time: appointment.hora,
              duration: appointment.duracion,
              client: appointment.paciente,
              phone: appointment.telefono,
              email: appointment.email,
              documentType: 'DNI', // Valor por defecto
              documentNumber: '', // Valor por defecto
              reason: appointment.tipoConsulta,
              notes: '' // Valor por defecto
            };
          })()}
        />
      )}

      {showRecordatorioModal && (
        <RecordatorioEnviadoModal
          isOpen={showRecordatorioModal}
          onClose={() => setShowRecordatorioModal(false)}
        />
      )}

      {showReprogramarModal && selectedAppointmentId && (
        <ReprogramarCitaModal
          isOpen={showReprogramarModal}
          onClose={() => setShowReprogramarModal(false)}
          onConfirm={(data: any) => {
            console.log('Cita reprogramada:', data);
            setShowReprogramarModal(false);
          }}
          appointmentData={appointmentsData.find(app => app.id === selectedAppointmentId)}
        />
      )}

      <FiltrosModal
        isOpen={showFiltrosModal}
        onClose={() => setShowFiltrosModal(false)}
        onApplyFilters={handleApplyFilters}
      />
    </div>
  );
};

export default AgendaPage;