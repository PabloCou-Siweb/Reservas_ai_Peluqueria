import React, { useState } from 'react';
import './AddEspecialistaModal.css';

interface Especialista {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  especialidad: string;
  seleccionado: boolean;
}

interface AddEspecialistaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (especialistas: Especialista[]) => void;
}

const AddEspecialistaModal: React.FC<AddEspecialistaModalProps> = ({ isOpen, onClose, onSave }) => {
  const [especialistas, setEspecialistas] = useState<Especialista[]>([
    {
      id: 1,
      nombre: 'Pol Palomo Cortés',
      email: 'polpalomo@gmail.com',
      telefono: '+34 606 20 45 56',
      especialidad: 'Peluquero',
      seleccionado: true
    },
    {
      id: 2,
      nombre: 'Roberto Jiménez Robles',
      email: 'roblesjimenez@example.com',
      telefono: '+34 659 25 63 65',
      especialidad: 'Esteticista',
      seleccionado: false
    },
    {
      id: 3,
      nombre: 'María García López',
      email: 'mariagarcia@example.com',
      telefono: '+34 612 34 56 78',
      especialidad: 'Peluquero',
      seleccionado: false
    },
    {
      id: 4,
      nombre: 'Carlos Ruiz Martín',
      email: 'carlosruiz@example.com',
      telefono: '+34 678 90 12 34',
      especialidad: 'Barbero',
      seleccionado: false
    }
  ]);

  const [busqueda, setBusqueda] = useState('');

  const handleEspecialistaToggle = (id: number) => {
    setEspecialistas(prev => 
      prev.map(esp => 
        esp.id === id ? { ...esp, seleccionado: !esp.seleccionado } : esp
      )
    );
  };

  const handleSave = () => {
    const especialistasSeleccionados = especialistas.filter(esp => esp.seleccionado);
    onSave(especialistasSeleccionados);
    onClose();
  };

  const especialistasFiltrados = especialistas.filter(esp =>
    esp.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    esp.especialidad.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="header-icon">
            <img src="/img/scissor-icon.png" alt="Especialista" width="24" height="24" />
          </div>
          <div className="header-content">
            <h2 className="modal-title">Añadir especialista al tratamiento</h2>
          </div>
          <button className="close-btn" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          <p className="modal-description">
            Selecciona uno o varios especialistas para asignarlos a este tratamiento. De esta forma, podrán recibir citas dentro de su horario disponible.
          </p>

          {/* Search */}
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

          {/* Specialists List */}
          <div className="specialists-table">
            <div className="table-header">
              <div className="header-checkbox">
                <input
                  type="checkbox"
                  checked={especialistasFiltrados.every(esp => esp.seleccionado)}
                  onChange={(e) => {
                    const todosSeleccionados = especialistasFiltrados.every(esp => esp.seleccionado);
                    setEspecialistas(prev => 
                      prev.map(esp => 
                        especialistasFiltrados.includes(esp) 
                          ? { ...esp, seleccionado: !todosSeleccionados }
                          : esp
                      )
                    );
                  }}
                />
              </div>
              <div className="header-nombre">Nombre</div>
              <div className="header-especialidad">Especialidad</div>
            </div>

            <div className="table-body">
              {especialistasFiltrados.map((especialista) => (
                <div 
                  key={especialista.id} 
                  className={`table-row ${especialista.seleccionado ? 'selected' : ''}`}
                  onClick={() => handleEspecialistaToggle(especialista.id)}
                >
                  <div className="row-checkbox">
                    <input
                      type="checkbox"
                      checked={especialista.seleccionado}
                      onChange={() => handleEspecialistaToggle(especialista.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  <div className="row-nombre">
                    <div className="especialista-name">{especialista.nombre}</div>
                    <div className="especialista-contact">
                      <span className="especialista-email">{especialista.email}</span>
                      <span className="especialista-phone">{especialista.telefono}</span>
                    </div>
                  </div>
                  <div className="row-especialidad">
                    <span className="especialidad-badge">{especialista.especialidad}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-actions">
          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button type="button" className="btn-confirm" onClick={handleSave}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEspecialistaModal;
