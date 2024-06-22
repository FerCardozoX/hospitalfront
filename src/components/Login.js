import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Simulación de autenticación
    if (username === 'medico') {
      history.push('/menu-medico');
    } else if (username === 'admin') {
      history.push('/menu-admin');
    } else {
      alert('Credenciales inválidas');
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src="path/to/your/image.jpg" alt="Descripción de la imagen" />
      </div>
      <div className="login-right">
        <form className="login-form" onSubmit={handleSubmit}>
          <img src="path/to/your/logo.png" alt="Logo" className="login-logo" />
          <h2>Iniciar Sesión</h2>
          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Recordar Contraseña
            </label>
          </div>
          <button type="submit" className="login-button">Iniciar Sesión</button>
          <a href="/forgot-password" className="forgot-password">Olvidé mi contraseña</a>
        </form>
      </div>
    </div>
  );
}

export default Login;
