import React, { useState } from 'react';
import axios from 'axios'; // Importa axios
import { TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envía los datos del formulario al backend
      await axios.post('/send-email', formData)
      console.log('Correo enviado correctamente');
      // Aquí podrías mostrar algún mensaje de éxito o redirigir al usuario a una página de confirmación
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      // Aquí podrías mostrar algún mensaje de error al usuario
    }
  };

  return (
    <form onSubmit={handleSubmit} className='contact-form'>
      <div className="form-header">Contactarse</div>
      <TextField
        name="nombre"
        label="Nombre"
        variant="outlined"
        value={formData.nombre}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="email"
        label="Email"
        variant="outlined"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="mensaje"
        label="Mensaje"
        variant="outlined"
        value={formData.mensaje} 
        onChange={handleChange}
        fullWidth
        multiline
        rows={4}
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" endIcon={<SendIcon />}>
        Enviar
      </Button>
    </form>
  );
};

export default Contact;
