import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#fc4c4e',
    color: '#fff',
    cursor: 'pointer',
    margin: '10px 0',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  AdministrativoData: {
    marginBottom: '10px',
  },
  loading: {
    fontStyle: 'italic',
    color: '#888',
  },
};

function VisualizarAdministrativo() {
  const navigate = useNavigate();
  const { dni } = useParams();
  const [Administrativo, setAdministrativo] = useState(null);

  useEffect(() => {
    axios.get(`https://proyectohospital.onrender.com/GestionHospital/buscarAdministrativoPorDni/${dni}/`)
      .then(response => {
        setAdministrativo(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos del Administrativo:', error);
      });
  });
  
  const goBack = () => {
    navigate('/administrar-Administrativos');
  };



  return (
    <div style={styles.container}>
      <button style={styles.button} onClick={goBack}>Volver</button>
      <h1 style={styles.heading}>Visualizar Administrativo</h1>
      {Administrativo ? (
        <div>
          <p style={styles.AdministrativoData}>ID: {Administrativo.idAdministrativo}</p>
          <p style={styles.AdministrativoData}>Nombre: {Administrativo.nombre}</p>
          <p style={styles.AdministrativoData}>Apellido: {Administrativo.apellido}</p>
          <p style={styles.AdministrativoData}>DNI: {Administrativo.dni}</p>
        </div>
      ) : (
        <p style={styles.loading}>Cargando...</p>
      )}
    </div>
  );
}

export default VisualizarAdministrativo;
