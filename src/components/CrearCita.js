import React, { useState } from 'react';
import axios from 'axios';

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

            await axios.post('https://proyectohospital.onrender.com/GestionHospital/crearCita/', { idPaciente: paciente.idPaciente, idMedico: medico.idMedico, fechaCita,estado: 'RESERVADO' });
            setMensaje('Cita creada con éxito');
            setError('');
            alert('Cita creada con éxito');
        } catch (error) {
            setError(error.response?.data?.error || 'Error al crear cita' ,error);
            setMensaje('');
        }
    };

    return (
        <div>
            <h2>Agendar Cita Médica</h2>
            <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
            />
            <button onClick={obtenerHorarios}>Ver Horarios Disponibles</button>
            {horarios.length > 0 && (
                <select onChange={(e) => setHorarioSeleccionado(e.target.value)}>
                    <option value="">Seleccione un horario</option>
                    {horarios.map((hora, index) => (
                        <option key={index} value={hora}>{hora}</option>
                    ))}
                </select>
            )}
            <button onClick={agendarCita}>Agendar Cita</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
        </div>
    );
};

export default CrearCita;
