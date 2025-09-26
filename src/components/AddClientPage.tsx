import React, { useState } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import Sidebar from './Sidebar';
import './AddClientPage.css';

const AddClientPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    genero: 'Masculino',
    telefono: '',
    email: '',
    tipoDocumento: 'DNI',
    numeroDocumento: '',
    fechaNacimiento: '',
    direccion: '',
    numeroHistorial: '',
    preferenciasServicio: 'Corte',
    alergias: [] as string[],
    tipoCabello: '',
    frecuenciaMedia: '',
    observaciones: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRemoveAllergy = (allergy: string) => {
    setFormData(prev => ({
      ...prev,
      alergias: prev.alergias.filter(a => a !== allergy)
    }));
  };

  const handleAddAllergy = (allergy: string) => {
    if (allergy && !formData.alergias.includes(allergy)) {
      setFormData(prev => ({
        ...prev,
        alergias: [...prev.alergias, allergy]
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Cliente guardado:', formData);
    setShowSuccessModal(true);
  };

  const handleAgendarCita = () => {
    setShowSuccessModal(false);
    // Aquí podrías navegar al modal de agendar cita
    console.log('Navegar a agendar cita');
  };

  const handleAceptar = () => {
    setShowSuccessModal(false);
    navigateTo('clientes');
  };

  return (
    <div className="add-client-page">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="content-wrapper">
        {/* Header */}
        <div className="page-header">
          <div className="header-content">
            <div className="breadcrumb">Cliente / Añadir cliente</div>
            <div className="title-section">
              <button className="back-btn" onClick={() => navigateTo('clientes')}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <h1>Añadir cliente</h1>
            </div>
            <p className="subtitle">Complete la información del cliente para añadirlo a la base de datos.</p>
          </div>
          <div className="header-actions">
            <button className="notification-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <span className="notification-dot"></span>
            </button>
            <button className="settings-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Form Container */}
        <div className="form-container">
          <form onSubmit={handleSubmit} className="client-form">
            {/* Datos del cliente */}
            <div className="form-section">
              <div className="section-header">
                <div className="header-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <h3>Datos del cliente</h3>
              </div>
              
              <div className="form-content">
                {/* Profile Section */}
                <div className="profile-section">
                  <div className="profile-image">
                    <div className="image-placeholder">
                      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                    </div>
                    <button type="button" className="add-image-btn">
                      <img src="/rounded_pen-icon.png" alt="Añadir imagen" width="16" height="16" />
                      Añadir imagen
                    </button>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="fields-section">
                  {/* Row 1: Nombre, Apellidos, Género */}
                  <div className="field-row row-three">
                    <div className="field-group">
                      <label>Nombre</label>
                      <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        placeholder="Ej: Juan"
                      />
                    </div>
                    <div className="field-group">
                      <label>Apellidos</label>
                      <input
                        type="text"
                        name="apellidos"
                        value={formData.apellidos}
                        onChange={handleInputChange}
                        placeholder="Ej: Juancinez Juancin"
                      />
                    </div>
                    <div className="field-group">
                      <label>Género</label>
                      <select
                        name="genero"
                        value={formData.genero}
                        onChange={handleInputChange}
                      >
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Otro">Otro</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 2: Teléfono, Email, Tipo documento, Fecha nacimiento */}
                  <div className="field-row row-four">
                    <div className="field-group">
                      <label>Teléfono</label>
                      <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        placeholder="+34 625989696"
                      />
                    </div>
                    <div className="field-group">
                      <label>Correo electrónico</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="juan.juancinez@gmail.com"
                      />
                    </div>
                    <div className="field-group">
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
                    <div className="field-group">
                      <label>Fecha de nacimiento</label>
                      <div className="date-field">
                        <input
                          type="text"
                          name="fechaNacimiento"
                          value={formData.fechaNacimiento}
                          onChange={handleInputChange}
                          placeholder="10-12-1978"
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
                  <div className="field-row row-one">
                    <div className="field-group">
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
                </div>
              </div>
            </div>

            {/* Datos adicionales */}
            <div className="additional-data-section">
              <div className="section-header">
                <div className="header-icon">
                  <img src="/img/add-icon.png" alt="Add" width="20" height="20" />
                </div>
                <h3>Datos adicionales (opcional)</h3>
              </div>
              
              <div className="additional-form-content">
                {/* Primera fila: Num. Historial, Preferencias, Alergias */}
                <div className="form-row row-1">
                  <div className="form-field">
                    <label>Num. Historial</label>
                    <input
                      type="text"
                      name="numeroHistorial"
                      value={formData.numeroHistorial}
                      onChange={handleInputChange}
                      placeholder="hxd-168"
                    />
                  </div>
                  <div className="form-field">
                    <label>Preferencias de servicio</label>
                    <select
                      name="preferenciasServicio"
                      value={formData.preferenciasServicio}
                      onChange={handleInputChange}
                    >
                      <option value="Corte">Corte</option>
                      <option value="Coloración">Coloración</option>
                      <option value="Tratamiento Capilar">Tratamiento Capilar</option>
                      <option value="Peinado">Peinado</option>
                      <option value="Manicura">Manicura</option>
                      <option value="Pedicura">Pedicura</option>
                      <option value="Depilación">Depilación</option>
                      <option value="Maquillaje">Maquillaje</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label>Alergias</label>
                    <select
                      name="alergias"
                      onChange={(e) => {
                        handleAddAllergy(e.target.value);
                        e.target.value = '';
                      }}
                    >
                      <option value="">Seleccionar alergia...</option>
                      <option value="Amoníaco">Amoníaco</option>
                      <option value="Formaldehido">Formaldehido</option>
                      <option value="Henna">Henna</option>
                      <option value="Aloe vera">Aloe vera</option>
                      <option value="Peróxido">Peróxido</option>
                      <option value="Parafenilendiamina">Parafenilendiamina</option>
                      <option value="Resorcinol">Resorcinol</option>
                      <option value="Tolueno">Tolueno</option>
                      <option value="Acetona">Acetona</option>
                      <option value="Alcohol">Alcohol</option>
                    </select>
                  </div>
                </div>

                {/* Tags de alergias - debajo de la primera fila */}
                {formData.alergias.length > 0 && (
                  <div className="allergy-tags">
                    {formData.alergias.map((allergy, index) => (
                      <span key={index} className="allergy-tag">
                        {allergy}
                        <button
                          type="button"
                          className="remove-tag"
                          onClick={() => handleRemoveAllergy(allergy)}
                        >
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                          </svg>
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {/* Segunda fila: Tipo de cabello, Frecuencia media */}
                <div className="form-row row-2">
                  <div className="form-field">
                    <label>Tipo de cabello</label>
                    <input
                      type="text"
                      name="tipoCabello"
                      value={formData.tipoCabello}
                      onChange={handleInputChange}
                      placeholder="Rizado seco"
                    />
                  </div>
                  <div className="form-field">
                    <label>Frecuencia media</label>
                    <input
                      type="text"
                      name="frecuenciaMedia"
                      value={formData.frecuenciaMedia}
                      onChange={handleInputChange}
                      placeholder="1 vez al mes"
                    />
                  </div>
                </div>

                {/* Tercera fila: Observaciones */}
                <div className="form-row row-3">
                  <div className="form-field">
                    <label>Observaciones</label>
                    <textarea
                      name="observaciones"
                      value={formData.observaciones}
                      onChange={handleInputChange}
                      placeholder="Cliente preferente."
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={() => navigateTo('clientes')}>
                Cancelar
              </button>
              <button type="submit" className="save-btn">
                Guardar
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="page-footer">
          <span>© 2025 Bokifly</span>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="success-modal-overlay">
          <div className="success-modal">
            <div className="success-header">
              <div className="success-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4"/>
                  <circle cx="12" cy="12" r="10"/>
                </svg>
              </div>
              <div className="success-content">
                <h3>Cliente agregado con éxito</h3>
                <p>Ahora puedes agendar una cita o completar su ficha</p>
              </div>
            </div>
            <div className="success-actions">
              <button className="agendar-btn" onClick={handleAgendarCita}>
                Agendar cita
              </button>
              <button className="aceptar-btn" onClick={handleAceptar}>
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddClientPage;
