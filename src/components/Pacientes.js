import React, { useEffect, useState } from 'react';
import axios from 'axios'

const Pacientes = () => {
    const [pacientes, setPacientes] = useState([]);

    useEffect(() => {
        axios.get('https://proyectohospital.onrender.com/GestionHospital/getpacientes/')
            .then(response => {
                setPacientes(response.data);
            })
            .catch(error => {
                console.error('Hubo un error al obtener los pacientes:', error);
            });
    }, []);

    return (
        <div>
            <h1>Pacientes</h1>
            <ul>
                {pacientes.map(paciente => (
                    <li key={paciente.idPaciente}>{paciente.nombre} {paciente.apellido}</li>
                ))}
            </ul>
        </div>
    );
};

export default Pacientes;
