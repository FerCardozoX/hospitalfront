import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './AdministrarMedicos.css';

function AdministrarMedicos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [medicos, setMedicos] = useState([
    { apellido: 'Gómez', nombre: 'Juan', dni: '12345678', especialidad: 'Cardiología' },
    { apellido: 'Pérez', nombre: 'Ana', dni: '87654321', especialidad: 'Pediatría' },
  ]);
  const history = useHistory();

  const handleSearch = () => {
    // Lógica para buscar médicos en la base de datos
  };

  const handleView = (dni) => {
    history.push(`/administrar-medico/${dni}`);
  };

  const handleCreate = () => {
    history.push('/crear-medico');
  };

  return (
    <div className="medicos-container">
      <h2>Administrar Médicos</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar por apellido, nombre, DNI o especialidad"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>
      <table className="medicos-table">
        <thead>
          <tr>
            <th>Apellido</th>
            <th>Nombre</th>
            <th>DNI</th>
            <th>Especialidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {medicos.map((medico) => (
            <tr key={medico.dni}>
              <td>{medico.apellido}</td>
              <td>{medico.nombre}</td>
              <td>{medico.dni}</td>
              <td>{medico.especialidad}</td>
              <td>
                <button onClick={() => handleView(medico.dni)}>Ver</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleCreate}>Crear Médico</button>
    </div>
  );
}

export default AdministrarMedicos;
