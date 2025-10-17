import React, { useState, useEffect } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import Sidebar from './Sidebar';
import './EspecialistaDetailsPage.css';
import './HeaderButtons.css';

const EspecialistaDetailsPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectAll, setSelectAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCitas, setSelectedCitas] = useState<number[]>([]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    if (newSelectAll) {
      // Seleccionar todas las citas
      setSelectedCitas(specialist.citas.map(cita => cita.id));
    } else {
      // Deseleccionar todas
      setSelectedCitas([]);
    }
  };

  const handleCitaSelect = (citaId: number) => {
    if (selectedCitas.includes(citaId)) {
      setSelectedCitas(selectedCitas.filter(id => id !== citaId));
    } else {
      setSelectedCitas([...selectedCitas, citaId]);
    }
  };

  // Sincronizar el estado del checkbox del header
  useEffect(() => {
    const allSelected = specialist.citas.length > 0 && selectedCitas.length === specialist.citas.length;
    setSelectAll(allSelected);
  }, [selectedCitas]);

  // Datos del especialista (simulados)
  const specialist = {
    id: 1,
    nombre: 'Ana Martínez',
    email: 'josemartinez@gmail.com',
    telefono: '+34 625 58 0 15',
    fechaRegistro: '04/10/1999',
    direccion: 'Calle 45 #23-67, Bogotá',
    ciudad: 'Vigo',
    codigoPostal: '36475',
    especialidades: ['Peluquería', 'Manicura'],
    clientes: 105,
    foto: '/img/avatars/ana-martinez.jpg',
    horario: {
      lunes: '09:00 - 18:00',
      martes: '09:00 - 18:00',
      miercoles: '09:00 - 18:00',
      jueves: '09:00 - 18:00',
      viernes: '09:00 - 18:00',
      sabado: 'Descanso',
      domingo: 'Descanso'
    },
    totalSemanal: '40.5h',
    citas: [
      {
        id: 1,
        cliente: 'Pablo Simón López',
        telefono: '+34 654 25 20 45',
        email: 'pablosimon_lopez@gmail.com',
        proximaCita: '15/08/2025 - 09:00',
        estado: 'Confirmada',
        seleccionado: true
      },
      {
        id: 2,
        cliente: 'Javi Correa Gomez',
        telefono: '+34 620 12 34 89',
        email: 'maria.gonzalez@yahoo.com',
        proximaCita: '16/08/2025 - 10:30',
        estado: 'Confirmada',
        seleccionado: true
      },
      {
        id: 3,
        cliente: 'Malena Cortiñas Alonso',
        telefono: '+34 610 12 34 56',
        email: 'olivia.martinez@live.com',
        proximaCita: '20/08/2025 - 15:45',
        estado: 'Pendiente',
        seleccionado: false
      },
      {
        id: 4,
        cliente: 'Ricardo Pérez González',
        telefono: '+34 612 34 56 78',
        email: 'david.lee@google.com',
        proximaCita: '19/08/2025 - 14:00',
        estado: 'Cancelada',
        seleccionado: false
      },
      {
        id: 5,
        cliente: 'Lisa Simpson Bastos',
        telefono: '+34 623 78 90 12',
        email: 'pablosimon_lopez@gmail.com',
        proximaCita: '17/08/2025 - 11:00',
        estado: 'Cancelada',
        seleccionado: true
      }
    ]
  };

  const handleEditProfile = () => {
    navigateTo('edit-especialista');
  };

  return (
    <div className="especialista-details-page">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

      <div className={`main-content ${!sidebarOpen ? 'sidebar-closed' : ''}`}>
        {/* Header */}
        <div className="page-header">
          <div className="header-left">
            <div className="breadcrumbs">
              <span>Especialistas / Ana Martínez</span>
            </div>
            <div className="title-row">
              <button className="back-button" onClick={() => navigateTo('especialistas')}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
              <h1>Ana Martínez</h1>
            </div>
          </div>
          <div className="header-actions">
            <button className="notification-btn">
              <img src="/img/notification-icon.png" alt="Notificaciones" width="20" height="20" />
            </button>
            <button className="settings-btn" onClick={() => navigateTo('configuracion')}>
              <img src="/img/settings-icon.png" alt="Configuración" width="20" height="20" />
            </button>
          </div>
        </div>

        {/* Content with scroll */}
        <div className="content-container">
          {/* Profile Section */}
          <div className="profile-section">
            <div className="profile-card">
              <div className="profile-left">
                <div className="profile-image">
                  <div className="avatar-placeholder">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                </div>
                <div className="specialties">
                  {specialist.especialidades.map((especialidad, index) => (
                    <span key={index} className="specialty-tag">{especialidad}</span>
                  ))}
                </div>
                <h2 className="specialist-name">{specialist.nombre}</h2>
                <p className="specialist-email">{specialist.email}</p>
                <div className="patients-count">
                  <span className="count">{specialist.clientes}</span>
                  <span className="label">Clientes</span>
                </div>
                <button className="edit-profile-btn" onClick={handleEditProfile}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                  Editar perfil
                </button>
              </div>

              <div className="profile-separator"></div>

              <div className="profile-right">
                <h3>Datos personales</h3>
                <div className="data-list">
                  <div className="data-item">
                    <span className="label">Email:</span>
                    <span className="value">{specialist.email}</span>
                  </div>
                  <div className="data-item">
                    <span className="label">Teléfono:</span>
                    <span className="value">{specialist.telefono}</span>
                  </div>
                  <div className="data-item">
                    <span className="label">Fecha de registro:</span>
                    <span className="value">{specialist.fechaRegistro}</span>
                  </div>
                  <div className="data-item">
                    <span className="label">Dirección:</span>
                    <span className="value">{specialist.direccion}</span>
                  </div>
                  <div className="data-item">
                    <span className="label">Ciudad:</span>
                    <span className="value">{specialist.ciudad}</span>
                  </div>
                  <div className="data-item">
                    <span className="label">Código Postal:</span>
                    <span className="value">{specialist.codigoPostal}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="schedule-card">
              <h3>Horario semanal</h3>
              <div className="schedule-list">
                <div className="schedule-item">
                  <span className="day">Lunes</span>
                  <span className="hours">{specialist.horario.lunes}</span>
                </div>
                <div className="schedule-item">
                  <span className="day">Martes</span>
                  <span className="hours">{specialist.horario.martes}</span>
                </div>
                <div className="schedule-item">
                  <span className="day">Miércoles</span>
                  <span className="hours">{specialist.horario.miercoles}</span>
                </div>
                <div className="schedule-item">
                  <span className="day">Jueves</span>
                  <span className="hours">{specialist.horario.jueves}</span>
                </div>
                <div className="schedule-item">
                  <span className="day">Viernes</span>
                  <span className="hours">{specialist.horario.viernes}</span>
                </div>
                <div className="schedule-item">
                  <span className="day">Sábado</span>
                  <span className="hours">{specialist.horario.sabado}</span>
                </div>
                <div className="schedule-item">
                  <span className="day">Domingo</span>
                  <span className="hours">{specialist.horario.domingo}</span>
                </div>
              </div>
              <div className="total-weekly">
                <span className="label">Total semanal</span>
                <span className="value">{specialist.totalSemanal}</span>
              </div>
            </div>
          </div>

          {/* Appointments Section */}
          <div className="appointments-section">
            <div className="appointments-header">
              <h3>Citas programadas</h3>
              <div className="search-container">
                <input 
                  type="text" 
                  placeholder="Buscar cliente..." 
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                </svg>
              </div>
            </div>

            <div className="appointments-table">
              <div className="table-header">
                <div className="checkbox-col">
                  <input 
                    type="checkbox" 
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </div>
                <div className="client-col">
                  <span>Cliente</span>
                  <img src="/img/up_down-icon.png" alt="Sort" className="sort-icon" />
                </div>
                <div className="phone-col">Teléfono</div>
                <div className="email-col">Email</div>
                <div className="appointment-col">Próxima cita</div>
                <div className="status-col">Estado</div>
                <div className="actions-col"></div>
              </div>
              <div className="table-body">
                {specialist.citas.map((cita) => (
                  <div key={cita.id} className={`data-row ${selectedCitas.includes(cita.id) ? 'selected' : ''}`}>
                    <div className="checkbox-col">
                      <input 
                        type="checkbox" 
                        checked={selectedCitas.includes(cita.id)}
                        onChange={() => handleCitaSelect(cita.id)}
                      />
                    </div>
                    <div className="client-col patient-name">{cita.cliente}</div>
                    <div className="phone-col">{cita.telefono}</div>
                    <div className="email-col">{cita.email}</div>
                    <div className="appointment-col">{cita.proximaCita}</div>
                    <div className="status-col">
                      <span className={`status ${cita.estado.toLowerCase()}`}>
                        {cita.estado}
                      </span>
                    </div>
                    <div className="actions-col">
                      <button className="actions-btn">
                        <img src="/img/3dots-icon.png" alt="Actions" width="16" height="16" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pagination">
              <span className="page-number active">01</span>
              <span className="page-number">02</span>
              <span className="page-number">03</span>
              <span className="page-number">04</span>
              <span className="page-number">05</span>
              <span className="page-number">06</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EspecialistaDetailsPage;
