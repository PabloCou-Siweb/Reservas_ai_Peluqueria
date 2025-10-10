import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { useNavigation } from '../contexts/NavigationContext';
import './EspecialistasPage.css';

const EspecialistasPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { navigateTo } = useNavigation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Datos de especialistas (simulados)
  const especialistas = [
    {
      id: 1,
      nombre: 'María García',
      especialidad: 'Corte y Peinado',
      consulta: 'Silla 1',
      horario: '08:00 - 16:00',
      foto: '/img/doctor-avatar.jpg'
    },
    {
      id: 2,
      nombre: 'Ana López',
      especialidad: 'Coloración',
      consulta: 'Silla 2',
      horario: '09:00 - 17:00',
      foto: '/img/doctor-avatar.jpg'
    },
    {
      id: 3,
      nombre: 'Carmen Ruiz',
      especialidad: 'Manicura',
      consulta: 'Silla 3',
      horario: '10:00 - 18:00',
      foto: '/img/doctor-avatar.jpg'
    },
    {
      id: 4,
      nombre: 'Laura Martínez',
      especialidad: 'Pedicura',
      consulta: 'Silla 4',
      horario: '08:30 - 16:30',
      foto: '/img/doctor-avatar.jpg'
    },
    {
      id: 5,
      nombre: 'Elena Torres',
      especialidad: 'Tratamientos Faciales',
      consulta: 'Silla 5',
      horario: '08:00 - 15:00',
      foto: '/img/doctor-avatar.jpg'
    },
    {
      id: 6,
      nombre: 'Isabel Sánchez',
      especialidad: 'Extensiones',
      consulta: 'Silla 6',
      horario: '09:30 - 17:30',
      foto: '/img/doctor-avatar.jpg'
    },
    {
      id: 7,
      nombre: 'Patricia Vega',
      especialidad: 'Peinados de Novia',
      consulta: 'Silla 7',
      horario: '08:00 - 16:00',
      foto: '/img/doctor-avatar.jpg'
    },
    {
      id: 8,
      nombre: 'Sofia Díaz',
      especialidad: 'Mechas y Balayage',
      consulta: 'Silla 8',
      horario: '10:00 - 18:00',
      foto: '/img/doctor-avatar.jpg'
    },
    {
      id: 9,
      nombre: 'Cristina Moreno',
      especialidad: 'Cejas y Pestañas',
      consulta: 'Silla 9',
      horario: '08:30 - 16:30',
      foto: '/img/doctor-avatar.jpg'
    },
    {
      id: 10,
      nombre: 'Rosa Silva',
      especialidad: 'Tratamientos Capilares',
      consulta: 'Silla 10',
      horario: '09:00 - 17:00',
      foto: '/img/doctor-avatar.jpg'
    },
    {
      id: 11,
      nombre: 'Mónica Jiménez',
      especialidad: 'Corte Masculino',
      consulta: 'Silla 11',
      horario: '08:00 - 15:00',
      foto: '/img/doctor-avatar.jpg'
    },
    {
      id: 12,
      nombre: 'Natalia Fernández',
      especialidad: 'Maquillaje',
      consulta: 'Silla 12',
      horario: '09:30 - 17:30',
      foto: '/img/doctor-avatar.jpg'
    },
    {
      id: 13,
      nombre: 'Lucía González',
      especialidad: 'Depilación',
      consulta: 'Silla 13',
      horario: '08:00 - 16:00',
      foto: '/img/doctor-avatar.jpg'
    },
    {
      id: 14,
      nombre: 'Paula Rodríguez',
      especialidad: 'Masajes',
      consulta: 'Silla 14',
      horario: '09:00 - 17:00',
      foto: '/img/doctor-avatar.jpg'
    },
    {
      id: 15,
      nombre: 'Andrea Morales',
      especialidad: 'Tratamientos Corporales',
      consulta: 'Silla 15',
      horario: '10:00 - 18:00',
      foto: '/img/doctor-avatar.jpg'
    },
    {
      id: 16,
      nombre: 'Beatriz Herrera',
      especialidad: 'Micropigmentación',
      consulta: 'Silla 16',
      horario: '08:30 - 16:30',
      foto: '/img/doctor-avatar.jpg'
    },
    {
      id: 17,
      nombre: 'Claudia Ramos',
      especialidad: 'Lifting de Pestañas',
      consulta: 'Silla 17',
      horario: '08:00 - 15:00',
      foto: '/img/doctor-avatar.jpg'
    },
    {
      id: 18,
      nombre: 'Diana Castro',
      especialidad: 'Tratamientos Anti-edad',
      consulta: 'Silla 18',
      horario: '09:30 - 17:30',
      foto: '/img/doctor-avatar.jpg'
    },
    {
      id: 19,
      nombre: 'Eva Mendoza',
      especialidad: 'Hidratación Facial',
      consulta: 'Silla 19',
      horario: '08:00 - 16:00',
      foto: '/img/doctor-avatar.jpg'
    },
    {
      id: 20,
      nombre: 'Francisca Vargas',
      especialidad: 'Limpieza Facial',
      consulta: 'Silla 20',
      horario: '10:00 - 18:00',
      foto: '/img/doctor-avatar.jpg'
    },
    {
      id: 21,
      nombre: 'Gloria Peña',
      especialidad: 'Tratamientos de Acné',
      consulta: 'Silla 21',
      horario: '08:30 - 16:30',
      foto: '/img/doctor-avatar.jpg'
    },
    {
      id: 22,
      nombre: 'Helena Ríos',
      especialidad: 'Tratamientos de Manchas',
      consulta: 'Silla 22',
      horario: '09:00 - 17:00',
      foto: '/img/doctor-avatar.jpg'
    },
    {
      id: 23,
      nombre: 'Inés Delgado',
      especialidad: 'Radiofrecuencia',
      consulta: 'Silla 23',
      horario: '08:00 - 15:00',
      foto: '/img/doctor-avatar.jpg'
    },
    {
      id: 24,
      nombre: 'Julia Campos',
      especialidad: 'Cavitación',
      consulta: 'Silla 24',
      horario: '09:30 - 17:30',
      foto: '/img/doctor-avatar.jpg'
    }
  ];

  // Filtrar especialistas basado en la búsqueda
  const filteredEspecialistas = especialistas.filter(especialista =>
    especialista.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    especialista.especialidad.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddEspecialista = () => {
    navigateTo('add-especialista');
  };

  return (
    <div className="especialistas-page">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      <div className={`main-content ${!sidebarOpen ? 'sidebar-closed' : ''}`}>
        {/* Header */}
        <div className="page-header">
          <div className="header-left">
            <h1>Especialistas</h1>
          </div>
          <div className="header-right">
            <button className="notification-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
            </button>
            <button className="settings-btn" onClick={() => navigateTo('configuracion')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Search and Add Section */}
        <div className="search-add-section">
          <div className="search-container">
            <input
              type="text"
              placeholder="Buscar especialista..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <div className="search-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
            </div>
          </div>
          <button className="add-especialista-btn" onClick={handleAddEspecialista}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Añadir especialista
          </button>
        </div>

        {/* Especialistas Grid */}
        <div className="especialistas-container">
          <div className="especialistas-grid">
            {filteredEspecialistas.map((especialista) => (
              <div 
                key={especialista.id} 
                className="especialista-card"
                onClick={() => navigateTo('especialista-details')}
                style={{ cursor: 'pointer' }}
              >
                <div className="especialista-avatar">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div className="especialista-info">
                  <h3 className="especialista-name">{especialista.nombre}</h3>
                  <p className="especialista-specialty">{especialista.especialidad}</p>
                  <div className="especialista-details">
                    <div className="detail-item">
                      <span className="detail-label">Consulta</span>
                      <span className="detail-value">{especialista.consulta}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Horario: L-V</span>
                      <span className="detail-value">{especialista.horario}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>


          {/* Paginación */}
          <div className="pagination">
            <button className="page-btn active">01</button>
            <button className="page-btn">02</button>
            <button className="page-btn">03</button>
            <span className="page-dots">...</span>
            <button className="page-btn">04</button>
            <button className="page-btn">05</button>
            <button className="page-btn">06</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EspecialistasPage;
