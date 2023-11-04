import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserRegister() {
  const navigate = useNavigate();
  const [nombre, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:3001/usuarios/Guardar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, email, password }),
      });

      if (response.ok) {
        // Registro exitoso, puedes redirigir a otra página
        navigate('/perfil'); // Cambia '/perfil' a la ruta deseada
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
      <h2>Registro de Usuario</h2>
      <div>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
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
        <button onClick={handleRegister}>Registrarse</button>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
}

export default UserRegister;
