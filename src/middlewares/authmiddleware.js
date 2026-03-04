const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ msg: 'Acceso denegad NO hay token' });
    try {
        const tokenLimpio = token.replace('Bearer ', '');
        const decored = jwt.verify(tokenLimpio, process.env.SECRET_KEY);
        req.user = decored;
        next();
    } catch (error) {
        res.status(400).json({ msg: 'Token no válido o expirado' });
    }
};