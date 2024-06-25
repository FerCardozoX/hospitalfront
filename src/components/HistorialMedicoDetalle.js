import React from 'react';
import { useLocation,useNavigate} from 'react-router-dom';
import { Document, Page, Text, View, StyleSheet, PDFViewer, Link } from '@react-pdf/renderer';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


function HistorialMedicoDetalle() {
  const navigate = useNavigate();
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

  const handleClick = () => {
    navigate(-1);
  };

  const handleExcelDownload = () => {
    const workbook = XLSX.utils.book_new();
  
    // Diagnósticos
    const diagSheet = XLSX.utils.json_to_sheet(historial.diagnosticos);
    XLSX.utils.book_append_sheet(workbook, diagSheet, 'Diagnosticos');
  
    // Tratamientos
    const tratSheet = XLSX.utils.aoa_to_sheet([
      ['Descripción', 'Medicaciones', 'Procedimientos', 'Recomendaciones', 'Fecha Inicio', 'Fecha Fin', 'Comentarios']
    ]);
    historial.tratamientos.forEach((trat, index) => {
      const medicaciones = trat.medicacion.join(', ');
      const procedimientos = trat.procedimientos.join(', ');
      const comentarios = trat.comentarios.map(coment => `${coment.medico_nombre} (${coment.medico_id}): ${coment.comentario}, `).join('\n');
      XLSX.utils.sheet_add_aoa(tratSheet, [[trat.descripcion, medicaciones, procedimientos, trat.recomendaciones, new Date(trat.fecha_inicio).toLocaleDateString(), new Date(trat.fecha_fin).toLocaleDateString(), comentarios]], { origin: -1 });
    });
    XLSX.utils.book_append_sheet(workbook, tratSheet, 'Tratamientos');
  
    // Hospitalizaciones
    const hospSheet = XLSX.utils.json_to_sheet(historial.hospitalizaciones);
    XLSX.utils.book_append_sheet(workbook, hospSheet, 'Hospitalizaciones');
  
    // Observaciones
    const obsSheet = XLSX.utils.aoa_to_sheet([[historial.observaciones]]);
    XLSX.utils.book_append_sheet(workbook, obsSheet, 'Observaciones');
  
    // Save the workbook
    XLSX.writeFile(workbook, 'historial_medico.xlsx');
  };
  
  const handlePdfDownload = () => {
    const MyDocument = (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.title}>Detalle del Historial Médico</Text>
          <Text><strong>Paciente:</strong> {paciente.nombre} {paciente.apellido}</Text>
          <Text><strong>DNI:</strong> {paciente.dni}</Text>
          <Text break></Text>
          <Text style={styles.sectionTitle}>Diagnósticos</Text>
          {historial.diagnosticos.map((diag, index) => (
            <View key={index} style={styles.listItem}>
              <Text><strong>Fecha:</strong> {new Date(diag.fecha).toLocaleDateString()}</Text>
              <Text><strong>Diagnóstico:</strong> {diag.diagnostico}</Text>
            </View>
          ))}
          <Text break></Text>
          <Text style={styles.sectionTitle}>Tratamientos</Text>
          {historial.tratamientos.map((trat, index) => (
            <View key={index} style={styles.listItem}>
              <Text><strong>Descripción:</strong> {trat.descripcion}</Text>
              <Text><strong>Medicaciones:</strong> {trat.medicacion.join(', ')}</Text>
              <Text><strong>Procedimientos:</strong> {trat.procedimientos.join(', ')}</Text>
              <Text><strong>Recomendaciones:</strong> {trat.recomendaciones}</Text>
              <Text><strong>Fecha Inicio:</strong> {new Date(trat.fecha_inicio).toLocaleDateString()}</Text>
              <Text><strong>Fecha Fin:</strong> {new Date(trat.fecha_fin).toLocaleDateString()}</Text>
              {trat.comentarios.map((comentario, index) => (
                <View key={index} style={styles.listItem}>
                  <Text><strong>Médico:</strong> {comentario.medico_nombre} ({comentario.medico_id})</Text>
                  <Text><strong>Comentario:</strong> {comentario.comentario}</Text>
                  <Text><strong>Fecha:</strong> {new Date(comentario.fecha).toLocaleDateString()}</Text>
                </View>
              ))}
            </View>
          ))}
          <Text break></Text>
          <Text style={styles.sectionTitle}>Hospitalizaciones</Text>
          {historial.hospitalizaciones.map((hosp, index) => (
            <View key={index} style={styles.listItem}>
              <Text><strong>Fecha Ingreso:</strong> {new Date(hosp.fecha_ingreso).toLocaleDateString()}</Text>
              <Text><strong>Fecha Alta:</strong> {new Date(hosp.fecha_alta).toLocaleDateString()}</Text>
              <Text><strong>Detalles Tratamiento:</strong> {hosp.detalles_tratamiento}</Text>
            </View>
          ))}
          <Text break></Text>
          <Text style={styles.sectionTitle}>Observaciones</Text>
          <Text>{historial.observaciones}</Text>
        </Page>
      </Document>
    );

    const pdfBlob = new Blob([MyDocument], { type: 'application/pdf' });
    saveAs(pdfBlob, 'historial_medico.pdf');
  };

  const handleAgregarTratamiento = () => {
    navigate(`/historial/${paciente.idPaciente}/agregar-tratamiento`);
  };

  const handleAgregarDiagnostico = () => {
    navigate(`/historial/${paciente.idPaciente}/agregar-diagnostico`);
  };

  const handleAgregarHospitalizacion = () => {
    navigate(`/historial/${paciente.idPaciente}/agregar-hospitalizacion`);
  };



  return (
    <div style={styles.container}> 
    <button onClick={handleClick}>Volver atrás</button>
    <button onClick={handleExcelDownload}>Descargar Excel</button>
    <button onClick={handlePdfDownload}>Descargar PDF</button>
    <button onClick={handleAgregarTratamiento}>Agregar Tratamiento</button>
      <button onClick={handleAgregarDiagnostico}>Agregar Diagnóstico</button>
      <button onClick={handleAgregarHospitalizacion}>Agregar Hospitalización</button>
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
