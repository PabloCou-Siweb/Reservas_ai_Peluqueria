import React from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import './ReadyPage.css';

const ReadyPage: React.FC = () => {
  const { goBack, navigateTo } = useNavigation();
  
  const handleBackClick = () => {
    goBack();
  };

  const handleLoginClick = () => {
    // Navegar a la página de login
    navigateTo('login');
  };

  return (
    <div className="ready-container">
      {/* Sección izquierda - Formulario */}
      <div className="form-section">
        <div className="form-container">
          <div className="step-indicator">
            <span>05/05</span>
            <div className="progress-dots">
              <div className="dot active"></div>
              <div className="dot active"></div>
              <div className="dot active"></div>
              <div className="dot active"></div>
              <div className="dot active"></div>
            </div>
          </div>
          
          <h1 className="form-title">Tu peluquería ya está preparada.</h1>
          <p className="form-subtitle">
            Empieza a agendar y gestionar citas con la ayuda de tu asistente virtual.
          </p>
          
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
            
            <button 
              type="button" 
              className="login-button"
              onClick={handleLoginClick}
            >
              <span>Iniciar sesión</span>
            </button>
          </div>
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

export default ReadyPage;
