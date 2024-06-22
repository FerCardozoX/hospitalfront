import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  menuContainer: {
    padding: 20,
    backgroundImage: `url('https://offloadmedia.feverup.com/barcelonasecreta.com/wp-content/uploads/2018/12/09111320/2068536-1024x597.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  menuCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    padding: 20,
    maxWidth: 600,
    textAlign: 'center',
  },
  menuOptions: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  menuOption: {
    backgroundColor: '#fc4c4e',
    color: 'white',
    padding: 10,
    margin: 10,
    textDecoration: 'none',
    borderRadius: 4,
    flex: '1 1 30%',
    textAlign: 'center',
  },
  profileButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: '50%',
    backgroundColor: '#fc4c4e',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 8,
    boxShadow: '0px 8px 16px rgba(0,0,0,0.2)',
    display: 'none',
  },
  dropdownButton: {
    padding: '10px 20px',
    textDecoration: 'none',
    display: 'block',
    width: '100%',
    textAlign: 'left',
    color: 'black',
  },
};

function MenuAdmin() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileButtonPos, setProfileButtonPos] = useState({ top: 0, left: 0 });
  const navigate = useNavigate();
  const profileButtonRef = useRef(null);

  useEffect(() => {
    if (profileButtonRef.current) {
      const rect = profileButtonRef.current.getBoundingClientRect();
      setProfileButtonPos({ top: rect.bottom, left: rect.left });
    }
  }, [dropdownOpen]);

  const handleLogout = () => {
    console.log('Cerrar sesión');
    navigate('/Login');
  };

  return (
    <div style={styles.menuContainer}>
      <div style={styles.menuCard}>
        <h2>Menú médico</h2>
        <div style={styles.menuOptions}>
          <div style={styles.menuOption} onClick={() => navigate('/cargar-tratamiento')}>
            Cargar tratamiento
          </div>
          <div style={styles.menuOption} onClick={() => navigate('/ver-historial-medico')}>
            Ver historial Médico
          </div>
          <div style={styles.menuOption} onClick={() => navigate('/cargar-hospitalizacion')}>
            Cargar Hospitalización
          </div>
          <div style={styles.menuOption} onClick={() => navigate('/ver-turnos')}>
            Ver Turnos
          </div>
        </div>
      </div>
      <div
        ref={profileButtonRef}
        style={styles.profileButton}
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
      </div>
      {dropdownOpen && (
        <div
          style={{
            ...styles.dropdown,
            top: profileButtonPos.top + 10,
            left: profileButtonPos.left - 100,
            display: 'block',
          }}
        >
          <div style={styles.dropdownButton} onClick={() => navigate('/mi-perfil')}>
            Ver Perfil
          </div>
          <div style={styles.dropdownButton} onClick={handleLogout}>
            Cerrar Sesión
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuAdmin;
