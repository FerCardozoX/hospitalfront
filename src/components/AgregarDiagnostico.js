import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const AgregarDiagnostico = () => {
    const [medicoId, setMedicoId] = useState('');
    const [medicoNombre, setMedicoNombre] = useState('');
    const [diagnostico, setDiagnostico] = useState('');
    const [fechaDiagnostico, setFechaDiagnostico] = useState('');
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

    const agregarDiagnostico = async () => {
        try {
            const response = await axios.post(`https://proyectohospital.onrender.com/GestionHospital/agregarDiagnostico/${pacienteId}/`, {
                medico_id: medicoId,
                fecha: fechaDiagnostico,
                diagnostico
            });
            console.log(response.data);
            alert('Diagnóstico agregado');
            navigate(-1);
        } catch (error) {
            console.error(error);
            alert('Error al agregar diagnóstico');
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
            <h2>Agregar Diagnóstico</h2>
            <div style={styles.inputContainer}>
                <label>Médico:</label>
                <input style={styles.input} value={medicoNombre} disabled />
            </div>
            <div style={styles.inputContainer}>
                <label>Diagnóstico:</label>
                <input style={styles.input} value={diagnostico} onChange={(e) => setDiagnostico(e.target.value)} />
            </div>
            <div style={styles.inputContainer}>
                <label>Fecha de Diagnóstico:</label>
                <input type="date" style={styles.input} value={fechaDiagnostico} onChange={(e) => setFechaDiagnostico(e.target.value)} />
            </div>
            <button style={styles.button} onClick={agregarDiagnostico}>Agregar Diagnóstico</button>
        </div>
    );
};

export default AgregarDiagnostico;
