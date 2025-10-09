import React, { useState } from 'react';
import Sidebar from './Sidebar';
import AddTratamientoModal from './AddTratamientoModal';
import { useNavigation } from '../contexts/NavigationContext';
import './TratamientosPage.css';

const TratamientosPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const { navigateTo } = useNavigation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Datos de tratamientos siguiendo la plantilla
  const tratamientos = [
    {
      id: 1,
      nombre: 'Corte',
      especialistas: 4,
      duracion: '30 min',
      estado: 'Activa',
      icono: '/img/corte-layer.png'
    },
    {
      id: 2,
      nombre: 'Peinados',
      especialistas: 5,
      duracion: '45 min',
      estado: 'Activa',
      icono: '/img/peinados-layer.png'
    },
    {
      id: 3,
      nombre: 'Coloración',
      especialistas: 5,
      duracion: '25 min',
      estado: 'Activa',
      icono: '/img/coloracion-layer.png'
    },
    {
      id: 4,
      nombre: 'Tratamientos capilares',
      especialistas: 5,
      duracion: '60 min',
      estado: 'Activa',
      icono: '/img/tratamiento_capilar-layer.png'
    },
    {
      id: 5,
      nombre: 'Depilación',
      especialistas: 4,
      duracion: '25 min',
      estado: 'Activa',
      icono: '/img/depilacion-layer.png'
    },
    {
      id: 6,
      nombre: 'Pedicura',
      especialistas: 1,
      duracion: '60 min',
      estado: 'Activa',
      icono: '/img/pedicura-layer.png'
    },
    {
      id: 7,
      nombre: 'Manicura',
      especialistas: 5,
      duracion: '30 min',
      estado: 'Activa',
      icono: '/img/manicura-layer.png'
    },
    {
      id: 8,
      nombre: 'Cejas y pestañas',
      especialistas: 5,
      duracion: '125 min',
      estado: 'Activa',
      icono: '/img/cejas_pestañas-layer.png'
    },
    {
      id: 9,
      nombre: 'Novias',
      especialistas: 4,
      duracion: '30 min',
      estado: 'Activa',
      icono: '/img/novias-layer.png'
    },
    {
      id: 10,
      nombre: 'Barbería',
      especialistas: 1,
      duracion: '30 min',
      estado: 'Activa',
      icono: '/img/barberia-layer.png'
    },
    {
      id: 11,
      nombre: 'Uñas',
      especialistas: 5,
      duracion: '45 min',
      estado: 'Activa',
      icono: '/img/unhas-layer.png'
    }
  ];

  const handleTratamientoClick = (tratamientoId: number) => {
    navigateTo('tratamiento-details');
  };

  const handleAddTratamiento = () => {
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
  };

  const handleAddTratamientoSubmit = (tratamiento: any) => {
    console.log('Nuevo tratamiento agregado:', tratamiento);
    setShowAddModal(false);
    // Aquí podrías actualizar la lista de tratamientos o hacer otras acciones
  };

  return (
    <div className="tratamientos-container">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      <div className="main-content">
        {/* Header */}
        <div className="page-header">
          <h1>Tratamientos</h1>
          <div className="header-right">
            <button className="notification-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </button>
            <button className="settings-btn" onClick={() => navigateTo('configuracion')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Tratamientos Grid */}
        <div className="tratamientos-grid">
          {tratamientos.map((tratamiento) => (
            <div 
              key={tratamiento.id} 
              className="tratamiento-card"
              onClick={() => handleTratamientoClick(tratamiento.id)}
            >
              <div className="settings-icon">
                <img src="/img/settings-icon.png" alt="Settings" />
              </div>
              
              <div className="card-content">
                <div className="tratamiento-icon">
                  <img src={tratamiento.icono} alt={tratamiento.nombre} />
                </div>
                
                <h3 className="tratamiento-name">{tratamiento.nombre}</h3>
                <p className="especialistas-count">{tratamiento.especialistas} especialistas</p>
              </div>
              
              <div className="tratamiento-info">
                <div className="info-row">
                  <span className="info-label">Duración estándar</span>
                  <span className="info-value">{tratamiento.duracion}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Estado</span>
                  <span className="info-value estado-activa">{tratamiento.estado}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Add Treatment Card */}
          <div className="tratamiento-card add-treatment-card" onClick={handleAddTratamiento}>
            <div className="card-header">
              <div className="add-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </div>
            </div>
            
            <div className="card-content">
              <h3 className="tratamiento-name">Agregar Tratamiento</h3>
              <p className="add-description">Crear nuevo servicio</p>
              
              <div className="add-info">
                <div className="add-info-item">
                  <span className="add-label">Nuevo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para añadir tratamiento */}
      <AddTratamientoModal
        isOpen={showAddModal}
        onClose={handleCloseModal}
        onAdd={handleAddTratamientoSubmit}
      />
    </div>
  );
};

export default TratamientosPage;
