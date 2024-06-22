import React from 'react';
import { useNavigate } from 'react-router-dom';

function VerHistorialMedico() {
  const navigate = useNavigate();

  // Lógica del componente aquí

  const goBack = () => {
    navigate(-1); // Navega hacia atrás en el historial
  };

  return (
    <div>
      {/* Contenido del componente */}
      <button onClick={goBack}>Volver</button>
    </div>
  );
}

export default VerHistorialMedico;
