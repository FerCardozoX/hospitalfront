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

function CrearAdministrativo() {
  const navigate = useNavigate();
  const [nuevoAdministrativo, setNuevoAdministrativo] = useState({
    nombre: '',
    apellido: '',
    dni: '',
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setNuevoAdministrativo({ ...nuevoAdministrativo, [name]: value });
  };
 
  const handleSubmit = event => {
    event.preventDefault();
    console.log('Nuevo Admin:', nuevoAdministrativo);

    axios.post('https://proyectohospital.onrender.com/GestionHospital/registrarAdministrativo/', nuevoAdministrativo)
      .then(response => {
        console.log('Admin creado:', response.data);
        alert('Admin creado exitosamente');
        navigate(-1);
      })
      .catch(error => {
        console.error('Error al crear el Admin:', error);
        alert('Error al crear el Admin');
      });

    setNuevoAdministrativo({
      nombre: '',
      apellido: '',
      dni: '',
    });
  };

  const goBack = () => {
    navigate('/administrar-Admins');
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Crear Nuevo Admin</h1>
      <button style={styles.buttonBack} onClick={goBack}>Volver</button>
      <form style={styles.formContainer} onSubmit={handleSubmit}>
        <label style={styles.label}>
          Nombre:
          <input style={styles.input} type="text" name="nombre" value={nuevoAdministrativo.nombre} onChange={handleChange} />
        </label>
        <label style={styles.label}>
          Apellido:
          <input style={styles.input} type="text" name="apellido" value={nuevoAdministrativo.apellido} onChange={handleChange} />
        </label>
        <label style={styles.label}>
          DNI:
          <input style={styles.input} type="text" name="dni" value={nuevoAdministrativo.dni} onChange={handleChange} />
        </label>
        <button style={styles.button} type="submit">Crear Admin</button>
      </form>
    </div>
  );
}

export default CrearAdministrativo;
