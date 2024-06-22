import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './health.png';

const styles = {
  loginContainer: {
    display: 'flex',
    height: '100vh',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
  imageContainer: {
    flex: 1,
    backgroundImage: 'url(https://www.cetys.mx/educon/wp-content/uploads/2021/09/hospital-CRM-1536x1025.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  formContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
    backgroundColor: '#ffffff',
    boxShadow: '0px 4px 10px rgba(252, 76, 78, 0.3)', 
  },  
  form: {
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  header: {
    fontSize: '32px',
    marginBottom: '30px',
    color: '#333',
  },
  input: {
    marginBottom: '20px',
    padding: '15px',
    width: '100%',
    borderRadius: '5px',
    border: '1px solid #fc4c4e',
    fontSize: '16px',
    boxSizing: 'border-box',
  },
  button: {
    padding: '15px',
    width: '100%',
    borderRadius: '5px',
    backgroundColor: '#fc4c4e',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#fc4c4e',
  },
};

const Login = () => {
  const [isButtonHover, setIsButtonHover] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    //  lógica para autenticar al usuario
    if (username === 'medico') {
      navigate('/menu-medico');
    } else if (username === 'admin') {
      navigate('/menu-admin');
    }
    else {
      navigate('/menu-admin');
    }
  };

  return (
    <div style={styles.loginContainer}>
      <div style={styles.imageContainer}></div>
      <div style={styles.formContainer}>
        <img src={logo} alt="Logo" style={{ width: '200px', marginBottom: '30px' }} /> 
        <form style={styles.form} onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Usuario" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            style={styles.input} 
            required 
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={styles.input} 
            required 
          />
          <button
            type="submit"
            style={{
              ...styles.button,
              ...(isButtonHover ? styles.buttonHover : {}),
            }}
            onMouseEnter={() => setIsButtonHover(true)}
            onMouseLeave={() => setIsButtonHover(false)}
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
