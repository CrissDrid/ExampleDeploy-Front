import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap'; // Importa desde react-bootstrap

function Register() {
  const [formData, setFormData] = useState({
    identificacion: '',
    nombre: '',
    apellido: '',
    userName: '',
    email: '',
    contrasena: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8086/api/usuario/create', formData);
      setSuccess('Usuario registrado exitosamente');
      setError('');
      setFormData({
        identificacion: '',
        nombre: '',
        apellido: '',
        userName: '',
        email: '',
        contrasena: ''
      });
    } catch (err) {
      setError('Error al registrar usuario: ' + err.response.data.data);
      setSuccess('');
    }
  };

  return (
    <Container>
      <h2 className="my-4">Registro</h2>
      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Identificación</Form.Label>
          <Form.Control
            type="number"
            name="identificacion"
            value={formData.identificacion}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Nombre de Usuario</Form.Label>
          <Form.Control
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            name="contrasena"
            value={formData.contrasena}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">Registrar</Button>
      </Form>
    </Container>
  );
}

export default Register;
