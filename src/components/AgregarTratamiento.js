import React, { useState } from 'react';
import axios from 'axios';

const AgregarTratamiento = ({ pacienteId }) => {
    const [descripcion, setDescripcion] = useState('');
    const [medicacion, setMedicacion] = useState('');
    const [procedimientos, setProcedimientos] = useState('');
    const [recomendaciones, setRecomendaciones] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');

    const agregarTratamiento = async () => {
        try {
            const response = await axios.post(`https://proyectohospital.onrender.com/GestionHospital/agregarTratamiento/${pacienteId}`, {
                descripcion,
                medicacion: [medicacion],
                procedimientos: [procedimientos],
                recomendaciones,
                fecha_inicio: fechaInicio,
                fecha_fin: fechaFin
            });
            console.log(response.data);
            alert('Tratamiento agregado')
        } catch (error) {
            console.error(error);
            alert('Error al agregar tratamiento')
        }
    };

    return (
        <div>
            <h2>Agregar Tratamiento</h2>
            <div>
                <label>Descripción:</label>
                <input value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
            </div>
            <div>
                <label>Medicación:</label>
                <input value={medicacion} onChange={(e) => setMedicacion(e.target.value)} />
            </div>
            <div>
                <label>Procedimientos:</label>
                <input value={procedimientos} onChange={(e) => setProcedimientos(e.target.value)} />
            </div>
            <div>
                <label>Recomendaciones:</label>
                <input value={recomendaciones} onChange={(e) => setRecomendaciones(e.target.value)} />
            </div>
            <div>
                <label>Fecha de inicio:</label>
                <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
            </div>
            <div>
                <label>Fecha de fin:</label>
                <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
            </div>
            <button onClick={agregarTratamiento}>Agregar Tratamiento</button>
        </div>
    );
};

export default AgregarTratamiento;
