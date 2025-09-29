import React, { useState } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import Sidebar from './Sidebar';
import EditarTratamientoModal from './EditarTratamientoModal';
import './TratamientoDetailsPage.css';

const TratamientoDetailsPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [showEditModal, setShowEditModal] = useState(false);
  const [especialistas, setEspecialistas] = useState([
    { id: 1, nombre: 'Pol Palomo Cortés', email: 'polpalomo@gmail.com', telefono: '+34 606 20 45 56', especialidad: 'Peluquero', asignado: true },
    { id: 2, nombre: 'Alberto Jiménez Rodríguez', email: 'alberto.jimenez@example.com', telefono: '+34 659 25 63 65', especialidad: 'Peluquero', asignado: false },
    { id: 3, nombre: 'Raúl Iznate Cabras', email: 'raul.iznate@example.com', telefono: '+34 612 34 56 78', especialidad: 'Peluquero', asignado: true },
    { id: 4, nombre: 'Roberto Bloste Cañí', email: 'roberto.bloste@example.com', telefono: '+34 623 45 67 89', especialidad: 'Peluquero', asignado: false },
    { id: 5, nombre: 'Martín Guijarro López', email: 'martin.guijarro@example.com', telefono: '+34 634 56 78 90', especialidad: 'Peluquero', asignado: true }
  ]);

  const [citas, setCitas] = useState([
    { id: 1, cliente: 'Pablo Simón López', telefono: '+34 654 25 20 45', email: 'pablosimon_lopez@gmail.com', fecha: '15/08/2025 - 09:00', estado: 'Confirmada', seleccionada: true },
    { id: 2, cliente: 'Javi Correa Gómez', telefono: '+34 620 12 34 89', email: 'maria.gonzalez@yahoo.com', fecha: '16/08/2025 - 10:30', estado: 'Confirmada', seleccionada: true },
    { id: 3, cliente: 'Ana María Jiménez', telefono: '+34 610 12 34 56', email: 'olivia.martinez@live.com', fecha: '20/08/2025 - 15:45', estado: 'Pendiente', seleccionada: false },
    { id: 4, cliente: 'Pepito Jiménez Sancho', telefono: '+34 615 67 89 01', email: 'michael.johnson@protonmail.com', fecha: '20/08/2025 - 15:45', estado: 'Confirmada', seleccionada: false }
  ]);

  const [busquedaCliente, setBusquedaCliente] = useState('');

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
  };

  const handleSaveTratamiento = (data: any) => {
    console.log('Tratamiento actualizado:', data);
    // Aquí se podría implementar la lógica para guardar los cambios
    setShowEditModal(false);
  };

  const handleEspecialistaToggle = (id: number) => {
    setEspecialistas(prev =>
      prev.map(esp =>
        esp.id === id ? { ...esp, asignado: !esp.asignado } : esp
      )
    );
  };

  const handleCitaToggle = (id: number) => {
    setCitas(prev =>
      prev.map(cita =>
        cita.id === id ? { ...cita, seleccionada: !cita.seleccionada } : cita
      )
    );
  };

  const horarios = [
    { dia: 'Lunes', horario: '09:00 - 18:00' },
    { dia: 'Martes', horario: '09:00 - 18:00' },
    { dia: 'Miércoles', horario: '09:00 - 18:00' },
    { dia: 'Jueves', horario: '09:00 - 18:00' },
    { dia: 'Viernes', horario: '09:00 - 18:00' },
    { dia: 'Sábado', horario: 'No disponible' },
    { dia: 'Domingo', horario: 'No disponible' }
  ];

  return (
    <div className="tratamiento-details-container">
      <Sidebar isOpen={true} onToggle={() => {}} />

      <div className="main-content">
        {/* Header */}
        <div className="page-header">
          <button className="back-btn" onClick={() => navigateTo('tratamientos')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <div className="header-content">
            <h1 className="page-title">Peluquería</h1>
            <p className="page-subtitle">Servicios de belleza y cuidado capilar especializados, incluyendo cortes, peinados, coloración y tratamientos para el cabello.</p>
          </div>
          <div className="header-actions">
            <div className="notification-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <div className="notification-dot"></div>
            </div>
            <div className="settings-btn" onClick={() => navigateTo('configuracion')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Top Section */}
        <div className="top-section">
          {/* Treatment Details & Schedules */}
          <div className="treatment-split-card">
            <div className="treatment-left-section">
              <div className="treatment-icon-container">
                <div className="treatment-icon">
                  <img src="/img/scissor-icon.png" alt="Peluquería" />
                </div>
              </div>
              <div className="treatment-info-section">
                <div className="treatment-status">
                  <span className="status-label">Activa</span>
                </div>
                <div className="treatment-duration">
                  <span className="duration-label">Duración estándar</span>
                  <span className="duration-value">25 min</span>
                </div>
                    <div className="treatment-actions">
                      <button className="edit-btn" onClick={handleEditClick}>Editar</button>
                      <button className="delete-btn">Eliminar</button>
                    </div>
              </div>
            </div>
            
            <div className="vertical-divider"></div>
            
            <div className="treatment-right-section">
              <div className="schedules-header">
                <h3>Horarios</h3>
                <button className="edit-schedule-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                </button>
              </div>
              <div className="schedules-list">
                {horarios.map((horario, index) => (
                  <div key={index} className="schedule-item">
                    <span className="schedule-day">{horario.dia}</span>
                    <span className="schedule-time">{horario.horario}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Specialists */}
          <div className="specialists-card">
            <div className="specialists-header">
              <h3>Especialistas asignados</h3>
            </div>
            <div className="specialists-list">
              {especialistas.map((especialista) => (
                <div key={especialista.id} className="specialist-item">
                  <div className="specialist-checkbox">
                    <input
                      type="checkbox"
                      id={`esp-${especialista.id}`}
                      checked={especialista.asignado}
                      onChange={() => handleEspecialistaToggle(especialista.id)}
                    />
                    <label htmlFor={`esp-${especialista.id}`}></label>
                  </div>
                  <div className="specialist-info">
                    <div className="specialist-name">{especialista.nombre}</div>
                  </div>
                  <div className="specialist-actions">
                    <button className="view-profile-btn">Ver ficha</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="specialists-actions">
              <button className="remove-btn">Eliminar</button>
              <button className="add-btn">Añadir</button>
            </div>
          </div>
        </div>

        {/* Appointments Section */}
        <div className="appointments-section">
          <div className="appointments-header">
            <h2>Citas programadas</h2>
            <div className="search-container">
              <input
                type="text"
                placeholder="Buscar cliente..."
                value={busquedaCliente}
                onChange={(e) => setBusquedaCliente(e.target.value)}
                className="search-input"
              />
              <div className="search-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="appointments-table">
            <div className="table-header">
              <div className="header-cell checkbox-col"></div>
              <div className="header-cell">Cliente</div>
              <div className="header-cell">Teléfono</div>
              <div className="header-cell">Email</div>
              <div className="header-cell">Próxima cita</div>
              <div className="header-cell">Estado</div>
              <div className="header-cell actions-col"></div>
            </div>
            <div className="table-body">
              {citas.map((cita) => (
                <div key={cita.id} className={`table-row ${cita.seleccionada ? 'selected' : ''}`}>
                  <div className="table-cell checkbox-col">
                    <input
                      type="checkbox"
                      checked={cita.seleccionada}
                      onChange={() => handleCitaToggle(cita.id)}
                    />
                  </div>
                  <div className="table-cell">{cita.cliente}</div>
                  <div className="table-cell">{cita.telefono}</div>
                  <div className="table-cell">{cita.email}</div>
                  <div className="table-cell">{cita.fecha}</div>
                  <div className="table-cell">
                    <div className={`status-badge ${cita.estado.toLowerCase()}`}>
                      <div className={`status-dot ${cita.estado.toLowerCase()}`}></div>
                      {cita.estado}
                    </div>
                  </div>
                  <div className="table-cell actions-col">
                    <button className="menu-btn">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="1"/>
                        <circle cx="12" cy="5" r="1"/>
                        <circle cx="12" cy="19" r="1"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pagination">
            <span>01</span>
            <span>02</span>
            <span>03</span>
            <span>...</span>
            <span>04</span>
            <span>05</span>
            <span>06</span>
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <p>© 2025 Bokifly</p>
        </div>
      </div>

      {/* Editar Tratamiento Modal */}
      <EditarTratamientoModal
        isOpen={showEditModal}
        onClose={handleCloseModal}
        onSave={handleSaveTratamiento}
      />
    </div>
  );
};

export default TratamientoDetailsPage;
