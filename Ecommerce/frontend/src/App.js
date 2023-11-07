
import UserLogin from './components/UserLogin';
import UserProfile from './components/UserProfile';
import UserRegister from './components/UserRegister'; // Importa el componente UserRegister
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';

import { Navigate } from 'react-router-dom';

function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    // Realiza las acciones necesarias para cerrar la sesión
    setUser(null); // Establece el estado del usuario en null para indicar que no hay sesión
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/carrito">Carrito ({cart.length})</Link>
            </li>
            <li>
              {user ? (
                <Link to="/perfil">Perfil</Link>
              ) : (
                <Link to="/login">Iniciar sesión</Link>
              )}
            </li>
            <li>
              <Link to="/registro">Registro</Link> {/* Agrega el enlace a la página de registro */}
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/carrito" element={<CartPage cart={cart} setCart={setCart} />} />
          <Route path="/login" element={<UserLogin setUser={setUser} />} />
          <Route path="/perfil" element={user ? <UserProfile user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="/registro" element={<UserRegister />} /> {/* Agrega la ruta para el registro */}
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}



function CartPage({ cart, setCart }) {
  return (
    <div>
      <h2>Carrito de Compra</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

