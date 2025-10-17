import React, { useState, useEffect } from 'react';
import './AddTratamientoModal.css';

interface AddTratamientoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (tratamiento: any) => void;
}

const AddTratamientoModal: React.FC<AddTratamientoModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    nombre: 'Peluqueria',
    descripcion: '',
    duracion: '25',
    tarifa: '65€/Sesión',
    activa: true,
  });
  const [especialistasSeleccionados, setEspecialistasSeleccionados] = useState<string[]>([]);
  const [buscarEspecialista, setBuscarEspecialista] = useState('');
  const [todosSeleccionados, setTodosSeleccionados] = useState(false);

  // Actualizar el estado de "select all" basado en la selección actual
  useEffect(() => {
    const especialistasFiltrados = especialistas.filter(esp => 
      esp.nombre.toLowerCase().includes(buscarEspecialista.toLowerCase())
    );
    const todosEstanSeleccionados = especialistasFiltrados.length > 0 && 
      especialistasFiltrados.every(esp => especialistasSeleccionados.includes(esp.id));
    setTodosSeleccionados(todosEstanSeleccionados);
  }, [especialistasSeleccionados, buscarEspecialista]);

  const especialistas = [
    { id: 'pol-palomo', nombre: 'Pol Palomo Cortés', email: 'polpalomo@gmail', telefono: '+34 606 20 45 56', especialidad: 'Peluquero' },
    { id: 'roberto-jimenez', nombre: 'Roberto Jiménez Robles', email: 'roblesjimenez@example.com', telefono: '+34 659 25 63 65', especialidad: 'Peluquero' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToggleActiva = () => {
    setFormData(prev => ({ ...prev, activa: !prev.activa }));
  };

  const handleEspecialistaToggle = (id: string) => {
    setEspecialistasSeleccionados(prev =>
      prev.includes(id) ? prev.filter(espId => espId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (todosSeleccionados) {
      setEspecialistasSeleccionados([]);
      setTodosSeleccionados(false);
    } else {
      const todosIds = especialistas.map(esp => esp.id);
      setEspecialistasSeleccionados(todosIds);
      setTodosSeleccionados(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tratamiento = {
      ...formData,
      especialistas: especialistasSeleccionados,
    };
    onAdd(tratamiento);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Añadir tratamiento</h2>
          <button className="close-btn" onClick={onClose}>
            <img src="/img/close-icon.png" alt="Cerrar" />
          </button>
        </div>

        <div className="modal-description">
          <p>Crea un tratamiento para tu local indicando su nombre, duración estándar de las citas y los especialistas que la atenderán. Podrás añadir servicios y personalizarla más adelante.</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Sección 1: Datos básicos */}
          <div className="form-section">
            <div className="section-header">
              <div className="section-icon">
                <img src="/img/user-icon.png" alt="Usuario" />
              </div>
              <h3 className="section-title">Datos básicos</h3>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nombre">Nombre del tratamiento <span className="required">(campo obligatorio)</span></label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group descripcion-wide">
                <label htmlFor="descripcion">Nota o descripción breve (opcional)</label>
                <input
                  type="text"
                  id="descripcion"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  placeholder='Ej: "Atención especializada en el cuidado del cabello"'
                />
              </div>
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

              <div className="form-group toggle-group">
                <label>Activa</label>
                <div className="toggle-switch">
                  <input
                    type="checkbox"
                    id="activa"
                    checked={formData.activa}
                    onChange={handleToggleActiva}
                  />
                  <label htmlFor="activa" className="toggle-label"></label>
                </div>
              </div>
            </div>
          </div>

          {/* Sección 2: Asignar especialistas */}
          <div className="form-section">
            <div className="section-header">
              <div className="section-icon">
                <img src="/img/scissor-icon.png" alt="Especialistas" />
              </div>
              <h3 className="section-title">Asignar especialistas</h3>
            </div>

            <div className="search-bar">
              <input
                type="text"
                placeholder="Buscar especialista..."
                value={buscarEspecialista}
                onChange={(e) => setBuscarEspecialista(e.target.value)}
              />
              <img src="/img/search-icon.png" alt="Buscar" />
            </div>

            <div className="specialists-list">
              <div className="list-header">
                <div className="header-checkbox">
                  <input type="checkbox" id="select-all" checked={todosSeleccionados} onChange={handleSelectAll} />
                  <label htmlFor="select-all"></label>
                </div>
                <div className="header-name">
                  <span>Nombre</span>
                </div>
                <div className="header-specialty">Especialidad</div>
              </div>

              {especialistas
                .filter(esp => esp.nombre.toLowerCase().includes(buscarEspecialista.toLowerCase()))
                .map((especialista) => (
                  <div key={especialista.id} className={`specialist-item ${especialistasSeleccionados.includes(especialista.id) ? 'selected' : ''}`}>
                    <div className="item-checkbox">
                      <input type="checkbox" id={especialista.id} checked={especialistasSeleccionados.includes(especialista.id)} onChange={() => handleEspecialistaToggle(especialista.id)} />
                      <label htmlFor={especialista.id}></label>
                    </div>
                    <div className="item-info">
                      <div className="name">{especialista.nombre}</div>
                      <div className="email">{especialista.email}</div>
                      <div className="phone">{especialista.telefono}</div>
                    </div>
                    <div className="item-specialty">{especialista.especialidad}</div>
                  </div>
                ))}
            </div>
          </div>

          {/* Botones */}
          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-add">
              Añadir
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTratamientoModal;

