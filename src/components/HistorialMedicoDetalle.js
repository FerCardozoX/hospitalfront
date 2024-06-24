import React from 'react';
import { useLocation } from 'react-router-dom';

function HistorialMedicoDetalle() {
  const { state } = useLocation();
  const { historial, paciente } = state;

  const styles = {
    container: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
    },
    sectionTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '10px',
      cursor: 'pointer',
    },
    list: {
      listStyleType: 'none',
      padding: 0,
    },
    listItem: {
      border: '1px solid #ddd',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px',
      transition: 'box-shadow 0.3s',
    },
    details: {
      marginTop: '10px',
    },
  };

  if (!historial) {
    return <div style={styles.container}>No hay historial disponible para este paciente.</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Detalle del Historial Médico</h1>
      <p><strong>Paciente:</strong> {paciente.nombre} {paciente.apellido}</p>
      <p><strong>DNI:</strong> {paciente.dni}</p>
      <div>
        <h2 style={styles.sectionTitle}>Diagnósticos</h2>
        <ul style={styles.list}>
          {historial.diagnosticos.map((diag, index) => (
            <li key={index} style={styles.listItem}>
              <strong>Fecha:</strong> {new Date(diag.fecha).toLocaleDateString()}<br />
              <strong>Diagnóstico:</strong> {diag.diagnostico}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 style={styles.sectionTitle}>Tratamientos</h2>
        <ul style={styles.list}>
          {historial.tratamientos.map((trat, index) => (
            <li key={index} style={styles.listItem}>
              <strong>Descripción:</strong> {trat.descripcion}<br />
              <strong>Medicaciones:</strong> {trat.medicacion.join(', ')}<br />
              <strong>Procedimientos:</strong> {trat.procedimientos.join(', ')}<br />
              <strong>Recomendaciones:</strong> {trat.recomendaciones}<br />
              <strong>Fecha Inicio:</strong> {new Date(trat.fecha_inicio).toLocaleDateString()}<br />
              <strong>Fecha Fin:</strong> {new Date(trat.fecha_fin).toLocaleDateString()}
              <div style={styles.details}>
                <strong>Comentarios:</strong>
                <ul style={styles.list}>
                  {trat.comentarios.map((coment, index) => (
                    <li key={index} style={styles.listItem}>
                      <strong>Médico:</strong> {coment.medico_nombre} ({coment.medico_id})<br />
                      <strong>Comentario:</strong> {coment.comentario}<br />
                      <strong>Fecha:</strong> {new Date(coment.fecha).toLocaleDateString()}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 style={styles.sectionTitle}>Hospitalizaciones</h2>
        <ul style={styles.list}>
          {historial.hospitalizaciones.map((hosp, index) => (
            <li key={index} style={styles.listItem}>
              <strong>Fecha Ingreso:</strong> {new Date(hosp.fecha_ingreso).toLocaleDateString()}<br />
              <strong>Fecha Alta:</strong> {new Date(hosp.fecha_alta).toLocaleDateString()}<br />
              <strong>Detalles Tratamiento:</strong> {hosp.detalles_tratamiento}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 style={styles.sectionTitle}>Observaciones</h2>
        <p>{historial.observaciones}</p>
      </div>
    </div>
  );
}

export default HistorialMedicoDetalle;
