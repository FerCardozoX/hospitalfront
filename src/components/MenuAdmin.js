import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

function MenuAdmin() {
  return (
    <div className="menu-container">
      <div className="menu-header">
        <button className="profile-button">Mi Perfil</button>
      </div>
      <div className="menu-card">
        <h2>Menú Administrativo</h2>
        <div className="menu-options">
          <Link to="/administrar-pacientes" className="menu-option">
            Administrar Pacientes
          </Link>
          <Link to="/administrar-medicos" className="menu-option">
            Administrar Médicos
          </Link>
          <Link to="/administrar-turnos" className="menu-option">
            Administrar Turnos
          </Link>
          <Link to="/ver-historial-medico" className="menu-option">
            Ver Historial Médico
          </Link>
          <Link to="/cargar-hospitalizacion" className="menu-option">
            Cargar Hospitalizaciones
          </Link>
          <Link to="/generar-reporte-medico" className="menu-option">
            Generar Reporte Médico
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MenuAdmin;
