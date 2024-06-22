import React, { useState } from 'react';
import './CargarTratamiento.css';

function CargarTratamiento() {
  const [tratamientos, setTratamientos] = useState([
    // Aquí irían los tratamientos obtenidos de la base de datos
    { id: 1, descripcion: 'Tratamiento A' },
    { id: 2, descripcion: 'Tratamiento B' },
  ]);
  const [selectedTratamiento, setSelectedTratamiento] = useState(null);
  const [comentario, setComentario] = useState('');

  const handleSelect = (tratamiento) => {
    setSelectedTratamiento(tratamiento);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para guardar comentario en la base de datos
    console.log('Comentario guardado:', comentario);
  };

  return (
    <div className="tratamiento-container">
      <h2>Cargar Tratamiento</h2>
      <div className="tratamientos-list">
        {tratamientos.map((tratamiento) => (
          <button key={tratamiento.id} onClick={() => handleSelect(tratamiento)}>
            {tratamiento.descripcion}
          </button>
        ))}
      </div>
      {selectedTratamiento && (
        <form onSubmit={handleSubmit}>
          <h3>{selectedTratamiento.descripcion}</h3>
          <textarea
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder="Dejar un comentario"
            required
          ></textarea>
          <button type="submit">Guardar Comentario</button>
        </form>
      )}
    </div>
  );
}

export default CargarTratamiento;
