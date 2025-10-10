import React, { useState } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import Sidebar from './Sidebar';
import './EditClientPage.css';

const EditClientPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Datos del cliente (simulados)
  const [clientData, setClientData] = useState({
    genero: 'Masculino',
    nombre: 'Pablo',
    apellidos: 'Simón López',
    telefono: '+34 625 58 0 15',
    email: 'pablo.simón@gmail.com',
    tipoDocumento: 'DNI',
    numeroDocumento: '3597846850',
    fechaNacimiento: '15-03-1990',
    direccion: 'Calle 45 #23-67, Bogotá',
    ciudad: 'Vigo',
    codigoPostal: '36475'
  });

  const handleInputChange = (field: string, value: string) => {
    setClientData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Aquí se guardarían los datos del cliente
    console.log('Guardando datos:', clientData);
    navigateTo('client-details');
  };

  const handleCancel = () => {
    navigateTo('client-details');
  };

  return (
    <div className="edit-client-page">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className={`main-content ${!sidebarOpen ? 'sidebar-closed' : ''}`}>
        {/* Header */}
        <div className="page-header">
          <div className="breadcrumbs">
            <span>Clientes</span>
            <span className="separator">/</span>
            <span>Pablo Simón</span>
            <span className="separator">/</span>
            <span className="current">Editar perfil</span>
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

        {/* Title Section */}
        <div className="title-section">
          <div className="title-row">
            <button className="back-button" onClick={() => navigateTo('client-details')}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15,18 9,12 15,6"/>
              </svg>
            </button>
            <h1>Pablo Simón</h1>
          </div>
          <p className="subtitle">Complete la información del paciente.</p>
        </div>

        {/* Form */}
        <div className="edit-form-container">

          <form className="edit-client-form">
            {/* Section Header */}
            <div className="section-header">
              <div className="header-left">
                <div className="header-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <h3>Datos personales</h3>
              </div>
            </div>

            {/* Form Content */}
            <div className="form-content">
              {/* Primera fila: Género, Nombre, Apellidos */}
              <div className="form-row">
                <div className="form-field">
                  <label>Género</label>
                  <select 
                    value={clientData.genero} 
                    onChange={(e) => handleInputChange('genero', e.target.value)}
                  >
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
                <div className="form-field">
                  <label>Nombre</label>
                  <input 
                    type="text" 
                    placeholder="Ej: Juan"
                    value={clientData.nombre}
                    onChange={(e) => handleInputChange('nombre', e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label>Apellidos</label>
                  <input 
                    type="text" 
                    placeholder="Ej: Pérez Izquierdo"
                    value={clientData.apellidos}
                    onChange={(e) => handleInputChange('apellidos', e.target.value)}
                  />
                </div>
              </div>

              {/* Segunda fila: Teléfono, Email, Documento, Fecha */}
              <div className="form-row">
                <div className="form-field">
                  <label>Teléfono</label>
                  <input 
                    type="tel" 
                    value={clientData.telefono}
                    onChange={(e) => handleInputChange('telefono', e.target.value)}
                    placeholder="+34 612 345 678"
                  />
                </div>
                <div className="form-field">
                  <label>Correo electrónico</label>
                  <input 
                    type="email" 
                    value={clientData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label>Tipo de documento</label>
                  <select 
                    value={clientData.tipoDocumento} 
                    onChange={(e) => handleInputChange('tipoDocumento', e.target.value)}
                  >
                    <option value="DNI">DNI</option>
                    <option value="Pasaporte">Pasaporte</option>
                    <option value="Cédula">Cédula</option>
                  </select>
                </div>
                <div className="form-field">
                  <label>N° de documento</label>
                  <input 
                    type="text" 
                    value={clientData.numeroDocumento}
                    onChange={(e) => handleInputChange('numeroDocumento', e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label>Fecha de nacimiento</label>
                  <input 
                    type="date" 
                    value={clientData.fechaNacimiento}
                    onChange={(e) => handleInputChange('fechaNacimiento', e.target.value)}
                  />
                </div>
              </div>

              {/* Tercera fila: Dirección, Ciudad, Código Postal */}
              <div className="form-row">
                <div className="form-field">
                  <label>Dirección</label>
                  <input 
                    type="text" 
                    placeholder="Dirección completa..."
                    value={clientData.direccion}
                    onChange={(e) => handleInputChange('direccion', e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label>Ciudad</label>
                  <input 
                    type="text" 
                    value={clientData.ciudad}
                    onChange={(e) => handleInputChange('ciudad', e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label>Código Postal</label>
                  <input 
                    type="text" 
                    value={clientData.codigoPostal}
                    onChange={(e) => handleInputChange('codigoPostal', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="form-actions">
              <button type="button" className="btn-cancel" onClick={handleCancel}>
                Cancelar
              </button>
              <button type="button" className="btn-save" onClick={handleSave}>
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditClientPage;
