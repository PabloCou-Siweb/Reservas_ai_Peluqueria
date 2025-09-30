import React, { useState } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import { useUser } from '../contexts/UserContext';
import './LoginPage.css';

interface LoginFormData {
  email: string;
  password: string;
  acceptTerms: boolean;
}

const LoginPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const { login } = useUser();
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
    
    // Simular login con datos de ejemplo
    login({
      salonName: 'Peluquería Gabriel',
      email: formData.email || 'info@gabrielpeluquero.com',
      businessName: 'Gabriel Peluquero S.L.',
      address: 'Calle Principal 123, Madrid',
      phone: '+34 600 123 456'
    });
    
    // Aquí iría la lógica de autenticación
    // Por ahora, navegamos directamente al dashboard
    navigateTo('dashboard');
  };

  return (
    <div className="login-container">
      {/* Sección izquierda - Imagen promocional */}
      <div className="promotional-section">
        <div className="promotional-image">
          <div className="image-overlay">
          </div>
        </div>
      </div>

      {/* Sección derecha - Formulario de login */}
      <div className="login-section">
        <div className="login-form-container">
          <div className="login-header">
            <h1 className="login-title">Iniciar sesión</h1>
            <p className="login-subtitle">Accede a tu sistema de reservas inteligente.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-field">
              <div className="input-container">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  required
                  className="form-input"
                />
                <div className="input-icon">
                  <img src="/img/email-icon.png" alt="Email" width="16" height="16" />
                </div>
              </div>
            </div>

            <div className="form-field">
              <div className="input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Contraseña"
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
                    width="16" 
                    height="16" 
                  />
                </button>
              </div>
              <div className="forgot-password">
                <a href="#" className="forgot-link" onClick={(e) => { e.preventDefault(); navigateTo('forgot-password'); }}>
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
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

            <button type="submit" className="login-page-button">
              <div className="login-page-button-icon">
                <img src="/img/arrow-icon.png" alt="Arrow" width="20" height="20" />
              </div>
              <div className="login-page-button-text">
                Iniciar sesión
              </div>
            </button>

            <div className="register-link">
              <span>¿No tienes cuenta? </span>
              <a href="#" className="register-text" onClick={(e) => { e.preventDefault(); navigateTo('create-account'); }}>
                Regístrate
              </a>
            </div>
          </form>
        </div>

        <div className="copyright">
          <span>© 2025 Bokifly</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;