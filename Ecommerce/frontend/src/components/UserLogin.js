// UserLogin.js
import React, { useState } from 'react';
import UserProfile from './UserProfile'; // Importa el componente UserProfile


function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null); // Estado para almacenar el usuario


  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/usuarios/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Procesar inicio de sesión exitoso
        const userData = await response.json();
        setUser(userData); // Almacena los datos del usuario en el estado
      } else {
        const errorData = await response.json();
        setError(errorData.mensaje);
      }
    } catch (error) {
      console.error('Error en la solicitud AJAX:', error);
      setError('Error en la solicitud AJAX');
    }
  };

  return (
    <div>
      {user ? ( // Si hay un usuario, muestra el componente UserProfile
        <UserProfile user={user} />
      ) : (
        <div>
          <h2>Iniciar Sesión</h2>
          <div>
            <input
              type="text"
              placeholder="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button onClick={handleLogin}>Iniciar Sesión</button>
          </div>
          {error && <p>{error}</p>} {/* Muestra mensajes de error */}
        </div>
      )}
    </div>
  );
}

export default UserLogin;
