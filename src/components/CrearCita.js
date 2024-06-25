import React, { useState } from 'react';
import axios from 'axios';
 

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

const CrearCita = ({ paciente, medico }) => {
    const [fecha, setFecha] = useState('');
    const [horarios, setHorarios] = useState([]);
    const [horarioSeleccionado, setHorarioSeleccionado] = useState('');
    const [error, setError] = useState('');
    const [mensaje, setMensaje] = useState('');

    const obtenerHorarios = async () => {
        try {
            const response = await axios.post('https://proyectohospital.onrender.com/GestionHospital/horariosDisponiblesMedico/', { idMedico: medico.idMedico, fecha });
            setHorarios(response.data.horarios_disponibles);
            setError('');
        } catch (error) {
            setError(error.response?.data?.error || 'Error al obtener horarios');
            setHorarios([]);
        }
    };

    const agendarCita = async () => {
        try {
            const fechaCita = `${fecha}T${horarioSeleccionado}:00`;

            await axios.post('https://proyectohospital.onrender.com/GestionHospital/crearCita/', { idPaciente: paciente.idPaciente, idMedico: medico.idMedico, fechaCita, estado: 'RESERVADO' });
            setMensaje('Cita creada con éxito');
            setError('');
            alert('Cita creada con éxito');
        } catch (error) {
            setError(error.response?.data?.error || 'Error al crear cita' ,error);
            setMensaje('');
        }
    };

    return (
        <div style={styles.section}>
            <h2>Agendar Cita Médica</h2>
            <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                style={styles.input}
            />
            <button onClick={obtenerHorarios} style={styles.button}>Ver Horarios Disponibles</button>
            {horarios.length > 0 && (
                <select onChange={(e) => setHorarioSeleccionado(e.target.value)} style={styles.select}>
                    <option value="">Seleccione un horario</option>
                    {horarios.map((hora, index) => (
                        <option key={index} value={hora}>{hora}</option>
                    ))}
                </select>
            )}
            <button onClick={agendarCita} style={styles.button}>Agendar Cita</button>
            {error && <p style={styles.error}>{error}</p>}
            {mensaje && <p style={styles.success}>{mensaje}</p>}
        </div>
    );
};

export default CrearCita;
