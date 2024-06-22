import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

function MenuMedico() {
  return (
    <div className="menu-container">
      <div className="menu-header">
        <button className="profile-button">Mi Perfil</button>
      </div>
      <div className="menu-card">
        <h2>Menú Médico</h2>
        <div className="menu-options">
          <Link to="/cargar-tratamiento" className="menu-option">
            Cargar Tratamiento
          </Link>
          <Link to="/ver-historial-medico" className="menu-option">
            Ver Historial Médico
          </Link>
          <Link to="/cargar-hospitalizacion" className="menu-option">
            Cargar Hospitalizaciones
          </Link>
          <Link to="/ver-turnos" className="menu-option">
            Ver Turnos
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MenuMedico;
