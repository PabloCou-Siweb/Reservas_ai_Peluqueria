import React, { useState } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import { useUser } from '../contexts/UserContext';
import './CreateSalonPage.css';

interface CreateSalonFormData {
  salonName: string;
  businessName: string;
  address: string;
  phone: string;
}

const CreateSalonPage: React.FC = () => {
  const { goNext, goBack } = useNavigation();
  const { updateUserData } = useUser();
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
    
    updateUserData({
      salonName: formData.salonName,
      businessName: formData.businessName,
      address: formData.address,
      phone: formData.phone
    });
    
    goNext();
  };

  const handleBackClick = () => {
    goBack();
  };

  return (
    <div className="create-salon-page">
      {/* Sección del formulario */}
      <div className="form-section">
        <div className="form-wrapper">
          {/* Indicador de progreso */}
          <div className="progress-indicator">
            <span className="step-text">02/05</span>
            <div className="dots">
              <div className="dot active"></div>
              <div className="dot active"></div>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
          
          <h1 className="page-title">Datos de tu establecimiento</h1>
          
          <form onSubmit={handleSubmit} className="salon-form">
            <div className="field-group">
              <input
                type="text"
                name="salonName"
                placeholder="Nombre del local"
                value={formData.salonName}
                onChange={handleInputChange}
                required
                className="form-field"
              />
              <div className="field-icon">
                <img src="/img/home-icon.png" alt="Casa" />
              </div>
            </div>

            <div className="field-group">
              <input
                type="text"
                name="businessName"
                placeholder="Razón social"
                value={formData.businessName}
                onChange={handleInputChange}
                required
                className="form-field"
              />
              <div className="field-icon">
                <img src="/img/building-icon.png" alt="Edificio" />
              </div>
            </div>

            <div className="field-group">
              <input
                type="text"
                name="address"
                placeholder="Dirección completa"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="form-field"
              />
              <div className="field-icon">
                <img src="/img/location-icon.png" alt="Ubicación" />
              </div>
            </div>

            <div className="field-group">
              <input
                type="tel"
                name="phone"
                placeholder="Teléfono"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="form-field"
              />
              <div className="field-icon">
                <img src="/img/phone-icon.png" alt="Teléfono" />
              </div>
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
        <div className="promo-image"></div>
      </div>
    </div>
  );
};

export default CreateSalonPage;