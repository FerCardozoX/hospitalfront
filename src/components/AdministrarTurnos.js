import React, { useState } from 'react';
import './AdministrarTurnos.css';

function AdministrarTurnos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [turnos, setTurnos] = useState([
    // Aquí irían los turnos obtenidos de la base de datos
    { id: 1, paciente: 'Juan Gómez', fecha: '2022-01-01', hora: '10:00', medico: 'Dr. Pérez', especialidad: 'Cardiología' },
  ]);
  const [fechaFiltro, setFechaFiltro] = useState('');

  const handleSearch = () => {
    // Lógica para buscar turnos en la base de datos
  };

  const handleCreate = () => {
    // Lógica para crear un nuevo turno
  };

  return (
    <div className="turnos-container">
      <h2>Administrar Turnos</h2>
      <div className="filter-container">
        <input
          type="date"
          value={fechaFiltro}
          onChange={(e) => setFechaFiltro(e.target.value)}
        />
        <button onClick={handleSearch}>Filtrar</button>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar por paciente, médico, especialidad o día"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>
      <table className="turnos-table">
        <thead>
          <tr>
            <th>Paciente</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Médico</th>
            <th>Especialidad</th>
          </tr>
        </thead>
        <tbody>
          {turnos.map((turno) => (
            <tr key={turno.id}>
              <td>{turno.paciente}</td>
              <td>{turno.fecha}</td>
              <td>{turno.hora}</td>
              <td>{turno.medico}</td>
              <td>{turno.especialidad}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleCreate}>Crear Turno</button>
    </div>
  );
}

export default AdministrarTurnos;
