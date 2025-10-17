import React, { useState } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import Sidebar from './Sidebar';
import './EditEspecialistaPage.css';
import './HeaderButtons.css';

const EditEspecialistaPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    titulo: 'Sra.',
    nombre: '',
    apellidos: '',
    telefono: '+34 622 02 58 26',
    email: 'ana.martinez69@gmail.com',
    tipoDocumento: 'DNI',
    numeroDocumento: '3597846850',
    fechaNacimiento: '09-10-2025',
    direccion: '',
    especialidadPrincipal: '',
    subespecialidad: '',
    tarifaConsulta: '50€',
    codigoEmpleado: 'MC-COL-12345',
    observaciones: 'Hace trabajos a domicilio',
    fechaIncorporacion: '09-10-2025'
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

  const handleSave = () => {
    console.log('Guardar datos:', formData);
    navigateTo('especialista-details');
  };

  const handleCancel = () => {
    navigateTo('especialista-details');
  };

  return (
    <div className="edit-especialista-page">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      <div className={`main-content ${!sidebarOpen ? 'sidebar-closed' : ''}`}>
        {/* Header */}
        <header className="edit-especialista-header">
          <div className="header-content">
            <div className="header-top-row">
              <div className="breadcrumb-nav">
                <span className="breadcrumb-item">Especialistas</span>
                <span className="breadcrumb-separator">/</span>
                <span className="breadcrumb-item">Ana Martínez</span>
              </div>
              
              <div className="header-right-section">
                <button className="icon-button notification-btn">
                  <img src="/img/notification-icon.png" alt="Notificaciones" width="20" height="20" />
                </button>
                
                <button className="icon-button settings-btn" onClick={() => navigateTo('configuracion')}>
                  <img src="/img/settings-icon.png" alt="Configuración" width="20" height="20" />
                </button>
              </div>
            </div>
            
            <div className="title-section">
              <button
                className="page-back-btn"
                onClick={() => navigateTo('especialista-details')}
                aria-label="Volver a detalles del especialista"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.5">
                  <polyline points="15,18 9,12 15,6" />
                </svg>
              </button>
              <h1 className="page-title">Ana Martínez</h1>
            </div>
            
            <p className="page-description">Complete la información del doctor para agregarlo al equipo médico.</p>
          </div>
        </header>

        {/* Main Content */}
        <div className="edit-especialista-content">
          {/* Personal Data Header - Separado */}
          <div className="personal-data-header">
            <div className="section-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <h3>Datos personales</h3>
          </div>
          
          {/* Form Section - Recreado desde cero */}
          <div className="personal-data-form">
            {/* Primera fila: Título, Nombre, Apellidos */}
            <div className="form-row-first">
              <div className="input-group titulo-group">
                <label className="input-label">Título</label>
                <select 
                  name="titulo" 
                  value={formData.titulo} 
                  onChange={handleInputChange}
                  className="input-field select-field"
                >
                  <option value="Sr.">Sr.</option>
                  <option value="Sra.">Sra.</option>
                  <option value="Dr.">Dr.</option>
                  <option value="Dra.">Dra.</option>
                </select>
              </div>
              
              <div className="input-group nombre-group">
                <label className="input-label">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  placeholder="Ej: Ana"
                  className="input-field"
                />
              </div>
              
              <div className="input-group apellidos-group">
                <label className="input-label">Apellidos</label>
                <input
                  type="text"
                  name="apellidos"
                  value={formData.apellidos}
                  onChange={handleInputChange}
                  placeholder="Ej: Martínez"
                  className="input-field"
                />
              </div>
            </div>

            {/* Segunda fila: Teléfono, Correo, Documento, Fecha de nacimiento */}
            <div className="form-row-second">
              <div className="input-group telefono-group">
                <label className="input-label">Teléfono</label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
              
              <div className="input-group email-group">
                <label className="input-label">Correo electrónico</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
              
              <div className="input-group tipo-documento-group">
                <label className="input-label">Tipo de documento</label>
                <select 
                  name="tipoDocumento" 
                  value={formData.tipoDocumento} 
                  onChange={handleInputChange}
                  className="input-field select-field"
                >
                  <option value="DNI">DNI</option>
                  <option value="NIE">NIE</option>
                  <option value="Pasaporte">Pasaporte</option>
                </select>
              </div>
              
              <div className="input-group numero-documento-group">
                <label className="input-label">Nº de documento</label>
                <input
                  type="text"
                  name="numeroDocumento"
                  value={formData.numeroDocumento}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
              
              <div className="input-group fecha-nacimiento-group">
                <label className="input-label">Fecha de nacimiento</label>
                <div className="date-field-container">
                  <input
                    type="text"
                    name="fechaNacimiento"
                    value={formData.fechaNacimiento}
                    onChange={handleInputChange}
                    className="input-field date-field"
                  />
                  <div className="date-icon">
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

            {/* Tercera fila: Dirección */}
            <div className="form-row-third">
              <div className="input-group direccion-group">
                <label className="input-label">Dirección</label>
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleInputChange}
                  placeholder="Dirección completa..."
                  className="input-field"
                />
              </div>
            </div>
          </div>

          {/* Professional Information Header - Separado */}
          <div className="professional-data-header">
            <div className="section-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <h3>Información profesional</h3>
          </div>
          
          {/* Professional Form Section - Recreado */}
          <div className="professional-form">
            {/* Primera fila: Especialidad principal, Subespecialidad, Tarifa de consulta */}
            <div className="form-row-first">
              <div className="input-group especialidad-principal-group">
                <label className="input-label">Especialidad principal</label>
                <select 
                  name="especialidadPrincipal" 
                  value={formData.especialidadPrincipal} 
                  onChange={handleInputChange}
                  className="input-field select-field"
                >
                  <option value="">Seleccionar especialidad</option>
                  <option value="Peluquería">Peluquería</option>
                  <option value="Manicura">Manicura</option>
                  <option value="Pedicura">Pedicura</option>
                  <option value="Estética">Estética</option>
                </select>
              </div>
              
              <div className="input-group subespecialidad-group">
                <label className="input-label">Subespecialidad</label>
                <select 
                  name="subespecialidad" 
                  value={formData.subespecialidad} 
                  onChange={handleInputChange}
                  className="input-field select-field"
                >
                  <option value="">Seleccionar subespecialidad (opcional)</option>
                  <option value="Coloración">Coloración</option>
                  <option value="Cortes">Cortes</option>
                  <option value="Tratamientos">Tratamientos</option>
                </select>
              </div>
              
              <div className="input-group tarifa-consulta-group">
                <label className="input-label">Tarifa de consulta</label>
                <input
                  type="text"
                  name="tarifaConsulta"
                  value={formData.tarifaConsulta}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
            </div>

            {/* Segunda fila: Código de empleado, Observaciones, Fecha de incorporación */}
            <div className="form-row-second">
              <div className="input-group codigo-empleado-group">
                <label className="input-label">Código de empleado</label>
                <input
                  type="text"
                  name="codigoEmpleado"
                  value={formData.codigoEmpleado}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
              
              <div className="input-group observaciones-group">
                <label className="input-label">Observaciones</label>
                <input
                  type="text"
                  name="observaciones"
                  value={formData.observaciones}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </div>
              
              <div className="input-group fecha-incorporacion-group">
                <label className="input-label">Fecha de incorporación</label>
                <div className="date-field-container">
                  <input
                    type="text"
                    name="fechaIncorporacion"
                    value={formData.fechaIncorporacion}
                    onChange={handleInputChange}
                    className="input-field date-field"
                  />
                  <div className="date-icon">
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
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="cancel-btn" onClick={handleCancel}>
            Cancelar
          </button>
          <button className="save-btn" onClick={handleSave}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEspecialistaPage;