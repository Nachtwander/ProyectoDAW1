
const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../config/db');
const router = express.Router();

module.exports = router;

const authMiddleWare  = require('../middlewares/authMiddleWare');

//CATEGORIAS
//Api GET categorias (Muestra todas las categorias)
router.get('/categorias', authMiddleWare , (req, res) => {
    const sql = "select * from Categoria";
    pool.query(sql, (err, resultado) => {
        if (err) {
            res.status(500).json({ error: 'Error al obtener las categorias' });
        } else {
            res.json(resultado);
        }
    });
});

//Api POST categorias (Agrega una categoria);
router.post('/categorias', authMiddleWare , (req, res) => {
    const { Nombre_Categoria } = req.body;
    const sql = "insert into Categoria (Nombre_Categoria) values (?)";

    pool.query(sql, [Nombre_Categoria], (err, resultado) => {
        if (err) {
            res.status(500).json({ error: 'Error al agregar la categoria' });
        } else {
            res.status(201).json({ mensaje: 'Categoria agregada', id: resultado.insertId });
        }
    });
});

//Api PUT categorias (Actualiza una categoria);
router.put('/categorias', authMiddleWare , (req, res) => {

    const { Id_Categoria, Nombre_Categoria } = req.body;

    const sql = "update Categoria set Nombre_Categoria = ? where Id_Categoria = ?";

    if (!Id_Categoria || !Nombre_Categoria) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    };

    pool.query(sql, [Nombre_Categoria, Id_Categoria], (err, resultado) => {
        if (err) {
            res.status(500).json({ error: 'Error al actualizar la categoria' });
        } else if (resultado.affectedRows === 0) {
            res.status(404).json({ mensaje: 'Categoria no encontrada' });
        } else {
            res.status(200).json({ mensaje: 'Categoria actualizada', categoria: req.body });
        }
    });
});

//Api DELETE categorias (Elimina una categoria);
router.delete('/categorias/:id', authMiddleWare , (req, res) => {
    const { id } = req.params;
    const sql = "delete from Categoria where Id_Categoria = ?";

    if (!id) {
        return res.status(400).json({ error: 'El parametro id es requerido' });
    };

    pool.query(sql, [id], (err, resultado) => {
        if (err) {
            res.status(500).json({ error: 'Error al eliminar la categoria' });
        } else {
            res.status(200).json({ mensaje: 'Categoria eliminada' });
        }
    });
});

