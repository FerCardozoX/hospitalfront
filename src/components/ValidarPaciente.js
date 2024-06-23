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

    return (
        <div>
            <h2>Validar DNI del Paciente</h2>
            <input
                type="text"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                placeholder="Ingrese DNI"
            />
            <button onClick={validarDni}>Validar</button>
            {paciente && (
                <div>
                    <p>Nombre: {paciente.nombre}</p>
                    <p>Apellido: {paciente.apellido}</p>
                </div>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default ValidarPaciente;
