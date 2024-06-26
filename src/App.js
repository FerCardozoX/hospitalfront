import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';
import Login from './components/Login';
import MenuMedico from './components/MenuMedico';
import MenuAdmin from './components/MenuAdmin';
import AdministrarPacientes from './components/AdministrarPacientes';
import AdministrarMedicos from './components/AdministrarMedicos';
import AdministrarTurnos from './components/AdministrarTurnos';
import VerHistorialMedico from './components/VerHistorialMedico';
import VerHistorialMedicoAdmin from './components/VerHistorialMedicoAdmin';
import VerTurnos from './components/VerTurnos';
import CrearPaciente from './components/CrearPaciente';
import VisualizarPaciente from './components/VisualizarPaciente';
import CrearMedico from './components/CrearMedico';
import VisualizarMedico from './components/VisualizarMedico';
import AdministrarAdministrativos from './components/AdministrarAdministrativos';
import CrearAdministrativo from './components/CrearAdministrativo';
import VisualizarAdministrativo from './components/VisualizarAdministrativo';
import AdministrarUsuarios from './components/AdministrarUsuarios';
import AgendarCita from './components/AgendarCita';
import HistorialMedicoDetalle from './components/HistorialMedicoDetalle';
import HistorialMedicoDetalleAdmin from './components/HistorialMedicoDetalleAdmin';
import AgregarTratamiento from './components/AgregarTratamiento';
import AgregarDiagnostico from './components/AgregarDiagnostico';
import AgregarHospitalizacion from './components/AgregarHospitalizacion';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/Login" replace />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/menu-medico" element={<MenuMedico />} />
        <Route path="/menu-admin" element={<MenuAdmin />} />
        <Route path="/Agendar-Cita" element={<AgendarCita />} />
        <Route path="/administrar-pacientes" element={<AdministrarPacientes />} />
        <Route path="/crear-paciente" element={<CrearPaciente />} />
        <Route path="/ver-paciente/:dni" element={<VisualizarPaciente />} />
        <Route path="/administrar-medicos" element={<AdministrarMedicos />} />
        <Route path="/crear-medico" element={<CrearMedico />} />
        <Route path="/ver-medico/:dni" element={<VisualizarMedico />} />
        <Route path="/administrar-admins" element={<AdministrarAdministrativos />} />
        <Route path="/crear-Administrativo" element={<CrearAdministrativo />} />
        <Route path="/ver-Administrativo/:dni" element={<VisualizarAdministrativo />} />
        <Route path="/administrar-usuarios" element={<AdministrarUsuarios />} />
        <Route path="/administrar-turnos" element={<AdministrarTurnos />} />
        <Route path="/ver-historial-medico" element={<VerHistorialMedico />} />
        <Route path="/historial/:pacienteId" element={<HistorialMedicoDetalle />} />
        <Route path="/ver-turnos" element={<VerTurnos />} />
        <Route path="/historialMedicoDetalle" element={<HistorialMedicoDetalle />} />
        <Route path="/historial/:pacienteId/agregar-tratamiento" element={<AgregarTratamiento />} />
        <Route path="/historial/:pacienteId/agregar-hospitalizacion" element={<AgregarHospitalizacion />} />
        <Route path="/historial/:pacienteId/agregar-diagnostico" element={<AgregarDiagnostico />} />
        <Route path="/ver-historial-medicoADM" element={<VerHistorialMedicoAdmin />} />
        <Route path="/historialADM/:pacienteId" element={<HistorialMedicoDetalleAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;
