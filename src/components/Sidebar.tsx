import React from 'react';
import { useUser } from '../contexts/UserContext';
import { useNavigation } from '../contexts/NavigationContext';
import './Sidebar.css';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const { userData } = useUser();
  const { navigateTo, currentPage } = useNavigation();

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <div className="logo">
          <img src="/img/black-logo.png" alt="Bokifly" className="logo-img" />
        </div>
        <button className="hamburger-menu" onClick={onToggle}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div className="sidebar-search">
        <input
          type="text"
          placeholder="Buscar..."
          className="search-input"
        />
        <div className="search-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div 
          className="nav-item"
          onClick={() => navigateTo('dashboard')}
        >
          <div className="nav-icon">
            <img src="/img/presentation-icon.png" alt="Citas" />
          </div>
          <span>Citas</span>
        </div>
        <div 
          className="nav-item"
          onClick={() => navigateTo('agenda')}
        >
          <div className="nav-icon">
            <img src="/img/clock-icon2.png" alt="Agenda" />
          </div>
          <span>Agenda</span>
        </div>
        <div className="nav-item">
          <div className="nav-icon">
            <img src="/img/presentation-icon.png" alt="Tratamientos" />
          </div>
          <span>Tratamientos</span>
        </div>
        <div className="nav-item">
          <div className="nav-icon">
            <img src="/img/user-icon2.png" alt="Especialistas" />
          </div>
          <span>Especialistas</span>
        </div>
        <div 
          className="nav-item"
          onClick={() => navigateTo('clientes')}
        >
          <div className="nav-icon">
            <img src="/img/users-icon.png" alt="Clientes" />
          </div>
          <span>Clientes</span>
        </div>
        <div className="nav-item">
          <div className="nav-icon">
            <img src="/img/phone_call-icon.png" alt="Llamadas" />
          </div>
          <span>Llamadas</span>
        </div>
      </nav>

      <div className="sidebar-widget">
        <div className="widget-illustration">
          <img src="/img/minutos-img.png" alt="Minutos restantes" className="minutos-illustration" />
        </div>
        <div className="widget-content">
          <div className="minutes-info">
            <div className="clock-icon">
              <img src="/img/clock-icon.png" alt="Reloj" />
            </div>
            <span><b>300</b> minutos restantes</span>
          </div>
          <button className="buy-minutes-btn">
            <div className="plus-icon">
              <img src="/img/add-icon.png" alt="Añadir" />
            </div>
            <span>Comprar más minutos</span>
          </button>
        </div>
      </div>

      <div className="sidebar-profile">
        <div className="profile-avatar">
          <img src="/img/user-icon.png" alt="Usuario" className="avatar-icon" />
        </div>
        <div className="profile-info">
          <div className="profile-name">{userData.salonName}</div>
          <div className="profile-email">
            <span>{userData.email}</span>
          </div>
        </div>
        <div className="profile-actions">
          <button className="export-btn" onClick={() => navigateTo('perfil')}>
            <img src="/img/export-icon.png" alt="Exportar" width="28" height="28" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
