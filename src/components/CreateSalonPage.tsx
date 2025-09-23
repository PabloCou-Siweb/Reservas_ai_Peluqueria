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
    
    // Guardar los datos del salón
    updateUserData({
      salonName: formData.salonName,
      businessName: formData.businessName,
      address: formData.address,
      phone: formData.phone
    });
    
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
                placeholder="Nombre de la peluquería"
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
                <img src="/img/bag-icon.png" alt="Empresa" />
              </div>
            </div>

            <div className="input-group">
              <input
                type="text"
                name="address"
                placeholder="Dirección del local"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="form-input"
              />
              <div className="input-icon">
                <img src="/img/location-icon.png" alt="Ubicación" />
              </div>
            </div>

            <div className="input-group">
              <input
                type="tel"
                name="phone"
                placeholder="Número de teléfono"
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
