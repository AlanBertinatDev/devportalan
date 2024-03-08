const express = require('express');
const cors = require('cors');
const path = require('path');
console.log(__dirname);
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde la carpeta public en client/frontend
app.use(express.static(path.join(__dirname, 'client', 'frontend', 'public')));

// Ruta comodín para enviar index.html en cualquier otra solicitud
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'frontend', 'public', 'index.html'));
});

// Ruta para las solicitudes relacionadas con el envío de correos electrónicos
const sendEmailRouter = require('./backend/routesBack/sendEmail');
app.use('/api', sendEmailRouter);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend en ejecución en el puerto ${PORT}`);
});
