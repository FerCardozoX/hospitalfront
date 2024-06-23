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

function AdministrarUsuarios() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [Usuarios, setUsuarios] = useState([]);
  const [filteredUsuarios, setFilteredUsuarios] = useState([]);

  useEffect(() => {
    axios.get('https://proyectohospital.onrender.com/GestionHospital/getUsuarios/')
      .then(response => {
        setUsuarios(response.data);
        setFilteredUsuarios(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los Usuarios:', error);
      });
  }, []);

  const handleSearch = () => {
    const filtered = Usuarios.filter(
      Usuario =>
        Usuario.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
        Usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        Usuario.dni.includes(searchTerm)
    );
    setFilteredUsuarios(filtered);
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };
  

  const goBack = () => {
    navigate('/menu-admin');
  };

  return (
    <div style={styles.container}>
      <button style={styles.buttonBack} onClick={goBack}>Volver</button>
      <h1 style={styles.header}>Administrar Usuarios</h1>
      <div style={styles.searchContainer}>
        <input
          style={styles.input}
          type="text"
          placeholder="Buscar usuario"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button style={styles.button} onClick={handleSearch}>Buscar</button>
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Usuario</th>
            <th style={styles.th}>Contraseña</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsuarios.map(Usuario => (
            <tr>  
              <td style={styles.td}>{Usuario.usuario}</td>
              <td style={styles.td}>{Usuario.contraseña}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdministrarUsuarios;
