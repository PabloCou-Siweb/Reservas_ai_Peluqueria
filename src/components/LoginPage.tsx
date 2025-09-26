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
              <label className="form-label">Correo electrónico</label>
              <div className="input-container">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
                <div className="input-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="form-field">
              <label className="form-label">Tu contraseña</label>
              <div className="input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
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
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {showPassword ? (
                      <>
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
                        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
                        <line x1="2" y1="2" x2="22" y2="22"/>
                      </>
                    ) : (
                      <>
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </>
                    )}
                  </svg>
                </button>
              </div>
            </div>

            <div className="forgot-password">
              <a href="#" className="forgot-link" onClick={(e) => { e.preventDefault(); navigateTo('forgot-password'); }}>
                ¿Olvidaste tu contraseña?
              </a>
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

            <div className="register-link">
              <span>¿No tienes cuenta? </span>
              <a href="#" className="register-text" onClick={(e) => { e.preventDefault(); navigateTo('create-account'); }}>
                Regístrate
              </a>
            </div>

            <button type="submit" className="login-button">
              Iniciar sesión
            </button>
          </form>
        </div>

        <div className="copyright">
          <span>© 2025 Bokifty</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;