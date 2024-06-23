import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const styles = {
  formContainer: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  select: {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  button: {
    padding: '8px 12px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#fc4c4e',
    color: '#fff',
    cursor: 'pointer',
  },
  buttonBack: {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#fc4c4e',
    color: '#fff',
    cursor: 'pointer',
    margin: '5px',
    alignSelf: 'flex-start', // Alinea el botón a la izquierda
  },
};

function CrearMedico() {
  const navigate = useNavigate();
  const [nuevoMedico, setNuevoMedico] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    email: '',
    fecha_nacimiento: '',
    genero: '',
    telefono: '',
    especialidad: '',
    matricula: '',
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setNuevoMedico({ ...nuevoMedico, [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log('Nuevo médico:', nuevoMedico);

    axios.post('https://proyectohospital.onrender.com/GestionHospital/registrarMedico/', nuevoMedico)
      .then(response => {
        console.log('Médico creado:', response.data);
        alert('Médico creado exitosamente');
        navigate('/administrar-medicos');
      })
      .catch(error => {
        console.error('Error al crear el médico:', error);
        alert('Error al crear el médico');
      });

    setNuevoMedico({
      nombre: '',
      apellido: '',
      dni: '',
      email: '',
      fecha_nacimiento: '',
      genero: '',
      telefono: '',
      especialidad: '',
      matricula: '',
    });
  };

  const goBack = () => {
    navigate('/administrar-medicos');
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Crear Nuevo Médico</h1>
      <button style={styles.buttonBack} onClick={goBack}>Volver</button>
      <form style={styles.formContainer} onSubmit={handleSubmit}>
        <label style={styles.label}>
          Nombre:
          <input style={styles.input} type="text" name="nombre" value={nuevoMedico.nombre} onChange={handleChange} />
        </label>
        <label style={styles.label}>
          Apellido:
          <input style={styles.input} type="text" name="apellido" value={nuevoMedico.apellido} onChange={handleChange} />
        </label>
        <label style={styles.label}>
          DNI:
          <input style={styles.input} type="text" name="dni" value={nuevoMedico.dni} onChange={handleChange} />
        </label>
        <label style={styles.label}>
          Email:
          <input style={styles.input} type="email" name="email" value={nuevoMedico.email} onChange={handleChange} />
        </label>
        <label style={styles.label}>
          Fecha de Nacimiento:
          <input style={styles.input} type="date" name="fecha_nacimiento" value={nuevoMedico.fecha_nacimiento} onChange={handleChange} />
        </label>
        <label style={styles.label}>
          Género:
          <select style={styles.select} name="genero" value={nuevoMedico.genero} onChange={handleChange}>
                        <option value="">Seleccione género</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                        <option value="otro">Otro</option>
                    </select>
        </label>
        <label style={styles.label}>
          Teléfono:
          <input style={styles.input} type="text" name="telefono" value={nuevoMedico.telefono} onChange={handleChange} />
        </label>
        <label style={styles.label}>
          Especialidad:
          <input style={styles.input} type="text" name="especialidad" value={nuevoMedico.especialidad} onChange={handleChange} />
        </label>
        <label style={styles.label}>
          Matrícula:
          <input style={styles.input} type="text" name="matricula" value={nuevoMedico.matricula} onChange={handleChange} />
        </label>
        <button style={styles.button} type="submit">Crear Médico</button>
      </form>
    </div>
  );
}

export default CrearMedico;
