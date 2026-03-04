const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authmiddleware = require('../middlewares/authmiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('protected', authmiddleware, (req, res) => {
    res.json({ msg: 'Acceso concedido a ruta protegida', user: req.user });
});


module.exports = router;