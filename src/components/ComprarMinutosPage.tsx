import React, { useState } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import { useUser } from '../contexts/UserContext';
import Sidebar from './Sidebar';
import ConfirmarCompraMinutosModal from './ConfirmarCompraMinutosModal';
import CompraConfirmadaModal from './CompraConfirmadaModal';
import './ComprarMinutosPage.css';

const ComprarMinutosPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const { userData } = useUser();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedPack, setSelectedPack] = useState<{
    name: string;
    minutes: string;
    price: string;
  } | null>(null);

  const currentMinutes = 480;
  const totalMinutes = 500;
  const percentage = (currentMinutes / totalMinutes) * 100;

  const handleComprar = (pack: any) => {
    setSelectedPack({
      name: pack.name,
      minutes: pack.minutes,
      price: pack.price
    });
    setShowConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
    setSelectedPack(null);
  };

  const handleConfirmPurchase = () => {
    setShowConfirmModal(false);
    setShowSuccessModal(true);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setSelectedPack(null);
  };

  const packs = [
    {
      id: 1,
      name: "Pack básico",
      price: "€15",
      minutes: "100 minutos",
      description: "Perfecto para comenzar llamadas ocasionales",
      features: [
        "Llamadas de alta calidad",
        "Soporte técnico básico",
        "Válido por 30 días"
      ]
    },
    {
      id: 2,
      name: "Pack estándar",
      price: "€35",
      minutes: "250 minutos",
      description: "Ideal para clínicas con actividad regular",
      features: [
        "Llamadas de alta calidad",
        "Soporte técnico prioritario",
        "Válido por 60 días",
        "Reporte de uso detallado"
      ]
    },
    {
      id: 3,
      name: "Pack profesional",
      price: "€65",
      minutes: "500 minutos",
      description: "Para clínicas con alto volumen de llamadas",
      features: [
        "Llamadas de alta calidad",
        "Soporte técnico 24/7",
        "Válido por 90 días",
        "Reportes avanzados",
        "Grabación de llamadas"
      ]
    },
    {
      id: 4,
      name: "Pack premium",
      price: "€120",
      minutes: "1000 minutos",
      description: "Máximo valor para grabaciones grandes",
      features: [
        "Llamadas de alta calidad",
        "Soporte técnico 24/7",
        "Válido por 120 días",
        "Reportes avanzados",
        "Grabación y transcripción de llamadas"
      ]
    }
  ];

  return (
    <div className="comprar-minutos-container">
      <Sidebar isOpen={true} onToggle={() => {}} />

      <div className="main-content">
        {/* Header */}
        <div className="page-header">
          <div className="header-top">
            <div className="breadcrumbs">
              <span>Inicio</span>
              <span className="separator">/</span>
              <span>Comprar más minutos</span>
            </div>
            <div className="header-buttons">
              <div className="notification-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
                <div className="notification-dot"></div>
              </div>
              <div className="settings-btn" onClick={() => navigateTo('configuracion')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
              </div>
            </div>
          </div>
          <div className="header-title-section">
            <button className="page-back-btn" onClick={() => navigateTo('dashboard')}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.5">
                <polyline points="15,18 9,12 15,6"/>
              </svg>
            </button>
            <h1>Comprar más minutos</h1>
          </div>
        </div>

        {/* Current Minutes Section */}
        <div className="current-minutes-card">
          <div className="current-minutes-header">
            <h3>Minutos actuales</h3>
            <div className="info-icon">
              <img src="/img/alert-icon.png" alt="Alert" width="16" height="16" />
            </div>
          </div>
          <div className="current-minutes-content">
            <div className="minutes-display">
              <span className="minutes-number">{currentMinutes}</span>
              <span className="minutes-text">Minutos</span>
            </div>
            <div className="progress-section">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <div className="progress-text">
                <span>{currentMinutes}/500</span>
              </div>
            </div>
          </div>
        </div>

        {/* Packs Section */}
        <div className="packs-section">
          <div className="packs-grid">
            {packs.map((pack) => (
              <div key={pack.id} className="pack-card">
                <div className="pack-header">
                  <h4 className="pack-name">{pack.name}</h4>
                  <div className="pack-price">
                    <span className="price">{pack.price}</span>
                    <span className="minutes">{pack.minutes}</span>
                  </div>
                </div>
                <div className="pack-description">
                  <p>{pack.description}</p>
                </div>
                <div className="pack-features">
                  {pack.features.map((feature, index) => (
                    <div key={index} className="feature-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20,6 9,17 4,12"/>
                      </svg>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <button className="comprar-btn" onClick={() => handleComprar(pack)}>
                  Comprar
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <p>© 2025 Bokifly</p>
        </div>
      </div>

      {/* Modals */}
      {selectedPack && (
        <ConfirmarCompraMinutosModal
          isOpen={showConfirmModal}
          onClose={handleCloseConfirmModal}
          onConfirm={handleConfirmPurchase}
          selectedPack={selectedPack}
          currentMinutes={currentMinutes}
        />
      )}
      
      {selectedPack && (
        <CompraConfirmadaModal
          isOpen={showSuccessModal}
          onClose={handleCloseSuccessModal}
          pack={selectedPack}
        />
      )}
    </div>
  );
};

export default ComprarMinutosPage;
