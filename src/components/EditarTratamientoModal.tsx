import React, { useState } from 'react';
import './EditarTratamientoModal.css';

interface EditarTratamientoModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: any) => void;
  }
  
  const EditarTratamientoModal: React.FC<EditarTratamientoModalProps> = ({
    isOpen,
    onClose,
    onSave
  }) => {
    const [formData, setFormData] = useState({
      nombre: 'Depilación',
      descripcion: 'Ej: "Eliminación del vello de diversas zonas. Depilación masculina y femenina."',
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
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
           {/* Header */}
           <div className="modal-header">
             <div className="header-background">
               <div className="header-left">
                 <div className="header-text">
                   <div className="title-row">
                     <div className="header-icon">
                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                         <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                         <circle cx="12" cy="7" r="4"></circle>
                       </svg>
                     </div>
                     <h2 className="modal-title">Editar los datos básicos del tratamiento</h2>
                   </div>
                 </div>
               </div>
             </div>
             <button className="modal-close" onClick={onClose}>
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                 <line x1="18" y1="6" x2="6" y2="18"></line>
                 <line x1="6" y1="6" x2="18" y2="18"></line>
               </svg>
             </button>
           </div>
  
  
          <form onSubmit={handleSubmit}>
            {/* Subtítulo descriptivo */}
            <div className="form-description">
              <p>Modifica el nombre, duración de las citas, especialistas asignados o servicios asociados a esta especialidad. Los cambios se aplicarán de inmediato en la agenda.</p>
            </div>
            
            {/* Datos básicos del tratamiento */}
            <div className="client-data-section">
  
              <div className="section-body">
                <div className="form-grid">
                  {/* Nombre del tratamiento */}
                  <div className="form-group">
                    <label htmlFor="nombre">Nombre del tratamiento (campo obligatorio)</label>
                    <div className="input-with-dropdown">
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        required
                      />
                      <div className="dropdown-arrow">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="6,9 12,15 18,9"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Descripción */}
                  <div className="form-group">
                    <label htmlFor="descripcion">Descripción breve (opcional)</label>
                    <textarea
                      id="descripcion"
                      name="descripcion"
                      value={formData.descripcion}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>

                  {/* Fila de inputs */}
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
            </div>
  
  
            {/* Action buttons */}
            <div className="modal-actions">
              <button type="button" className="btn-cancel" onClick={onClose}>
                Eliminar
              </button>
              <button type="submit" className="btn-confirm">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default EditarTratamientoModal;