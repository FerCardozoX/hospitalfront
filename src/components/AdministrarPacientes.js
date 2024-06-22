import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './AdministrarPacientes.css';

function AdministrarPacientes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [pacientes, setPacientes] = useState([
    { apellido: 'Gómez', nombre: 'Juan', dni: '12345678' },
    { apellido: 'Pérez', nombre: 'Ana', dni: '87654321' },
  ]);
  const history = useHistory();

  const handleSearch = () => {
    // Lógica para buscar pacientes en la base de datos
  };

  const handleView = (dni) => {
    history.push(`/administrar-paciente/${dni}`);
  };

  const handleCreate = () => {
    history.push('/crear-paciente');
  };

  return (
    <div className="pacientes-container">
      <h2>Administrar Pacientes</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar por apellido, nombre o DNI"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>
      <table className="patients-table">
        <thead>
          <tr>
            <th>Apellido</th>
            <th>Nombre</th>
            <th>DNI</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((paciente) => (
            <tr key={paciente.dni}>
              <td>{paciente.apellido}</td>
              <td>{paciente.nombre}</td>
              <td>{paciente.dni}</td>
              <td>
                <button onClick={() => handleView(paciente.dni)}>Ver</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleCreate}>Crear Paciente</button>
    </div>
  );
}

export default AdministrarPacientes;