//Esta api autentica
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../config/db');
const router = express.Router();
require('dotenv').config();
console.log("Hola");
router.post('/login', async(req, res) => {

    
    const { Nombre, Contrasena } = req.body;

    const sql = "select Nombre, Contrasena from Usuario where Nombre = ? and Activo = true";

    console.log(Nombre + ' ha intentado iniciar sesión');

    pool.query(sql, [Nombre], async (err, resultado) => {

        if (err) {
            return res.status(500).json({ mensaje: 'Error en el servidor' });
        }

        if (resultado.length === 0) {
            return res.status(401).json({ mensaje: 'Credenciales invalidas' });
        }

        const usuario = resultado[0];

        const isMatch = await bcrypt.compare(Contrasena, usuario.Contrasena);

        if(!isMatch){
            return res.status(401).json({mensaje: 'Credenciales inválidas'});
        }

        const token = jwt.sign({ Nombre }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ mensaje: 'Autenticacion exitosa', token });

    });

});

module.exports = router;