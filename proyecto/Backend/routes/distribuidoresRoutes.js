

const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../config/db');
const router = express.Router();

module.exports = router;

const authMiddleWare  = require('../middlewares/authMiddleWare');

//DISTRIBUIDORES
//Api GET distribuidores (Muestra todos los distribuidores)
router.get('/distribuidores', authMiddleWare , (req, res) => {
    const sql = "select * from Distribuidores";
    pool.query(sql, (err, resultado) => {
        if (err) {
            res.status(500).json({ error: 'Error al obtener los distribuidores' });
        } else {
            res.json(resultado);
        }
    });
});

//Api POST distribuidores (Agrega un distribuidor)
router.post('/distribuidores', authMiddleWare, (req, res) => {
    const { Nombre_Distribuidor, Correo, Telefono, Direccion } = req.body;
    const sql = "insert into Distribuidores (Nombre_Distribuidor, Correo, Telefono, Direccion) values (?, ?, ?, ?)";

    pool.query(sql, [Nombre_Distribuidor, Correo, Telefono, Direccion], (err, resultado) => {
        if (err) {
            res.status(500).json({ error: 'Error al agregar el distribuidor' });
        } else {
            res.status(201).json({ mensaje: 'Distribuidor agregado', id: resultado.insertId });
        }
    });
});

//Api PUT distribuidores (Actualiza un distribuidor);
router.put('/distribuidores', authMiddleWare, (req, res) => {

    const { Id_Distribuidor, Nombre_Distribuidor, Correo, Telefono, Direccion } = req.body;

    const sql = "update Distribuidores set Nombre_Distribuidor = ?, Correo = ?, Telefono = ?, Direccion = ? where Id_Distribuidor = ?";

    if (!Id_Distribuidor || !Nombre_Distribuidor || !Correo || !Telefono || !Direccion) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    };

    pool.query(sql, [Nombre_Distribuidor, Correo, Telefono, Direccion, Id_Distribuidor], (err, resultado) => {
        if (err) {
            res.status(500).json({ error: 'Error al actualizar el distribuidor' });
        } else if (resultado.affectedRows === 0) {
            res.status(404).json({ mensaje: 'Distribuidor no encontrado' });
        } else {
            res.status(200).json({ mensaje: 'Distribuidor actualizado', distribuidor: req.body });
        }
    });
});

//Api DELETE distribuidores (Elimina una distribuidor);
router.delete('/distribuidores/:id', authMiddleWare, (req, res) => {
    const { id } = req.params;
    const sql = "delete from Distribuidores where Id_Distribuidor = ?";

    if (!id) {
        return res.status(400).json({ error: 'El parametro id es requerido' });
    };

    pool.query(sql, [id], (err, resultado) => {
        if (err) {
            res.status(500).json({ error: 'Error al eliminar el distribuidor' });
        } else {
            res.status(200).json({ mensaje: 'Distribuidor eliminado' });
        }
    });
});
