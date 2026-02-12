const express = require('express');
const { poblarTablas, buscarProductos, buscarCategorias } = require('../controllers/externalController');
const router = express.Router();

router.post('/poblar', poblarTablas);

router.get('/productos/:termino', buscarProductos);
router.get('/categorias/:termino', buscarCategorias);
module.exports = router;