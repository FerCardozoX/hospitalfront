import React, { useState } from 'react';
import axios from 'axios';

const ValidarPaciente = ({ setPaciente }) => {
    const [dni, setDni] = useState('');
    const [error, setError] = useState('');
    const [paciente, setPacienteData] = useState(null);

    const validarDni = async () => {
        try {
            const response = await axios.post('https://proyectohospital.onrender.com/GestionHospital/validarDniPaciente/', { dni });
            setPacienteData(response.data);
            setPaciente(response.data); 
            setError('');
        } catch (error) {
            setError(error.response?.data?.error || 'Error al validar DNI');
            setPacienteData(null);
        }
    };

    const styles = {
        container: {
            padding: '20px',
            maxWidth: '600px',
            margin: '0 auto',
            fontFamily: 'Arial, sans-serif',
        },
        title: {
            textAlign: 'center',
            marginBottom: '20px',
        },
        section: {
            marginBottom: '20px',
        },
        error: {
            color: 'red',
        },
        success: {
            color: 'green',
        },
        input: {
            padding: '10px',
            width: '100%',
            marginBottom: '10px',
            boxSizing: 'border-box',
        },
        button: {
            padding: '10px 20px',
            cursor: 'pointer',
        },
        select: {
            padding: '10px',
            width: '100%',
            marginBottom: '10px',
            boxSizing: 'border-box',
        }
    };
  
    return (
        <div style={styles.section}>
            <h2>Validar DNI del Paciente</h2>
            <input
                type="text"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                placeholder="Ingrese DNI"
                style={styles.input}
            />
            <button onClick={validarDni} style={styles.button}>Validar</button>
            {paciente && (
                <div>
                    <p>Nombre: {paciente.nombre}</p>
                    <p>Apellido: {paciente.apellido}</p>
                </div>
            )}
            {error && <p style={styles.error}>{error}</p>}
        </div>
    );
};

export default ValidarPaciente;
