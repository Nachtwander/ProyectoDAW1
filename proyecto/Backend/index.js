require('dotenv').config();
const express = require('express');
const path = require('path'); // Importa path para manejar rutas de archivos
const cors = require('cors');

const app = express();

// Importando Módulos Locales
const authRoutes = require('./routes/authRoutes');
const categoriasRoutes = require('./routes/categoriasRoutes');
const distribuidoresRoutes = require('./routes/distribuidoresRoutes');
const productosRoutes = require('./routes/productosRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');

const port = process.env.PORT || 3001;

// Configuraciones generales
app.use(express.json());
app.use(cors());

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, 'public')));

// Configuración Rutas API
app.use('/api/auth', authRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/distribuidores', distribuidoresRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/usuarios', usuariosRoutes);

// Manejar rutas de Angular (Single Page Application)
app.get('*', (req, res) => {
    res.sendFile('C:/Users/Administrador/Documents/ProyectoDW/Frontend/src/index.html');
});

/*app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'browser', 'index.html'));
});*/


// Manejo de errores global
app.use((err, req, res, next) => {
    console.error('Error global:', err.message);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
