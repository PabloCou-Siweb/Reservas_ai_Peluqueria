import React, { useState } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import './CreateSalonPage.css';

interface CreateSalonFormData {
  salonName: string;
  businessName: string;
  address: string;
  phone: string;
}

const CreateSalonPage: React.FC = () => {
  const { goNext, goBack } = useNavigation();
  const [formData, setFormData] = useState<CreateSalonFormData>({
    salonName: '',
    businessName: '',
    address: '',
    phone: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Aquí iría la lógica para crear la peluquería
    goNext();
  };

  const handleBackClick = () => {
    goBack();
  };

  return (
    <div className="create-salon-container">
      {/* Sección izquierda - Formulario */}
      <div className="form-section">
        <div className="form-container">
          <div className="step-indicator">
            <span>02/05</span>
            <div className="progress-dots">
              <div className="dot active"></div>
              <div className="dot active"></div>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
          
          <h1 className="form-title">Crea tu peluquería</h1>
          <p className="form-subtitle">
            Datos de tu establecimiento
          </p>
          
          <form onSubmit={handleSubmit} className="create-salon-form">
            <div className="input-group">
              <input
                type="text"
                name="salonName"
                placeholder="Nombre del local"
                value={formData.salonName}
                onChange={handleInputChange}
                required
                className="form-input"
              />
              <div className="input-icon">
                <img src="/img/user-icon.png" alt="Usuario" />
              </div>
            </div>

            <div className="input-group">
              <input
                type="text"
                name="businessName"
                placeholder="Razón social"
                value={formData.businessName}
                onChange={handleInputChange}
                required
                className="form-input"
              />
              <div className="input-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
              </div>
            </div>

            <div className="input-group">
              <input
                type="text"
                name="address"
                placeholder="Dirección completa"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="form-input"
              />
              <div className="input-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
            </div>

            <div className="input-group">
              <input
                type="tel"
                name="phone"
                placeholder="Teléfono"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="form-input"
              />
              <div className="input-icon">
                <img src="/img/phone-icon.png" alt="Teléfono" />
              </div>
            </div>

            <div className="button-group">
              <button 
                type="button" 
                className="back-button"
                onClick={handleBackClick}
              >
                <div className="button-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15,18 9,12 15,6"/>
                  </svg>
                </div>
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
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSalonPage;
