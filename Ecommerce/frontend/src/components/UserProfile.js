import React from 'react';



function UserProfile({ user, onLogout }) {
  const handleLogout = () => {
    // Realiza las acciones necesarias para cerrar la sesión
    onLogout();
  };

  return (
    <div>
      <h2>Perfil de Usuario</h2>
      <p>Nombre de usuario: {user.username}</p>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
}

export default UserProfile;
