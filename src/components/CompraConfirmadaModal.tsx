import React from 'react';
import './CompraConfirmadaModal.css';

interface CompraConfirmadaModalProps {
  isOpen: boolean;
  onClose: () => void;
  pack: { name: string; minutes: string; price: string } | null;
}

const CompraConfirmadaModal: React.FC<CompraConfirmadaModalProps> = ({ isOpen, onClose, pack }) => {
  if (!isOpen || !pack) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close" onClick={onClose}>×</button>
        <div className="content">
          <div className="icon">
            <img src="/img/check-icon.png" alt="Check" width="20" height="20" />
          </div>
          <div className="text">
            <div className="title">Pack de {pack.minutes} comprado</div>
            <div className="desc">Se han agregado {pack.minutes} a tu cuenta.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompraConfirmadaModal;