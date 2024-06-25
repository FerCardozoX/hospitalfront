import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation} from 'react-router-dom';
import axios from 'axios';

const AgregarTratamiento = () => {
    const [medicoId, setMedicoId] = useState('');
    const [medicoNombre, setMedicoNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [medicacion, setMedicacion] = useState(['']);
    const [procedimientos, setProcedimientos] = useState(['']);
    const [recomendaciones, setRecomendaciones] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [comentarios, setComentarios] = useState([{ comentario: '', fecha: '' }]);
    const { pacienteId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { dniMedico } = location.state;

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.post('https://proyectohospital.onrender.com/GestionHospital/getmedicos/', {
                    dniMedico
                });
                const { dniMedicos, nombreMedico } = response.data; // Ajusta los nombres según los datos reales
                setMedicoId(dniMedicos);
                setMedicoNombre(nombreMedico);
                setComentarios([{ comentario: '', fecha: new Date().toISOString().slice(0, 10) }]);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [pacienteId]);

    const agregarTratamiento = async () => {
        try {
            const response = await axios.post(`https://proyectohospital.onrender.com/GestionHospital/agregarTratamiento/${pacienteId}/`, {
                medico_id: medicoId,
                descripcion,
                medicacion,
                procedimientos,
                recomendaciones,
                fecha_inicio: fechaInicio,
                fecha_fin: fechaFin,
                comentarios: comentarios.map(c => ({ ...c, medico_id: medicoId, medico_nombre: medicoNombre }))
            });
            console.log(response.data);
            alert('Tratamiento agregado');
            navigate(-1);
        } catch (error) {
            console.error(error);
            alert('Error al agregar tratamiento');
        }
    };

    const agregarMedicacion = () => {
        setMedicacion([...medicacion, '']);
    };

    const agregarProcedimiento = () => {
        setProcedimientos([...procedimientos, '']);
    };

    const agregarComentario = () => {
        setComentarios([...comentarios, { comentario: '', fecha: new Date().toISOString().slice(0, 10) }]);
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
        commentContainer: {
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            marginBottom: '10px',
        },
    };

    return (
        <div style={styles.container}>
            <h2>Agregar Tratamiento</h2>
            <div style={styles.inputContainer}>
                <label>Médico ID:</label>
                <input style={styles.input} value={medicoId} disabled />
            </div>
            <div style={styles.inputContainer}>
                <label>Descripción:</label>
                <input style={styles.input} value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
            </div>
            <div style={styles.inputContainer}>
                <label>Medicación:</label>
                {medicacion.map((med, index) => (
                    <input key={index} style={styles.input} value={med} onChange={(e) => {
                        const newMedicacion = [...medicacion];
                        newMedicacion[index] = e.target.value;
                        setMedicacion(newMedicacion);
                    }} />
                ))}
                <button style={styles.button} onClick={agregarMedicacion}>Agregar Medicación</button>
            </div>
            <div style={styles.inputContainer}>
                <label>Procedimientos:</label>
                {procedimientos.map((proc, index) => (
                    <input key={index} style={styles.input} value={proc} onChange={(e) => {
                        const newProcedimientos = [...procedimientos];
                        newProcedimientos[index] = e.target.value;
                        setProcedimientos(newProcedimientos);
                    }} />
                ))}
                <button style={styles.button} onClick={agregarProcedimiento}>Agregar Procedimiento</button>
            </div>            
            <div style={styles.inputContainer}>
                <label>Recomendaciones:</label>
                <input style={styles.input} value={recomendaciones} onChange={(e) => setRecomendaciones(e.target.value)} />
            </div>
            <div style={styles.inputContainer}>
                <label>Fecha de inicio:</label>
                <input type="date" style={styles.input} value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
            </div>
            <div style={styles.inputContainer}>
                <label>Fecha de fin:</label>
                <input type="date" style={styles.input} value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
            </div>
            <div style={styles.inputContainer}>
                <label>Comentarios:</label>
                {comentarios.map((comentario, index) => (
                    <div key={index} style={styles.commentContainer}>
                        <p><strong>Profesional:</strong> {medicoNombre}</p>
                        <p><strong>Fecha:</strong> {comentario.fecha}</p>
                        <textarea style={styles.input} placeholder="Comentario" value={comentario.comentario} onChange={(e) => {
                            const newComentarios = [...comentarios];
                            newComentarios[index] = { ...newComentarios[index], comentario: e.target.value };
                            setComentarios(newComentarios);
                        }} />
                    </div>
                ))}
                <button style={styles.button} onClick={agregarComentario}>Agregar Comentario</button>
            </div>
            <button style={styles.button} onClick={agregarTratamiento}>Agregar Tratamiento</button>
        </div>
    );
};

export default AgregarTratamiento;
