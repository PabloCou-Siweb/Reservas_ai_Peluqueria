import React, { useState } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import Sidebar from './Sidebar';
import './ClientDetailsPage.css';

const ClientDetailsPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'previous' | 'history'>('upcoming');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [notas, setNotas] = useState([
    {
      id: 1,
      texto: 'Este paciente necesita realizarse la cantidad completa de exámenes',
      fecha: '06/08/2025'
    },
    {
      id: 2,
      texto: 'Excelente funcionamiento estándar que supera las expectativas',
      fecha: '21/06/2025'
    },
    {
      id: 3,
      texto: 'Reacción alérgica a la penicilina',
      fecha: '14/05/2025'
    },
    {
      id: 4,
      texto: 'Cabello seco y quebradizo, se aconseja tratamiento de hidratación profunda cada mes',
      fecha: '10/04/2025'
    },
    {
      id: 5,
      texto: 'Prefiere corte recto con puntas desfiladas, no le gustan los cambios muy drásticos',
      fecha: '28/03/2025'
    },
    {
      id: 6,
      texto: 'Alérgico a algunos tintes, usar solo productos sin amoniaco',
      fecha: '15/03/2025'
    }
  ]);

  // Datos del cliente (simulados)
  const client = {
    id: 1,
    nombre: 'Pablo Simón López',
    email: 'pablo.simón@gmail.com',
    telefono: '+34 625 58 0 15',
    direccion: 'Calle 45 #23-67, Bogotá',
    ciudad: 'Vigo',
    codigoPostal: '36475',
    fechaNacimiento: '15 de marzo 1990',
    genero: 'Masculino',
    fechaRegistro: '15 de diciembre 2023',
    estadoMembresia: 'Activo',
    citasRealizadas: 5,
    citasProximas: 1,
    documentos: [
      {
        id: 1,
        nombre: 'Fotografías peinado boda.pdf',
        tamaño: '45 kb'
      },
      {
        id: 2,
        nombre: 'Esquema de coloración.pdf',
        tamaño: '30 kb'
      }
    ],
    citasProximasList: [
      {
        id: 1,
        fecha: '15 Agosto \'25 14:30h',
        tipo: 'Cita',
        especialista: 'Ana García',
        especialidad: 'Corte',
        notas: 'Corte de cabello y peinado para evento especial'
      },
      {
        id: 2,
        fecha: '20 Agosto \'25 10:00h',
        tipo: 'Tratamiento',
        especialista: 'Carlos Ruiz',
        especialidad: 'Coloración',
        notas: 'Coloración completa con mechas balayage'
      },
      {
        id: 3,
        fecha: '25 Agosto \'25 16:00h',
        tipo: 'Mantenimiento',
        especialista: 'Laura Fernández',
        especialidad: 'Manicura',
        notas: 'Manicura francesa y pedicura'
      }
    ],
    citasAnterioresList: [
      {
        id: 4,
        fecha: '01 Enero \'25 09:00h',
        tipo: 'Cita',
        especialista: 'Juan Luis Guerra',
        especialidad: 'Uñas',
        notas: 'Manicura completa con esmaltado francés'
      },
      {
        id: 5,
        fecha: '03 Enero \'25 09:00h',
        tipo: 'Mantenimiento',
        especialista: 'Ana López',
        especialidad: 'Corte',
        notas: 'Corte de mantenimiento y peinado'
      },
      {
        id: 6,
        fecha: '10 Enero \'25 11:30h',
        tipo: 'Tratamiento',
        especialista: 'María Rodríguez',
        especialidad: 'Coloración',
        notas: 'Tinte completo con mechas'
      },
      {
        id: 7,
        fecha: '15 Enero \'25 16:00h',
        tipo: 'Cita',
        especialista: 'Pedro Sánchez',
        especialidad: 'Barba',
        notas: 'Arreglo de barba y bigote'
      }
    ],
    tratamientos: [
      {
        id: 1,
        nombre: 'Tinte raíz + mechas balayage',
        detalles: 'Duración: 2h | Producto: línea sin amoniaco.',
        especialista: 'Laura Gómez',
        fecha: '06 ene 2025',
        estado: 'Activo',
        duracion: '3 meses'
      },
      {
        id: 2,
        nombre: 'Corte de puntas + tratamiento hidratación profunda',
        detalles: 'Cabello muy reseco, se recomendó repetir en 4 semanas.',
        especialista: 'Marcos Peleteiro',
        fecha: '06 ene 2025',
        estado: 'Activa',
        duracion: '7 días'
      },
      {
        id: 3,
        nombre: 'Alisado de keratina',
        detalles: 'Duración: 3h | Duración: 3',
        especialista: 'Ana Gomez',
        fecha: '06 ene 2025',
        estado: 'Activo',
        duracion: '6 meses'
      }
    ]
  };

  const [nuevaNota, setNuevaNota] = useState('');

  const handleAddNote = () => {
    if (nuevaNota.trim()) {
      const nuevaNotaObj = {
        id: Math.max(...notas.map(n => n.id)) + 1,
        texto: nuevaNota.trim(),
        fecha: new Date().toLocaleDateString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        })
      };
      setNotas([nuevaNotaObj, ...notas]);
      setNuevaNota('');
    }
  };

  const handleAddDocument = () => {
    // Aquí se manejaría la subida de documentos
  };

  const handleAddAppointment = () => {
    navigateTo('nueva-cita');
  };

  const handleViewAllNotes = () => {
    setShowNotesModal(true);
  };

  const handleCloseNotesModal = () => {
    setShowNotesModal(false);
  };

  const handleDeleteNote = (noteId: number) => {
    setNotas(notas.filter(nota => nota.id !== noteId));
  };

  return (
    <div className="client-details-page">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="main-content">
        {/* Header */}
        <div className="page-header">
          <div className="header-left">
            <div className="breadcrumbs">
              <span>Clientes / Pablo Simón</span>
            </div>
            <div className="page-title">
              <button className="back-button" onClick={() => navigateTo('clientes')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
              </button>
              <h1>Detalles del cliente</h1>
            </div>
          </div>
          <div className="header-actions">
            <button className="action-btn">
              <img src="/img/notification-icon.png" alt="Notificaciones" />
            </button>
            <button className="action-btn">
              <img src="/img/user-icon.png" alt="Usuario" />
            </button>
            <button className="action-btn">
              <img src="/img/settings-icon.png" alt="Configuración" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="content-grid">
          {/* Perfil y Detalles del cliente en un solo div con 2 columnas */}
          <div className="client-profile-details-card">
            <div className="profile-section">
              <div className="profile-picture">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <h2>{client.nombre}</h2>
              <p className="client-email">{client.email}</p>
              
              <div className="appointments-summary">
                <h3>Citas</h3>
                <div className="summary-stats">
                  <div className="stat">
                    <span className="number">{client.citasRealizadas}</span>
                    <span className="label">Realizadas</span>
                  </div>
                  <div className="stat">
                    <span className="number">{client.citasProximas}</span>
                    <span className="label">Próximas</span>
                  </div>
                </div>
              </div>
              
              <button className="edit-profile-btn" onClick={() => navigateTo('edit-client')}>
                <img src="/img/rounded_pen-icon.png" alt="Editar" />
                Editar perfil
              </button>
            </div>

            <div className="divider"></div>

            <div className="details-section">
              <h3>Detalles del cliente</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="label">Género:</span>
                  <span className="value">{client.genero}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Fecha de nacimiento:</span>
                  <span className="value">{client.fechaNacimiento}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Teléfono:</span>
                  <span className="value">{client.telefono}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Dirección:</span>
                  <span className="value">{client.direccion}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Ciudad:</span>
                  <span className="value">{client.ciudad}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Código Postal:</span>
                  <span className="value">{client.codigoPostal}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Fecha de registro:</span>
                  <span className="value">{client.fechaRegistro}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Estado de membresía:</span>
                  <span className="value status-active">
                    <span className="status-dot"></span>
                    {client.estadoMembresia}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Notas */}
          <div className="notes-card">
            <div className="card-header">
              <h3>Notas</h3>
              <button className="view-all-btn" onClick={handleViewAllNotes}>Ver todas</button>
            </div>
            <div className="notes-list">
              {notas.slice(0, 3).map(nota => (
                <div key={nota.id} className="note-item">
                  <span className="note-text">{nota.texto}</span>
                  <span className="note-date">{nota.fecha}</span>
                </div>
              ))}
            </div>
            <div className="add-note-section">
              <input
                type="text"
                placeholder="Agregar una nota..."
                value={nuevaNota}
                onChange={(e) => setNuevaNota(e.target.value)}
                className="note-input"
              />
              <button className="send-note-btn" onClick={handleAddNote}>
                Enviar nota
              </button>
            </div>
          </div>

          {/* Documentos */}
          <div className="documents-card">
            <div className="card-header">
              <h3>Documentos</h3>
              <button className="add-file-btn" onClick={handleAddDocument}>
                + Añadir archivo
              </button>
            </div>
            <div className="documents-list">
              {client.documentos.map(doc => (
                <div key={doc.id} className="document-item">
                  <img src="/img/picture-icon.png" alt="Archivo" />
                  <span className="document-name">{doc.nombre}</span>
                  <span className="document-size">{doc.tamaño}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sección de citas */}
        <div className="appointments-section">
          <div className="appointments-header">
            <div className="tabs">
              <button 
                className={`tab ${activeTab === 'upcoming' ? 'active' : ''}`}
                onClick={() => setActiveTab('upcoming')}
              >
                Próximas citas
              </button>
              <button 
                className={`tab ${activeTab === 'previous' ? 'active' : ''}`}
                onClick={() => setActiveTab('previous')}
              >
                Citas anteriores
              </button>
              <button 
                className={`tab ${activeTab === 'history' ? 'active' : ''}`}
                onClick={() => setActiveTab('history')}
              >
                Historial
              </button>
            </div>
            <button className="add-appointment-btn" onClick={handleAddAppointment}>
              Añadir cita
            </button>
          </div>

          <div className="appointments-list">
            {activeTab === 'history' ? (
              <div className="treatments-section">
                <div className="treatments-header">
                  <div className="treatments-icon">
                    <img src="/img/tratments-icon.png" alt="Tratamientos" width="24" height="24" />
                  </div>
                  <h3 className="treatments-title">Tratamientos</h3>
                </div>
                <div className="treatments-list">
                  {client.tratamientos.map(tratamiento => (
                    <div key={tratamiento.id} className="treatment-card">
                      <div className="treatment-content">
                        <div className="treatment-name">{tratamiento.nombre}</div>
                        <div className="treatment-details">{tratamiento.detalles}</div>
                        <div className="treatment-specialist">{tratamiento.especialista}</div>
                        <div className="treatment-date">{tratamiento.fecha}</div>
                      </div>
                      <div className="treatment-status">
                        <div className="status-text">{tratamiento.estado}</div>
                        <div className="status-duration">{tratamiento.duracion}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              (activeTab === 'upcoming' ? client.citasProximasList : client.citasAnterioresList).map(cita => (
                <div key={cita.id} className="appointment-card">
                  <div className="appointment-date">{cita.fecha}</div>
                  <div className="appointment-details">
                    <div className="appointment-type">{cita.tipo}</div>
                    <div className="appointment-specialist">{cita.especialista}</div>
                    <div className="appointment-specialty">{cita.especialidad}</div>
                  </div>
                  <button className="view-notes-btn">Ver notas</button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="page-footer">
          <span>© 2025 Bokifly</span>
        </div>
      </div>

      {/* Modal de Notas */}
      {showNotesModal && (
        <div className="notes-modal-overlay" onClick={handleCloseNotesModal}>
          <div className="notes-modal" onClick={(e) => e.stopPropagation()}>
            <div className="notes-modal-header">
              <div className="notes-modal-title">
                <div className="notes-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10,9 9,9 8,9"/>
                  </svg>
                </div>
                <h2>Notas</h2>
              </div>
              <button className="close-btn" onClick={handleCloseNotesModal}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            
            <div className="notes-modal-content">
              <div className="notes-list-modal">
                {notas.map(nota => (
                  <div key={nota.id} className="note-item-modal">
                    <div className="note-content">
                      <div className="note-date">{nota.fecha}</div>
                      <div className="note-text">{nota.texto}</div>
                    </div>
                    <button className="delete-note-btn" onClick={() => handleDeleteNote(nota.id)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3,6 5,6 21,6"/>
                        <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"/>
                        <line x1="10" y1="11" x2="10" y2="17"/>
                        <line x1="14" y1="11" x2="14" y2="17"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="add-note-form">
                <textarea
                  placeholder="Agregar una nota"
                  value={nuevaNota}
                  onChange={(e) => setNuevaNota(e.target.value)}
                  className="note-textarea"
                />
                <button className="send-note-btn" onClick={handleAddNote}>
                  Enviar nota
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientDetailsPage;
