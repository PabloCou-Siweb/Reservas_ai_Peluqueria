import React, { useState } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import './ForgotPasswordPage.css';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPasswordPage: React.FC = () => {
  const { goBack } = useNavigation();
  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    email: ''
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
  };

  const handleBackClick = () => {
    goBack();
  };

  return (
    <div className="forgot-password-container">
      {/* Sección izquierda - Imagen promocional */}
      <div className="promotional-section">
        <div className="promotional-image">
          <div className="image-overlay">
          </div>
        </div>
      </div>

      {/* Sección derecha - Formulario de recuperación */}
      <div className="forgot-password-section">
        <div className="forgot-password-form-container">
          <h1 className="forgot-password-title">¿Olvidaste tu contraseña?</h1>
          <p className="forgot-password-subtitle">
            No te preocupes, te enviaremos las instrucciones para restablecer tu contraseña.
          </p>
          
          <form onSubmit={handleSubmit} className="forgot-password-form">
            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="form-input"
              />
              <div className="input-icon">
                <img src="/img/email-icon.png" alt="Email" />
              </div>
            </div>

            <div className="button-group">
              <button 
                type="button" 
                className="creation-back-btn"
                onClick={handleBackClick}
              >
                <div className="creation-back-btn-icon">
                  <img src="/img/arrow-icon.png" alt="Arrow" width="20" height="20" style={{transform: 'scaleX(-1)'}} />
                </div>
              </button>
              
              <button type="submit" className="reset-button">
                Restablecer contraseña
              </button>
            </div>
          </form>

          <div className="copyright">
            <span>© 2025 Bokifly</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
