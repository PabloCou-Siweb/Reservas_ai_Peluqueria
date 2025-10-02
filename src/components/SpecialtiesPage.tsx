import React, { useState } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import './SpecialtiesPage.css';

const SpecialtiesPage: React.FC = () => {
  const { goNext, goBack } = useNavigation();
  
  // Estado para especialidades seleccionadas
  const [selectedSpecialties, setSelectedSpecialties] = useState<Set<string>>(new Set());
  const [customSpecialties, setCustomSpecialties] = useState<string[]>([]);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherValue, setOtherValue] = useState('');

  const handleSpecialtyToggle = (specialtyName: string) => {
    setSelectedSpecialties(prev => {
      const newSet = new Set(prev);
      if (newSet.has(specialtyName)) {
        newSet.delete(specialtyName);
      } else {
        newSet.add(specialtyName);
      }
      return newSet;
    });
  };

  const handleAddOther = () => {
    setShowOtherInput(true);
  };

  const handleOtherSubmit = () => {
    if (otherValue.trim()) {
      setCustomSpecialties(prev => [...prev, otherValue.trim()]);
      setOtherValue('');
      setShowOtherInput(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Selected specialties:', Array.from(selectedSpecialties));
    console.log('Custom specialties:', customSpecialties);
    goNext();
  };

  const handleBackClick = () => {
    goBack();
  };

  return (
    <div className="specialties-page">
      {/* Sección del formulario */}
      <div className="form-section">
        <div className="form-wrapper">
          {/* Indicador de progreso */}
          <div className="progress-indicator">
            <span className="step-text">04/05</span>
            <div className="dots">
              <div className="dot active"></div>
              <div className="dot active"></div>
              <div className="dot active"></div>
              <div className="dot active"></div>
              <div className="dot"></div>
            </div>
          </div>
          
          <h1 className="page-title">¿Qué especialidades tienes?</h1>
          <p className="page-subtitle">
            Selecciona las especialidades que atiende tu establecimiento.
          </p>
          
          <form onSubmit={handleSubmit} className="specialties-form">
            <div className="checkboxes-container">
              {/* Fila 1: Peluquería, Barbería, Uñas, Manicura */}
              <div className="checkbox-row">
                <div 
                  className={`checkbox-item ${selectedSpecialties.has('Peluquería') ? 'selected' : ''}`}
                  onClick={() => handleSpecialtyToggle('Peluquería')}
                >
                  <div className={`checkbox ${selectedSpecialties.has('Peluquería') ? 'checked' : ''}`}></div>
                  <span className="checkbox-label">Peluquería</span>
                </div>
                <div 
                  className={`checkbox-item ${selectedSpecialties.has('Barbería') ? 'selected' : ''}`}
                  onClick={() => handleSpecialtyToggle('Barbería')}
                >
                  <div className={`checkbox ${selectedSpecialties.has('Barbería') ? 'checked' : ''}`}></div>
                  <span className="checkbox-label">Barbería</span>
                </div>
                <div 
                  className={`checkbox-item ${selectedSpecialties.has('Uñas') ? 'selected' : ''}`}
                  onClick={() => handleSpecialtyToggle('Uñas')}
                >
                  <div className={`checkbox ${selectedSpecialties.has('Uñas') ? 'checked' : ''}`}></div>
                  <span className="checkbox-label">Uñas</span>
                </div>
                <div 
                  className={`checkbox-item ${selectedSpecialties.has('Manicura') ? 'selected' : ''}`}
                  onClick={() => handleSpecialtyToggle('Manicura')}
                >
                  <div className={`checkbox ${selectedSpecialties.has('Manicura') ? 'checked' : ''}`}></div>
                  <span className="checkbox-label">Manicura</span>
                </div>
              </div>

              {/* Fila 2: Pedicura, Tratamientos faciales, Corte */}
              <div className="checkbox-row">
                <div 
                  className={`checkbox-item ${selectedSpecialties.has('Pedicura') ? 'selected' : ''}`}
                  onClick={() => handleSpecialtyToggle('Pedicura')}
                >
                  <div className={`checkbox ${selectedSpecialties.has('Pedicura') ? 'checked' : ''}`}></div>
                  <span className="checkbox-label">Pedicura</span>
                </div>
                <div 
                  className={`checkbox-item ${selectedSpecialties.has('Tratamientos faciales') ? 'selected' : ''}`}
                  onClick={() => handleSpecialtyToggle('Tratamientos faciales')}
                >
                  <div className={`checkbox ${selectedSpecialties.has('Tratamientos faciales') ? 'checked' : ''}`}></div>
                  <span className="checkbox-label">Tratamientos faciales</span>
                </div>
                <div 
                  className={`checkbox-item ${selectedSpecialties.has('Corte') ? 'selected' : ''}`}
                  onClick={() => handleSpecialtyToggle('Corte')}
                >
                  <div className={`checkbox ${selectedSpecialties.has('Corte') ? 'checked' : ''}`}></div>
                  <span className="checkbox-label">Corte</span>
                </div>
                <div className="empty-space"></div>
              </div>

              {/* Fila 3: Mantenimiento, Novias, Coloración */}
              <div className="checkbox-row">
                <div 
                  className={`checkbox-item ${selectedSpecialties.has('Mantenimiento') ? 'selected' : ''}`}
                  onClick={() => handleSpecialtyToggle('Mantenimiento')}
                >
                  <div className={`checkbox ${selectedSpecialties.has('Mantenimiento') ? 'checked' : ''}`}></div>
                  <span className="checkbox-label">Mantenimiento</span>
                </div>
                <div 
                  className={`checkbox-item ${selectedSpecialties.has('Novias') ? 'selected' : ''}`}
                  onClick={() => handleSpecialtyToggle('Novias')}
                >
                  <div className={`checkbox ${selectedSpecialties.has('Novias') ? 'checked' : ''}`}></div>
                  <span className="checkbox-label">Novias</span>
                </div>
                <div 
                  className={`checkbox-item ${selectedSpecialties.has('Coloración') ? 'selected' : ''}`}
                  onClick={() => handleSpecialtyToggle('Coloración')}
                >
                  <div className={`checkbox ${selectedSpecialties.has('Coloración') ? 'checked' : ''}`}></div>
                  <span className="checkbox-label">Coloración</span>
                </div>
                <div className="empty-space"></div>
              </div>

              {/* Fila 4: Peinados, Cejas, Pestañas, Niños */}
              <div className="checkbox-row">
                <div 
                  className={`checkbox-item ${selectedSpecialties.has('Peinados') ? 'selected' : ''}`}
                  onClick={() => handleSpecialtyToggle('Peinados')}
                >
                  <div className={`checkbox ${selectedSpecialties.has('Peinados') ? 'checked' : ''}`}></div>
                  <span className="checkbox-label">Peinados</span>
                </div>
                <div 
                  className={`checkbox-item ${selectedSpecialties.has('Cejas') ? 'selected' : ''}`}
                  onClick={() => handleSpecialtyToggle('Cejas')}
                >
                  <div className={`checkbox ${selectedSpecialties.has('Cejas') ? 'checked' : ''}`}></div>
                  <span className="checkbox-label">Cejas</span>
                </div>
                <div 
                  className={`checkbox-item ${selectedSpecialties.has('Pestañas') ? 'selected' : ''}`}
                  onClick={() => handleSpecialtyToggle('Pestañas')}
                >
                  <div className={`checkbox ${selectedSpecialties.has('Pestañas') ? 'checked' : ''}`}></div>
                  <span className="checkbox-label">Pestañas</span>
                </div>
                <div 
                  className={`checkbox-item ${selectedSpecialties.has('Niños') ? 'selected' : ''}`}
                  onClick={() => handleSpecialtyToggle('Niños')}
                >
                  <div className={`checkbox ${selectedSpecialties.has('Niños') ? 'checked' : ''}`}></div>
                  <span className="checkbox-label">Niños</span>
                </div>
              </div>

              {/* Fila 5: Depilación, Peinados, Tratamientos capilares */}
              <div className="checkbox-row">
                <div 
                  className={`checkbox-item ${selectedSpecialties.has('Depilación') ? 'selected' : ''}`}
                  onClick={() => handleSpecialtyToggle('Depilación')}
                >
                  <div className={`checkbox ${selectedSpecialties.has('Depilación') ? 'checked' : ''}`}></div>
                  <span className="checkbox-label">Depilación</span>
                </div>
                <div 
                  className={`checkbox-item ${selectedSpecialties.has('Peinados2') ? 'selected' : ''}`}
                  onClick={() => handleSpecialtyToggle('Peinados2')}
                >
                  <div className={`checkbox ${selectedSpecialties.has('Peinados2') ? 'checked' : ''}`}></div>
                  <span className="checkbox-label">Peinados</span>
                </div>
                <div 
                  className={`checkbox-item ${selectedSpecialties.has('Tratamientos capilares') ? 'selected' : ''}`}
                  onClick={() => handleSpecialtyToggle('Tratamientos capilares')}
                >
                  <div className={`checkbox ${selectedSpecialties.has('Tratamientos capilares') ? 'checked' : ''}`}></div>
                  <span className="checkbox-label">Tratamientos capilares</span>
                </div>
                <div className="empty-space"></div>
              </div>

              {/* Fila 6: Otro, + Añadir otro */}
              <div className="checkbox-row">
                <div className="checkbox-item">
                  <div className="checkbox"></div>
                  <span className="checkbox-label">Otro</span>
                </div>
                <div className="add-other-item" onClick={handleAddOther}>
                  <a href="#" className="add-other-link" onClick={(e) => e.preventDefault()}>
                    + Añadir otro
                  </a>
                </div>
                <div className="empty-space"></div>
                <div className="empty-space"></div>
              </div>

              {/* Especialidades personalizadas */}
              {customSpecialties.map((custom, index) => (
                <div key={`custom-${index}`} className="checkbox-row">
                  <div className="checkbox-item selected">
                    <div className="checkbox checked"></div>
                    <span className="checkbox-label">{custom}</span>
                  </div>
                  <div className="empty-space"></div>
                  <div className="empty-space"></div>
                  <div className="empty-space"></div>
                </div>
              ))}

              {/* Input para nueva especialidad */}
              {showOtherInput && (
                <div className="checkbox-row">
                  <div className="checkbox-item" style={{ flex: 2 }}>
                    <input
                      type="text"
                      value={otherValue}
                      onChange={(e) => setOtherValue(e.target.value)}
                      placeholder="Escribe la especialidad..."
                      style={{
                        padding: '8px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '14px',
                        width: '100%'
                      }}
                      autoFocus
                    />
                  </div>
                  <div className="checkbox-item">
                    <button
                      type="button"
                      onClick={handleOtherSubmit}
                      style={{
                        padding: '8px 16px',
                        background: '#8C623E',
                        border: 'none',
                        borderRadius: '6px',
                        color: 'white',
                        fontSize: '14px',
                        cursor: 'pointer',
                        width: '100%'
                      }}
                    >
                      Añadir
                    </button>
                  </div>
                  <div className="empty-space"></div>
                  <div className="empty-space"></div>
                </div>
              )}
            </div>

            <div className="action-buttons">
              <button 
                type="button" 
                className="back-btn"
                onClick={handleBackClick}
              >
                <div className="back-btn-icon">
                  <img src="/img/arrow-icon.png" alt="Volver" style={{transform: 'scaleX(-1)'}} />
                </div>
              </button>
              
              <button type="submit" className="next-btn">
                Siguiente
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Sección de imagen promocional */}
      <div className="image-section">
        <div className="promotional-image">
        </div>
      </div>
    </div>
  );
};

export default SpecialtiesPage;