import React, { useState } from 'react';
import axios from 'axios';

const AgregarDiagnostico = ({ pacienteId }) => {
    const [fecha, setFecha] = useState('');
    const [diagnostico, setDiagnostico] = useState('');

    const agregarDiagnostico = async () => {
        try {
            const response = await axios.post(`https://proyectohospital.onrender.com/GestionHospital/agregarDiagnostico/${pacienteId}`, {
                fecha,
                diagnostico
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Agregar Diagnóstico</h2>
            <div>
                <label>Fecha:</label>
                <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
            </div>
            <div>
                <label>Diagnóstico:</label>
                <input value={diagnostico} onChange={(e) => setDiagnostico(e.target.value)} />
            </div>
            <button onClick={agregarDiagnostico}>Agregar Diagnóstico</button>
        </div>
    );
};

export default AgregarDiagnostico;
