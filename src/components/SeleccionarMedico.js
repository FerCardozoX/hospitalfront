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

    return (
        <div>
            <h2>Seleccionar Médico</h2>
            <input
                type="text"
                value={especialidad}
                onChange={(e) => setEspecialidad(e.target.value)}
                placeholder="Ingrese Especialidad"
            />
            <button onClick={buscarMedicos}>Buscar</button>
            {medicos.length > 0 && (
                <select onChange={(e) => setMedico(medicos.find(m => m.idMedico === parseInt(e.target.value)))}>
                    <option value="">Seleccione un médico</option>
                    {medicos.map((medico) => (
                        <option key={medico.idMedico} value={medico.idMedico}>
                            {medico.nombre} {medico.apellido} - DNI: {medico.dni}
                        </option>
                    ))}
                </select>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default SeleccionarMedico;
