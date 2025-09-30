import React from 'react';
import './ConfirmarCompraMinutosModal.css';

interface ConfirmarCompraMinutosModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedPack: {
    name: string;
    minutes: string;
    price: string;
  };
  currentMinutes: number;
}

const ConfirmarCompraMinutosModal: React.FC<ConfirmarCompraMinutosModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  selectedPack,
  currentMinutes
}) => {
  if (!isOpen) return null;

  // Calcular los minutos totales después de la compra
  const minutesToAdd = parseInt(selectedPack.minutes.split(' ')[0]);
  const newTotalMinutes = currentMinutes + minutesToAdd;

  // Obtener el precio original y el precio con descuento
  const getPriceInfo = (packName: string, price: string) => {
    if (packName === "Pack estándar") {
      return {
        originalPrice: "40€",
        currentPrice: "35€",
        costPerMinute: "€0.14"
      };
    }
    return {
      originalPrice: null,
      currentPrice: price,
      costPerMinute: "€0.15"
    };
  };

  const priceInfo = getPriceInfo(selectedPack.name, selectedPack.price);

  return (
    <div className="confirmar-compra-overlay">
      <div className="confirmar-compra-modal">
        {/* Header */}
        <div className="confirmar-compra-header">
          <div className="confirmar-compra-title-section">
            <h2 className="confirmar-compra-title">Confirmación de compra</h2>
          </div>
          <button className="confirmar-compra-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="confirmar-compra-content">
          {/* Pack Data Section */}
          <div className="pack-data-section">
            <h3 className="pack-title">{selectedPack.name}</h3>
            <div className="pack-info">
              <div className="info-row">
                <span className="info-label">Minutos incluidos:</span>
                <span className="info-value">{selectedPack.minutes}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Precio:</span>
                <span className="info-value">
                  {priceInfo.originalPrice && (
                    <span className="original-price">{priceInfo.originalPrice}</span>
                  )}
                  <span className="current-price">{priceInfo.currentPrice}</span>
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">Costo por minuto:</span>
                <span className="info-value">{priceInfo.costPerMinute}</span>
              </div>
            </div>
          </div>

          {/* Account Summary Section */}
          <div className="account-summary-section">
            <h3 className="summary-title">Resumen de tu cuenta</h3>
            <div className="summary-info">
              <div className="summary-row">
                <span className="summary-label">Minutos actuales:</span>
                <span className="summary-value">{currentMinutes}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Minutos a agregar:</span>
                <span className="summary-value">+ {minutesToAdd}</span>
              </div>
              <div className="summary-row total-row">
                <span className="summary-label">Total minutos:</span>
                <span className="summary-value total-value">{newTotalMinutes} minutos</span>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="features-section">
            <h3 className="features-title">Lo que incluye:</h3>
            <div className="features-content">
              <div className="feature-item">Llamadas de alta calidad</div>
              <div className="feature-item">Soporte técnico prioritario</div>
              <div className="feature-item">Válido por 60 días</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="confirmar-compra-actions">
          <button className="btn-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn-confirm" onClick={onConfirm}>
            Confirmar
          </button>
        </div>

        {/* Security Notice */}
        <div className="security-notice">
          <div className="security-icon">
            <img src="/img/check-icon.png" alt="Check" width="20" height="20" />
          </div>
          <div className="security-text">
            <h4 className="security-title">Pago 100% seguro</h4>
            <p className="security-description">
              Tu información está protegida con encriptación de nivel bancario
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmarCompraMinutosModal;
