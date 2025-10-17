import React, { useState } from 'react';
import Sidebar from './Sidebar';
import AddTratamientoModal from './AddTratamientoModal';
import { useNavigation } from '../contexts/NavigationContext';
import './TratamientosPage.css';
import './HeaderButtons.css';

const TratamientosPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const { navigateTo } = useNavigation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

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
  };

  return (
    <div className="tratamientos-container">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      <div className={`main-content ${!sidebarOpen ? 'sidebar-closed' : ''}`}>
        {/* Header */}
        <div className="page-header">
          <h1>Tratamientos</h1>
          <div className="header-right">
            <button className="notification-btn">
              <img src="/img/notification-icon.png" alt="Notificaciones" width="20" height="20" />
            </button>
            <button className="settings-btn" onClick={() => navigateTo('configuracion')}>
              <img src="/img/settings-icon.png" alt="Configuración" width="20" height="20" />
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
              <div className="card-settings-icon">
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
