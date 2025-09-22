import React, { useState } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import './LoginPage.css';

interface LoginFormData {
  email: string;
  password: string;
  acceptTerms: boolean;
}

const LoginPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    acceptTerms: true
  });

  const [showPassword, setShowPassword] = useState(false);

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
    // Aquí iría la lógica de autenticación
  };

  return (
    <div className="login-container">
      {/* Sección izquierda - Imagen promocional */}
      <div className="promotional-section">
        <div className="promotional-image">
          <div className="image-overlay">
            <div className="stats-bubble top-right">
            </div>
          </div>
        </div>
      </div>

      {/* Sección derecha - Formulario de login */}
      <div className="login-section">
        <div className="login-form-container">
          <h1 className="login-title">Iniciar sesión</h1>
          <p className="login-subtitle">Accede a tu sistema de reservas inteligente.</p>
          
          <form onSubmit={handleSubmit} className="login-form">
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
                <img src="/img/email-icon.png"  />
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

            <div className="forgot-password">
              <a href="#" className="forgot-link" onClick={(e) => { e.preventDefault(); navigateTo('forgot-password'); }}>¿Olvidaste tu contraseña?</a>
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
              <button type="submit" className="login-button">
                <span>Iniciar sesión</span>
              </button>
            </div>
          </form>

          <div className="register-link">
            <span>¿No tienes cuenta? </span>
            <a href="#" className="register-text" onClick={(e) => { e.preventDefault(); navigateTo('create-account'); }}>Registrate</a>
          </div>

          <div className="copyright">
            <span>© 2025 Bokifty</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
