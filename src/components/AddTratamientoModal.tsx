import React, { useState } from 'react';
import './AddTratamientoModal.css';

interface AddTratamientoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (tratamiento: any) => void;
}

const AddTratamientoModal: React.FC<AddTratamientoModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    nombre: 'Peluquería',
    descripcion: '',
    duracion: '25',
    tarifa: '',
    activa: true
  });

  const [especialistas, setEspecialistas] = useState([
    { id: 1, nombre: 'Pol Palomo Cortés', email: 'polpalomo@gmail.com', telefono: '+34 606 20 45 56', especialidad: 'Peluquero', seleccionado: true },
    { id: 2, nombre: 'Roberto Jiménez Robles', email: 'roblesjimenez@example.com', telefono: '+34 659 25 63 65', especialidad: 'Peluquero', seleccionado: false }
  ]);

  const [busqueda, setBusqueda] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    console.log('Toggle change:', name, checked);
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleEspecialistaToggle = (id: number) => {
    setEspecialistas(prev => 
      prev.map(esp => 
        esp.id === id ? { ...esp, seleccionado: !esp.seleccionado } : esp
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const especialistasSeleccionados = especialistas.filter(esp => esp.seleccionado);
    onAdd({
      ...formData,
      especialistas: especialistasSeleccionados
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Header */}
        <div className="modal-header">
          <div className="header-content">
            <h2 className="modal-title">Añadir tratamiento</h2>
            <p className="modal-description">
              Crea un tratamiento para tu local indicando su nombre, duración estándar de las citas y los especialistas que la atenderán. Podrás añadir servicios y personalizarla más adelante.
            </p>
          </div>
          <button className="close-btn" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* Datos básicos */}
          <div className="form-section">
            <div className="section-header">
              <div className="section-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <h3>Datos básicos</h3>
            </div>

            <div className="section-content">
              <div className="form-group">
                <label htmlFor="nombre">Nombre del tratamiento (campo obligatorio)</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="descripcion">Nota o descripción breve (opcional)</label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  placeholder="Ej: Atención especializada en el cuidado del cabello"
                  rows={2}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="duracion">Duración estándar de cita</label>
                  <select
                    id="duracion"
                    name="duracion"
                    value={formData.duracion}
                    onChange={handleInputChange}
                  >
                    <option value="15">15 min</option>
                    <option value="25">25 min</option>
                    <option value="30">30 min</option>
                    <option value="45">45 min</option>
                    <option value="60">60 min</option>
                    <option value="90">90 min</option>
                    <option value="120">120 min</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="tarifa">Tarifa (opcional)</label>
                  <input
                    type="text"
                    id="tarifa"
                    name="tarifa"
                    value={formData.tarifa}
                    onChange={handleInputChange}
                    placeholder="Ej. 65€/Sesión"
                  />
                </div>

                <div className="form-group">
                  <div className="toggle-group">
                    <div className="toggle-switch">
                      <input
                        type="checkbox"
                        id="activa"
                        name="activa"
                        checked={formData.activa}
                        onChange={handleInputChange}
                      />
                      <span className="toggle-slider"></span>
                    </div>
                    <label htmlFor="activa">Activa</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Asignar especialistas */}
          <div className="form-section">
            <div className="section-header">
              <div className="section-icon">
                <img src="/img/scissor-icon.png" alt="Tijeras" width="16" height="16" />
              </div>
              <h3>Asignar especialistas</h3>
            </div>

            <div className="section-content">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Buscar especialista..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="search-input"
                />
                <div className="search-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="M21 21l-4.35-4.35"/>
                  </svg>
                </div>
              </div>

              <div className="especialistas-table">
                <div className="table-header">
                  <div className="header-cell">Nombre</div>
                  <div className="header-cell">Especialidad</div>
                </div>
                <div className="especialistas-list">
                  {especialistas.map((especialista) => (
                    <div key={especialista.id} className="especialista-item">
                      <div className="especialista-checkbox">
                        <input
                          type="checkbox"
                          id={`esp-${especialista.id}`}
                          checked={especialista.seleccionado}
                          onChange={() => handleEspecialistaToggle(especialista.id)}
                        />
                        <label htmlFor={`esp-${especialista.id}`}></label>
                      </div>
                      <div className="especialista-info">
                        <div className="especialista-name">{especialista.nombre}</div>
                        <div className="especialista-details">
                          <span>{especialista.email}</span>
                          <span>{especialista.telefono}</span>
                        </div>
                      </div>
                      <div className="especialista-specialty">{especialista.especialidad}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-confirm">
              Añadir
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTratamientoModal;