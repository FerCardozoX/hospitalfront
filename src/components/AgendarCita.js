import React, { useState } from 'react';
import ValidarPaciente from './ValidarPaciente';
import SeleccionarMedico from './SeleccionarMedico';
import CrearCita from './CrearCita';

const styles = {
    container: {
        padding: '20px',
        maxWidth: '600px',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
    },
    title: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    section: {
        marginBottom: '20px',
    },
    error: {
        color: 'red',
    },
    success: {
        color: 'green',
    },
    input: {
        padding: '10px',
        width: '100%',
        marginBottom: '10px',
        boxSizing: 'border-box',
    },
    button: {
        padding: '10px 20px',
        cursor: 'pointer',
    },
    select: {
        padding: '10px',
        width: '100%',
        marginBottom: '10px',
        boxSizing: 'border-box',
    }
};

const AgendarCita = () => {
    const [paciente, setPaciente] = useState(null);
    const [medico, setMedico] = useState(null);

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Agendar Cita Médica</h1>
            <ValidarPaciente setPaciente={setPaciente} />
            {paciente && (
                <>
                    <SeleccionarMedico setMedico={setMedico} />
                    {medico && (
                        <CrearCita paciente={paciente} medico={medico} />
                    )}
                </>
            )}
        </div>
    );
};

export default AgendarCita;
