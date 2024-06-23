import React, { useState, useEffect } from 'react';
import './VerTurnos.css';
import axios from 'axios';

function VerTurnos() {
  const [turnos, setTurnos] = useState([]);
  const [fechaFiltro, setFechaFiltro] = useState('');

  const fetchCitas = async () => {
    try {
      const response = await axios.get('https://proyectohospital.onrender.com/GestionHospital/getcitas/');
      setTurnos(response.data); // Suponiendo que el servidor devuelve un array de citas
    } catch (error) {
      console.error('Error al obtener las citas:', error);
    }
  };

  useEffect(() => {
    fetchCitas();
  }, []); // Se ejecuta solo una vez al cargar el componente

  const handleFilter = async () => {
    try {
      const response = await axios.get(`https://proyectohospital.onrender.com/GestionHospital/getcitas/`);
      setTurnos(response.data); 
    } catch (error) {
      console.error('Error al filtrar las citas:', error);
    }
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
              <td>{turno.idPaciente_id}</td>
              <td>{turno.fechaCita}</td>
              <td>{turno.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VerTurnos;
