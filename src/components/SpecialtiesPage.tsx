import React, { useState } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import './SpecialtiesPage.css';

interface Specialty {
  id: string;
  name: string;
  selected: boolean;
}

const SpecialtiesPage: React.FC = () => {
  const { goNext, goBack } = useNavigation();
  const [specialties, setSpecialties] = useState<Specialty[]>([
    { id: '1', name: 'Peluquería', selected: false },
    { id: '2', name: 'Barbería', selected: false },
    { id: '3', name: 'Uñas', selected: false },
    { id: '4', name: 'Manicura', selected: false },
    { id: '5', name: 'Pedicura', selected: false },
    { id: '6', name: 'Tratamientos faciales', selected: false },
    { id: '7', name: 'Corte', selected: false },
    { id: '8', name: 'Mantenimiento', selected: false },
    { id: '9', name: 'Novias', selected: false },
    { id: '10', name: 'Coloración', selected: false },
    { id: '11', name: 'Peinados', selected: false },
    { id: '12', name: 'Cejas', selected: false },
    { id: '13', name: 'Pestañas', selected: false },
    { id: '14', name: 'Niños', selected: false },
    { id: '15', name: 'Depilación', selected: false },
    { id: '16', name: 'Tratamientos capilares', selected: false },
  ]);

  const handleSpecialtyToggle = (specialtyId: string) => {
    setSpecialties(prevSpecialties =>
      prevSpecialties.map(specialty =>
        specialty.id === specialtyId
          ? { ...specialty, selected: !specialty.selected }
          : specialty
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedSpecialties = specialties.filter(s => s.selected);
    console.log('Selected specialties:', selectedSpecialties);
    // Aquí iría la lógica para guardar las especialidades
    goNext();
  };

  const handleBackClick = () => {
    goBack();
  };

  return (
    <div className="specialties-container">
      {/* Sección izquierda - Formulario */}
      <div className="form-section">
        <div className="form-container">
          <div className="step-indicator">
            <span>04/05</span>
            <div className="progress-dots">
              <div className="dot active"></div>
              <div className="dot active"></div>
              <div className="dot active"></div>
              <div className="dot active"></div>
              <div className="dot"></div>
            </div>
          </div>
          
          <h1 className="form-title">¿Qué especialidades tienes?</h1>
          <p className="form-subtitle">
            Selecciona las especialidades que atiende tu establecimiento.
          </p>
          
          <form onSubmit={handleSubmit} className="specialties-form">
            <div className="specialties-grid">
              {specialties.map((specialty) => (
                <label key={specialty.id} className="specialty-checkbox">
                  <input
                    type="checkbox"
                    checked={specialty.selected}
                    onChange={() => handleSpecialtyToggle(specialty.id)}
                    className="checkbox-input"
                  />
                  <span className="checkbox-label">{specialty.name}</span>
                </label>
              ))}
            </div>

            <div className="button-group">
              <button 
                type="button" 
                className="back-btn-new"
                onClick={handleBackClick}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                  <polyline points="15,18 9,12 15,6"/>
                </svg>
              </button>
              
              <button type="submit" className="next-button">
                <span>Siguiente</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Sección derecha - Imagen promocional */}
      <div className="promotional-section">
        <div className="promotional-image">
          <div className="image-overlay">
            {/* Sin elementos adicionales - todo está en la imagen */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialtiesPage;
