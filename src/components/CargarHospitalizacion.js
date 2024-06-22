import React, { useState } from 'react';
import './CargarHospitalizacion.css';

function CargarHospitalizacion() {
  const [dni, setDni] = useState('');
  const [hospitalizaciones, setHospitalizaciones] = useState([
    // Aquí irían las hospitalizaciones obtenidas de la base de datos
    { id: 1, fecha_ingreso: '2022-01-01', fecha_alta: null },
  ]);
  const [detalles, setDetalles] = useState('');

  const handleSearch = () => {
    // Lógica para buscar hospitalizaciones en la base de datos
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para guardar hospitalización en la base de datos
    console.log('Hospitalización guardada:', detalles);
  };

  const hospitalizacionPendiente = hospitalizaciones.some((h) => !h.fecha_alta);

  return (
    <div className="hospitalizacion-container">
      <h2>Cargar Hospitalización</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar por DNI"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>
      {hospitalizacionPendiente ? (
        <p>Existe una hospitalización pendiente de cierre para este paciente.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <textarea
            value={detalles}
            onChange={(e) => setDetalles(e.target.value)}
            placeholder="Detalles del tratamiento"
            required
          ></textarea>
          <button type="submit">Guardar Hospitalización</button>
        </form>
      )}
    </div>
  );
}

export default CargarHospitalizacion;
