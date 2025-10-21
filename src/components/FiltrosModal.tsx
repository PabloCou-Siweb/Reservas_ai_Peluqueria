import React, { useState } from 'react';
import './FiltrosModal.css';

interface FiltrosModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: any) => void;
}

const FiltrosModal: React.FC<FiltrosModalProps> = ({ isOpen, onClose, onApplyFilters }) => {
  const [filters, setFilters] = useState({
    fechaDesde: '',
    fechaHasta: '',
    especialista: '',
    tiposConsulta: [] as string[],
    estados: [] as string[]
  });

  const [showEspecialistaDropdown, setShowEspecialistaDropdown] = useState(false);

  const especialistas = [
    'Dr. Mariano Rajoy',
    'Dr. Pablo Picasso', 
    'Dr. Homer Simpson',
    'Dtra. Maria Eugenia',
    'Dr. Pablo Piqueras'
  ];

  const tiposConsulta = [
    'Dermatología',
    'Cardiología', 
    'Neurología',
    'Medicina general',
    'Pediatría',
    'Ginecología',
    'Oftalmología',
    'Oncología'
  ];

  const estados = [
    { id: 'confirmada', label: 'Confirmada', color: '#FFE8BC', dotColor: '#8C623E', textColor: '#8C623E', unselectedColor: '#8C623E' },
    { id: 'cancelada', label: 'Cancelada', color: '#F3F4F6', dotColor: '#6B7280', textColor: '#6B7280', unselectedColor: '#6B7280' },
    { id: 'atendida', label: 'Atendida', color: '#F2CA7E', dotColor: '#FFFFFF', textColor: '#FFFFFF', unselectedColor: '#F2CA7E' },
    { id: 'en_espera', label: 'En espera', color: '#FEF0C7', dotColor: '#E06900', textColor: '#E06900', unselectedColor: '#E06900' },
    { id: 'no_asistio', label: 'No asistió', color: '#FEE2E2', dotColor: '#EF4444', textColor: '#EF4444', unselectedColor: '#EF4444' }
  ];

  const handleTipoConsultaChange = (tipo: string) => {
    setFilters(prev => ({
      ...prev,
      tiposConsulta: prev.tiposConsulta.includes(tipo)
        ? prev.tiposConsulta.filter(t => t !== tipo)
        : [...prev.tiposConsulta, tipo]
    }));
  };

  const handleEstadoChange = (estado: string) => {
    setFilters(prev => ({
      ...prev,
      estados: prev.estados.includes(estado)
        ? prev.estados.filter(e => e !== estado)
        : [...prev.estados, estado]
    }));
  };

  const handleEspecialistaSelect = (especialista: string) => {
    setFilters(prev => ({ ...prev, especialista }));
    setShowEspecialistaDropdown(false);
  };

  const handleClearFilters = () => {
    setFilters({
      fechaDesde: '',
      fechaHasta: '',
      especialista: '',
      tiposConsulta: [],
      estados: []
    });
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="filtros-modal-overlay">
      <div className="filtros-modal">
        <div className="filtros-modal-header">
          <div className="header-top">
            <button className="close-btn" onClick={onClose}>
              <img src="/img/close-icon.png" alt="Cerrar" width="16" height="16" />
            </button>
          </div>
          <div className="header-bottom">
            <h2 className="filtros-title">Filtros</h2>
            <button className="clear-filters-btn" onClick={handleClearFilters}>
              Limpiar filtros
            </button>
          </div>
        </div>

        <div className="filtros-content">
          {/* Rango de fechas */}
          <div className="filtros-section">
            <div className="filtros-date-range">
              <div className="date-input-group">
                <label className="date-label">Desde</label>
                <div className="date-input-container">
                  <img src="/img/calendar-icon.png" alt="Calendario" className="date-icon" />
                  <input
                    type="text"
                    placeholder="dd/mm/aaaa"
                    value={filters.fechaDesde}
                    onChange={(e) => setFilters(prev => ({ ...prev, fechaDesde: e.target.value }))}
                    className="date-input"
                  />
                </div>
              </div>
              <div className="date-input-group">
                <label className="date-label">Hasta</label>
                <div className="date-input-container">
                  <img src="/img/calendar-icon.png" alt="Calendario" className="date-icon" />
                  <input
                    type="text"
                    placeholder="dd/mm/aaaa"
                    value={filters.fechaHasta}
                    onChange={(e) => setFilters(prev => ({ ...prev, fechaHasta: e.target.value }))}
                    className="date-input"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Especialista */}
          <div className="filtros-section">
            <label className="filtros-label">Especialista</label>
            <div className="especialista-dropdown-container">
              <div 
                className={`especialista-dropdown ${showEspecialistaDropdown ? 'open' : ''}`}
                onClick={() => setShowEspecialistaDropdown(!showEspecialistaDropdown)}
              >
                <input
                  type="text"
                  placeholder="Seleccionar especialista"
                  value={filters.especialista}
                  readOnly
                  className="especialista-input"
                />
                <img src="/build/img/arrow_down-icon.png" alt="Desplegar" className="dropdown-arrow" />
              </div>
              
              {showEspecialistaDropdown && (
                <div className="especialista-dropdown-list">
                  {especialistas.map((especialista) => (
                    <div
                      key={especialista}
                      className="especialista-option"
                      onClick={() => handleEspecialistaSelect(especialista)}
                    >
                      {especialista}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Tipo de consulta */}
          <div className="filtros-section">
            <label className="filtros-label">Tipo de consulta</label>
            <div className="tipos-consulta-list">
              {tiposConsulta.map((tipo) => (
                <label key={tipo} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={filters.tiposConsulta.includes(tipo)}
                    onChange={() => handleTipoConsultaChange(tipo)}
                    className="checkbox-input"
                  />
                  <span className="checkbox-label">{tipo}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Estado */}
          <div className="filtros-section">
            <label className="filtros-label">Estado</label>
            <div className="estados-list">
              {estados.map((estado) => (
                <button
                  key={estado.id}
                  className={`estado-tag ${filters.estados.includes(estado.id) ? 'selected' : ''}`}
                  onClick={() => handleEstadoChange(estado.id)}
                  style={{
                    backgroundColor: filters.estados.includes(estado.id) ? estado.color : 'transparent',
                    borderColor: filters.estados.includes(estado.id) ? estado.dotColor : estado.unselectedColor,
                    color: filters.estados.includes(estado.id) ? estado.textColor : estado.unselectedColor
                  }}
                >
                  <div 
                    className="estado-dot" 
                    style={{ backgroundColor: filters.estados.includes(estado.id) ? estado.dotColor : estado.unselectedColor }}
                  ></div>
                  <span className="estado-label">{estado.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="filtros-footer">
          <button className="apply-filters-btn" onClick={handleApplyFilters}>
            Aplicar filtros
          </button>
        </div>
      </div>
    </div>
  );
};

export default FiltrosModal;
