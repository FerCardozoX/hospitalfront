import React, { useState } from 'react';
import './VerTurnos.css';

function VerTurnos() {
  const [turnos, setTurnos] = useState([
    // Aquí irían los turnos obtenidos de la base de datos
    { id: 1, paciente: 'Juan Gómez', fecha: '2022-01-01', hora: '10:00' },
  ]);
  const [fechaFiltro, setFechaFiltro] = useState('');

  const handleFilter = () => {
    // Lógica para filtrar turnos en la base de datos
  };

  return (
    <div className="turnos-container">
      <h2>Turnos</h2>
      <div className="filter-container">
        <input
          type="date"
          value={fechaFiltro}
          onChange={(e) => setFechaFiltro(e.target.value)}
        />
        <button onClick={handleFilter}>Filtrar</button>
      </div>
      <table className="turnos-table">
        <thead>
          <tr>
            <th>Paciente</th>
            <th>Fecha</th>
            <th>Hora</th>
          </tr>
        </thead>
        <tbody>
          {turnos.map((turno) => (
            <tr key={turno.id}>
              <td>{turno.paciente}</td>
              <td>{turno.fecha}</td>
              <td>{turno.hora}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VerTurnos;
