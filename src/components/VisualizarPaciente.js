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
  patientData: {
    marginBottom: '10px',
  },
  loading: {
    fontStyle: 'italic',
    color: '#888',
  },
};

function VisualizarPaciente() {
  const navigate = useNavigate();
  const { dni } = useParams();
  const [paciente, setPaciente] = useState(null);

  useEffect(() => {
    axios.get(`https://proyectohospital.onrender.com/GestionHospital/buscarPacientePorDni/${dni}/`)
      .then(response => {
        setPaciente(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos del paciente:', error);
      });
  });
  
  const goBack = () => {
    navigate('/administrar-pacientes');
  };



  return (
    <div style={styles.container}>
      <button style={styles.button} onClick={goBack}>Volver</button>
      <h1 style={styles.heading}>Visualizar Paciente</h1>
      {paciente ? (
        <div>
          <p style={styles.patientData}>ID: {paciente.idPaciente}</p>
          <p style={styles.patientData}>Nombre: {paciente.nombre}</p>
          <p style={styles.patientData}>Apellido: {paciente.apellido}</p>
          <p style={styles.patientData}>DNI: {paciente.dni}</p>
          <p style={styles.patientData}>Email: {paciente.email}</p>
          <p style={styles.patientData}>Fecha de Nacimiento: {paciente.fecha_nacimiento}</p>
          <p style={styles.patientData}>Género: {paciente.genero}</p>
          <p style={styles.patientData}>Teléfono: {paciente.telefono}</p>
          <p style={styles.patientData}>Contacto de Emergencia: {paciente.contacto_emergencia}</p>
        </div>
      ) : (
        <p style={styles.loading}>Cargando...</p>
      )}
    </div>
  );
}

export default VisualizarPaciente;
