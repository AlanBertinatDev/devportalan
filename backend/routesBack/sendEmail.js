const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/send-email', (req, res) => {
  const { nombre, email, mensaje } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    secure: false, 
    auth: {
      user: "1e160fd2092d7b",
      pass: "********87fe"
    }
  });  

  const mailOptions = {
    from: email, 
    to: 'alanbertinat17@gmail.com', 
    subject: 'Consulta del portfolio web',
    text: `Nombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
      res.status(500).send('Error al enviar el correo');
    } else {
      console.log('Correo enviado:', info.response);
      res.status(200).send('Correo enviado correctamente');
    }
  });
});

module.exports = router;
