const express = require('express');
const { poblarTablas, buscarProductos, buscarCategorias,  buscarProductosConQuery, obtenerTodosLosProductos} = require('../controllers/externalController');
const router = express.Router();

router.post('/poblar', poblarTablas);

router.get('/productos/:termino', buscarProductos);
router.get('/categorias/:termino', buscarCategorias);
router.get('/productos/search', buscarProductosConQuery);
router.get('/productos', obtenerTodosLosProductos);

module.exports = router;