import React from 'react';
import './ServiceGrid.css';

interface ServiceCategory {
  id: string;
  name: string;
  specialists: number;
  icon: string;
}

interface ServiceGridProps {
  categories: ServiceCategory[];
  onServiceClick?: (category: ServiceCategory) => void;
  selectedId?: string | null; // opcional: permite marcar una card como seleccionada
}

const ServiceGrid: React.FC<ServiceGridProps> = ({ categories, onServiceClick, selectedId }) => {
  const getIconPath = (iconType: string) => {
    const iconMap: { [key: string]: string } = {
      'hair': '/img/tratamiento_capilar-layer.png',
      'color': '/img/coloracion-layer.png',
      'style': '/img/peinados-layer.png',
      'cut': '/img/corte-layer.png',
      'wax': '/img/depilacion-layer.png',
      'pedicure': '/img/pedicura-layer.png',
      'manicure': '/img/manicura-layer.png',
      'eyebrows': '/img/cejas_pestañas-layer.png',
      'bride': '/img/novias-layer.png',
      'barber': '/img/barberia-layer.png',
      'nails': '/img/unhas-layer.png',
      'treatment': '/img/tratamientos-layer.png',
      'kids': '/img/ninhos_layer.png',
    };
    return iconMap[iconType] || '/img/bag-icon.png';
  };

  return (
    <div className="service-grid-container">
      <div className="services-grid">
        {categories.map((category) => (
          <div 
            key={category.id} 
            className={`service-card ${selectedId === category.id ? 'selected' : ''}`}
            onClick={() => onServiceClick?.(category)}
          >
            <div className="service-icon">
              <img 
                src={getIconPath(category.icon)} 
                alt={category.name}
                className="service-icon-img"
              />
            </div>
            <div className="service-content">
              <h3 className="service-name">{category.name}</h3>
              <p className="service-specialists">{category.specialists} especialistas</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceGrid;