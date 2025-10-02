import React from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import { useUser } from '../contexts/UserContext';
import './ReadyPage.css';

const ReadyPage: React.FC = () => {
  const { goBack, navigateTo } = useNavigation();
  const { login, userData } = useUser();

  const handleBackClick = () => {
    goBack();
  };

  const handleLoginClick = () => {
    // Completar el proceso de registro e iniciar sesión automáticamente
    // Usar los datos del usuario que se han ido recopilando durante el proceso de registro
    login({
      salonName: userData.salonName || 'Mi Peluquería',
      email: userData.email || 'usuario@ejemplo.com',
      businessName: userData.businessName || 'Mi Negocio',
      address: userData.address || 'Dirección del salón',
      phone: userData.phone || '+34 600 000 000'
    });
    
    // Navegar al dashboard como usuario autenticado
    navigateTo('dashboard');
  };

  return (
    <div className="ready-page">
      {/* Sección del formulario */}
      <div className="form-section">
        <div className="form-wrapper">
          {/* Paso 7 */}
          <div className="step-label">Paso 7</div>
          
          {/* Indicador de progreso */}
          <div className="progress-indicator">
            <span className="step-text">05/05</span>
            <div className="dots">
              <div className="dot active"></div>
              <div className="dot active"></div>
              <div className="dot active"></div>
              <div className="dot active"></div>
              <div className="dot active"></div>
            </div>
          </div>
          
          <h1 className="page-title">Tu peluquería ya está preparada.</h1>
          <p className="page-subtitle">
            Empieza a agendar y gestionar citas con la ayuda de tu asistente virtual.
          </p>
          
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
            
            <button 
              type="button" 
              className="login-btn"
              onClick={handleLoginClick}
            >
              Comenzar
            </button>
          </div>
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

export default ReadyPage;