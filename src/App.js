import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';
import Login from './components/Login';
import MenuMedico from './components/MenuMedico';
import MenuAdmin from './components/MenuAdmin';
import AdministrarPacientes from './components/AdministrarPacientes';
import AdministrarMedicos from './components/AdministrarMedicos';
import AdministrarTurnos from './components/AdministrarTurnos';
import VerHistorialMedico from './components/VerHistorialMedico';
import CargarTratamiento from './components/CargarTratamiento';
import CargarHospitalizacion from './components/CargarHospitalizacion';
import VerTurnos from './components/VerTurnos';
import CrearPaciente from './components/CrearPaciente';
import VisualizarPaciente from './components/VisualizarPaciente';
import CrearMedico from './components/CrearMedico';
import VisualizarMedico from './components/VisualizarMedico';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/Login" replace />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/menu-medico" element={<MenuMedico />} />
        <Route path="/menu-admin" element={<MenuAdmin />} />
        <Route path="/administrar-pacientes" element={<AdministrarPacientes />} />
        <Route path="/crear-paciente" element={<CrearPaciente />} />
        <Route path="/ver-paciente" element={<VisualizarPaciente />} />
        <Route path="/administrar-medicos" element={<AdministrarMedicos />} />
        <Route path="/crear-medico" element={<CrearMedico />} />
        <Route path="/ver-medico" element={<VisualizarMedico />} />
        <Route path="/administrar-turnos" element={<AdministrarTurnos />} />
        <Route path="/ver-historial-medico" element={<VerHistorialMedico />} />
        <Route path="/cargar-tratamiento" element={<CargarTratamiento />} />
        <Route path="/cargar-hospitalizacion" element={<CargarHospitalizacion />} />
        <Route path="/ver-turnos" element={<VerTurnos />} />
      </Routes>
    </Router>
  );
}

export default App;
