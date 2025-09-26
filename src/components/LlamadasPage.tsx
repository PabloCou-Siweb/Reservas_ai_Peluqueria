import React, { useState } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import Sidebar from './Sidebar';
import AgendarCitaModal from './AgendarCitaModal';
import RecordatorioEnviadoModal from './RecordatorioEnviadoModal';
import TranscripcionModal from './TranscripcionModal';
import './LlamadasPage.css';

const LlamadasPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Datos de llamadas (simulados)
  const llamadas = [
    {
      id: 1,
      nombre: 'Juan Juancinez',
      email: 'emily.johnson@hotmail.com',
      telefono: '+1 202 555 0172',
      motivo: 'Uñas',
      fecha: '07/07/2025',
      hora: '09:00 (30 min)',
      duracion: '1:23',
      audioUrl: '/audio/llamada1.mp3'
    },
    {
      id: 2,
      nombre: 'María García',
      email: 'maria.garcia@gmail.com',
      telefono: '+34 612 345 678',
      motivo: 'Peluquería',
      fecha: '13/07/2025',
      hora: '14:30 (45 min)',
      duracion: '2:15',
      audioUrl: '/audio/llamada2.mp3'
    },
    {
      id: 3,
      nombre: 'Carlos López',
      email: 'carlos.lopez@yahoo.com',
      telefono: '+34 678 901 234',
      motivo: 'Corte y mantenimiento',
      fecha: '15/08/2025',
      hora: '11:15 (30 min)',
      duracion: '0:45',
      audioUrl: '/audio/llamada3.mp3'
    },
    {
      id: 4,
      nombre: 'Ana Martínez',
      email: 'ana.martinez@outlook.com',
      telefono: '+34 655 123 456',
      motivo: 'Manicura',
      fecha: '20/08/2025',
      hora: '16:00 (60 min)',
      duracion: '3:22',
      audioUrl: '/audio/llamada4.mp3'
    },
    {
      id: 5,
      nombre: 'Pedro Sánchez',
      email: 'pedro.sanchez@gmail.com',
      telefono: '+34 611 987 654',
      motivo: 'Tratamiento facial',
      fecha: '25/08/2025',
      hora: '10:30 (90 min)',
      duracion: '1:58',
      audioUrl: '/audio/llamada5.mp3'
    },
    {
      id: 6,
      nombre: 'Laura Ruiz',
      email: 'laura.ruiz@hotmail.com',
      telefono: '+34 644 555 777',
      motivo: 'Coloración',
      fecha: '30/08/2025',
      hora: '15:45 (120 min)',
      duracion: '4:12',
      audioUrl: '/audio/llamada6.mp3'
    }
  ];

  const [selectedCalls, setSelectedCalls] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(2);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [showAgendarCitaModal, setShowAgendarCitaModal] = useState(false);
  const [showRecordatorioModal, setShowRecordatorioModal] = useState(false);
  const [showTranscripcionModal, setShowTranscripcionModal] = useState(false);

  const handleSelectCall = (callId: number) => {
    setSelectedCalls(prev => 
      prev.includes(callId) 
        ? prev.filter(id => id !== callId)
        : [...prev, callId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCalls.length === llamadas.length) {
      setSelectedCalls([]);
    } else {
      setSelectedCalls(llamadas.map(call => call.id));
    }
  };

  const toggleDropdown = (callId: number) => {
    setActiveDropdown(activeDropdown === callId ? null : callId);
  };

  const handleMenuAction = (action: string, callId: number) => {
    const call = llamadas.find(c => c.id === callId);
    setActiveDropdown(null);
    
    switch (action) {
      case 'agendar':
        setShowAgendarCitaModal(true);
        break;
      case 'sms':
        setShowRecordatorioModal(true);
        break;
      case 'transcripcion':
        setShowTranscripcionModal(true);
        break;
      case 'llamar':
        // Aquí se implementaría la funcionalidad de llamada
        window.open(`tel:${call?.telefono}`);
        break;
    }
  };

  return (
    <div className="llamadas-page">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      <div className="main-content">
        {/* Header */}
        <div className="page-header">
          <div className="header-left">
            <h1>Llamadas</h1>
          </div>
          <div className="header-actions">
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

        {/* Tabla de Llamadas */}
        <div className="calls-container">
          <div className="calls-table">
            {/* Encabezados */}
            <div className="table-header">
              <div className="header-checkbox">
                <input 
                  type="checkbox" 
                  checked={selectedCalls.length === llamadas.length}
                  onChange={handleSelectAll}
                />
              </div>
              <div className="header-name">
                <span>Nombre</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 9l4-4 4 4"/>
                  <path d="M8 15l4 4 4-4"/>
                </svg>
              </div>
              <div className="header-reason">
                <span>Motivo</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 9l4-4 4 4"/>
                  <path d="M8 15l4 4 4-4"/>
                </svg>
              </div>
              <div className="header-date">
                <span>Fecha</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 9l4-4 4 4"/>
                  <path d="M8 15l4 4 4-4"/>
                </svg>
              </div>
              <div className="header-time">Hora</div>
              <div className="header-call">Llamada</div>
              <div className="header-actions"></div>
            </div>

            {/* Filas de datos */}
            {llamadas.map((llamada) => (
              <div key={llamada.id} className={`table-row ${selectedCalls.includes(llamada.id) ? 'selected' : ''}`}>
                <div className="row-checkbox">
                  <input 
                    type="checkbox" 
                    checked={selectedCalls.includes(llamada.id)}
                    onChange={() => handleSelectCall(llamada.id)}
                  />
                </div>
                <div className="row-name">
                  <div className="client-info">
                    <div className="client-name">{llamada.nombre}</div>
                    <div className="client-email">{llamada.email}</div>
                    <div className="client-phone">{llamada.telefono}</div>
                  </div>
                </div>
                <div className="row-reason">
                  <span className="reason-badge">{llamada.motivo}</span>
                </div>
                <div className="row-date">{llamada.fecha}</div>
                <div className="row-time">{llamada.hora}</div>
                <div className="row-call">
                  <div className="audio-player">
                    <button className="play-btn">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5,3 19,12 5,21"/>
                      </svg>
                    </button>
                    <div className="progress-bar">
                      <div className="progress-fill"></div>
                    </div>
                    <span className="time-display">0:00 / {llamada.duracion}</span>
                    <button className="volume-btn">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                      </svg>
                    </button>
                    <button className="menu-btn">
                      <img src="/img/3dots-icon.png" alt="Menu" width="16" height="16" />
                    </button>
                  </div>
                </div>
                <div className="row-actions">
                  <button 
                    className="action-btn"
                    onClick={() => toggleDropdown(llamada.id)}
                  >
                    <img src="/img/3dots-icon.png" alt="Actions" width="16" height="16" />
                  </button>
                  
                  {/* Dropdown Menu */}
                  {activeDropdown === llamada.id && (
                    <div className="dropdown-menu">
                      <div className="dropdown-header">
                        <div className="client-info-dropdown">
                          <div className="client-icon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                              <circle cx="12" cy="7" r="4"/>
                            </svg>
                          </div>
                          <span className="client-name-dropdown">{llamada.nombre}</span>
                        </div>
                      </div>
                      <div className="dropdown-item" onClick={() => handleMenuAction('transcripcion', llamada.id)}>
                        <div className="dropdown-icon">
                          <img src="/img/pen-icon.png" alt="Pen" width="16" height="16" />
                        </div>
                        <span>Ver transcripción</span>
                      </div>
                      <div className="dropdown-item" onClick={() => handleMenuAction('agendar', llamada.id)}>
                        <div className="dropdown-icon">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                            <line x1="16" y1="2" x2="16" y2="6"/>
                            <line x1="8" y1="2" x2="8" y2="6"/>
                            <line x1="3" y1="10" x2="21" y2="10"/>
                          </svg>
                        </div>
                        <span>Agendar cita</span>
                      </div>
                      <div className="dropdown-item" onClick={() => handleMenuAction('llamar', llamada.id)}>
                        <div className="dropdown-icon">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                          </svg>
                        </div>
                        <span>Llamar paciente</span>
                      </div>
                      <div className="dropdown-item" onClick={() => handleMenuAction('sms', llamada.id)}>
                        <div className="dropdown-icon">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                          </svg>
                        </div>
                        <span>Enviar SMS</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Paginación */}
          <div className="pagination">
            <button className="page-btn">01</button>
            <button className="page-btn active">02</button>
            <button className="page-btn">03</button>
            <span className="page-dots">...</span>
            <button className="page-btn">04</button>
            <button className="page-btn">05</button>
            <button className="page-btn">06</button>
          </div>
        </div>
      </div>

      {/* Modal de Agendar Cita */}
      {showAgendarCitaModal && (
        <AgendarCitaModal 
          isOpen={showAgendarCitaModal}
          onClose={() => setShowAgendarCitaModal(false)}
          onConfirm={(data) => {
            console.log('Cita agendada:', data);
            setShowAgendarCitaModal(false);
          }}
        />
      )}

      {/* Modal de Recordatorio Enviado */}
      <RecordatorioEnviadoModal
        isOpen={showRecordatorioModal}
        onClose={() => setShowRecordatorioModal(false)}
      />

      {/* Modal de Transcripción */}
      <TranscripcionModal
        isOpen={showTranscripcionModal}
        onClose={() => setShowTranscripcionModal(false)}
        onAccept={() => {
          console.log('Transcripción aceptada');
          setShowTranscripcionModal(false);
        }}
      />
    </div>
  );
};

export default LlamadasPage;
