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

function AdministrarMedicos() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [medicos, setmedicos] = useState([]);
  const [filteredmedicos, setFilteredmedicos] = useState([]);

  useEffect(() => {
    axios.get('https://proyectohospital.onrender.com/GestionHospital/getmedicos/')
      .then(response => {
        setmedicos(response.data);
        setFilteredmedicos(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los medicos:', error);
      });
  }, []);

  const handleSearch = () => {
    const filtered = medicos.filter(
      medico =>
        medico.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medico.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medico.dni.includes(searchTerm)
    );
    setFilteredmedicos(filtered);
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const viewmedico = id => {
    navigate(`/ver-medico/${id}`);
  };

  const goBack = () => {
    navigate('/menu-admin');
  };

  return (
    <div style={styles.container}>
      <button style={styles.buttonBack} onClick={goBack}>Volver</button>
      <h1 style={styles.header}>Administrar medicos</h1>
      <button style={styles.button} onClick={() => navigate('/crear-medico')}>Crear Nuevo medico</button>
      <div style={styles.searchContainer}>
        <input
          style={styles.input}
          type="text"
          placeholder="Buscar por apellido, nombre, especialidad o DNI"
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
            <th style={styles.th}>Especialidad</th>
          </tr>
        </thead>
        <tbody>
          {filteredmedicos.map(medico => (
            <tr
              key={medico.id}
              onClick={() => viewmedico(medico.id)}
              style={styles.trClickable}
            >
              <td style={styles.td}>{medico.apellido}</td>
              <td style={styles.td}>{medico.nombre}</td>
              <td style={styles.td}>{medico.dni}</td>
              <td style={styles.td}>{medico.especialidad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdministrarMedicos;
