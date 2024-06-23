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
  MedicoData: {
    marginBottom: '10px',
  },
  loading: {
    fontStyle: 'italic',
    color: '#888',
  },
};

function VisualizarMedico() {
  const navigate = useNavigate();
  const { dni } = useParams();
  const [medico, setMedico] = useState(null);

  useEffect(() => {
    axios.get(`https://proyectohospital.onrender.com/GestionHospital/buscarMedicoPorDni/${dni}/`)
      .then(response => {
        setMedico(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos del Medico:', error);
      });
  });
  
  const goBack = () => {
    navigate('/administrar-medicos');
  };



  return (
    <div style={styles.container}>
      <button style={styles.button} onClick={goBack}>Volver</button>
      <h1 style={styles.heading}>Visualizar Medico</h1>
      {medico ? (
        <div>
          <p style={styles.MedicoData}>ID: {medico.idMedico}</p>
          <p style={styles.MedicoData}>Nombre: {medico.nombre}</p>
          <p style={styles.MedicoData}>Apellido: {medico.apellido}</p>
          <p style={styles.MedicoData}>DNI: {medico.dni}</p>
          <p style={styles.MedicoData}>Email: {medico.email}</p>
          <p style={styles.MedicoData}>Fecha de Nacimiento: {medico.fecha_nacimiento}</p>
          <p style={styles.MedicoData}>Género: {medico.genero}</p>
          <p style={styles.MedicoData}>Teléfono: {medico.telefono}</p>
          <p style={styles.MedicoData}>Especialidad: {medico.especialidad}</p>
          <p style={styles.MedicoData}>Matrícula: {medico.matricula}</p>
        </div>
      ) : (
        <p style={styles.loading}>Cargando...</p>
      )}
    </div>
  );
}

export default VisualizarMedico;
