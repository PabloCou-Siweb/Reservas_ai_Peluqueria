import React, { useState, useEffect } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import Sidebar from './Sidebar';
import AgendarCitaModal from './AgendarCitaModal';
import './ClientesPage.css';

const ClientesPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClients, setSelectedClients] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isReservarCitaOpen, setIsReservarCitaOpen] = useState(false);
  const [selectedClientForCita, setSelectedClientForCita] = useState<any>(null);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  // Datos de ejemplo de clientes
  const clientes = [
    {
      id: 1,
      nombre: 'Pablo Simón López',
      idCliente: '555-4567',
      fechaNacimiento: '07/10/1999',
      telefono: '+34 654 25 20 45',
      email: 'pablosimon_lopez@gmail.com',
      proximaCita: {
        fecha: '15/08/2025 - 09:00',
        servicio: 'Uñas (Silvia Pancho)'
      },
      estado: 'Confirmada',
      estadoColor: 'green'
    },
    {
      id: 2,
      nombre: 'Javi Correa Gómez',
      idCliente: '555-4568',
      fechaNacimiento: '15/03/1985',
      telefono: '+34 612 34 56 78',
      email: 'javi.correa@email.com',
      proximaCita: {
        fecha: 'Sin cita programada',
        servicio: '+ Agendar'
      },
      estado: 'Sin cita',
      estadoColor: 'gray'
    },
    {
      id: 3,
      nombre: 'Lisa Simpson Bastos',
      idCliente: '555-4569',
      fechaNacimiento: '12/08/1992',
      telefono: '+34 678 90 12 34',
      email: 'lisa.simpson@email.com',
      proximaCita: {
        fecha: 'Sin cita programada',
        servicio: '+ Agendar'
      },
      estado: 'Cancelada',
      estadoColor: 'gray'
    },
    {
      id: 4,
      nombre: 'Manuel Pérez Rodríguez',
      idCliente: '555-4570',
      fechaNacimiento: '03/12/1988',
      telefono: '+34 611 22 33 44',
      email: 'manuel.perez@email.com',
      proximaCita: {
        fecha: '20/08/2025 - 14:30',
        servicio: 'Corte (Carlos Ruiz)'
      },
      estado: 'Pendiente',
      estadoColor: 'brown'
    },
    {
      id: 5,
      nombre: 'Ricardo Pérez González',
      idCliente: '555-4571',
      fechaNacimiento: '25/06/1975',
      telefono: '+34 655 44 33 22',
      email: 'ricardo.perez@email.com',
      proximaCita: {
        fecha: 'Sin cita programada',
        servicio: '+ Agendar'
      },
      estado: 'Cancelada',
      estadoColor: 'gray'
    },
    {
      id: 6,
      nombre: 'Homer Simpson Bastos',
      idCliente: '555-4572',
      fechaNacimiento: '10/05/1960',
      telefono: '+34 666 77 88 99',
      email: 'homer.simpson@email.com',
      proximaCita: {
        fecha: 'Sin cita programada',
        servicio: '+ Agendar'
      },
      estado: 'Cancelada',
      estadoColor: 'gray'
    },
    {
      id: 7,
      nombre: 'Pepito Jiménez Sancho',
      idCliente: '555-4573',
      fechaNacimiento: '18/09/1995',
      telefono: '+34 677 88 99 00',
      email: 'pepito.jimenez@email.com',
      proximaCita: {
        fecha: 'Sin cita programada',
        servicio: '+ Agendar'
      },
      estado: 'Sin cita',
      estadoColor: 'gray'
    },
    {
      id: 8,
      nombre: 'Pedro Sánchez Peregil',
      idCliente: '555-4574',
      fechaNacimiento: '22/11/1982',
      telefono: '+34 688 99 00 11',
      email: 'pedro.sanchez@email.com',
      proximaCita: {
        fecha: 'Sin cita programada',
        servicio: '+ Agendar'
      },
      estado: 'Sin cita',
      estadoColor: 'gray'
    },
    {
      id: 9,
      nombre: 'Mariano Rajoy López',
      idCliente: '555-4575',
      fechaNacimiento: '14/04/1970',
      telefono: '+34 699 00 11 22',
      email: 'mariano.rajoy@email.com',
      proximaCita: {
        fecha: 'Sin cita programada',
        servicio: '+ Agendar'
      },
      estado: 'Sin cita',
      estadoColor: 'gray'
    },
    {
      id: 10,
      nombre: 'Pablo Picasso López',
      idCliente: '555-4576',
      fechaNacimiento: '25/10/1881',
      telefono: '+34 600 11 22 33',
      email: 'pablo.picasso@email.com',
      proximaCita: {
        fecha: '25/08/2025 - 10:00',
        servicio: 'Barba (Ana García)'
      },
      estado: 'Confirmada',
      estadoColor: 'green'
    }
  ];

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedClients(filteredClientes.map(cliente => cliente.id));
    } else {
      setSelectedClients([]);
    }
  };

  const handleSelectClient = (clientId: number, checked: boolean) => {
    if (checked) {
      setSelectedClients([...selectedClients, clientId]);
    } else {
      setSelectedClients(selectedClients.filter(id => id !== clientId));
    }
  };

  const toggleDropdown = (clientId: number) => {
    setActiveDropdown(activeDropdown === clientId ? null : clientId);
  };

  const handleMenuAction = (action: string, clientId: number) => {
    console.log(`Acción: ${action} para cliente ${clientId}`);
    setActiveDropdown(null);
    
    const cliente = clientes.find(c => c.id === clientId);
    
    switch (action) {
      case 'Ver ficha completa':
        navigateTo('client-details');
        break;
      case 'Agendar cita':
        if (cliente) {
          setSelectedClientForCita(cliente);
          setIsReservarCitaOpen(true);
        }
        break;
      case 'Llamar paciente':
        if (cliente) {
          const phoneNumber = cliente.telefono.replace(/\s/g, '');
          window.open(`tel:${phoneNumber}`, '_self');
        }
        break;
      case 'Enviar recordatorio':
        if (cliente) {
          const message = `Hola ${cliente.nombre}, te recordamos que tienes una cita programada. ¡Esperamos verte pronto!`;
          const whatsappUrl = `https://wa.me/${cliente.telefono.replace(/[^\d]/g, '')}?text=${encodeURIComponent(message)}`;
          window.open(whatsappUrl, '_blank');
        }
        break;
      default:
        break;
    }
  };

  const handleAgendarCita = (cliente: any) => {
    setSelectedClientForCita(cliente);
    setIsReservarCitaOpen(true);
  };

  const handleCloseReservarCita = () => {
    setIsReservarCitaOpen(false);
    setSelectedClientForCita(null);
  };

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown !== null) {
        setActiveDropdown(null);
      }
    };

    if (activeDropdown !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  const filteredClientes = clientes.filter(cliente => 
    cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.telefono.includes(searchTerm)
  );

  return (
    <div className="clientes-layout">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className={`main-content ${!sidebarOpen ? 'sidebar-closed' : ''}`}>
        {/* Header */}
        <div className="page-header">
          <div className="header-left">
            <h1 className="page-title">Clientes</h1>
          </div>
          <div className="header-right">
            <div className="search-container">
              <input
                type="text"
                placeholder="Buscar paciente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <img src="/img/search-icon.png" alt="Buscar" className="search-icon" />
            </div>
            <div className="notification-icon">
              <img src="/img/notification-icon.png" alt="Notificaciones" />
              <div className="notification-dot"></div>
            </div>
            <div className="settings-icon" onClick={() => navigateTo('configuracion')}>
              <img src="/img/settings-icon.png" alt="Configuración" />
            </div>
            <button 
              className="test-button"
              onClick={() => navigateTo('client-details')}
            >
              Test Detalles Cliente
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="table-container">
          <table className="clients-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectedClients.length === filteredClientes.length && filteredClientes.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="header-checkbox"
                  />
                </th>
                <th className="sortable">
                  Cliente
                </th>
                <th>Fecha de nacimiento</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th>Próxima cita</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredClientes.map(cliente => (
                <tr 
                  key={cliente.id} 
                  className={selectedClients.includes(cliente.id) ? 'selected' : ''}
                >
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedClients.includes(cliente.id)}
                      onChange={(e) => handleSelectClient(cliente.id, e.target.checked)}
                      className="row-checkbox"
                    />
                  </td>
                  <td>
                    <div className="cliente-info">
                      <div className="cliente-name">{cliente.nombre}</div>
                      <div className="cliente-id">{cliente.idCliente}</div>
                    </div>
                  </td>
                  <td>{cliente.fechaNacimiento}</td>
                  <td>{cliente.telefono}</td>
                  <td>{cliente.email}</td>
                  <td>
                    <div className="proxima-cita">
                      <div className="cita-fecha">{cliente.proximaCita.fecha}</div>
                      <div className="cita-servicio">
                        {cliente.proximaCita.servicio === '+ Agendar' ? (
                          <button 
                            className="agendar-btn"
                            onClick={() => handleAgendarCita(cliente)}
                          >
                            + Agendar
                          </button>
                        ) : (
                          cliente.proximaCita.servicio
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="estado-container">
                      <div className={`estado-dot ${cliente.estadoColor}`}></div>
                      <span className="estado-text">{cliente.estado}</span>
                    </div>
                  </td>
                  <td>
                    <div className="actions-container">
                      <button className="actions-btn" onClick={() => toggleDropdown(cliente.id)}>
                        <img src="/img/3dots-icon.png" alt="Menu" width="16" height="16" />
                      </button>
                      {activeDropdown === cliente.id && (
                        <div className="dropdown-menu">
                          <div className="dropdown-header">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                              <circle cx="12" cy="7" r="4"/>
                            </svg>
                            <span className="client-name">{cliente.nombre.split(' ')[0]}</span>
                          </div>
                          <button 
                            className="dropdown-item" 
                            onClick={() => handleMenuAction('Ver ficha completa', cliente.id)}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                              <circle cx="12" cy="12" r="3"/>
                            </svg>
                            Ver ficha completa
                          </button>
                          <button 
                            className="dropdown-item" 
                            onClick={() => handleMenuAction('Agendar cita', cliente.id)}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                              <line x1="16" y1="2" x2="16" y2="6"/>
                              <line x1="8" y1="2" x2="8" y2="6"/>
                              <line x1="3" y1="10" x2="21" y2="10"/>
                              <line x1="12" y1="14" x2="12" y2="18"/>
                              <line x1="8" y1="16" x2="16" y2="16"/>
                            </svg>
                            Agendar cita
                          </button>
                          <button 
                            className="dropdown-item" 
                            onClick={() => handleMenuAction('Llamar paciente', cliente.id)}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                            </svg>
                            Llamar paciente
                          </button>
                          <button 
                            className="dropdown-item" 
                            onClick={() => handleMenuAction('Enviar recordatorio', cliente.id)}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                              <line x1="13" y1="8" x2="13" y2="16"/>
                              <line x1="17" y1="12" x2="9" y2="12"/>
                            </svg>
                            Enviar recordatorio
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button className="pagination-btn">01</button>
          <button className="pagination-btn">02</button>
          <button className="pagination-btn">03</button>
          <span className="pagination-dots">--</span>
          <button className="pagination-btn">04</button>
          <button className="pagination-btn">05</button>
          <button className="pagination-btn">06</button>
        </div>
      </div>

      {/* Modal de Agendar Cita */}
      {isReservarCitaOpen && selectedClientForCita && (
        <AgendarCitaModal
          isOpen={isReservarCitaOpen}
          onClose={handleCloseReservarCita}
          onConfirm={(data) => {
            console.log('Cita agendada:', data);
            handleCloseReservarCita();
          }}
          selectedClient={selectedClientForCita}
        />
      )}
    </div>
  );
};

export default ClientesPage;
