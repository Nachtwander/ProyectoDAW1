const jwt = require('jsonwebtoken');
require('dotenv').config();

//Middleware para la autenticacion en las apis
const authMiddleWare = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ mensaje: 'Token no proporcionado' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {

    if (err) {
       return res.status(403).json({ mensaje: 'Token invalido o expirado' });
    }

    req.user = user;

    next();
    
    });

};

module.exports = authMiddleWare;