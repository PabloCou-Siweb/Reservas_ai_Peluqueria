import React, { useState } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import { useUser } from '../contexts/UserContext';
import './CreateAccountPage.css';

interface CreateAccountFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

const CreateAccountPage: React.FC = () => {
  const { goNext, navigateTo } = useNavigation();
  const { updateUserData } = useUser();
  const [formData, setFormData] = useState<CreateAccountFormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    updateUserData({
      email: formData.email,
      salonName: formData.fullName
    });
    
    goNext();
  };

  const handleBackClick = () => {
    navigateTo('login');
  };

  const handleGoogleSignup = () => {
    console.log('Google signup');
  };

  return (
    <div className="create-account-page">
      {/* Formulario */}
      <div className="form-section">
        <div className="form-wrapper">
          {/* Indicador de progreso */}
          <div className="progress-indicator">
            <span className="step-text">01/05</span>
            <div className="dots">
              <div className="dot active"></div>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>

          {/* Título */}
          <h1 className="page-title">Crea tu cuenta</h1>
          <p className="page-subtitle">
            Introduce tus datos personales y de acceso para registrar tu cuenta como administrador de tu establecimiento.
          </p>

          {/* Formulario */}
          <form className="account-form" onSubmit={handleSubmit}>
            {/* Nombre */}
            <div className="field-group">
              <input
                type="text"
                name="fullName"
                placeholder="Nombre y apellidos"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="create-account-input"
              />
              <div className="field-icon">
                <img src="/img/user-icon.png" alt="Usuario" />
              </div>
            </div>

            {/* Email */}
            <div className="field-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="create-account-input"
              />
              <div className="field-icon">
                <img src="/img/email-icon.png" alt="Email" />
              </div>
            </div>

            {/* Contraseña */}
            <div className="field-group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="create-account-input"
                autoComplete="new-password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                <img 
                  src={showPassword ? "/img/eye-off-icon.png" : "/img/eye-icon.png"} 
                  alt={showPassword ? "Ocultar" : "Mostrar"} 
                />
              </button>
            </div>
            
            <div className="password-help">
              Utilice 8 o más caracteres con una combinación de letras, números y símbolos
            </div>

            {/* Confirmar contraseña */}
            <div className="field-group">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirmar contraseña"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className="create-account-input"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <img 
                  src={showConfirmPassword ? "/img/eye-off-icon.png" : "/img/eye-icon.png"} 
                  alt={showConfirmPassword ? "Ocultar" : "Mostrar"} 
                />
              </button>
            </div>

            {/* Términos */}
            <div className="terms-group">
              <label className="terms-label">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleInputChange}
                  className="terms-checkbox"
                />
                <span className="terms-text">
                  Acepte nuestros Términos de uso y Política de privacidad
                </span>
              </label>
            </div>

            {/* Botones */}
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

          {/* Separador */}
          <div className="separator">
            <div className="separator-line"></div>
            <div className="separator-dot"></div>
            <div className="separator-line"></div>
          </div>

          {/* Google */}
          <button className="google-btn" onClick={handleGoogleSignup}>
            <div className="google-icon">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </div>
            <span>Regístrate con google</span>
          </button>
        </div>
      </div>

      {/* Imagen */}
      <div className="image-section">
        <div className="promo-image"></div>
      </div>
    </div>
  );
};

export default CreateAccountPage;