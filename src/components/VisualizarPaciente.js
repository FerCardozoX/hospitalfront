import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function VisualizarPaciente() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [paciente, setPaciente] = useState(null);

  useEffect(() => {
    // Aquí deberías hacer una solicitud al servidor para obtener los datos del paciente con el ID proporcionado
    // Supongamos que los datos del paciente se obtienen correctamente y se almacenan en el estado
    const pacienteEjemplo = {
      idPaciente: id,
      nombre: 'Nombre del paciente',
      apellido: 'Apellido del paciente',
      dni: '12345678',
      email: 'correo@example.com',
      fecha_nacimiento: '2000-01-01',
      genero: 'masculino',
      telefono: '123456789',
      contacto_emergencia: '987654321',
    };
    setPaciente(pacienteEjemplo);
  }, [id]);

  const goBack = () => {
    navigate('/administrar-pacientes');
  };

  if (!paciente) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <button onClick={goBack}>Volver</button>
      <h1>Visualizar Paciente</h1>
      <div>
        <p>ID: {paciente.idPaciente}</p>
        <p>Nombre: {paciente.nombre}</p>
        <p>Apellido: {paciente.apellido}</p>
        <p>DNI: {paciente.dni}</p>
        <p>Email: {paciente.email}</p>
        <p>Fecha de Nacimiento: {paciente.fecha_nacimiento}</p>
        <p>Género: {paciente.genero}</p>
        <p>Teléfono: {paciente.telefono}</p>
        <p>Contacto de Emergencia: {paciente.contacto_emergencia}</p>
      </div>
    </div>
  );
}

export default VisualizarPaciente;
