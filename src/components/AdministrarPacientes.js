import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mockPacientes = [
  { id: 1, nombre: 'Juan', apellido: 'Perez', dni: '12345678' },
  { id: 2, nombre: 'María', apellido: 'González', dni: '87654321' },
  { id: 3, nombre: 'Pedro', apellido: 'López', dni: '56781234' },
];

function AdministrarPacientes() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPacientes, setFilteredPacientes] = useState(mockPacientes);

  const handleSearch = () => {
    const filtered = mockPacientes.filter(
      paciente =>
        paciente.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paciente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paciente.dni.includes(searchTerm)
    );
    setFilteredPacientes(filtered);
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const viewPaciente = id => {
    navigate(`/ver-paciente/${id}`);
  };
  const goBack = () => {
    navigate('/menu-admin');
  };

  return (
    <div>
      <button onClick={goBack}>Volver</button>
      <h1>Administrar Pacientes</h1>
      <button onClick={() => navigate('/crear-paciente')}>Crear Nuevo Paciente</button>
      <h2>    </h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar por apellido, nombre o DNI"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>
      <table className="patients-table">
        <thead>
          <tr>
            <th>Apellido</th>
            <th>Nombre</th>
            <th>DNI</th>
          </tr>
        </thead>
        <tbody>
          {filteredPacientes.map(paciente => (
            <tr key={paciente.id} onClick={() => viewPaciente(paciente.id)}>
              <td>{paciente.apellido}</td>
              <td>{paciente.nombre}</td>
              <td>{paciente.dni}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdministrarPacientes;
