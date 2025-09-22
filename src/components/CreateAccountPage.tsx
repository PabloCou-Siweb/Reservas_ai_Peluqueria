import React, { useState } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
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
  const [formData, setFormData] = useState<CreateAccountFormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: true
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
    // Aquí iría la lógica para crear la cuenta
    goNext();
  };

  const handleBackClick = () => {
    navigateTo('login');
  };

  const handleGoogleSignup = () => {
    // Aquí iría la lógica para registro con Google
    console.log('Google signup');
  };

  return (
    <div className="create-account-container">
      {/* Sección izquierda - Formulario */}
      <div className="form-section">
        <div className="form-container">
          <div className="step-indicator">
            <span>01/05</span>
            <div className="progress-dots">
              <div className="dot active"></div>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          </div>
          
          <h1 className="form-title">Crea tu cuenta</h1>
          <p className="form-subtitle">
            Introduce tus datos personales y de acceso para registrar tu cuenta como administrador de tu establecimiento.
          </p>
          
          <form onSubmit={handleSubmit} className="create-account-form">
            <div className="input-group">
              <input
                type="text"
                name="fullName"
                placeholder="Nombre y apellidos"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="form-input"
              />
              <div className="input-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
            </div>

            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="form-input"
              />
              <div className="input-icon">
                <img src="/img/email-icon.png" alt="Email" />
              </div>
            </div>

            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="form-input"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                <img 
                  src={showPassword ? "/img/eye-off-icon.png" : "/img/eye-icon.png"} 
                  alt={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"} 
                />
              </button>
            </div>
            
            <div className="password-hint">
              Utilice 8 o más caracteres con una combinación de letras, números y símbolos
            </div>

            <div className="input-group">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirmar contraseña"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className="form-input"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <img 
                  src={showConfirmPassword ? "/img/eye-off-icon.png" : "/img/eye-icon.png"} 
                  alt={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"} 
                />
              </button>
            </div>

            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleInputChange}
                  className="checkbox-input"
                />
                <span className="checkbox-text">
                  Acepte nuestros Términos de uso y Política de privacidad
                </span>
              </label>
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

          <div className="google-signup">
            <button 
              type="button" 
              className="google-button"
              onClick={handleGoogleSignup}
            >
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

export default CreateAccountPage;
