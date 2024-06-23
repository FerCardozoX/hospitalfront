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
      alignSelf: 'flex-start',  // Alinea el botón a la izquierda
    },
  };

function CrearPaciente() {
  const navigate = useNavigate();
  const [nuevoPaciente, setNuevoPaciente] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    email: '',
    fecha_nacimiento: '',
    genero: '',
    telefono: '',
    contacto_emergencia: '',
  });



  const handleChange = event => {
    const { name, value } = event.target;
    setNuevoPaciente({ ...nuevoPaciente, [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log('Nuevo paciente:', nuevoPaciente);

    axios.post('https://proyectohospital.onrender.com/GestionHospital/postCrearPaciente/', nuevoPaciente)
        .then(response => {
            console.log('Paciente creado:', response.data);
            alert('Paciente creado exitosamente');
            navigate('/administrar-pacientes');
        })
        .catch(error => {
            console.error('Error al crear el paciente:', error);
            alert('Error al crear el paciente', error);
        });

    setNuevoPaciente({
        nombre: '',
        apellido: '',
        dni: '',
        email: '',
        fecha_nacimiento: '',
        genero: '',
        telefono: '',
        contacto_emergencia: '',
    });
};

  const goBack = () => {
    navigate('/administrar-pacientes');
  };

  return (
    <div>
     <h1 style={{ textAlign: 'center' }}>Crear Nuevo Paciente</h1>
     <button style={styles.buttonBack} onClick={goBack}>Volver</button>
      <form style={styles.formContainer} onSubmit={handleSubmit}>
        <label style={styles.label}>
          Nombre:
          <input style={styles.input} type="text" name="nombre" value={nuevoPaciente.nombre} onChange={handleChange} />
        </label>
        <label style={styles.label}>
          Apellido:
          <input style={styles.input} type="text" name="apellido" value={nuevoPaciente.apellido} onChange={handleChange} />
        </label>
        <label style={styles.label}>
          DNI:
          <input style={styles.input} type="text" name="dni" value={nuevoPaciente.dni} onChange={handleChange} />
        </label>
        <label style={styles.label}>  
          Email:
          <input style={styles.input} type="email" name="email" value={nuevoPaciente.email} onChange={handleChange} />
        </label>
        <label style={styles.label}>
          Fecha de Nacimiento:
          <input style={styles.input} type="date" name="fecha_nacimiento" value={nuevoPaciente.fecha_nacimiento} onChange={handleChange} />
        </label>
        <label style={styles.label}>
          Género:
          <select style={styles.select} name="genero" value={nuevoPaciente.genero} onChange={handleChange}>
                        <option value="">Seleccione género</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                        <option value="otro">Otro</option>
                    </select>
        </label>
        
        <label style={styles.label}>
          Teléfono:
          <input style={styles.input} type="text" name="telefono" value={nuevoPaciente.telefono} onChange={handleChange} />
        </label>
        <label style={styles.label}>
          Contacto de Emergencia:
          <input style={styles.input} type="text" name="contacto_emergencia" value={nuevoPaciente.contacto_emergencia} onChange={handleChange} />
        </label>
        <button style={styles.button} type="submit">Crear Paciente</button>
      </form>
    </div>
  );
}

export default CrearPaciente;