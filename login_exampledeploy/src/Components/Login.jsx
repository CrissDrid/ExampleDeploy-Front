import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'; // Importa Link de react-router-dom

function Login() {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8086/api/usuario/login', { email, contrasena });
      if (response.data.status === 'success') {
        setSuccess('Inicio de sesión exitoso');
        setError('');
      } else {
        setError('Credenciales inválidas');
        setSuccess('');
      }
    } catch (err) {
      setError('Error en la solicitud');
      setSuccess('');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Iniciar Sesión</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Introduce tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="contrasena">Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="contrasena"
                placeholder="Introduce tu contraseña"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <button type="submit" className="btn btn-primary btn-block">Iniciar Sesión</button>
            <div className="mt-3">
              ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
