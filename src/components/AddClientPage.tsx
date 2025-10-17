import React, { useState } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import Sidebar from './Sidebar';
import './AddClientPage.css';
import './HeaderButtons.css';

const AddClientPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    genero: 'Masculino',
    telefono: '+34 625989696',
    email: 'juan.juancinez@gmail.com',
    tipoDocumento: 'DNI',
    numeroDocumento: '44896589Y',
    fechaNacimiento: '10-12-1978',
    direccion: '',
    numHistorial: 'hxd-168',
    preferenciasServicio: 'Corte',
    alergias: 'Amoníaco',
    tipoCabello: 'Rizado seco',
    frecuenciaMedia: '1 vez al mes',
    observaciones: ''
  });
  const [tags, setTags] = useState(['Formaldehído', 'Henna', 'Aloe vera']);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    console.log('Guardar cliente:', formData, tags);
    navigateTo('clientes');
  };

  const handleCancel = () => {
    navigateTo('clientes');
  };

  return (
    <div className="add-client-page">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      <div className={`main-content ${!sidebarOpen ? 'sidebar-closed' : ''}`}>
        {/* Header */}
        <header className="add-client-header">
          <div className="header-content">
            <div className="header-top-row">
              <div className="breadcrumb-nav">
                <span className="breadcrumb-item">Cliente</span>
                <span className="breadcrumb-separator">/</span>
                <span className="breadcrumb-current">Añadir cliente</span>
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
                onClick={() => navigateTo('clientes')}
                aria-label="Volver a clientes"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.5">
                  <polyline points="15,18 9,12 15,6"/>
                </svg>
              </button>
              <h1 className="page-title">Añadir cliente</h1>
            </div>
            
            <p className="page-description">Complete la información del cliente para añadirlo a la base de datos.</p>
          </div>
        </header>

        {/* Main Content */}
        <div className="add-client-content">
          {/* Datos del cliente Section */}
          <div className="client-data-section">
            <div className="section-header">
              <div className="section-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <h3>Datos del cliente</h3>
            </div>
            
            <div className="section-content">
              {/* Left Side - Profile Image */}
              <div className="profile-image-section">
                <div className="profile-image-placeholder">
                  <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div className="image-buttons">
                  <button className="add-image-btn">
                    <span>Añadir imagen</span>
                    <img src="/img/rounded_pen-icon.png" alt="Editar imagen" className="button-icon" />
                  </button>
                </div>
              </div>

              {/* Right Side - Form Fields */}
              <div className="form-fields">
                {/* Row 1: Nombre, Apellidos, Género */}
                <div className="form-row">
                  <div className="form-group nombre">
                    <label>Nombre</label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      placeholder="Ej: Juan"
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group apellidos">
                    <label>Apellidos</label>
                    <input
                      type="text"
                      name="apellidos"
                      value={formData.apellidos}
                      onChange={handleInputChange}
                      placeholder="Ej: Juancinez Juancín"
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group genero">
                    <label>Género</label>
                    <select 
                      name="genero" 
                      value={formData.genero} 
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="Masculino">Masculino</option>
                      <option value="Femenino">Femenino</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>
                </div>

                {/* Row 2: Teléfono, Correo, Tipo documento, Nº documento, Fecha nacimiento */}
                <div className="form-row">
                  <div className="form-group telefono">
                    <label>Teléfono</label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group email">
                    <label>Correo electrónico</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group tipo-documento">
                    <label>Tipo de documento</label>
                    <select 
                      name="tipoDocumento" 
                      value={formData.tipoDocumento} 
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="DNI">DNI</option>
                      <option value="NIE">NIE</option>
                      <option value="Pasaporte">Pasaporte</option>
                    </select>
                  </div>
                  
                  <div className="form-group numero-documento">
                    <label>N° de documento</label>
                    <input
                      type="text"
                      name="numeroDocumento"
                      value={formData.numeroDocumento}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group fecha-nacimiento">
                    <label>Fecha de nacimiento</label>
                    <div className="date-input-container">
                      <input
                        type="text"
                        name="fechaNacimiento"
                        value={formData.fechaNacimiento}
                        onChange={handleInputChange}
                        className="form-input date-input"
                      />
                      <div className="calendar-icon">
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

                {/* Row 3: Dirección */}
                <div className="form-row">
                  <div className="form-group direccion">
                    <label>Dirección</label>
                    <input
                      type="text"
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleInputChange}
                      placeholder="Dirección completa..."
                      className="form-input"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Datos adicionales Section - Recreado con organización en filas */}
          <div className="additional-data-section">
            <div className="section-header">
              <div className="section-icon">
                <img src="/img/add-icon.png" alt="Add" width="20" height="20" />
              </div>
              <h3>Datos adicionales (opcional)</h3>
            </div>
            
            <div className="section-content">
              <div className="form-fields">
                {/* Row 1: Num. Historial, Preferencias, Alergias */}
                <div className="form-row">
                  <div className="form-group num-historial">
                    <label>Num. Historial</label>
                    <input
                      type="text"
                      name="numHistorial"
                      value={formData.numHistorial}
                      onChange={handleInputChange}
                      placeholder="hxd-168"
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group preferencias-servicio">
                    <label>Preferencias de servicio</label>
                    <select 
                      name="preferenciasServicio" 
                      value={formData.preferenciasServicio} 
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="Corte">Corte</option>
                      <option value="Tinte">Tinte</option>
                      <option value="Peinado">Peinado</option>
                      <option value="Tratamiento">Tratamiento</option>
                    </select>
                  </div>
                  
                  <div className="form-group alergias">
                    <label>Alergias</label>
                    <select 
                      name="alergias" 
                      value={formData.alergias} 
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="Amoníaco">Amoníaco</option>
                      <option value="Parabenes">Parabenes</option>
                      <option value="Perfumes">Perfumes</option>
                      <option value="Ninguna">Ninguna</option>
                    </select>
                  </div>
                </div>

                {/* Tags */}
                <div className="tags-section">
                  {tags.map((tag, index) => (
                    <div key={index} className="tag">
                      <span>{tag}</span>
                      <button onClick={() => removeTag(index)} className="remove-tag">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18"/>
                          <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>

                {/* Row 2: Tipo cabello, Frecuencia media */}
                <div className="form-row">
                  <div className="form-group tipo-cabello">
                    <label>Tipo de cabello</label>
                    <input
                      type="text"
                      name="tipoCabello"
                      value={formData.tipoCabello}
                      onChange={handleInputChange}
                      placeholder="Rizado seco"
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group frecuencia-media">
                    <label>Frecuencia media</label>
                    <input
                      type="text"
                      name="frecuenciaMedia"
                      value={formData.frecuenciaMedia}
                      onChange={handleInputChange}
                      placeholder="1 vez al mes"
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Row 3: Observaciones */}
                <div className="form-row">
                  <div className="form-group observaciones">
                    <label>Observaciones</label>
                    <textarea
                      name="observaciones"
                      value={formData.observaciones}
                      onChange={handleInputChange}
                      placeholder="Cliente preferente."
                      className="form-textarea observaciones-textarea"
                      rows={1}
                    />
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

        {/* Copyright */}
        <div className="copyright">
          © 2025 Bokifly
        </div>
      </div>
    </div>
  );
};

export default AddClientPage;