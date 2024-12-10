

const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../config/db');
const router = express.Router();

module.exports = router;

const authMiddleWare  = require('../middlewares/authMiddleWare');

//USUARIOS
//Api GET usuarios (Muestra todos los usuarios)
router.get('/usuarios', authMiddleWare, (req, res) => {
    const sql = "select * from Usuario";
    pool.query(sql, (err, resultado) => {
        if (err) {
            res.status(500).json({ error: 'Error al obtener los usuarios' });
        } else {
            res.json(resultado);
        }
    });
});

//Api GET usuarios/:id (Muestra un usuario por su id)
router.get('/usuarios/:id', authMiddleWare, (req, res) => {
    res.send('Esto esta pendiente!');
});

//Api POST usuarios (Agrega un usuario)
router.post('/usuarios/', authMiddleWare, (req, res) => {
    const { Nombre, Apellido, Contrasena, Correo, Id_Rol, Activo } = req.body;
    const sql = "insert into Usuario (Nombre, Apellido, Contrasena, Correo, Id_Rol, Activo) values (?, ?, ?, ?, ?, ?)";

    pool.query(sql, [Nombre, Apellido, Contrasena, Correo, Id_Rol, Activo], (err, resultado) => {
        if (err) {
            res.status(500).json({ error: 'Error al agregar el usuario' });
        } else {
            res.status(201).json({ mensaje: 'Usuario agregado', id: resultado.insertId });
        }
    });
});

//Api PUT usuarios (Actualiza un usuario);
router.put('/usuarios', authMiddleWare, (req, res) => {

    const { Id_Usuario, Nombre, Apellido, Contrasena, Correo, Id_Rol, Activo } = req.body;

    const sql = "update Usuario set Nombre = ?, Apellido = ?, Contrasena = ?, Correo = ?, Id_Rol = ?, Activo = ? where Id_Usuario = ?";

    if (!Id_Usuario || !Nombre || !Apellido || !Contrasena || !Correo || !Id_Rol || !Activo) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    };

    pool.query(sql, [Nombre, Apellido, Contrasena, Correo, Id_Rol, Activo, Id_Usuario], (err, resultado) => {
        if (err) {
            res.status(500).json({ error: 'Error al actualizar el usuario' });
        } else if (resultado.affectedRows === 0) {
            res.status(404).json({ mensaje: 'Usuario no encontrado' });
        } else {
            res.status(200).json({ mensaje: 'Usuario actualizado', usuario: req.body });
        }
    });
});

//Api DELETE usuarios (Elimina un usuario);
router.delete('/usuarios/:id', authMiddleWare, (req, res) => {
    const { id } = req.params;
    const sql = "delete from Usuario where Id_Usuario = ?";

    if (!id) {
        return res.status(400).json({ error: 'El parametro id es requerido' });
    };

    pool.query(sql, [id], (err, resultado) => {
        if (err) {
            res.status(500).json({ error: 'Error al eliminar el usuario' });
        } else {
            res.status(200).json({ mensaje: 'Usuario eliminado' });
        }
    });
});
