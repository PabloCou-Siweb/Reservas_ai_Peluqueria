import React, { useState } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import Sidebar from './Sidebar';
import ReservarCitaModal from './ReservarCitaModal';
import AppointmentContextMenu from './AppointmentContextMenu';
import EditAppointmentModal from './EditAppointmentModal';
import ReprogramarCitaModal from './ReprogramarCitaModal';
import RecordatorioEnviadoModal from './RecordatorioEnviadoModal';
import './AgendaPage.css';

const AgendaPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedDate, setSelectedDate] = useState(2); // 2 de enero 2025
  const [currentMonth, setCurrentMonth] = useState(0); // Enero
  const [currentYear, setCurrentYear] = useState(2025);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isReprogramarModalOpen, setIsReprogramarModalOpen] = useState(false);
  const [isRecordatorioModalOpen, setIsRecordatorioModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [selectAllAppointments, setSelectAllAppointments] = useState(false);
  const [selectedAppointments, setSelectedAppointments] = useState<number[]>([]);
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

  const handleAddAppointmentClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalConfirm = (data: any) => {
    console.log('Datos de la cita:', data);
    setIsModalOpen(false);
    // Aquí puedes agregar la lógica para guardar la cita
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleEditModalConfirm = (data: any) => {
    console.log('Datos editados de la cita:', data);
    // Aquí iría la lógica para actualizar la cita
    setIsEditModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleReprogramarModalClose = () => {
    setIsReprogramarModalOpen(false);
  };

  const handleReprogramarModalConfirm = (data: any) => {
    console.log('Cita reprogramada:', data);
    setIsReprogramarModalOpen(false);
  };

  const handleSendReminder = () => {
    console.log('Enviando recordatorio a:', contextMenu.patientName);
    handleContextMenuClose();
    setIsRecordatorioModalOpen(true);
  };

  const handleRecordatorioModalClose = () => {
    setIsRecordatorioModalOpen(false);
  };

  // Funciones del menú contextual
  const handleContextMenuOpen = (e: React.MouseEvent, patientName: string, appointmentId: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Calcular posición más inteligente
    const rect = e.currentTarget.getBoundingClientRect();
    const menuWidth = 240;
    const menuHeight = 320; // Altura fija para el menú
    
    let x = rect.right + 5; // 5px a la derecha del botón
    let y = rect.top;
    
    // Ajustar si se sale por la derecha
    if (x + menuWidth > window.innerWidth) {
      x = rect.left - menuWidth - 5; // 5px a la izquierda del botón
    }
    
    // Ajustar si se sale por abajo - usar una lógica más consistente
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    
    if (spaceBelow < menuHeight) {
      // Si no hay espacio abajo, posicionar arriba
      if (spaceAbove >= menuHeight) {
        y = rect.top - menuHeight - 5;
      } else {
        // Si tampoco hay espacio arriba, centrar verticalmente
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
    // Buscar los datos de la cita seleccionada
    const appointment = appointments.find(apt => apt.id === contextMenu.appointmentId);
    if (appointment) {
      setSelectedAppointment({
        specialist: appointment.specialist,
        date: `${currentYear}/${String(currentMonth + 1).padStart(2, '0')}/${String(selectedDate).padStart(2, '0')}`,
        time: appointment.time,
        duration: '30 minutos',
        client: appointment.patient,
        phone: appointment.phone,
        email: 'ejemplo@correo.com',
        documentType: 'DNI',
        documentNumber: '359784685Q',
        reason: appointment.type,
        notes: ''
      });
      setIsEditModalOpen(true);
    }
    handleContextMenuClose();
  };

  const handleReschedule = () => {
    console.log('Reprogramar cita de:', contextMenu.patientName);
    setIsReprogramarModalOpen(true);
    handleContextMenuClose();
  };

  const handleCallPatient = () => {
    console.log('Llamar a:', contextMenu.patientName);
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

  const handleSelectAllAppointments = () => {
    const newSelectAll = !selectAllAppointments;
    setSelectAllAppointments(newSelectAll);
    
    if (newSelectAll) {
      // Seleccionar todas las citas
      const allAppointmentIds = appointments.map(appointment => appointment.id);
      setSelectedAppointments(allAppointmentIds);
    } else {
      // Deseleccionar todas las citas
      setSelectedAppointments([]);
    }
  };

  const handleSelectAppointment = (appointmentId: number) => {
    setSelectedAppointments(prev => {
      const newSelected = prev.includes(appointmentId) 
        ? prev.filter(id => id !== appointmentId)
        : [...prev, appointmentId];
      
      // Actualizar el estado de "seleccionar todo" basado en si todas las citas están seleccionadas
      const allAppointmentIds = appointments.map(appointment => appointment.id);
      const allSelected = allAppointmentIds.every(id => newSelected.includes(id));
      setSelectAllAppointments(allSelected);
      
      return newSelected;
    });
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
      selected: false
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
      selected: false
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

  // Filtrar citas del día seleccionado
  const getAppointmentsForSelectedDate = () => {
    // Por ahora usamos todas las citas como ejemplo, pero aquí se filtrarían por fecha
    return appointments;
  };

  const appointmentsForSelectedDate = getAppointmentsForSelectedDate();
  const confirmedAppointments = appointmentsForSelectedDate.filter(apt => apt.status === 'Confirmada');
  const attendedAppointments = appointmentsForSelectedDate.filter(apt => apt.status === 'Atendida');
  const cancelledAppointments = appointmentsForSelectedDate.filter(apt => apt.status === 'Cancelada');
  
  // Calcular citas disponibles (asumiendo 8 horas de trabajo con slots de 30 min = 16 slots)
  const totalSlots = 16; // 8 horas * 2 slots por hora
  const usedSlots = appointmentsForSelectedDate.length;
  const availableSlots = Math.max(0, totalSlots - usedSlots);
  
  // Calcular próxima cita disponible
  const getNextAvailableTime = () => {
    const workingHours = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'];
    const usedTimes = appointmentsForSelectedDate.map(apt => apt.time);
    const availableTimes = workingHours.filter(time => !usedTimes.includes(time));
    return availableTimes.length > 0 ? availableTimes[0] : 'No disponible';
  };
  
  const nextAvailableTime = getNextAvailableTime();

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
            <h1>Agenda</h1>
          </div>
          <div className="header-right">
            <button className="header-icon-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
            </button>
            <button className="header-icon-btn" onClick={() => navigateTo('configuracion')}>
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
                  <div className="stat-dot green"></div>
                  <span>Citas atendidas: <strong>{attendedAppointments.length}</strong></span>
                </div>
                <div className="stat-item">
                  <div className="stat-dot red"></div>
                  <span>Citas canceladas: <strong>{cancelledAppointments.length}</strong></span>
                </div>
                <div className="stat-item">
                  <div className="stat-dot orange"></div>
                  <span>Citas disponibles: <strong>{availableSlots}</strong></span>
                </div>
                <div className="stat-item">
                  <div className="stat-dot blue"></div>
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
                    placeholder="Buscar cliente..."
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
                <button className="add-appointment-btn" onClick={handleAddAppointmentClick}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  <span>Añadir cita</span>
                </button>
              </div>
            </div>

            <div className="appointments-table">
              <div className="table-header">
                <div className="table-cell checkbox">
                  <input 
                    type="checkbox" 
                    checked={selectAllAppointments}
                    onChange={handleSelectAllAppointments}
                  />
                </div>
                <div className="table-cell patient">
                  Cliente
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
                  <div key={appointment.id} className={`appointment-row ${selectedAppointments.includes(appointment.id) ? 'selected' : ''}`}>
                    <div className="table-cell checkbox">
                      <input 
                        type="checkbox" 
                        checked={selectedAppointments.includes(appointment.id)}
                        onChange={() => handleSelectAppointment(appointment.id)}
                      />
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
                      <button 
                        className="actions-btn"
                        onClick={(e) => handleContextMenuOpen(e, appointment.patient, appointment.id)}
                      >
                        <img src="/img/3dots-icon.png" alt="Opciones" width="16" height="16" />
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

      {/* Modal para reservar cita */}
      <ReservarCitaModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
        specialist={{
          name: 'Laura Gómez',
          role: 'Peluquera'
        }}
        date={`${selectedDate}/${String(currentMonth + 1).padStart(2, '0')}/${currentYear}`}
        time={nextAvailableTime}
        duration="30 min"
      />

      {/* Modal para editar cita */}
      <EditAppointmentModal
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
        onConfirm={handleEditModalConfirm}
        appointmentData={selectedAppointment}
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

      <ReprogramarCitaModal
        isOpen={isReprogramarModalOpen}
        onClose={handleReprogramarModalClose}
        onConfirm={handleReprogramarModalConfirm}
        appointmentData={selectedAppointment}
      />

      <RecordatorioEnviadoModal
        isOpen={isRecordatorioModalOpen}
        onClose={handleRecordatorioModalClose}
      />
    </div>
  );
};

export default AgendaPage;
