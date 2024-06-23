import React, { useState } from 'react';
import ValidarPaciente from './ValidarPaciente';
import SeleccionarMedico from './SeleccionarMedico';
import CrearCita from './CrearCita';

const AgendarCita = () => {
    const [paciente, setPaciente] = useState(null);
    const [medico, setMedico] = useState(null);

    return (
        <div>
            <h1>Agendar Cita Médica</h1>
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
