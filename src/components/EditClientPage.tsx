import React, { useState } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import Sidebar from './Sidebar';
import './EditClientPage.css';

const EditClientPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const [formData, setFormData] = useState({
    genero: 'Masculino',
    nombre: '',
    apellidos: '',
    telefono: '+34 622 02 58 26',
    email: 'juan.pérez.izquierdo@gmail.com',
    tipoDocumento: 'DNI',
    numeroDocumento: '3597846850',
    fechaNacimiento: '09-10-2025',
    direccion: '',
    ciudad: 'Vigo',
    codigoPostal: 'Vigo'
  });

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCancel = () => {
    navigateTo('client-details');
  };

  const handleSave = () => {
    console.log('Guardando datos:', formData);
    navigateTo('client-details');
  };

  return (
    <div className="edit-client-page">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

      <div className={`main-content ${!sidebarOpen ? 'sidebar-closed' : ''}`}>
        {/* Header */}
        <div className="edit-client-page-header">
          <div className="edit-client-breadcrumb-nav">
            <span className="edit-client-breadcrumb-item">Clientes</span>
            <span className="edit-client-breadcrumb-separator">/</span>
            <span className="edit-client-breadcrumb-item">Pablo Simón</span>
            <span className="edit-client-breadcrumb-separator">/</span>
            <span className="edit-client-breadcrumb-current">Editar perfil</span>
          </div>
          
          <div className="edit-client-title-row">
            <button className="edit-client-back-arrow" onClick={() => navigateTo('client-details')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15,18 9,12 15,6"/>
              </svg>
            </button>
            <h1 className="edit-client-main-title">Pablo Simón</h1>
          </div>
          
          <div className="edit-client-instruction-text">
            Complete la información del paciente.
          </div>
        </div>

        {/* Content Area */}
        <div className="edit-client-content-area">
          {/* Personal Data Section */}
          <div className="edit-client-data-card">
            <div className="edit-client-card-header">
              <div className="edit-client-header-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <h2 className="edit-client-card-title">Datos personales</h2>
            </div>
            
            <div className="edit-client-form-content">
              {/* Row 1: Género, Nombre, Apellidos */}
              <div className="edit-client-form-row">
                <div className="edit-client-field-group">
                  <label className="edit-client-field-label">Género</label>
                  <select 
                    name="genero" 
                    value={formData.genero} 
                    onChange={handleInputChange}
                    className="edit-client-select-field"
                  >
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
                
                <div className="edit-client-field-group">
                  <label className="edit-client-field-label">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder="Ej: Juan"
                    className="edit-client-input-field"
                  />
                </div>
                
                <div className="edit-client-field-group">
                  <label className="edit-client-field-label">Apellidos</label>
                  <input
                    type="text"
                    name="apellidos"
                    value={formData.apellidos}
                    onChange={handleInputChange}
                    placeholder="Ej: Pérez Izquierdo"
                    className="edit-client-input-field"
                  />
                </div>
              </div>

              {/* Row 2: Teléfono, Correo, Tipo documento, Nº documento, Fecha nacimiento */}
              <div className="edit-client-form-row">
                <div className="edit-client-field-group">
                  <label className="edit-client-field-label">Teléfono</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className="edit-client-input-field"
                  />
                </div>
                
                <div className="edit-client-field-group">
                  <label className="edit-client-field-label">Correo electrónico</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="edit-client-input-field"
                  />
                </div>
                
                <div className="edit-client-field-group">
                  <label className="edit-client-field-label">Tipo de documento</label>
                  <select 
                    name="tipoDocumento" 
                    value={formData.tipoDocumento} 
                    onChange={handleInputChange}
                    className="edit-client-select-field"
                  >
                    <option value="DNI">DNI</option>
                    <option value="NIE">NIE</option>
                    <option value="Pasaporte">Pasaporte</option>
                  </select>
                </div>
                
                <div className="edit-client-field-group">
                  <label className="edit-client-field-label">N° de documento</label>
                  <input
                    type="text"
                    name="numeroDocumento"
                    value={formData.numeroDocumento}
                    onChange={handleInputChange}
                    className="edit-client-input-field"
                  />
                </div>
                
                <div className="edit-client-field-group">
                  <label className="edit-client-field-label">Fecha de nacimiento</label>
                  <div className="edit-client-date-wrapper">
                    <input
                      type="text"
                      name="fechaNacimiento"
                      value={formData.fechaNacimiento}
                      onChange={handleInputChange}
                      className="edit-client-input-field edit-client-date-input"
                    />
                    <div className="edit-client-calendar-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 3: Dirección, Ciudad, Código Postal */}
              <div className="edit-client-form-row">
                <div className="edit-client-field-group">
                  <label className="edit-client-field-label">Dirección</label>
                  <input
                    type="text"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleInputChange}
                    placeholder="Dirección completa..."
                    className="edit-client-input-field"
                  />
                </div>
                
                <div className="edit-client-field-group">
                  <label className="edit-client-field-label">Ciudad</label>
                  <input
                    type="text"
                    name="ciudad"
                    value={formData.ciudad}
                    onChange={handleInputChange}
                    className="edit-client-input-field"
                  />
                </div>
                
                <div className="edit-client-field-group">
                  <label className="edit-client-field-label">Código Postal</label>
                  <input
                    type="text"
                    name="codigoPostal"
                    value={formData.codigoPostal}
                    onChange={handleInputChange}
                    className="edit-client-input-field"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="edit-client-action-buttons">
          <button className="edit-client-cancel-button" onClick={handleCancel}>
            Cancelar
          </button>
          <button className="edit-client-save-button" onClick={handleSave}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditClientPage;