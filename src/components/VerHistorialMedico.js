import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function VerHistorialMedico() {
  const navigate = useNavigate();
  const [historiales, setHistoriales] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const [historialesResponse, pacientesResponse] = await Promise.all([
          axios.get('https://proyectohospital.onrender.com/GestionHospital/getAllHistoriales/'),
          axios.get('https://proyectohospital.onrender.com/GestionHospital/getpacientes/')
        ]);
        const historialesObjeto = JSON.parse(historialesResponse.data);
        setHistoriales(historialesObjeto);
        setPacientes(pacientesResponse.data);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    }
    fetchData();
  }, []);

  const filtrarPacientes = () => {
    return pacientes.filter(paciente =>
      paciente.apellido.toLowerCase().includes(filtro.toLowerCase()) ||
      paciente.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
      paciente.dni.includes(filtro)
    );
  };

  const verHistorial = pacienteId => {

    const paciente = pacientes.find(paciente => paciente.idPaciente === pacienteId);
    let historialEncontrado = null;
    historiales.forEach(historial => {
      if (historial.paciente_id === pacienteId) {
        historialEncontrado = historial;
      }
    });
  
    if (paciente && historialEncontrado) {
      navigate(`/historial/${pacienteId}`, { state: { historial: historialEncontrado, paciente } });
    } else {
      console.error('Historial o paciente no encontrado.');
    }
  };
  
  


  const styles = {
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px'
    },
    table: {
      borderCollapse: 'collapse',
      width: '100%'
    },
    th: {
      backgroundColor: '#f2f2f2',
      color: 'black',
      fontWeight: 'bold',
      textAlign: 'left',
      padding: '8px'
    },
    td: {
      border: '1px solid #ddd',
      padding: '8px',
      cursor: 'pointer',
      transition: 'box-shadow 0.3s' // Agrega transición para suavizar el efecto
    },
    input: {
      width: '100%',
      padding: '8px',
      marginBottom: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc'
    }
  };

  return (
    <div>
      <h1 style={styles.title}>Historiales Médicos</h1>
      <input
        type="text"
        placeholder="Buscar por Apellido, Nombre o DNI"
        value={filtro}
        onChange={e => setFiltro(e.target.value)}
        style={styles.input}
      />
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Apellido</th>
            <th style={styles.th}>Nombre</th>
            <th style={styles.th}>DNI</th>
          </tr>
        </thead>
        <tbody>
          {filtrarPacientes().map(paciente => (
            <tr
              key={paciente.idPaciente}
              onClick={() => verHistorial(paciente.idPaciente)}
              style={styles.td}
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

export default VerHistorialMedico;
