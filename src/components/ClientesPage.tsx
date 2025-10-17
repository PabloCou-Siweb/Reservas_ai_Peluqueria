import React, { useState } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import Sidebar from './Sidebar';
import AgendarCitaModal from './AgendarCitaModal';
import RecordatorioEnviadoModal from './RecordatorioEnviadoModal';
import './ClientesPage.css';
import './HeaderButtons.css';

interface Cliente {
  id: number;
  nombre: string;
  idCliente: string;
  fechaNacimiento: string;
  telefono: string;
  email: string;
  proximaCita: {
    fecha: string;
    hora: string;
    servicio: string;
    especialista: string;
  } | null;
  estado: string;
  estadoColor: string;
}

const ClientesPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClients, setSelectedClients] = useState<number[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [isAgendarCitaOpen, setIsAgendarCitaOpen] = useState(false);
  const [selectedClientForCita, setSelectedClientForCita] = useState<Cliente | null>(null);
  const [isRecordatorioEnviadoOpen, setIsRecordatorioEnviadoOpen] = useState(false);

  const [clientes] = useState<Cliente[]>([
    {
      id: 1,
      nombre: "Pablo Simón López",
      idCliente: "555-4567",
      fechaNacimiento: "07/10/1999",
      telefono: "+34 654 25 20 45",
      email: "pablosimon_lopez@gmail.com",
      proximaCita: {
        fecha: "15/08/2025",
        hora: "09:00",
        servicio: "Uñas",
        especialista: "Silvia Pancho"
      },
      estado: "Confirmada",
      estadoColor: "#F2C288"
    },
    {
      id: 2,
      nombre: "Javi Correa Gómez",
      idCliente: "555-4568",
      fechaNacimiento: "12/03/1985",
      telefono: "+34 612 34 56 78",
      email: "javicorrea@gmail.com",
      proximaCita: {
        fecha: "16/08/2025",
        hora: "10:30",
        servicio: "Corte",
        especialista: "María García"
      },
      estado: "Pendiente",
      estadoColor: "#8C623E"
    },
    {
      id: 3,
      nombre: "Lisa Simpson Bastos",
      idCliente: "555-4569",
      fechaNacimiento: "25/07/1992",
      telefono: "+34 678 90 12 34",
      email: "lisa.simpson@gmail.com",
      proximaCita: {
        fecha: "18/08/2025",
        hora: "14:00",
        servicio: "Tinte",
        especialista: "Ana López"
      },
      estado: "Confirmada",
      estadoColor: "#F2C288"
    },
    {
      id: 4,
      nombre: "Carlos Ruiz Martín",
      idCliente: "555-4570",
      fechaNacimiento: "03/11/1988",
      telefono: "+34 655 44 33 22",
      email: "carlos.ruiz@hotmail.com",
      proximaCita: null,
      estado: "Sin cita",
      estadoColor: "#9CA3AF"
    },
    {
      id: 5,
      nombre: "María González Pérez",
      idCliente: "555-4571",
      fechaNacimiento: "18/05/1995",
      telefono: "+34 644 77 88 99",
      email: "maria.gonzalez@gmail.com",
      proximaCita: {
        fecha: "20/08/2025",
        hora: "11:00",
        servicio: "Manicura",
        especialista: "Silvia Pancho"
      },
      estado: "Cancelada",
      estadoColor: "#EF4444"
    },
    {
      id: 6,
      nombre: "Manuel Pérez Rodríguez",
      idCliente: "555-4572",
      fechaNacimiento: "14/01/1983",
      telefono: "+34 610 12 34 56",
      email: "manuel.perez@yahoo.com",
      proximaCita: {
        fecha: "22/08/2025",
        hora: "15:45",
        servicio: "Barbería",
        especialista: "Enrique Torres"
      },
      estado: "Pendiente",
      estadoColor: "#8C623E"
    },
    {
      id: 7,
      nombre: "Pepito Jiménez Sancho",
      idCliente: "555-4573",
      fechaNacimiento: "15/08/2002",
      telefono: "+34 615 67 89 01",
      email: "pepito.jimenez@gmail.com",
      proximaCita: null,
      estado: "Sin cita",
      estadoColor: "#9CA3AF"
    },
  ]);

  const filteredClientes = clientes.filter(cliente =>
    cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.idCliente.includes(searchTerm) ||
    cliente.email.toLowerCase().includes(searchTerm) ||
    cliente.telefono.includes(searchTerm)
  );

  const handleSelectClient = (clientId: number) => {
    setSelectedClients(prev =>
      prev.includes(clientId)
        ? prev.filter(id => id !== clientId)
        : [...prev, clientId]
    );
  };

  const handleSelectAll = () => {
    if (selectedClients.length === filteredClientes.length) {
      setSelectedClients([]);
    } else {
      setSelectedClients(filteredClientes.map(cliente => cliente.id));
    }
  };

  const openScheduleModal = (cliente: Cliente, source: string = '') => {
    // Abrir modal de agendar cita
    console.log(`Abriendo modal de agendar cita para ${cliente.nombre}${source ? ` desde ${source}` : ''}`);
    setSelectedClientForCita(cliente);
    setIsAgendarCitaOpen(true);
  };

  const handleScheduleClient = (cliente: Cliente) => {
    openScheduleModal(cliente, 'tabla');
  };

  const handleCloseAgendarCita = () => {
    setIsAgendarCitaOpen(false);
    setSelectedClientForCita(null);
  };

  const handleConfirmAgendarCita = (data: any) => {
    console.log('Cita agendada:', data);
    setIsAgendarCitaOpen(false);
    setSelectedClientForCita(null);
  };

  const handleCloseRecordatorioEnviado = () => {
    setIsRecordatorioEnviadoOpen(false);
  };

  const handleMenuAction = (action: string, cliente: Cliente) => {
    setActiveDropdown(null);
    
    switch (action) {
      case 'ver-ficha':
        navigateTo('client-details');
        break;
      case 'agendar-cita':
        openScheduleModal(cliente, 'menú');
        break;
      case 'llamar':
        const phoneNumber = cliente.telefono.replace(/[^\d+]/g, '');
        if (phoneNumber) {
          window.location.href = `tel:${phoneNumber}`;
        }
        break;
      case 'enviar-recordatorio':
        setIsRecordatorioEnviadoOpen(true);
        break;
    }
  };

  const toggleDropdown = (clientId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setActiveDropdown(activeDropdown === clientId ? null : clientId);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="clientes-page">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

      {/* Main Content */}
      <div className={`main-content ${!sidebarOpen ? 'sidebar-closed' : ''}`}>
        <div className="content-area">
          {/* Header */}
          <div className="page-header">
            <h1 className="page-title">Clientes</h1>
            <div className="header-icons">
              <button className="notification-btn">
                <img src="/img/notification-icon.png" alt="Notificaciones" width="20" height="20" />
              </button>
              <button className="settings-btn" onClick={() => navigateTo('configuracion')}>
                <img src="/img/settings-icon.png" alt="Configuración" width="20" height="20" />
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="controls-section">
            <button 
              className="add-btn"
              onClick={() => navigateTo('add-client')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Añadir cliente
            </button>
            
            <div className="search-box">
              <input
                type="text"
                className="search-field"
                placeholder="Buscar paciente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
            </div>
          </div>

          {/* Table */}
          <div className="data-table">
            <div className="table-head">
              <div className="head-cell checkbox-col">
                <input
                  type="checkbox"
                  className="master-checkbox"
                  checked={selectedClients.length === filteredClientes.length && filteredClientes.length > 0}
                  onChange={handleSelectAll}
                />
              </div>
              <div className="head-cell name-col">
                <span>CLIENTE</span>
                <div className="sort-icons">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="18,15 12,9 6,15"/>
                  </svg>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6,9 12,15 18,9"/>
                  </svg>
                </div>
              </div>
              <div className="head-cell">FECHA NAC.</div>
              <div className="head-cell">TELÉFONO</div>
              <div className="head-cell">EMAIL</div>
              <div className="head-cell">PRÓXIMA CITA</div>
              <div className="head-cell">ESTADO</div>
              <div className="head-cell actions-col"></div>
            </div>

            <div className="table-body">
              {filteredClientes.map((cliente) => (
                <div 
                  key={cliente.id} 
                  className={`data-row ${selectedClients.includes(cliente.id) ? 'row-selected' : ''}`}
                >
                  <div className="data-cell checkbox-col">
                    <input
                      type="checkbox"
                      className="row-checkbox"
                      checked={selectedClients.includes(cliente.id)}
                      onChange={() => handleSelectClient(cliente.id)}
                    />
                  </div>
                  
                  <div className="data-cell name-col">
                    <div className="client-name">{cliente.nombre}</div>
                    <div className="client-code">{cliente.idCliente}</div>
                  </div>
                  
                  <div className="data-cell birth-col">{cliente.fechaNacimiento}</div>
                  
                  <div className="data-cell phone-col">{cliente.telefono}</div>
                  
                  <div className="data-cell email-col">{cliente.email}</div>
                  
                  <div className="data-cell appointment-col">
                    {cliente.proximaCita ? (
                      <>
                        <div className="appointment-time">
                          {cliente.proximaCita.fecha} - {cliente.proximaCita.hora}
                        </div>
                        <div className="appointment-details">
                          {cliente.proximaCita.servicio} ({cliente.proximaCita.especialista})
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="no-appointment">Sin cita programada</div>
                        <button 
                          className="book-btn"
                          onClick={() => handleScheduleClient(cliente)}
                        >
                          + Agendar
                        </button>
                      </>
                    )}
                  </div>
                  
                  <div className="data-cell status-col">
                    <span className={`status-text ${cliente.estado.toLowerCase().replace(' ', '-')}`}>
                      <div className="status-indicator" style={{ backgroundColor: cliente.estadoColor }}></div>
                      {cliente.estado}
                    </span>
                  </div>
                  
                  <div className="data-cell actions-col">
                    <button 
                      className="menu-trigger"
                      onClick={(e) => toggleDropdown(cliente.id, e)}
                    >
                      <img 
                        src="/img/3dots-icon.png" 
                        alt="Menú de acciones" 
                        width="16" 
                        height="16"
                      />
                    </button>
                    
                    {activeDropdown === cliente.id && (
                      <div className="action-menu">
                        <div className="menu-header">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                            <circle cx="12" cy="7" r="4"/>
                          </svg>
                          <span>{cliente.nombre.split(' ').slice(0, 2).join(' ')}</span>
                        </div>
                        <button 
                          className="menu-item"
                          onClick={() => handleMenuAction('ver-ficha', cliente)}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                            <circle cx="12" cy="12" r="3"/>
                          </svg>
                          Ver ficha completa
                        </button>
                        <button 
                          className="menu-item"
                          onClick={() => handleMenuAction('agendar-cita', cliente)}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                            <line x1="16" y1="2" x2="16" y2="6"/>
                            <line x1="8" y1="2" x2="8" y2="6"/>
                            <line x1="3" y1="10" x2="21" y2="10"/>
                          </svg>
                          Agendar cita
                        </button>
                        <button 
                          className="menu-item"
                          onClick={() => handleMenuAction('llamar', cliente)}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                          </svg>
                          Llamar paciente
                        </button>
                        <button 
                          className="menu-item"
                          onClick={() => handleMenuAction('enviar-recordatorio', cliente)}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                          </svg>
                          Enviar recordatorio
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="pagination-controls">
            <button className="page-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15,18 9,12 15,6"/>
              </svg>
            </button>
            
            <button className="page-btn active">01</button>
            <button className="page-btn">02</button>
            <button className="page-btn">03</button>
            <span className="page-separator">...</span>
            <button className="page-btn">04</button>
            <button className="page-btn">05</button>
            <button className="page-btn">06</button>
            
            <button className="page-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9,18 15,12 9,6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Agendar Cita */}
      <AgendarCitaModal
        isOpen={isAgendarCitaOpen}
        onClose={handleCloseAgendarCita}
        onConfirm={handleConfirmAgendarCita}
        selectedClient={selectedClientForCita}
      />

      {/* Modal de Recordatorio Enviado */}
      <RecordatorioEnviadoModal
        isOpen={isRecordatorioEnviadoOpen}
        onClose={handleCloseRecordatorioEnviado}
      />
    </div>
  );
};

export default ClientesPage;
