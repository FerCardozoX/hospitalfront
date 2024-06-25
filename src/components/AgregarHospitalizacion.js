import React, { useState } from 'react';
import axios from 'axios';

const AgregarHospitalizacion = ({ pacienteId }) => {
    const [fechaIngreso, setFechaIngreso] = useState('');
    const [fechaAlta, setFechaAlta] = useState('');
    const [detallesTratamiento, setDetallesTratamiento] = useState('');

    const agregarHospitalizacion = async () => {
        try {
            const response = await axios.post(`https://proyectohospital.onrender.com/GestionHospital/agregarHospitalizacion/${pacienteId}`, {
                fecha_ingreso: fechaIngreso,
                fecha_alta: fechaAlta,
                detalles_tratamiento: detallesTratamiento
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Agregar Hospitalización</h2>
            <div>
                <label>Fecha de ingreso:</label>
                <input type="date" value={fechaIngreso} onChange={(e) => setFechaIngreso(e.target.value)} />
            </div>
            <div>
                <label>Fecha de alta:</label>
                <input type="date" value={fechaAlta} onChange={(e) => setFechaAlta(e.target.value)} />
            </div>
            <div>
                <label>Detalles del tratamiento:</label>
                <input value={detallesTratamiento} onChange={(e) => setDetallesTratamiento(e.target.value)} />
            </div>
            <button onClick={agregarHospitalizacion}>Agregar Hospitalización</button>
        </div>
    );
};

export default AgregarHospitalizacion;
