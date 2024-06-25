import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdministrarTurnos() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [turnos, setTurnos] = useState([]);
  const [turnosFiltrados, setTurnosFiltrados] = useState([]);
  const [fechaFiltro, setFechaFiltro] = useState('');
  const [medicos, setMedicos] = useState([]);
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    // Obtener turnos de la API
    fetch('https://proyectohospital.onrender.com/GestionHospital/getcitas/')
      .then(response => response.json())
      .then(data => {
        setTurnos(data);
        setTurnosFiltrados(data);
      })
      .catch(error => console.error('Error fetching turnos:', error));

    // Obtener médicos de la API
    fetch('https://proyectohospital.onrender.com/GestionHospital/getmedicos/')
      .then(response => response.json())
      .then(data => setMedicos(data))
      .catch(error => console.error('Error fetching médicos:', error));

    // Obtener pacientes de la API
    fetch('https://proyectohospital.onrender.com/GestionHospital/getpacientes/')
      .then(response => response.json())
      .then(data => setPacientes(data))
      .catch(error => console.error('Error fetching pacientes:', error));
  }, []);

  const handleSearch = () => {
    // Filtrar los turnos por fecha
    const filteredTurnos = turnos.filter(turno => {
      const fechaTurno = new Date(turno.fechaCita).toISOString().slice(0, 10);
      return fechaTurno === fechaFiltro;
    });
    setTurnosFiltrados(filteredTurnos);
  };

  const handleSearch1 = () => {
    // Filtrar los turnos por término de búsqueda
    const filteredTurnos = turnos.filter(turno => {
      const paciente = pacientes.find(paciente => paciente.idPaciente === turno.idPaciente_id);
      const pacienteNombre = paciente ? `${paciente.apellido}, ${paciente.nombre}`.toLowerCase() : '';
      const dni = paciente ? paciente.dni.toLowerCase() : '';
      const medico = getMedicoById(turno.idMedico_id).toLowerCase();
      const especialidad = getMedicoByEspecialidad(turno.idMedico_id).toLowerCase();
      const searchTermLower = searchTerm.toLowerCase();
      return pacienteNombre.includes(searchTermLower) ||
             dni.includes(searchTermLower) ||
             medico.includes(searchTermLower) ||
             especialidad.includes(searchTermLower);
    });
    setTurnosFiltrados(filteredTurnos);
  };

  const handleCreate = () => {
    navigate('/agendar-cita');
  };
  const handleClick = () => {
    navigate(-1);
  };
  const getMedicoById = (idMedico) => {
    // Buscar y devolver el médico con el id correspondiente
    const medico = medicos.find(medico => medico.idMedico === idMedico);
    if (medico) {
      return `${medico.apellido}, ${medico.nombre}`;
    }
    return 'Médico no encontrado';
  };

  const getMedicoByEspecialidad = (idMedico) => {
    // Buscar y devolver la especialidad del médico con el id correspondiente
    const medico = medicos.find(medico => medico.idMedico === idMedico);
    if (medico) {
      return `${medico.especialidad}`;
    }
    return 'Médico no encontrado';
  };

  return (
    <div className="turnos-container">
      <button onClick={handleClick}>Volver</button>
      <h2 style={styles.title}>Administrar Turnos</h2>
      <div className="filter-container" style={styles.filterContainer}>
        <input
          type="date"
          value={fechaFiltro}
          onChange={(e) => setFechaFiltro(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSearch} style={styles.button}>Filtrar</button>
      </div>
      <div className="search-container" style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Buscar por paciente, médico, especialidad o día"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{...styles.input, width: '300px'}}
        />
        <button onClick={handleSearch1} style={styles.button}>Buscar</button>
      </div>
      <button onClick={handleCreate} style={styles.button}>Crear Turno</button>
      <table className="turnos-table" style={styles.table}>
        <thead>
          <tr>
            <th>Paciente</th>
            <th>DNI</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Médico</th>
            <th>Especialidad</th>
          </tr>
        </thead>
        <tbody>
          {turnosFiltrados.map((turno) => {
            const paciente = pacientes.find(paciente => paciente.idPaciente === turno.idPaciente_id);
            const pacienteNombre = paciente ? `${paciente.apellido}, ${paciente.nombre}` : 'Paciente no encontrado';
            const dni = paciente ? paciente.dni : 'DNI no encontrado';
            return (
              <tr key={turno.idCita}>
                <td>{pacienteNombre}</td>
                <td>{dni}</td>
                <td>{new Date(turno.fechaCita).toLocaleDateString()}</td>
                <td>{new Date(turno.fechaCita).toLocaleTimeString()}</td>
                <td>{getMedicoById(turno.idMedico_id)}</td>
                <td>{getMedicoByEspecialidad(turno.idMedico_id)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  title: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  filterContainer: {
    marginBottom: '20px',
  },
  searchContainer: {
    marginBottom: '20px',
  },
  input: {
    marginRight: '10px',
    padding: '5px',
    fontSize: '14px',
  },
  button: {
    padding: '5px 10px',
    fontSize: '14px',
    cursor: 'pointer',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
};

export default AdministrarTurnos;
