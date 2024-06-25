import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SeleccionarMedico = ({ setMedico }) => {
    const [especialidad, setEspecialidad] = useState('');
    const [medicos, setMedicos] = useState([]);
    const [error, setError] = useState('');

    const buscarMedicos = async () => {
        try {
            const response = await axios.post('https://proyectohospital.onrender.com/GestionHospital/buscarmedicosespecialidad/', { especialidad });
            setMedicos(response.data);
            setError('');
        } catch (error) {
            setError(error.response?.data?.error || 'Error al buscar médicos');
            setMedicos([]);
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
            <h2>Seleccionar Médico</h2>
            <input
                type="text"
                value={especialidad}
                onChange={(e) => setEspecialidad(e.target.value)}
                placeholder="Ingrese Especialidad"
                style={styles.input}
            />
            <button onClick={buscarMedicos} style={styles.button}>Buscar</button>
            {medicos.length > 0 && (
                <select onChange={(e) => setMedico(medicos.find(m => m.idMedico === parseInt(e.target.value)))} style={styles.select}>
                    <option value="">Seleccione un médico</option>
                    {medicos.map((medico) => (
                        <option key={medico.idMedico} value={medico.idMedico}>
                            {medico.nombre} {medico.apellido} - DNI: {medico.dni}
                        </option>
                    ))}
                </select>
            )}
            {error && <p style={styles.error}>{error}</p>}
        </div>
    );
};
 
export default SeleccionarMedico;
