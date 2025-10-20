import React, { useState } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import Sidebar from './Sidebar';
import './ClientDetailsPage.css';
import './HeaderButtons.css';

const ClientDetailsPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [newNote, setNewNote] = useState('');
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [notes, setNotes] = useState([
    {
      id: 1,
      date: '06/08/2025',
      content: 'Cabello seco y quebradizo, se aconseja tratamiento de hidratación profunda cada mes.',
      appointmentId: null
    },
    {
      id: 2,
      date: '17/06/2025',
      content: 'Prefiere corte recto con puntas desfiladas, no le gustan los cambios muy drásticos',
      appointmentId: null
    },
    {
      id: 3,
      date: '21/05/2025',
      content: 'Cabello seco y quebradizo, se aconseja tratamiento de hidratación profunda cada mes.',
      appointmentId: null
    },
    {
      id: 4,
      date: '02/05/2025',
      content: 'Muy puntual y le gusta que le atiendan rápido; suele venir en la pausa de trabajo.',
      appointmentId: null
    },
    {
      id: 5,
      date: '06/08/2025',
      content: 'Tiene boda en septiembre, reservar paquete de peinado y maquillaje.',
      appointmentId: null
    }
  ]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      console.log('Agregar nota:', newNote);
      setNewNote('');
    }
  };

  const handleEditProfile = () => {
    navigateTo('edit-client');
  };

  const handleViewAllNotes = () => {
    setShowNotesModal(true);
  };

  const handleCloseNotesModal = () => {
    setShowNotesModal(false);
  };

  const handleDeleteNote = (noteId: number) => {
    setNotes(notes.filter(note => note.id !== noteId));
  };

  const handleAddNewNote = () => {
    if (newNote.trim()) {
      const newNoteObj = {
        id: notes.length + 1,
        date: new Date().toLocaleDateString('es-ES'),
        content: newNote.trim(),
        appointmentId: null
      };
      setNotes([newNoteObj, ...notes]);
      setNewNote('');
    }
  };

  // Tabs state for bottom appointments section
  type TabKey = 'proximas' | 'anteriores' | 'historial';
  const [activeTab, setActiveTab] = useState<TabKey>('proximas');

  // Data sources per tab (mocked for frontend template)
  const upcomingAppointments = [
    { id: 1, date: "01 Enero '25", time: '09:00h', type: 'Cita', specialist: 'Juan Luis Guerra', specialty: 'Uñas' },
    { id: 2, date: "03 Enero '25", time: '09:00h', type: 'Mantenimiento', specialist: 'Juan Luis Guerra', specialty: 'Manicura' },
    { id: 3, date: "05 Enero '25", time: '10:30h', type: 'Cita', specialist: 'María García', specialty: 'Peluquería' }
  ];

  const previousAppointments = [
    { id: 4, date: "12 Dic '24", time: '11:00h', type: 'Cita', specialist: 'Ana López', specialty: 'Coloración' },
    { id: 5, date: "20 Nov '24", time: '16:15h', type: 'Revisión', specialist: 'Roberto Leiva', specialty: 'Barbería' }
  ];

  const historyRecords = [
    { id: 6, date: "02 Oct '24", time: '12:00h', type: 'Alta cliente', specialist: '-', specialty: '-' },
    { id: 7, date: "10 Oct '24", time: '09:30h', type: 'Actualización de datos', specialist: '-', specialty: '-' }
  ];

  // Treatments history (third tab design)
  const treatmentsHistory = [
    {
      id: 101,
      title: 'Tinte raíz + mechas balayage',
      meta1: 'Duración: 2h | Productos: Tinte sin amoníaco.',
      meta2: 'Luna Gómez · 06 ene 2025',
      status: 'Activo',
      timeAgo: '3 meses'
    },
    {
      id: 102,
      title: 'Corte de puntas + tratamiento hidratación profunda',
      meta1: 'Cabello muy reseco, se recomienda repetir en 4 semanas.',
      meta2: 'Marcos Palomero · 02 ene 2025',
      status: 'Activo',
      timeAgo: '7 días'
    },
    {
      id: 103,
      title: 'Alisado de keratina',
      meta1: 'Duración: 3h | Duración: 3h.',
      meta2: 'Ana Gómez · 02 ene 2025',
      status: 'Activo',
      timeAgo: '0 meses'
    }
  ];

  const getActiveList = () => {
    if (activeTab === 'anteriores') return previousAppointments;
    if (activeTab === 'historial') return historyRecords;
    return upcomingAppointments;
  };

  return (
    <div className="client-details-page">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

      <div className={`main-content ${!sidebarOpen ? 'sidebar-closed' : ''}`}>
        {/* Header */}
        <header className="page-header">
          <div className="header-left">
            <div className="breadcrumbs">
              <span>Clientes</span>
              <span className="separator">/</span>
              <span>Pablo Simón</span>
            </div>
            <div className="title-row">
              <button className="back-button" onClick={() => navigateTo('clientes')}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
              <h1>Detalles del cliente</h1>
            </div>
          </div>
          <div className="header-right">
            <button className="notification-btn">
              <img src="/img/notification-icon.png" alt="Notificaciones" width="20" height="20" />
            </button>
            <button className="settings-btn" onClick={() => navigateTo('configuracion')}>
              <img src="/img/settings-icon.png" alt="Configuración" width="20" height="20" />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="content-area">
          {/* Cards Grid */}
          <div className="cards-grid">
            {/* Profile Card - Left Side */}
            <div className="profile-card">
              {/* Left Section - Profile Info */}
              <div className="profile-left">
                <div className="profile-image">
                  <img 
                    src="/img/avatars/pablo-simon.jpg" 
                    alt="Pablo Simón López"
                    className="avatar-img"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                      if (nextElement) {
                        nextElement.style.display = 'flex';
                      }
                    }}
                  />
                  <div className="avatar-placeholder" style={{display: 'none'}}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                </div>
                <h2 className="client-name">Pablo Simón López</h2>
                <p className="client-email">pablo.simón@gmail.com</p>
                
                <div className="horizontal-separator"></div>
                
                <div className="stats-row">
                  <div className="stat-item">
                    <span className="stat-number">5</span>
                    <span className="stat-label">Realizadas</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">1</span>
                    <span className="stat-label">Próximas</span>
                  </div>
                </div>
                
                <button className="edit-profile-btn" onClick={handleEditProfile}>
                  <img 
                    src="/img/rounded_pen-icon.png" 
                    alt="Editar" 
                    width="16" 
                    height="16"
                    className="edit-icon"
                  />
                  Editar perfil
                </button>
              </div>

              {/* Vertical Separator */}
              <div className="vertical-separator"></div>

              {/* Right Section - Personal Data */}
              <div className="profile-right">
                <h3 className="data-title">Datos personales</h3>
                <div className="data-grid">
                  <div className="data-row">
                    <span className="data-label">Género:</span>
                    <span className="data-value">Masculino</span>
                  </div>
                  <div className="data-row">
                    <span className="data-label">Teléfono:</span>
                    <span className="data-value">+34 625 58 0 15</span>
                  </div>
                  <div className="data-row">
                    <span className="data-label">Fecha de nacimiento:</span>
                    <span className="data-value">07/10/1999</span>
                  </div>
                  <div className="data-row">
                    <span className="data-label">Ciudad:</span>
                    <span className="data-value">Vigo</span>
                  </div>
                  <div className="data-row">
                    <span className="data-label">Dirección:</span>
                    <span className="data-value">Calle 45 #23-67, Bogotá</span>
                  </div>
                  <div className="data-row">
                    <span className="data-label">Código Postal:</span>
                    <span className="data-value">36475</span>
                  </div>
                  <div className="data-row">
                    <span className="data-label">Fecha de registro:</span>
                    <span className="data-value">15 de diciembre 2023</span>
                  </div>
                  <div className="data-row">
                    <span className="data-label">Estado de membresía:</span>
                    <span className="data-value status-active">
                      <span className="status-dot active"></span>
                      Activo
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes Card - Middle */}
            <div className="notes-card">
              <div className="notes-header">
                <h3>Notas</h3>
                <button className="view-all-btn" onClick={handleViewAllNotes}>Ver todas</button>
              </div>
              
              <div className="notes-content">
                <div className="notes-list">
                  <div className="note-item">
                    <div className="note-left-bar"></div>
                    <div className="note-text-content">
                      <span className="note-text">Este paciente necesita realizarse la cantidad completa de exámenes</span>
                      <span className="note-date">06/08/2025</span>
                    </div>
                  </div>
                  <div className="note-item">
                    <div className="note-left-bar"></div>
                    <div className="note-text-content">
                      <span className="note-text">Excelente funcionamiento estándar que supera las expectativas</span>
                      <span className="note-date">21/06/2025</span>
                    </div>
                  </div>
                  <div className="note-item">
                    <div className="note-left-bar"></div>
                    <div className="note-text-content">
                      <span className="note-text">Reacción alérgica a la penicilina</span>
                      <span className="note-date">14/05/2025</span>
                    </div>
                  </div>
                </div>
                
                <div className="add-note-input">
                  <input
                    type="text"
                    placeholder="Agregar una nota..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                  />
                </div>
                
                <div className="send-note-button">
                  <button onClick={handleAddNote}>Enviar nota</button>
                </div>
              </div>
            </div>

            {/* Documents Card - Right */}
            <div className="documents-card">
              <div className="card-header">
                <h3>Documentos</h3>
                <button className="add-file-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  Añadir archivo
                </button>
              </div>
              
              <div className="documents-list">
            <div className="document-item">
              <div className="file-icon">
                <img src="/img/file-icon.png" alt="File icon" width="20" height="20" />
              </div>
              <div className="file-info">
                <span className="file-name">Fotografías peinado boda.pdf</span>
                <span className="file-size">45 kb</span>
              </div>
            </div>
                <div className="document-item">
                  <div className="file-icon">
                    <img src="/img/file-icon.png" alt="File icon" width="20" height="20" />
                  </div>
                  <div className="file-info">
                    <span className="file-name">Esquema de coloración.pdf</span>
                    <span className="file-size">30 kb</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Appointments Section - Recreado según plantilla */}
          <div className="appointments-section">
            <div className="appointments-header">
              <div className="tabs-container">
                <div className="tabs">
                  <button 
                    className={`tab ${activeTab === 'proximas' ? 'active' : ''}`}
                    onClick={() => setActiveTab('proximas')}
                  >
                    Próximas citas
                  </button>
                  <button 
                    className={`tab ${activeTab === 'anteriores' ? 'active' : ''}`}
                    onClick={() => setActiveTab('anteriores')}
                  >
                    Citas anteriores
                  </button>
                  <button 
                    className={`tab ${activeTab === 'historial' ? 'active' : ''}`}
                    onClick={() => setActiveTab('historial')}
                  >
                    Historial
                  </button>
                </div>
              </div>
            </div>
            
            <div className="appointments-container">
              <div className="timeline">
                <div className="timeline-line"></div>
                <div className="timeline-dot"></div>
                <div className="timeline-dot"></div>
                <div className="timeline-dot"></div>
              </div>

              {activeTab !== 'historial' && (
                <div className="appointments-list">
                  {getActiveList().map((item) => (
                    <div key={item.id} className="appointment-card">
                      <div className="appointment-date-time">
                        <span className="appointment-date">{item.date}</span>
                        <span className="appointment-time">{item.time}</span>
                      </div>
                      <div className="appointment-type">{item.type}</div>
                      <div className="appointment-specialist">{item.specialist}</div>
                      <div className="appointment-specialty">{item.specialty}</div>
                      <button className="view-notes-btn" onClick={handleViewAllNotes}>Ver notas</button>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'historial' && (
                <div className="history-section">
                  <div className="history-header">
                    <div className="history-icon">
                      <img 
                        src="/img/@tratments-icon.png" 
                        alt="Tratamientos" width="16" height="16"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).onerror = null; (e.currentTarget as HTMLImageElement).src = '/img/tratments-icon.png'; }}
                      />
                    </div>
                    <span className="history-title">Tratamientos</span>
                  </div>
                  <div className="history-list">
                    {treatmentsHistory.map((row) => (
                      <div key={row.id} className="history-item">
                        <div className="history-item-main">
                          <div className="history-item-title">{row.title}</div>
                          <div className="history-item-meta">{row.meta1}</div>
                          <div className="history-item-meta secondary">{row.meta2}</div>
                        </div>
                        <div className="history-item-right">
                          <span className="history-status active">{row.status}</span>
                          <span className="history-time">{row.timeAgo}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Notes Modal */}
      {showNotesModal && (
        <div className="notes-modal-overlay" onClick={handleCloseNotesModal}>
          <div className="notes-modal" onClick={(e) => e.stopPropagation()}>
            {/* Header - Orange background, integrated with modal */}
            <div className="notes-modal-header">
              <div className="notes-modal-icon">
                <img 
                  src="/img/notes-icon.png" 
                  alt="Notas" 
                  width="20" 
                  height="20" 
                  onError={(e) => { (e.currentTarget as HTMLImageElement).onerror = null; (e.currentTarget as HTMLImageElement).src = '/img/note-icon.png'; }}
                />
              </div>
              <h3 className="notes-modal-title">Notas</h3>
              <button className="notes-modal-close" onClick={handleCloseNotesModal}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Content - White background */}
            <div className="notes-modal-content">
              {/* Notes List */}
              <div className="notes-modal-list">
                {notes.map((note) => (
                  <div key={note.id} className="notes-modal-item">
                    <div className="notes-modal-item-content">
                      <div className="notes-modal-date">{note.date}</div>
                      <div className="notes-modal-text">{note.content}</div>
                    </div>
                    <button 
                      className="notes-modal-delete" 
                      onClick={() => handleDeleteNote(note.id)}
                    >
                      <img src="/img/trash-icon.png" alt="Eliminar" width="16" height="16" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Note Section */}
              <div className="notes-modal-add">
                <textarea
                  className="notes-modal-textarea"
                  placeholder="Agregar una nota..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                />
                <button className="notes-modal-send-btn" onClick={handleAddNewNote}>
                  Enviar nota
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Copyright */}
      <div className="copyright">© 2025 Bokifly</div>
    </div>
  );
};

export default ClientDetailsPage;