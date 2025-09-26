import React, { useState } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import Sidebar from './Sidebar';
import './EditEspecialistaPage.css';

const EditEspecialistaPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Estados para el formulario
  const [formData, setFormData] = useState({
    nombre: 'Ana',
    apellidos: 'Martínez',
    telefono: '+34 622 02 58 26',
    email: 'ana.martinez69@gmail.com',
    tipoDocumento: 'DNI',
    numeroDocumento: '3597846850',
    fechaNacimiento: '2025-10-09',
    direccion: 'Calle 45 #23-67',
    // Campos de información profesional
    especialidadPrincipal: 'Peluquería',
    subespecialidad: 'Corte y peinado',
    tarifaServicio: '50€',
    codigoEmpleado: 'MC-COL-12345',
    observaciones: 'Hace trabajos a domicilio',
    fechaIncorporacion: '2025-10-09'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    console.log('Guardar especialista:', formData);
    navigateTo('especialista-details');
  };

  const handleCancel = () => {
    navigateTo('especialista-details');
  };

  return (
    <div className="edit-especialista-page">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

      <div className="main-content">
        {/* Header */}
        <div className="page-header">
          <div className="header-left">
            <div className="breadcrumbs">
              <span>Especialistas</span>
              <span className="separator">/</span>
              <span>Ana Martínez</span>
            </div>
            <div className="title-row">
              <button className="back-button" onClick={() => navigateTo('especialista-details')}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
              <h1>Ana Martínez</h1>
            </div>
            <p className="subtitle">Complete la información del especialista para actualizar su perfil.</p>
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

        {/* Form Container */}
        <div className="form-container">
          {/* Form Header */}
          <div className="form-header">
            <div className="form-header-content">
              <div className="form-header-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <span>Datos personales</span>
            </div>
          </div>

          {/* Form Content */}
          <div className="form-content">
            {/* Row 1 - Nombre y Apellidos */}
            <div className="form-row">
              <div className="form-field">
                <label>Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  placeholder="Ej: Ana"
                />
              </div>
              <div className="form-field">
                <label>Apellidos</label>
                <input
                  type="text"
                  name="apellidos"
                  value={formData.apellidos}
                  onChange={handleInputChange}
                  placeholder="Ej: Martínez"
                />
              </div>
            </div>

            {/* Row 2 - Teléfono, Correo, Documento, N° documento y Fecha de nacimiento */}
            <div className="form-row">
              <div className="form-field">
                <label>Teléfono</label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-field">
                <label>Correo electrónico</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-field">
                <label>Tipo de documento</label>
                <select
                  name="tipoDocumento"
                  value={formData.tipoDocumento}
                  onChange={handleInputChange}
                >
                  <option value="DNI">DNI</option>
                  <option value="NIE">NIE</option>
                  <option value="Pasaporte">Pasaporte</option>
                </select>
              </div>
              <div className="form-field">
                <label>N° de documento</label>
                <input
                  type="text"
                  name="numeroDocumento"
                  value={formData.numeroDocumento}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-field">
                <label>Fecha de nacimiento</label>
                <input
                  type="date"
                  name="fechaNacimiento"
                  value={formData.fechaNacimiento}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Row 3 - Dirección */}
            <div className="form-row">
              <div className="form-field">
                <label>Dirección</label>
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleInputChange}
                  placeholder="Dirección completa..."
                />
              </div>
            </div>

            {/* Professional Information Header */}
            <div className="form-header">
              <div className="form-header-content">
                <div className="form-header-icon">
                  <img src="/img/medal-icon.png" alt="Información profesional" width="20" height="20" />
                </div>
                <span>Información profesional</span>
              </div>
            </div>

            {/* Professional Information Row 1 */}
            <div className="form-row">
              <div className="form-field">
                <label>Especialidad principal</label>
                <select
                  name="especialidadPrincipal"
                  value={formData.especialidadPrincipal}
                  onChange={handleInputChange}
                >
                  <option value="">Seleccionar especialidad</option>
                  <option value="Peluquería">Peluquería</option>
                  <option value="Coloración">Coloración</option>
                  <option value="Tratamientos capilares">Tratamientos capilares</option>
                  <option value="Manicura y pedicura">Manicura y pedicura</option>
                  <option value="Maquillaje">Maquillaje</option>
                </select>
              </div>
              <div className="form-field">
                <label>Subespecialidad</label>
                <select
                  name="subespecialidad"
                  value={formData.subespecialidad}
                  onChange={handleInputChange}
                >
                  <option value="">Seleccionar subespecialidad (opcional)</option>
                  <option value="Corte y peinado">Corte y peinado</option>
                  <option value="Mechas">Mechas</option>
                  <option value="Decoloración">Decoloración</option>
                  <option value="Tratamientos de queratina">Tratamientos de queratina</option>
                </select>
              </div>
              <div className="form-field">
                <label>Tarifa del servicio</label>
                <input
                  type="text"
                  name="tarifaServicio"
                  value={formData.tarifaServicio}
                  onChange={handleInputChange}
                  placeholder="Ej: 50€"
                />
              </div>
            </div>

            {/* Professional Information Row 2 */}
            <div className="form-row">
              <div className="form-field">
                <label>Código de empleado</label>
                <input
                  type="text"
                  name="codigoEmpleado"
                  value={formData.codigoEmpleado}
                  onChange={handleInputChange}
                  placeholder="Ej: MC-COL-12345"
                />
              </div>
              <div className="form-field">
                <label>Observaciones</label>
                <input
                  type="text"
                  name="observaciones"
                  value={formData.observaciones}
                  onChange={handleInputChange}
                  placeholder="Ej: Hace trabajos a domicilio"
                />
              </div>
              <div className="form-field">
                <label>Fecha de incorporación</label>
                <input
                  type="date"
                  name="fechaIncorporacion"
                  value={formData.fechaIncorporacion}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="form-actions">
              <button className="btn-cancel" onClick={handleCancel}>
                Cancelar
              </button>
              <button className="btn-save" onClick={handleSave}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEspecialistaPage;
