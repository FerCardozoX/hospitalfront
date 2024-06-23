import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#fc4c4e',
    color: '#fff',
    cursor: 'pointer',
    margin: '5px',
  },
  buttonBack: {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#fc4c4e',
    color: '#fff', 
    cursor: 'pointer',
    margin: '5px',
    alignSelf: 'flex-start',  // Alinea el botón a la izquierda
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    width: '100%',  // Hacer que la caja de búsqueda sea más grande
    maxWidth: '600px',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginRight: '10px',
    width: '100%',  // Hacer que la caja de búsqueda sea más grande
    flexGrow: 1,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
  },
  th: {
    borderBottom: '2px solid #ccc',
    padding: '10px',
    textAlign: 'left',
  },
  td: {
    borderBottom: '1px solid #ccc',
    padding: '10px',
  },
  trClickable: {
    cursor: 'pointer',
  },
};

function AdministrarPacientes() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [pacientes, setPacientes] = useState([]);
  const [filteredPacientes, setFilteredPacientes] = useState([]);

  useEffect(() => {
    axios.get('https://proyectohospital.onrender.com/GestionHospital/getpacientes/')
      .then(response => {
        setPacientes(response.data);
        setFilteredPacientes(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los pacientes:', error);
      });
  }, []);

  const handleSearch = () => {
    const filtered = pacientes.filter(
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

  const viewPaciente = dni => {
    navigate(`/ver-paciente/${dni}`);
  };
  

  const goBack = () => {
    navigate('/menu-admin');
  };

  return (
    <div style={styles.container}>
      <button style={styles.buttonBack} onClick={goBack}>Volver</button>
      <h1 style={styles.header}>Administrar Pacientes</h1>
      <button style={styles.button} onClick={() => navigate('/crear-paciente')}>Crear Nuevo Paciente</button>
      <div style={styles.searchContainer}>
        <input
          style={styles.input}
          type="text"
          placeholder="Buscar por apellido, nombre o DNI"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button style={styles.button} onClick={handleSearch}>Buscar</button>
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Apellido</th>
            <th style={styles.th}>Nombre</th>
            <th style={styles.th}>DNI</th>
          </tr>
        </thead>
        <tbody>
          {filteredPacientes.map(paciente => (
            <tr
            key={paciente.id}
            onClick={() => viewPaciente(paciente.dni)}
            style={styles.trClickable}
          >
                    
              <td style={styles.td}>{paciente.apellido}</td>
              <td style={styles.td}>{paciente.nombre}</td>
              <td style={styles.td}>{paciente.dni}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdministrarPacientes;
