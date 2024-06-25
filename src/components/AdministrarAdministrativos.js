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

function AdministrarAdministrativos() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [Administrativos, setAdministrativos] = useState([]);
  const [filteredAdministrativos, setFilteredAdministrativos] = useState([]);

  useEffect(() => {
    axios.get('https://proyectohospital.onrender.com/GestionHospital/getadministrativos/')
      .then(response => {
        setAdministrativos(response.data);
        setFilteredAdministrativos(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los Administrativos:', error);
      });
  }, []);

  const handleSearch = () => {
    const filtered = Administrativos.filter(
      Administrativo =>
        Administrativo.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
        Administrativo.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        Administrativo.dni.includes(searchTerm)
    );
    setFilteredAdministrativos(filtered);
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const viewAdministrativo = dni => {
    navigate(`/ver-Administrativo/${dni}`);
  };

  const goBack = () => {
    navigate('/menu-admin');
  };

  return (
    <div style={styles.container}>
      <button style={styles.buttonBack} onClick={goBack}>Volver</button>
      <h1 style={styles.header}>Administrar Administrativos</h1>
      <button style={styles.button} onClick={() => navigate('/crear-Administrativo')}>Crear Nuevo Administrativo</button>
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
          {filteredAdministrativos.map(Administrativo => (
            <tr
              key={Administrativo.id}
              onClick={() => viewAdministrativo(Administrativo.dni)}
              style={styles.trClickable}
            >
              <td style={styles.td}>{Administrativo.apellido}</td>
              <td style={styles.td}>{Administrativo.nombre}</td>
              <td style={styles.td}>{Administrativo.dni}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdministrarAdministrativos;
