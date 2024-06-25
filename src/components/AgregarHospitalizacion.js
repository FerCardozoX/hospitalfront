import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const AgregarHospitalizacion = () => {
    const [medicoId, setMedicoId] = useState('');
    const [medicoNombre, setMedicoNombre] = useState('');
    const [fechaIngreso, setFechaIngreso] = useState('');
    const [fechaAlta, setFechaAlta] = useState('');
    const [detallesTratamiento, setDetallesTratamiento] = useState('');
    const { pacienteId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('https://proyectohospital.onrender.com/GestionHospital/getmedicos');
                const { dniMedico, nombreMedico } = response.data;
                setMedicoId(dniMedico);
                setMedicoNombre(nombreMedico);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    const agregarHospitalizacion = async () => {
        try {
            const response = await axios.post(`https://proyectohospital.onrender.com/GestionHospital/agregarHospitalizacion/${pacienteId}/`, {
                medico_id: medicoId,
                fecha_ingreso: fechaIngreso,
                fecha_alta: fechaAlta,
                detalles_tratamiento: detallesTratamiento
            });
            console.log(response.data);
            alert('Hospitalización agregada');
            navigate(-1);
        } catch (error) {
            console.error(error);
            alert('Error al agregar hospitalización');
        }
    };

    const styles = {
        container: {
            margin: '20px',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            maxWidth: '600px',
        },
        inputContainer: {
            marginBottom: '10px',
        },
        input: {
            width: '100%',
            padding: '5px',
            marginBottom: '5px',
            borderRadius: '3px',
            border: '1px solid #ccc',
        },
        button: {
            padding: '5px 10px',
            background: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer',
        },
    };

    return (
        <div style={styles.container}>
            <h2>Agregar Hospitalización</h2>
            <div style={styles.inputContainer}>
                <label>Médico:</label>
                <input style={styles.input} value={medicoNombre} disabled />
            </div>
            <div style={styles.inputContainer}>
                <label>Fecha de Ingreso:</label>
                <input type="date" style={styles.input} value={fechaIngreso} onChange={(e) => setFechaIngreso(e.target.value)} />
            </div>
            <div style={styles.inputContainer}>
                <label>Fecha de Alta:</label>
                <input type="date" style={styles.input} value={fechaAlta} onChange={(e) => setFechaAlta(e.target.value)} />
            </div>
            <div style={styles.inputContainer}>
                <label>Detalles del Tratamiento:</label>
                <textarea style={styles.input} value={detallesTratamiento} onChange={(e) => setDetallesTratamiento(e.target.value)} />
            </div>
            <button style={styles.button} onClick={agregarHospitalizacion}>Agregar Hospitalización</button>
        </div>
    );
};

export default AgregarHospitalizacion;
