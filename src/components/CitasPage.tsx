import React, { useState } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import Sidebar from './Sidebar';
import ReservarCitaModal from './ReservarCitaModal';
import './CitasPage.css';

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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleReservarClick = () => {
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
    
    // Calculate how many cells we need to fill to complete the grid
    // We want exactly 6 rows (42 cells total)
    const totalCells = 42;
    const remainingCells = totalCells - days.length;
    
    // Add days from next month to fill remaining cells
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

  // Datos de especialistas
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
    },
    {
      id: 5,
      nombre: 'Carlos Ruiz',
      rol: 'Barbero',
      consulta: 'Consulta 106',
      imagen: '/img/avatar5.jpg'
    },
    {
      id: 6,
      nombre: 'María López',
      rol: 'Manicurista',
      consulta: 'Consulta 107',
      imagen: '/img/avatar6.jpg'
    },
    {
      id: 7,
      nombre: 'Pedro Sánchez',
      rol: 'Estilista',
      consulta: 'Consulta 108',
      imagen: '/img/avatar7.jpg'
    },
    {
      id: 8,
      nombre: 'Isabel Torres',
      rol: 'Colorista',
      consulta: 'Consulta 109',
      imagen: '/img/avatar8.jpg'
    },
    {
      id: 9,
      nombre: 'Miguel Vega',
      rol: 'Barbero',
      consulta: 'Consulta 110',
      imagen: '/img/avatar9.jpg'
    },
    {
      id: 10,
      nombre: 'Sofia Rodriguez',
      rol: 'Esteticista',
      consulta: 'Consulta 111',
      imagen: '/img/avatar10.jpg'
    }
  ];

  // Datos de ejemplo para las citas
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
      <div className="main-content">
        <div className="main-header">
          <div className="header-left">
            <button 
              className="back-button"
              onClick={() => navigateTo('dashboard')}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15,18 9,12 15,6"/>
              </svg>
            </button>
                <div className="breadcrumb">
                  <span>Citas</span>
                  <span>/</span>
                  <span>{specialty}</span>
                </div>
          </div>
          <div className="header-right">
            <div className="header-actions">
              <button className="nueva-cita-btn" onClick={navigateToNuevaCita}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                Nueva cita
              </button>
              <div className="notification-icon">
                <img src="/img/notification-icon.png" alt="Notificaciones" />
                <div className="notification-dot"></div>
              </div>
              <div className="settings-icon">
                <img src="/img/settings-icon.png" alt="Configuración" />
              </div>
            </div>
            <div className="header-search">
              <input
                type="text"
                placeholder="Buscar por nombre"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="header-search-input"
              />
              <div className="header-search-icon">
                <img src="/img/search-icon.png" alt="Buscar" />
              </div>
            </div>
          </div>
        </div>

        {/* Próxima cita disponible */}
        <div className="next-appointment-section">
          <div className="next-appointment-card">
                <div className="appointment-info">
                  <h3>Próxima cita disponible</h3>
                  <p>Cita de {specialty.toLowerCase()}</p>
              <div className="specialist-info">
                <div className="specialist-avatar">
                  <div className="avatar-placeholder">LM</div>
                </div>
                <div className="specialist-details">
                  <span className="specialist-name">Laura Martinez</span>
                  <span className="specialist-role">Peluquera</span>
                  <span className="specialist-consulta">Consulta 105</span>
                </div>
              </div>
              <div className="appointment-fields">
                <div className="field-group">
                  <label>Fecha</label>
                  <input type="text" value="25/02/2025" readOnly />
                </div>
                <div className="field-group">
                  <label>Hora</label>
                  <input type="text" value="09:00" readOnly />
                </div>
              </div>
            </div>
            <button className="reserve-button" onClick={handleReservarClick}>Reservar ahora</button>
          </div>
        </div>

        <div className="citas-content">
          <div className="citas-layout">
            {/* Column 1 - Specialists */}
            <div className="specialists-column">
              <div className="specialists-section">
                <h2 className="specialists-title">Selecciona un especialista</h2>
                <div className="specialists-search">
                  <input
                    type="text"
                    placeholder="Buscar especialista..."
                    value={specialistSearch}
                    onChange={(e) => setSpecialistSearch(e.target.value)}
                    className="specialist-search-input"
                  />
                  <div className="search-icon">
                    <img src="/img/search-icon.png" alt="Buscar" />
                  </div>
                </div>
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
                      <div className="specialist-info">
                        <span className="specialist-name">{especialista.nombre}</span>
                        <span className="specialist-role">{especialista.rol}</span>
                        <span className="specialist-consulta">{especialista.consulta}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 2 - Calendar */}
            <div className="calendar-column">
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
              </div>
            </div>

            {/* Column 3 - Appointments */}
            <div className="appointments-column">
              <div className="appointments-section">
                <div className="appointments-header">
                  <h2 className="appointments-title">Próximas citas</h2>
                  <div className="appointments-filters">
                    <button className="filter-btn active">Todas</button>
                    <button className="filter-btn">Confirmadas</button>
                    <button className="filter-btn">Pendientes</button>
                  </div>
                </div>

                <div className="appointments-list">
                  {filteredCitas.map((cita) => (
                    <div key={cita.id} className="appointment-card">
                      <div className="appointment-info">
                        <div className="appointment-client">
                          <h3 className="client-name">{cita.cliente}</h3>
                          <span className="appointment-service">{cita.servicio}</span>
                        </div>
                        <div className="appointment-details">
                          <div className="appointment-specialist">
                            <span className="detail-label">Especialista:</span>
                            <span className="detail-value">{cita.especialista}</span>
                          </div>
                          <div className="appointment-date">
                            <span className="detail-label">Fecha:</span>
                            <span className="detail-value">{cita.fecha}</span>
                          </div>
                          <div className="appointment-time">
                            <span className="detail-label">Hora:</span>
                            <span className="detail-value">{cita.hora}</span>
                          </div>
                        </div>
                      </div>
                      <div className="appointment-actions">
                        <span className={`status-badge ${cita.estado}`}>
                          {cita.estado === 'confirmada' ? 'CONFIRMADA' : 'PENDIENTE'}
                        </span>
                        <button className="action-btn">Ver detalles</button>
                      </div>
                    </div>
                  ))}
                </div>
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
    </div>
  );
};

export default CitasPage;
