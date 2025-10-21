import React, { useState } from 'react';
import './EditTratamientoModal.css';

interface EditTratamientoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

const EditTratamientoModal: React.FC<EditTratamientoModalProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState({
    nombre: 'Depilación',
    descripcion: '',
    duracion: '25',
    tarifa: '',
    activa: true
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="edit-tratamiento-modal-overlay" onClick={onClose}>
      <div className="edit-tratamiento-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header separado con banner naranja */}
        <div className="edit-tratamiento-header-banner">
          <div className="edit-tratamiento-header-content">
            <div className="edit-tratamiento-header-icon">
              <img src="/img/user-icon.png" alt="Usuario" width="20" height="20" />
            </div>
            <h3 className="edit-tratamiento-modal-title">Editar los datos básicos del tratamiento</h3>
          </div>
        </div>

        {/* Close button fuera del header */}
        <button className="edit-tratamiento-modal-close" onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Content */}
        <div className="edit-tratamiento-modal-content">
          {/* Description */}
          <div className="edit-tratamiento-description">
            <p>Modifica el nombre, duración de las citas, especialistas asignados o servicios asociados a esta especialidad. Los cambios se aplicarán de inmediato en la agenda.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="edit-tratamiento-form">
            {/* Nombre del tratamiento */}
            <div className="edit-tratamiento-form-group">
              <label htmlFor="edit-tratamiento-nombre">Nombre del tratamiento (campo obligatorio)</label>
              <div className="edit-tratamiento-input-with-dropdown">
                <input
                  type="text"
                  id="edit-tratamiento-nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                  className="edit-tratamiento-form-input"
                />
                <div className="edit-tratamiento-dropdown-arrow">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6,9 12,15 18,9"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Descripción */}
            <div className="edit-tratamiento-form-group">
              <label htmlFor="edit-tratamiento-descripcion">Descripción breve (opcional)</label>
              <textarea
                id="edit-tratamiento-descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
                rows={3}
                className="edit-tratamiento-form-textarea"
              />
            </div>

            {/* Fila de inputs */}
            <div className="edit-tratamiento-form-row">
              <div className="edit-tratamiento-form-group">
                <label htmlFor="edit-tratamiento-duracion">Duración estándar de cita</label>
                <select
                  id="edit-tratamiento-duracion"
                  name="duracion"
                  value={formData.duracion}
                  onChange={handleInputChange}
                  className="edit-tratamiento-form-select"
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

              <div className="edit-tratamiento-form-group">
                <label htmlFor="edit-tratamiento-tarifa">Tarifa (opcional)</label>
                <input
                  type="text"
                  id="edit-tratamiento-tarifa"
                  name="tarifa"
                  value={formData.tarifa}
                  onChange={handleInputChange}
                  placeholder="Ej. 65€/Sesión"
                  className="edit-tratamiento-form-input"
                />
              </div>

              <div className="edit-tratamiento-form-group">
                <div className="edit-tratamiento-toggle-group">
                  <div className="edit-tratamiento-toggle-switch">
                    <input
                      type="checkbox"
                      id="edit-tratamiento-activa"
                      name="activa"
                      checked={formData.activa}
                      onChange={handleInputChange}
                    />
                    <span className="edit-tratamiento-toggle-slider"></span>
                  </div>
                  <label htmlFor="edit-tratamiento-activa">Activa</label>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="edit-tratamiento-modal-actions">
              <button type="button" className="edit-tratamiento-btn-cancel" onClick={onClose}>
                Eliminar
              </button>
              <button type="submit" className="edit-tratamiento-btn-save">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTratamientoModal;