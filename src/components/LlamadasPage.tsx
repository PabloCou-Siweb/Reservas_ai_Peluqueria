import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import Sidebar from './Sidebar';
import TranscripcionModal from './TranscripcionModal';
import RecordatorioEnviadoModal from './RecordatorioEnviadoModal';
import './LlamadasPage.css';
import './HeaderButtons.css';

const LlamadasPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedCalls, setSelectedCalls] = useState<number[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [showTranscripcionModal, setShowTranscripcionModal] = useState(false);
  const [showRecordatorioEnviadoModal, setShowRecordatorioEnviadoModal] = useState(false);
  const [playingCalls, setPlayingCalls] = useState<Set<number>>(new Set());
  const [audioProgress, setAudioProgress] = useState<{[key: number]: number}>({});
  const intervalRefs = useRef<{[key: number]: NodeJS.Timeout}>({});

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCallSelect = (callId: number) => {
    setSelectedCalls(prev => 
      prev.includes(callId) 
        ? prev.filter(id => id !== callId)
        : [...prev, callId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCalls.length === callsData.length) {
      setSelectedCalls([]);
    } else {
      setSelectedCalls(callsData.map(call => call.id));
    }
  };

  const handleDropdownToggle = (callId: number) => {
    setActiveDropdown(activeDropdown === callId ? null : callId);
  };

  const handleMenuAction = (action: string) => {
    switch (action) {
      case 'transcripcion':
        setShowTranscripcionModal(true);
        break;
      case 'agendar':
        navigateTo('nueva-cita');
        break;
      case 'llamar':
        console.log('Llamar paciente');
        break;
      case 'sms':
        setShowRecordatorioEnviadoModal(true);
        break;
      default:
        break;
    }
    setActiveDropdown(null);
  };

  const handleSettingsClick = () => {
    navigateTo('configuracion');
  };

  const durationToSeconds = (duration: string): number => {
    const parts = duration.split(':');
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
  };

  const secondsToDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAudioPlay = (callId: number, duration: string) => {
    const totalSeconds = durationToSeconds(duration);
    
    if (playingCalls.has(callId)) {
      setPlayingCalls(prev => {
        const newSet = new Set(prev);
        newSet.delete(callId);
        return newSet;
      });
      
      if (intervalRefs.current[callId]) {
        clearInterval(intervalRefs.current[callId]);
        delete intervalRefs.current[callId];
      }
    } else {
      setPlayingCalls(prev => new Set(prev).add(callId));
      
      if (!audioProgress[callId]) {
        setAudioProgress(prev => ({ ...prev, [callId]: 0 }));
      }
      
      intervalRefs.current[callId] = setInterval(() => {
        setAudioProgress(prev => {
          const currentProgress = prev[callId] || 0;
          const newProgress = currentProgress + 0.1; // Incremento de 0.1 segundos
          
          if (newProgress >= totalSeconds) {
            setPlayingCalls(prevPlaying => {
              const newSet = new Set(prevPlaying);
              newSet.delete(callId);
              return newSet;
            });
            
            if (intervalRefs.current[callId]) {
              clearInterval(intervalRefs.current[callId]);
              delete intervalRefs.current[callId];
            }
            
            return { ...prev, [callId]: totalSeconds };
          }
          
          return { ...prev, [callId]: newProgress };
        });
      }, 100);
    }
  };

  useEffect(() => {
    return () => {
      Object.values(intervalRefs.current).forEach(interval => {
        if (interval) clearInterval(interval);
      });
    };
  }, []);

  const callsData = [
    {
      id: 1,
      name: 'Juan Juancinez',
      email: 'juan@email.com',
      phone: '+34 123 456 789',
      reason: 'Uñas',
      date: '07/07/2025',
      time: '09:00 (30 min)',
      duration: '1:23'
    },
    {
      id: 2,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 202 555 0172',
      reason: 'Peluquería',
      date: '13/07/2025',
      time: '09:00 (30 min)',
      duration: '2:15'
    },
    {
      id: 3,
      name: 'Liam Johnson',
      email: 'emily.johnson@hotmail.com',
      phone: '+1 555 123 4567',
      reason: 'Corte y mantenimiento',
      date: '15/08/2025',
      time: '09:00 (30 min)',
      duration: '1:45'
    },
    {
      id: 4,
      name: 'Marta Camiñas',
      email: 'marta@email.com',
      phone: '+34 777 888 999',
      reason: 'Manicura',
      date: '19/08/2025',
      time: '09:00 (30 min)',
      duration: '0:58'
    },
    {
      id: 5,
      name: 'Roberto Espartero',
      email: 'roberto@email.com',
      phone: '+34 333 444 555',
      reason: 'Tratamiento facial',
      date: '25/08/2025',
      time: '09:00 (30 min)',
      duration: '3:22'
    },
    {
      id: 6,
      name: 'Hugo Pérez Gayo',
      email: 'hugo@email.com',
      phone: '+34 666 777 888',
      reason: 'Coloración',
      date: '30/08/2025',
      time: '09:00 (30 min)',
      duration: '2:08'
    },
    {
      id: 7,
      name: 'Pepito Casanova',
      email: 'pepito@email.com',
      phone: '+34 111 222 333',
      reason: 'Uñas',
      date: '02/09/2025',
      time: '09:00 (30 min)',
      duration: '1:15'
    },
    {
      id: 8,
      name: 'Homer Simpson',
      email: 'homer@email.com',
      phone: '+1 555 987 6543',
      reason: 'Peluquería',
      date: '05/09/2025',
      time: '09:00 (30 min)',
      duration: '2:30'
    }
  ];

  return (
    <div className="llamadas-page">
      <Sidebar isOpen={sidebarOpen} onToggle={handleSidebarToggle} />
      
      <div className={`main-content ${!sidebarOpen ? 'sidebar-closed' : ''}`}>
        {/* Header integrado sin bordes */}
        <div className="page-header">
          <h1>Llamadas</h1>
          <div className="header-buttons">
            <button className="notification-btn">
              <img src="/img/notification-icon.png" alt="Notificaciones" width="20" height="20" />
            </button>
            <button className="settings-btn" onClick={handleSettingsClick}>
              <img src="/img/settings-icon.png" alt="Configuración" width="20" height="20" />
            </button>
          </div>
        </div>

        {/* Tabla de llamadas */}
        <div className="table-container">
          <div className="calls-table">
            {/* Header de la tabla */}
            <div className="table-header">
              <div className="col-checkbox">
                <input 
                  type="checkbox" 
                  checked={selectedCalls.length === callsData.length}
                  onChange={handleSelectAll}
                />
              </div>
              <div className="col-name">
                <span>NOMBRE</span>
              </div>
              <div className="col-name-sort">
                <div className="sort-icons">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="18,15 12,9 6,15"/>
                  </svg>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6,9 12,15 18,9"/>
                  </svg>
                </div>
              </div>
              <div className="col-reason">
                <span>MOTIVO</span>
                <div className="sort-icons">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="18,15 12,9 6,15"/>
                  </svg>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6,9 12,15 18,9"/>
                  </svg>
                </div>
              </div>
              <div className="col-date">
                <span>FECHA</span>
              </div>
              <div className="col-time">
                <span>HORA</span>
              </div>
              <div className="col-call">
                <span>LLAMADA</span>
              </div>
            </div>

            {/* Filas de datos */}
            {callsData.map((call) => (
              <div 
                key={call.id} 
                className={`table-row ${selectedCalls.includes(call.id) ? 'selected' : ''}`}
              >
                <div className="col-checkbox">
                  <input 
                    type="checkbox" 
                    checked={selectedCalls.includes(call.id)}
                    onChange={() => handleCallSelect(call.id)}
                  />
                </div>
                <div className="col-name">
                  <div className="client-name">{call.name}</div>
                  <div className="client-email">{call.email}</div>
                  <div className="client-phone">{call.phone}</div>
                </div>
                <div className="col-name-sort">
                  {/* Espacio vacío para alineación */}
                </div>
                <div className="col-reason">
                  <span className="reason-badge">{call.reason}</span>
                </div>
                <div className="col-date">
                  <span>{call.date}</span>
                </div>
                <div className="col-time">
                  <span>{call.time}</span>
                </div>
                <div className="col-call">
                  <div className="call-controls">
                    <div className="audio-player">
                      <button 
                        className="play-btn"
                        onClick={() => handleAudioPlay(call.id, call.duration)}
                      >
                        {playingCalls.has(call.id) ? (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                            <rect x="6" y="4" width="4" height="16"/>
                            <rect x="14" y="4" width="4" height="16"/>
                          </svg>
                        ) : (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="5,3 19,12 5,21"/>
                          </svg>
                        )}
                      </button>
                      <div className="time-display">
                        {secondsToDuration(audioProgress[call.id] || 0)}
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ 
                            width: `${((audioProgress[call.id] || 0) / durationToSeconds(call.duration)) * 100}%` 
                          }}
                        ></div>
                      </div>
                      <div className="time-display">{call.duration}</div>
                      <button className="volume-icon">
                        <img src="/img/volume-icon.png" alt="Volume" width="16" height="16" />
                      </button>
                    </div>
                    <button className="menu-btn" onClick={() => handleDropdownToggle(call.id)}>
                      <img src="/img/3dots-icon.png" alt="Menu" width="16" height="16" />
                    </button>
                  </div>
                  
                  {/* Dropdown Menu */}
                  {activeDropdown === call.id && (
                    <div className="dropdown-menu">
                      <button onClick={() => handleMenuAction('transcripcion')}>
                        <img src="/img/user-icon.png" alt="User" width="16" height="16" />
                        Ver transcripción
                      </button>
                      <button onClick={() => handleMenuAction('agendar')}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                          <line x1="16" y1="2" x2="16" y2="6"/>
                          <line x1="8" y1="2" x2="8" y2="6"/>
                          <line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                        Agendar cita
                      </button>
                      <button onClick={() => handleMenuAction('llamar')}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                        </svg>
                        Llamar paciente
                      </button>
                      <button onClick={() => handleMenuAction('sms')}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        </svg>
                        Enviar SMS
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Paginación */}
        <div className="pagination">
          <button className="page-btn">01</button>
          <button className="page-btn active">02</button>
          <button className="page-btn">03</button>
          <button className="page-btn">...</button>
          <button className="page-btn">04</button>
          <button className="page-btn">05</button>
          <button className="page-btn">06</button>
        </div>
      </div>

      {/* Copyright */}
      <div className="copyright">
        <span>© 2025 Bokifly</span>
      </div>

      {/* Modal de Transcripción */}
      <TranscripcionModal
        isOpen={showTranscripcionModal}
        onClose={() => setShowTranscripcionModal(false)}
        onAccept={() => {
          console.log('Transcripción aceptada');
          setShowTranscripcionModal(false);
        }}
        callData={{
          paciente: 'Elena Ruiz González',
          telefono: '+34 620 25 64',
          especialidad: 'Uñas',
          fecha: '2025/08/09',
          hora: '09:30',
          duracion: '45 minutos',
          motivo: 'Uñas Limado y tratamiento especial'
        }}
        transcription={`[00:00] IA: Buenos días, ha llamado a Peluquería Gabriel. Soy su asistente virtual. ¿En qué puedo ayudarle?

[00:04] Cliente: Hola, quería pedir una cita para hacerme las uñas

[00:07] IA: Claro, ¿podría decirme su nombre, por favor?

[00:10] Cliente: Sí, Ana María López.

[00:13] IA: Gracias, Ana. ¿Es la primera vez que viene a la peluquería o ya es cliente?

[00:17] Cliente: Ya soy cliente.

[00:19] IA: Perfecto. Déjeme comprobar la disponibilidad para uñas. Tenemos huecos con Alba Martínez el martes 20 a las 10:30 o el miércoles 21 a las 12:00. ¿Cuál prefiere?`}
      />

      {/* Modal de Recordatorio Enviado */}
      <RecordatorioEnviadoModal
        isOpen={showRecordatorioEnviadoModal}
        onClose={() => setShowRecordatorioEnviadoModal(false)}
      />
    </div>
  );
};

export default LlamadasPage;
