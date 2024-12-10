

const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../config/db');
const router = express.Router();

module.exports = router;

const authMiddleWare  = require('../middlewares/authMiddleWare');

//PRODUCTOS
//Api GET productos (Muestra todos los productos)
router.get('/productos', authMiddleWare, (req, res) => {
    const sql = "select * from Producto";
    pool.query(sql, (err, resultado) => {
        if (err) {
            res.status(500).json({ error: 'Error al obtener los productos' });
        } else {
            res.json(resultado);
        }
    });
});

//Api GET productos/:id (Muestra un producto por su id)
router.get('/productos/:id', authMiddleWare, (req, res) => {
    res.send('Esto esta pendiente!');
});

//Api POST productos (Agrega un producto)
router.post('/productos', authMiddleWare, (req, res) => {
    const { Nombre, Descripcion, Precio, Cantidad, Id_Categoria, Fecha_Creacion, Fecha_Modificacion, Fecha_Vencimiento, Numero_Lote, Marca, Id_Distribuidor, Activo } = req.body;
    const sql = "insert into Producto (Nombre, Descripcion, Precio, Cantidad, Id_Categoria, Fecha_Creacion, Fecha_Modificacion, Fecha_Vencimiento, Numero_Lote, Marca, Id_Distribuidor, Activo) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    pool.query(sql, [Nombre, Descripcion, Precio, Cantidad, Id_Categoria, Fecha_Creacion, Fecha_Modificacion, Fecha_Vencimiento, Numero_Lote, Marca, Id_Distribuidor, Activo], (err, resultado) => {
        if (err) {
            res.status(500).json({ error: 'Error al agregar el producto' });
        } else {
            res.status(201).json({ mensaje: 'Producto agregado', id: resultado.insertId });
        }
    });
});

//Api PUT productos (Actualiza un producto);
router.put('/productos', authMiddleWare, (req, res) => {

    const { Id_Producto, Nombre, Descripcion, Precio, Cantidad, Id_Categoria, Fecha_Creacion, Fecha_Modificacion, Fecha_Vencimiento, Numero_Lote, Marca, Id_Distribuidor, Activo } = req.body;

    const sql = "update Producto set Nombre = ?, Descripcion = ?, Precio = ?, Cantidad = ?, Id_Categoria = ?, Fecha_Creacion = ?, Fecha_Modificacion = ?, Fecha_Vencimiento = ?, Numero_Lote = ?, Marca = ?, Id_Distribuidor = ?, Activo = ? where Id_Producto = ?";

    if (!Id_Producto || !Nombre || !Descripcion || !Precio || !Cantidad || !Id_Categoria || !Fecha_Creacion || !Fecha_Modificacion || !Fecha_Vencimiento || !Numero_Lote || !Marca || !Id_Distribuidor || !Activo) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    };

    pool.query(sql, [Nombre, Descripcion, Precio, Cantidad, Id_Categoria, Fecha_Creacion, Fecha_Modificacion, Fecha_Vencimiento, Numero_Lote, Marca, Id_Distribuidor, Activo, Id_Producto], (err, resultado) => {
        if (err) {
            res.status(500).json({ error: 'Error al actualizar el producto' });
        } else if (resultado.affectedRows === 0) {
            res.status(404).json({ mensaje: 'Producto no encontrado' });
        } else {
            res.status(200).json({ mensaje: 'Producto actualizado', producto: req.body });
        }
    });
});

//Api DELETE productos (Elimina un producto);
router.delete('/productos/:id', authMiddleWare, (req, res) => {
    const { id } = req.params;
    const sql = "delete from Producto where Id_Producto = ?";

    if (!id) {
        return res.status(400).json({ error: 'El parametro id es requerido' });
    };

    pool.query(sql, [id], (err, resultado) => {
        if (err) {
            res.status(500).json({ error: 'Error al eliminar el producto' });
        } else {
            res.status(200).json({ mensaje: 'Producto eliminado' });
        }
    });
});
